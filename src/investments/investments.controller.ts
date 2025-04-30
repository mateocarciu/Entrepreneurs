import { Controller, Get, Post, Body, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { InvestmentsService } from './investments.service';
import { CreateInvestmentDto } from './dto/create-investment.dto';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../common/enums/roles.enum';
import { User } from '../common/decorators/user.decorator';

@ApiTags('Investments')
@ApiBearerAuth()
@Controller('investments')
@UseGuards(JwtAuthGuard, RolesGuard)
export class InvestmentsController {
  constructor(private readonly investmentsService: InvestmentsService) {}

  @Post()
  @Roles(UserRole.INVESTOR)
  @ApiOperation({ summary: 'Create a new investment' })
  @ApiResponse({ status: 201, description: 'Investment created successfully' })
  create(@Body() createInvestmentDto: CreateInvestmentDto, @User() user) {
    return this.investmentsService.create(createInvestmentDto, user.id);
  }

  @Get()
  @ApiOperation({ summary: 'Get all investments for current user' })
  @ApiResponse({ status: 200, description: 'List of user investments' })
  findMyInvestments(@User() user) {
    return this.investmentsService.findByInvestor(user.id);
  }

  @Get('project/:id')
  @ApiOperation({ summary: 'Get all investments for a specific project' })
  @ApiResponse({ status: 200, description: 'List of project investments' })
  findProjectInvestments(@Param('id') projectId: string) {
    return this.investmentsService.findByProject(+projectId);
  }

  @Delete(':id')
  @Roles(UserRole.INVESTOR)
  @ApiOperation({ summary: 'Delete an investment' })
  @ApiResponse({ status: 200, description: 'Investment deleted successfully' })
  remove(@Param('id') id: string, @User() user) {
    return this.investmentsService.remove(+id, user.id);
  }
}