import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ProjectsService } from './projects.service';
import { Project } from './entities/project.entity';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';

describe('ProjectsService', () => {
  let service: ProjectsService;
  let repository: Repository<Project>;

  const mockRepository = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProjectsService,
        {
          provide: getRepositoryToken(Project),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<ProjectsService>(ProjectsService);
    repository = module.get<Repository<Project>>(getRepositoryToken(Project));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findOne', () => {
    it('should return a project', async () => {
      const project = new Project();
      jest.spyOn(repository, 'findOne').mockResolvedValue(project);

      expect(await service.findOne(1)).toBe(project);
    });

    it('should throw NotFoundException when project not found', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(null);

      await expect(service.findOne(1)).rejects.toThrow(NotFoundException);
    });
  });
});
