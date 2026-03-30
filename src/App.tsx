import { Alert, Container } from "@mantine/core";
import { FC, useState } from "react";
import { ResultAccordion } from "./ResultAccordion";
import { SearchFormProvider } from "./form/SearchFormProvider";
import { SearchForm } from "./form/SearchForm";
import { RepoResult } from "./models";

export const App: FC = () => {
  const [repoResults, setRepoResults] = useState<RepoResult[]>(null);
  const [error, setError] = useState<string | null>(null);

  return (
    <Container>
      <h1>GitHub Commit Search</h1>
      <SearchFormProvider>
        <SearchForm onRepoResultUpdate={setRepoResults} onError={setError} />
      </SearchFormProvider>
      {error && (
        <Alert color="red" title="Search failed" mb="md">
          {error}
        </Alert>
      )}
      <ResultAccordion result={repoResults} />
    </Container>
  );
};
