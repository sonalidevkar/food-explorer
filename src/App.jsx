import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Foods from "./pages/Foods";
import Favorites from "./pages/Favorites";
import Feedback from "./pages/Feedback";

function App() {
  return (
    <BrowserRouter basename="/food-explorer">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/foods" element={<Foods />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/feedback" element={<Feedback />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;