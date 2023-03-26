import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";


import ImageUpload from "./components/ImageUpload";
import BasicNavbar from "./components/Navbar";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <BasicNavbar />
      </header>
      <div className="content container-fluid">
        <ImageUpload />
      </div>
    </div>
  );
}

export default App;
