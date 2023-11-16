import { ApiProperty } from "@nestjs/swagger";
import { Allow } from "class-validator";
import { EntityHelper } from "src/utils/entity-helper";
import { UUID } from "src/utils/types/uuid";
import { Column } from "typeorm";

export class Review extends EntityHelper{
    @Allow()
    @ApiProperty()
    @Column()
    objectId?: UUID;

    @Allow()
    @ApiProperty()
    @Column()
    objectType?: UUID;

    @Allow()
    @ApiProperty()
    @Column()
    title?: string;

    @Allow()
    @ApiProperty()
    @Column()
    description?: string;

    @Allow()
    @ApiProperty()
    @Column()
    status?: string;
}