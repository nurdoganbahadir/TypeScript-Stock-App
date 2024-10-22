import { Alert, Stack } from "@mui/material";

export const NoDataMessage = () => {
  return (
    <Stack sx={{ width: "100%" }} spacing={2}>
      <Alert severity="warning">No data was found on this page.</Alert>
    </Stack>
  );
};
