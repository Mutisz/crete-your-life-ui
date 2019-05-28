import React, { FunctionComponent, useState } from "react";
import { Route } from "react-router-dom";
import Hidden from "@material-ui/core/Hidden";
import Typography from "@material-ui/core/Typography";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import MenuIcon from "@material-ui/icons/Menu";
import IconButton from "@material-ui/core/IconButton";
import NavigationMenu from "./NavigationMenu";
import PreferencesDialog from "../Preferences/PreferencesDialog";

import { useTranslation } from "react-i18next";
import { Theme, useTheme } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme: Theme) => {
  const navigationWidth = 240;
  const toolbarHeight = Number(theme.mixins.toolbar.minHeight);
  const padding = 2 * theme.spacing(1);
  return {
    root: {
      display: "flex"
    },
    appBar: {
      height: toolbarHeight,
      [theme.breakpoints.up("md")]: {
        width: `calc(100% - ${navigationWidth}px)`,
        marginLeft: navigationWidth
      }
    },
    appBarLocation: {
      flexGrow: 1
    },
    navigationMenuOpenButton: {
      [theme.breakpoints.up("md")]: {
        display: "none"
      }
    },
    navigationMenuContent: {
      width: navigationWidth,
      [theme.breakpoints.up("md")]: {
        position: "fixed"
      }
    },
    mainContent: {
      flexGrow: 1,
      width: `calc(100vw - ${navigationWidth + 2 * padding}px)`,
      height: `calc(100vh - ${toolbarHeight + 2 * padding}px)`,
      marginTop: toolbarHeight,
      [theme.breakpoints.up("md")]: {
        marginLeft: navigationWidth
      }
    },
    mainContentScroll: {
      height: "100%",
      padding: padding,
      overflowY: "scroll",
      backgroundColor: theme.palette.background.default
    }
  };
});

const useNavigationMenuOpen = () => {
  const [navigationMenuOpen, setNavigationMenuOpen] = useState(false);
  const stateAfterToggle = navigationMenuOpen === false;
  return {
    navigationMenuOpen,
    toggleNavigationMenuOpen: () => setNavigationMenuOpen(stateAfterToggle)
  };
};

const NavigationContainer: FunctionComponent = ({ children }) => {
  const {
    navigationMenuOpen,
    toggleNavigationMenuOpen
  } = useNavigationMenuOpen();
  const { t } = useTranslation();
  const classes = useStyles();
  const theme = useTheme();
  return (
    <div className={classes.root}>
      <AppBar className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="Navigation"
            onClick={toggleNavigationMenuOpen}
            className={classes.navigationMenuOpenButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            color="inherit"
            className={classes.appBarLocation}
            noWrap
          >
            <Route path="/" render={() => t("booking")} exact />
            <Route path="/activities" render={() => t("activities")} />
            <Route path="/booking" render={() => t("bookingConfirmation")} />
            <Route path="/bookingPayment" render={() => t("bookingPayment")} />
          </Typography>
          <PreferencesDialog />
        </Toolbar>
      </AppBar>
      <Hidden mdUp>
        <Drawer
          variant="temporary"
          classes={{
            paper: classes.navigationMenuContent
          }}
          anchor={theme.direction === "rtl" ? "right" : "left"}
          onClose={toggleNavigationMenuOpen}
          open={navigationMenuOpen}
        >
          {<NavigationMenu />}
        </Drawer>
      </Hidden>
      <Hidden implementation="css" smDown>
        <Drawer
          variant="permanent"
          classes={{
            paper: classes.navigationMenuContent
          }}
          open
        >
          {<NavigationMenu />}
        </Drawer>
      </Hidden>
      <main className={classes.mainContent}>
        <div className={classes.mainContentScroll}>{children}</div>
      </main>
    </div>
  );
};

export default NavigationContainer;
