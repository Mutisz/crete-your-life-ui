import gql from "graphql-tag";
import { get, findIndex, update, concat, set } from "lodash";

const GET_BOOKING_STATUS_QUERY = gql`
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

const createEmptyDateItem = dateString => ({
  __typename: "DateActivity",
  dateString: dateString
});

const getBookingStatus = cache =>
  cache.readQuery({
    query: GET_BOOKING_STATUS_QUERY
  });

const getDateItemsUpdated = (updater, dateItemSelected, dateItems) => {
  const existingItemIndex = findIndex(dateItems, [
    "dateString",
    dateItemSelected
  ]);

  if (existingItemIndex >= 0) {
    return update(dateItems, existingItemIndex, updater);
  } else {
    const emptyDateItem = createEmptyDateItem(dateItemSelected);
    return concat(dateItems, updater(emptyDateItem));
  }
};

const getDateItemsPayload = (dateItemsIndex, dateItems) => ({
  data: {
    bookingStatus: {
      __typename: "BookingStatus",
      [dateItemsIndex]: dateItems
    }
  }
});

const Mutation = {
  updateSelectedDateActivity: (_, { name }, { cache }) => {
    const { bookingStatus } = getBookingStatus(cache);
    const dateItemsUpdated = getDateItemsUpdated(
      dateItem => set(dateItem, "name", name),
      get(bookingStatus, "dateActivitySelected", null),
      get(bookingStatus, "dateActivities", [])
    );

    const payload = getDateItemsPayload("dateActivities", dateItemsUpdated);
    cache.writeData(payload);

    return dateItemsUpdated;
  }
};

export default Mutation;
