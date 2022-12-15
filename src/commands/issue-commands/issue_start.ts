import yargs from 'yargs';
import { nit } from '../../lib/runner';
import chalk from 'chalk';
import { selectIssue } from '../../actions/issue_actions';
import { NotionIssue } from '../../lib/notion/notion_type';
import { gtRepoInit } from '../../lib/gt/gt_repo_init';

const args = {} as const;
type argsT = yargs.Arguments<yargs.InferredOptionTypes<typeof args>>;

export const command = 'start';
export const aliases = ['s'];
export const canonical = 'issue start';
export const builder = args;

export const handler = async (argv: argsT): Promise<void> =>
    nit(argv, canonical, async (context) => {
        try {
            const issueList = await context.notion.notionQuery.listIssuesInTodo();
            const selected = await selectIssue(issueList, context.config.data.userName || '');
            if (selected && selected.issue && selected.issue.pageId && selected.issue.notionIssueKey) {
                const issue = selected.issue as NotionIssue;
                const issueKey = issue.notionIssueKey!.plain_text || '';
                // context.git.pullBranch('origin', 'dev');
                context.git.moveBranch('dev');
                context.splog.info(`Pull & Checkout ${chalk.bold('dev')} branch...`);
                context.git.moveBranch(issueKey);
                context.splog.info(`Create & Checkout ${chalk.bold(issueKey)} branch...`);
                context.git.pushBranch({ remote: 'origin', branchName: issueKey, forcePush: false, noVerify: false });
                context.splog.info(`Push ${chalk.bold(issueKey)} branch to origin...`);
                gtRepoInit(issueKey);
                context.splog.info(`${chalk.green('gt repo init --trunk')} ${chalk.bold(issueKey)}`);
                await context.notion.notionMutate.moveToInProgress(issue.pageId!, context.config.data.userId);
                context.splog.info(
                    `🎫 ${chalk.bold(`${issue.notionIssueKey?.plain_text}`)} Issue is moved from ${chalk.yellow('Todo')} to ${chalk.green('InProgress')}.`,
                );
            }
        } catch (err) {
            context.splog.error(err);
        }
    });
