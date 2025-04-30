import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { Investment } from '../investments/entities/investment.entity';
import { AdminUserResponseDto } from './dto/admin-user.dto';
import { AdminInvestmentResponseDto } from './dto/admin-investment.dto';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Investment)
    private readonly investmentRepository: Repository<Investment>,
  ) {}

  async getAllUsers(): Promise<AdminUserResponseDto[]> {
    const users = await this.userRepository.find();
    return users.map((user) => ({
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    }));
  }

  async getAllInvestments(): Promise<AdminInvestmentResponseDto[]> {
    const investments = await this.investmentRepository.find({
      relations: ['project', 'investor'],
    });
    return investments.map((investment) => ({
      id: investment.id,
      amount: investment.amount,
      projectId: investment.project.id,
      investorId: investment.investor.id,
      createdAt: investment.createdAt,
    }));
  }

  async removeUser(id: number): Promise<void> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    await this.userRepository.remove(user);
  }
}
