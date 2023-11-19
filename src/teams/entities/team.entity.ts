import { EntityHelper } from 'src/utils/entity-helper';
import {
  Column,
  Entity,
  OneToMany,
} from 'typeorm';
import { TeamToProject } from './team-to-project.entity';
import { TeamToUser } from './team-to-user.entity';

@Entity('team')
export class Team extends EntityHelper {
  @Column()
  name?: string;

  @Column({ nullable: true})
  description?: string;

  @Column({ nullable: true})
  status?: string;

  @OneToMany(() => TeamToProject, (teamToProject) => teamToProject.team,{cascade: true,nullable: true})
  teamToProject?: TeamToProject[];

  @OneToMany(() => TeamToUser, (teamToUser) => teamToUser.team, {cascade: true,nullable: true})
  teamToUser?: TeamToUser[];
}
