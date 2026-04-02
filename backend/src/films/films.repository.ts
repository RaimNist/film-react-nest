import { Film } from '../database/films.model';
import { FilmDto, GetFilmsDto, ScheduleDto } from './dto/films.dto';

export class FilmsRepository {
  private mapSchedule(schedule: any): ScheduleDto {
    return {
      id: schedule.id,
      daytime: schedule.daytime,
      hall: schedule.hall,
      rows: schedule.rows,
      seats: schedule.seats,
      price: schedule.price,
      taken: schedule.taken,
    };
  }

  private mapFilm(film: any): FilmDto {
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
      schedule: film.schedule.map((schedule: any) =>
        this.mapSchedule(schedule),
      ),
    };
  }

  async findAll(): Promise<GetFilmsDto> {
    const films = await Film.find({});
    const total = await Film.countDocuments();

    return {
      total,
      items: films.map((film) => this.mapFilm(film)),
    };
  }

  async findScheduleById(id: string): Promise<ScheduleDto[]> {
    const film = await Film.findOne({ id });
    if (!film) {
      return [];
    }
    return (
      film.schedule?.map((schedule: any) => this.mapSchedule(schedule)) || []
    );
  }
}
