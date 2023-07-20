import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { CssBaseline } from "@mui/material";

import NavigationBar from "./components/Fragments/NavigationBar";
import Footer from "./components/Fragments/Footer/index.jsx";

import { AuthProtected, OrderProtected, RoleProtected } from "./utils/RouteProtected";

import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DetailPage from "./pages/DetailPage";
import HistoryPage from "./pages/HistoryPage";
import CarsPage from "./pages/CarsPage";
import PaymentPage from "./pages/PaymentPage";
import NotFoundPages from "./pages/_404";
import ContactPage from "./pages/ContactPage";
import ProfilePage from "./pages/ProfilePage";
import EditProfilePage from "./pages/EditProfilePage";

const App = () => {
  return (
    <>
      <CssBaseline>
        <Router>
          <NavigationBar />
          <Routes>
            <Route element={<RoleProtected />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/cars" element={<CarsPage />} />
              <Route path="/contact" element={<ContactPage />} />

              <Route element={<OrderProtected />}>
                <Route path="/detail/:id" element={<DetailPage />} />
                <Route path="/history" element={<HistoryPage />} />
                <Route path="/payment/:id" element={<PaymentPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/profile/edit" element={<EditProfilePage />} />
              </Route>

              <Route element={<AuthProtected />}>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
              </Route>
            </Route>

            <Route path="*" element={<NotFoundPages />} />
          </Routes>
          <Footer />
        </Router>
      </CssBaseline>
    </>
  );
};

export default App;
