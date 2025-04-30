import { Controller, Get, Delete, Param, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../common/enums/roles.enum';
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiResponse,
  ApiParam,
} from '@nestjs/swagger';
import { AdminUserResponseDto } from './dto/admin-user.dto';
import { AdminInvestmentResponseDto } from './dto/admin-investment.dto';

@Controller('admin')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN)
@ApiTags('Admin')
@ApiBearerAuth()
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('users')
  @ApiOperation({ summary: 'Get all users (Admin only)' })
  @ApiResponse({
    status: 200,
    description: 'List of all users',
    type: [AdminUserResponseDto],
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - Bearer token is missing or invalid',
  })
  @ApiResponse({ status: 403, description: 'Forbidden - User is not an admin' })
  getAllUsers() {
    return this.adminService.getAllUsers();
  }

  @Get('investments')
  @ApiOperation({ summary: 'Get all investments (Admin only)' })
  @ApiResponse({
    status: 200,
    description: 'List of all investments',
    type: [AdminInvestmentResponseDto],
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - Bearer token is missing or invalid',
  })
  @ApiResponse({ status: 403, description: 'Forbidden - User is not an admin' })
  getAllInvestments() {
    return this.adminService.getAllInvestments();
  }

  @Delete('users/:id')
  @ApiOperation({ summary: 'Delete a user (Admin only)' })
  @ApiParam({ name: 'id', description: 'User ID to delete', type: 'number' })
  @ApiResponse({ status: 200, description: 'User successfully deleted' })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - Bearer token is missing or invalid',
  })
  @ApiResponse({ status: 403, description: 'Forbidden - User is not an admin' })
  @ApiResponse({ status: 404, description: 'User not found' })
  removeUser(@Param('id') id: string) {
    return this.adminService.removeUser(+id);
  }
}
