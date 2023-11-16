import { Column, Entity, ManyToMany, PrimaryColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Allow, IsNumber } from 'class-validator';
import { EntityHelper } from 'src/utils/entity-helper';


@Entity('c_role')
export class Role extends EntityHelper {


  @Allow()
  @ApiProperty({ example: 'Admin' })
  @Column()
  name?: string;

  @Allow()
  @ApiProperty({ example: 'Administrator' })
  @Column({ nullable: true})
  description?: string;

}
