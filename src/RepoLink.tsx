import { FC } from "react";
import { RepoResult } from "./models";

export const RepoLink: FC<{ repo: RepoResult }> = ({ repo }) => {
  return (
    <a href={repo.htmlUrl} target="_blank">
      {repo.fullName}
    </a>
  );
};
