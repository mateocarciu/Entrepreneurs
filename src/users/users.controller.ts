import {
  Controller,
  Get,
  Put,
  Delete,
  Param,
  Body,
  UseGuards,
  Post,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiBody,
} from '@nestjs/swagger';
import { UsersService } from './users.service';
import { InterestsService } from '../interests/interests.service';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../common/enums/roles.enum';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from '../common/decorators/user.decorator';
import { instanceToPlain } from 'class-transformer';

interface AuthenticatedUser {
  id: number;
  email: string;
  role: UserRole;
}

@ApiTags('Users')
@ApiBearerAuth()
@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly interestsService: InterestsService,
  ) {}

  @Get('profile')
  @ApiOperation({ summary: 'Get current user profile' })
  @ApiResponse({ status: 200, description: 'Profile retrieved successfully' })
  getProfile(@User() user: AuthenticatedUser) {
    const fullUser = this.usersService.findOne(user.id);
    return instanceToPlain(fullUser);
  }

  @Put('profile')
  @ApiOperation({ summary: 'Update current user profile' })
  @ApiResponse({ status: 200, description: 'Profile updated successfully' })
  updateProfile(
    @User() user: AuthenticatedUser,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const fullUser = this.usersService.update(user.id, updateUserDto);
    return instanceToPlain(fullUser);
  }

  @Get()
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Get all users (Admin only)' })
  @ApiResponse({ status: 200, description: 'List of all users' })
  findAll() {
    const fullUsers = this.usersService.findAll();
    return instanceToPlain(fullUsers);
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Delete user (Admin only)' })
  @ApiResponse({ status: 200, description: 'User deleted successfully' })
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }

  @Post('interests')
  @ApiOperation({ summary: 'Add interests to current user' })
  @ApiResponse({
    status: 201,
    description: 'Interests successfully added to user.',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - Bearer token is missing or invalid.',
  })
  @ApiBody({
    description: 'Array of interest IDs to add to user',
    schema: {
      type: 'object',
      properties: {
        interestIds: {
          type: 'array',
          items: {
            type: 'number',
          },
          example: [1, 2, 3],
        },
      },
    },
  })
  addInterests(
    @User() user: AuthenticatedUser,
    @Body() body: { interestIds: number[] },
  ) {
    return this.interestsService.addUserInterests(user.id, body.interestIds);
  }

  @Get('interests')
  @ApiOperation({ summary: 'Get current user interests' })
  @ApiResponse({ status: 200, description: 'List of user interests.' })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - Bearer token is missing or invalid.',
  })
  getUserInterests(@User() user: AuthenticatedUser) {
    return this.interestsService.getUserInterests(user.id);
  }
}
