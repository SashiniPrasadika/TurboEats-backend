import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cart } from './entities/cart.entity';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';

@Injectable()
export class CartsService {
  constructor(
    @InjectRepository(Cart)
    private cartRepository: Repository<Cart>,
  ) {}

  create(createCartDto: CreateCartDto) {
    const cart = this.cartRepository.create(createCartDto);
    return this.cartRepository.save(cart);
  }

  findAll() {
    return this.cartRepository.find();
  }

  findOne(id: number) {
    return this.cartRepository.findOneBy({ id });
  }

  update(id: number, updateCartDto: UpdateCartDto) {
    return this.cartRepository.update(id, updateCartDto);
  }

  remove(id: number) {
    return this.cartRepository.delete(id);
  }
}
