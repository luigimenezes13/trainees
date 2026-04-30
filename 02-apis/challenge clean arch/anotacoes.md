# Anotações — passos e pastas (Clean Arch)

## 1° passo

- Editar o arquivo `init.sql` para criar, no início, a tabela de astronautas e inserir um **seed**.
- No futuro, vai ser necessário alterar o sistema de ID para ser gerado de forma **automática** no back-end e não só no database.

---

## 2° passo: criar os diretórios e as pastas de Clean Arch

### `domain` contém

- **Entidades** dos astronautas e suprimentos: definem as propriedades das entidades e **constroem** a classe com base na classe abstrata pai.
- O **agregado** das missões.
- Os **repositories** de entidade → exportam a **interface** que define as funções que um repositório concreto deve ter (contrato do domínio).
- **Classes** de diferentes erros.
- Pasta de **value-objects**: define classes **abstratas** que serão a base / pai de outras classes, incluindo entidades, agregados e use cases.

### `app` contém

- Pasta **dto**: define os tipos de dados para **transferência** em cada função dos repositories das entidades.
- **useCases:** executam alguma ação **específica**; por serem **filhas** da classe `UseCase`, **exigem** uma função `execute` que realiza a lógica. É aqui que fica **implementada** a **injeção de dependência**, já que o **construtor** recebe algum repositório **tipado**.

### `infra` contém

- Pasta **database** → arquivo de configuração e exportação do **pool** do database e as **interfaces** que definem as propriedades da **linha de retorno** das entidades.
- Pasta **mappers** → `arquivosMapper` → exportam uma classe que **trata e retorna** corretamente o objeto entre **lados diferentes**. Essa classe costuma ter dois **métodos estáticos**:
  - **`toDomain`:** dados vindos de fora (linha do banco → DTO / domínio);
  - **`toPersistence`** (persistência): o contrário (objeto de **domínio** → objeto em colunas pronto para **queries** SQL).
- Pasta **repositories** → `DataBaseRepository.ts` → classe de repositório do banco de dados que **implementa** a interface de repositório com as **operações** que a aplicação usa contra o banco. É onde está a lógica “de verdade” e as **queries**.
- Pasta **controllers** → `entidadeController.ts` → exporta uma função que recebe a **instância** do Fastify e concentra os **métodos HTTP**. É onde **executamos** os use cases com as funções.
- Pasta **schemas** → `entidade.schema.ts` → definem os schemas **Zod** de cada entidade que usamos no controller para **comparar** e verificar se a request está no formato esperado.
- Pasta **di** → `container.ts` → onde **injetamos** as **dependências** nos use cases. Exporta os objetos com métodos que são **chamados** no controller: usa-se o use case da função passando o repositório do banco de dados.
- **utils** → arquivos **úteis** no projeto em geral, de tratamento de paginação até formatação de erros.
- **`server.ts`** → importa todos os controllers e **registra** as rotas de cada um; dá para usar `app.setErrorHandler` e tratar os diferentes tipos de erros.
