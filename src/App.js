import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom'
import Dashboard from './components/Dashboard'
import Login from './pages/Login'
import Register from './pages/Register'
import { ProtectedRoute } from './components/ProtectedRoute'

function App () {
  return (
    <div className="App">
      {/* Dynamically render a component using Switch */}
      <Routes>
        <Route path="/" element={ <Navigate to="/dashboard" /> }/>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

      </Routes>
    </div>
  )
}

export default App;



// import "./App.css";
// import "bootstrap/dist/css/bootstrap.min.css";
// import ImageUpload from "./components/ImageUpload";
// import BasicNavbar from "./components/Navbar";
// import { View} from 'react-native';
// import SocialFollow from "./SocialFollow"
// import SideNav from "./components/SideNavBar"

// function App() {
//   return (
//     <div className="App">
//       <div className="container-fluid">
//         <div className="row">
//           <div className="col-md-3">
//             <SideNav />
//           </div>
//           <div className="col-md-9">
//             <header className="App-header">
//               <BasicNavbar />
//             </header>
//             <div className="content">
//               <ImageUpload />
//               <View />
//               <SocialFollow />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
