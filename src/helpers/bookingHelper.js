import { compareAsc, compareDesc } from "date-fns";
import { curryRight, get, find, reduce } from "lodash";

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

export const calculateBookingPrice = (personCount, activities, bookingDates) =>
  reduce(
    bookingDates,
    (acc, bookingDate) => {
      const activityName = get(bookingDate, "activity");
      const activity = activityName
        ? find(activities, ["name", activityName])
        : null;
      return acc + get(activity, "pricePerPerson", 0) * personCount;
    },
    0
  );
