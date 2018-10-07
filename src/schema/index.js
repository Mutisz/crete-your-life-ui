import Mutation from "./Mutation";

import { CURRENCIES, EUR } from "../config/consts/currencyConsts";

export const BOOKING_STEP_TRIP_INFORMATION = "bookingStepTripInformation";
export const BOOKING_STEP_ACTIVITIES = "bookingStepActivities";
export const BOOKING_STEP_HOTELS = "bookingStepHotels";
export const BOOKING_STEP_SERVICES = "bookingStepServices";
export const BOOKING_STEP_CONFIRM = "bookingStepConfirm";
export const BOOKING_STEPS = [
  BOOKING_STEP_TRIP_INFORMATION,
  BOOKING_STEP_ACTIVITIES,
  BOOKING_STEP_HOTELS,
  BOOKING_STEP_SERVICES,
  BOOKING_STEP_CONFIRM
];

export const defaults = {
  bookingStatus: {
    __typename: "BookingStatus",
    activeStep: BOOKING_STEP_TRIP_INFORMATION,
    fromDateString: null,
    toDateString: null,
    personCount: 1,
    email: null,
    phone: null,
    dateActivitySelected: null,
    dateActivities: []
  },
  preferences: {
    __typename: "Preferences",
    currency: {
      __typename: "Currency",
      code: EUR,
      rate: 1.0
    }
  }
};

export const typeDefs = `
  enum BookingStep {
    ${BOOKING_STEPS.join("\n")}
  }

  enum CurrencyCode {
    ${CURRENCIES.join("\n")}
  }

  type BookingStatus {
    activeStep: BookingStep!
    fromDateString: String
    toDateString: String
    personCount: Int!
    email: String
    phone: String
    dateActivitySelected: String
    dateActivities: [DateActivity]!
  }

  type DateActivity {
    dateString: String!
    name: String!
  }

  type Currency {
    code: CurrencyCode!
    rate: Float!
  }

  type Preferences {
    currency: Currency!
  }

  type Query {
    bookingStatus: BookingStatus!
  }

  type Mutation {
    updateSelectedDateActivity(activityName: String!): [DateActivity]
  }
`;

export const resolvers = {
  Mutation
};
