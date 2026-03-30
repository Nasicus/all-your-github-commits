import { TextInput } from "@mantine/core";
import { FC, useContext } from "react";
import { SearchFormContext } from "./SearchFormProvider";

export const AuthorInput: FC = () => {
  const { user, setUser } = useContext(SearchFormContext);

  return (
    <TextInput
      placeholder="GitHub username or git author name"
      label="Author"
      value={user}
      required
      onChange={(e) => setUser(e.target.value)}
    />
  );
};
