import { toDate, format, eachDayOfInterval } from "date-fns";
import { createI18nDateLocale } from "../config/createI18nDate";
import {
  DATE_FORMAT,
  DATE_FORMAT_SHORT,
  DATE_FORMAT_ISO
} from "../config/consts/dateConsts";

export const formatDate = (date, language) =>
  format(date, DATE_FORMAT, { locale: createI18nDateLocale(language) });

export const formatDateShort = (date, language) =>
  format(date, DATE_FORMAT_SHORT, { locale: createI18nDateLocale(language) });

export const formatDateIso = date => format(date, DATE_FORMAT_ISO);

export const getDateFromString = dateString =>
  dateString ? toDate(dateString) : null;

export const getStringFromDate = date => (date ? formatDateIso(date) : null);

export const getDates = (fromDate, toDate) =>
  eachDayOfInterval({
    start: fromDate,
    end: toDate
  });
