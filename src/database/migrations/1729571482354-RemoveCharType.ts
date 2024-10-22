import { MigrationInterface, QueryRunner } from "typeorm";

export class RemoveCharType1729571482354 implements MigrationInterface {
    name = 'RemoveCharType1729571482354'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "causes" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "causes" ADD "name" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "causes" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "causes" ADD "description" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "characteristics" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "characteristics" ADD "description" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "characteristics" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "characteristics" ADD "name" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "demonstrations" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "demonstrations" ADD "name" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "solutions" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "solutions" ADD "description" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "solutions" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "solutions" ADD "name" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "solutions" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "solutions" ADD "name" character NOT NULL`);
        await queryRunner.query(`ALTER TABLE "solutions" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "solutions" ADD "description" character NOT NULL`);
        await queryRunner.query(`ALTER TABLE "demonstrations" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "demonstrations" ADD "name" character NOT NULL`);
        await queryRunner.query(`ALTER TABLE "characteristics" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "characteristics" ADD "name" character NOT NULL`);
        await queryRunner.query(`ALTER TABLE "characteristics" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "characteristics" ADD "description" character NOT NULL`);
        await queryRunner.query(`ALTER TABLE "causes" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "causes" ADD "description" character NOT NULL`);
        await queryRunner.query(`ALTER TABLE "causes" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "causes" ADD "name" character NOT NULL`);
    }

}
