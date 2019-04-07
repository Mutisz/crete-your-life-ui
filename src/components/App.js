import React from "react";
import PropTypes from "prop-types";
import { Switch, Route } from "react-router-dom";
import { flow } from "lodash";
import moment from "moment";
import MuiPickersUtils from "../helpers/MuiPickersUtils";

import { translate } from "react-i18next";

import { MuiPickersUtilsProvider } from "material-ui-pickers";
import Navigation from "./Navigation/Navigation";
import ActivityListView from "./Activity/ActivityListView";
import ActivityDetailsView from "./Activity/Details/ActivityDetailsView";
import BookingView from "./Booking/BookingView";
import BookingConfirmationView from "./Booking/Confirmation/BookingConfirmationView";
import BookingPaymentView from "./Booking/Payment/BookingPaymentView";

const enhance = flow(translate());

const App = ({ i18n }) => {
  moment.locale(i18n.language);
  return (
    <MuiPickersUtilsProvider
      utils={MuiPickersUtils}
      locale={i18n.language}
      moment={moment}
    >
      <Navigation>
        <Switch>
          <Route path="/" component={BookingView} exact />
          <Route path="/activities" component={ActivityListView} />
          <Route path="/activity/:name" component={ActivityDetailsView} />
          <Route path="/booking/:number" component={BookingConfirmationView} />
          <Route
            path="/bookingPayment/:number"
            component={BookingPaymentView}
          />
        </Switch>
      </Navigation>
    </MuiPickersUtilsProvider>
  );
};

App.propTypes = {
  i18n: PropTypes.object.isRequired
};

export default enhance(App);
