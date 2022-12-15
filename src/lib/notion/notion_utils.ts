// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints';
import { NotionIssue } from './notion_type';

export function parseIssueFromNotion(page: PageObjectResponse) {
    if (page && page.properties) {
        const notionIssue: NotionIssue = {};
        const nKey = page.properties['Key'] && page.properties['Key']['rich_text']?.find(() => true);
        const nAssignee = page.properties['Assignee'] && page.properties['Assignee']['people']?.find(() => true);
        const nStatus = page.properties['Status'] && page.properties['Status']['status'];
        const nSummary = page.properties['Summary'] && page.properties['Summary']['title']?.find(() => true);
        notionIssue.notionIssueKey = nKey;
        notionIssue.notionAssignee = nAssignee;
        notionIssue.notionStatus = nStatus;
        notionIssue.notionSummary = nSummary;
        notionIssue.pageId = page.id;
        return notionIssue;
    }
    return {};
}
