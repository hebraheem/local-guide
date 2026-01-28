import { ObjectLiteral, SelectQueryBuilder } from 'typeorm';
import { ListRequestDto, ListResponseDto } from './pagination.dto';
import { PaginationOutOfBound } from 'src/common/exceptions/pagination-out-of-bound.exception';

export class QueryBuilderPaginator<Entity extends ObjectLiteral, R = Entity> {
  constructor(
    private readonly qb: SelectQueryBuilder<Entity>,
    private readonly query: ListRequestDto,
    private readonly mapper?: (entity: Entity) => R,
  ) {}

  async paginate(): Promise<ListResponseDto<R>> {
    const page = Number(this.query.page ?? 1);
    const limit = Number(this.query.limit ?? 10);

    const skip = (page - 1) * limit;

    // Clone QB to avoid side effects
    const [entities, totalRecords] = await this.qb
      .clone()
      .skip(skip)
      .take(limit)
      .getManyAndCount();

    const totalPages = Math.ceil(totalRecords / limit);

    if (page > totalPages && totalPages !== 0) {
      throw new PaginationOutOfBound();
    }

    return {
      data: this.mapper
        ? entities.map(this.mapper)
        : (entities as unknown as R[]),
      meta: {
        totalPages,
        currentPage: page,
        limit,
        totalRecords,
      },
    };
  }
}
