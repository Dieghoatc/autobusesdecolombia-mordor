import { Test, TestingModule } from '@nestjs/testing';
import { TransportCategoriesController } from './transport-category.controller';
import { TransportCategoriesService } from './transport-category.service';

describe('TransportCategoriesController', () => {
  let controller: TransportCategoriesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TransportCategoriesController],
      providers: [TransportCategoriesService],
    }).compile();

    controller = module.get<TransportCategoriesController>(TransportCategoriesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
