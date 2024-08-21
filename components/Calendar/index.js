import * as React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";

export default function Calendar() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateCalendar
        views={["day"]}
        sx={{
          margin: "1rem auto",
          backgroundColor: "var(--light-orange)",
          borderRadius: "1.5rem",
          width: "85vw",
          maxWidth: "1000px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
          color: "var(--dark-brown)",

          "& .MuiPickersDay-root": {
            fontFamily: "Koulen",
            fontSize: "1.25rem",
            color: "var(--dark-orange)",
            "&.Mui-selected": {
              backgroundColor: "var(--dark-brown)",
              color: "white",
              borderRadius: "0.75rem",
            },
            "&.MuiPickersDay-today": {
              border: "2px solid var(--dark-brown)",
              borderRadius: "0.75rem",
            },
          },

          "& .MuiPickersCalendarHeader-label": {
            fontFamily: "Koulen",
            fontSize: "1.5rem",
            color: "var(--dark-brown)",
          },

          "& .MuiDayCalendar-weekDayLabel": {
            fontFamily: "Koulen",
            fontSize: "1.25rem",
            color: "var(--dark-orange)",
          },

          "& .MuiPickersArrowSwitcher-button": {
            color: "var(--dark-brown)",
          },

          "& .MuiPickersCalendarHeader-iconButton": {
            color: "var(--dark-brown)",
          },
        }}
      />
    </LocalizationProvider>
  );
}
