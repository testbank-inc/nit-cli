import { spawnSync, SpawnSyncOptions } from 'child_process';
import { cuteString } from '../utils/cute_string';
import { tracer } from '../utils/tracer';

export function runGitCommandAndSplitLines(params: TRunGitCommandParameters): string[] {
    return runGitCommand(params)
        .split('\n')
        .filter((l) => l.length > 0);
}

export function runGitCommand(params: TRunGitCommandParameters): string {
    // Only measure if we're with an existing span.
    return params.resource && tracer.currentSpanId
        ? tracer.spanSync(
              {
                  name: 'spawnedCommand',
                  resource: params.resource,
                  meta: { runCommandArgs: cuteString(params) },
              },
              () => {
                  return runGitCommandInternal(params);
              },
          )
        : runGitCommandInternal(params);
}

export type TRunGitCommandParameters = {
    args: string[];
    options?: Omit<SpawnSyncOptions, 'encoding' | 'maxBuffer'>;
    onError: 'throw' | 'ignore';
    resource: string | null;
};

function runGitCommandInternal(params: TRunGitCommandParameters): string {
    const spawnSyncOutput = spawnSync('git', params.args, {
        ...params.options,
        encoding: 'utf-8',
        // 1MB should be enough to never have to worry about this
        maxBuffer: 1024 * 1024 * 1024,
        windowsHide: true,
    });

    // this is a syscall failure, not a command failure
    if (spawnSyncOutput.error) {
        throw spawnSyncOutput.error;
    }

    // if killed with a signal
    if (spawnSyncOutput.signal) {
        throw new CommandKilledError({
            command: 'git',
            args: params.args,
            signal: spawnSyncOutput.signal,
            stdout: spawnSyncOutput.stdout,
            stderr: spawnSyncOutput.stderr,
        });
    }

    // command succeeded, return output
    if (!spawnSyncOutput.status) {
        return spawnSyncOutput.stdout?.trim() || '';
    }

    // command failed but we ignore it
    if (params.onError === 'ignore') {
        return '';
    }

    throw new CommandFailedError({
        command: 'git',
        args: params.args,
        status: spawnSyncOutput.status,
        stdout: spawnSyncOutput.stdout,
        stderr: spawnSyncOutput.stderr,
    });
}

export class CommandFailedError extends Error {
    constructor(failure: { command: string; args: string[]; status: number; errno?: number; code?: string; stdout: string; stderr: string }) {
        super(
            [
                failure.errno && failure.code
                    ? `Command failed with error ${failure.code} (${failure.errno}), exit code ${failure.status}:`
                    : `Command failed with error exit code ${failure.status}:`,
                [failure.command].concat(failure.args).join(' '),
                failure.stdout,
                failure.stderr,
            ].join('\n'),
        );
        this.name = 'CommandFailed';
    }
}

export class CommandKilledError extends Error {
    constructor(failure: { command: string; args: string[]; signal: string; stdout: string; stderr: string }) {
        super([`Command killed with signal ${failure.signal}:`, [failure.command].concat(failure.args).join(' '), failure.stdout, failure.stderr].join('\n'));
        this.name = 'CommandKilled';
    }
}
