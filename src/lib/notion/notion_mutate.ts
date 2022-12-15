import { Client as NotionClient } from '@notionhq/client';
import { UpdatePageParameters } from '@notionhq/client/build/src/api-endpoints';

export class NotionMutate {
    notionClient: NotionClient;
    dbID: string;

    constructor(notionClient: NotionClient, dbID: string) {
        this.notionClient = notionClient;
        this.dbID = dbID;
    }

    async update(params: UpdatePageParameters) {
        await this.notionClient.pages.update(params);
    }

    async moveToInProgress(pageId: string, personId?: string) {
        const updateParams = {
            page_id: pageId,
            properties: {
                Status: {
                    status: {
                        name: '개발 중',
                    },
                },
            },
        } as UpdatePageParameters;
        if (personId) {
            const updatePersonProperty = {
                Assignee: {
                    people: [
                        {
                            id: personId,
                        },
                    ],
                },
            };
            updateParams.properties = { ...updateParams.properties, ...updatePersonProperty };
        }
        await this.update(updateParams);
    }
}
