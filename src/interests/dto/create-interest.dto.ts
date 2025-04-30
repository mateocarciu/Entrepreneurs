import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateInterestDto {
  @ApiProperty({
    example: 'Technology',
    description: 'Name of the interest',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'Everything related to technology and innovation',
    description: 'Description of the interest',
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;
}
