import React from "react";
import PropTypes from "prop-types";
import { flow, map } from "lodash";

import { withStyles } from "@material-ui/core/styles";
import { translate } from "react-i18next";

import WarningIcon from "@material-ui/icons/Warning";
import Typography from "@material-ui/core/Typography";

const styles = theme => ({
  root: {
    marginBottom: 3 * theme.spacing.unit,
    padding: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.light
  },
  title: {
    marginLeft: theme.spacing.unit
  }
});

const enhance = flow(
  withStyles(styles),
  translate()
);

const MessagePanel = ({ classes, t, titleKey, messageKeys, messageProps }) => (
  <div className={classes.root}>
    <Typography variant="title">
      <WarningIcon />
      <span className={classes.title}>{t(titleKey)}</span>
    </Typography>
    {map(messageKeys, key => (
      <Typography variant="body1" component="p">
        {t(key, messageProps)}
      </Typography>
    ))}
  </div>
);

MessagePanel.defaultProps = {
  titleKey: "messageWarning"
};

MessagePanel.propTypes = {
  classes: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
  titleKey: PropTypes.string,
  messageKeys: PropTypes.arrayOf(PropTypes.string).isRequired,
  messageProps: PropTypes.object
};

export default enhance(MessagePanel);
