import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsNotEmpty } from 'class-validator';

export class CreateProjectDto {
  @ApiProperty({
    example: 'My Startup Project',
    description: 'Title of the project',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    example: 'A detailed description of my startup project...',
    description: 'Detailed description of the project',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    example: 50000,
    description: 'Required budget for the project',
  })
  @IsNumber()
  budget: number;

  @ApiProperty({
    example: 'Technology',
    description: 'Category of the project',
  })
  @IsString()
  @IsNotEmpty()
  category: string;
}
