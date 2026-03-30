import { FC, PropsWithChildren, createContext, useState } from "react";

export interface SearchSearchFormContextType {
  organization: string;
  setOrganization: (organization: string) => unknown;
  pat: string;
  setPat: (pat: string) => unknown;
  storePat: boolean;
  setStorePat: (storePat: boolean) => unknown;
  user: string;
  setUser: (user: string) => unknown;
  from: string;
  setFrom: (from: string) => unknown;
  to: string;
  setTo: (to: string) => unknown;
  isValid: boolean;
}

export const SearchFormContext =
  createContext<SearchSearchFormContextType>(null);

export const SearchFormProvider: FC<PropsWithChildren> = ({ children }) => {
  const [organization, setOrganization] = useState("DigitecGalaxus");
  const [pat, setPat] = useState("");
  const [storePat, setStorePat] = useState(false);
  const [user, setUser] = useState("");
  const [from, setFrom] = useState<string>("");
  const [to, setTo] = useState<string>("");

  return (
    <SearchFormContext.Provider
      value={{
        organization,
        setOrganization,
        user,
        setUser,
        from,
        setFrom,
        to,
        setTo,
        pat,
        setPat,
        storePat,
        setStorePat,
        isValid: !!pat && !!user && !!organization,
      }}
    >
      {children}
    </SearchFormContext.Provider>
  );
};
