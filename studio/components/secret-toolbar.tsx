// src/components/secrets-toolbar.tsx

import React from "react";
import { useState, useCallback } from "react";
import { ToolMenuProps, ToolLink } from "sanity";
import { Button, Flex, Box } from "@sanity/ui";
import { PlugIcon, CogIcon } from "@sanity/icons";
import { SecretInput } from "./secret-input";

export const SecretsToolbar = (props: ToolMenuProps) => {
  const { activeToolName, context, tools } = props;

  const [secretsOpen, setSecretsOpen] = useState(false);
  const isSidebar = context === "sidebar";

  const closeSecrets = () => {
    setSecretsOpen(false);
  };

  const openSecrets = useCallback(() => {
    setSecretsOpen(true);
  }, []);

  // Change flex direction depending on context
  const direction = isSidebar ? "column" : "row";

  return (
    <Flex gap={1} direction={direction}>
      {tools.map((tool) => (
        <Button
          mode="bleed"
          as={ToolLink}
          icon={tool.icon || PlugIcon}
          key={tool.name}
          name={tool.name}
          selected={tool.name === activeToolName}
          text={tool.title || tool.name}
          tone="neutral"
          fontSize={0}
        />
      ))}
      <>
        <Box padding={2}>
          <p />
        </Box>
        <Button
          as={"button"}
          name="Secrets"
          selected={secretsOpen}
          text="Secrets"
          tone="caution"
          icon={CogIcon}
          onClick={openSecrets}
          type="button"
          style={{ cursor: "pointer" }}
          fontSize={0}
        />
      </>
      {secretsOpen ? (
        <SecretInput open={secretsOpen} onClose={closeSecrets} />
      ) : null}
    </Flex>
  );
};
