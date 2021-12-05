import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Home } from "./components/home/Home";
import { LidersBoards } from "./components/LiderBoards";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/records" element={<LidersBoards />} />
      </Routes>
    </div>
  );
}

export default App;
