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

const ActivityList = ({ classes, activityList, handleActivityAdd }) => (
  <div className={classes.root}>
    {activityList.map(activity => (
      <ActivityCard
        key={activity.name}
        activity={activity}
        handleActivityAdd={handleActivityAdd}
      />
    ))}
  </div>
);

ActivityList.propTypes = {
  classes: PropTypes.object.isRequired,
  activityList: PropTypes.arrayOf(activityProp).isRequired,
  handleActivityAdd: PropTypes.func
};

export default enhance(ActivityList);
