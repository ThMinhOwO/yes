import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-tasks.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { DeepPartial, FindOptionsWhere, Repository } from 'typeorm';
import { IPaginationOptions } from 'src/utils/types/pagination-options';
import { EntityCondition } from 'src/utils/types/entity-condition.type';
import { NullableType } from 'src/utils/types/nullable.type';
import { FilterTaskDto, SortTaskDto } from './dto/query-tasks.dto';
import {UsersService} from '../users/users.service';
import { UserToTask } from 'src/tasks/entities/user-to-task.entity';
@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
    @InjectRepository(UserToTask)
    private userToTaskRepository: Repository<UserToTask>, 
  ) {}
  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const task = this.taskRepository.create({
      name: createTaskDto.name,
      description: createTaskDto.description,
      status: createTaskDto.status,
    });
    const newTask = await this.taskRepository.save(task);
    createTaskDto.users?.map(async (userId) => {
      const userToTask = this.userToTaskRepository.create({
        userId: userId,
        taskId: newTask.id,
      });
      await this.userToTaskRepository.save(userToTask);
    });
    return newTask;
  }

  findManyWithPagination({
    filterOptions,
    sortOptions,
    paginationOptions,
  }: {
    filterOptions?: FilterTaskDto | null;
    sortOptions?: SortTaskDto[] | null;
    paginationOptions: IPaginationOptions;
  }): Promise<Task[]> {
    const where: FindOptionsWhere<Task> = {};
    if (filterOptions?.name) {
      where.name = filterOptions.name;
    }
    if (filterOptions?.users) {
      where.userToTask = filterOptions.users.map((userId) => ({
        userId,
      }));
    }

    return this.taskRepository.find({
      relations: ['userToTask', 'userToTask.user'],
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

  findOne(fields: EntityCondition<Task>): Promise<NullableType<Task>> {
    return this.taskRepository.findOne({
      where: fields,
    });
  }

  update(payload: DeepPartial<Task>): Promise<Task> {
    return this.taskRepository.save(
      this.taskRepository.create({
        ...payload,
      }),
    );
  }

  async softDelete(id: Task['id']): Promise<void> {
    await this.taskRepository.softDelete(id);
  }
}
