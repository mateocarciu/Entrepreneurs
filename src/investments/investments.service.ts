import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Investment } from './entities/investment.entity';
import { CreateInvestmentDto } from './dto/create-investment.dto';

@Injectable()
export class InvestmentsService {
  constructor(
    @InjectRepository(Investment)
    private investmentsRepository: Repository<Investment>,
  ) {}

  async create(createInvestmentDto: CreateInvestmentDto, investorId: number): Promise<Investment> {
    const investment = this.investmentsRepository.create({
      ...createInvestmentDto,
      investor: { id: investorId },
      project: { id: createInvestmentDto.projectId },
    });
    return await this.investmentsRepository.save(investment);
  }

  async findByInvestor(investorId: number): Promise<Investment[]> {
    return await this.investmentsRepository.find({
      where: { investor: { id: investorId } },
      relations: ['project'],
    });
  }

  async findByProject(projectId: number): Promise<Investment[]> {
    return await this.investmentsRepository.find({
      where: { project: { id: projectId } },
      relations: ['investor'],
    });
  }

  async remove(id: number, investorId: number): Promise<void> {
    const investment = await this.investmentsRepository.findOne({
      where: { id },
      relations: ['investor'],
    });

    if (!investment) {
      throw new NotFoundException('Investment not found');
    }

    if (investment.investor.id !== investorId) {
      throw new ForbiddenException('Cannot delete other investor\'s investments');
    }

    await this.investmentsRepository.remove(investment);
  }
} 