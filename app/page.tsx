"use client";
import getIssues, { Issue } from "@/utils/issues";
import getMonday from "@/utils/monday";
import { useEffect, useState } from "react";

const selectedStyle = "underline";

/**
 *   Home page for the weekly updates
 */
export default function Page() {
    const allIssues = getIssues();
    const issues = allIssues.filter(issue => !issue.pull);
    const prs = allIssues.filter(issue => issue.pull);
    const monday = getMonday();

    const [pull, setPull] = useState(false);
    const [data, setData] = useState(issues);

    useEffect(() => {
        if (pull) {
            setData(allIssues);
        } else {
            setData(issues);
        }
    }, [pull])

    return (
        <main className="flex min-h-screen flex-col items-center p-12">
            <p className="text-2xl">Gear Weekly Updates ({monday})</p>

            {/* Weekly updates monitor */}
            <div className="w-full flex justify-around pt-8 text-lg">
                <button
                    onClick={() => setPull(false)}
                    className={!pull ? selectedStyle : ""}
                >
                    <p>Issues: {issues.length}</p>
                </button>
                <button
                    onClick={() => setPull(true)}
                    className={pull ? selectedStyle : ""}
                >
                    <p>Pull Requests: {prs.length}</p>
                </button>
            </div>

            {/* Weekly updates table */}
            <div className="pt-8 w-full">
                <Table issues={data} />
            </div>
        </main>
    )
}

function Table({ issues }: { issues: Issue[] }) {
    return (
        <table className="table-auto w-full text-left border-separate border-spacing-4">
            <thead>
                <tr className="text-left">
                    <th>ID</th>
                    <th>Title</th>
                    <th>Author</th>
                    <th>State</th>
                </tr>
            </thead>
            <tbody>
                {issues.map((issue) => (
                    <tr className="align-top">
                        <td>{issue.id}</td>
                        <td><a href={issue.url}>{issue.title}</a></td>
                        <td>{issue.author}</td>
                        <td>{issue.state}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}
