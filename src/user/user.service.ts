/*import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  // create user
  async create(createUserDto: CreateUserDto): Promise<User> {
    const { email } = createUserDto;

    //check if email exist
    const existingUser = await this.userRepository.findOne({
      where: { email },
    });

    if (existingUser) {
      throw new BadRequestException({ message: 'Email already exist' });
    }

    const newUser = this.userRepository.create(createUserDto);
    return await this.userRepository.save(newUser);
  }

  //read all user
  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  //read single user
  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new BadRequestException({ message: 'User not found' });
    }
    return user;
  }

  //update user
  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id);
    if (!user) {
      throw new BadRequestException({ message: 'User not found' });
    }

    const updateUser = this.userRepository.merge(user, updateUserDto);
    return await this.userRepository.save(updateUser);
  }

  //delete user
  async remove(id: number): Promise<User> {
    const user = await this.findOne(id);
    if (!user) {
      throw new BadRequestException({ message: 'User not found' });
    }
    return await this.userRepository.remove(user);
  }
}
*/
/*
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  // create user
  async create(createUserDto: CreateUserDto): Promise<User> {
    const { email } = createUserDto;

    // Check if email exists
    const existingUser = await this.userRepository.findOne({
      where: { email },
    });

    if (existingUser) {
      throw new BadRequestException({ message: 'Email already exists' });
    }

    // Hash password before saving
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    
    // Create new user - map DTO properties to entity properties
    const newUser = this.userRepository.create({
      firstName: createUserDto.firstName,
      lastName: createUserDto.lastName,
      email: createUserDto.email,
      passwordHash: hashedPassword, // Map password to passwordHash
      phoneNumber: createUserDto.phoneNumber,
      userType: createUserDto.userType, // This should be UserType enum value
      isActive: createUserDto.isActive,
    });

    return await this.userRepository.save(newUser);
  }

  // read all users
  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  // read single user by ID (UUID)
  async findOne(id: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  // find user by email
  async findByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new NotFoundException(`User with email ${email} not found`);
    }
    return user;
  }

  // update user
  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id);
    
    // Check if trying to update email and if new email already exists
    if (updateUserDto.email && updateUserDto.email !== user.email) {
      const existingUser = await this.userRepository.findOne({
        where: { email: updateUserDto.email },
      });
      if (existingUser) {
        throw new BadRequestException({ message: 'Email already exists' });
      }
    }

    // If password is being updated, hash it
    if (updateUserDto.password) {
      user.passwordHash = await bcrypt.hash(updateUserDto.password, 10);
    }

    // Update only the provided fields
    if (updateUserDto.firstName !== undefined) {
      user.firstName = updateUserDto.firstName;
    }
    if (updateUserDto.lastName !== undefined) {
      user.lastName = updateUserDto.lastName;
    }
    if (updateUserDto.email !== undefined) {
      user.email = updateUserDto.email;
    }
    if (updateUserDto.phoneNumber !== undefined) {
      user.phoneNumber = updateUserDto.phoneNumber;
    }
    if (updateUserDto.userType !== undefined) {
      user.userType = updateUserDto.userType;
    }
    if (updateUserDto.isActive !== undefined) {
      user.isActive = updateUserDto.isActive;
    }

    return await this.userRepository.save(user);
  }

  // delete user (hard delete)
  async remove(id: string): Promise<void> {
    const result = await this.userRepository.delete(id);
    
    if (result.affected === 0) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
  }

  // soft delete user (set isActive to false)
  async softRemove(id: string): Promise<User> {
    const user = await this.findOne(id);
    user.isActive = false;
    return await this.userRepository.save(user);
  }

  // find users by type
  async findByType(userType: string): Promise<User[]> {
    return await this.userRepository.find({ 
      where: { userType: userType as any },
      order: { createdAt: 'DESC' }
    });
  }

  // find active users
  async findActiveUsers(): Promise<User[]> {
    return await this.userRepository.find({ 
      where: { isActive: true },
      order: { createdAt: 'DESC' }
    });
  }

  // validate user password
  async validatePassword(user: User, password: string): Promise<boolean> {
    return await bcrypt.compare(password, user.passwordHash);
  }
}*/
/*
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User, UserType } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  // Create user
  async create(createUserDto: CreateUserDto): Promise<User> {
    const { email, userType, password } = createUserDto;

    // Check if email exists
    const existingUser = await this.userRepository.findOne({
      where: { email },
    });

    if (existingUser) {
      throw new BadRequestException({ message: 'Email already exists' });
    }

    // Validate userType if provided
    if (userType && !Object.values(UserType).includes(userType)) {
      throw new BadRequestException({ message: 'Invalid user type' });
    }

    // Hash password before saving
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Create new user
    const newUser = this.userRepository.create({
      firstName: createUserDto.firstName,
      lastName: createUserDto.lastName,
      email: createUserDto.email,
      passwordHash: hashedPassword,
      phoneNumber: createUserDto.phoneNumber,
      userType: userType || UserType.CUSTOMER,
      isActive: createUserDto.isActive ?? true, // Default to true
    });

    return await this.userRepository.save(newUser);
  }

  // Read all users
  async findAll(): Promise<User[]> {
    return await this.userRepository.find({
      order: { createdAt: 'DESC' }
    });
  }

  // Read single user by ID (UUID)
  async findOne(id: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  // Find user by email
  async findByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new NotFoundException(`User with email ${email} not found`);
    }
    return user;
  }

  // Update user
  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id);
    
    // Check if trying to update email and if new email already exists
    if (updateUserDto.email && updateUserDto.email !== user.email) {
      const existingUser = await this.userRepository.findOne({
        where: { email: updateUserDto.email },
      });
      if (existingUser) {
        throw new BadRequestException({ message: 'Email already exists' });
      }
    }

    // Validate userType if being updated
    if (updateUserDto.userType && !Object.values(UserType).includes(updateUserDto.userType)) {
      throw new BadRequestException({ message: 'Invalid user type' });
    }

    // FIXED: Type-safe field updates
    // Update only the provided fields
    if (updateUserDto.firstName !== undefined) {
      user.firstName = updateUserDto.firstName;
    }
    if (updateUserDto.lastName !== undefined) {
      user.lastName = updateUserDto.lastName;
    }
    if (updateUserDto.email !== undefined) {
      user.email = updateUserDto.email;
    }
    if (updateUserDto.phoneNumber !== undefined) {
      user.phoneNumber = updateUserDto.phoneNumber;
    }
    if (updateUserDto.userType !== undefined) {
      user.userType = updateUserDto.userType;
    }
    if (updateUserDto.isActive !== undefined) {
      user.isActive = updateUserDto.isActive;
    }

    return await this.userRepository.save(user);
  }

  // Change password with old password verification
  async changePassword(id: string, oldPassword: string, newPassword: string): Promise<void> {
    const user = await this.findOne(id);
    
    // Verify old password
    const isPasswordValid = await bcrypt.compare(oldPassword, user.passwordHash);
    if (!isPasswordValid) {
      throw new BadRequestException({ message: 'Old password is incorrect' });
    }

    // Validate new password strength
    if (newPassword.length < 8) {
      throw new BadRequestException({ message: 'New password must be at least 8 characters long' });
    }

    // Update to new password
    user.passwordHash = await bcrypt.hash(newPassword, 10);
    await this.userRepository.save(user);
  }

  // Delete user (hard delete)
  async remove(id: string): Promise<void> {
    const result = await this.userRepository.delete(id);
    
    if (result.affected === 0) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
  }

  // Soft delete user (set isActive to false)
  async softRemove(id: string): Promise<User> {
    const user = await this.findOne(id);
    user.isActive = false;
    return await this.userRepository.save(user);
  }

  // Find users by type
  async findByType(userType: string): Promise<User[]> {
    // Validate the userType
    if (!Object.values(UserType).includes(userType as UserType)) {
      throw new BadRequestException({ message: 'Invalid user type' });
    }
    
    return await this.userRepository.find({ 
      where: { userType: userType as UserType },
      order: { createdAt: 'DESC' }
    });
  }

  // Find active users
  async findActiveUsers(): Promise<User[]> {
    return await this.userRepository.find({ 
      where: { isActive: true },
      order: { createdAt: 'DESC' }
    });
  }

  // Find inactive users
  async findInactiveUsers(): Promise<User[]> {
    return await this.userRepository.find({ 
      where: { isActive: false },
      order: { createdAt: 'DESC' }
    });
  }

  // Activate user
  async activateUser(id: string): Promise<User> {
    const user = await this.findOne(id);
    user.isActive = true;
    return await this.userRepository.save(user);
  }

  // Validate user password
  async validatePassword(user: User, password: string): Promise<boolean> {
    return await bcrypt.compare(password, user.passwordHash);
  }

  // Check if user exists by email
  async existsByEmail(email: string): Promise<boolean> {
    const count = await this.userRepository.count({ where: { email } });
    return count > 0;
  }

  // Count users by type
  async countByType(userType: UserType): Promise<number> {
    return await this.userRepository.count({ where: { userType } });
  }

  // Find users with pagination
  async findAllPaginated(skip: number, take: number): Promise<[User[], number]> {
    return await this.userRepository.findAndCount({
      order: { createdAt: 'DESC' },
      skip,
      take,
    });
  }

  // NEW: Find user by ID without throwing (for internal use)
  async findByIdWithoutThrow(id: string): Promise<User | null> {
    return await this.userRepository.findOne({ where: { id } });
  }

  // NEW: Deactivate user (alias for softRemove)
  async deactivateUser(id: string): Promise<User> {
    return this.softRemove(id);
  }
}*/
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto, UserType } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  // Create user
  async create(createUserDto: CreateUserDto): Promise<User> {
    const { email, userType, password } = createUserDto;

    // Check if email exists
    const existingUser = await this.userRepository.findOne({
      where: { email },
    });

    if (existingUser) {
      throw new BadRequestException({ message: 'Email already exists' });
    }

    // Validate userType if provided
    if (userType && !Object.values(UserType).includes(userType)) {
      throw new BadRequestException({ message: 'Invalid user type' });
    }

    // Hash password before saving
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Create new user
    const newUser = this.userRepository.create({
      firstName: createUserDto.firstName,
      lastName: createUserDto.lastName,
      email: createUserDto.email,
      passwordHash: hashedPassword,
      phoneNumber: createUserDto.phoneNumber || null,
      userType: userType || UserType.CUSTOMER,
      isActive: createUserDto.isActive ?? true,
    });

    return await this.userRepository.save(newUser);
  }

  // Read all users
  async findAll(): Promise<User[]> {
    return await this.userRepository.find({
      order: { createdAt: 'DESC' }
    });
  }

  // Read single user by ID (UUID)
  async findOne(id: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  // Find user by email
  async findByEmail(email: string): Promise<User> {
    const normalizedEmail = email.toLowerCase().trim();
    const user = await this.userRepository.findOne({ 
      where: { email: normalizedEmail } 
    });
    if (!user) {
      throw new NotFoundException(`User with email ${email} not found`);
    }
    return user;
  }

  // Update user
  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id);
    
    // Check if trying to update email and if new email already exists
    if (updateUserDto.email) {
      const normalizedEmail = updateUserDto.email.toLowerCase().trim();
      if (normalizedEmail !== user.email) {
        const existingUser = await this.userRepository.findOne({
          where: { email: normalizedEmail },
        });
        if (existingUser) {
          throw new BadRequestException({ message: 'Email already exists' });
        }
        user.email = normalizedEmail;
      }
    }

    // Validate userType if being updated
    if (updateUserDto.userType && !Object.values(UserType).includes(updateUserDto.userType)) {
      throw new BadRequestException({ message: 'Invalid user type' });
    }

    // Update only the provided fields
    if (updateUserDto.firstName !== undefined) {
      user.firstName = updateUserDto.firstName.trim();
    }
    if (updateUserDto.lastName !== undefined) {
      user.lastName = updateUserDto.lastName.trim();
    }
    if (updateUserDto.phoneNumber !== undefined) {
      user.phoneNumber = updateUserDto.phoneNumber.trim() || null;
    }
    if (updateUserDto.userType !== undefined) {
      user.userType = updateUserDto.userType;
    }
    if (updateUserDto.isActive !== undefined) {
      user.isActive = updateUserDto.isActive;
    }

    return await this.userRepository.save(user);
  }

  // Change password with old password verification
  async changePassword(id: string, oldPassword: string, newPassword: string): Promise<void> {
    const user = await this.findOne(id);
    
    // Verify old password
    const isPasswordValid = await bcrypt.compare(oldPassword, user.passwordHash);
    if (!isPasswordValid) {
      throw new BadRequestException({ message: 'Old password is incorrect' });
    }

    // Validate new password strength
    if (newPassword.length < 8) {
      throw new BadRequestException({ message: 'New password must be at least 8 characters long' });
    }

    // Check if new password is different from old password
    const isSamePassword = await bcrypt.compare(newPassword, user.passwordHash);
    if (isSamePassword) {
      throw new BadRequestException({ message: 'New password must be different from old password' });
    }

    // Update to new password
    user.passwordHash = await bcrypt.hash(newPassword, 10);
    await this.userRepository.save(user);
  }

  // Delete user (hard delete)
  async remove(id: string): Promise<void> {
    const result = await this.userRepository.delete(id);
    
    if (result.affected === 0) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
  }

  // Soft delete user (set isActive to false)
  async softRemove(id: string): Promise<User> {
    const user = await this.findOne(id);
    user.isActive = false;
    return await this.userRepository.save(user);
  }

  // Find users by type
  async findByType(userType: UserType): Promise<User[]> {
    return await this.userRepository.find({ 
      where: { userType },
      order: { createdAt: 'DESC' }
    });
  }

  // Find active users
  async findActiveUsers(): Promise<User[]> {
    return await this.userRepository.find({ 
      where: { isActive: true },
      order: { createdAt: 'DESC' }
    });
  }

  // Find inactive users
  async findInactiveUsers(): Promise<User[]> {
    return await this.userRepository.find({ 
      where: { isActive: false },
      order: { createdAt: 'DESC' }
    });
  }

  // Activate user
  async activateUser(id: string): Promise<User> {
    const user = await this.findOne(id);
    user.isActive = true;
    return await this.userRepository.save(user);
  }

  // Validate user password
  async validatePassword(email: string, password: string): Promise<User | null> {
    const user = await this.userRepository.findOne({ 
      where: { email: email.toLowerCase().trim() } 
    });
    
    if (!user) {
      return null;
    }
    
    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    return isPasswordValid ? user : null;
  }

  // Check if user exists by email
  async existsByEmail(email: string): Promise<boolean> {
    const normalizedEmail = email.toLowerCase().trim();
    const count = await this.userRepository.count({ 
      where: { email: normalizedEmail } 
    });
    return count > 0;
  }

  // Count users by type
  async countByType(userType: UserType): Promise<number> {
    return await this.userRepository.count({ where: { userType } });
  }

  // Find users with pagination
  async findAllPaginated(skip: number, take: number): Promise<[User[], number]> {
    return await this.userRepository.findAndCount({
      order: { createdAt: 'DESC' },
      skip,
      take,
    });
  }

  // Find user by ID without throwing (for internal use)
  async findByIdWithoutThrow(id: string): Promise<User | null> {
    return await this.userRepository.findOne({ where: { id } });
  }

  // Deactivate user (alias for softRemove)
  async deactivateUser(id: string): Promise<User> {
    return this.softRemove(id);
  }

  // Search users by name or email
  async searchUsers(searchTerm: string): Promise<User[]> {
    return await this.userRepository
      .createQueryBuilder('user')
      .where('user.firstName ILIKE :searchTerm', { searchTerm: `%${searchTerm}%` })
      .orWhere('user.lastName ILIKE :searchTerm', { searchTerm: `%${searchTerm}%` })
      .orWhere('user.email ILIKE :searchTerm', { searchTerm: `%${searchTerm}%` })
      .orderBy('user.createdAt', 'DESC')
      .getMany();
  }
}