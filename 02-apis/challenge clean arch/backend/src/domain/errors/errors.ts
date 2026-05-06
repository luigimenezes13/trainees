export class NotFound extends Error{
    constructor(identificador: string | number, recurso: string){
        super(`ERROR: ${identificador} não encontrado em ${recurso}`)
        this.name = "Error404"
    }
}
