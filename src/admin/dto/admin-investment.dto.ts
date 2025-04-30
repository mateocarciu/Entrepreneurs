import { ApiProperty } from '@nestjs/swagger';

export class AdminInvestmentResponseDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 50000 })
  amount: number;

  @ApiProperty({ example: 1 })
  projectId: number;

  @ApiProperty({ example: 1 })
  investorId: number;

  @ApiProperty({ example: '2024-03-20T12:00:00Z' })
  createdAt: Date;
}
