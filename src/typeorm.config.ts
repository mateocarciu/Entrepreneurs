import { DataSource } from 'typeorm';
import { User } from './users/entities/user.entity';
import { Project } from './projects/entities/project.entity';
import { Interest } from './interests/entities/interest.entity';
import { Investment } from './investments/entities/investment.entity';
import { config } from 'dotenv';

config();

export default new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '3306', 10),
  username: process.env.DB_USERNAME || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'entrepreneurs',
  entities: [User, Project, Interest, Investment],
  migrations: ['src/database/migrations/*.ts'],
  synchronize: false,
  logging: true,
});
