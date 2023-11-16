import { Injectable } from '@nestjs/common';
import { CreatePageDto } from './dto/create-pages.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Page } from './entities/page.entity';
import { DeepPartial, FindOptionsWhere, Repository } from 'typeorm';
import { IPaginationOptions } from 'src/utils/types/pagination-options';
import { EntityCondition } from 'src/utils/types/entity-condition.type';
import { NullableType } from 'src/utils/types/nullable.type';
import { FilterPageDto, SortPageDto } from './dto/query-pages.dto';
import { PageToRole } from './entities/page-to-role.entity';
import { UUID } from 'src/utils/types/uuid';
@Injectable()
export class PagesService {
  constructor(
    @InjectRepository(Page)
    private pageRepository: Repository<Page>,
    @InjectRepository(PageToRole)
    private pageToRoleRepository: Repository<PageToRole>, 
  ) {}
  async create(createPageDto: CreatePageDto): Promise<Page> {
    const page = this.pageRepository.create({
      name: createPageDto.name,
      description: createPageDto.description,
      path: createPageDto.path,
      icon: createPageDto.icon,
      order: createPageDto.order,
      parent: createPageDto.parent,
    });
    const newPage = await this.pageRepository.save(page);
    return newPage;
  }

  findManyWithPagination({
    filterOptions,
    sortOptions,
    paginationOptions,
  }: {
    filterOptions?: FilterPageDto | null;
    sortOptions?: SortPageDto[] | null;
    paginationOptions: IPaginationOptions;
  }): Promise<Page[]> {
    const where: FindOptionsWhere<Page> = {};
    if (filterOptions?.name) {
      where.name = filterOptions.name;
    }
    if(filterOptions?.path){
      where.path = filterOptions.path;
    }
    if(filterOptions?.description){
      where.description = filterOptions.description;
    }
    if(filterOptions?.icon){
      where.icon = filterOptions.icon;
    }
    if(filterOptions?.order){
      where.order = filterOptions.order;
    }
    if(filterOptions?.parent){
      where.parent = filterOptions.parent;
    }
    
    return this.pageRepository.find({
      //relations: ['pageToUser', 'pageToUser.user'],
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

  findOne(fields: EntityCondition<Page>): Promise<NullableType<Page>> {
    return this.pageRepository.findOne({
      where: fields,
    });
  }

  async update(payload: DeepPartial<Page>): Promise<Page> {
    return this.pageRepository.save(
      this.pageRepository.create({
        ...payload,
      }),
    );
  }

  async softDelete(id: Page['id']): Promise<void> {
    await this.pageRepository.softDelete(id);
  }
}
