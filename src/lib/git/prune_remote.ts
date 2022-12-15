import { runGitCommand } from './runner';

export function pruneRemote(remote: string): void {
    runGitCommand({
        args: [`remote`, `prune`, remote],
        onError: 'ignore',
        resource: 'pruneRemote',
    });
}
