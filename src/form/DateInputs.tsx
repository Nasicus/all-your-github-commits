import { Flex } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { FC, useContext } from "react";
import { SearchFormContext } from "./SearchFormProvider";

export const DateInputs: FC = () => {
  const { from, setFrom, to, setTo } = useContext(SearchFormContext);

  return (
    <Flex gap="xs" align="stretch" mt="xs">
      <DateInput
        value={from}
        onChange={(v) => setFrom(v || "")}
        label="From"
        clearable
        placeholder="Start date"
        w="100%"
      />
      <DateInput
        value={to}
        onChange={(v) => setTo(v || "")}
        label="To"
        clearable
        placeholder="End date"
        w="100%"
      />
    </Flex>
  );
};
