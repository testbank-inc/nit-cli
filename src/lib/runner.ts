import yargs from 'yargs';
import { version } from '../../package.json';
import { initContext, TContext } from './context';
import { tracer } from './utils/tracer';

export async function nit(args: yargs.Arguments, canonicalName: string, handler: (context: TContext) => Promise<void>): Promise<void> {
    return nitInternal(args, canonicalName, { run: handler });
}

export async function nitInternal(args: yargs.Arguments, canonicalName: string, handler: TCommandHandler): Promise<void> {
    const ctx = initContext();
    try {
        await tracer.span(
            {
                name: 'command',
                resource: canonicalName,
                meta: {
                    version: version,
                },
            },
            async () => {
                await handler.run(ctx);
                return undefined;
            },
        );
    } catch (err) {
        ctx.splog.debug(err.stack);
        if (process.env.DEBUG) {
            process.stdout.write(err.stack.toString());
        }
        process.exitCode = 1;
    }
}

type TCommandHandler = { run: (context: TContext) => Promise<void> };
