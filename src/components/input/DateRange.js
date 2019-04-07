import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { flow } from "lodash";
import { getDateFromString } from "../../helpers/dateHelper";
import moment from "moment";

import { DATE_FORMAT } from "../../config/consts/dateConsts";

import { withStyles } from "@material-ui/core/styles";
import { translate } from "react-i18next";

import { ValidatorForm } from "react-material-ui-form-validator";
import DatePickerValidator from "../input/DatePickerValidator";

const styles = theme => ({
  inputField: {
    flexBasis: "45%",
    marginBottom: theme.spacing.unit
  }
});

const enhance = flow(
  withStyles(styles),
  translate()
);

class DateRange extends Component {
  componentDidMount() {
    ValidatorForm.addValidationRule("isDateRangeCorrect", () => {
      const { fromDateString, toDateString } = this.props;
      return (
        !fromDateString ||
        !toDateString ||
        moment(fromDateString).isBefore(toDateString)
      );
    });
  }

  render() {
    const {
      classes,
      t,
      fromDateString,
      toDateString,
      handleFromDateChange,
      handleToDateChange
    } = this.props;
    return (
      <Fragment>
        <DatePickerValidator
          name={"inputDateFrom"}
          className={classes.inputField}
          validators={["required", "isDateRangeCorrect"]}
          errorMessages={[t("validationRequired"), t("validationDateRange")]}
          label={t("inputDateFrom")}
          clearLabel={t("inputDateClear")}
          cancelLabel={t("inputDateCancel")}
          format={DATE_FORMAT}
          value={getDateFromString(fromDateString)}
          onChange={handleFromDateChange}
          disablePast
          clearable
          autoOk
        />
        <DatePickerValidator
          name={"inputDateTo"}
          className={classes.inputField}
          validators={["required", "isDateRangeCorrect"]}
          errorMessages={[t("validationRequired"), t("validationDateRange")]}
          label={t("inputDateTo")}
          clearLabel={t("inputDateClear")}
          cancelLabel={t("inputDateCancel")}
          format={DATE_FORMAT}
          value={getDateFromString(toDateString)}
          onChange={handleToDateChange}
          disablePast
          clearable
          autoOk
        />
      </Fragment>
    );
  }
}

DateRange.propTypes = {
  classes: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
  fromDateString: PropTypes.string,
  toDateString: PropTypes.string,
  handleFromDateChange: PropTypes.func.isRequired,
  handleToDateChange: PropTypes.func.isRequired
};

export default enhance(DateRange);
