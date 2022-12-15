import { NotionIssue } from '../lib/notion/notion_type';
import chalk from 'chalk';
import prompts from 'prompts';
import { KilledError } from '../lib/errors';

export async function selectIssue(issueList: Array<NotionIssue>, userName: string) {
    const parser = (issue: NotionIssue, userName: string) => {
        const nKey = chalk.bold(issue.notionIssueKey?.plain_text) || chalk.red('NO KEY');

        let nAssignee = issue.notionAssignee?.name || chalk.red('NO ASSIGNEE');
        if (nAssignee === userName) {
            nAssignee = chalk.green(nAssignee);
        }
        nAssignee = chalk.bold(nAssignee);

        const colorStatus = (status?: string) => {
            if (!status) return chalk.red('NO STATUS');
            if (status === '기획 중') return chalk.cyan(status);
            else if (status === '디자인 중') return chalk.yellow(status);
            return chalk.magenta(status);
        };
        const nStatus = colorStatus(issue.notionStatus?.name) || chalk.red('NO STATUS');

        const nSummary = chalk.blue(issue.notionSummary?.plain_text) || chalk.red('NO SUMMARY');
        return `${nKey} | ${nSummary} | ${nStatus} | ${nAssignee}`;
    };
    return await prompts(
        {
            type: 'autocomplete',
            name: 'issue',
            message: 'Select a issue',
            choices: issueList
                .sort((a, b) => ((a.notionStatus?.name || '') > (b.notionStatus?.name || '') ? 1 : -1))
                .sort((a) => (a.notionAssignee?.name === userName ? -1 : 1))
                .map((issue) => {
                    return { title: parser(issue, userName), value: issue };
                }),
        },
        {
            onCancel: () => {
                throw new KilledError();
            },
        },
    );
}
