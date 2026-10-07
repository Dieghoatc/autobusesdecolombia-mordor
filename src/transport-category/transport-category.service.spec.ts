import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { TransportCategoriesService } from './transport-category.service';
import { TransportCategoryDAO } from './dao/transport-category.dao';
import { TransportCategory } from './entities/transport-category.entity';

// The categories stored in the database
const SLUGS = [
  'transporte-interdepartamental',
  'transporte-intermunicipal',
  'transporte-internacional',
  'nuestros-recuerdos',
  'turismo',
  'transporte-especial',
  'transporte-escolar',
  'chivas',
  'transporte-urbano',
  'taxi',
];

const CATEGORIES = SLUGS.map(
  (slug, index) => ({ transport_category_id: index + 1, name: slug, slug }) as TransportCategory,
);

describe('TransportCategoriesService', () => {
  let service: TransportCategoriesService;
  const dao = {
    findAll: jest.fn().mockResolvedValue(CATEGORIES),
    findBySlug: jest.fn((slug: string) =>
      Promise.resolve(CATEGORIES.find((category) => category.slug === slug) ?? null),
    ),
  };

  beforeEach(async () => {
    jest.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      providers: [TransportCategoriesService, { provide: TransportCategoryDAO, useValue: dao }],
    }).compile();

    service = module.get<TransportCategoriesService>(TransportCategoriesService);
  });

  it('lists all categories', async () => {
    await expect(service.findAll()).resolves.toHaveLength(SLUGS.length);
  });

  it.each(SLUGS)('finds the category "%s" by its slug', async (slug) => {
    await expect(service.findBySlug(slug)).resolves.toMatchObject({ slug });
  });

  it('ignores case and surrounding spaces in the slug', async () => {
    await expect(service.findBySlug('  Nuestros-Recuerdos ')).resolves.toMatchObject({
      slug: 'nuestros-recuerdos',
    });
    expect(dao.findBySlug).toHaveBeenCalledWith('nuestros-recuerdos');
  });

  it('throws 404 for an unknown slug', async () => {
    await expect(service.findBySlug('intermunicipal')).rejects.toThrow(NotFoundException);
  });
});
