import { DirectionEnum } from '../enums/direction.enum';

export interface IYearAndCountGenerate {
  startYear: number;
  page: number;
  pageSize: number;
  direction: DirectionEnum;
}
