import { Routes, Route } from "react-router-dom";
import { LoadingProvider } from "./context/Loading";
import Home from "./pages/Home";
import About from "./pages/About";
import Works from "./pages/Works";
import Play from "./pages/Play";
import Connect from "./pages/Connect";
import CursorTrail from "./components/CursorTrail";

export default function App() {
  return (
    <LoadingProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/works" element={<Works />} />
        <Route path="/play" element={<Play />} />
        <Route path="/connect" element={<Connect />} />
      </Routes>
      <CursorTrail />
    </LoadingProvider>
  );
}
