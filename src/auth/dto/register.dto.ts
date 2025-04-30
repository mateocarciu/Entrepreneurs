import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength, IsEnum } from 'class-validator';
import { UserRole } from '../../common/enums/roles.enum';

export class RegisterDto {
  @ApiProperty({
    example: 'user@example.com',
    description: 'Email address of the user',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'password123',
    description: 'User password',
    minLength: 6,
  })
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({
    example: 'John',
    description: 'First name of the user',
  })
  @IsString()
  firstName: string;

  @ApiProperty({
    example: 'Doe',
    description: 'Last name of the user',
  })
  @IsString()
  lastName: string;

  @ApiProperty({
    enum: UserRole,
    example: UserRole.ENTREPRENEUR,
    description: 'Role of the user',
  })
  @IsEnum(UserRole)
  role: UserRole;
}