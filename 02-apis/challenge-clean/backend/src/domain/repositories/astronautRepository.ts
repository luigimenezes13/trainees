import { Astronaut } from "../entities/Astronaut.js"
import { Query } from "../value-objects/Query.js"

export interface AstronautsResult {
  data: Astronaut[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}
export interface AstronautRepository{
    create(data: Astronaut): Promise<Astronaut>
    find(params: Query): Promise<AstronautsResult> 
    findById(id: number): Promise<Astronaut>
    update(data: Astronaut, id: number): Promise<Astronaut | null>
    softDelete(id: number): Promise<Boolean>

}