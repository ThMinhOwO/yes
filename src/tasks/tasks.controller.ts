import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  SerializeOptions,
  HttpStatus,
  HttpCode,
  Query,
  UseGuards,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-tasks.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { QueryTaskDto } from './dto/query-tasks.dto';
import { InfinityPaginationResultType } from 'src/utils/types/infinity-pagination-result.type';
import { Task } from './entities/task.entity';
import { infinityPagination } from 'src/utils/infinity-pagination';
import { NullableType } from 'src/utils/types/nullable.type';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/roles/roles.decorator';
import { RoleEnum } from 'src/roles/roles.enum';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/roles/roles.guard';
import { UUID } from 'src/utils/types/uuid';
import { ProjectsService } from 'src/projects/projects.service';
import { ErrorResponse, OkResponse, OkResponseWithPagination, Response, ResponseWithPagination } from 'src/utils/response-helper';
@ApiBearerAuth()
@Roles(RoleEnum.admin)
@UseGuards(AuthGuard('jwt'), RolesGuard)
@ApiTags('Tasks')
@Controller({
  path: 'tasks',
  version: '1',
})
export class TasksController {
  constructor(
    private readonly tasksService: TasksService,
    private readonly projectService: ProjectsService,
    ) {}

  @SerializeOptions({
    groups: ['admin'],
  })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createTaskDto: CreateTaskDto): Promise<Response<Task>> {
    //get current user id

    return new OkResponse(await this.tasksService.create(createTaskDto)) ;
  }

  @SerializeOptions({
    groups: ['admin'],
  })
  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(
    @Query() query: QueryTaskDto,
  ): Promise<ResponseWithPagination<Task>> {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 50) {
      limit = 50;
    }
    const res = await this.tasksService.findManyWithPagination({
      filterOptions: query?.filters,
      sortOptions: query?.sort,
      paginationOptions: {
        page,
        limit,
      },
    });
    return new OkResponseWithPagination(
      res,
      res.length === limit,
    );
  }

  @SerializeOptions({
    groups: ['admin'],
  })
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id') id: UUID): Promise<Response<Task>> {
    const res = await this.tasksService.findOne({ id: id });
    return res? new OkResponse(res) : new ErrorResponse('Task not found', HttpStatus.NOT_FOUND);
  }

  @SerializeOptions({
    groups: ['admin'],
  })
  @Patch()
  @HttpCode(HttpStatus.OK)
  async update(
    @Body() updateTaskDto: UpdateTaskDto,
  ): Promise<Response<Task>> {
    const project = await this.projectService.findOne({id: updateTaskDto.project});
    const res = await this.tasksService.update({
      id: updateTaskDto.id,
      name: updateTaskDto.name,
      description: updateTaskDto.description,
      status: updateTaskDto.status,
      project: project || undefined,
    });
    return res? new OkResponse(res) : new ErrorResponse('Task cannot update', HttpStatus.NOT_FOUND);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: UUID): Promise<Response<string>> {
    await this.tasksService.softDelete(id);
    return new OkResponse('Task deleted successfully');
  }
}
