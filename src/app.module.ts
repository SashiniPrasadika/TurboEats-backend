import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import{ConfigModule, ConfigService} from '@nestjs/config';
import {TypeOrmModule} from '@nestjs/typeorm';

import { CategoriesModule } from './categories/categories.module';
import { Category } from './categories/entities/category.entity';
@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory : (configService: ConfigService) =>({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: +configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
        entities: [Category],
         synchronize: true
      }),
      inject: [ConfigService],
    }),
    
  
    CategoriesModule

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
