import { RichTextItemResponse, UserObjectResponse } from '@notionhq/client/build/src/api-endpoints';

export interface NotionIssue {
    pageId?: string;
    notionIssueKey?: RichTextItemResponse;
    notionAssignee?: UserObjectResponse;
    notionStatus?: {
        id: string;
        name: string;
        color: 'default' | 'gray' | 'brown' | 'orange' | 'yellow' | 'green' | 'blue' | 'purple' | 'pink' | 'red';
    };
    notionSummary?: RichTextItemResponse;
}
