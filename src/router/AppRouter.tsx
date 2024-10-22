import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Login from "../pages/Login";

const AppRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
