import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { InterestsService } from './interests.service';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { User } from '../common/decorators/user.decorator';

@Controller('interests')
export class InterestsController {
  constructor(private readonly interestsService: InterestsService) {}

  @Get()
  findAll() {
    return this.interestsService.findAll();
  }

  @Post('user')
  @UseGuards(JwtAuthGuard)
  addUserInterests(@User() user, @Body() interestIds: number[]) {
    return this.interestsService.addUserInterests(user.id, interestIds);
  }

  @Get('user')
  @UseGuards(JwtAuthGuard)
  getUserInterests(@User() user) {
    return this.interestsService.getUserInterests(user.id);
  }
}
