import { runGitCommand } from './runner';

export function getUserEmail(): string | undefined {
    try {
        return runGitCommand({
            args: [`config`, `user.email`],
            onError: 'ignore',
            resource: 'getUserEmail',
        });
    } catch {
        return undefined;
    }
}
