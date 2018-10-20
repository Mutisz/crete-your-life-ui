import React from "react";
import PropTypes from "prop-types";
import gql from "graphql-tag";
import { flow } from "lodash";

import { withStyles } from "@material-ui/core/styles";
import withQuery from "../hoc/withQuery";

import Paper from "@material-ui/core/Paper";
import ActivityList from "./ActivityList";

import preferencesProp from "../PropTypes/preferencesPropType";
import activityProp from "../PropTypes/activityPropType";

const styles = theme => ({
  root: {
    minWidth: 240 + 8 * theme.spacing.unit
  },
  section: {
    marginBottom: theme.spacing.unit,
    padding: 3 * theme.spacing.unit
  }
});

const ACTIVITY_LIST_VIEW_QUERY = gql`
  {
    preferences @client {
      currency {
        code
        rate
      }
    }
    activities {
      name
      shortDescription
      description
      pricePerPerson
      images {
        isThumbnail
        url
      }
      translations {
        language
        name
        shortDescription
        description
      }
    }
  }
`;

const enhance = flow(
  withStyles(styles),
  withQuery(ACTIVITY_LIST_VIEW_QUERY, {})
);

const ActivityListView = ({ classes, data: { preferences, activities } }) => (
  <div className={classes.root}>
    <Paper className={classes.section} square>
      <ActivityList preferences={preferences} activities={activities} />
    </Paper>
  </div>
);

ActivityListView.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.shape({
    preferences: preferencesProp.isRequired,
    activities: PropTypes.arrayOf(activityProp).isRequired
  })
};

export default enhance(ActivityListView);
