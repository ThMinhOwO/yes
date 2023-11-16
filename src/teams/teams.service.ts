import { Injectable } from '@nestjs/common';
import { CreateTeamDto } from './dto/create-teams.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Team } from './entities/team.entity';
import { DeepPartial, FindOptionsWhere, Repository } from 'typeorm';
import { IPaginationOptions } from 'src/utils/types/pagination-options';
import { EntityCondition } from 'src/utils/types/entity-condition.type';
import { NullableType } from 'src/utils/types/nullable.type';
import { FilterTeamDto, SortTeamDto } from './dto/query-teams.dto';
import { TeamToUser } from './entities/team-to-user';
import { TeamToProject } from './entities/team-to-project';
import { UUID } from 'src/utils/types/uuid';
@Injectable()
export class TeamsService {
  constructor(
    @InjectRepository(Team)
    private teamRepository: Repository<Team>,
    @InjectRepository(TeamToUser)
    private teamToUserRepository: Repository<TeamToUser>, 
    @InjectRepository(TeamToProject)
    private teamToProjectRepository: Repository<TeamToProject>,
  ) {}
  async create(createTeamDto: CreateTeamDto): Promise<Team> {
    const team = this.teamRepository.create({
      name: createTeamDto.name,
      description: createTeamDto.description,
      status: createTeamDto.status,
    });
    const newTeam = await this.teamRepository.save(team);
    createTeamDto.users?.map(async (userId) => {
      const userToTeam = this.teamToUserRepository.create({
        userId: userId,
        teamId: newTeam.id,
      });
      await this.teamToUserRepository.save(userToTeam);
    });
    createTeamDto.projects?.map(async (projectId) => {
      const teamToProject = this.teamToProjectRepository.create({
        projectId: projectId,
        teamId: newTeam.id,
      });
      await this.teamToProjectRepository.save(teamToProject);
    });
    return newTeam;
  }

  findManyWithPagination({
    filterOptions,
    sortOptions,
    paginationOptions,
  }: {
    filterOptions?: FilterTeamDto | null;
    sortOptions?: SortTeamDto[] | null;
    paginationOptions: IPaginationOptions;
  }): Promise<Team[]> {
    const where: FindOptionsWhere<Team> = {};
    if (filterOptions?.name) {
      where.name = filterOptions.name;
    }
    if (filterOptions?.users) {
      where.teamToUser = filterOptions.users.map((userId) => ({
        userId,
      }));
    }
    if (filterOptions?.projects) {
      where.teamToProject = filterOptions.projects.map((projectId) => ({
        projectId,
      }));
    }
    return this.teamRepository.find({
      relations: ['userToTeam', 'userToTeam.user'],
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
      where: where,
      order: sortOptions?.reduce(
        (accumulator, sort) => ({
          ...accumulator,
          [sort.orderBy]: sort.order,
        }),
        {},
      ),
    });
  }

  findOne(fields: EntityCondition<Team>): Promise<NullableType<Team>> {
    return this.teamRepository.findOne({
      where: fields,
    });
  }

  async update(payload: DeepPartial<Team>,projects: UUID[] | undefined,users: UUID[] | undefined): Promise<Team> {
    if(projects!==undefined){
      await this.teamToProjectRepository.delete({
        teamId: payload.id,
      });
      projects?.map(async (projectId) => {
          const teamToProject = this.teamToProjectRepository.create({
            projectId: projectId,
            teamId: payload.id,
          });
          await this.teamToProjectRepository.save(teamToProject);
        });
    }
    if(users!==undefined){
      await this.teamToUserRepository.delete({
        teamId: payload.id,
      });
      users?.map(async (userId) => {
          const userToTeam = this.teamToUserRepository.create({
            userId: userId,
            teamId: payload.id,
          });
          await this.teamToUserRepository.save(userToTeam);
      });
    }
    return this.teamRepository.save(
      this.teamRepository.create({
        ...payload,
      }),
    );
  }

  async softDelete(id: Team['id']): Promise<void> {
    await this.teamRepository.softDelete(id);
  }
}
