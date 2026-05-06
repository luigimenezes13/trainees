import { Entity } from "../value-objects/Entity.js";

export type SuppliesProps = {
    item: string,
    category: string,
    stock: number,
}

export class Supply extends Entity<SuppliesProps>{
    constructor(props:SuppliesProps, id?:string){
        super(props, id)
    }
}