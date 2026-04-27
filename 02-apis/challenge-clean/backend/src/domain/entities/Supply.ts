
type SupplyProps = {
    id?: number
    item: String,
    category: String,
    stock: number,
    quantity: number
}

export class Supply{
    constructor(public props: SupplyProps){}
}