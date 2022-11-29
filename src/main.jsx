import React from "react";
import { AuthContext } from "./authContext";
import { Routes, Route, Navigate } from "react-router-dom";
import SnackBar from "./components/SnackBar";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import AdminLoginPage from "./pages/AdminLoginPage";
import NotFoundPage from "./pages/NotFoundPage";
	import { DndProvider } from 'react-dnd';
  import { HTML5Backend } from 'react-dnd-html5-backend';

  function renderRoutes(role) {
    switch (role) {
      case 'admin':
        return (
          <Routes>
            <Route
              path='/admin/dashboard'
              element={<AdminDashboardPage />}
            ></Route>
          </Routes>
        );

      default:
        return (
          <Routes>
            <Route exact path='/' element={<AdminDashboardPage />}></Route>
            <Route
              exact
              path='/admin/login'
              element={<AdminLoginPage />}
            ></Route>
            <Route path='*' exact element={<NotFoundPage />}></Route>
          </Routes>
        );
    }
  }

  function Main() {
    const { state } = React.useContext(AuthContext);

    return (
      <div>
        {renderRoutes()}
        <SnackBar />
      </div>
    );
  }

  export default Main;

  

  export function moveKnight(toX, toY) {}