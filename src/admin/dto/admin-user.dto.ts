import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '../../common/enums/roles.enum';

export class AdminUserResponseDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'john.doe@example.com' })
  email: string;

  @ApiProperty({ example: 'John' })
  firstName: string;

  @ApiProperty({ example: 'Doe' })
  lastName: string;

  @ApiProperty({ enum: UserRole, example: UserRole.ADMIN })
  role: UserRole;

  @ApiProperty({ example: '2024-03-20T12:00:00Z' })
  createdAt: Date;

  @ApiProperty({ example: '2024-03-20T12:00:00Z' })
  updatedAt: Date;
}
