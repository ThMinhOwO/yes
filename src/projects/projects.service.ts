import { Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { DeepPartial, FindOptionsWhere, Repository } from 'typeorm';
import { IPaginationOptions } from 'src/utils/types/pagination-options';
import { EntityCondition } from 'src/utils/types/entity-condition.type';
import { NullableType } from 'src/utils/types/nullable.type';
import { FilterProjectDto, SortProjectDto } from './dto/query-project.dto';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private projectRepository: Repository<Project>,
  ) {}
  create(createProjectDto: CreateProjectDto): Promise<Project> {
    return this.projectRepository.save(
      this.projectRepository.create(createProjectDto),
    );
  }
  findManyWithPagination({
    filterOptions,
    sortOptions,
    paginationOptions,
  }: {
    filterOptions?: FilterProjectDto | null;
    sortOptions?: SortProjectDto[] | null;
    paginationOptions: IPaginationOptions;
  }): Promise<Project[]> {
    const where: FindOptionsWhere<Project> = {};
    if (filterOptions?.name) {
      where.name = filterOptions.name;
    }

    return this.projectRepository.find({
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

  findOne(fields: EntityCondition<Project>): Promise<NullableType<Project>> {
    return this.projectRepository.findOne({
      where: fields,
    });
  }

  update(id: Project['id'], payload: DeepPartial<Project>): Promise<Project> {
    return this.projectRepository.save(
      this.projectRepository.create({
        id,
        ...payload,
      }),
    );
  }

  async softDelete(id: Project['id']): Promise<void> {
    await this.projectRepository.softDelete(id);
  }
}
