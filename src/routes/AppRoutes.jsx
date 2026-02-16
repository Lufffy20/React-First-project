import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "../App";
import LoginPage from "../pages/login/LoginPage";
import SignupPage from "../pages/signup/SignupPage";
import ForgotPasswordPage from "../pages/forgotpassword/ForgotPasswordPage";
import UserList from "../pages/signup/UserList";
import Dashboard from "../pages/home/dashboard";

function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                <Route path="/user-list" element={<UserList />} />
                <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
        </BrowserRouter>
    );
}

export default AppRoutes;
