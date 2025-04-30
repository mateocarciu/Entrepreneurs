import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { InterestsService } from './interests.service';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { User } from '../common/decorators/user.decorator';
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiResponse,
  ApiBody,
} from '@nestjs/swagger';

@Controller('interests')
@ApiTags('interests')
export class InterestsController {
  constructor(private readonly interestsService: InterestsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all interests' })
  @ApiResponse({ status: 200, description: 'List of all interests.' })
  findAll() {
    return this.interestsService.findAll();
  }

  @Post('user')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Add interests to user' })
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
  addUserInterests(@User() user, @Body() interestIds: number[]) {
    return this.interestsService.addUserInterests(user.id, interestIds);
  }

  @Get('user')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get user interests' })
  @ApiResponse({ status: 200, description: 'List of user interests.' })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - Bearer token is missing or invalid.',
  })
  getUserInterests(@User() user) {
    return this.interestsService.getUserInterests(user.id);
  }
}
