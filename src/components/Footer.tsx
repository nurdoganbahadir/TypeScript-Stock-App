import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: "primary.main",
        color: "white",
        height: "70px",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        mt: "2rem",
      }}
    >
      <Box sx={{ textAlign: "center" }}>
        <Typography variant="body1">Developed by Nurdoğan Bahadır</Typography>

        <Typography variant="body1">
          Copyright &copy; {new Date().getFullYear()}
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
