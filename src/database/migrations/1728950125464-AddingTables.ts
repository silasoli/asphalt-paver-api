import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddingTables1728950125464 implements MigrationInterface {
  name = 'AddingTables1728950125464';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "characteristics" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "description" character(50) NOT NULL, "name" character(50) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "demonstrationId" uuid, CONSTRAINT "PK_a64133a287a0f2d735da40fcd89" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "solutions" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "description" character(50) NOT NULL, "name" character(50) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "demonstrationId" uuid, CONSTRAINT "PK_05589f12803f420b119df2f6170" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "demonstrations" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character(50) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_8e057329c1868672f00cb6c73d5" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "causes" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character(50) NOT NULL, "description" character(50) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "demonstrationId" uuid, CONSTRAINT "PK_5f2a74a26cb4e00f1f4a1723486" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "characteristics" ADD CONSTRAINT "FK_2a73e883a72bd203a7d0a9b4eac" FOREIGN KEY ("demonstrationId") REFERENCES "demonstrations"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "solutions" ADD CONSTRAINT "FK_489cd8fb329b709abefdb526fc3" FOREIGN KEY ("demonstrationId") REFERENCES "demonstrations"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "causes" ADD CONSTRAINT "FK_12cfb5d5678d3ab935e7f7c0e32" FOREIGN KEY ("demonstrationId") REFERENCES "demonstrations"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "causes" DROP CONSTRAINT "FK_12cfb5d5678d3ab935e7f7c0e32"`,
    );
    await queryRunner.query(
      `ALTER TABLE "solutions" DROP CONSTRAINT "FK_489cd8fb329b709abefdb526fc3"`,
    );
    await queryRunner.query(
      `ALTER TABLE "characteristics" DROP CONSTRAINT "FK_2a73e883a72bd203a7d0a9b4eac"`,
    );
    await queryRunner.query(`DROP TABLE "causes"`);
    await queryRunner.query(`DROP TABLE "demonstrations"`);
    await queryRunner.query(`DROP TABLE "solutions"`);
    await queryRunner.query(`DROP TABLE "characteristics"`);
  }
}
