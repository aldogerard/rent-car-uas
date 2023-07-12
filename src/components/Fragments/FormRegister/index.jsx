import React from "react";
import { TextField, Button } from "@mui/material";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link } from "react-router-dom";

const index = () => {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#FBBF24",
      },
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(e.target.email.value);
    console.log(e.target.password.value);
    console.log(e.target.confirmPassword.value);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <TextField id="email" label="Email" variant="outlined" className="w-full" required type="email" />
        <TextField id="password" label="Password" type="password" variant="outlined" className="w-full" required />
        <TextField id="confirmPassword" label="Confirm Password" type="password" variant="outlined" className="w-full" required />
        <ThemeProvider theme={theme}>
          <Button variant="contained" color="primary" type="submit">
            Register
          </Button>
        </ThemeProvider>
      </form>
    </>
  );
};

export default index;
