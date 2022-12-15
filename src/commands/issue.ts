import { Argv } from 'yargs';

export const aliases = ['i'];
export const command = 'issue <command>';

export const builder = function (yargs: Argv): Argv {
    return yargs
        .commandDir('issue-commands', {
            extensions: ['js'],
        })
        .strict()
        .demandCommand();
};
