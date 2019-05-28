import React, { FunctionComponent, SyntheticEvent, useState } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

import { useTranslation } from "react-i18next";
import { map, find, curry } from "lodash";

import { CURRENCIES } from "../../config/consts/currencyConsts";
import { CurrencyCode } from "../../codegen";
import { useApolloClient } from "react-apollo-hooks";
import ApolloClient from "apollo-client";

interface Currency {
  code: string;
  rate: number;
}

interface PreferencesCurrencyPickerProps {
  selectedCurrency: { code: CurrencyCode };
  currencies: Currency[];
}

interface PreferencesCurrencyPickerOptionProps {
  selectedCurrencyCode: CurrencyCode;
  optionCurrencyCode: CurrencyCode;
  handleSelect: (currencyCode: CurrencyCode) => void;
}

const changeCurrency = curry(
  (
    client: ApolloClient<object>,
    currencies: Currency[],
    currencyCode: CurrencyCode
  ) => {
    const currency = find(currencies, ["code", currencyCode]);
    if (!currency) {
      throw new Error("error");
    }

    const { code, rate } = currency;
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
  }
);

const PreferencesCurrencyPickerOption: FunctionComponent<
  PreferencesCurrencyPickerOptionProps
> = ({ selectedCurrencyCode, optionCurrencyCode, handleSelect }) => {
  const isSelected = selectedCurrencyCode === optionCurrencyCode;
  return (
    <MenuItem
      key={optionCurrencyCode}
      selected={isSelected}
      onClick={() => handleSelect(optionCurrencyCode)}
    >
      {optionCurrencyCode}
    </MenuItem>
  );
};

const PreferencesCurrencyPicker: FunctionComponent<
  PreferencesCurrencyPickerProps
> = ({ selectedCurrency: { code: selectedCurrencyCode }, currencies }) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const client = useApolloClient();
  const { t } = useTranslation();

  const label = t("currency");

  const handleOpen = (event: SyntheticEvent<HTMLElement>) =>
    setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const handleSelect = (currencyCode: CurrencyCode) => {
    changeCurrency(client, currencies, currencyCode);
    handleClose();
  };

  return (
    <div>
      <List>
        <ListItem
          button
          aria-haspopup="true"
          aria-controls="currency-menu"
          aria-label={label}
          onClick={handleOpen}
        >
          <ListItemText primary={label} secondary={selectedCurrencyCode} />
        </ListItem>
      </List>
      <Menu
        id="currency-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {map(CURRENCIES, optionCurrencyCode => (
          <PreferencesCurrencyPickerOption
            selectedCurrencyCode={selectedCurrencyCode}
            optionCurrencyCode={optionCurrencyCode}
            handleSelect={handleSelect}
          />
        ))}
      </Menu>
    </div>
  );
};

export default PreferencesCurrencyPicker;
