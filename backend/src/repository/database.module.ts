import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Films } from '../entities/film.entity';
import { Schedules } from '../entities/schedule.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        url:
          configService.get('DATABASE_URL') ||
          'postgres://localhost:5432/films',
        username: configService.get('DATABASE_USERNAME') || 'films',
        password: configService.get('DATABASE_PASSWORD') || 'films',
        entities: [Films, Schedules],
        synchronize: true,
      }),
    }),
    TypeOrmModule.forFeature([Films, Schedules]),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
