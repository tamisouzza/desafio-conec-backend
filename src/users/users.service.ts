import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findAll(role?: string, sortBy = 'name', order: 'asc' | 'desc' = 'asc') {
    const query = this.userRepository.createQueryBuilder('user');

    if (role) {
      query.andWhere('user.role = :role', { role });
    }

    query.orderBy(`user.${sortBy}`, order.toUpperCase() as 'ASC' | 'DESC');
    return query.getMany();
  }

  async findInactiveUsers() {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    return this.userRepository
      .createQueryBuilder('user')
      .where('user.lastLogin < :date OR user.lastLogin IS NULL', {
        date: thirtyDaysAgo,
      })
      .getMany();
  }

  async findOne(id: number) {
    return this.userRepository.findOneBy({ id });
  }

  async create(userData: any) {
    const existingUser = await this.findByEmail(userData.email);
    if (existingUser) {
      throw new ConflictException('Email já está em uso');
    }

    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const user = this.userRepository.create({
      ...userData,
      password: hashedPassword,
    });

    return this.userRepository.save(user);
  }

  async update(id: number, updateData: any) {
    await this.userRepository.update(id, updateData);
    return this.findOne(id);
  }

  async remove(id: number) {
    return this.userRepository.delete(id);
  }

  async updateLastLogin(userId: number) {
    await this.userRepository.update(userId, { lastLogin: new Date() });
  }

  async findByEmail(email: string) {
    return this.userRepository.findOne({ where: { email } });
  }
}





