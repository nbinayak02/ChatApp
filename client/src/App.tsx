import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import LoginPage from "./pages/login";
import SignupPage from "./pages/signup";
import ChatPage from "./pages/chat";
import AuthLayout from "./layouts/auth";
import AppLayout from "./layouts/app";
import { useAuth } from "./contexts/auth";
import AdminLogin from "./pages/admin-login";
import Admin from "./pages/admin";
import Profile from "./pages/profile";

function App() {
  const { token } = useAuth();

  return (
    <>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<Admin />} />
        </Route>
        <Route
          element={
            token ? <AppLayout /> : <Navigate to={"/login"} replace={true} />
          }
        >
          <Route path="/" element={<ChatPage />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/profile/*" element={<Profile />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
