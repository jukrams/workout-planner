import * as React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { DayCalendarSkeleton, PickersDay } from "@mui/x-date-pickers";
import { Badge } from "@mui/material";
import dayjs from "dayjs";
import useSWR from "swr";

function WorkoutDay(props) {
  const { workoutDays = [], day, outsideCurrentMonth, ...other } = props;

  const isWorkoutDay =
    !outsideCurrentMonth &&
    workoutDays.some((workoutDay) => dayjs(workoutDay).isSame(day, "day"));

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
  const { data: progress } = useSWR("/api/progress");

  const [workoutDays, setWorkoutDays] = React.useState([]);

  const today = new Date().toISOString().split("T")[0];
  const initialValue = dayjs(today);

  React.useEffect(() => {
    if (progress && Array.isArray(progress)) {
      const fetchedWorkoutDays = progress.flatMap((item) =>
        item.completedWorkouts.map((workout) => workout.date)
      );

      setWorkoutDays(fetchedWorkoutDays);
    }
  }, [progress]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateCalendar
        defaultValue={initialValue}
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
              "&:focus": {
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
