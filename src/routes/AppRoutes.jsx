import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "../App";
import LoginPage from "../pages/login/LoginPage";
import SignupPage from "../pages/signup/SignupPage";
import ForgotPasswordPage from "../pages/forgotpassword/ForgotPasswordPage";
import UserList from "../pages/signup/UserList";
import Dashboard from "../pages/home/dashboard";
import NotFoundPage from "../components/login/NotFoundPage";
import AllToursDetails from "../pages/alltoursdetails/alltoursdetails";
import AddTour from "../pages/addtour/AddTour";
import TourDetail from "../pages/tourdetailforone/tourdetail";

function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                <Route path="/user-list" element={<UserList />} />
                <Route path="/" element={<Dashboard />} />
                <Route path="/dashboard" element={<Dashboard />} />
                {/* 404 Route */}
                <Route path="*" element={<NotFoundPage />} />
                <Route path="/all-tours-details" element={<AllToursDetails />} />
                <Route path="/add-tour" element={<AddTour />} />
                <Route path="/tour-detail/:id" element={<TourDetail />} />
            </Routes>
        </BrowserRouter>
    );
}

export default AppRoutes;