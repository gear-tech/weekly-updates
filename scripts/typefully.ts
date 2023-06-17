import getMonday from "@/utils/monday";
import parseIssues, { Issue } from "@/utils/issues";
import axios from "axios";

const TYPEFULLY_API_KEY = process.env.TYPEFULLY_API_KEY;
const THREAD_TITLE = process.env.THREAD_TITLE;
const DRAFT = "https://api.typefully.com/v1/drafts/"
const URL = "https://api.github.com/repos/gear-tech/gear/issues";
const NEWLINE = "\n";

async function main() {
    const monday = getMonday();
    const resp = await axios.get(`${URL}?state=all&since=${monday}`);
    const prs = parseIssues(resp.data).filter(issue => issue.pull && issue.state === "merged");
    const content = generateContent(monday, prs);

    await postDraft(content);
}

function getAuthKey(): string {
    if (!TYPEFULLY_API_KEY) {
        throw new Error("Missing TYPEFULLY_KEY env variable");
    }

    return TYPEFULLY_API_KEY;
}

function generateContent(monday: string, issues: Issue[]): string {
    let title = THREAD_TITLE
        ? THREAD_TITLE.replace("YYYY-MM-DD", monday)
        : `Gear Weekly Update (${monday})`;

    const content = issues.map((issue, index) => {
        const title = `${index + 1}. ${issue.title} (#${issue.id})`.trim();
        const body = String(issue.body).replace("@gear-tech/dev", "").trim().slice(0, 120) + "...";
        const url = issue.url;

        return (title + NEWLINE.repeat(2) + body + NEWLINE.repeat(2) + url);
    }).join(NEWLINE.repeat(4));

    return title + NEWLINE.repeat(4) + content;
}

async function postDraft(content: string) {
    const resp = await axios.post(
        DRAFT,
        { content, threadify: true, share: true },
        {
            headers: {
                "X-API-KEY": "Bearer " + getAuthKey(),
            }
        }
    );

    if (resp.status !== 200) {
        throw new Error(`Failed to post draft: ${resp.data}`);
    }
}

(async () => {
    await main().catch((e) => {
        console.log(e);
        throw e;
    });

    console.log("Done");
})();
