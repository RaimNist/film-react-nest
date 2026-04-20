import { Test, TestingModule } from '@nestjs/testing';
import { FilmsService } from './films.service';
import { FilmsRepository } from './films.repository';

describe('FilmsService', () => {
  let service: FilmsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FilmsService,
        {
          provide: FilmsRepository,
          useValue: {
            findAll: jest.fn(),
            findScheduleById: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<FilmsService>(FilmsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
