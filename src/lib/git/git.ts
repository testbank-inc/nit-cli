import { addAll } from './add_all';
import { deleteBranch, forceCheckoutNewBranch, forceCreateBranch, getCurrentBranchName, moveBranch, switchBranch } from './branch_ops';
import { commit } from './commit';
import { getCommitRange } from './commit_range';
import { getCommitTree } from './commit_tree';
import { detectStagedChanges, getUnstagedChanges, isDiffEmpty, showDiff } from './diff';
import { fetchBranch, readFetchBase, readFetchHead, writeFetchBase } from './fetch_branch';
import { findRemoteBranch } from './find_remote_branch';
import { getUserEmail } from './get_email';
import { getRemoteSha, getSha, getShaOrThrow } from './get_sha';
import { getGitEditor, getGitPager } from './git_editor';
import { trackedUncommittedChanges, unstagedChanges } from './git_status_utils';
import { isMerged } from './is_merged';
import { logLong } from './log';
import { getMergeBase } from './merge_base';
import { getRebaseHead, getUnmergedFiles } from './merge_conflict_help';
import { pruneRemote } from './prune_remote';
import { pullBranch } from './pull_branch';
import { pushBranch } from './push_branch';
import { rebase, rebaseAbort, rebaseContinue, rebaseInteractive } from './rebase';
import { rebaseInProgress } from './rebase_in_progress';
import { softReset, trackedReset } from './reset_branch';
import { setRemoteTracking } from './set_remote_tracking';
import { showCommits } from './show_commits';
import { getBranchNamesAndRevisions } from './sorted_branch_names';

export type TGit = ReturnType<typeof composeGitInternal>;

export function composeGit(): TGit {
    return composeGitInternal();
}

function composeGitInternal() {
    return {
        addAll,
        getCurrentBranchName,
        moveBranch,
        deleteBranch,
        switchBranch,
        forceCheckoutNewBranch,
        forceCreateBranch,
        getCommitRange,
        getCommitTree,
        commit,
        detectStagedChanges,
        getUnstagedChanges,
        showDiff,
        isDiffEmpty,
        fetchBranch,
        readFetchHead,
        readFetchBase,
        writeFetchBase,
        findRemoteBranch,
        getUserEmail,
        getShaOrThrow,
        getSha,
        getRemoteSha,
        getGitEditor,
        getGitPager,
        unstagedChanges,
        trackedUncommittedChanges,
        isMerged,
        logLong,
        getMergeBase,
        getUnmergedFiles,
        getRebaseHead,
        pruneRemote,
        showCommits,
        pullBranch,
        pushBranch,
        rebaseInProgress,
        rebase,
        rebaseContinue,
        rebaseAbort,
        rebaseInteractive,
        softReset,
        trackedReset,
        setRemoteTracking,
        getBranchNamesAndRevisions,
    };
}
