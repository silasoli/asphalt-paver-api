import { MigrationInterface, QueryRunner } from "typeorm";

export class AddingDemostrationColumn1729652887136 implements MigrationInterface {
    name = 'AddingDemostrationColumn1729652887136'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "analysis" ADD "demostration" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "analysis" DROP COLUMN "demostration"`);
    }

}
