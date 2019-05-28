import React, { ReactElement } from "react";

import { makeStyles } from "@material-ui/styles";
import { Theme } from "@material-ui/core";

// const enhance = flow(
//   withRouter,
//   withStyles(styles),
//   withBookingQuery,
//   withMutation(BOOKING_VIEW_MUTATION, undefined),
//   withStepHelper(BOOKING_STEPS)
// );

// getBookingInputDate = date => {
//   const dateString = getStringFromDate(date);
//   const activity = find(dateActivities, ["dateString", dateString]);
//   return {
//     date: dateString,
//     activity: activity ? activity.name : null
//   };
// };

// getBookingInput = () => {
//   const {
//     data: {
//       bookingStatus: { fromDateString, toDateString, email, phone, personCount }
//     }
//   } = this.props;
//   const dates = getDates(fromDateString, toDateString);
//   const bookingDates = map(dates, this.getBookingInputDate);

//   return {
//     booking: { email, phone, personCount, dates: bookingDates }
//   };
// };

// updateBookingStatus = valueObject => {
//   const { client } = this.props;
//   client.writeData({
//     data: {
//       bookingStatus: {
//         __typename: "BookingStatus",
//         ...valueObject
//       }
//     }
//   });
// };

// handleBack = () => {
//   const {
//     stepHelper,
//     data: { bookingStatus }
//   } = this.props;
//   return this.updateBookingStatus({
//     activeStep: stepHelper.getStepPrevious(bookingStatus.activeStep)
//   });
// };

// handleNext = () => {
//   const {
//     stepHelper: { getStepNext, isStepLast },
//     data: { bookingStatus }
//   } = this.props;
//   const isActiveStepLast = isStepLast(bookingStatus.activeStep);
//   return isActiveStepLast
//     ? this.handleConfirm()
//     : this.updateBookingStatus({
//         activeStep: getStepNext(bookingStatus.activeStep)
//       });
// };

// handleConfirm = () => {
//   const { mutate } = this.props;
//   const variables = this.getBookingInput();
//   mutate({ variables }).then(this.handleConfirmSuccess);
// };

// handleConfirmSuccess = ({
//   data: {
//     createBooking: { number }
//   }
// }) => {
//   const { history } = this.props;
//   history.push(`/booking/${number}`);
// };

// renderStepUnderConstruction = () => (
//   <MaskWithStepper
//     messageKey="maskWorkInProgress"
//     renderStepperActionGroup={this.renderStepperActionGroup}
//   />
// );

// renderStepperActionGroup = (isWithinForm = false) => {
//   const {
//     stepHelper: { isStepFirst, isStepLast },
//     data: { bookingStatus }
//   } = this.props;
//   return (
//     <StepperActionGroup
//       handleBack={this.handleBack}
//       handleNext={this.handleNext}
//       isStepFirst={isStepFirst(bookingStatus.activeStep)}
//       isStepLast={isStepLast(bookingStatus.activeStep)}
//       isWithinForm={isWithinForm}
//     />
//   );
// };

// const renderStepperContent = () => {
//   const { preferences, bookingStatus, activities } = this.props.data;
//   const { activeStep } = bookingStatus;
//   const commonProps = {
//     preferences,
//     bookingStatus,
//     renderStepperActionGroup: this.renderStepperActionGroup,
//     updateBookingStatus: this.updateBookingStatus,
//     handleNext: this.handleNext
//   };

//   switch (activeStep) {
//     case BOOKING_STEP_TRIP_INFORMATION:
//       return <BookingStepTripInformation {...commonProps} />;
//     case BOOKING_STEP_ACTIVITIES:
//       return (
//         <BookingStepActivityList {...commonProps} activities={activities} />
//       );
//     case BOOKING_STEP_HOTELS:
//       return this.renderStepUnderConstruction();
//     case BOOKING_STEP_SERVICES:
//       return this.renderStepUnderConstruction();
//     case BOOKING_STEP_CONFIRM:
//       return (
//         <BookingStepContactInformation
//           {...commonProps}
//           handleBookingAdded={this.handleBookingAdded}
//         />
//       );
//     default:
//       throw new Error(`${activeStep} is not a valid booking step`);
//   }
// };

// const BookingView = props => {
// const { data } = useQuery<BookingQuery>(query);
// const classes = useStyles();
// return (
//   <div className={classes.root}>
//     <Paper className={classes.stepper} square>
//       <Stepper
//         stepHelper={stepHelper}
//         activeStep={data.bookingStatus.activeStep}
//       />
//     </Paper>
//     <Paper className={classes.content} square>
//       {renderStepperContent()}
//     </Paper>
//   </div>
// );
// };

// const enhance = flow(
//   withStyles(styles),
//   withRouter,
//   withBooking
// );

const useStyles = makeStyles(({ spacing }: Theme) => ({
  root: {
    minWidth: 240 + 8 * spacing(1)
  },
  stepper: {
    marginBottom: spacing(1)
  },
  content: {
    position: "relative"
  }
}));

const BookingView = () => {
  const classes = useStyles();
  return <div />;
};

export default BookingView;
