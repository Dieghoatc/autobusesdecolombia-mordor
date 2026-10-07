import { Test, TestingModule } from '@nestjs/testing';

import {
  TRANSPORT_CATEGORIES_CACHE_KEY,
  TRANSPORT_CATEGORIES_CACHE_TTL_SECONDS,
  TransportCategoriesController,
} from './transport-category.controller';
import { TransportCategoriesService } from './transport-category.service';
import { RedisService } from 'src/redis/redis.service';

describe('TransportCategoriesController', () => {
  let controller: TransportCategoriesController;
  const categories = [
    { transport_category_id: 1, slug: 'transporte-interdepartamental' },
    { transport_category_id: 4, slug: 'nuestros-recuerdos' },
  ];
  const service = {
    findAll: jest.fn().mockResolvedValue(categories),
    findBySlug: jest.fn().mockResolvedValue(categories[1]),
  };
  const redis = { getCacheKey: jest.fn(), setCacheKey: jest.fn() };

  beforeEach(async () => {
    jest.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TransportCategoriesController],
      providers: [
        { provide: TransportCategoriesService, useValue: service },
        { provide: RedisService, useValue: redis },
      ],
    }).compile();

    controller = module.get<TransportCategoriesController>(TransportCategoriesController);
  });

  it('loads the categories and caches them with an expiry when not cached', async () => {
    redis.getCacheKey.mockResolvedValue(null);

    await expect(controller.findAll()).resolves.toEqual(categories);
    expect(redis.setCacheKey).toHaveBeenCalledWith(
      TRANSPORT_CATEGORIES_CACHE_KEY,
      JSON.stringify(categories),
      TRANSPORT_CATEGORIES_CACHE_TTL_SECONDS,
    );
  });

  it('returns the cached categories without querying the database', async () => {
    redis.getCacheKey.mockResolvedValue(JSON.stringify(categories));

    await expect(controller.findAll()).resolves.toEqual(categories);
    expect(service.findAll).not.toHaveBeenCalled();
  });

  it('finds a category by slug', async () => {
    await expect(controller.findBySlug('nuestros-recuerdos')).resolves.toEqual(categories[1]);
    expect(service.findBySlug).toHaveBeenCalledWith('nuestros-recuerdos');
  });
});
