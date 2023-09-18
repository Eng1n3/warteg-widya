import { MetaPageParam } from '../interfaces/meta-page-param.interface';
import { MetaPageObject } from '../objects/meta-page.object';

export const metaPageGenerate = (
  metaPageParam: MetaPageParam,
): MetaPageObject => {
  const { page, pageSize, items, totalItems } = metaPageParam;
  const totalPages = Math.ceil(totalItems / (pageSize || 10));
  return {
    currentPage: page || 1,
    totalPages,
    currentItems: items,
    totalItems,
  };
};
