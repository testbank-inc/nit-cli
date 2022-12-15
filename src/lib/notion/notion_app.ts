import { Client as NotionClient } from '@notionhq/client';
import { NotionQuery } from './notion_query';
import { NotionMutate } from './notion_mutate';

export class NotionApp {
    notionClient: NotionClient;
    notionQuery: NotionQuery;
    notionMutate: NotionMutate;

    constructor(key = '', dbid = '') {
        this.notionClient = new NotionClient({ auth: key });
        this.notionQuery = new NotionQuery(this.notionClient, dbid);
        this.notionMutate = new NotionMutate(this.notionClient, dbid);
    }
}
