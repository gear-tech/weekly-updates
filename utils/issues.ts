import ISSUES from '@/public/issues.json';

/**
 *  Formated issue
 */
export interface Issue {
    assignees: string[];
    author: string;
    avatar: string;
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
export default function issues(): Issue[] {
    return ISSUES.map((issue: any) => ({
        assignees: issue.assignees.map((assignee: any) => assignee.login),
        author: issue.user.login,
        avatar: issue.user.avatar_url,
        id: Number(issue.html_url.match(/\d+$/)[0]),
        labels: issue.labels.map((label: any) => label.name),
        pull: issue.pull_request !== undefined,
        state: issue.state,
        title: issue.title,
        url: issue.html_url,
    }))
}
