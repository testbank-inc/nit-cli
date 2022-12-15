import { composeSplog, TSplog } from './utils/splog';
import { configFactory, TConfig } from './spiffy/config_spf';
import { NotionApp } from './notion/notion_app';
import { composeGit, TGit } from './git/git';

export type TContext = {
    config: TConfig;
    splog: TSplog;
    notion: NotionApp;
    git: TGit;
};

export function initContext(): TContext {
    const config = configFactory.load();
    const splog = composeSplog({});
    const notion = new NotionApp(config.data.notionKey, config.data.notionDBID);
    const git = composeGit();
    return {
        config,
        splog,
        notion,
        git,
    };
}
