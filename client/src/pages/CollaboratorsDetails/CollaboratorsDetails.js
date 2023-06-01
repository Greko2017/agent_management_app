import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { Button, Message,GridColumn,GridRow, Icon, HeaderContent, Header } from "semantic-ui-react";
import { Link, useParams } from 'react-router-dom'
import { getCollaboratorById, deleteCollaborator } from '../../services/collaboratorServices/collaboratorServices';
import CollaboratorForm from '../../components/CollaboratorForm';
import BeneficiaryTable from '../../components/BeneficiaryTable';
import { getBeneficiariesByParentId } from '../../services/BeneficiaryServices/BeneficiaryServices';
import { getCenters } from '../../services/CenterServices/CenterServices';
import { getInstallments } from '../../services/InstalmentServices/InstalmentServices';
import history from "../../history"

function CollaboratorsDetails() {
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [collaborator, setCollaborator] = useState({});  
    const [beneficiaries, setBeneficiaries] = useState([])
    const [centers, setCenters] = useState([]);  
    const [installments, setInstallments] = useState([]);  
    const {role, permissions} = useSelector(state => state.auth);
    const [permission, setPermission] = useState({})

    const { collaborator_id } = useParams() 
    const dispatch = useDispatch();   

    useEffect(() => {
        let _permission = {}
        if (permissions instanceof Array) {
          _permission = permissions.filter(i => i.module_name === "collaborators")[0] 
          setPermission(_permission)
        }
        (async () => {
          await loadCollaborator();
          await loadBeneficiaries();
          await loadCenters();
          await loadInstallments();
        })()
       // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    
    const loadInstallments = async () => {        
        const response = await dispatch(getInstallments(setErrorMessage, setSuccessMessage, setIsLoading));
        setInstallments(response.data) 
    }

    const loadCollaborator = async () => {        
        const response = await dispatch(getCollaboratorById(collaborator_id, setErrorMessage, setSuccessMessage, setIsLoading));
        // console.log('response', response)
        setCollaborator(response.data) 
    }

    const loadBeneficiaries = async () => {        
        const response = await dispatch(getBeneficiariesByParentId(collaborator_id, setErrorMessage, setSuccessMessage, setIsLoading));
        // console.log('response', response)
        setBeneficiaries(response.data) 
    }

    const loadCenters = async () => {        
        const response = await dispatch(getCenters(setErrorMessage, setSuccessMessage, setIsLoading));
        setCenters(response.data) 
    }

    const handleDelete = async () => {
        await dispatch(deleteCollaborator(collaborator_id, setErrorMessage, setSuccessMessage, setIsLoading));
        // console.log('response', response)
    }
  return (
    <>
    {errorMessage ? <Message className="alertMssg" basic='true' color='red'> {errorMessage} </Message> : ""}
    
    {successMessage ? <Message className="alertMssg" basic='true' color='green'> {successMessage} </Message> : ""}
    
        <GridColumn>
            <GridRow>
                <Message>
                    <Button icon='arrow left' className="item mr-3" onClick={()=>{history.goBack()}}
                        />
                    
                    {permission && permission.has_update === true ? (
                    <Button
                        loading={isLoading}
                        disabled={isLoading}
                        content='Edit'
                        labelPosition='right'
                        form='collaborator-form'
                        icon='edit'
                        positive
                        />
                    ):null}
                    
                    {permission && permission.has_delete === true ? (
                        <Button
                            loading={isLoading}
                            disabled={isLoading}
                            content='Delete'

                            labelPosition='right'
                            onClick={handleDelete}
                            icon='cancel'
                            negative
                            />
                    ):null}
                    
                </Message>
            </GridRow>
            <GridRow>

            </GridRow>
        </GridColumn>
    <Message>
        {Object.keys(collaborator || {}).length >0 ? <CollaboratorForm loadCollaborator={loadCollaborator} isLoading={isLoading} setIsLoading={setIsLoading} collaborator={collaborator} is_edit={true} /> : 
            <Message className="alertMssg" basic='true' > {'Lead data could not be load, please if refresh the page or contact the support'} </Message>
        }
    </Message>
    <Message>
        <Header>
            {collaborator ? <HeaderContent>{`${collaborator?.first_name}'s Beneficiaries`}</HeaderContent> : <HeaderContent>{`User with this Id is no longer a head`}</HeaderContent>}
        </Header>
        <p>List of the Beneficiaries</p>
    </Message>
    <Message>
        <BeneficiaryTable installments={installments} centers={centers} loadCollaborator={loadCollaborator} loadBeneficiaries={loadBeneficiaries} beneficiaries={beneficiaries} parent={collaborator}  isLoading={isLoading} setIsLoading={setIsLoading}  />
    </Message>
    </>
  )
}

export default CollaboratorsDetails