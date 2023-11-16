import { Column, Entity, PrimaryColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Allow } from 'class-validator';
import { EntityHelper } from 'src/utils/entity-helper';

@Entity('c_status')
export class Status extends EntityHelper {

  @Allow()
  @ApiProperty({ example: 'Active' })
  @Column()
  name?: string;
}
