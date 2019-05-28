import React, { FunctionComponent } from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";

import { useTranslation } from "react-i18next";
import { Theme } from "@material-ui/core";
import { makeStyles, createStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    logo: {
      display: "block",
      width: "90%",
      marginTop: 2 * theme.spacing(1),
      marginRight: "auto",
      marginLeft: "auto",
      marginBottom: 2 * theme.spacing(1)
    },
    button: {
      display: "block",
      width: "90%",
      marginRight: "auto",
      marginLeft: "auto",
      marginBottom: 2 * theme.spacing(1),
      textAlign: "center"
    }
  })
);

const NavigationMenu: FunctionComponent = () => {
  const { t } = useTranslation();
  const classes = useStyles();
  return (
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
        to={"/activities"}
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
};

export default NavigationMenu;
