import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";


import ImageUpload from "./components/ImageUpload";
import BasicNavbar from "./components/Navbar";
import { View} from 'react-native';
import SocialFollow from "./SocialFollow"
import SideNav from "./components/SideNavBar"

function App() {
  return (
    <div className="App">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <SideNav />
          </div>
          <div className="col-md-9">
            <header className="App-header">
              <BasicNavbar />
            </header>
            <div className="content">
              <ImageUpload />
              <View />
              <SocialFollow />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


export default App;
