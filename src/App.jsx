import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { CssBaseline } from "@mui/material";

import NavigationBar from "./components/Fragments/NavigationBar";
import Footer from "./components/Fragments/Footer/index.jsx";

import { AdminProtected, AuthProtected, OrderProtected, RoleProtected } from "./utils/RouteProtected";

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
import AdminDashboardPage from "./pages/Admin/AdminDashboardPage";
import AdminUserPage from "./pages/Admin/AdminUserPage";
import AdminOrderPage from "./pages/Admin/AdminOrderPage";
import AdminCarsPage from "./pages/Admin/AdminCarsPage";
import AdminEditCarsPage from "./pages/Admin/AdminEditCarsPage";
import AdminAddCarsPage from "./pages/Admin/AdminAddCarsPage";
import AdminMessagePage from "./pages/Admin/AdminMessagePage";
import InfoPage from "./pages/InfoPage";

const App = () => {
  let role = "";

  try {
    role = JSON.parse(sessionStorage.getItem("auth")).role;
  } catch {
    role = "";
  }

  return (
    <>
      <CssBaseline>
        <Router>
          {role !== "admin" && <NavigationBar />}
          <Routes>
            <Route element={<RoleProtected />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/cars" element={<CarsPage />} />
              <Route path="/contact" element={<ContactPage />} />

              <Route element={<OrderProtected />}>
                <Route path="/detail/:id" element={<DetailPage />} />
                <Route path="/info/:id" element={<InfoPage />} />
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

            <Route element={<AdminProtected />}>
              <Route path="/admin" element={<AdminDashboardPage />} />
              <Route path="/admin/users" element={<AdminUserPage />} />
              <Route path="/admin/order" element={<AdminOrderPage />} />
              <Route path="/admin/cars" element={<AdminCarsPage />} />
              <Route path="/admin/cars/:id" element={<AdminEditCarsPage />} />
              <Route path="/admin/cars/add" element={<AdminAddCarsPage />} />
              <Route path="/admin/message" element={<AdminMessagePage />} />
            </Route>

            <Route path="*" element={<NotFoundPages />} />
          </Routes>
          {role !== "admin" && <Footer />}
        </Router>
      </CssBaseline>
    </>
  );
};

export default App;
