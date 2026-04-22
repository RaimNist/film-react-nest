import { Test, TestingModule } from '@nestjs/testing';
import { FilmsController } from './films.controller';
import { FilmsService } from './films.service';
import { FilmsRepository } from './films.repository';

describe('FilmsController', () => {
  let controller: FilmsController;
  let service: FilmsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FilmsController],
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

    controller = module.get<FilmsController>(FilmsController);
    service = module.get<FilmsService>(FilmsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return films', async () => {
    const mockGetFilms = jest
      .spyOn(service, 'getFilms')
      .mockResolvedValue({ total: 0, items: [] });
    await controller.getFilms();
    expect(mockGetFilms).toHaveBeenCalled();
    mockGetFilms.mockRestore();
  });

  it('should return schedule', async () => {
    const id = '1';
    const mockGetSchedule = jest
      .spyOn(service, 'getSchedule')
      .mockResolvedValue({ total: 0, items: [] });
    await controller.getSchedule(id);
    expect(mockGetSchedule).toHaveBeenCalledWith(id);
    mockGetSchedule.mockRestore();
  });
});
