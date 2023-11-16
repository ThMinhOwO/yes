import { MigrationInterface, QueryRunner } from "typeorm";

export class Add11700127456866 implements MigrationInterface {
    name = 'Add11700127456866'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "team" DROP CONSTRAINT "FK_2defea9edb26358ff53c172ee28"`);
        await queryRunner.query(`ALTER TABLE "user_to_task" DROP CONSTRAINT "FK_06038a96f29a53885399038080a"`);
        await queryRunner.query(`CREATE TABLE "task" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "description" character varying, "status" character varying NOT NULL, "projectId" uuid, CONSTRAINT "PK_fb213f79ee45060ba925ecd576e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "team" DROP COLUMN "projectId"`);
        await queryRunner.query(`ALTER TABLE "team" ALTER COLUMN "status" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "task" ADD CONSTRAINT "FK_3797a20ef5553ae87af126bc2fe" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_to_task" ADD CONSTRAINT "FK_06038a96f29a53885399038080a" FOREIGN KEY ("taskId") REFERENCES "task"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_to_task" DROP CONSTRAINT "FK_06038a96f29a53885399038080a"`);
        await queryRunner.query(`ALTER TABLE "task" DROP CONSTRAINT "FK_3797a20ef5553ae87af126bc2fe"`);
        await queryRunner.query(`ALTER TABLE "team" ALTER COLUMN "status" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "team" ADD "projectId" uuid`);
        await queryRunner.query(`DROP TABLE "task"`);
        await queryRunner.query(`ALTER TABLE "user_to_task" ADD CONSTRAINT "FK_06038a96f29a53885399038080a" FOREIGN KEY ("taskId") REFERENCES "team"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "team" ADD CONSTRAINT "FK_2defea9edb26358ff53c172ee28" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
