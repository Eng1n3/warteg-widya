import { registerEnumType } from '@nestjs/graphql';

export enum DirectionEnumQuery {
  asc = 'asc',
  desc = 'desc',
}

registerEnumType(DirectionEnumQuery, {
  name: 'DirectionEnumQuery',
  description: 'direction for order by query',
});
