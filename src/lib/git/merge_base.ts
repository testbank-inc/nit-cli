import { runGitCommand } from './runner';

export function getMergeBase(left: string, right: string): string {
    return runGitCommand({
        args: [`merge-base`, left, right],
        onError: 'throw',
        resource: 'getMergeBase',
    });
}
