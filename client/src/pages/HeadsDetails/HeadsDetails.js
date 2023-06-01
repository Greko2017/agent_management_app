import React, { useEffect, useState } from 'react'
import {  useDispatch, useSelector } from "react-redux";
import { Button, Message,GridColumn,GridRow, Icon, HeaderContent, Header, Segment } from "semantic-ui-react";
import HeadForm from '../../components/HeadForm';
import { Link, useParams } from 'react-router-dom'
import { getHeadById, deleteHead } from '../../services/headServices/HeadServices';
import CollaboratorTable from '../../components/CollaboratorTable';
import { getCollaboratorsByParentId } from '../../services/collaboratorServices/collaboratorServices';
import { getInstallments } from '../../services/InstalmentServices/InstalmentServices';
import { getBeneficiariesByParentId } from '../../services/BeneficiaryServices/BeneficiaryServices';
import { getCenters } from '../../services/CenterServices/CenterServices';
import BeneficiaryTable from '../../components/BeneficiaryTable';
import history from "../../history"
import axios from 'axios';

function HeadsDetails() {
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [head, setHead] = useState({});  
    const [collaborators, setCollaborators] = useState([])

    
    const [beneficiaries, setBeneficiaries] = useState([])
    const [centers, setCenters] = useState([]);  
    const [installments, setInstallments] = useState([]);  
    const token = useSelector(state => state.auth.token)

    const {role, permissions} = useSelector(state => state.auth);
    const [permission, setPermission] = useState({})

    const { head_id } = useParams() 
    const dispatch = useDispatch();   

    const headerConfig = {
        headers: {
            "Content-type": "application/json"
        }
    }
    if (token) {
        headerConfig.headers["token"] = token
    }

    
    useEffect(() => {
        let _permission = {}
        if (permissions instanceof Array) {
          _permission = permissions.filter(i => i.module_name === "elites")[0] // i.role.name === 'elite' && 
          setPermission(_permission)
        }
        (async () => {
          await loadHead()
          await loadCollaborators()
          
          await loadBeneficiaries();
          await loadCenters();
          await loadInstallments();
        })()
       // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const loadHead = async () => {        
        const response = await dispatch(getHeadById(head_id, setErrorMessage, setSuccessMessage, setIsLoading));
        // console.log('response', response)
        setHead(response.data) 
    }

    const loadCollaborators = async () => {        
        const response = await dispatch(getCollaboratorsByParentId(head_id, setErrorMessage, setSuccessMessage, setIsLoading));
        // console.log('response', response)
        setCollaborators(response.data) 
    }

    const handleDelete = async () => {
        await dispatch(deleteHead(head_id, setErrorMessage, setSuccessMessage, setIsLoading));
        // console.log('response', response)
    }

    
    // load data for beneficiary start
    const loadInstallments = async () => {        
        const response = await dispatch(getInstallments(setErrorMessage, setSuccessMessage, setIsLoading));
        setInstallments(response.data) 
    }
    const loadBeneficiaries = async () => {        
        const response = await dispatch(getBeneficiariesByParentId(head_id, setErrorMessage, setSuccessMessage, setIsLoading));
        // console.log('response', response)
        setBeneficiaries(response.data) 
    }

    const loadCenters = async () => {        
        const response = await dispatch(getCenters(setErrorMessage, setSuccessMessage, setIsLoading));
        setCenters(response.data) 
    }
    // load data for beneficiary end
    const updatePassword = async () => {
        axios.patch(`/head/update_password`, {
         email: head.email,
        }, headerConfig);
    }
  return (
    <>
    {errorMessage ? <Message className="alertMssg" basic='true' color='red'> {errorMessage} </Message> : ""}
    
    {successMessage ? <Message className="alertMssg" basic='true' color='green'> {successMessage} </Message> : ""}
    
        <GridColumn>
            <GridRow>
                <Message style={{display: 'flex', justifyContent: 'space-between'}}>
                    <div>
                    <Button icon='arrow left' className="item mr-3" onClick={()=>{history.goBack()}}
                        />
                    {permission && permission.has_update === true ? (
                    <Button
                        loading={isLoading}
                        disabled={isLoading}
                        content='Edit'
                        labelPosition='right'
                        form='head-form'
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
                    </div>
                        <div>
                            {permission && permission.has_update === true ? (

                                <Button
                                    loading={isLoading}
                                    disabled={isLoading}
                                    content='Update Password'

                                    labelPosition='right'
                                    onClick={updatePassword}
                                    icon='lock'
                                    primary
                                    />
                            ):null}

                        </div>
                </Message>
            </GridRow>
            <GridRow>

            </GridRow>
        </GridColumn>
    <Message>
        {Object.keys(head || {}).length >0 ? <HeadForm loadHead={loadHead} isLoading={isLoading} setIsLoading={setIsLoading} head={head} is_edit={true} /> : 
            <Message className="alertMssg" basic='true' > {'Lead data could not be load, please if refresh the page or contact the support'} </Message>
        }
    </Message>
    <Message>
        <Header>
            {head ? <HeaderContent>{`${head?.first_name}'s Collaborators`}</HeaderContent> : <HeaderContent>{`User with this Id is no longer a head`}</HeaderContent>}
        </Header>
        <p>List of the lead Collaborators</p>
    </Message>
    <Message>
        <CollaboratorTable loadCollaborators={loadCollaborators} collaborators={collaborators} parent={head}  isLoading={isLoading} setIsLoading={setIsLoading}  />
    </Message>
    
    <Message>
        <Header>
            {head ? <HeaderContent>{`${head?.first_name}'s Beneficiaries`}</HeaderContent> : <HeaderContent>{`User with this Id is no longer a head`}</HeaderContent>}
        </Header>
        <p>List of the Beneficiaries</p>
    </Message>

    <Segment.Group placeholder color='black' loading={isLoading}>
         <BeneficiaryTable installments={installments} centers={centers} loadCollaborator={loadHead} loadBeneficiaries={loadBeneficiaries} beneficiaries={beneficiaries} parent={head}  isLoading={isLoading} setIsLoading={setIsLoading}  />
    </Segment.Group>
    </>
  )
}

export default HeadsDetails