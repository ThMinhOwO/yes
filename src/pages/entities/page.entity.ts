import { Allow } from 'class-validator';
import { Role } from 'src/roles/entities/role.entity';
import { EntityHelper } from 'src/utils/entity-helper';
import { Entity, JoinTable, ManyToMany, Column, OneToMany, ManyToOne } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { PageToRole } from './page-to-role.entity';
import { UUID } from 'src/utils/types/uuid';

@Entity('c_page')
export class Page extends EntityHelper {
  @Allow()
  @ApiProperty()
  @Column()
  path?: string;

  @Allow()
  @ApiProperty()
  @Column()
  name?: string;

  @Allow()
  @ApiProperty()
  @Column({nullable: true})
  description?: string;

  @Allow()
  @ApiProperty()
  @Column({nullable: true})
  icon?: string;

  @Allow()
  @ApiProperty()
  @Column({nullable: true})
  order?: number;

  @Allow()
  @ApiProperty()
  @Column({nullable: true})
  parent?: UUID;

  @OneToMany(() => PageToRole, (pageToRole) => pageToRole.page, {cascade: true,nullable: true})
  pageToRole?: PageToRole[];


}
