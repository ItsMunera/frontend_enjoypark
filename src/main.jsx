import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter, Route, Routes } from "react-router";
import HomePage from "./components/pages/HomePage.jsx";
import EventPage from "./components/pages/EventPage.jsx";
import ContactPage from "./components/pages/ContactPage.jsx";
import RegisterPage from "./components/pages/RegisterPage.jsx";
import LoginPage from "./components/pages/LoginPage.jsx";
import ForgotPassword from "./components/pages/ForgotPassword.jsx";
import SingleEventPage from "./components/pages/SingleEventPage.jsx";
import ProfilePage from "./components/pages/ProfilePage.jsx";
import AxiosProvider from "./components/context/AxiosProvider.jsx";
import UserProvider from "./components/context/UserProvider.jsx";
import CheckoutPage from "./components/pages/CheckoutPage.jsx";
import PaymentSuccessPage from "./components/pages/PaymentSuccessPage.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AxiosProvider>
      <BrowserRouter>
        <UserProvider>
          <Routes>
            <Route path="/" element={<App />}>
              <Route index element={<HomePage />} />

              <Route path="/event" element={<EventPage />} />
              <Route path="/event/:id" element={<SingleEventPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/profile" element={<ProfilePage />} />
            </Route>
            
            
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/payment-success" element={<PaymentSuccessPage />} />
          </Routes>
        </UserProvider>
      </BrowserRouter>
    </AxiosProvider>
  </StrictMode>
);
