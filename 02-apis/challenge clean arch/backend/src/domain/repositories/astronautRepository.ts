import { Astronaut } from "../entities/Astronaut.js";
import { Query } from "../value-objects/Query.js";

export interface AstronautResult {
    data: Astronaut[]
    pagination: {
        offset?: number;
        page?: number;
        limit?: number;
        totalPages?: number;
    };
}

export interface AstronautRepository {
    create(data: Astronaut): Promise<Astronaut>
    find(params: Query): Promise<AstronautResult>
    findById(id: string): Promise<Astronaut> | null
    update(data: Astronaut): Promise<Astronaut> | null
    softDelete(id: string): Promise<Astronaut> | null
}
