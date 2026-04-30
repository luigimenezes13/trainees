import { Identifier } from "./Identifier.js";

export abstract class Entity<T>{
    public id: Identifier
    public props
    constructor(props: T,id?: string){
        this.props = props
        if(id){
            this.id = new Identifier(id)
            return 
        }
        this.id =new Identifier()
    }
}
