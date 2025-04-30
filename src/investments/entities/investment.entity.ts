import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Project } from '../../projects/entities/project.entity';

@Entity('investments')
export class Investment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('decimal', { precision: 10, scale: 2 })
  amount: number;

  @ManyToOne(() => User, user => user.investments)
  investor: User;

  @ManyToOne(() => Project, project => project.investments)
  project: Project;

  @CreateDateColumn()
  createdAt: Date;
} 