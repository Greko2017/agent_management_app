import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { Button, Message,GridColumn,GridRow, Icon, Header, HeaderContent} from "semantic-ui-react";
import { Link, useParams } from 'react-router-dom'
import { getCampaignById, deleteCampaign } from '../../services/CampaignServices/CampaignServices';
import CampaignForm from '../../components/CampaignForm';
import CampaignParticipantTable from '../../components/CampaignParticipantTable'
import { getCampaignParticipantsByCampaignId } from '../../services/CampaignParticipantServices/CampaignParticipantServices';

import history from "../../history"

function CampaignDetails() {
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [campaign, setCampaign] = useState({});  
    const [participants, setParticipants] = useState([])
    const [campaign_participants, setCampaignParticipants] = useState([])
    const { campaign_id } = useParams() 
    const dispatch = useDispatch();   
    const user = useSelector(state => state.auth.currentUser);

    const {role, permissions} = useSelector(state => state.auth);
    const [permission, setPermission] = useState({})

    useEffect(() => {
        let _permission = {}
        if (permissions instanceof Array) {
          _permission = permissions.filter(i => i.module_name === "campaigns")[0]
          setPermission(_permission)
        }
        (async () => {
          await loadCampaign()
          await loadCampaignParticipants()
        })()
       // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const loadCampaign = async () => {        
        const response = await dispatch(getCampaignById(campaign_id, setErrorMessage, setSuccessMessage, setIsLoading));
        // console.log('response', response)
        setCampaign(response.data) 
    }

    
    const loadCampaignParticipants = async () => {        
        const response = await dispatch(getCampaignParticipantsByCampaignId(campaign_id, setErrorMessage, setSuccessMessage, setIsLoading));
        // console.log('response', response)
        setCampaignParticipants(response.data) 
    }

    const handleDelete = async () => {
        await dispatch(deleteCampaign(campaign_id, setErrorMessage, setSuccessMessage, setIsLoading));
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
                            form='campaign-form'
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
        {Object.keys(campaign || {}).length >0 ? <CampaignForm loadCampaign={loadCampaign} isLoading={isLoading} setIsLoading={setIsLoading} campaign={campaign} is_edit={true} /> : 
            <Message className="alertMssg" basic='true' > {'Lead data could not be load, please if refresh the page or contact the support'} </Message>
        }
    </Message>

    
    <Message>
        <Header>
            {participants ? <HeaderContent>{`Participant`}</HeaderContent> : <HeaderContent>{`Here you can manage all this campaign participants`}</HeaderContent>}
        </Header>
        <p>Campaign's participant list</p>
    </Message>
    <Message>
        <CampaignParticipantTable loadCampaignParticipants={loadCampaignParticipants} campaign_participants={campaign_participants} campaign={campaign}  isLoading={isLoading} setIsLoading={setIsLoading}  />
    </Message>

    </>
  )
}

export default CampaignDetails