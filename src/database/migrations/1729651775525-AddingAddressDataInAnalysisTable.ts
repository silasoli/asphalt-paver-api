import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddingAddressDataInAnalysisTable1729651775525
  implements MigrationInterface
{
  name = 'AddingAddressDataInAnalysisTable1729651775525';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "analysis" ADD "address" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "analysis" ADD "addressNumber" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "analysis" ADD "complement" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "analysis" ADD "city" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "analysis" ADD "state" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "analysis" ADD "postalCode" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "analysis" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "analysis" DROP COLUMN "updatedAt"`);
    await queryRunner.query(`ALTER TABLE "analysis" DROP COLUMN "postalCode"`);
    await queryRunner.query(`ALTER TABLE "analysis" DROP COLUMN "state"`);
    await queryRunner.query(`ALTER TABLE "analysis" DROP COLUMN "city"`);
    await queryRunner.query(`ALTER TABLE "analysis" DROP COLUMN "complement"`);
    await queryRunner.query(
      `ALTER TABLE "analysis" DROP COLUMN "addressNumber"`,
    );
    await queryRunner.query(`ALTER TABLE "analysis" DROP COLUMN "address"`);
  }
}
