
import { Supply } from "../entities/Supply.js"
export interface SupplyRepositoy{
    create(data: Supply): Promise<Supply>
    update(data: Supply,id: number): Promise<Supply | null>
    getAll(): Promise<Supply[]>
    findById(id: number): Promise<Supply>
    delete(id: number): Promise<boolean>
}