import { MigrationInterface, QueryRunner } from "typeorm";

export class RemoveLengthOfColumns1729571182120 implements MigrationInterface {
    name = 'RemoveLengthOfColumns1729571182120'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "causes" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "causes" ADD "name" character NOT NULL`);
        await queryRunner.query(`ALTER TABLE "causes" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "causes" ADD "description" character NOT NULL`);
        await queryRunner.query(`ALTER TABLE "characteristics" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "characteristics" ADD "description" character NOT NULL`);
        await queryRunner.query(`ALTER TABLE "characteristics" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "characteristics" ADD "name" character NOT NULL`);
        await queryRunner.query(`ALTER TABLE "demonstrations" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "demonstrations" ADD "name" character NOT NULL`);
        await queryRunner.query(`ALTER TABLE "solutions" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "solutions" ADD "description" character NOT NULL`);
        await queryRunner.query(`ALTER TABLE "solutions" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "solutions" ADD "name" character NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "solutions" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "solutions" ADD "name" character(50) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "solutions" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "solutions" ADD "description" character(50) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "demonstrations" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "demonstrations" ADD "name" character(50) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "characteristics" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "characteristics" ADD "name" character(50) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "characteristics" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "characteristics" ADD "description" character(50) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "causes" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "causes" ADD "description" character(50) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "causes" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "causes" ADD "name" character(50) NOT NULL`);
    }

}
