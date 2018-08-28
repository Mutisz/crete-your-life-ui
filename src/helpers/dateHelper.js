import { format, eachDayOfInterval } from "date-fns";
import {
  DATE_FORMAT,
  DATE_FORMAT_SHORT,
  createI18nDateLocale
} from "../config/createI18nDate";

export const formatDate = (date, language) =>
  format(date, DATE_FORMAT, { locale: createI18nDateLocale(language) });

export const formatDateShort = (date, language) =>
  format(date, DATE_FORMAT_SHORT, { locale: createI18nDateLocale(language) });

export const getDateFromString = dateString =>
  dateString ? new Date(dateString) : null;

export const getStringFromDate = date => (date ? date.toISOString() : null);

export const getDateList = (fromDate, toDate) =>
  eachDayOfInterval({
    start: fromDate,
    end: toDate
  });
