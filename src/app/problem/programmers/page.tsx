import { Octokit } from "@octokit/core";

async function ProgrammersProblemPage() {
  const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN,
  });

  const current = new Date();
  console.log(current.getHours());

  const res = await octokit.request("GET /repos/kodori-dev/ps-note-server/commits", {
    owner: "naya-h2",
    repo: "PS",
    headers: {
      "X-GitHub-Api-Version": "2022-11-28",
    },
    // since: dayjs(current).format("YYYY-MM-DDTHH:MM:SSZ"),
    // since: "2025-03-25T05:59:59Z",
    // until: "2025-03-26T05:59:59Z",
  });

  res.data.map((item) => {
    console.log(item);
    console.log(item.commit);
  });

  return <div></div>;
}

export default ProgrammersProblemPage;
