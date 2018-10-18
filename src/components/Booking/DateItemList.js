import React, { Component } from "react";
import PropTypes from "prop-types";
import { flow, noop, find, map } from "lodash";
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
    listTileDisabled: {
      cursor: "not-allowed"
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

  isDateItemSelected = dateString => {
    const { dateItemSelected } = this.props;
    return dateItemSelected ? dateString === dateItemSelected : false;
  };

  isDateItemDisabled = dateString => {
    const { dateItemsDisabled } = this.props;
    return find(dateItemsDisabled, dateItem => dateItem === dateString) && true;
  };

  formatSubtitle = (itemTranslation, isDateItemDisabled) => {
    const { t } = this.props;
    if (isDateItemDisabled) {
      return t("dateItemDisabled");
    } else if (itemTranslation) {
      return itemTranslation.name;
    }

    return null;
  };

  renderDateItem = date => {
    const { classes, i18n, handleDateItemSelect } = this.props;
    const dateString = getStringFromDate(date);
    const itemTranslation = this.findItemTranslationByDateString(dateString);
    const thumbnailUrl = this.findItemThumbnailUrlByDateString(dateString);
    const isDateItemSelected = this.isDateItemSelected(dateString);
    const isDateItemDisabled = this.isDateItemDisabled(dateString);

    const tileNameClassName = isDateItemDisabled
      ? classes.listTileDisabled
      : classes.listTile;
    const tileBarTitleClassName = isDateItemSelected
      ? classes.listTileBarTitleSelected
      : classes.listTileBarTitle;
    const onClick = !isDateItemDisabled
      ? () => handleDateItemSelect(dateString)
      : noop;

    const title = formatDate(date, i18n.language);
    const subtitle = this.formatSubtitle(itemTranslation, isDateItemDisabled);

    return (
      <GridListTile
        key={dateString}
        className={tileNameClassName}
        onClick={onClick}
      >
        <img src={thumbnailUrl} alt={title} />
        <GridListTileBar
          title={title}
          subtitle={subtitle}
          classes={{
            title: tileBarTitleClassName
          }}
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
          {map(dates, date => this.renderDateItem(date))}
        </GridList>
      </div>
    );
  };
}

DateItemList.defaultProps = {
  dateItemsDisabled: []
};

DateItemList.propTypes = {
  classes: PropTypes.object.isRequired,
  i18n: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
  fromDateString: PropTypes.string.isRequired,
  toDateString: PropTypes.string.isRequired,
  dateItemSelected: PropTypes.string,
  dateItemsDisabled: PropTypes.arrayOf(PropTypes.string),
  dateItems: PropTypes.arrayOf(dateItemProp).isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({ name: PropTypes.string.isRequired })
  ).isRequired,
  handleDateItemSelect: PropTypes.func.isRequired
};

export default enhance(DateItemList);
