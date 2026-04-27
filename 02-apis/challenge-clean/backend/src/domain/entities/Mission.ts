type MissionProps = {
    id?: number
    AstronautId: number,
    SupplyId: number
}

export class Mission{
    constructor(public props: MissionProps){}
}