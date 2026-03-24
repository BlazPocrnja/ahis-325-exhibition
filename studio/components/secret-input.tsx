import React from "react";
import { SettingsView } from "@sanity/studio-secrets";

export const secretsNamespace = "secrets";

const secretConfigs = [
  {
    key: "polarOrganisationId",
    title: "Your Polar Organisation ID",
  },
  {
    key: "polarAccessTokenProducts",
    title: "Your Polar Access Token for Products",
  },
];

export const SecretInput = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  if (!open) {
    return null;
  }

  return (
    <SettingsView
      title={"Secret Settings"}
      namespace={secretsNamespace}
      keys={secretConfigs}
      onClose={onClose}
    />
  );
};
