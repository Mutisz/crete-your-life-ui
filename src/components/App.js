import React from "react";
import PropTypes from "prop-types";
import { Switch, Route } from "react-router-dom";
import { flow } from "lodash";
import I18nDateFnsUtils, {
  createI18nDateLocale
} from "../config/createI18nDate";

import { translate } from "react-i18next";

import MuiPickersUtilsProvider from "material-ui-pickers/utils/MuiPickersUtilsProvider";
import Navigation from "./Navigation/Navigation";
import BookingView from "./Booking/BookingView";
import BookingConfirmationView from "./Booking/BookingConfirmationView";
import ActivityListView from "./Activity/ActivityListView";

const enhance = flow(translate());

const App = ({ i18n }) => {
  const dateLocale = createI18nDateLocale(i18n.language);
  return (
    <MuiPickersUtilsProvider utils={I18nDateFnsUtils} locale={dateLocale}>
      <Navigation>
        <Switch>
          <Route path="/" component={BookingView} exact />
          <Route path="/activityList" component={ActivityListView} />
          <Route path="/booking/:id" component={BookingConfirmationView} />
        </Switch>
      </Navigation>
    </MuiPickersUtilsProvider>
  );
};

App.propTypes = {
  i18n: PropTypes.object.isRequired
};

export default enhance(App);
