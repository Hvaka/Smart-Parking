
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Entry from "./pages/Entry";
import Active from "./pages/Active";
import Records from "./pages/Records";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/entry" element={<Entry />} />
        <Route path="/active" element={<Active />} />
        <Route path="/records" element={<Records />} />
      </Routes>
    </BrowserRouter>
  );
}
