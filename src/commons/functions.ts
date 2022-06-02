import { Query } from "mongoose";
import { FilterOptions } from "./interfaces";

export const processFilterOptions = <ResultType, DocType, THelpers, RawDocType, FilterType>(
  query: Query<ResultType, DocType, THelpers, RawDocType>,
  options: FilterOptions<FilterType>
) => {
  if (options.select) {
      query = query.select(options.select);
  }

  if (options.paginate) {
      let skip = options.paginate.page * options.paginate.pageSize - options.paginate.pageSize;
      let limit = options.paginate.pageSize;
      query = query.skip(skip).limit(limit);
  }

  if (options.populate) {
      // query = query.populate(options.populate);
  }

  if (options.sort) {
      query = query.sort(options.sort);
  }

  return query;
};