import React, { Component } from "react";
import PropTypes from "prop-types";
import { translate } from "react-i18next";
import { flow, map } from "lodash";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

import { LANGUAGES } from "../../config/consts/languageConsts";

const enhance = flow(translate());

class PreferencesLanguagePicker extends Component {
  state = {
    anchorEl: null
  };

  handleOpen = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handleSelect = (i18n, language) => {
    i18n.changeLanguage(language);
    this.handleClose();
  };

  render() {
    const { t, i18n } = this.props;
    const { anchorEl } = this.state;

    const currentLanguageId = i18n.language;
    const label = t("language");

    return (
      <div>
        <List>
          <ListItem
            button
            aria-haspopup="true"
            aria-controls="lock-menu"
            aria-label={label}
            onClick={this.handleOpen}
          >
            <ListItemText
              primary={label}
              secondary={LANGUAGES[currentLanguageId]}
            />
          </ListItem>
        </List>
        <Menu
          id="lock-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          {map(LANGUAGES, (readable, id) => (
            <MenuItem
              key={id}
              selected={id === currentLanguageId}
              onClick={() => this.handleSelect(i18n, id)}
            >
              {readable}
            </MenuItem>
          ))}
        </Menu>
      </div>
    );
  }
}

PreferencesLanguagePicker.propTypes = {
  t: PropTypes.func.isRequired,
  i18n: PropTypes.object.isRequired
};

export default enhance(PreferencesLanguagePicker);
