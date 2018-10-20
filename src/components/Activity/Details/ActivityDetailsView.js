import React from "react";
import PropTypes from "prop-types";
import gql from "graphql-tag";
import { flow } from "lodash";
import { findItemTranslation } from "../../../helpers/bookingHelper";
import { getCurrencyLocale, convert } from "../../../helpers/currencyHelper";

import { withStyles } from "@material-ui/core/styles";
import { translate } from "react-i18next";
import withQuery from "../../hoc/withQuery";

import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Markdown from "react-markdown";
import Currency from "react-currency-formatter";

import preferencesProp from "../../PropTypes/preferencesPropType";
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
  },
  dataTable: {
    minWidth: "25%",
    textAlign: "left"
  }
});

const ACTIVITY_DETAILS_VIEW_QUERY = gql`
  query GetActivity($name: String!) {
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

const ActivityDetailsView = ({
  classes,
  t,
  i18n,
  data: {
    preferences: {
      currency: { code, rate }
    },
    activity
  }
}) => {
  const { language } = i18n;
  const activityTranslation = findItemTranslation(activity, language);
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
          <Typography variant="body1" component="div">
            <table className={classes.dataTable}>
              <tbody>
                <tr>
                  <th scope="row">{t("activityDetailsPrice")}</th>
                  <td>
                    <Currency
                      currency={code}
                      quantity={convert(activity.pricePerPerson, rate)}
                      locale={getCurrencyLocale(language)}
                    />
                  </td>
                </tr>
                <tr>
                  <th scope="row">{t("activityDetailsCategory")}</th>
                  <td>{t(activity.category)}</td>
                </tr>
                <tr>
                  <th scope="row">{t("activityDetailsDifficulty")}</th>
                  <td>{t(activity.difficulty)}</td>
                </tr>
                <tr>
                  <th scope="row">{t("activityDetailsDuration")}</th>
                  <td>{activity.durationHours}</td>
                </tr>
                <tr>
                  <th scope="row">{t("activityDetailsStartHour")}</th>
                  <td>{`${activity.earliestStartHour} - ${
                    activity.latestStartHour
                  }`}</td>
                </tr>
              </tbody>
            </table>
          </Typography>
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
  i18n: PropTypes.object.isRequired,
  data: PropTypes.shape({
    preferences: preferencesProp.isRequired,
    activity: activityProp.isRequired
  })
};

export default enhance(ActivityDetailsView);
