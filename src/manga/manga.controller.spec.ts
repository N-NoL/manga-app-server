import { Test, TestingModule } from '@nestjs/testing';
import { MangaController } from './manga.controller';

describe('Manga Controller', () => {
  let controller: MangaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MangaController],
    }).compile();

    controller = module.get<MangaController>(MangaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
