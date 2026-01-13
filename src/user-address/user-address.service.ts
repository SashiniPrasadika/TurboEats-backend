import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserAddress } from './entities/user-address.entity';
import { CreateUserAddressDto } from './dto/create-user-address.dto';
import { UpdateUserAddressDto } from './dto/update-user-address.dto';

@Injectable()
export class UserAddressService {
  constructor(
    @InjectRepository(UserAddress)
    private readonly userAddressRepository: Repository<UserAddress>,
  ) {}

  create(dto: CreateUserAddressDto) {
    const address = this.userAddressRepository.create(dto);
    return this.userAddressRepository.save(address);
  }

  findAll() {
    return this.userAddressRepository.find();
  }

  findOne(id: number) {
    return this.userAddressRepository.findOneBy({ id });
  }

  findByUser(userId: number) {
    return this.userAddressRepository.find({
      where: { user_id: userId },
    });
  }

  async update(id: number, dto: UpdateUserAddressDto) {
    await this.userAddressRepository.update(id, dto);
    return this.findOne(id);
  }

  remove(id: number) {
    return this.userAddressRepository.delete(id);
  }
}
