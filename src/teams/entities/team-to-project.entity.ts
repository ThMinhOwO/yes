import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { EntityHelper } from 'src/utils/entity-helper';
import { UUID } from 'src/utils/types/uuid';

import { Team } from './team.entity';
import { Project } from 'src/projects/entities/project.entity';

@Entity('team_to_project')
export class TeamToProject extends EntityHelper {
    @Column()
    teamId: UUID;
    @Column()
    projectId: UUID;
    @ManyToOne(() => Team, (team) => team.teamToProject)
    team: Team;
    @ManyToOne(() => Project, (project) => project.teamToProject)
    project: Project;

}