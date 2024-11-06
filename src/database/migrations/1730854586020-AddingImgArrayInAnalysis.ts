import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddingImgArrayInAnalysis1730854586020
  implements MigrationInterface
{
  name = 'AddingImgArrayInAnalysis1730854586020';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "analysis" ADD "images" text`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "analysis" DROP COLUMN "images"`);
  }
}
