import { MigrationInterface, QueryRunner } from 'typeorm';

export class AdjustDemostrationsRelation1729648845739
  implements MigrationInterface
{
  name = 'AdjustDemostrationsRelation1729648845739';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "characteristics" DROP CONSTRAINT "FK_2a73e883a72bd203a7d0a9b4eac"`,
    );
    await queryRunner.query(
      `CREATE TABLE "characteristics_demonstrations_demonstrations" ("characteristicsId" uuid NOT NULL, "demonstrationsId" uuid NOT NULL, CONSTRAINT "PK_4a4ce13616ae0a76bd78f2d7ded" PRIMARY KEY ("characteristicsId", "demonstrationsId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_8c497db5521e2d1f8305db9486" ON "characteristics_demonstrations_demonstrations" ("characteristicsId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_490521bfb81fe21528c5736b17" ON "characteristics_demonstrations_demonstrations" ("demonstrationsId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "characteristics" DROP COLUMN "demonstrationId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "characteristics_demonstrations_demonstrations" ADD CONSTRAINT "FK_8c497db5521e2d1f8305db94863" FOREIGN KEY ("characteristicsId") REFERENCES "characteristics"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "characteristics_demonstrations_demonstrations" ADD CONSTRAINT "FK_490521bfb81fe21528c5736b174" FOREIGN KEY ("demonstrationsId") REFERENCES "demonstrations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "characteristics_demonstrations_demonstrations" DROP CONSTRAINT "FK_490521bfb81fe21528c5736b174"`,
    );
    await queryRunner.query(
      `ALTER TABLE "characteristics_demonstrations_demonstrations" DROP CONSTRAINT "FK_8c497db5521e2d1f8305db94863"`,
    );
    await queryRunner.query(
      `ALTER TABLE "characteristics" ADD "demonstrationId" uuid`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_490521bfb81fe21528c5736b17"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_8c497db5521e2d1f8305db9486"`,
    );
    await queryRunner.query(
      `DROP TABLE "characteristics_demonstrations_demonstrations"`,
    );
    await queryRunner.query(
      `ALTER TABLE "characteristics" ADD CONSTRAINT "FK_2a73e883a72bd203a7d0a9b4eac" FOREIGN KEY ("demonstrationId") REFERENCES "demonstrations"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }
}
