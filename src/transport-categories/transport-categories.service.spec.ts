import { Test, TestingModule } from '@nestjs/testing';
import { TransportCategoriesService } from './transport-categories.service';

describe('TransportCategoriesService', () => {
  let service: TransportCategoriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TransportCategoriesService],
    }).compile();

    service = module.get<TransportCategoriesService>(TransportCategoriesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
