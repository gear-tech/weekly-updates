import parseIssues, { Issue } from "@/utils/issues";
import getMonday from '@/utils/monday';
import { useEffect, useState } from 'react';

const URL = "https://api.github.com/repos/gear-tech/gear/issues";

export function useIssues(): { issues: Issue[], prs: Issue[] } {
    const monday = getMonday();
    const [issues, setIssues] = useState<Issue[]>([]);
    const [prs, setPrs] = useState<Issue[]>([]);

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
