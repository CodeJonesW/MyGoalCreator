import React from "react";
import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

const DailyTodosCompletionCalendar = () => {
  const { dailyTodosCompletions } = useSelector((state) => state.profileSlice);
  const theme = useTheme();
  const completedDates = new Set(
    dailyTodosCompletions.map((completion) =>
      dayjs(completion.completed_at).format("YYYY-MM-DD")
    )
  );

  const daysInMonth = dayjs().daysInMonth();
  const currentMonth = dayjs().format("YYYY-MM");

  return (
    <Box sx={{ padding: "24px" }}>
      <Box
        sx={{
          padding: "20px",
          backgroundColor: theme.palette.background.paper,
          borderRadius: "10px",
          width: "300px",
        }}
      >
        <Typography variant="h5">Daily Todos Completion Calendar</Typography>
        <Box
          sx={{ paddingTop: "16px" }}
          display="grid"
          gridTemplateColumns="repeat(auto-fit, minmax(40px, 1fr))"
          gap={2}
        >
          {[...Array(daysInMonth)].map((_, day) => {
            const date = dayjs(`${currentMonth}-${day + 1}`).format(
              "YYYY-MM-DD"
            );
            const isComplete = completedDates.has(date);

            return (
              <Box
                key={date}
                display="flex"
                alignItems="center"
                justifyContent="center"
                width={24}
                height={24}
                borderRadius="50%"
                sx={{ padding: "4px" }}
                bgcolor={
                  isComplete ? "green" : theme.palette.background.default
                }
              >
                <Typography
                  sx={{
                    color: theme.palette.text.primary,
                  }}
                >
                  {day + 1}
                </Typography>
              </Box>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
};

export default DailyTodosCompletionCalendar;
