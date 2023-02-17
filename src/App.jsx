import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { createTheme, NextUIProvider } from "@nextui-org/react";
import Tabs from "./components/tabs/Tabs";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Signin from "./pages/signin/Signin";
import Detail from "./pages/detail/Detail";
import Favorite from "./pages/favorite/Favorite";
import User from "./pages/user/User";
import "./App.css";

const lightTheme = createTheme({
  type: "light",
  theme: {},
});

const darkTheme = createTheme({
  type: "dark",
  theme: {},
});

function App() {
  const location = useLocation();

  return (
    <NextUIProvider theme={darkTheme}>
      <Routes>
        <Route path="/" element={<Navigate replace to="/login" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/favorite" element={<Favorite />} />
        <Route path="/user" element={<User />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/detail/:id" element={<Detail />} />
      </Routes>
      {location.pathname === "/home" ||
      location.pathname === "/spesa" ||
      location.pathname === "/favorite" ||
      location.pathname === "/user" ? (
        <Tabs />
      ) : (
        null
      )}
    </NextUIProvider>
  );
}

export default App;
