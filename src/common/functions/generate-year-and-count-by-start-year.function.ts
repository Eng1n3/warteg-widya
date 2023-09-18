import * as moment from 'moment';
import dataSource from 'src/database/data-source';
import { IYearAndCountGenerate } from '../interfaces/generate-year-and-count-by-start-year.interface';

export const yearAndCountGenerate = async (
  yearAndCountGenerateParam: IYearAndCountGenerate,
) => {
  const { startYear, page, pageSize, direction } = yearAndCountGenerateParam;
  const data = await dataSource.manager.query(
    `
        select
          to_char(date_trunc('year',gs)::date, 'YYYY') date
        from
          generate_series($1::timestamp,
          $2::timestamp
                ,
          '1 year'::interval) as gs
        order by date ${direction}
        offset $3
        limit $4;
        `,
    [
      `${startYear}-01-01`,
      `${moment().year()}-01-01`,
      (page - 1) * pageSize,
      pageSize,
    ],
  );
  const [dataCount] = await dataSource.manager.query(
    `
        select
          count(to_char(date_trunc('year',gs)::date, 'YYYY')) count
        from
          generate_series
                ($1::timestamp 
                ,
          $2::timestamp
                ,
          '1 year'::interval) as gs
        `,
    [`${startYear}-01-01`, `${moment().year()}-01-01`],
  );
  const count = dataCount.count;
  return { data, count };
};
