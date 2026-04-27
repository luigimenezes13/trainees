export class NaoEncontradoErro extends Error {
  constructor(recurso: string, identificador: string | number) {
    super(`${recurso} com identificador '${identificador}' nao encontrado`);
    this.name = "NaoEncontradoErro";
  }
}
