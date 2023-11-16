import { MigrationInterface, QueryRunner } from "typeorm";

export class Add51700144850243 implements MigrationInterface {
    name = 'Add51700144850243'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "room_to_user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "roomId" uuid NOT NULL, "userId" uuid NOT NULL, "isMuted" boolean NOT NULL DEFAULT false, "isPinned" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_7091839de9b08c9b7504b615bd9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "room_to_user" ADD CONSTRAINT "FK_804753e809931f959b0e1c14ce9" FOREIGN KEY ("roomId") REFERENCES "room"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "room_to_user" ADD CONSTRAINT "FK_7634691047588221e71f48501f3" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "room_to_user" DROP CONSTRAINT "FK_7634691047588221e71f48501f3"`);
        await queryRunner.query(`ALTER TABLE "room_to_user" DROP CONSTRAINT "FK_804753e809931f959b0e1c14ce9"`);
        await queryRunner.query(`DROP TABLE "room_to_user"`);
    }

}
