import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialMigration1745920090392 implements MigrationInterface {
  name = 'InitialMigration1745920090392';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`investments\` (\`id\` int NOT NULL AUTO_INCREMENT, \`amount\` decimal(10,2) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`investorId\` int NULL, \`projectId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`projects\` (\`id\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(255) NOT NULL, \`description\` text NOT NULL, \`budget\` decimal(10,2) NOT NULL, \`category\` varchar(255) NOT NULL, \`ownerId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`interests\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`description\` text NULL, UNIQUE INDEX \`IDX_616348777087f88bb8cb743e60\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`users\` (\`id\` int NOT NULL AUTO_INCREMENT, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`firstName\` varchar(255) NOT NULL, \`lastName\` varchar(255) NOT NULL, \`role\` enum ('admin', 'entrepreneur', 'investor') NOT NULL DEFAULT 'entrepreneur', UNIQUE INDEX \`IDX_97672ac88f789774dd47f7c8be\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`users_interests_interests\` (\`usersId\` int NOT NULL, \`interestsId\` int NOT NULL, INDEX \`IDX_eabab8314074b59d333a0de3e4\` (\`usersId\`), INDEX \`IDX_b8ff2acc4db7a9d0d5a5b13c5f\` (\`interestsId\`), PRIMARY KEY (\`usersId\`, \`interestsId\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`investments\` ADD CONSTRAINT \`FK_93332d5e49cd494527409e0be3d\` FOREIGN KEY (\`investorId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`investments\` ADD CONSTRAINT \`FK_281e9a76a495935d6a404eea626\` FOREIGN KEY (\`projectId\`) REFERENCES \`projects\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`projects\` ADD CONSTRAINT \`FK_a8e7e6c3f9d9528ed35fe5bae33\` FOREIGN KEY (\`ownerId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users_interests_interests\` ADD CONSTRAINT \`FK_eabab8314074b59d333a0de3e4a\` FOREIGN KEY (\`usersId\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users_interests_interests\` ADD CONSTRAINT \`FK_b8ff2acc4db7a9d0d5a5b13c5f9\` FOREIGN KEY (\`interestsId\`) REFERENCES \`interests\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`users_interests_interests\` DROP FOREIGN KEY \`FK_b8ff2acc4db7a9d0d5a5b13c5f9\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`users_interests_interests\` DROP FOREIGN KEY \`FK_eabab8314074b59d333a0de3e4a\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`projects\` DROP FOREIGN KEY \`FK_a8e7e6c3f9d9528ed35fe5bae33\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`investments\` DROP FOREIGN KEY \`FK_281e9a76a495935d6a404eea626\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`investments\` DROP FOREIGN KEY \`FK_93332d5e49cd494527409e0be3d\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_b8ff2acc4db7a9d0d5a5b13c5f\` ON \`users_interests_interests\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_eabab8314074b59d333a0de3e4\` ON \`users_interests_interests\``,
    );
    await queryRunner.query(`DROP TABLE \`users_interests_interests\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_97672ac88f789774dd47f7c8be\` ON \`users\``,
    );
    await queryRunner.query(`DROP TABLE \`users\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_616348777087f88bb8cb743e60\` ON \`interests\``,
    );
    await queryRunner.query(`DROP TABLE \`interests\``);
    await queryRunner.query(`DROP TABLE \`projects\``);
    await queryRunner.query(`DROP TABLE \`investments\``);
  }
}
