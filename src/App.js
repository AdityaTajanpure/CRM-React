import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Loading from "./pages/loading/Loading";
import Login from "./pages/onboarding/components/Login";
import ForgotPassword from "./pages/onboarding/components/ForgotPassword";
import SignUp from "./pages/onboarding/components/SignUp";
import SetPassword from "./pages/onboarding/components/SetPassword";
import Dashboard from "./pages/dashboard/Dashboard";
import VerifyEmail from "./pages/onboarding/components/VerifyEmail";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={localStorage.getItem("token") ? <Dashboard /> : <Login />}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/updatePassword/:token" element={<SetPassword />} />
        <Route path="/verifyEmail/:token" element={<VerifyEmail />} />
        <Route path="/loading" element={<Loading />} />
        <Route
          path="*"
          exact={true}
          element={localStorage.getItem("token") ? <Dashboard /> : <Login />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
