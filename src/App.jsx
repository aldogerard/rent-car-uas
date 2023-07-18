import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { CssBaseline } from "@mui/material";

import NavigationBar from "./components/Fragments/NavigationBar";

import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

import { AuthProtected } from "./utils/authProtected";

const App = () => {
  return (
    <>
      <CssBaseline>
        <Router>
          <NavigationBar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />

            <Route element={<AuthProtected />}>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
            </Route>
          </Routes>
        </Router>
      </CssBaseline>
    </>
  );
};

export default App;
