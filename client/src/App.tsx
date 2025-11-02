import { Route, Routes } from "react-router-dom";
import "./App.css";
import LoginPage from "./pages/login";
import SignupPage from "./pages/signup";
import ChatPage from "./pages/chat";
import AuthLayout from "./layouts/auth";
import AppLayout from "./layouts/app";

function App() {
  return (
    <>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Route>
        <Route element={<AppLayout />}>
          <Route path="/" element={<ChatPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
