import * as React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { DayCalendarSkeleton, PickersDay } from "@mui/x-date-pickers";
import { Badge } from "@mui/material";
import dayjs from "dayjs";

// TEST EMOJIS FOR COMPLETED WORKOUT
function getRandomNumber(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function fetchWorkoutDays(date, { signal }) {
  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => {
      const daysInMonth = date.daysInMonth();
      const workoutDays = [1, 2, 15].map(() => getRandomNumber(1, daysInMonth)); // Beispielhafte Tage

      resolve({ workoutDays });
    }, 500);

    signal.onabort = () => {
      clearTimeout(timeout);
      reject(new DOMException("aborted", "AbortError"));
    };
  });
}

const initialValue = dayjs("2024-08-01");

function WorkoutDay(props) {
  const { workoutDays = [], day, outsideCurrentMonth, ...other } = props;

  const isWorkoutDay =
    !outsideCurrentMonth && workoutDays.indexOf(day.date()) >= 0;

  return (
    <Badge
      key={day.toString()}
      overlap="circular"
      badgeContent={isWorkoutDay ? "🏆" : undefined}
    >
      <PickersDay
        {...other}
        outsideCurrentMonth={outsideCurrentMonth}
        day={day}
      />
    </Badge>
  );
}

export default function Calendar() {
  const requestAbortController = React.useRef(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [workoutDays, setWorkoutDays] = React.useState([]);

  const fetchWorkoutDaysForMonth = (date) => {
    const controller = new AbortController();
    fetchWorkoutDays(date, { signal: controller.signal })
      .then(({ workoutDays }) => {
        setWorkoutDays(workoutDays);
        setIsLoading(false);
      })
      .catch((error) => {
        if (error.name !== "AbortError") {
          throw error;
        }
      });

    requestAbortController.current = controller;
  };

  React.useEffect(() => {
    fetchWorkoutDaysForMonth(initialValue);
    return () => requestAbortController.current?.abort();
  }, []);

  const handleMonthChange = (date) => {
    if (requestAbortController.current) {
      requestAbortController.current.abort();
    }

    setIsLoading(true);
    setWorkoutDays([]);
    fetchWorkoutDaysForMonth(date);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateCalendar
        defaultValue={initialValue}
        loading={isLoading}
        onMonthChange={handleMonthChange}
        renderLoading={() => <DayCalendarSkeleton />}
        slots={{
          day: WorkoutDay,
        }}
        slotProps={{
          day: {
            workoutDays,
          },
        }}
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
              "&:hover": {
                backgroundColor: "var(--dark-brown)",
              },
              "&:clicked": {
                backgroundColor: "var(--dark-brown)",
              },
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
