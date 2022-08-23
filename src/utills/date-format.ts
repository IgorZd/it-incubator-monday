import moment from "moment";

export const getRequiredDateFormat = (
  timeStamp: string | number | Date,
  format = "MM-DD-YYYY"
) => {
  return moment(timeStamp).format(format);
};
