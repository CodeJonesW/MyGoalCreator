import { Box, CircularProgress } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { NavBar } from "./NavBar";

export const Loading = () => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        backgroundColor: theme.palette.primary.main,
      }}
    >
      <NavBar />
      <CircularProgress color="secondary" />
    </Box>
  );
};

export default Loading;
