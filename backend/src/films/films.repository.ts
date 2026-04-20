import { Injectable, Optional } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Films } from '../entities/film.entity';
import { Schedules } from '../entities/schedule.entity';
import { FilmDto, GetFilmsDto, ScheduleDto } from './dto/films.dto';

@Injectable()
export class FilmsRepository {
  constructor(
    @Optional()
    @InjectRepository(Films)
    private readonly filmRepository?: Repository<Films>,
  ) {}

  private mapSchedule(schedule: Schedules): ScheduleDto {
    const taken = Array.isArray(schedule.taken)
      ? schedule.taken
      : schedule.taken
        ? String(schedule.taken).split(',').filter(Boolean)
        : [];

    return {
      id: schedule.id,
      daytime: schedule.daytime,
      hall: schedule.hall,
      rows: schedule.rows,
      seats: schedule.seats,
      price: schedule.price,
      taken,
    };
  }

  private mapFilm(film: Films): FilmDto {
    return {
      id: film.id,
      rating: film.rating,
      director: film.director,
      tags: film.tags,
      image: film.image,
      cover: film.cover,
      title: film.title,
      about: film.about,
      description: film.description,
      schedule: (film.schedules || []).map((schedule) =>
        this.mapSchedule(schedule),
      ),
    };
  }

  async findAll(): Promise<GetFilmsDto> {
    if (!this.filmRepository) {
      return { total: 0, items: [] };
    }

    const [films, total] = await this.filmRepository.findAndCount({
      relations: ['schedules'],
    });

    return {
      total,
      items: films.map((film) => this.mapFilm(film)),
    };
  }

  async findScheduleById(id: string): Promise<ScheduleDto[]> {
    if (!this.filmRepository) {
      return [];
    }

    const film = await this.filmRepository.findOne({
      where: { id },
      relations: ['schedules'],
    });

    if (!film) {
      return [];
    }

    return (film.schedules || []).map((schedule) => this.mapSchedule(schedule));
  }
}
