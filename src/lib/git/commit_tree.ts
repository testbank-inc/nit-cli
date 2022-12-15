import { runGitCommand, runGitCommandAndSplitLines } from './runner';
import { getSha } from './get_sha';

export function getCommitTree(branchNames: string[]): Record<string, string[]> {
    const parentOfMergeBase = getSha(
        `${runGitCommand({
            args: [`merge-base`, `--octopus`, ...branchNames],
            onError: 'ignore',
            resource: 'parentOfMergeBase',
        })}~`,
    );
    const ret: Record<string, string[]> = {};
    runGitCommandAndSplitLines({
        args: [`rev-list`, `--parents`, ...(parentOfMergeBase ? [`^${parentOfMergeBase}`, ...branchNames] : [`--all`]), '--'],
        onError: 'throw',
        resource: 'getCommitTree',
    })
        .map((l) => l.split(' '))
        .forEach((l) => (ret[l[0]] = l.slice(1)));
    return ret;
}
