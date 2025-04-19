import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Navbar from "../components/Navbar";
import Home from "./pages/Home";
import Students from "./pages/Students";
import StudentDetail from "./pages/StudentDetail";
import Homeworks from "./pages/Homeworks";
import HomeworkDetail from "./pages/HomeworkDetail";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/students" element={<Students />} />
            <Route path="/students/:id" element={<StudentDetail />} />
            <Route path="/homeworks" element={<Homeworks />} />
            <Route path="/homeworks/:id" element={<HomeworkDetail />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
