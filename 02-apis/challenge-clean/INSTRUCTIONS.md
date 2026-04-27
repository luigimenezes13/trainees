# INSTRUCTIONS - Mars Mission Control

## Contexto da missao

Ano 2042. A colonia Aurora, em Marte, entra em fase critica de expansao.
O centro de operacoes, chamado **Mars Mission Control**, precisa evoluir rapido para suportar novas frentes de exploracao, logistica e seguranca da tripulacao.

Sua equipe recebeu o sistema atual como base. Ele ja possui interface e parte da integracao pronta, mas ainda faltam modulos essenciais para o controle da operacao em tempo real.

Seu objetivo e transformar esse painel em um sistema operacional confiavel para a proxima janela de lancamento.

---

## O exercicio

Implemente os itens abaixo:

1. **Implementar delete de astronautas com soft delete**
   - O frontend ja esta conectado para chamar esse fluxo.
   - O registro nao deve ser removido fisicamente do banco.

2. **Implementar update de astronautas**
   - O frontend ja esta conectado para enviar a atualizacao.

3. **Implementar CRUD de suprimentos e conectar com o frontend**
   - Substituir o modulo fake por integracao real no backend.

4. **Implementar criacao de missoes com base em astronautas e suprimentos e conectar com o frontend**
   - A missao deve considerar os vinculos necessarios para operacao.

---

## Requisitos de banco de dados

Voce deve criar as tabelas necessarias no PostgreSQL para suportar os fluxos de:

- astronautas
- suprimentos
- missoes
- relacionamentos entre entidades (quando necessario)

Use o `database/init.sql` como base e evolua o schema conforme necessario.

### Gerenciamento do banco

E permitido (e recomendado) usar **DBeaver** para:

- conectar no banco local do projeto
- criar e alterar tabelas
- validar constraints e relacionamentos
- inspecionar dados de teste

Credenciais padrao:

- Host: `localhost`
- Porta: `5432`
- Database: `mars`
- User: `mars_user`
- Password: `mars_password`

---

## Criterios de conclusao

Para considerar o exercicio concluido:

- endpoints funcionam conforme esperado
- frontend esta conectado aos endpoints reais dos 4 itens
- soft delete de astronautas respeitado nas listagens
- criacao de missoes valida com astronauta e suprimento
- tabelas e relacionamentos persistidos no banco

Boa missao. Marte depende da sua entrega.
