import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { VehicleService } from './vehicle.service';
import { VehicleDAO } from './dao/vehicle.dao';
import { VehicleDTO } from './dto/vehicle.dto';
import { CloudinaryService } from '../services/cloudinary/cloudinary.service';

describe('VehicleService.createVehicle', () => {
  let service: VehicleService;
  const vehicleDao = {
    existsById: jest.fn(),
    addPhoto: jest.fn(),
    createVehicle: jest.fn(),
  };
  const cloudinaryService = { uploadImage: jest.fn().mockResolvedValue('https://img/1.avif') };
  const file = { buffer: Buffer.from('img') } as Express.Multer.File;

  const dto = (fields: Partial<VehicleDTO>) =>
    ({ photographer_id: 78, location: 'Bogotá', ...fields }) as VehicleDTO;

  beforeEach(async () => {
    jest.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VehicleService,
        { provide: VehicleDAO, useValue: vehicleDao },
        { provide: CloudinaryService, useValue: cloudinaryService },
      ],
    }).compile();

    service = module.get<VehicleService>(VehicleService);
  });

  it('adds the photo to an existing vehicle', async () => {
    vehicleDao.existsById.mockResolvedValue(true);

    const result = await service.createVehicle(file, dto({ vehicle_id: 5 }));

    expect(vehicleDao.addPhoto).toHaveBeenCalledWith(5, 'https://img/1.avif', expect.any(Object));
    expect(vehicleDao.createVehicle).not.toHaveBeenCalled();
    expect(result).toEqual({ message: 'Photo added to vehicle', vehicle_id: 5 });
  });

  it('rejects an unknown vehicle_id before uploading', async () => {
    vehicleDao.existsById.mockResolvedValue(false);

    await expect(service.createVehicle(file, dto({ vehicle_id: 999 }))).rejects.toThrow(
      NotFoundException,
    );
    expect(cloudinaryService.uploadImage).not.toHaveBeenCalled();
  });

  it('creates a new vehicle when vehicle_id is omitted', async () => {
    vehicleDao.createVehicle.mockResolvedValue(42);

    const result = await service.createVehicle(
      file,
      dto({ vehicle_type_id: 1, model_id: 2, company_id: 3, transport_category_id: 4 }),
    );

    expect(vehicleDao.createVehicle).toHaveBeenCalledWith('https://img/1.avif', expect.any(Object));
    expect(result).toEqual({ message: 'Vehicle created successfully', vehicle_id: 42 });
  });

  it('rejects a new vehicle with missing fields before uploading', async () => {
    await expect(
      service.createVehicle(file, dto({ vehicle_type_id: 1, model_id: 2 })),
    ).rejects.toThrow(
      new BadRequestException('Missing fields for a new vehicle: company_id, transport_category_id'),
    );
    expect(cloudinaryService.uploadImage).not.toHaveBeenCalled();
  });
});
