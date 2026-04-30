import { Entity } from "../value-objects/Entity.js"


type SupplyProps = {
    item: String,
    category: String,
    stock: number,
    quantity: number
}

export class Supply extends Entity<SupplyProps>{
    constructor(props: SupplyProps,id?: string){
        super(props,id)
    }
}