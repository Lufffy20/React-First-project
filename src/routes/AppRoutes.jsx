import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import App from "../App";
import LoginPage from "../pages/login/LoginPage";
import SignupPage from "../pages/signup/SignupPage";
import ForgotPasswordPage from "../pages/forgotpassword/ForgotPasswordPage";
import UserList from "../pages/signup/UserList";
import Dashboard from "../pages/home/dashboard";
import NotFoundPage from "../components/login/NotFoundPage";
import AllToursDetails from "../pages/alltoursdetails/alltoursdetails";
import TourDetail from "../pages/tourdetailforone/tourdetail";
import ResetPasswordPage from "../pages/resetpassword/ResetPasswordPage";
import AdminLayout from "../pages/admin/AdminLayout";
import AdminHome from "../pages/admin/AdminHome";
import AdminUsers from "../pages/admin/AdminUsers";
import AdminTours from "../pages/admin/tours/AdminTours";
import AddTour from "../pages/admin/tours/AddTour";
import EditTour from "../pages/admin/tours/EditTour";
import AdminTourDetails from "../pages/admin/tours/AdminTourDetails";
import ManageInclusions from "../pages/admin/inclusions/ManageInclusions";
import ManageExclusions from "../pages/admin/exclusions/ManageExclusions";
import ManageFAQs from "../pages/admin/faq/ManageFAQs";
import ManageItineraries from "../pages/admin/itineraries/ManageItineraries";
import ManageGallery from "../pages/admin/gallery/ManageGallery";
import ManageReviews from "../pages/admin/reviews/ManageReviews";
import ProtectedRoute from "../components/common/ProtectedRoute";
import CheckoutPage from "../pages/checkout/CheckoutPage";
import ThankYouPage from "../pages/thankyou/ThankYouPage";
import FavoritesPage from "../pages/favorites/FavoritesPage";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFavorites } from "../redux/favorites/favoritesSlice";

function AppRoutes() {
    const dispatch = useDispatch();
    const { isAuthenticated } = useSelector((state) => state.auth);

    useEffect(() => {
        if (isAuthenticated) {
            dispatch(fetchFavorites());
        }
    }, [isAuthenticated, dispatch]);

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                <Route path="/user-list" element={<ProtectedRoute><UserList /></ProtectedRoute>} />

                {/* Protected Dashboard Routes */}
                <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />

                {/* Protected Admin Routes with Nested Layout */}
                <Route path="/admin" element={<ProtectedRoute adminOnly={true}><AdminLayout /></ProtectedRoute>}>
                    <Route index element={<Navigate to="/admin/dashboard" replace />} />
                    <Route path="dashboard" element={<AdminHome />} />
                    <Route path="users" element={<AdminUsers />} />
                    <Route path="tours" element={<AdminTours />} />
                    <Route path="tours/add" element={<AddTour />} />
                    <Route path="tours/edit/:id" element={<EditTour />} />
                    <Route path="tours/view/:id" element={<AdminTourDetails />} />
                    <Route path="inclusions" element={<ManageInclusions />} />
                    <Route path="exclusions" element={<ManageExclusions />} />
                    <Route path="faqs" element={<ManageFAQs />} />
                    <Route path="itinerary" element={<ManageItineraries />} />
                    <Route path="gallery" element={<ManageGallery />} />
                    <Route path="reviews" element={<ManageReviews />} />
                    {/* Future Admin Pages: settings */}
                </Route>

                <Route path="*" element={<NotFoundPage />} />
                <Route path="/all-tours-details" element={<ProtectedRoute><AllToursDetails /></ProtectedRoute>} />
                <Route path="/tour-detail/:id" element={<ProtectedRoute><TourDetail /></ProtectedRoute>} />
                <Route path="/checkout" element={<ProtectedRoute><CheckoutPage /></ProtectedRoute>} />
                <Route path="/thank-you" element={<ProtectedRoute><ThankYouPage /></ProtectedRoute>} />
                <Route path="/favorites" element={<ProtectedRoute><FavoritesPage /></ProtectedRoute>} />
                <Route path="/reset-password" element={<ResetPasswordPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default AppRoutes;