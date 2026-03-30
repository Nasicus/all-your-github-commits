export interface RepoResult {
  name: string;
  fullName: string;
  htmlUrl: string;
  commits: Commit[];
}

export interface Commit {
  date: Date;
  message: string;
  sha: string;
  htmlUrl: string;
}

export interface SearchProgress {
  fetchedCount: number;
  totalCount: number;
}
