import React, { Component } from "react";
import PropTypes from "prop-types";
import gql from "graphql-tag";
import { flow, noop } from "lodash";

import { withStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";
import withQuery from "../hoc/withQuery";
import withStepHelper from "../hoc/withStepHelper";

import Paper from "@material-ui/core/Paper";
import Stepper from "../Stepper/Stepper";
import StepperActionGroup from "../Stepper/StepperActionGroup";
import MaskWithStepper from "../Mask/MaskWithStepper";
import BookingStepTripInformation from "./BookingStepTripInformation";
import BookingStepActivityList from "./BookingStepActivityList";
import BookingStepContactInformation from "./BookingStepContactInformation";

import activityProp from "../PropTypes/activityPropType";
import bookingStatusProp from "../PropTypes/bookingStatusPropType";
import {
  BOOKING_STEP_TRIP_INFORMATION,
  BOOKING_STEP_ACTIVITY_LIST,
  BOOKING_STEP_HOTEL_LIST,
  BOOKING_STEP_SERVICE_LIST,
  BOOKING_STEP_CONFIRM,
  BOOKING_STEP_LIST
} from "./../../schema";

const styles = theme => ({
  root: {
    minWidth: 240 + 8 * theme.spacing.unit
  },
  stepper: {
    marginBottom: theme.spacing.unit
  },
  content: {
    position: "relative"
  }
});

const BOOKING_VIEW_QUERY = gql`
  {
    bookingStatus @client {
      activeStep
      fromDateString
      toDateString
      personCount
      email
      phone
      dateActivitySelected
      dateActivityList {
        dateString
        name
      }
    }
    activityList {
      name
      shortDescription
      description
      imageList {
        isThumbnail
        filePath
        fileName
        url
      }
      translationList {
        language
        name
        shortDescription
        description
      }
    }
  }
`;

const enhance = flow(
  withRouter,
  withStyles(styles),
  withQuery(BOOKING_VIEW_QUERY, undefined, undefined),
  withStepHelper(BOOKING_STEP_LIST)
);

class BookingView extends Component {
  updateBookingStatus = valueObject => {
    const {
      client,
      data: { bookingStatus }
    } = this.props;
    client.writeData({
      data: {
        bookingStatus: {
          ...bookingStatus,
          ...valueObject
        }
      }
    });
  };

  handleBack = () => {
    const {
      stepHelper,
      data: { bookingStatus }
    } = this.props;
    return this.updateBookingStatus({
      activeStep: stepHelper.getStepPrevious(bookingStatus.activeStep)
    });
  };

  handleNext = () => {
    const {
      stepHelper,
      data: { bookingStatus }
    } = this.props;
    return this.updateBookingStatus({
      activeStep: stepHelper.getStepNext(bookingStatus.activeStep)
    });
  };

  handleBookingAdded = ({
    data: {
      addBooking: { id }
    }
  }) => {
    const { history } = this.props;
    history.push(`/booking/${id}`);
  };

  renderStepUnderConstruction = () => (
    <MaskWithStepper
      messageKey="maskWorkInProgress"
      renderStepperActionGroup={this.renderStepperActionGroup}
    />
  );

  renderStepperActionGroup = (
    isBackDisabled = false,
    isNextDisabled = false,
    handleConfirm = noop
  ) => {
    const {
      stepHelper: { isStepFirst, isStepLast },
      data: { bookingStatus }
    } = this.props;
    return (
      <StepperActionGroup
        handleBack={this.handleBack}
        handleNext={this.handleNext}
        handleConfirm={handleConfirm}
        isStepFirst={isStepFirst(bookingStatus.activeStep)}
        isStepLast={isStepLast(bookingStatus.activeStep)}
        isBackDisabled={isBackDisabled}
        isNextDisabled={isNextDisabled}
      />
    );
  };

  renderStepperContent = () => {
    const { bookingStatus, activityList } = this.props.data;
    const { activeStep } = bookingStatus;
    const commonProps = {
      bookingStatus,
      renderStepperActionGroup: this.renderStepperActionGroup,
      updateBookingStatus: this.updateBookingStatus
    };

    switch (activeStep) {
      case BOOKING_STEP_TRIP_INFORMATION:
        return <BookingStepTripInformation {...commonProps} />;
      case BOOKING_STEP_ACTIVITY_LIST:
        return (
          <BookingStepActivityList
            {...commonProps}
            activityList={activityList}
          />
        );
      case BOOKING_STEP_HOTEL_LIST:
        return this.renderStepUnderConstruction();
      case BOOKING_STEP_SERVICE_LIST:
        return this.renderStepUnderConstruction();
      case BOOKING_STEP_CONFIRM:
        return (
          <BookingStepContactInformation
            {...commonProps}
            handleBookingAdded={this.handleBookingAdded}
          />
        );
      default:
        throw new Error(`${activeStep} is not a valid booking step`);
    }
  };

  render() {
    const {
      classes,
      data: { bookingStatus },
      stepHelper
    } = this.props;
    return (
      <div className={classes.root}>
        <Paper className={classes.stepper} square>
          <Stepper
            stepHelper={stepHelper}
            activeStep={bookingStatus.activeStep}
          />
        </Paper>
        <Paper className={classes.content} square>
          {this.renderStepperContent()}
        </Paper>
      </div>
    );
  }
}

BookingView.propTypes = {
  history: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  client: PropTypes.object.isRequired,
  data: PropTypes.shape({
    bookingStatus: bookingStatusProp,
    activityList: PropTypes.arrayOf(activityProp).isRequired
  }),
  stepHelper: PropTypes.shape({
    getStepNext: PropTypes.func.isRequired,
    getStepPrevious: PropTypes.func.isRequired,
    isStepFirst: PropTypes.func.isRequired,
    isStepLast: PropTypes.func.isRequired
  })
};

export default enhance(BookingView);
