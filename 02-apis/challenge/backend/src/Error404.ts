export class Error404 extends Error{
    constructor(recurso: string, identificador: string | number){
        super(`ERROR: ${identificador} não encontrado em ${recurso}`)
        this.name = "Error404"
    }
}