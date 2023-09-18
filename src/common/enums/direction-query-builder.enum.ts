import { registerEnumType } from '@nestjs/graphql';

export enum DirectionEnumQueryBuilder {
  asc = 'ASC',
  desc = 'DESC',
}

registerEnumType(DirectionEnumQueryBuilder, {
  name: 'DirectionEnumQueryBuilder',
  description: 'direction for order by query builder',
});
