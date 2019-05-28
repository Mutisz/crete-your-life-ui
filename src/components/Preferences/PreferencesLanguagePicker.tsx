import React, { FunctionComponent, SyntheticEvent, useState } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

import { useTranslation } from "react-i18next";
import { map } from "lodash";

import { LANGUAGES } from "../../config/consts/languageConsts";

interface PreferencesLanguagePickerOptionProps {
  selectedLanguage: string;
  optionLanguage: string;
  handleSelect: (language: string) => void;
}

const PreferencesLanguagePickerOption: FunctionComponent<
  PreferencesLanguagePickerOptionProps
> = ({ selectedLanguage, optionLanguage, handleSelect }) => {
  const isSelected = selectedLanguage === optionLanguage;
  return (
    <MenuItem
      key={optionLanguage}
      selected={isSelected}
      onClick={() => handleSelect(optionLanguage)}
    >
      {LANGUAGES[optionLanguage]}
    </MenuItem>
  );
};

const PreferencesLanguagePicker: FunctionComponent = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const { t, i18n } = useTranslation();
  const selectedLanguage = i18n.language;

  const label = t("language");

  const handleOpen = (event: SyntheticEvent<HTMLElement>) =>
    setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const handleSelect = (language: string) => {
    i18n.changeLanguage(language);
    handleClose();
  };

  return (
    <div>
      <List>
        <ListItem
          button
          aria-haspopup="true"
          aria-controls="language-menu"
          aria-label={label}
          onClick={handleOpen}
        >
          <ListItemText
            primary={label}
            secondary={LANGUAGES[selectedLanguage]}
          />
        </ListItem>
      </List>
      <Menu
        id="language-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {map(LANGUAGES, (_optionLanguageDescription, optionLanguage) => (
          <PreferencesLanguagePickerOption
            selectedLanguage={selectedLanguage}
            optionLanguage={optionLanguage}
            handleSelect={handleSelect}
          />
        ))}
      </Menu>
    </div>
  );
};

export default PreferencesLanguagePicker;
