import gql from "graphql-tag";

export const BOOKING_STEP_TRIP_INFORMATION = "bookingStepTripInformation";
export const BOOKING_STEP_ACTIVITY_LIST = "bookingStepActivityList";
export const BOOKING_STEP_HOTEL_LIST = "bookingStepHotelList";
export const BOOKING_STEP_SERVICE_LIST = "bookingStepServiceList";
export const BOOKING_STEP_CONFIRM = "bookingStepConfirm";
export const BOOKING_STEP_LIST = [
  BOOKING_STEP_TRIP_INFORMATION,
  BOOKING_STEP_ACTIVITY_LIST,
  BOOKING_STEP_HOTEL_LIST,
  BOOKING_STEP_SERVICE_LIST,
  BOOKING_STEP_CONFIRM
];

export const defaults = {
  bookingStatus: {
    __typename: "BookingStatus",
    activeStep: BOOKING_STEP_TRIP_INFORMATION,
    fromDateString: "2018-09-01",
    toDateString: "2018-09-10",
    personCount: 1,
    dateActivitySelected: null,
    dateActivityList: [],
    email: null,
    phone: null
  },
  preferenceList: {
    __typename: "PreferenceList",
    language: "en",
    currency: "eur"
  }
};

export const typeDefs = `
  enum BookingStep {
    ${BOOKING_STEP_LIST.join("\n")}
  }

  type BookingStatus {
    activeStep: BookingStep!
    fromDateString: String
    toDateString: String
    personCount: Int!
    email: String
    phone: String
    dateActivitySelected: String
    dateActivityList: [DateItem]!
  }

  type DateItem {
    dateString: String!
    name: String!
  }

  type PreferenceList {
    language: String!
    currency: String!
  }

  type Query {
    bookingStatus: BookingStatus!
  }

  type Mutation {
    addDateActivity(activityName: String!): DateItem
  }
`;

const GET_DATE_ACTIVITY_LIST = gql`
  query GetDateActivityList {
    bookingStatus @client {
      dateActivitySelected
      dateActivityList {
        dateString
        name
      }
    }
  }
`;

export const resolvers = {
  Mutation: {
    addDateActivity: (_, { name }, { cache }) => {
      const { bookingStatus } = cache.readQuery({
        query: GET_DATE_ACTIVITY_LIST
      });
      if (!bookingStatus.dateActivitySelected) {
        throw new Error("Adding activity to unspecified date");
      }

      const newDateActivity = {
        __typename: "DateItem",
        dateString: bookingStatus.dateActivitySelected,
        name
      };
      const data = {
        bookingStatus: {
          ...bookingStatus,
          dateActivityList: bookingStatus.dateActivityList.concat([
            newDateActivity
          ])
        }
      };
      cache.writeData({ data });
      return newDateActivity;
    }
  }
};
