import React from "react";
import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import { motion } from "framer-motion";

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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <Box sx={{ padding: "24px" }}>
        <Box
          sx={{
            padding: "20px",
            backgroundColor: theme.palette.background.paper,
            borderRadius: "10px",
            width: "300px",
            height: "auto",
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
    </motion.div>
  );
};

export default DailyTodosCompletionCalendar;
