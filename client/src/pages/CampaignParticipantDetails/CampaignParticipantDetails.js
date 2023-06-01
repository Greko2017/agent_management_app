import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { Button, Message,GridColumn,GridRow, Header, HeaderContent} from "semantic-ui-react";
import { useParams } from 'react-router-dom'
import { getCampaignParticipantById, deleteCampaignParticipant } from '../../services/CampaignParticipantServices/CampaignParticipantServices';
import CampaignParticipantForm from '../../components/CampaignParticipantForm';
import { getGeneralsGeneric } from '../../services/GeneralServices/GeneralServices';
import { getInstallments } from '../../services/InstalmentServices/InstalmentServices';
import { getCenters } from '../../services/CenterServices/CenterServices';
import BeneficiaryTable from '../../components/BeneficiaryTable';
import history from "../../history"

function CampaignParticipantsDetails() {
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [campaign_participant, setCampaignParticipant] = useState({});  
    const [beneficiaries, setBeneficiaries] = useState([])
    const [centers, setCenters] = useState([]);  
    const [installments, setInstallments] = useState([]);  

    const {role, permissions} = useSelector(state => state.auth);
    const [permission, setPermission] = useState({})

    const { campaign_participant_id } = useParams() 
    const dispatch = useDispatch();   
    const user = useSelector(state => state.auth.currentUser);

    useEffect(() => {
        let _permission = {}
        if (permissions instanceof Array) {
          _permission = permissions.filter(i => i.module_name === "campaigns")[0]
          setPermission(_permission)
        }
        (async () => {
          await loadCampaignParticipant()
          await loadCenters();
          await loadInstallments();
        })()
       // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const loadCampaignParticipant = async () => {        
        const response = await dispatch(getCampaignParticipantById(campaign_participant_id, setErrorMessage, setSuccessMessage, setIsLoading));
        // console.log('response', response)
        setCampaignParticipant(response.data) 
        console.log('loadCampaignParticipant res', response.data)
        await loadCampaignParticipantBeneficiaries(response.data)
    }

    const loadInstallments = async () => {        
        const response = await dispatch(getInstallments(setErrorMessage, setSuccessMessage, setIsLoading));
        setInstallments(response.data) 
    }
    
    const loadCenters = async () => {        
        const response = await dispatch(getCenters(setErrorMessage, setSuccessMessage, setIsLoading));
        setCenters(response.data) 
    }

    
    const loadCampaignParticipantBeneficiaries = async ({campaign, participant}) => { 
        // console.log('campaign', campaign)
        if (!campaign && !participant) {return null};
        let query = {'parent._id': participant._id,is_beneficiary: true, created_at: {$gte:new Date(campaign.start_period), $lte: new Date(campaign.end_period)}}       
        const response = await dispatch(getGeneralsGeneric(query,setErrorMessage, setSuccessMessage, setIsLoading));
        // console.log('response', response)
        setBeneficiaries(response.data) 
    }

    const handleDelete = async () => {
        await dispatch(deleteCampaignParticipant(campaign_participant_id, setErrorMessage, setSuccessMessage, setIsLoading));
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
                        form='campaign_participant-form'
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
        {Object.keys(campaign_participant || {}).length >0 ? <CampaignParticipantForm loadCampaignParticipant={loadCampaignParticipant} isLoading={isLoading} setIsLoading={setIsLoading} campaign_participant={campaign_participant} is_edit={true} /> : 
            <Message className="alertMssg" basic='true' > {'Lead data could not be load, please if refresh the page or contact the support'} </Message>
        }
    </Message>

    
    <Message>
        <Header>
            {campaign_participant ? <HeaderContent>{`${campaign_participant.participant?.first_name}'s Beneficiaries brought during campaign period `}</HeaderContent> : <HeaderContent>{`User with this Id is no longer a head`}</HeaderContent>}
        </Header>
        <p>List of the Beneficiaries</p>
    </Message>
    <Message>
        <BeneficiaryTable installments={installments} centers={centers} loadBeneficiaries={loadCampaignParticipantBeneficiaries} beneficiaries={beneficiaries} isLoading={isLoading} setIsLoading={setIsLoading}  />
    </Message>
    
    </>
  )
}

export default CampaignParticipantsDetails