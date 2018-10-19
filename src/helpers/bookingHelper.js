import { compareAsc, compareDesc } from "date-fns";
import { curry, curryRight, get, find, filter, flow } from "lodash";

export const PLACEHOLDER_URL = "/images/placeholder.png";

export const sort = curryRight((items, field, sortFn) =>
  [...items].sort((item1, item2) =>
    sortFn(get(item1, field), get(item2, field))
  )
);

export const sortByDateAsc = sort("dateString", compareAsc);

export const sortByDateDesc = sort("dateString", compareDesc);

export const findItem = (dateString, dateItems, items) => {
  const dateItem = find(dateItems, ["dateString", dateString]);
  return dateItem ? find(items, ["name", dateItem.name]) : null;
};

export const findItemTranslation = (item, language) =>
  find(item.translations, ["language", language]) || item;

export const findItemThumbnailUrl = item =>
  get(find(item.images, image => Boolean(image.isThumbnail)), "url") ||
  PLACEHOLDER_URL;

export const findDateOccupancy = (
  dateActivitySelected,
  bookingDatesOccupancy
) =>
  dateActivitySelected
    ? find(bookingDatesOccupancy, ["date", dateActivitySelected])
    : null;

export const filterActivitiesOccupied = curry(
  (personCount, dateActivitySelected, bookingDatesOccupancy, activities) => {
    const dateOccupancy = findDateOccupancy(
      dateActivitySelected,
      bookingDatesOccupancy
    );
    if (!dateOccupancy) {
      return activities;
    }

    const occupiedName = get(dateOccupancy, ["activity", "name"]);
    const occupiedPersonCount = get(dateOccupancy, "personCount");
    const dateOccupancyActivity = find(activities, ["name", occupiedName]);
    const personCountAfterBooking = occupiedPersonCount + personCount;
    const maxPersonCount = get(dateOccupancyActivity, "maxPersonCount");
    if (personCountAfterBooking > maxPersonCount) {
      return [];
    } else {
      return [dateOccupancyActivity];
    }
  }
);

export const filterActivitiesWithExceededPersonCount = curry(
  (personCount, activities) =>
    filter(
      activities,
      activity => personCount <= get(activity, "maxPersonCount")
    )
);

export const getActivitiesAvailable = ({
  bookingStatus: { personCount, dateActivitySelected },
  data: { bookingDatesOccupancy },
  activities
}) =>
  flow(
    filterActivitiesOccupied(
      personCount,
      dateActivitySelected,
      bookingDatesOccupancy
    ),
    filterActivitiesWithExceededPersonCount(personCount)
  )(activities);

export const getActivitiesMessageKeys = ({
  bookingStatus: { personCount, dateActivitySelected },
  data: { bookingDatesOccupancy },
  activities
}) => {
  const activitiesNotOccupied = filterActivitiesOccupied(
    personCount,
    dateActivitySelected,
    bookingDatesOccupancy,
    activities
  );
  const activitiesWithExceededPersonCount = filterActivitiesWithExceededPersonCount(
    personCount,
    activitiesNotOccupied
  );

  const fullyOccupied = activitiesNotOccupied.length === 0;
  const partiallyOccupied =
    !fullyOccupied && activitiesNotOccupied.length < activities.length;
  const allWithExceededPersonCount =
    !fullyOccupied && activitiesWithExceededPersonCount.length === 0;
  const someWithExceededPersonCount =
    !fullyOccupied &&
    !allWithExceededPersonCount &&
    activitiesWithExceededPersonCount.length < activitiesNotOccupied.length;

  return [
    ...(fullyOccupied ? ["messageDateFullyOccupied"] : []),
    ...(partiallyOccupied ? ["messageDatePartiallyOccupied"] : []),
    ...(allWithExceededPersonCount
      ? ["messageDateAllWithExceededPersonCount"]
      : []),
    ...(someWithExceededPersonCount
      ? ["messageDateSomeWithExceededPersonCount"]
      : [])
  ];
};

export const getRemainingPersonCount = ({
  bookingStatus: { dateActivitySelected },
  data: { bookingDatesOccupancy },
  activities
}) => {
  const dateOccupancy = findDateOccupancy(
    dateActivitySelected,
    bookingDatesOccupancy
  );
  if (!dateOccupancy) {
    return null;
  }

  const occupiedName = get(dateOccupancy, ["activity", "name"]);
  const occupiedPersonCount = get(dateOccupancy, "personCount");
  const dateOccupancyActivity = find(activities, ["name", occupiedName]);
  const maxPersonCount = get(dateOccupancyActivity, "maxPersonCount");

  return Math.abs(maxPersonCount - occupiedPersonCount);
};
