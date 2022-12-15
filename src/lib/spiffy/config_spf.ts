import * as t from '../retype/retype';
import { spiffy } from './spiffy';

const schema = t.shape({
    notionKey: t.optional(t.string),
    notionDBID: t.optional(t.string),
    userName: t.optional(t.string),
    userId: t.optional(t.string),
});

export const configFactory = spiffy({
    schema,
    defaultLocations: [
        {
            relativePath: '.nit_config',
            relativeTo: 'USER_HOME',
        },
    ],
    initialize: () => {
        return {};
    },
});

export type TConfig = ReturnType<typeof configFactory.load>;
