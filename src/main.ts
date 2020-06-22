import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import fs from 'fs';
import { ExpressAdapter } from '@nestjs/platform-express';
import http from 'http';
import https from 'https';
import express from 'express';

// eslint-disable-next-line @typescript-eslint/no-var-requires
// const redirector = require("redirect-https")({
//   body: "<!-- Hello! Please use HTTPS -->"
// });

async function bootstrap() {
  const privateKey = fs.readFileSync('/etc/letsencrypt/live/manga-in.space/privkey.pem', 'utf8');
  const certificate = fs.readFileSync('/etc/letsencrypt/live/manga-in.space/fullchain.pem', 'utf8');
  const httpsOptions = {key: privateKey, cert: certificate};
  // const httpsOptions = {key: '', cert: ''};
  // const server = express();
  // const app = await NestFactory.create(
  //   AppModule,
  //   new ExpressAdapter(server),
  // );

  // await app.init();
  // const s1=http.createServer(server).listen(80);
  // // s1.on("request", redirector);
  
  // https.createServer(httpsOptions, server).listen(443);
  const app = await NestFactory.create(AppModule, {
    httpsOptions,
  });
  app.setGlobalPrefix('server-api');
  // await app.listen(443);
  // const app = await NestFactory.create(AppModule);
  await app.listen(443);
}

bootstrap();