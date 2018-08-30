import { compareAsc, compareDesc } from "date-fns";
import { curryRight, get, find } from "lodash";

export const sort = curryRight((itemList, field, sortFn) =>
  [...itemList].sort((item1, item2) =>
    sortFn(get(item1, field), get(item2, field))
  )
);

export const sortByDateAsc = sort("dateString", compareAsc);

export const sortByDateDesc = sort("dateString", compareDesc);

export const findItem = (dateString, dateItemList, itemList) => {
  const dateItem = find(dateItemList, ["dateString", dateString]);
  return dateItem ? find(itemList, ["name", dateItem.name]) : null;
};

export const findItemTranslation = (item, language) =>
  find(item.translationList, ["language", language]) || item;
