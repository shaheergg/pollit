import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Private } from "./routes/Private";
import Dashboard from "./pages/Dashboard";
import { Public } from "./routes/Public";
import Login from "./pages/Login";
import LandingPage from "./pages/LandingPage";
import Register from "./pages/Register";
import { Toaster } from "sonner";
function App() {
  return (
    <>
      <div>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/" element={<Private />}>
            <Route path="dashboard" element={<Dashboard />} />
          </Route>
          <Route path="/" element={<Public />}>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Route>
        </Routes>
        <Toaster />
      </div>
    </>
  );
}

export default App;
