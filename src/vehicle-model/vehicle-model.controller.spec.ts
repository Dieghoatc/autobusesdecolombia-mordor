import { Test, TestingModule } from '@nestjs/testing';
import { VehicleModelController } from './vehicle-model.controller';
import { VehicleModelService } from './vehicle-model.service';

describe('VehicleModelController', () => {
  let controller: VehicleModelController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VehicleModelController],
      providers: [VehicleModelService],
    }).compile();

    controller = module.get<VehicleModelController>(VehicleModelController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
