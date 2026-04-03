import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dto/order.dto';
import { Films } from '../entities/film.entity';
import { Schedules } from '../entities/schedule.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Films)
    private readonly filmRepository: Repository<Films>,
    @InjectRepository(Schedules)
    private readonly scheduleRepository: Repository<Schedules>,
  ) {}

  async createOrder(data: CreateOrderDto) {
    const results = [];

    for (const ticket of data.tickets) {
      const film = await this.filmRepository.findOne({
        where: { id: ticket.film },
        relations: ['schedules'],
      });

      if (!film) {
        throw new BadRequestException(`Фильм ${ticket.film} не найден`);
      }

      const session = film.schedules.find((s) => s.id === ticket.session);

      if (!session) {
        throw new BadRequestException(`Сеанс ${ticket.session} не найден`);
      }

      session.taken = Array.isArray(session.taken)
        ? session.taken
        : session.taken
          ? String(session.taken).split(',').filter(Boolean)
          : [];

      const seatStr = `${ticket.row}:${ticket.seat}`;

      if (session.taken.includes(seatStr)) {
        throw new BadRequestException(`Место ${seatStr} уже занято`);
      }

      session.taken.push(seatStr);
      await this.scheduleRepository.save(session);

      results.push({
        id: `${ticket.film}-${ticket.session}-${seatStr}`,
        film: ticket.film,
        session: ticket.session,
        daytime: ticket.daytime,
        row: ticket.row,
        seat: ticket.seat,
        price: ticket.price,
      });
    }

    return { total: results.length, items: results };
  }
}
