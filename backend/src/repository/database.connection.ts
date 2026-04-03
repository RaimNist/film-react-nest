// import { Injectable, OnModuleInit, Inject } from '@nestjs/common';
// import mongoose from 'mongoose';
// import { AppConfig } from '../app.config.provider';

// @Injectable()
// export class DatabaseConnection implements OnModuleInit {
//   constructor(@Inject('CONFIG') private readonly config: AppConfig) {}

//   async onModuleInit() {
//     if (this.config.database.driver === 'mongodb') {
//       try {
//         await mongoose.connect(this.config.database.url);
//         console.log('Подключено к MongoDB');
//       } catch (error) {
//         console.error('Ошибка подключения к MongoDB:', error);
//       }
//     } else {
//       console.error(
//         `Неподдерживаемый драйвер базы данных: ${this.config.database.driver}`,
//       );
//     }
//   }
// }
