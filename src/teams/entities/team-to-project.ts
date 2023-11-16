import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { EntityHelper } from 'src/utils/entity-helper';
import { UUID } from 'src/utils/types/uuid';

import { Team } from './team.entity';
import { Project } from 'src/projects/entities/project.entity';

@Entity('team_to_project')
export class TeamToProject extends EntityHelper {
    @Column('team_id')
    teamId: UUID;
    @Column('project_id')
    projectId: UUID;
    @ManyToOne(() => Team, (team) => team.teamToProject)
    @JoinColumn({ name: 'team_id' })
    team: Team;
    @ManyToOne(() => Project, (project) => project.teamToProject)
    @JoinColumn({ name: 'project_id' })
    project: Project;

}