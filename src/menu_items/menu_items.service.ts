import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MenuItem } from './entities/menu_item.entity';
import { CreateMenuItemDto } from './dto/create-menu_item.dto';
import { UpdateMenuItemDto } from './dto/update-menu_item.dto';

@Injectable()
export class MenuItemsService {
  constructor(
    @InjectRepository(MenuItem)
    private menuItemRepository: Repository<MenuItem>,
  ) {}

  create(createMenuItemDto: CreateMenuItemDto) {
    const menuItem = this.menuItemRepository.create(createMenuItemDto);
    return this.menuItemRepository.save(menuItem);
  }

  findAll() {
    return this.menuItemRepository.find();
  }

  findOne(id: number) {
    return this.menuItemRepository.findOneBy({ id });
  }

  update(id: number, updateMenuItemDto: UpdateMenuItemDto) {
    return this.menuItemRepository.update(id, updateMenuItemDto);
  }

  remove(id: number) {
    return this.menuItemRepository.delete(id);
  }
}
