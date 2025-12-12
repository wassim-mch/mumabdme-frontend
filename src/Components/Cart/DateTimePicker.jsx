import React, { useState } from "react";

const DateTimePicker = ({ onChange }) => {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const handleChange = () => {
    onChange(date && time); // active si date ET heure choisies
  };

  return (
    <div className="datetime-picker d-flex align-items-center gap-3 justify-content-center justify-content-md-start mb-4">
      <input
        type="date"
        className="form-control"
        value={date}
        onChange={(e) => {
          setDate(e.target.value);
          handleChange();
        }}
        placeholder="Choisir la date"
      />
      <input
        type="time"
        className="form-control"
        value={time}
        onChange={(e) => {
          setTime(e.target.value);
          handleChange();
        }}
        placeholder="Choisir l'heure"
      />
    </div>
  );
};

export default DateTimePicker;
