import React from "react";
import { flow } from "lodash";

import { withStyles } from "@material-ui/core/styles";
import { translate } from "react-i18next";

import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";

const styles = theme => ({
  logo: {
    display: "block",
    width: "90%",
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: 2 * theme.spacing.unit
  },
  button: {
    display: "block",
    width: "90%",
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: theme.spacing.unit,
    textAlign: "center"
  }
});

const enhance = flow(
  withStyles(styles),
  translate()
);

const NavigationMenu = ({ classes, t }) => (
  <div>
    <img
      className={classes.logo}
      alt="Crete your Life"
      src="/images/logo/logo_horizontal.png"
    />
    <Button
      component={Link}
      variant="contained"
      color="secondary"
      className={classes.button}
      to={"/"}
    >
      {t("booking")}
    </Button>
    <Button
      component={Link}
      variant="contained"
      className={classes.button}
      to={"/activityList"}
    >
      {t("activities")}
    </Button>
    <Button
      component="a"
      variant="contained"
      className={classes.button}
      href="http://www.creteyourlife.com/"
      target="_blank"
    >
      {t("blog")}
    </Button>
  </div>
);

export default enhance(NavigationMenu);
