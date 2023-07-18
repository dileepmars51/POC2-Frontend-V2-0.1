import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment/moment";

const DateField = ({ onDateChange, name, formData }) => {
  const userLocale =
    navigator.languages && navigator.languages.length
      ? navigator.languages[0]
      : navigator.language;

  let intVal = parseInt(formData[name]);
  let dateFormat = new Date(intVal);
  dateFormat = moment(dateFormat).format("DD MMM YYYY");

  console.log(formData);

  return (
    <div className="col-6 m-auto">
      <DatePicker
        value={dateFormat === "Invalid date" ? "" : dateFormat}
        name={name}
        showIcon
        placeholderText="Select Date"
        onChange={(date) => onDateChange(date, name)}
      />
    </div>
  );
};

export default DateField;
