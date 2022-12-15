import yargs from 'yargs';
import { nit } from '../lib/runner';
import chalk from 'chalk';

const args = {
    key: {
        type: 'string',
        describe: 'Notion Key',
        demandOption: false,
    },
    dbid: {
        type: 'string',
        describe: 'Notion database ID',
        demandOption: false,
    },
    userName: {
        type: 'string',
        describe: 'Notion user name',
        demandOption: false,
    },
} as const;
type argsT = yargs.Arguments<yargs.InferredOptionTypes<typeof args>>;

export const command = 'auth';
export const description = 'Add your notion key and database id to enable Notion API to fetch and update issues on Notion Database.';
export const builder = args;
export const canonical = 'auth';

export const handler = async (argv: argsT): Promise<void> =>
    nit(argv, canonical, async (context) => {
        if (argv.key && argv.dbid) {
            context.config.update((data) => {
                data.notionKey = argv.key;
                data.notionDBID = argv.dbid;
            });
            context.splog.info(chalk.green(`🔐 Saved key, dbid to "${context.config.path}"`));
        }
        if (!context.config.data.notionKey || !context.config.data.notionDBID) {
            context.splog.info('No key, dbid set.');
            return;
        }
        if (argv.userName) {
            const userList = await context.notion.notionQuery.listUsers();
            const user = userList.find((user) => user.name === argv.userName);
            if (!user) {
                context.splog.info(chalk.yellow(`😰 "${context.config.data.userName}" You are not on the Notion user list`));
                return;
            }
            context.config.update((data) => {
                data.userName = argv.userName;
                data.userId = user.id;
            });
            context.splog.info(chalk.blue(`😀You are "${context.config.data.userName}" !!`));
        }
    });
