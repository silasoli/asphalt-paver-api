import { MigrationInterface, QueryRunner } from "typeorm";

export class AddingAnalysisName1731625448375 implements MigrationInterface {
    name = 'AddingAnalysisName1731625448375'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "analysis" ADD "name" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "analysis" DROP COLUMN "name"`);
    }

}
