import { tracer } from '../utils/tracer';
import { cuteString } from '../utils/cute_string';
import { spawnSync } from 'child_process';
import { CommandFailedError, CommandKilledError, TRunGitCommandParameters } from '../git/runner';

export function gtRepoInit(trunk: string) {
    const params = {
        args: [`repo`, 'init', `--trunk`, trunk],
        onError: 'ignore',
        resource: 'gtRepoInit',
    } as TRunGitCommandParameters;
    return tracer.spanSync(
        {
            name: 'spawnedCommand',
            resource: 'gtRepoInit',
            meta: { runCommandArgs: cuteString(params) },
        },
        () => {
            return runGTCommandInternal(params);
        },
    );
}

function runGTCommandInternal(params: TRunGitCommandParameters): string {
    const spawnSyncOutput = spawnSync('gt', params.args, {
        ...params.options,
        encoding: 'utf-8',
        // 1MB should be enough to never have to worry about this
        maxBuffer: 1024 * 1024 * 1024,
        windowsHide: false,
    });

    // this is a syscall failure, not a command failure
    if (spawnSyncOutput.error) {
        throw spawnSyncOutput.error;
    }

    // if killed with a signal
    if (spawnSyncOutput.signal) {
        throw new CommandKilledError({
            command: 'gt',
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
        command: 'gt',
        args: params.args,
        status: spawnSyncOutput.status,
        stdout: spawnSyncOutput.stdout,
        stderr: spawnSyncOutput.stderr,
    });
}
