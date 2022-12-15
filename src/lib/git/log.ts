import { runGitCommand } from './runner';

export function logLong(): void {
    runGitCommand({
        args: [
            `log`,
            `--graph`,
            `--abbrev-commit`,
            `--decorate`,
            `--format=format:%C(bold blue)%h%C(reset) - %C(bold green)(%ar)%C(reset) %C(white)%s%C(reset) %C(dim white)- %an%C(reset)%C(auto)%d%C(reset)`,
            `--branches`,
        ],
        options: { stdio: 'inherit' },
        onError: 'throw',
        resource: `logLong`,
    });
}
