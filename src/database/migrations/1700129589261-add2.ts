import { MigrationInterface, QueryRunner } from "typeorm";

export class Add21700129589261 implements MigrationInterface {
    name = 'Add21700129589261'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "page_to_role" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "pageId" uuid NOT NULL, "roleId" uuid NOT NULL, CONSTRAINT "PK_61b8ca676b015b5c6c931430622" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "c_page" ADD "parent" character varying`);
        await queryRunner.query(`ALTER TABLE "page_to_role" ADD CONSTRAINT "FK_55057bdc3b6c3f04c3b43fd36e9" FOREIGN KEY ("pageId") REFERENCES "c_page"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "page_to_role" ADD CONSTRAINT "FK_e396775b3644453db244eb5076b" FOREIGN KEY ("roleId") REFERENCES "c_role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "page_to_role" DROP CONSTRAINT "FK_e396775b3644453db244eb5076b"`);
        await queryRunner.query(`ALTER TABLE "page_to_role" DROP CONSTRAINT "FK_55057bdc3b6c3f04c3b43fd36e9"`);
        await queryRunner.query(`ALTER TABLE "c_page" DROP COLUMN "parent"`);
        await queryRunner.query(`DROP TABLE "page_to_role"`);
    }

}
