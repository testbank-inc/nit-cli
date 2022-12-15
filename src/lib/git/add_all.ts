import { runGitCommand } from './runner';

export function addAll(): void {
    runGitCommand({
        args: ['add', '--all'],
        onError: 'throw',
        resource: 'addAll',
    });
}
