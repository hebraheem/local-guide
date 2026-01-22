import {
  FindOptionsWhere,
  Repository,
  ObjectLiteral,
  FindOptionsSelect,
  FindOptionsRelations,
} from 'typeorm';
import { ListRequestDto, ListResponseDto } from './pagination.dto';
import { PaginationOutOfBound } from 'src/common/exceptions/pagination-out-of-bound.exception';

export class PaginateQuery<Entity extends ObjectLiteral, R> {
  repository: Repository<Entity>;
  query: ListRequestDto;
  where?: FindOptionsWhere<Entity>;
  responseMapper?: (entity: Entity) => R;
  select?: FindOptionsSelect<Entity>;
  relation?: FindOptionsRelations<Entity>;

  constructor(
    repository: Repository<Entity>,
    query: ListRequestDto,
    where?: FindOptionsWhere<Entity>,
    responseMapper?: (entity: Entity) => R,
    select?: FindOptionsSelect<Entity>,
    relation?: FindOptionsRelations<Entity>,
  ) {
    this.repository = repository;
    this.query = query;
    this.where = where;
    this.select = select;
    this.relation = relation;
    this.responseMapper = responseMapper;
  }

  async paginate(): Promise<ListResponseDto<R>> {
    const { limit = 10, page = 1 } = this.query;
    const totalRecords = await this.repository.count({
      where: this.where,
      relations: this.relation,
    });
    const totalPages = Math.ceil(totalRecords / limit);
    const skip = (page - 1) * limit;
    const take = limit;

    const ctx = {};
    if (this.where) {
      Object.assign(ctx, { where: this.where });
    }
    if (this.select) {
      Object.assign(ctx, { select: this.select });
    }
    if (this.relation) {
      Object.assign(ctx, { relations: this.relation });
    }
    const entities = await this.repository.find({
      ...ctx,
      skip,
      take,
    });

    if (page > totalPages && totalPages !== 0) {
      throw new PaginationOutOfBound();
    }

    return {
      data: this.responseMapper
        ? entities.map(this.responseMapper)
        : (entities as unknown as R[]),
      meta: {
        totalPages,
        currentPage: +page,
        limit: +take,
        totalRecords,
      },
    };
  }
}
