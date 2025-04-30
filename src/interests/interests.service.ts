import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Interest } from './entities/interest.entity';
import { User } from '../users/entities/user.entity';

@Injectable()
export class InterestsService {
  constructor(
    @InjectRepository(Interest)
    private interestsRepository: Repository<Interest>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findAll(): Promise<Interest[]> {
    return await this.interestsRepository.find();
  }

  async addUserInterests(userId: number, interestIds: number[]): Promise<void> {
    const user = await this.usersRepository.findOne({
      where: { id: userId },
      relations: ['interests'],
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const interests = await this.interestsRepository.findByIds(interestIds);
    user.interests = interests;
    await this.usersRepository.save(user);
  }

  async getUserInterests(userId: number): Promise<Interest[]> {
    const user = await this.usersRepository.findOne({
      where: { id: userId },
      relations: ['interests'],
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user.interests;
  }
}
