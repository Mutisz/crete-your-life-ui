import gql from "graphql-tag";

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
    dateActivitySelected: null,
    dateActivities: [],
    email: null,
    phone: null
  }
};

export const typeDefs = `
  enum BookingStep {
    ${BOOKING_STEPS.join("\n")}
  }

  type BookingStatus {
    activeStep: BookingStep!
    fromDateString: String
    toDateString: String
    personCount: Int!
    email: String
    phone: String
    dateActivitySelected: String
    dateActivities: [DateItem]!
  }

  type DateItem {
    dateString: String!
    name: String!
  }

  type Query {
    bookingStatus: BookingStatus!
  }

  type Mutation {
    addDateActivity(activityName: String!): DateItem
  }
`;

const GET_DATE_ACTIVITIES = gql`
  {
    bookingStatus @client {
      dateActivitySelected
      dateActivities {
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
        query: GET_DATE_ACTIVITIES
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
          dateActivities: bookingStatus.dateActivities.concat([newDateActivity])
        }
      };
      cache.writeData({ data });
      return newDateActivity;
    }
  }
};
