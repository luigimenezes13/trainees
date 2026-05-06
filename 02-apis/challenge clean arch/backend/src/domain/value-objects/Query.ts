export type Query = {
    search?: string,
    page?: number,
    limit?: number
}

export type PaginationResult = {
    limit: number,
    page: number,
    offset: number
}