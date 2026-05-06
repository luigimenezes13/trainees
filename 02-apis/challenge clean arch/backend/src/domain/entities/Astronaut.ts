import { Entity } from "../value-objects/Entity.js";

export type AstronautStatus = "active" | "inactive";


export type AstronautProps = {
    name?: string,
    role?: string,
    nationality?: string,
    status?: AstronautStatus,
    created_at?: Date,
    updated_at?: Date,
    deleted_at?: Date | null,
}

export class Astronaut extends Entity <AstronautProps> {
    constructor(props: AstronautProps, id?: string){
        super(props,id)
    }
}