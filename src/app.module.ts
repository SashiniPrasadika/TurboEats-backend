import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CategoriesModule } from './categories/categories.module';
import { Category } from './categories/entities/category.entity';

import { RestaurantsModule } from './restaurants/restaurants.module';
import { Restaurant } from './restaurants/entities/restaurant.entity';

import { RestaurentCategoryModule } from './restaurent_category/restaurent_category.module';
import { RestaurantCategory } from './restaurent_category/entities/restaurent_category.entity';

// ✅ IMPORT USER MODULE (SINGULAR)
import { UserModule } from './user/user.module';

// ✅ IMPORT USER ENTITY
import { User } from './user/entities/user.entity';

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

        entities: [
          Category,
          Restaurant,
          RestaurantCategory,
          User, // ✅ ADD USER ENTITY
        ],
        synchronize: true,
      }),
    }),

    CategoriesModule,
    RestaurantsModule,
    RestaurentCategoryModule,

    UserModule, // ✅ ADD USER MODULE
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
