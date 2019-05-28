import React, { FunctionComponent, useState } from "react";
import SettingsIcon from "@material-ui/icons/Settings";
import IconButton from "@material-ui/core/IconButton";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import PreferencesLanguagePicker from "./PreferencesLanguagePicker";
import PreferencesCurrencyPicker from "./PreferencesCurrencyPicker";

import { useTranslation } from "react-i18next";
import { usePreferencesQuery, PreferencesQuery } from "../../codegen";
import { withMobileDialog } from "@material-ui/core";

const PreferencesDialog: FunctionComponent = () => {
  const [preferencesDialogOpen, setPreferencesDialogOpen] = useState(false);
  const { t } = useTranslation();
  const { data, loading } = usePreferencesQuery({ suspend: false });
  const label = t("preferences");
  if (loading) return <div>Loading</div>;

  const {
    preferences: { currency },
    currencies
  } = data as PreferencesQuery;
  return (
    <div>
      <IconButton
        color="inherit"
        aria-label={label}
        onClick={() => setPreferencesDialogOpen(true)}
      >
        <SettingsIcon />
      </IconButton>
      <Dialog
        aria-labelledby="settings-dialog-title"
        open={preferencesDialogOpen}
        onClose={() => setPreferencesDialogOpen(false)}
      >
        <DialogTitle id="settings-dialog-title">{label}</DialogTitle>
        <DialogContent>
          <PreferencesLanguagePicker />
          <PreferencesCurrencyPicker
            selectedCurrency={currency}
            currencies={currencies}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default withMobileDialog()(PreferencesDialog);
