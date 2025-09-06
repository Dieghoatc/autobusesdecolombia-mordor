import { Test, TestingModule } from '@nestjs/testing';
import { PhotographerService } from './photographer.service';

describe('PhotographerService', () => {
  let service: PhotographerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PhotographerService],
    }).compile();

    service = module.get<PhotographerService>(PhotographerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
