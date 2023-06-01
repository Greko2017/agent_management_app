import React, { useState } from 'react'
import {  Checkbox,  Table } from 'semantic-ui-react'
import { Link } from "react-router-dom";
import CenterModal from './CenterModal';

const CenterTable = (props) => {
    const [open, setOpen] = useState(false); 
    
    return (
        <>
        <Table compact celled definition>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell />
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Country</Table.HeaderCell>
              <Table.HeaderCell>City</Table.HeaderCell>
              <Table.HeaderCell>Created at</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
      
          <Table.Body>
              {props.centers instanceof Array && props.centers.map((center, i)=>(
                  <Table.Row key={i}>
                      <Table.Cell collapsing>
                      <Checkbox slider />
                      </Table.Cell>
                      <Table.Cell><Link to={`/centers/${center._id}`}>{`${center.name}`}</Link></Table.Cell>
                      <Table.Cell>{center.country}</Table.Cell>
                      <Table.Cell>{center.city}</Table.Cell>
                      <Table.Cell>{center.created_at}</Table.Cell>
                  </Table.Row>
              ))}
            
            
          </Table.Body>
      
          <Table.Footer fullWidth>
            <Table.Row>
              <Table.HeaderCell />
              <Table.HeaderCell colSpan='4'>
                
                <CenterModal open={open} isLoading={props.isLoading} setIsLoading={props.setIsLoading} loadCenters={props.loadCenters} setOpen={setOpen} />
              </Table.HeaderCell>
            </Table.Row>
          </Table.Footer>
        </Table>
        </>
)
        }
export default CenterTable