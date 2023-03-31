import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";


import ImageUpload from "./components/ImageUpload";
import BasicNavbar from "./components/Navbar";
import { View} from 'react-native';
import SocialFollow from "./SocialFollow"
// import navbar from "./components/navbar"


function App() {
  return (
    <div className="App" style={{backgroundColor: 'lavenderblush'}}>
      <header className="App-header">
        <BasicNavbar />
      </header>
      <div className="content container-fluid">
        <ImageUpload />
        <View>
        </View>
        <SocialFollow />
      </div>
    </div>
    
    
  );
}

export default App;
