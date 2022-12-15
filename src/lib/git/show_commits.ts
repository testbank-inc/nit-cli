import { runGitCommand } from './runner';

export function showCommits(base: string, head: string, patch?: boolean): string {
    return runGitCommand({
        args: [`-c`, `color.ui=always`, `--no-pager`, `log`, ...(patch ? ['-p'] : []), `${base}..${head}`, `--`],
        onError: 'throw',
        resource: 'showCommits',
    });
}
