import React from "react";
import PropTypes from "prop-types";
import { flow } from "lodash";
import {
  findItemTranslation,
  findItemThumbnailUrl
} from "../../helpers/bookingHelper";

import { withStyles } from "@material-ui/core/styles";
import { translate } from "react-i18next";

import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";

import activityProp from "../PropTypes/activityPropType";

const styles = theme => ({
  root: {
    position: "relative",
    width: 240,
    margin: theme.spacing.unit
  },
  contentGroup: {
    marginBottom: 48
  },
  actionGroup: {
    position: "absolute",
    bottom: 0,
    width: "100%"
  },
  divider: {
    position: "absolute",
    bottom: 48
  },
  button: {
    margin: "auto"
  },
  image: {
    height: 0,
    paddingTop: "56.25%"
  }
});

const enhance = flow(
  withStyles(styles),
  translate()
);

const ActivityCard = ({ classes, i18n, activity, renderCardActions }) => {
  const url = findItemThumbnailUrl(activity);
  const activityTranslation = findItemTranslation(activity, i18n.language);
  return (
    <Card className={classes.root}>
      <CardMedia
        className={classes.image}
        image={url}
        title={activityTranslation.name}
      />
      <CardContent classes={{ root: classes.contentGroup }}>
        <Typography variant="headline" gutterBottom>
          {activityTranslation.name}
        </Typography>
        <Typography variant="body1">
          {activityTranslation.shortDescription}
        </Typography>
      </CardContent>
      {renderCardActions ? (
        <div className={classes.actionGroup}>
          <Divider />
          <CardActions>{renderCardActions(classes, activity)}</CardActions>
        </div>
      ) : null}
    </Card>
  );
};

ActivityCard.propTypes = {
  classes: PropTypes.object.isRequired,
  i18n: PropTypes.object.isRequired,
  activity: activityProp.isRequired,
  renderCardActions: PropTypes.func
};

export default enhance(ActivityCard);
