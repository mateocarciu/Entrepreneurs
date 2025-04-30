import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { Investment } from '../investments/entities/investment.entity';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Investment)
    private investmentsRepository: Repository<Investment>,
  ) {}

  async getAllUsers() {
    return this.usersRepository.find();
  }

  async getAllInvestments() {
    return this.investmentsRepository.find({
      relations: ['investor', 'project'],
    });
  }

  async removeUser(id: number) {
    return this.usersRepository.delete(id);
  }
} 