import ISSUES from '@/public/issues.json';
import parseIssues, { Issue } from "@/utils/issues";
import getMonday from '@/utils/monday';
import { useEffect, useState } from 'react';

const URL = "https://api.github.com/repos/gear-tech/gear/issues";

export function useIssues(): { issues: Issue[], prs: Issue[] } {
    const monday = getMonday();
    const staticIssues = parseIssues(ISSUES);

    const [issues, setIssues] = useState<Issue[]>(staticIssues.filter((i) => !i.pull));
    const [prs, setPrs] = useState<Issue[]>(staticIssues.filter((i) => i.pull));

    useEffect(() => {
        fetch(`${URL}?state=all&since=${monday}`)
            .then((resp) => {
                if (!resp.ok) {
                    Promise.reject("Failed to fetch issues");
                }

                return resp.json()
            })
            .then((data) => {
                const issues = parseIssues(data);
                setIssues(issues.filter((i) => !i.pull));
                setPrs(issues.filter((i) => i.pull));
            });
    }, []);

    return { issues, prs }
}
