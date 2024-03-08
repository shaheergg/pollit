import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Private } from "./routes/Private";
import Dashboard from "./pages/Dashboard";
import { Public } from "./routes/Public";
import Login from "./pages/Login";
function App() {
  return (
    <>
      <div>
        <Routes>
          <Route path="/" element={<Private />}>
            <Route path="dashboard" element={<Dashboard />} />
          </Route>
          <Route path="/" element={<Public />}>
            <Route path="login" element={<Login />} />
          </Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
