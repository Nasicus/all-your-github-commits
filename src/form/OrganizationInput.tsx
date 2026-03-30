import { FC, useContext, useEffect } from "react";
import { SearchFormContext } from "./SearchFormProvider";
import { TextInput } from "@mantine/core";

export const OrganizationInput: FC = () => {
  const { organization, setOrganization } = useContext(SearchFormContext);

  useEffect(() => {
    const fromQuery = new URLSearchParams(window.location.search).get("org");
    const fromStorage = localStorage.getItem("organization");
    if (fromQuery) {
      setOrganization(fromQuery);
    } else if (fromStorage) {
      setOrganization(fromStorage);
    }
  }, [setOrganization]);

  return (
    <TextInput
      placeholder="e.g. DigitecGalaxus"
      label="Organization"
      value={organization}
      required
      onChange={(e) => setOrganization(e.target.value)}
    />
  );
};
