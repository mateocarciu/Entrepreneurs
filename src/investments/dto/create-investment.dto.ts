import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, Min, IsInt } from 'class-validator';

export class CreateInvestmentDto {
  @ApiProperty({
    example: 10000,
    description: 'Amount to invest',
    minimum: 0,
  })
  @IsNumber()
  @Min(0)
  amount: number;

  @ApiProperty({
    example: 1,
    description: 'ID of the project to invest in',
  })
  @IsInt()
  projectId: number;
}
