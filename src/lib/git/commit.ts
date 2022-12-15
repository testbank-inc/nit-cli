import { runGitCommand } from './runner';

export type TCommitOpts = {
    amend?: boolean;
    message?: string;
    noEdit?: boolean;
    edit?: boolean;
    patch?: boolean;
};

export function commit(opts: TCommitOpts & { noVerify: boolean }): void {
    runGitCommand({
        args: [
            'commit',
            ...(opts.amend ? [`--amend`] : []),
            ...(opts.message ? [`-m`, opts.message] : []),
            ...(opts.noEdit ? [`--no-edit`] : []),
            ...(opts.edit ? [`-e`] : []),
            ...(opts.patch ? [`-p`] : []),
            ...(opts.noVerify ? ['-n'] : []),
        ],
        options: {
            stdio: 'inherit',
        },
        onError: 'throw',
        resource: 'commit',
    });
}
