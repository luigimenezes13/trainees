import { randomUUID } from "crypto"


export class Identifier{
    public value: string
    constructor(input?: string){
        this.value = input ?? randomUUID()
    }
}