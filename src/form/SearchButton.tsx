import { Button, Flex, Loader } from "@mantine/core";
import { FC, useContext } from "react";
import { SearchFormContext } from "./SearchFormProvider";
import { SearchProgress } from "../models";

export const SearchButton: FC<{
  isSearching: boolean;
  searchProgress: SearchProgress;
  onClick: () => unknown;
}> = ({ isSearching, searchProgress, onClick }) => {
  const { isValid } = useContext(SearchFormContext);

  return (
    <Flex mt="xs" gap="xs" align="center">
      <Button disabled={isSearching || !isValid} onClick={onClick}>
        Search
      </Button>
      {isSearching && <Loader />}
      {isSearching && (
        <SearchProgressRenderer searchProgress={searchProgress} />
      )}
    </Flex>
  );
};

const SearchProgressRenderer: FC<{ searchProgress: SearchProgress }> = ({
  searchProgress,
}) => {
  if (!searchProgress) {
    return null;
  }

  return (
    <>
      {searchProgress.fetchedCount} / {searchProgress.totalCount} commits
      {searchProgress.totalCount > 1000 && " (GitHub limit: 1000)"}
    </>
  );
};
