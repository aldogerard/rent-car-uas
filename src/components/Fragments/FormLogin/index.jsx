import React from "react";
import { TextField, Button } from "@mui/material";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link } from "react-router-dom";

import { FaCarRear, FaEarthAmericas, FaClock, FaUserLarge } from "react-icons/fa6";

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
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <TextField id="email" label="Email" variant="outlined" type="email" className="w-full" required />
        <TextField id="password" label="Password" variant="outlined" type="password" className="w-full" required />
        <ThemeProvider theme={theme}>
          <Button variant="contained" color="primary" type="submit">
            Login
          </Button>
        </ThemeProvider>
      </form>
    </>
  );
};

export default index;
