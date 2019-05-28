import React from "react";
import { MuiPickersUtilsProvider } from "material-ui-pickers";
import { Switch, Route } from "react-router-dom";
import Navigation from "./Navigation/Navigation";
// import ActivityListView from "./Activity/ActivityListView";
// import ActivityDetailsView from "./Activity/Details/ActivityDetailsView";
import BookingView from "./Booking/BookingView";
// import BookingConfirmationView from "./Booking/Confirmation/BookingConfirmationView";

import moment from "moment";
import MuiPickersUtils from "../helpers/MuiPickersUtils";

import { useTranslation } from "react-i18next";

const App = () => {
  const {
    i18n: { language }
  } = useTranslation();
  moment.locale(language);
  return (
    <MuiPickersUtilsProvider
      utils={MuiPickersUtils}
      locale={language}
      moment={moment}
    >
      <Navigation>
        <Switch>
          <Route path="/" component={BookingView} exact />
          {/* <Route path="/activities" component={ActivityListView} />
          <Route path="/activity/:name" component={ActivityDetailsView} />
          <Route path="/booking/:number" component={BookingConfirmationView} /> */}
        </Switch>
      </Navigation>
    </MuiPickersUtilsProvider>
  );
};

export default App;
