import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddingAnalysisTable1729571113698 implements MigrationInterface {
  name = 'AddingAnalysisTable1729571113698';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "analysis" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "characteristicIds" text NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_300795d51c57ef52911ed65851f" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "analysis"`);
  }
}
