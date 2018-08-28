import React, { Component } from "react";

import withMobileDialog from "@material-ui/core/withMobileDialog";
import IconButton from "@material-ui/core/IconButton";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import LanguageMenu from "../input/LanguageMenu";

import SettingsIcon from "@material-ui/icons/Settings";

class SettingsDialog extends Component {
  state = {
    open: false
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    return (
      <div>
        <IconButton
          color="inherit"
          aria-label="SETTINGS"
          onClick={this.handleOpen}
        >
          <SettingsIcon />
        </IconButton>
        <Dialog
          aria-labelledby="settings-dialog-title"
          open={this.state.open}
          onClose={this.handleClose}
        >
          <DialogTitle id="settings-dialog-title">SETTINGS</DialogTitle>
          <DialogContent>
            <LanguageMenu />
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}

export default withMobileDialog()(SettingsDialog);
