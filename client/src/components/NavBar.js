import React, { useEffect } from 'react'
import { useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { Checkbox, Icon, Container, Menu } from 'semantic-ui-react';
import { findObject } from '../utils/tools';
import Logout from "./Logout";

export const NavBar = (props) => {
    useEffect(() =>{
        // console.log('NavBar useEffect', props)
    },[props])
    const { currentUser, isAuthenticated, permissions, role } = useSelector(state => state.auth)

    const checkPermissionByModuleName = (module_name) => {
      const foundObject = findObject(permissions, "module_name", module_name);
      // console.log('-- checkPermissionByModuleName foundObject has_read', foundObject.has_read)
      return foundObject
  }

    // helper to show links on Navbar if user is authenticated
    const showLinks = () => {
        if (isAuthenticated) {
            return (
                <>
                    <Link to="/dashboard" className="item">{currentUser.email}</Link>
                    <Logout />
                </>
            )
        } else {
            return (
                <>
                    <Link to="/login" className="item">Login</Link>
                    <Link to="/register" className="item">Register</Link>
                </>
            )
        }

    }

    return (
        
        <>
            

    
    <Menu fixed='top' inverted  style={{   }}>
            <Container>
            <Link to='#'>
                {/* <Icon name='align-justify' />    */}
                <Checkbox className="item"
                    checked={props.visible}
                    label={{ children: <Icon color='blue' name='align justify' /> }}
                    onChange={(e, data) => props.setVisible(data.checked)}
                />
            </Link>
            <Link to="/" className="item">Dashboard</Link>
            {/* {isAuthenticated ? <Link to="/pageone" className="item">Page One</Link> : ""} */}
            {isAuthenticated ? checkPermissionByModuleName('elites')?.has_read ? <NavLink to="/heads" className="item">Elites</NavLink> : "" : ""}
            {isAuthenticated ? checkPermissionByModuleName('collaborators')?.has_read ?  <NavLink to="/collaborators" className="item">Collaborators</NavLink> : "": ""}
            {isAuthenticated ? checkPermissionByModuleName('centers')?.has_read ?  <NavLink to="/centers" className="item">Centers</NavLink> : "": ""}
            {isAuthenticated ? checkPermissionByModuleName('installments')?.has_read ?  <NavLink to="/installments" className="item">Installments</NavLink> : "": ""}
            {/* {isAuthenticated ? checkPermissionByModuleName('collaborators')?.has_read ?  <NavLink to="/instalment_lines" className="item">Instalment Lines</NavLink> : "": ""} */}
            {isAuthenticated ? checkPermissionByModuleName('beneficiaries')?.has_read ?  <NavLink to="/beneficiaries" className="item">Beneficiaries</NavLink> : "": ""}
            {isAuthenticated ? checkPermissionByModuleName('generals')?.has_read ?  <NavLink to="/generals" className="item">Generals</NavLink> : "": ""}
            {isAuthenticated ? checkPermissionByModuleName('rewards')?.has_read ?  <NavLink to="/rewards" className="item">Rewards</NavLink> : "": ""}
            {isAuthenticated ? checkPermissionByModuleName('campaigns')?.has_read ?  <NavLink to="/campaigns" className="item">Campaigns</NavLink> : "": ""}
            <div className="right menu">
                {showLinks()}
            </div>
            </Container>
        </Menu>

        </>
    )
}

export default NavBar;
