import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Films } from './film.entity';

@Entity()
export class Schedules {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  daytime: string;

  @Column()
  hall: number;

  @Column()
  rows: number;

  @Column()
  seats: number;

  @Column()
  price: number;

  @Column('simple-array', { default: '' })
  taken: string[];

  @ManyToOne(() => Films, (film) => film.schedules, { nullable: true })
  @JoinColumn({ name: 'filmId' })
  film: Films;
}
