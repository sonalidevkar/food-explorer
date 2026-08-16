import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/home";
import Foods from "./pages/Foods";
import FoodDetails from "./pages/FoodDetails";
import Favorites from "./pages/Favorites";
import Feedback from "./pages/Feedback";

import Navbar from "./components/Navbar";
import RouteFocus from "./components/RouteFocus";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <RouteFocus />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/foods" element={<Foods />} />
        <Route path="/food/:id" element={<FoodDetails />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/feedback" element={<Feedback />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;