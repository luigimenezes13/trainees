import { PaginationResult, Query } from "../../domain/value-objects/Query.js";

export function resolvePagination(queryData: Query): PaginationResult{
    const limit = queryData.limit ?? 5
    const page = queryData.page ?? 1

    const offset = (page - 1) * limit

    return {limit, page, offset}
    
    
}