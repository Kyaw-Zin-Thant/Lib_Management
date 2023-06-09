import React, { useState } from "react";
import DatePicker from 'react-datepicker';

const CustomDatePicker = ({field,form,defaultDate}) => {
    const [startDate, setStartDate] = defaultDate ? useState(new Date(defaultDate)): useState(new Date());
  return (
    <div>
      <div className="date-container">
      <DatePicker 
      selected={startDate}
      onChange={(date) =>{
        form.setFieldValue(field.name,date.toISOString().split('T')[0])
        setStartDate(date)
      }}
      dateFormat="MM/yyyy"
      showMonthYearPicker
      showFullMonthYearPicker/>
      </div>
    </div>
  );
};

export default CustomDatePicker;
