import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../common/enums/roles.enum';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { User } from '../common/decorators/user.decorator';

@Controller('projects')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiTags('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  @Roles(UserRole.ENTREPRENEUR, UserRole.ADMIN)
  @ApiOperation({ summary: 'Create a new project' })
  create(@Body() createProjectDto: CreateProjectDto, @User() user) {
    return this.projectsService.create(createProjectDto, user.id);
  }

  @Get()
  @ApiOperation({ summary: 'Get all projects' })
  findAll() {
    return this.projectsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a project by ID' })
  findOne(@Param('id') id: string) {
    return this.projectsService.findOne(+id);
  }

  @Put(':id')
  @Roles(UserRole.ENTREPRENEUR)
  @ApiOperation({ summary: 'Update a project' })
  update(
    @Param('id') id: string,
    @Body() updateProjectDto: UpdateProjectDto,
    @User() user,
  ) {
    return this.projectsService.update(
      +id,
      updateProjectDto,
      user.id,
      user.role,
    );
  }

  @Delete(':id')
  @Roles(UserRole.ENTREPRENEUR, UserRole.ADMIN)
  @ApiOperation({ summary: 'Delete a project' })
  remove(@Param('id') id: string, @User() user) {
    return this.projectsService.remove(+id, user.id, user.role);
  }
}
