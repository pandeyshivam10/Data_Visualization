import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import SideBar from "./components/SideBar";
import { useMyContext } from "./MyContextProvider";
import Layout1 from "./components/Layout1";
import Layout2 from "./components/Layout2";
import Layout3 from "./components/Layout3";

function App() {
  const { data } = useMyContext();
  return (
    <div>
      <div className="flex">
        <SideBar />
        <div className="flex-grow p-4">
          <Router>
            <Routes>
              <Route path="/" element={<Layout1 data = {data}/>} />
              <Route path="/Layout1" element={<Layout1 data = {data}/>} />
              <Route path="/Layout2" element={<Layout2 data = {data}/>} />
              <Route path="/Layout3" element={<Layout3 data = {data}/>} />
            </Routes>
          </Router>
        </div>
      </div>
    </div>
  );
}

export default App;
