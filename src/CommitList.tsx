import { FC } from "react";
import { RepoLink } from "./RepoLink";
import { RepoResult } from "./models";

export const CommitList: FC<{ commits: RepoResult[] }> = ({ commits }) => {
  return (
    <ul>
      {commits.map((r) => (
        <li key={r.fullName}>
          <RepoLink repo={r} />
          <ul>
            {r.commits.map((c) => (
              <li key={c.sha}>
                {c.date.toISOString()}: {c.message} (
                <a href={c.htmlUrl} target="_blank">
                  {c.sha.substring(0, 7)}
                </a>
                )
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
};
