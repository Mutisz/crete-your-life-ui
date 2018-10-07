import React from "react";
import PropTypes from "prop-types";
import { map } from "lodash";

import { withStyles } from "@material-ui/core/styles";

import ActivityCard from "./ActivityCard";

import activityProp from "../PropTypes/activityPropType";

const styles = {
  root: {
    display: "flex",
    flexWrap: "wrap"
  }
};

const enhance = withStyles(styles);

const ActivityList = ({ classes, currency, activities, renderCardActions }) => (
  <div className={classes.root}>
    {map(activities, activity => (
      <ActivityCard
        key={activity.name}
        currency={currency}
        activity={activity}
        renderCardActions={renderCardActions}
      />
    ))}
  </div>
);

ActivityList.propTypes = {
  classes: PropTypes.object.isRequired,
  activities: PropTypes.arrayOf(activityProp).isRequired,
  renderCardActions: PropTypes.func
};

export default enhance(ActivityList);
