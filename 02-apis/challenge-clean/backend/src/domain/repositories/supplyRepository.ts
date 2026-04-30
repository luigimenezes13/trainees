
import { Supply } from "../entities/Supply.js"
export interface SupplyRepository{
    create(data: Supply): Promise<Supply>
    update(data: Supply,id: string): Promise<Supply>
    getAll(): Promise<Supply[]>
    findById(id: string): Promise<Supply | null>
    delete(id: string): Promise<boolean>
}