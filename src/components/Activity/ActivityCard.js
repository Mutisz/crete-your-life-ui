import React from "react";
import PropTypes from "prop-types";
import { flow, get } from "lodash";
import {
  findItemTranslation,
  findItemThumbnailUrl
} from "../../helpers/bookingHelper";

import { withStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";
import { translate } from "react-i18next";

import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import LinesEllipsis from "react-lines-ellipsis";
import CurrencyField from "../Currency/CurrencyField";

import activityProp from "../PropTypes/activityPropType";

const styles = theme => ({
  root: {
    position: "relative",
    width: 240,
    margin: theme.spacing.unit
  },
  mediaGroup: {
    height: 0,
    paddingTop: "56.25%"
  },
  contentGroup: {
    height: 104,
    marginBottom: 48
  },
  actionGroup: {
    position: "absolute",
    bottom: 0,
    width: "100%"
  },
  price: {
    position: "absolute",
    top: 8,
    right: 8,
    padding: 8,
    borderRadius: 8,
    backgroundColor: theme.palette.secondary.main
  },
  divider: {
    position: "absolute",
    bottom: 48
  },
  button: {
    margin: "auto"
  }
});

const enhance = flow(
  withRouter,
  withStyles(styles),
  translate()
);

const goToDetails = (history, name) => history.push(`/activity/${name}`);

const ActivityCardActions = ({ classes, activity, renderCardActions }) =>
  renderCardActions ? (
    <div className={classes.actionGroup}>
      <Divider />
      <CardActions>{renderCardActions(classes, activity)}</CardActions>
    </div>
  ) : null;

ActivityCardActions.propTypes = {
  classes: PropTypes.object.isRequired,
  activity: activityProp.isRequired,
  renderCardActions: PropTypes.func
};

const ActivityCard = ({
  history,
  classes,
  i18n: { language },
  activity,
  renderCardActions
}) => {
  const price = get(activity, "pricePerPerson", null);
  const url = findItemThumbnailUrl(activity);
  const activityTranslation = findItemTranslation(activity, language);
  return (
    <Card className={classes.root}>
      <CardActionArea onClick={() => goToDetails(history, activity.name)}>
        <CardMedia
          className={classes.mediaGroup}
          image={url}
          title={activityTranslation.name}
        />
        <CardContent classes={{ root: classes.contentGroup }}>
          {price ? (
            <Typography variant="body2" className={classes.price}>
              <CurrencyField amount={price} />
            </Typography>
          ) : null}
          <Typography variant="headline" gutterBottom>
            {activityTranslation.name}
          </Typography>
          <Typography variant="body1" component="div">
            <LinesEllipsis
              text={activityTranslation.shortDescription}
              maxLine={3}
            />
          </Typography>
        </CardContent>
      </CardActionArea>
      <ActivityCardActions
        classes={classes}
        activity={activity}
        renderCardActions={renderCardActions}
      />
    </Card>
  );
};

ActivityCard.propTypes = {
  history: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  i18n: PropTypes.object.isRequired,
  activity: activityProp.isRequired,
  renderCardActions: PropTypes.func
};

export default enhance(ActivityCard);
