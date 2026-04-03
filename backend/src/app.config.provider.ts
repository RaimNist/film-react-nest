import { ConfigModule } from '@nestjs/config';
import 'dotenv/config';

export const configProvider = {
  imports: [ConfigModule.forRoot()],
  provide: 'CONFIG',
  useFactory: (): AppConfig => ({
    //TODO прочесть переменнные среды
    database: {
      driver: process.env.DATABASE_DRIVER || 'postgres',
      url: process.env.DATABASE_URL || 'postgres://localhost:5432/films',
      username: process.env.DATABASE_USERNAME || 'films',
      password: process.env.DATABASE_PASSWORD || 'films',
      name: process.env.DATABASE_NAME || 'films',
    },
  }),
};

export interface AppConfig {
  database: AppConfigDatabase;
}

export interface AppConfigDatabase {
  driver: string;
  url: string;
  username: string;
  password: string;
  name: string;
}
