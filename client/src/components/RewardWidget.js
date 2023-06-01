import React, { useEffect, useState } from 'react'
import { Icon, Message, Segment, Statistic, Header, Image, Table  } from 'semantic-ui-react'
import { useDispatch, useSelector } from "react-redux";
import { getGeneralsGeneric } from '../services/GeneralServices/GeneralServices';
import axios from 'axios'
function RewardWidget(props) {
    const {campaign_participant, setIsLoading, setSuccessMessage, setErrorMessage} =props
    const [beneficiaries, setBeneficiaries] = useState([])
    const [total_installments_amount, setTotalInstallmentsAmount] = useState(0)
    const [instalment_paid, setInstalmentPaid] = useState(0)
    const [directBeneficiaries, setDirectBeneficiaries] = useState([])
    const [beneficiariesFromAllCollaborators, setBeneficiariesFromAllCollaborators] = useState([])
    const token = useSelector(state => state.auth.token)
    const user = useSelector(state => state.auth.currentUser);
    const [collaboratorsData, setCollaboratorsData] = useState({})
    const [eliteData, setEliteData] = useState({})
    const [campaignParticipantData, setCampaignParticipantData] = useState([])
    const [allIncomes, setAllIncomes] = useState([])
    
    const headerConfig = {
        headers: {
            "Content-type": "application/json"
        }
    }
    if (token) {
        headerConfig.headers["token"] = token
    }

    const dispatch = useDispatch();   
    useEffect(() => {
        
        (async()=>{
            console.log('campaign_participant', props)
            await computeCollaboratorsData()
            await computeCampaignParticipantData()
            await computeEliteData()
        })()
    }, [])
    
    const loadCampaignParticipantBeneficiaries = async () => { 
        const {campaign, participant} = campaign_participant;
        // console.log('campaign', campaign)
        if (!campaign && !participant) {return null};
        let query = {'parent._id': participant._id,is_beneficiary: true, created_at: {$gte:new Date(campaign.start_period), $lte: new Date(campaign.end_period)}}       
        const response = await dispatch(getGeneralsGeneric(query,setErrorMessage, setSuccessMessage, setIsLoading));
        // console.log('response', response)
        setBeneficiaries(response.data) 
        await computeTotalInstallmentsOfAllBeneficiariesOfAParticipant(response.data)
    }
    const computeTotalInstallmentsOfAllBeneficiariesOfAParticipant = async () => {
        let query = {'beneficiary_instalment_history.beneficiary.parent._id': user.dashboard_id}
        const res = await axios.post('/general/participant_income/list', {query}, headerConfig)
        console.log('dashboard_data', res)
        let computed_data = {}
        if (res.status == '200' && res.data instanceof Array) {
          computed_data = res.data.reduce((acc, curr)=> {
            acc.total_income = parseFloat(acc.total_income) + parseFloat(curr.amount)
            console.log('acc', acc)

            // compute total income per beneficiaries
            if (!acc.total_income_per_beneficiary.hasOwnProperty(`${curr.beneficiary_instalment_history.beneficiary._id}`)) {
              acc.total_income_per_beneficiary[`${curr.beneficiary_instalment_history.beneficiary._id}`] = {beneficiary:curr.beneficiary_instalment_history.beneficiary, total_amount : 0}
            }
            acc.total_income_per_beneficiary[`${curr.beneficiary_instalment_history.beneficiary._id}`]['total_amount'] = parseFloat(acc.total_income_per_beneficiary[`${curr.beneficiary_instalment_history.beneficiary._id}`]['total_amount']) + parseFloat(curr.amount)
            return acc
           },{total_income:0, total_income_per_beneficiary: {}})
        }
        console.log('computed_data', computed_data)
    }
    const computeCampaignParticipantData = async () => {
      let query = {'participant._id': user.dashboard_id}
      const res = await axios.post('/general/campaign_participant/list', {query}, headerConfig)
      let compute_campaign_participant_data = []
      for (let index = 0; index < res.data.length; index++) {
        const {campaign, participant} = res.data[index];
        
        if (!campaign && !participant) {continue};
        let query = {'parent._id': participant._id,is_beneficiary: true, created_at: {$gte:new Date(campaign.start_period), $lte: new Date(campaign.end_period)}}       
        const response = await dispatch(getGeneralsGeneric(query,setErrorMessage, setSuccessMessage, setIsLoading));
        compute_campaign_participant_data.push({number_of_beneficiaries: response.data.length, campaign})

      }
      console.log('compute_campaign_participant_data', compute_campaign_participant_data)
      setCampaignParticipantData(compute_campaign_participant_data)
    }
    const computeEliteData = async () => {
     
      const {data, status} = await axios.post('/general/list', {query: {"is_beneficiary": true,   "parent._id": user.dashboard_id, "parent.is_lead":'true'}}, headerConfig)
      let computed_data ={}
      console.log('computeEliteData beneficiaries', data)
      if (status == '200' && data instanceof Array) {
                  
          computed_data = {
            beneficiaries: 0,
            incomes: 0,
            participant: user
          }

          computed_data['number_of_beneficiaries'] = data.length
          let participant_income =  await computeParticipantTotalIncome(user.dashboard_id)
          computed_data['incomes'] = participant_income
          computed_data.total_incomes = parseFloat(participant_income)
      }
      
      console.log('--In computeEliteData computed_data', computed_data)
      setEliteData(computed_data)
    }

    const computeCollaboratorsData = async () => {
      let query =  {is_collaborator: true, 'parent_id' : user.dashboard_id}
      const {data: collaborators, status} = await axios.post('/general/list', {query}, headerConfig)
      
      let computed_data = {total_beneficiary_of_collaborators: 0, incomes_for_beneficiaries_per_collaborator:[], total_collaborators_incomes: 0}
      console.log('collaborators', collaborators)
      if (status == '200' && collaborators instanceof Array) {
        let acc = computed_data
        for (let index = 0; index < collaborators.length; index++) {
          const curr = collaborators[index];
          let {data: beneficiaries} = await axios.post('/general/list', {'is_beneficiary':true,'parent.is_collaborator': true, 'parent._id': curr._id}, headerConfig)
          acc.total_beneficiary_of_collaborators = parseInt(acc.total_beneficiary_of_collaborators) +  parseInt(beneficiaries.length)

          if (!acc.incomes_for_beneficiaries_per_collaborator.hasOwnProperty(`${curr._id}`)) {
              acc.incomes_for_beneficiaries_per_collaborator[`${curr._id}`] = {
                beneficiaries: 0,
                incomes: 0,
                collaborator: curr
              }
          }
          acc.incomes_for_beneficiaries_per_collaborator[`${curr._id}`]['beneficiaries'] = beneficiaries.length
          let participant_income =  await computeParticipantTotalIncome(curr._id)
          acc.incomes_for_beneficiaries_per_collaborator[`${curr._id}`]['incomes'] = participant_income
          acc.total_collaborators_incomes = parseFloat(acc.total_collaborators_incomes) + parseFloat(participant_income)
        }
        computed_data = acc
      }
      computed_data.collaborator_number = collaborators.length
      console.log('--In computeCollaboratorsData computed_data', Object.keys(computed_data.incomes_for_beneficiaries_per_collaborator).map(item=> {
        return item
      }))
      setCollaboratorsData(computed_data)
    }
    
    const computeParticipantTotalIncome = async (participant_id) => {
      let query = {'beneficiary_instalment_history.beneficiary.parent._id': participant_id}        
      const res = await axios.post('/general/participant_income/list', {query}, headerConfig)
      let computed_data ={}
      let tmp_all_income = {};
      
      if (res.status == '200' && res.data instanceof Array) {
        tmp_all_income.participant = res.data[0].beneficiary_instalment_history.beneficiary.parent
        tmp_all_income.beneficiary = res.data[0].beneficiary_instalment_history.beneficiary
        computed_data = res.data.reduce((acc, curr)=> {
          acc.total_income = parseFloat(acc.total_income) + parseFloat(curr.amount)
          return acc
         },{total_income:0})
         tmp_all_income.total_income = computed_data.total_income
        let  _allIncomes = allIncomes 
        _allIncomes.push(tmp_all_income)
         setAllIncomes(_allIncomes)

         console.log('tmp_all_income', tmp_all_income,allIncomes)
         return computed_data.total_income
      }
      return 0
    }

    return (
      <>
      <Message>
        <Statistic.Group widths='7'>
          <Statistic>
            <Statistic.Value>{eliteData && eliteData.number_of_beneficiaries || 0}</Statistic.Value>
            <Statistic.Label>Direct Beneficiaries</Statistic.Label>
          </Statistic>

          <Statistic>
            <Statistic.Value>{collaboratorsData.collaborator_number || 'n/a'}</Statistic.Value>
            <Statistic.Label>Collaborators</Statistic.Label>
          </Statistic>

          <Statistic>
            <Statistic.Value>{ collaboratorsData.total_beneficiary_of_collaborators || 'n/a'}</Statistic.Value>
            <Statistic.Label>Collaborator's Beneficiaries</Statistic.Label>
          </Statistic>

          <Statistic>
            <Statistic.Value text>
            {`${campaign_participant?.participant?.is_collaborator ? 'Collaborator' : campaign_participant?.participant?.is_head ? ' Elite' : campaign_participant?.participant?.is_beneficiary ? ' Beneficiary' : campaign_participant?.participant?.is_lead ? 'Elit' : '#'}`}
              {/* <br /> */}
              
            </Statistic.Value>
            <Statistic.Label>Position</Statistic.Label>
          </Statistic>

          <Statistic>
            <Statistic.Value>
              {collaboratorsData.total_collaborators_incomes || 'n/a'}
            </Statistic.Value>
            <Statistic.Label>Collaborators Incomes</Statistic.Label>
          </Statistic>
          
          <Statistic>
            <Statistic.Value>
              {eliteData && eliteData.total_incomes || 0}
            </Statistic.Value>
            <Statistic.Label>Own Incomes</Statistic.Label>
          </Statistic>

        </Statistic.Group>
      </Message>

  
      <Segment.Group width='three' horizontal>
        <Segment color='grey'>
            <Message><Header>Income from beneficiaries available</Header></Message>
            <Table celled >
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Participant</Table.HeaderCell>
                  <Table.HeaderCell>Income</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              
              <Table.Body>
                  {allIncomes.map((allIncome, i)=>(
                    <Table.Row key={i}>
                      <Table.Cell>
                        <Header as='h4' image>
                          <Image src={`/images/${allIncome.beneficiary.gender === 'male' ? 'matthew' : 'lena'}.png`} rounded size='mini' />
                          <Header.Content>
                            {`${allIncome.beneficiary.first_name}, ${allIncome.beneficiary.last_name}`}
                            <Header.Subheader>{`${allIncome.beneficiary.is_collaborator ? 'Collaborator' : allIncome.participant.is_head ? ' Elite' : allIncome.participant.is_beneficiary ? ' Beneficiary' : allIncome.participant.is_lead ? 'Elit' : '#'}`}</Header.Subheader>
                          </Header.Content>
                        </Header>
                      </Table.Cell>
                      <Table.Cell  textAlign='right'>{allIncome.total_income}</Table.Cell>
                    </Table.Row>
                ))}

              </Table.Body>
            </Table>
        </Segment>

        <Segment  color='teal'>
            <Message><Header>Top 5 Top performing Collaborators</Header></Message>
            <Table celled >
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Collaborator</Table.HeaderCell>
                  <Table.HeaderCell>Beneficiaries</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                
              {Object.keys(collaboratorsData?.incomes_for_beneficiaries_per_collaborator||{})?.map((item, i)=>(
                <Table.Row key={i}>
                  <Table.Cell>
                    <Header as='h4' image>
                      <Image src={`/images/${collaboratorsData.incomes_for_beneficiaries_per_collaborator[item].collaborator.gender === 'male' ? 'matthew' : 'lena'}.png`} rounded size='mini' />
                      <Header.Content>
                        {`${collaboratorsData.incomes_for_beneficiaries_per_collaborator[item].collaborator.first_name}, ${collaboratorsData.incomes_for_beneficiaries_per_collaborator[item].collaborator.last_name}`}
                        <Header.Subheader>{collaboratorsData.incomes_for_beneficiaries_per_collaborator[item].collaborator.email}</Header.Subheader>
                      </Header.Content>
                    </Header>
                  </Table.Cell>
                  <Table.Cell textAlign='right'>{collaboratorsData.incomes_for_beneficiaries_per_collaborator[item].beneficiaries}</Table.Cell>
                </Table.Row>
                ))}


              </Table.Body>
            </Table>
        </Segment>

        <Segment  color='orange'>
            <Message><Header>My Campaigns</Header></Message>
            <Table celled >
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Campaign</Table.HeaderCell>
                  <Table.HeaderCell>Beneficiaries</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {campaignParticipantData.map((campaign_participant_data, i)=>(
                <Table.Row key={i}>
                      <Table.Cell>
                        <Header as='h4' image>
                          <Header.Content>
                            {campaign_participant_data.campaign.name}
                            <Header.Subheader>{`${campaign_participant_data.campaign.start_period.substring(0,10)} - ${campaign_participant_data.campaign.end_period.substring(0,10)}`}</Header.Subheader>
                          </Header.Content>
                        </Header>
                      </Table.Cell>
                      <Table.Cell textAlign='right'>{campaign_participant_data.number_of_beneficiaries}</Table.Cell>
                    </Table.Row>
                ))}

              </Table.Body>
            </Table>
        </Segment>
      </Segment.Group>
    </>
)
}

export default RewardWidget
