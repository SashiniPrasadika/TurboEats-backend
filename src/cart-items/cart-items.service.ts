import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CartItem } from './entities/cart-item.entity';
import { CreateCartItemDto } from './dto/create-cart-item.dto';
import { UpdateCartItemDto } from './dto/update-cart-item.dto';

@Injectable()
export class CartItemsService {
  constructor(
    @InjectRepository(CartItem)
    private cartItemRepository: Repository<CartItem>,
  ) {}

  create(createCartItemDto: CreateCartItemDto) {
    const cartItem = this.cartItemRepository.create(createCartItemDto);
    return this.cartItemRepository.save(cartItem);
  }

  findAll() {
    return this.cartItemRepository.find();
  }

  findOne(id: number) {
    return this.cartItemRepository.findOneBy({ id });
  }

  update(id: number, updateCartItemDto: UpdateCartItemDto) {
    return this.cartItemRepository.update(id, updateCartItemDto);
  }

  remove(id: number) {
    return this.cartItemRepository.delete(id);
  }
}
