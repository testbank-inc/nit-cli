import { Client as NotionClient } from '@notionhq/client';
import { UpdatePageParameters, UserObjectResponse } from '@notionhq/client/build/src/api-endpoints';

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

    async moveToInProgress(pageId: string, beforeAssignee: UserObjectResponse[], person?: { personId: string; name: string }) {
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
        if (person) {
            let peopleIds: string[] = [];
            if (beforeAssignee.length > 1) {
                peopleIds = beforeAssignee.filter((user) => user.name !== person.name).map((user) => user.id) || [];
            }
            peopleIds.push(person.personId);
            const updatePersonProperty = {
                Assignee: {
                    people: peopleIds.map((p) => {
                        return {
                            id: p,
                        };
                    }),
                },
            };
            updateParams.properties = { ...updateParams.properties, ...updatePersonProperty };
        }
        await this.update(updateParams);
    }
}
