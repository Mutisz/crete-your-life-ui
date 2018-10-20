import React from "react";
import PropTypes from "prop-types";
import gql from "graphql-tag";
import { flow } from "lodash";

import { withStyles } from "@material-ui/core/styles";
import { translate } from "react-i18next";
import withQuery from "../../hoc/withQuery";

import Paper from "@material-ui/core/Paper";

import preferencesProp from "../../PropTypes/preferencesPropType";
import activityProp from "../../PropTypes/activityPropType";

const styles = theme => ({
  root: {
    minWidth: 240 + 8 * theme.spacing.unit
  },
  section: {
    marginBottom: theme.spacing.unit,
    padding: 3 * theme.spacing.unit
  }
});

const ACTIVITY_DETAILS_VIEW_QUERY = gql`
  query GetACtivity($name: String!) {
    preferences @client {
      currency {
        code
        rate
      }
    }
    activity(name: $name) {
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

const propsToVariables = props => ({
  name: props.match.params.name
});

const enhance = flow(
  withStyles(styles),
  translate(),
  withQuery(ACTIVITY_DETAILS_VIEW_QUERY, { propsToVariables })
);

const ActivityDetailsView = ({ classes, data: { preferences, activity } }) => (
  <div className={classes.root}>
    <Paper className={classes.section} square>
      {activity.description}
    </Paper>
  </div>
);

ActivityDetailsView.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.shape({
    activity: activityProp.isRequired
  })
};

export default enhance(ActivityDetailsView);
