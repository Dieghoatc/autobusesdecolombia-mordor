import { Test, TestingModule } from '@nestjs/testing';
import { PhotographerController } from './photographer.controller';
import { PhotographerService } from './photographer.service';

describe('PhotographerController', () => {
  let controller: PhotographerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PhotographerController],
      providers: [PhotographerService],
    }).compile();

    controller = module.get<PhotographerController>(PhotographerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
