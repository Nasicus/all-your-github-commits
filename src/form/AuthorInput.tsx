import { TextInput } from "@mantine/core";
import { FC, useContext, useEffect } from "react";
import { SearchFormContext } from "./SearchFormProvider";

export const AuthorInput: FC = () => {
  const { user, setUser } = useContext(SearchFormContext);

  useEffect(() => {
    const fromStorage = localStorage.getItem("user");
    if (fromStorage) {
      setUser(fromStorage);
    }
  }, [setUser]);

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
