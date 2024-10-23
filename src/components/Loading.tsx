import { Box, CardMedia, Typography } from "@mui/material";
import LoadingGif from "../assets/loading.gif";

const Loading = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "60vh",
      }}
    >
      <CardMedia
        component="img"
        src={LoadingGif}
        sx={{ width: { xs: "200px", sm: "350px" } }}
      />
      <Typography sx={{ fontSize: "2rem" }}>Loading...</Typography>
    </Box>
  );
};

export default Loading;
