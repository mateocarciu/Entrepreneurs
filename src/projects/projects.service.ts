import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from './entities/project.entity';
import { User } from '../users/entities/user.entity';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { UserRole } from '../common/enums/roles.enum';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private projectsRepository: Repository<Project>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(
    createProjectDto: CreateProjectDto,
    userId: number,
  ): Promise<Project> {
    const project = this.projectsRepository.create({
      ...createProjectDto,
      owner: { id: userId },
    });
    return await this.projectsRepository.save(project);
  }

  async findAll(): Promise<Project[]> {
    return await this.projectsRepository.find({
      relations: ['owner', 'investments'],
    });
  }

  async findOne(id: number): Promise<Project> {
    const project = await this.projectsRepository.findOne({
      where: { id },
      relations: ['owner', 'investments'],
    });
    if (!project) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }
    return project;
  }

  async update(
    id: number,
    updateProjectDto: UpdateProjectDto,
    userId: number,
    userRole: UserRole,
  ): Promise<Project> {
    const project = await this.findOne(id);

    if (project.owner.id !== userId && userRole !== UserRole.ADMIN) {
      throw new ForbiddenException('You can only update your own projects');
    }

    await this.projectsRepository.update(id, updateProjectDto);
    return this.findOne(id);
  }

  async remove(id: number, userId: number, userRole: UserRole): Promise<void> {
    const project = await this.findOne(id);

    if (project.owner.id !== userId && userRole !== UserRole.ADMIN) {
      throw new ForbiddenException('You can only delete your own projects');
    }

    await this.projectsRepository.delete(id);
  }

  async findRecommended(userInterests: string[]): Promise<Project[]> {
    return await this.projectsRepository
      .createQueryBuilder('project')
      .where('project.category IN (:...interests)', {
        interests: userInterests,
      })
      .getMany();
  }

  async getRecommendedProjects(userId: number): Promise<Project[]> {
    const userWithInterests = await this.usersRepository.findOne({
      where: { id: userId },
      relations: ['interests'],
    });

    if (!userWithInterests || !userWithInterests.interests.length) {
      return this.findAll();
    }

    const interestNames = userWithInterests.interests.map(
      (interest) => interest.name,
    );

    return this.projectsRepository
      .createQueryBuilder('project')
      .leftJoinAndSelect('project.owner', 'owner')
      .where('project.category IN (:...interests)', {
        interests: interestNames,
      })
      .orderBy('project.createdAt', 'DESC')
      .take(10)
      .getMany();
  }
}
