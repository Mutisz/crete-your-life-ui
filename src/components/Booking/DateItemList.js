import React, { Component } from "react";
import PropTypes from "prop-types";
import { flow } from "lodash";
import {
  formatDate,
  getStringFromDate,
  getDates
} from "../../helpers/dateHelper";
import {
  PLACEHOLDER_URL,
  findItem,
  findItemTranslation,
  findItemThumbnailUrl
} from "../../helpers/bookingHelper";

import { withStyles } from "@material-ui/core/styles";
import { translate } from "react-i18next";

import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";

import dateItemProp from "../PropTypes/dateItemPropType";

const styles = theme => {
  return {
    root: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "space-around",
      overflow: "hidden",
      padding: theme.spacing.unit
    },
    list: {
      flexWrap: "nowrap"
    },
    listTile: {
      cursor: "pointer"
    },
    listTileBarTitle: {},
    listTileBarTitleSelected: {
      color: theme.palette.secondary.light
    }
  };
};

const enhance = flow(
  withStyles(styles),
  translate()
);

class DateItemList extends Component {
  findItemByDateString = dateString => {
    const { dateItems, items } = this.props;
    return findItem(dateString, dateItems, items);
  };

  findItemTranslationByDateString = dateString => {
    const { i18n } = this.props;
    const item = this.findItemByDateString(dateString);
    return item ? findItemTranslation(item, i18n.language) : null;
  };

  findItemThumbnailUrlByDateString = dateString => {
    const item = this.findItemByDateString(dateString);
    return item ? findItemThumbnailUrl(item) : PLACEHOLDER_URL;
  };

  renderDateItem = date => {
    const {
      classes,
      i18n,
      dateItemSelected,
      handleDateItemSelect
    } = this.props;
    const dateString = getStringFromDate(date);
    const itemTranslation = this.findItemTranslationByDateString(dateString);
    const isDateItemSelected = dateItemSelected
      ? dateString === dateItemSelected
      : false;
    const tileBarClasses = {
      title: isDateItemSelected
        ? classes.listTileBarTitleSelected
        : classes.listTileBarTitle
    };

    const thumbnailUrl = this.findItemThumbnailUrlByDateString(dateString);
    const title = formatDate(date, i18n.language);
    const subtitle = itemTranslation ? itemTranslation.name : null;

    return (
      <GridListTile
        key={dateString}
        className={classes.listTile}
        onClick={() => handleDateItemSelect(dateString)}
      >
        <img src={thumbnailUrl} alt={title} />
        <GridListTileBar
          title={title}
          subtitle={subtitle}
          classes={tileBarClasses}
        />
      </GridListTile>
    );
  };

  render = () => {
    const { classes, fromDateString, toDateString } = this.props;
    const dates = getDates(fromDateString, toDateString);

    return (
      <div className={classes.root}>
        <GridList className={classes.list} cols={3}>
          {dates.map(date => this.renderDateItem(date))}
        </GridList>
      </div>
    );
  };
}

DateItemList.propTypes = {
  classes: PropTypes.object.isRequired,
  i18n: PropTypes.object.isRequired,
  fromDateString: PropTypes.string.isRequired,
  toDateString: PropTypes.string.isRequired,
  dateItemSelected: PropTypes.string,
  dateItems: PropTypes.arrayOf(dateItemProp).isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({ name: PropTypes.string.isRequired })
  ).isRequired,
  handleDateItemSelect: PropTypes.func.isRequired
};

export default enhance(DateItemList);
