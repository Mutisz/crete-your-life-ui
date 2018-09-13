import React, { Component } from "react";
import PropTypes from "prop-types";
import gql from "graphql-tag";
import { flow, map, find } from "lodash";
import { getDates, getStringFromDate } from "../../helpers/dateHelper";

import { withStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";
import withQuery from "../hoc/withQuery";
import withMutation from "../hoc/withMutation";
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
  BOOKING_STEP_ACTIVITIES,
  BOOKING_STEP_HOTELS,
  BOOKING_STEP_SERVICES,
  BOOKING_STEP_CONFIRM,
  BOOKING_STEPS
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
      dateActivities {
        dateString
        name
      }
    }
    activities {
      name
      shortDescription
      description
      images {
        isThumbnail
        filePath
        fileName
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

const BOOKING_VIEW_MUTATION = gql`
  mutation AddBooking($booking: BookingInput!) {
    addBooking(booking: $booking) {
      id
    }
  }
`;

const enhance = flow(
  withRouter,
  withStyles(styles),
  withQuery(BOOKING_VIEW_QUERY, undefined, undefined),
  withMutation(BOOKING_VIEW_MUTATION, undefined),
  withStepHelper(BOOKING_STEPS)
);

class BookingView extends Component {
  getBookingInput = () => {
    const {
      data: {
        bookingStatus: {
          fromDateString,
          toDateString,
          email,
          phone,
          dateActivities
        }
      }
    } = this.props;
    const dates = map(getDates(fromDateString, toDateString), date => {
      const dateString = getStringFromDate(date);
      const activity = find(dateActivities, ["dateString", dateString]);
      return {
        dateString: dateString,
        activity: activity ? { name: activity.name } : null
      };
    });

    return { booking: { email, phone, dates } };
  };

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
      stepHelper: { getStepNext, isStepLast },
      data: { bookingStatus }
    } = this.props;
    const isActiveStepLast = isStepLast(bookingStatus.activeStep);
    return isActiveStepLast
      ? this.handleConfirm()
      : this.updateBookingStatus({
          activeStep: getStepNext(bookingStatus.activeStep)
        });
  };

  handleConfirm = () => {
    const { mutate } = this.props;
    const variables = this.getBookingInput();
    mutate({ variables }).then(this.handleConfirmSuccess);
  };

  handleConfirmSuccess = ({
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

  renderStepperActionGroup = (isWithinForm = false) => {
    const {
      stepHelper: { isStepFirst, isStepLast },
      data: { bookingStatus }
    } = this.props;
    return (
      <StepperActionGroup
        handleBack={this.handleBack}
        handleNext={this.handleNext}
        isStepFirst={isStepFirst(bookingStatus.activeStep)}
        isStepLast={isStepLast(bookingStatus.activeStep)}
        isWithinForm={isWithinForm}
      />
    );
  };

  renderStepperContent = () => {
    const { bookingStatus, activities } = this.props.data;
    const { activeStep } = bookingStatus;
    const commonProps = {
      bookingStatus,
      renderStepperActionGroup: this.renderStepperActionGroup,
      updateBookingStatus: this.updateBookingStatus,
      handleNext: this.handleNext
    };

    switch (activeStep) {
      case BOOKING_STEP_TRIP_INFORMATION:
        return <BookingStepTripInformation {...commonProps} />;
      case BOOKING_STEP_ACTIVITIES:
        return (
          <BookingStepActivityList {...commonProps} activities={activities} />
        );
      case BOOKING_STEP_HOTELS:
        return this.renderStepUnderConstruction();
      case BOOKING_STEP_SERVICES:
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

const dataProp = PropTypes.shape({
  bookingStatus: bookingStatusProp,
  activities: PropTypes.arrayOf(activityProp).isRequired
});

BookingView.propTypes = {
  history: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  client: PropTypes.object.isRequired,
  data: dataProp.isRequired,
  mutate: PropTypes.func.isRequired,
  stepHelper: PropTypes.shape({
    getStepNext: PropTypes.func.isRequired,
    getStepPrevious: PropTypes.func.isRequired,
    isStepFirst: PropTypes.func.isRequired,
    isStepLast: PropTypes.func.isRequired
  })
};

export default enhance(BookingView);
