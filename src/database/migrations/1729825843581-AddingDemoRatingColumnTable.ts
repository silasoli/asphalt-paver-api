import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddingDemoRatingColumnTable1729825843581
  implements MigrationInterface
{
  name = 'AddingDemoRatingColumnTable1729825843581';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "analysis" ADD "demoRating" text`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "analysis" DROP COLUMN "demoRating"`);
  }
}
