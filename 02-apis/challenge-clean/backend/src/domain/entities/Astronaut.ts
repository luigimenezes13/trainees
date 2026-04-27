
type AstronautProps = {
    id?: Number
    name: String,
    role: String,
    nationality: String,
    status: 'active' | 'inactive',
    created_at?: Date,
    updated_at?: Date,
    deleted_at?: Date | null,

}

export  class Astronaut {
    constructor(public props: AstronautProps){}
}