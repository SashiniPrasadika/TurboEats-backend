import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Promotion } from './entities/promotion.entity';
import { CreatePromotionDto } from './dto/create-promotion.dto';
import { UpdatePromotionDto } from './dto/update-promotion.dto';

@Injectable()
export class PromotionsService {
  constructor(
    @InjectRepository(Promotion)
    private promotionRepository: Repository<Promotion>,
  ) {}

  create(createDto: CreatePromotionDto) {
    const promotion = this.promotionRepository.create(createDto);
    return this.promotionRepository.save(promotion);
  }

  findAll() {
    return this.promotionRepository.find();
  }

  findOne(id: number) {
    return this.promotionRepository.findOneBy({ id });
  }

  update(id: number, updateDto: UpdatePromotionDto) {
    return this.promotionRepository.update(id, updateDto);
  }

  remove(id: number) {
    return this.promotionRepository.delete(id);
  }
}
