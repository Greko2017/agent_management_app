import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { Segment, Image,Button, Message,GridColumn,GridRow,  Header, HeaderContent, Table} from "semantic-ui-react";
import { useParams } from 'react-router-dom'
import { getParticipantAccountParticipantsByAccountId } from '../../services/ParticipantAccountParticipantServices/ParticipantAccountParticipantServices';
import ParticipantAccountForm from '../../components/ParticipantAccountForm';

import history from "../../history"
import { getParticipantAccountById, deleteParticipantAccount } from '../../services/ParticipantAccountServices/ParticipantAccountServices';
import AccountStakeholderTable from '../../components/AccountStakeholderTable';

import { getStakeholderAccountHistoriesByQuery, getStakeholderTransactionHistoriesByStakeholderId } from '../../services/StakeholderTransactionHistory/StakeholderTransactionHistory';
import TransactionHistory from '../TransactionHistory/TransactionHistory';


function ParticipantAccountDetails() {
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [participant_account, setParticipantAccount] = useState({});  
    const [participants, setParticipants] = useState([])
    const { participant_account_id } = useParams() 
    const [stakeholder_account_histories, setStakeholderAccountHistory] = useState([])
    const [transaction_histories_data, setTransactionHistoriesData] =useState([])

    const dispatch = useDispatch();   
    const user = useSelector(state => state.auth.currentUser);

    const {role, permissions} = useSelector(state => state.auth);
    const [permission, setPermission] = useState({})

    useEffect(() => {
        let _permission = {}
        if (permissions instanceof Array) {
          _permission = permissions.filter(i => i.module_name === "participant_accounts")[0]
          setPermission(_permission)
        }
        (async () => {
          await loadParticipantAccount()
          await loadParticipants()
          await loadStakeholderAccountHistories()
        })()
       // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const loadParticipantAccount = async () => {        
        const response = await dispatch(getParticipantAccountById(participant_account_id, setErrorMessage, setSuccessMessage, setIsLoading));
        // console.log('-- loadParticipantAccount response', response)
        setParticipantAccount(response.data[0] || {}) 
    }

    
    const loadParticipants = async () => {        
        const response = await dispatch(getParticipantAccountParticipantsByAccountId(participant_account_id, setErrorMessage, setSuccessMessage, setIsLoading));
        // console.log('response', response)
        setParticipants(response.data) 
    }

    const handleDelete = async () => {
        await dispatch(deleteParticipantAccount(participant_account_id, setErrorMessage, setSuccessMessage, setIsLoading));
        // console.log('response', response)
    }

    
    const loadStakeholderAccountHistories = async ()=> {
          let query = {'participant_account._id': participant_account_id}
          const response = await dispatch(getStakeholderAccountHistoriesByQuery(query, setErrorMessage, setSuccessMessage, setIsLoading));
          console.log('-- loadStakeholderAccountHistories response.data', response.data)
          setStakeholderAccountHistory(response.data) 
          computeTransactionsHistoryData(response.data)
      } 

      
    const computeTransactionsHistoryData = (_stakeholder_account_histories) => {
        let computed_data = _stakeholder_account_histories.reduce((acc, curr) => {
            acc.earnings += curr.is_credit ? parseFloat(curr.amount) : 0;
            acc.pending_earnings += curr.is_credit && curr.status === 'to_approve' ? parseFloat(curr.amount) : 0;
            acc.approved_earnings += curr.is_credit && curr.status === 'approved' ? parseFloat(curr.amount) : 0;
            acc.withdrawals += !curr.is_credit ? parseFloat(curr.amount) : 0;
            acc.pending_withdrawals += !curr.is_credit && curr.status === 'to_approve' ? parseFloat(curr.amount) : 0;
            acc.approved_withdrawals += !curr.is_credit && curr.status === 'approved' ? parseFloat(curr.amount) : 0;
            return acc
        }, {earnings: 0, withdrawals: 0, pending_earnings: 0, pending_withdrawals: 0, approved_earnings: 0, approved_withdrawals: 0})
        computed_data.balance = parseFloat(computed_data.approved_earnings) - parseFloat(computed_data.approved_withdrawals)
        console.log('computed_data', computed_data)
        setTransactionHistoriesData(computed_data)
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
                            form='participant_account-form'
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
        {Object.keys(participant_account || {}).length >0 ? <ParticipantAccountForm loadParticipantAccount={loadParticipantAccount} isLoading={isLoading} setIsLoading={setIsLoading} participant_account={participant_account} is_edit={true} /> : 
            <Message className="alertMssg" basic='true' > {'Participant Account data could not be load, please if refresh the page or contact the support'} </Message>
        }
    </Message>

    
    <Message>
        <Header>
            {participants ? <HeaderContent>{`Stakeholder`}</HeaderContent> : <HeaderContent>{`Here you can manage all this participant_account participant_accounts`}</HeaderContent>}
        </Header>
        <p>Stakeholder's Account list</p>
    </Message>
    <Message>
        <AccountStakeholderTable loadParticipants={loadParticipants} participants={participants} participant_account={participant_account}  isLoading={isLoading} setIsLoading={setIsLoading}  />
    </Message>


    <Message>
        <Header>
            {<HeaderContent>{`Transaction Details`}</HeaderContent> }
        </Header>
        <p>Transaction Details</p>
    </Message>
    
    <Segment.Group width='three' horizontal>
        <Segment color='grey'>
            <Message><Header>Account Details</Header></Message>
            <Table celled >
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Available to withdraw</Table.HeaderCell>
                  <Table.HeaderCell textAlign="right"> {`${transaction_histories_data.balance}`} </Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              
              <Table.Body>
                
                    <Table.Row key={'earnings'}>
                      <Table.Cell  class="cust">
                        <Header as='h4' image>
                          <Image src={`/images/${'matthew'}.png`} rounded size='mini' />
                          <Header.Content>
                            {`Earning`}
                            <Header.Subheader>{`Total earnings`}</Header.Subheader>
                          </Header.Content>
                        </Header>
                      </Table.Cell>
                      <Table.Cell  textAlign='right'>{`${transaction_histories_data.earnings}`}</Table.Cell>
                    </Table.Row>

                    
                    <Table.Row key={'withdrawals'}>
                      <Table.Cell  class="cust">
                        <Header as='h4' image>
                          <Image src={`/images/${'matthew'}.png`} rounded size='mini' />
                          <Header.Content>
                            {`Withdrawals`}
                            <Header.Subheader>{`Total withdrawals`}</Header.Subheader>
                          </Header.Content>
                        </Header>
                      </Table.Cell>
                      <Table.Cell  textAlign='right'>{`${transaction_histories_data.withdrawals}`}</Table.Cell>
                    </Table.Row>

                    
                    <Table.Row key={'approved_earnings'}>
                      <Table.Cell  class="cust">
                        <Header as='h4' image>
                          <Image src={`/images/${'matthew'}.png`} rounded size='mini' />
                          <Header.Content>
                            {`Approved Earnings`}
                            <Header.Subheader>{`Total A pproved earnings`}</Header.Subheader>
                          </Header.Content>
                        </Header>
                      </Table.Cell>
                      <Table.Cell  textAlign='right'>{`${transaction_histories_data.approved_earnings}`}</Table.Cell>
                    </Table.Row>

                    
                    <Table.Row key={'approved_withdrawals'}>
                      <Table.Cell  class="cust">
                        <Header as='h4' image>
                          <Image src={`/images/${'matthew'}.png`} rounded size='mini' />
                          <Header.Content>
                            {`Approved Withdrawals`}
                            <Header.Subheader>{`Total Approved withdrawals`}</Header.Subheader>
                          </Header.Content>
                        </Header>
                      </Table.Cell>
                      <Table.Cell  textAlign='right'>{`${transaction_histories_data.approved_withdrawals}`}</Table.Cell>
                    </Table.Row>
                    
                    <Table.Row key={'pending_earnings'}>
                      <Table.Cell  class="cust">
                        <Header as='h4' image>
                          <Image src={`/images/${'matthew'}.png`} rounded size='mini' />
                          <Header.Content>
                            {`Pending Earnings`}
                            <Header.Subheader>{`Total pending_earnings`}</Header.Subheader>
                          </Header.Content>
                        </Header>
                      </Table.Cell>
                      <Table.Cell  textAlign='right'>{`${transaction_histories_data.pending_earnings}`}</Table.Cell>
                    </Table.Row>

                    
                    <Table.Row key={'pending_withdrawals'}>
                      <Table.Cell  class="cust">
                        <Header as='h4' image>
                          <Image src={`/images/${'matthew'}.png`} rounded size='mini' />
                          <Header.Content>
                            {`Pending Withdrawals`}
                            <Header.Subheader>{`Total Pending withdrawals`}</Header.Subheader>
                          </Header.Content>
                        </Header>
                      </Table.Cell>
                      <Table.Cell  textAlign='right'>{`${transaction_histories_data.pending_withdrawals}`}</Table.Cell>
                    </Table.Row>


                    

              </Table.Body>
            </Table>
        </Segment>
    </Segment.Group>
    
    <Message>
        <Header>
            {stakeholder_account_histories ? <HeaderContent>{`Transaction History`}</HeaderContent> : <HeaderContent>{`Here you can manage all this participant_account participant_accounts`}</HeaderContent>}
        </Header>
        <p>Transaction History list</p>
    </Message>
    <Message>
        <TransactionHistory stakeholder_account_histories={stakeholder_account_histories} loadStakeholderAccountHistories={loadStakeholderAccountHistories} participant_account={participant_account}  />
    </Message>

    </>
  )
}

export default ParticipantAccountDetails