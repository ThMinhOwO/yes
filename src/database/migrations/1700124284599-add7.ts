import { MigrationInterface, QueryRunner } from "typeorm";

export class Add71700124284599 implements MigrationInterface {
    name = 'Add71700124284599'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_to_task" DROP CONSTRAINT "FK_06038a96f29a53885399038080a"`);
        await queryRunner.query(`CREATE TABLE "team" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "description" character varying, "status" character varying NOT NULL, "projectId" uuid, CONSTRAINT "PK_f57d8293406df4af348402e4b74" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "team" DROP COLUMN "projectId"`);
        await queryRunner.query(`ALTER TABLE "team" ADD "projectId" uuid`);
        await queryRunner.query(`ALTER TABLE "team" ALTER COLUMN "status" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user_to_task" ADD CONSTRAINT "FK_06038a96f29a53885399038080a" FOREIGN KEY ("taskId") REFERENCES "team"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "team" ADD CONSTRAINT "FK_2defea9edb26358ff53c172ee28" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "team" DROP CONSTRAINT "FK_2defea9edb26358ff53c172ee28"`);
        await queryRunner.query(`ALTER TABLE "user_to_task" DROP CONSTRAINT "FK_06038a96f29a53885399038080a"`);
        await queryRunner.query(`ALTER TABLE "team" ALTER COLUMN "status" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "team" DROP COLUMN "projectId"`);
        await queryRunner.query(`ALTER TABLE "team" ADD "projectId" uuid`);
        await queryRunner.query(`DROP TABLE "team"`);
        await queryRunner.query(`ALTER TABLE "user_to_task" ADD CONSTRAINT "FK_06038a96f29a53885399038080a" FOREIGN KEY ("taskId") REFERENCES "task"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
