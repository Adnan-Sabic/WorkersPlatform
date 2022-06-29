import React from "react";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import AdvertisementInfoPage from "../pages/AdvertisementInfoPage/AdvertisementInfoPage";
import AdvertisementPage from "../pages/AdvertisementPage/AdvertisementPage";
import HomePage from "../pages/HomePage/HomePage";
import ProfilePage from "../pages/ProfilePage/ProfilePage";
import UserInfoPage from "../pages/UserInfoPage/UserInfoPage";
import ProtectedRoute from "./ProtectedRoute";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="home" element={<HomePage />} />
        <Route path="advertisementInfo" element={<AdvertisementInfoPage />} />
        <Route path="userInfo" element={<UserInfoPage />} />
        <Route element={<ProtectedRoute />}>
          <Route path="profile" element={<ProfilePage />} />
          <Route path="advertisement" element={<AdvertisementPage />} />
        </Route>
        <Route path="*" element={<p>There's nothing here: 404!</p>} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
