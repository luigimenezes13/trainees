export type UpdateAstronautDto = {
    id: string,
    props: {
        name?: string,
        role?: string,
        nationality?: string,
        status?: 'active' | 'inactive',
    }
}