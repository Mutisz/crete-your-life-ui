import moment from "moment";
import {
  DATE_FORMAT,
  DATE_FORMAT_SHORT,
  DATE_FORMAT_ISO
} from "../config/consts/dateConsts";

export const formatDate = date => moment(date).format(DATE_FORMAT);

export const formatDateShort = date => moment(date).format(DATE_FORMAT_SHORT);

export const formatDateIso = date => moment(date).format(DATE_FORMAT_ISO);

export const getDateFromString = dateString =>
  dateString ? moment(dateString).toDate(dateString) : null;

export const getStringFromDate = date => (date ? formatDateIso(date) : null);

export const getDates = (fromDate, toDate) => {
  var days = [];
  var fromMoment = moment(fromDate);
  var toMoment = moment(toDate);
  if (fromMoment.isAfter(toMoment)) {
    throw new Error("Trying to get dates between invalid dates");
  }

  do {
    days.push(fromMoment.toDate());
    fromMoment = fromMoment.add(1, "day");
  } while (!fromMoment.isAfter(toMoment));

  return days;
};
