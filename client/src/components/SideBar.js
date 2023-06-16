import React, { useEffect } from 'react'
import { useSelector } from "react-redux";
import { NavLink } from 'react-router-dom';
import { Menu, Segment, Sidebar } from 'semantic-ui-react'
import { findObject } from '../utils/tools';

function SideBar(props) {
  useEffect(() => {
    // console.log('SideBar', props)
  }, [props]);
  const {  isAuthenticated, permissions, role } = useSelector(state => state.auth)
  
  const checkPermissionByModuleName = (module_name) => {
    const foundObject = findObject(permissions, "module_name", module_name);
    // console.log('-- checkPermissionByModuleName foundObject has_read', foundObject.has_read)
    return foundObject
}
  return (
    <>
      <Sidebar.Pushable>
        <Sidebar
          as={Menu}
          animation='scale down'
          icon='labeled'
          inverted
          vertical
          visible={props.visible}
          width='thin'
        >
          <br/><br/>
                {isAuthenticated ? checkPermissionByModuleName('elites')?.has_read ? <NavLink to="/heads" className="item">Elites</NavLink> : "" : ""}
                {isAuthenticated ? checkPermissionByModuleName('collaborators')?.has_read ?  <NavLink to="/collaborators" className="item">Collaborators</NavLink> : "": ""}
                {isAuthenticated ? checkPermissionByModuleName('centers')?.has_read ?  <NavLink to="/centers" className="item">Centers</NavLink> : "": ""}
                {isAuthenticated ? checkPermissionByModuleName('installments')?.has_read ?  <NavLink to="/installments" className="item">Installments</NavLink> : "": ""}
                {isAuthenticated ? checkPermissionByModuleName('beneficiaries')?.has_read ?  <NavLink to="/beneficiaries" className="item">Beneficiaries</NavLink> : "": ""}
                {isAuthenticated ? checkPermissionByModuleName('generals')?.has_read ?  <NavLink to="/generals" className="item">Generals</NavLink> : "": ""}
                {isAuthenticated ? checkPermissionByModuleName('rewards')?.has_read ?  <NavLink to="/rewards" className="item">Rewards</NavLink> : "": ""}
                {isAuthenticated ? checkPermissionByModuleName('campaigns')?.has_read ?  <NavLink to="/campaigns" className="item">Campaigns</NavLink> : "": ""}
          {isAuthenticated ? checkPermissionByModuleName('user_roles')?.has_read ?  <NavLink to="/user_roles" className="item">User Role</NavLink> : "": ""}
          {isAuthenticated ? checkPermissionByModuleName('participant_accounts')?.has_read ?  <NavLink to="/participant_accounts" className="item">participant Account</NavLink> : "": ""}
        </Sidebar>

        <Sidebar.Pusher>
          <Segment basic>
            {React.cloneElement(props.children)}
          </Segment>
        </Sidebar.Pusher>
      </Sidebar.Pushable>
    </>
  )
}

export default  SideBar