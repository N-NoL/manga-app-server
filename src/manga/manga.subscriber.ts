import { EventSubscriber, EntitySubscriberInterface, InsertEvent, Repository, UpdateEvent } from "typeorm";
import { Manga } from 'src/manga/manga.entity';
import { InjectRepository } from "@nestjs/typeorm";
import { LoadEvent } from "typeorm/subscriber/event/LoadEvent";
import { Rating } from "./rating/rating.entity";
import { UserToComment } from "src/comment/commentToUser.entity";
import { Chapter } from 'src/chapter/chapter.entity';
import { Bookmark } from './bookmark/bookmark.entity';

@EventSubscriber()
export class ChapterSubscriber implements EntitySubscriberInterface<Chapter> {


    /**
     * Indicates that this subscriber only listen to Post events.
     */
    // listenTo() {
    //     return Chapter;
    // }
    listenTo = () => Chapter
    /**
     * Called before post insertion.
     */
    afterUpdate = async(event: UpdateEvent<Chapter>) =>{
        console.log(`afterUpdate=!======== `);
        const chapter = await event.manager.createQueryBuilder(Chapter, 'chapter').where({id:event.entity.id}).getOne()
        if(chapter.banStatus){
           await event.manager.createQueryBuilder().delete()
           .from(Bookmark)
           .where("chapterId = :chapterId", { chapterId: chapter.id })
           .execute();
        }
        const manga = await event.manager.createQueryBuilder(Manga, 'manga')
        .where({id:chapter.mangaId})
        .leftJoinAndSelect("manga.chapters", "chapter", "chapter.banStatus = 0")
        .orderBy('chapter.volume', 'DESC')
        .addOrderBy('chapter.chapter', 'DESC')
        .addOrderBy('chapter.createdAt', 'DESC')
        .getOne();

        await event.manager.createQueryBuilder(Manga, 'manga')
        .update(Manga)
        .set({ lastChapter:manga.chapters[0], chapterCount: manga.chapters.length,chapterUpdateAt:(new Date()).valueOf() })
        .where({id:chapter.mangaId})
        .execute();
        // manga.lastChapter=manga.chapters[0]
        // manga.chapterCount=manga.chapters.length
        // manga.chapterUpdateAt=(new Date()).valueOf()
        // await event.manager.save(Manga, manga)


    }
    // afterInsert = async(event: InsertEvent<Chapter>) => {
    //     console.log(`BEFORE Chapter INSERTED: `);

    //     const manga = await event.manager.createQueryBuilder(Manga, 'manga')
    //     .where({id:event.entity.manga.id})
    //     .leftJoinAndSelect("manga.chapters", "chapter")
    //     .orderBy('chapter.volume', 'DESC')
    //     .addOrderBy('chapter.chapter', 'DESC')
    //     .addOrderBy('chapter.createdAt', 'DESC')
    //     .getOne();

    //     manga.lastChapter=manga.chapters[0]
    //     manga.chapterCount=manga.chapters.length
    //     manga.chapterUpdateAt=(new Date()).valueOf()
    //     await event.manager.save(Manga, manga)
    //     // console.log(manga)
    //     // console.log(`manga: `, manga);
    //     // event.entity.manga
    //     // event.connection.createQueryBuilder()
    // }
}
