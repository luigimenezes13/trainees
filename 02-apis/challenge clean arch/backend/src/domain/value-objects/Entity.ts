import { Identifier } from "./Identifier.js"

export abstract class Entity<T> {
    public id: string
    public props: T
    constructor(props: T, id?: string) {
        this.props = props
        if (id) {
            this.id = new Identifier(id).value
            return
        }
        this.id = new Identifier().value
    }

}