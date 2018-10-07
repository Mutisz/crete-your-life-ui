import React, { Component } from "react";
import PropTypes from "prop-types";
import gql from "graphql-tag";
import { flow } from "lodash";

import withMobileDialog from "@material-ui/core/withMobileDialog";
import { translate } from "react-i18next";
import withQuery from "../hoc/withQuery";

import IconButton from "@material-ui/core/IconButton";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import PreferencesLanguagePicker from "./PreferencesLanguagePicker";
import PreferencesCurrencyPicker from "./PreferencesCurrencyPicker";

import SettingsIcon from "@material-ui/icons/Settings";

const PREFERENCES_DIALOG_QUERY = gql`
  {
    preferences @client {
      currency {
        code
      }
    }
    currencies {
      code
      rate
    }
  }
`;

const enhance = flow(
  withMobileDialog(),
  translate(),
  withQuery(PREFERENCES_DIALOG_QUERY, { loadingMask: null, errorMask: null })
);

class PreferencesDialog extends Component {
  state = {
    open: false
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render = () => {
    const {
      t,
      client,
      data: {
        preferences: { currency },
        currencies
      }
    } = this.props;
    const label = t("preferences");
    return (
      <div>
        <IconButton
          color="inherit"
          aria-label={label}
          onClick={this.handleOpen}
        >
          <SettingsIcon />
        </IconButton>
        <Dialog
          aria-labelledby="settings-dialog-title"
          open={this.state.open}
          onClose={this.handleClose}
        >
          <DialogTitle id="settings-dialog-title">{label}</DialogTitle>
          <DialogContent>
            <PreferencesLanguagePicker />
            <PreferencesCurrencyPicker
              client={client}
              selectedCurrency={currency}
              currencies={currencies}
            />
          </DialogContent>
        </Dialog>
      </div>
    );
  };
}

PreferencesDialog.propTypes = {
  t: PropTypes.func.isRequired
};

export default enhance(PreferencesDialog);
