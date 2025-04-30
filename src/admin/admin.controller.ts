import { Controller, Get, Delete, Param, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../common/enums/roles.enum';

@Controller('admin')
@UseGuards(JwtAuthGuard)
@Roles(UserRole.ADMIN)
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('users')
  getAllUsers() {
    return this.adminService.getAllUsers();
  }

  @Get('investments')
  getAllInvestments() {
    return this.adminService.getAllInvestments();
  }

  @Delete('users/:id')
  removeUser(@Param('id') id: string) {
    return this.adminService.removeUser(+id);
  }
} 