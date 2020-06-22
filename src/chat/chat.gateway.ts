
import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WsException,
} from '@nestjs/websockets';
import { Logger, UseGuards, Request, Query } from '@nestjs/common';
import { Socket, Server } from 'socket.io';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getRepository } from 'typeorm';
import { User } from 'src/user/user.entity';
import { Message } from './message.entity';
import { Chat } from './chat.entity';


@WebSocketGateway()
export class ChatGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

  rooms = {}
  pushToRoom = (room:string,client) => {
    if(!this.rooms[room]){
      this.rooms[room]=[]
    }
    this.rooms[room].push(client)
    return this.rooms[room]
  }
  deleteFromRoom = (room:string,client) => {
    return this.rooms[room]=this.rooms[room].filter(el=>el.id!==client.id)
  }
  roomClients = (room:string) => {
    if(this.rooms[room]){
      return this.rooms[room]
    }
    return []
  }
  constructor(
    private jwtService: JwtService,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Message)
    private messageRepository: Repository<Message>,
    @InjectRepository(Chat)
    private chatRepository: Repository<Chat>,
  ) {}
  @WebSocketServer() server: Server;

  private logger: Logger = new Logger('ChatGateway');

  @SubscribeMessage('message')
  handleMessage(client: Socket, payload: any): void {
    console.log(payload)
    const user:any = this.jwtService.decode(client.handshake.query.jwtToken)
    this.messageRepository.save({chatId:payload.id,userId:user.id,text:payload.text}).then(async msg=>{
      const chat = await this.chatRepository.findOne({id:msg.chatId},{relations:['users']})
      chat.text=msg.text
      await this.chatRepository.save(chat)
      chat.users.map(user=>{
        this.roomClients(String(user.id)).map(client=>client.send(msg))
      })
      console.log(msg)
    }).catch(console.error)
  }

  afterInit(server: Server) {
    this.logger.log('Init');
  }

  async handleDisconnect(client: Socket) {
    const user:any = this.jwtService.decode(client.handshake.query.jwtToken)
    this.logger.log(`Client disconnected: ${client.id}`);
    this.deleteFromRoom(user.id,client)
    if(!this.roomClients(String(user.id)).length){
      const Fuser = await this.userRepository.findOne({id:user.id})
      await this.userRepository.save({...Fuser,isOnline:false})
    }
  }

  async handleConnection(client: Socket, ...args: any[]) {
    const user:any = this.jwtService.decode(client.handshake.query.jwtToken)
    const Fuser = await this.userRepository.findOne({id:user.id})
    if(Fuser){
      client.user=Fuser
      this.pushToRoom(user.id,client)
      if(Fuser.showStatus){
        await this.userRepository.save({...Fuser,isOnline:true})
      } else{
        await this.userRepository.save({...Fuser,isOnline:false})
      }
    } else {
      new WsException('невалидный токен')
    }
    this.logger.log(`Client connected: ${client.id}  id=${user.id}`);
  }
}