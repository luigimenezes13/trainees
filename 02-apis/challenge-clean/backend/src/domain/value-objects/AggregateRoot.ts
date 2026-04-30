import { Entity } from "./Entity.js";
import { Identifier } from "./Identifier.js";


export abstract class AggregateRoot<T> extends Entity<T>{
    constructor(props: T, id?: string){
        super(props,id)
    }
}