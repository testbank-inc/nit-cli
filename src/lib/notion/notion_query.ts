import { PageObjectResponse, QueryDatabaseParameters } from '@notionhq/client/build/src/api-endpoints';
import { Client as NotionClient } from '@notionhq/client';
import { NotionIssue } from './notion_type';
import { parseIssueFromNotion } from './notion_utils';

export class NotionQuery {
    notionClient: NotionClient;
    dbID: string;

    constructor(notionClient: NotionClient, dbID: string) {
        this.notionClient = notionClient;
        this.dbID = dbID;
    }

    async query(params: Omit<QueryDatabaseParameters, 'database_id'>) {
        const queryResponse = await this.notionClient.databases.query({ ...params, database_id: this.dbID });
        return (queryResponse.results as Array<PageObjectResponse>) || [];
    }

    async listUsers() {
        const listUsersResponse = await this.notionClient.users.list({ page_size: 100 });
        return listUsersResponse.results || [];
    }

    async listIssuesInTodo(): Promise<Array<NotionIssue>> {
        const filterParams = {
            or: [
                {
                    property: 'Status',
                    status: {
                        equals: 'To Do',
                    },
                },
                {
                    property: 'Status',
                    status: {
                        equals: '기획 중',
                    },
                },
                {
                    property: 'Status',
                    status: {
                        equals: '디자인 중',
                    },
                },
                {
                    property: 'Status',
                    status: {
                        equals: '개발대기',
                    },
                },
            ],
        };
        const queryResponse = (await this.query({ filter: filterParams })) || [];
        return queryResponse.map((item) => parseIssueFromNotion(item));
    }
}
