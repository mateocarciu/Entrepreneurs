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
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiResponse,
} from '@nestjs/swagger';
import { User } from '../common/decorators/user.decorator';

interface AuthenticatedUser {
  id: number;
  email: string;
  role: UserRole;
}

@Controller('projects')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiTags('projects')
@ApiBearerAuth()
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  @Roles(UserRole.ENTREPRENEUR, UserRole.ADMIN)
  @ApiOperation({ summary: 'Create a new project' })
  @ApiResponse({ status: 201, description: 'Project successfully created.' })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - Bearer token is missing or invalid.',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden - User does not have required role.',
  })
  create(
    @Body() createProjectDto: CreateProjectDto,
    @User() user: AuthenticatedUser,
  ) {
    return this.projectsService.create(createProjectDto, user.id);
  }

  @Get()
  @ApiOperation({ summary: 'Get all projects' })
  findAll() {
    return this.projectsService.findAll();
  }

  @Get('recommended')
  @ApiOperation({ summary: 'Get recommended projects based on user interests' })
  @ApiResponse({ status: 200, description: 'List of recommended projects.' })
  getRecommendedProjects(@User() user: AuthenticatedUser) {
    return this.projectsService.getRecommendedProjects(user.id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a project by ID' })
  findOne(@Param('id') id: string) {
    return this.projectsService.findOne(+id);
  }

  @Put(':id')
  @Roles(UserRole.ENTREPRENEUR, UserRole.ADMIN)
  @ApiOperation({ summary: 'Update a project' })
  update(
    @Param('id') id: string,
    @Body() updateProjectDto: UpdateProjectDto,
    @User() user: AuthenticatedUser,
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
  remove(@Param('id') id: string, @User() user: AuthenticatedUser) {
    return this.projectsService.remove(+id, user.id, user.role);
  }
}
