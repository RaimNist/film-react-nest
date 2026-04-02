import { Injectable } from '@nestjs/common';
import { FilmsRepository } from './films.repository';
import { GetFilmsDto, ScheduleDto } from './dto/films.dto';

@Injectable()
export class FilmsService {
  constructor(private readonly filmsRepository: FilmsRepository) {}

  getFilms(): Promise<GetFilmsDto> {
    return this.filmsRepository.findAll();
  }

  async getSchedule(
    id: string,
  ): Promise<{ total: number; items: ScheduleDto[] }> {
    const schedule = await this.filmsRepository.findScheduleById(id);
    return { total: schedule.length, items: schedule };
  }
}
