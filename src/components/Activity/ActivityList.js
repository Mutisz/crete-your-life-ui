import React from "react";
import PropTypes from "prop-types";

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

const ActivityList = ({ classes, activities, renderCardActions }) => (
  <div className={classes.root}>
    {activities.map(activity => (
      <ActivityCard
        key={activity.name}
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
