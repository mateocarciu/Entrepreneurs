import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InterestsService } from './interests.service';
import { InterestsController } from './interests.controller';
import { Interest } from './entities/interest.entity';
import { User } from '../users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Interest, User])],
  providers: [InterestsService],
  controllers: [InterestsController],
})
export class InterestsModule {}
