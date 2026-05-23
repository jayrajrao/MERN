import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import HomePage from "./pages/HomePage";
import CompanyDetailsPage from "./pages/CompanyDetailsPage";

function App() {
  return (
    <BrowserRouter>

      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route
          path="/company/:id"
          element={<CompanyDetailsPage />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;