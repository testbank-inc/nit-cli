#!/usr/bin/env node
/* eslint-disable no-console */

import chalk from 'chalk';
import tmp from 'tmp';
import yargs from 'yargs';

if (!process.env.DEBUG) {
    process.removeAllListeners('warning');
}

tmp.setGracefulCleanup();

process.on('uncaughtException', (err) => {
    console.log(chalk.redBright(`UNCAUGHT EXCEPTION: ${err.message}`));
    console.log(chalk.redBright(`UNCAUGHT EXCEPTION: ${err.stack}`));
    // eslint-disable-next-line no-restricted-syntax
    process.exit(1);
});

void yargs
    .commandDir('commands')
    // .help()
    // .usage('Notion Issue Tracker is a command line tool that makes working with notion fast & intuitive.')
    // .strict()
    .demandCommand().argv;
