import { Entity } from "../value-objects/Entity.js"
import { Identifier } from "../value-objects/Identifier.js"

export type AstronautProps = {
    name: string,
    role: string,
    nationality: string,
    status: 'active' | 'inactive',
    created_at?: Date,
    updated_at?: Date,
    deleted_at?: Date | null,

}

export  class Astronaut extends Entity<AstronautProps> {
    constructor(props: AstronautProps,id?: string){
        super(props,id)
    }
}