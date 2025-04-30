import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateInitialTables1234567890 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE users (
        id INT PRIMARY KEY AUTO_INCREMENT,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        firstName VARCHAR(255) NOT NULL,
        lastName VARCHAR(255) NOT NULL,
        role ENUM('admin', 'entrepreneur', 'investor') NOT NULL DEFAULT 'entrepreneur',
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      );

      CREATE TABLE projects (
        id INT PRIMARY KEY AUTO_INCREMENT,
        title VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        budget DECIMAL(10,2) NOT NULL,
        category VARCHAR(255) NOT NULL,
        ownerId INT,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (ownerId) REFERENCES users(id)
      );

      CREATE TABLE interests (
        id INT PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(255) NOT NULL UNIQUE
      );

      CREATE TABLE user_interests (
        userId INT,
        interestId INT,
        PRIMARY KEY (userId, interestId),
        FOREIGN KEY (userId) REFERENCES users(id),
        FOREIGN KEY (interestId) REFERENCES interests(id)
      );

      CREATE TABLE investments (
        id INT PRIMARY KEY AUTO_INCREMENT,
        amount DECIMAL(10,2) NOT NULL,
        investorId INT,
        projectId INT,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (investorId) REFERENCES users(id),
        FOREIGN KEY (projectId) REFERENCES projects(id)
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP TABLE investments;
      DROP TABLE user_interests;
      DROP TABLE interests;
      DROP TABLE projects;
      DROP TABLE users;
    `);
  }
}
