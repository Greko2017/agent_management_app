import React, { useState } from 'react'
import {  Checkbox,  Table } from 'semantic-ui-react'
import { Link } from "react-router-dom";

const GeneralTable = (props) => {
    
    return (
        <>
        <Table compact celled definition>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell />
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>E-mail address</Table.HeaderCell>
              <Table.HeaderCell>First Name</Table.HeaderCell>
              <Table.HeaderCell>Last Name</Table.HeaderCell>
              <Table.HeaderCell>Parent Name</Table.HeaderCell>
              <Table.HeaderCell>Parent Phone Number</Table.HeaderCell>
              <Table.HeaderCell>Phone Number</Table.HeaderCell>
              <Table.HeaderCell>Position</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
      
          <Table.Body>
              {props.generals instanceof Array && props.generals.map((general, i)=>(
                  <Table.Row key={i}>
                      <Table.Cell collapsing>
                      <Checkbox slider />
                      </Table.Cell>
                      <Table.Cell><Link to={`/${general.is_collaborator ? 'collaborators' : general.is_lead ? 'heads' : general.is_beneficiary ? 'beneficiaries' : '#'}/${general._id}`}>{`${general.first_name}, ${general.last_name}`}</Link></Table.Cell>
                      <Table.Cell>{general.email}</Table.Cell>
                      <Table.Cell>{general.first_name }</Table.Cell>     
                      <Table.Cell>{general.last_name}</Table.Cell>    

                      <Table.Cell>{general.parent && `${general.parent.first_name}, ${general.parent.last_name}` || 'n/a'}</Table.Cell>
                      <Table.Cell>{general.parent && `${general.parent.phone_number}` || 'n/a'}</Table.Cell>

                      <Table.Cell>{general.phone_number}</Table.Cell>   
                      <Table.Cell>{`${general.is_collaborator ? 'Collaborator' : general.is_head ? ' Elite' : general.is_beneficiary ? ' Beneficiary' : general.is_lead ? 'Elit' : '#'}`}</Table.Cell>
                  </Table.Row>
              ))}
            
            
          </Table.Body>
      
          <Table.Footer fullWidth>
            <Table.Row>
              <Table.HeaderCell />
              <Table.HeaderCell colSpan='6'>
                
              </Table.HeaderCell>
            </Table.Row>
          </Table.Footer>
        </Table>
        </>
)
        }
export default GeneralTable