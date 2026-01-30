import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import Dashboard from "./routes/Dashboard.jsx";
import Advisories from "./routes/Advisories.jsx";
import Weather from "./routes/Weather.jsx";
import Crops from "./routes/Crops.jsx";
import PestDetection from "./routes/PestDetection.jsx";
import Forum from "./routes/Forum.jsx";
import Settings from "./routes/Settings.jsx";
import NotFound from "./routes/NotFound.jsx";

// ? Main Application Component with routing
function App() {
  return (
    <>
      <Router
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true,
        }}
      >
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/A" element={<Dashboard />} />
            <Route path="/advisories" element={<Advisories />} />
            <Route path="/weather" element={<Weather />} />
            <Route path="/crops" element={<Crops />} />
            <Route path="/pest-detection" element={<PestDetection />} />
            <Route path="/forum" element={<Forum />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </Router>
    </>
  );
}

export default App;
