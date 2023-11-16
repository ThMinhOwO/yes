import { MigrationInterface, QueryRunner } from "typeorm";

export class Update51700107579512 implements MigrationInterface {
    name = 'Update51700107579512'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "c_page" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "path" character varying NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "icon" character varying NOT NULL, "order" integer NOT NULL, CONSTRAINT "PK_eb1d7ae4a0957df99edef6490f3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "c_page_roles_c_role" ("cPageId" uuid NOT NULL, "cRoleId" uuid NOT NULL, CONSTRAINT "PK_5473b0dc48ccbd1455b2a441896" PRIMARY KEY ("cPageId", "cRoleId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_ff3c4da23c450c978ade813ca2" ON "c_page_roles_c_role" ("cPageId") `);
        await queryRunner.query(`CREATE INDEX "IDX_cf6c20183f0785178235709aea" ON "c_page_roles_c_role" ("cRoleId") `);
        await queryRunner.query(`ALTER TABLE "c_role" ADD "description" character varying`);
        await queryRunner.query(`ALTER TABLE "c_page_roles_c_role" ADD CONSTRAINT "FK_ff3c4da23c450c978ade813ca24" FOREIGN KEY ("cPageId") REFERENCES "c_page"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "c_page_roles_c_role" ADD CONSTRAINT "FK_cf6c20183f0785178235709aeae" FOREIGN KEY ("cRoleId") REFERENCES "c_role"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "c_page_roles_c_role" DROP CONSTRAINT "FK_cf6c20183f0785178235709aeae"`);
        await queryRunner.query(`ALTER TABLE "c_page_roles_c_role" DROP CONSTRAINT "FK_ff3c4da23c450c978ade813ca24"`);
        await queryRunner.query(`ALTER TABLE "c_role" DROP COLUMN "description"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_cf6c20183f0785178235709aea"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_ff3c4da23c450c978ade813ca2"`);
        await queryRunner.query(`DROP TABLE "c_page_roles_c_role"`);
        await queryRunner.query(`DROP TABLE "c_page"`);
    }

}
