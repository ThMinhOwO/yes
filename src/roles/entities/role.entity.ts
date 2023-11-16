import { Column, Entity, ManyToMany, OneToMany, PrimaryColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Allow, IsNumber } from 'class-validator';
import { EntityHelper } from 'src/utils/entity-helper';
import { PageToRole } from 'src/pages/entities/page-to-role.entity';


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

  @OneToMany(() => PageToRole, (pageToRole) => pageToRole.role, {cascade: true,nullable: true})
  pageToRole?: PageToRole[];
}
