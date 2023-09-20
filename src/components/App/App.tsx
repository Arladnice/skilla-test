import React from "react";
import Sidebar from "./../Sidebar/Sidebar";
import Header from "../Header/Header";
import "./App.scss";
import Calls from "../Calls/Calls";

const App = () => {
  return (
    <div className="page">
      <Header />
      <Sidebar />
      <Calls />
    </div>
  );
};

export default App;
