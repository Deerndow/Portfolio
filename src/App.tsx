import { Routes, Route } from "react-router-dom";
import { LoadingProvider } from "./context/Loading";
import Home from "./pages/Home";
import Page from "./pages/Page";

export default function App() {
  return (
    <LoadingProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<Page title="about" />} />
        <Route path="/works" element={<Page title="works" />} />
        <Route path="/play" element={<Page title="play" />} />
        <Route path="/connect" element={<Page title="connect" />} />
      </Routes>
    </LoadingProvider>
  );
}
