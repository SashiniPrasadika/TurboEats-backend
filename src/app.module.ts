import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CategoriesModule } from './categories/categories.module';
import { Category } from './categories/entities/category.entity';

import { RestaurantsModule } from './restaurants/restaurants.module';
import { Restaurant } from './restaurants/entities/restaurant.entity';

// ✅ FIXED: use ONLY ONE correct restaurant-category module
import { RestaurentCategoryModule } from './restaurent_category/restaurent_category.module';

// ✅ FIXED: correct entity import path & name
import { RestaurantCategory } from './restaurent_category/entities/restaurent_category.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: +configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),

        // ✅ FIXED: register correct restaurant-category entity
        entities: [
          Category,
          Restaurant,
          RestaurantCategory,
        ],
        synchronize: true,
      }),
    }),

    CategoriesModule,
    RestaurantsModule,

    // ✅ FIXED: correct module name
    RestaurentCategoryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
