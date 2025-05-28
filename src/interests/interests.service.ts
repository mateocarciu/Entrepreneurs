import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
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

    const interests = await this.interestsRepository.findBy({
      id: In(interestIds),
    });

    if (interests.length !== interestIds.length) {
      throw new NotFoundException('Some interests not found');
    }

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

  async create(name: string, description?: string): Promise<Interest> {
    const interest = this.interestsRepository.create({ name, description });
    return await this.interestsRepository.save(interest);
  }

  async seedDefaultInterests(): Promise<void> {
    const existingInterests = await this.interestsRepository.count();

    if (existingInterests === 0) {
      const defaultInterests = [
        {
          name: 'Technology',
          description: 'Software, hardware, and digital innovation',
        },
        {
          name: 'Finance',
          description: 'Financial services, banking, and investment',
        },
        {
          name: 'Healthcare',
          description:
            'Medical technology, healthcare services, and biotechnology',
        },
        {
          name: 'E-commerce',
          description:
            'Online retail, marketplace platforms, and digital commerce',
        },
        {
          name: 'Education',
          description: 'EdTech, online learning, and educational services',
        },
        {
          name: 'Sustainability',
          description: 'Environmental solutions and green technology',
        },
        {
          name: 'Real Estate',
          description:
            'Property development, PropTech, and real estate services',
        },
        {
          name: 'Food & Beverage',
          description:
            'Restaurant chains, food delivery, and beverage industry',
        },
        {
          name: 'Transportation',
          description:
            'Mobility solutions, logistics, and transportation technology',
        },
        {
          name: 'Entertainment',
          description: 'Media, gaming, and entertainment platforms',
        },
      ];

      for (const interestData of defaultInterests) {
        await this.create(interestData.name, interestData.description);
      }

      console.log('✅ Default interests have been seeded to the database');
    }
  }
}
