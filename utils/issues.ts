import ISSUES from '@/public/issues.json';

/**
 *  Formated issue
 */
export interface Issue {
    assignees: string[];
    author: string;
    avatar: string;
    body: string;
    id: number;
    labels: string[];
    pull: boolean;
    state: string;
    title: string;
    url: string;
    desc?: string;
}

/**
 * @desc Get weekly issues
 */
export default function parseIssues(src: typeof ISSUES): Issue[] {
    let issues = src.map((issue: any) => {
        let state = issue.draft ? issue.draft : issue.state;
        if (issue.pull_request?.merged_at != null) {
            state = 'merged';
        }

        return {
            assignees: issue.assignees.map((assignee: any) => assignee.login),
            author: issue.user.login,
            avatar: issue.user.avatar_url,
            body: issue.body ? issue.body : '',
            id: Number(issue.html_url.match(/\d+$/)[0]),
            labels: issue.labels.map((label: any) => label.name),
            pull: issue.pull_request !== undefined,
            state,
            title: issue.title,
            url: issue.html_url,
        }
    });

    issues.sort((a: Issue, b: Issue) => {
        return getPriority(a) - getPriority(b);
    });

    return issues;
}

function getPriority(issue: Issue): number {
    const state = issue.state;

    switch (state) {
        case 'merged':
            return 0;
        case 'draft':
            return 1
        case 'closed':
            return 2;
        case 'open':
            return 3;
        default:
            return 99;
    }
}
