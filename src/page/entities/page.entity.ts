import { Allow } from 'class-validator';
import { Role } from 'src/roles/entities/role.entity';
import { EntityHelper } from 'src/utils/entity-helper';
import { Entity, JoinTable, ManyToMany, Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

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

  @ManyToMany(() => Role, { cascade: true })
  @JoinTable()
  roles?: Role[];
}
