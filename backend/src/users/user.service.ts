import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/users.entity.js';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user-dto.js';
import {
  CreateUser,
  DispatchUser,
  IUser,
} from './interfaces/user.interface.js';
import { OmitType } from '@nestjs/mapped-types';
import { UpdateUserDto } from './dto/update-user-dto.js';
import { rmSync } from 'fs';
import { GoogleAuthDto } from '../auth/dto/google.dto.js';

Injectable();
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUser: CreateUser): Promise<DispatchUser> {
    const user = this.userRepository.create(createUser);
    return await this.userRepository.save(user);
  }

  async createWithGoogle(createUser : GoogleAuthDto) : Promise<DispatchUser > {
    const user = this.userRepository.create(createUser);
    return await this.userRepository.save(user);
  }

  async findOne(id: number): Promise<DispatchUser | null> {
    const result = await this.userRepository.findOneBy({ id });

    if (!result) {
      return null;
    }

    const { password, ...rest } = result;
    return rest;
  }

  async findOneSensitiveByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOneBy({ email });
  }

  async findOneByGoogleID(googleId: string): Promise<DispatchUser | null> {
    const user =  await this.userRepository.findOneBy({ googleId });
    if (!user) return null
    
    const {password, ...rest} = user;

    return rest

  }
  

  async findOneByEmail(email: string): Promise<DispatchUser | null> {
    return await this.userRepository.findOneBy({ email });
  }

  async findAll(id: number): Promise<DispatchUser[] | null> {
    return await this.userRepository.find();
  }

  async update(
    id: number,
    updateUserDto: UpdateUserDto,
  ): Promise<DispatchUser> {
    const user = await this.findOne(id);
    if (!user)
      throw new NotFoundException({
        code: 'NOT_FOUND',
        message: 'User not found',
      });

    const updatedUser = { ...user, ...updateUserDto };
    await this.userRepository.update(id, updatedUser);
    return updatedUser;
  }

  async delete(id: number): Promise<DispatchUser> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user)
      throw new NotFoundException({
        code: 'NOT_FOUND',
        message: 'User not found',
      });
    return this.userRepository.remove(user);
  }
}
