import { Controller, Get } from '@nestjs/common';
import { InterestsService } from './interests.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

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
}
