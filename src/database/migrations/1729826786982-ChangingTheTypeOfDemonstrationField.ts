import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangingTheTypeOfDemonstrationField1729826786982 implements MigrationInterface {
    name = 'ChangingTheTypeOfDemonstrationField1729826786982'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "analysis" DROP COLUMN "demostration"`);
        await queryRunner.query(`ALTER TABLE "analysis" ADD "demostration" text`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "analysis" DROP COLUMN "demostration"`);
        await queryRunner.query(`ALTER TABLE "analysis" ADD "demostration" character varying`);
    }

}
