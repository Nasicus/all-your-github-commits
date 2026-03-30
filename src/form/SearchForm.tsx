import { FC, useContext, useState } from "react";
import { RepoResult, SearchProgress } from "../models";
import { AuthorInput } from "./AuthorInput";
import { DateInputs } from "./DateInputs";
import { OrganizationInput } from "./OrganizationInput";
import { PersonalAccessTokenInput } from "./PersonalAccessTokenInput";
import { SearchButton } from "./SearchButton";
import { SearchFormContext } from "./SearchFormProvider";

export const SearchForm: FC<{
  onRepoResultUpdate: (repoResult: RepoResult[]) => unknown;
}> = ({ onRepoResultUpdate }) => {
  const { organization, pat, storePat, user, from, to } =
    useContext(SearchFormContext);

  const [isSearching, setIsSearching] = useState(false);
  const [searchProgress, setSearchProgress] = useState<SearchProgress>(null);

  return (
    <>
      <OrganizationInput />
      <PersonalAccessTokenInput />
      <AuthorInput />
      <DateInputs />
      <SearchButton
        isSearching={isSearching}
        onClick={getCommits}
        searchProgress={searchProgress}
      />
    </>
  );

  async function getCommits() {
    setIsSearching(true);

    if (storePat) {
      localStorage.setItem("pat", pat);
    } else {
      localStorage.removeItem("pat");
    }

    localStorage.setItem("organization", organization);
    localStorage.setItem("user", user);

    let query = `author:${user} org:${organization}`;
    if (from || to) {
      query += ` author-date:${from || "*"}..${to || "*"}`;
    }

    const repoMap = new Map<string, RepoResult>();
    let page = 1;
    const perPage = 100;

    try {
      while (true) {
        const url = `https://api.github.com/search/commits?q=${encodeURIComponent(query)}&per_page=${perPage}&page=${page}&sort=author-date&order=desc`;

        const response = await fetch(url, {
          headers: {
            Authorization: `Bearer ${pat}`,
            Accept: "application/vnd.github.v3+json",
          },
        });

        if (!response.ok) {
          const errorBody = await response.json().catch(() => ({}));
          throw new Error(
            `${response.status}: ${errorBody.message || response.statusText}`,
          );
        }

        const data = await response.json();

        for (const item of data.items) {
          const repoFullName = item.repository.full_name;
          if (!repoMap.has(repoFullName)) {
            repoMap.set(repoFullName, {
              name: item.repository.name,
              fullName: repoFullName,
              htmlUrl: item.repository.html_url,
              commits: [],
              errors: [],
            });
          }
          repoMap.get(repoFullName)!.commits.push({
            sha: item.sha,
            message: item.commit.message,
            date: new Date(item.commit.author.date),
            htmlUrl: item.html_url,
          });
        }

        const currentResults = Array.from(repoMap.values());
        setSearchProgress({
          totalCount: data.total_count,
          fetchedCount: currentResults.reduce(
            (sum, r) => sum + r.commits.length,
            0,
          ),
        });
        onRepoResultUpdate([...currentResults]);

        if (data.items.length < perPage || page * perPage >= 1000) {
          break;
        }
        page++;
      }
    } catch (error: any) {
      const currentResults = Array.from(repoMap.values());
      currentResults.push({
        name: "Search Error",
        fullName: "error",
        htmlUrl: "",
        commits: [],
        errors: [error.message || String(error)],
      });
      onRepoResultUpdate(currentResults);
    }

    setIsSearching(false);
  }
};
