import React from "react";
import PropTypes from "prop-types";
import gql from "graphql-tag";
import { flow } from "lodash";
import { findItemTranslation } from "../../../helpers/bookingHelper";

import { withStyles } from "@material-ui/core/styles";
import { translate } from "react-i18next";
import withQuery from "../../hoc/withQuery";

import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Markdown from "react-markdown";
import CurrencyField from "../../Currency/CurrencyField";
import LabelledValueTable from "../../LabelledValue/LabelledValueTable";

import activityProp from "../../PropTypes/activityPropType";

const styles = theme => ({
  root: {
    minWidth: 240 + 8 * theme.spacing.unit
  },
  section: {
    padding: 3 * theme.spacing.unit
  },
  subsection: {
    marginBottom: 3 * theme.spacing.unit
  },
  button: {
    marginTop: theme.spacing.unit
  }
});

const ACTIVITY_DETAILS_VIEW_QUERY = gql`
  query GetActivity($name: String!) {
    activity(name: $name) {
      name
      shortDescription
      description
      pricePerPerson
      category
      difficulty
      durationHours
      earliestStartHour
      latestStartHour
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

const getInformationList = ({
  pricePerPerson,
  category,
  difficulty,
  durationHours,
  earliestStartHour,
  latestStartHour
}) => [
  {
    label: "activityDetailsPrice",
    value: <CurrencyField amount={pricePerPerson} />
  },
  { label: "activityDetailsCategory", value: category },
  { label: "activityDetailsDifficulty", value: difficulty },
  { label: "activityDetailsDuration", value: durationHours },
  {
    label: "activityDetailsStartHour",
    value: `${earliestStartHour} - ${latestStartHour}`
  }
];

const ActivityDetailsView = ({
  classes,
  t,
  i18n: { language },
  data: { activity }
}) => {
  const activityTranslation = findItemTranslation(activity, language);
  const informationList = getInformationList(activity);
  return (
    <div className={classes.root}>
      <Paper className={classes.section} square>
        <Typography variant="display1" gutterBottom>
          {activityTranslation.name}
        </Typography>
        <div className={classes.subsection}>
          <Typography variant="title" gutterBottom>
            {t("activityDetailsInformation")}
          </Typography>
          <LabelledValueTable valueList={informationList} />
        </div>
        <Typography variant="body1" component="div" gutterBottom>
          <Markdown source={activityTranslation.description} />
        </Typography>
      </Paper>
    </div>
  );
};

ActivityDetailsView.propTypes = {
  classes: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
  i18n: PropTypes.object.isRequired,
  data: PropTypes.shape({
    activity: activityProp.isRequired
  })
};

export default enhance(ActivityDetailsView);
