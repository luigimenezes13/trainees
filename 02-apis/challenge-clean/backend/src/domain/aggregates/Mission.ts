import { AggregateRoot } from "../value-objects/AggregateRoot.js"
import { Identifier } from "../value-objects/Identifier.js"
import { Astronaut } from "../entities/Astronaut.js"
import { Supply } from "../entities/Supply.js"
import { InactiveAstronautError, TooBigDataError } from "../errors/errors.js"
type MissionProps = {
    astronautsId: Identifier[],
    suppliesId: Identifier[]
}

export class Mission extends AggregateRoot<MissionProps>{
    constructor(public props: MissionProps,id?: string){
        super(props,id)
    }

   
    static create(astronauts: Astronaut[], supplies: Supply[]){
        if(astronauts.length > 10){
            throw new TooBigDataError(astronauts.length,"astronautas")
        }
        if(supplies.length > 10){
            throw new TooBigDataError(supplies.length, "Supprimentos")
        }

        astronauts.forEach(astronaut =>{
            if(astronaut.props.status === "inactive"){
                throw new InactiveAstronautError(astronaut.props.name)
            }
        })

        const missionProps: MissionProps = {
            astronautsId: astronauts.map(astronaut => astronaut.id),
            suppliesId: supplies.map(supply => supply.id)
        }
        return new Mission(missionProps)
    }
}