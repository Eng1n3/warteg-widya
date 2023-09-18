import { registerEnumType } from '@nestjs/graphql';

export enum DirectionEnum {
  asc = 'ASC',
  desc = 'DESC',
}

registerEnumType(DirectionEnum, {
  name: 'DirectionEnum',
  description: 'direction for order by',
});
