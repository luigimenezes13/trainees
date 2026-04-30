export class NaoEncontradoErro extends Error {
  constructor(recurso: string, identificador: string | number) {
    super(`${recurso} com identificador '${identificador}' nao encontrado`);
    this.name = "NaoEncontradoErro";
  }
}

export class InactiveAstronautError extends Error{
    constructor(astronautaNome: string) {
    super(`${astronautaNome} nao esta ativo`);
    this.name = "InactiveAstronautError";
  }
}

export class TooBigDataError extends Error{
  constructor(length: number, nome: string){
    super(`${nome} é muito grande (${length})`)
    this.name = "TooBigDataError"
  }
}