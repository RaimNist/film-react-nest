import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateOrderDto } from './dto/order.dto';
import { Film } from '../database/films.model';

@Injectable()
export class OrderService {
  async createOrder(data: CreateOrderDto) {
    const results = [];

    for (const ticket of data.tickets) {
      const film = await Film.findOne({ id: ticket.film });

      if (!film) {
        throw new BadRequestException(`Фильм ${ticket.film} не найден`);
      }

      const session = film.schedule.find(
        (s) =>
          s.id === ticket.session &&
          s.daytime.getTime() === new Date(ticket.daytime).getTime(),
      );

      if (!session) {
        throw new BadRequestException(`Сеанс ${ticket.session} не найден`);
      }

      const seatStr = `${ticket.row}:${ticket.seat}`;

      if (session.taken.includes(seatStr)) {
        throw new BadRequestException(`Место ${seatStr} уже занято`);
      }

      session.taken.push(seatStr);
      await film.save();

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
