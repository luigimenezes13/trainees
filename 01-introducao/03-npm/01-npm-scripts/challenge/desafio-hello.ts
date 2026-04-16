/**
 * Challenge 1: script "hello" com chalk.
 *
 * Requisito:
 * - npm run hello deve imprimir uma mensagem com chalk.
 */

import chalk from 'chalk';

// TODO:
// 1) Defina uma mensagem de boas-vindas.
// 2) Use chalk para colorir essa mensagem.
// 3) Imprima no console.

const mensagem: string = chalk.green('TODO: personalize a mensagem do hello.');
console.log(mensagem);
console.log('\n');
console.log(chalk.bgBlue('Hello World'));
