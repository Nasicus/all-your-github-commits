import { Accordion } from "@mantine/core";
import { FC, Fragment } from "react";
import { RepoResult } from "./models";

export const ReposWithErrorsAccordionItem: FC<{ result: RepoResult[] }> = ({
  result,
}) => {
  const reposWithErrors = result.filter((r) => r.errors.length > 0);

  return (
    <Accordion.Item value="withErrors">
      <Accordion.Control>
        {reposWithErrors.length} repos with errors
      </Accordion.Control>
      <Accordion.Panel>
        <ul>
          {reposWithErrors.map((r) => (
            <Fragment key={r.fullName}>
              <li>{r.name}</li>
              <ul>
                {r.errors.map((err, i) => (
                  <li key={i}>{err}</li>
                ))}
              </ul>
            </Fragment>
          ))}
        </ul>
      </Accordion.Panel>
    </Accordion.Item>
  );
};
