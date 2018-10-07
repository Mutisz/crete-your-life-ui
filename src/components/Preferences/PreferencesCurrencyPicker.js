import React, { Component } from "react";
import PropTypes from "prop-types";
import { translate } from "react-i18next";
import { flow, map, find } from "lodash";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

import { CURRENCIES } from "../../config/consts/currencyConsts";

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

  handleSelect = selectedCode => {
    const { client, currencies } = this.props;
    const { code, rate } = find(currencies, ["code", selectedCode]);
    client.writeData({
      data: {
        preferences: {
          __typename: "Preferences",
          currency: {
            __typename: "Currency",
            code,
            rate
          }
        }
      }
    });

    this.handleClose();
  };

  render() {
    const { t, selectedCurrency } = this.props;
    const { anchorEl } = this.state;

    const label = t("currency");
    const selectedCurrencyCode = selectedCurrency.code;

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
            <ListItemText primary={label} secondary={selectedCurrencyCode} />
          </ListItem>
        </List>
        <Menu
          id="lock-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          {map(CURRENCIES, code => (
            <MenuItem
              key={code}
              selected={code === selectedCurrencyCode}
              onClick={() => this.handleSelect(code)}
            >
              {code}
            </MenuItem>
          ))}
        </Menu>
      </div>
    );
  }
}

PreferencesLanguagePicker.propTypes = {
  t: PropTypes.func.isRequired
};

export default enhance(PreferencesLanguagePicker);
