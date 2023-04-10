import React from 'react';
import {Nav} from 'react-bootstrap';
import logo from './images/logo.jpg';
const SideNav = () => {
    // Currently they don't link to anything
    return (
        <div className="sidebar">
            <br/>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <img src={logo} alt="Logo" style={{ height: '30px', width: 'auto', borderRadius: "30%", marginRight: "5px", marginBottom: "4px" }}/>
                <h3 className="sidebar-link">  ChurroFlow</h3>
            </div>
            
            
            <Nav defaultActiveKey="/" className="flex-column">
                <br/>
                <Nav.Link href="/" className="sidebar-link">Dashboard</Nav.Link>
                <Nav.Link href="/" className="sidebar-link">Warehouse Planning</Nav.Link>
                <Nav.Link href="/" className="sidebar-link">Warehouse Analytics</Nav.Link>
                <Nav.Link href="/" className="sidebar-link">Inventory Actions</Nav.Link>
                <div style={{ position: 'absolute', bottom: '0', left: '0', right: '0', padding: '1rem' }}>
                    <Nav.Link href="/">Inventory Data Manager </Nav.Link>
                </div>
            </Nav>
        </div>
    );
};
  
export default SideNav;