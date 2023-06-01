import React, { useEffect } from 'react'
import { Router, Route, Switch } from "react-router-dom";
import history from "../history";
import { useDispatch } from "react-redux";
import { loadUser } from "../actions/authActions";
import NavBar from "./NavBar";
import Home from "../pages/Home";
import UserDashboard from "../pages/UserDashboard";
import PageOne from "../pages/PageOne";
import Login from "../pages/Login";
import Register from "../pages/Register";
import PrivateRoute from "./PrivateRoute";
import NoMatch from "../pages/NoMatch";
import SideBar from './SideBar';
import Heads from '../pages/Heads/Heads';
import Centers from '../pages/Centers/Centers';
import HeadsDetails from '../pages/HeadsDetails/HeadsDetails';
import Collaborators from '../pages/Collaborators/Collaborators';
import CollaboratorsDetails from '../pages/CollaboratorsDetails/CollaboratorsDetails';
import CenterDetails from '../pages/CenterDetails/CenterDetails';
import Beneficiaries from '../pages/Beneficiaries/Beneficiaries';
import Installments from '../pages/Installments/Installments';
import InstalmentDetails from '../pages/InstalmentDetails/InstalmentDetails';
import InstalmentLines from '../pages/InstalmemtLines/InstalmemtLines'
import InstalmentLineDetails from '../pages/InstalmentLineDetails/InstalmentLineDetails'
import BeneficiaryDetails from '../pages/BeneficiaryDetails/BeneficiaryDetails';
import BeneficiaryInstalmentHistoryDetails from '../pages/BeneficiaryInstalmentHistoryDetails/BeneficiaryInstalmentHistoryDetails'
import Generals from '../pages/Generals/Generals';
import Campaigns from '../pages/Campaigns/Campaigns';
import CampaignDetails from '../pages/CampaignDetails/CampaignDetails';
import Rewards from '../pages/Rewards/Rewards';
import RewardDetails from '../pages/RewardDetails/RewardDetails';
import RewardLineDetails from '../pages/RewardLineDetails/RewardLineDetails';
import CampaignParticipantDetails from '../pages/CampaignParticipantDetails/CampaignParticipantDetails';
import UserRoles from '../pages/UserRoles/UserRoles';

import { Container } from 'semantic-ui-react';
import UserRoleDetails from '../pages/UserRoleDetails/UserRoleDetails';
import UserRolePermissionsDetails from '../pages/UserRolePermissionDetails/UserRolePermissionDetails';
import ParticipantAccounts from '../pages/ParticipantAccount/ParticipantAccount';
import ParticipantAccountDetails from '../pages/ParticipantAccountDetails/ParticipantAccountDetails';
import AccountStakeholderDetails from '../pages/AccountStakeholderDetails/AccountStakeholderDetails';
import TransactionHistoryDetails from '../pages/TransactionHistoryDetails/TransactionHistoryDetails';
import CashierCentersDetails from '../pages/CashierCenterDetails/CashierCenterDetails';

export const App = () => {
    const [visible, setVisible] = React.useState(false)
    // const role = useSelector(state => state.auth.role);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(loadUser())
        // .then(res=> {
        //     // setUser(res)
        //     // console.log('-- App user:', res)
        // });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (

        <>  
        {/* {!user ? (
            <Segment>
              <Dimmer active style={{height: "100vh"}} >
                <Loader size='massive'>Loading</Loader>
              </Dimmer>
            </Segment>
        ): ( */}
        {/* <p>Role :{JSON.stringify(role)}</p>
        <p>Permissions : {JSON.stringify(permissions)}</p> */}
            <Router history={history}>
                
                <NavBar setVisible={setVisible} visible={visible} />
                <SideBar visible={visible}>
                    <Container  style={{ marginTop: '3em', minHeight: '100vh'  }}>
                        <Switch>
                        <Route exact path="/campaign_participants/:campaign_participant_id" component={CampaignParticipantDetails} />
                            <Route path="/" exact component={Home} />
                            <Route path="/login" component={Login} />
                            <Route path="/register" component={Register} /><Route exact path="/beneficiaries/:beneficiary_id" component={BeneficiaryDetails} />
                            {/* {(permissions instanceof Array) && (permissions.length > 0) && ( */}
                                <>
                                    <PrivateRoute path="/dashboard" component={UserDashboard} />
                                    <PrivateRoute exact path="/heads/:head_id" component={HeadsDetails} />
                                    <PrivateRoute exact path="/heads" component={Heads} />
                                    <PrivateRoute exact path="/collaborators/:collaborator_id" component={CollaboratorsDetails} />
                                    <PrivateRoute exact path="/collaborators" component={Collaborators} />
                                    <PrivateRoute exact path="/centers" component={Centers} />
                                    <PrivateRoute exact path="/centers/:center_id" component={CenterDetails} />
                                    <PrivateRoute exact path="/beneficiaries" component={Beneficiaries} />
                                    <PrivateRoute exact path="/beneficiaries/:beneficiary_id" component={BeneficiaryDetails} />
                                    <PrivateRoute exact path="/installments" component={Installments} />
                                    <PrivateRoute exact path="/installments/:instalment_id" component={InstalmentDetails} />
                                    <PrivateRoute exact path="/instalment_lines" component={InstalmentLines} />
                                    <PrivateRoute exact path="/instalment_lines/:instalment_line_id" component={InstalmentLineDetails} />
                                    <PrivateRoute exact path="/beneficiary_instalment_histories/:beneficiary_instalment_history_id" component={BeneficiaryInstalmentHistoryDetails} />
                                    <PrivateRoute exact path="/generals" component={Generals} />
                                    <PrivateRoute exact path="/campaigns" component={Campaigns} />
                                    <PrivateRoute exact path="/campaigns/:campaign_id" component={CampaignDetails} />
                                    <PrivateRoute exact path="/rewards" component={Rewards} />
                                    <PrivateRoute exact path="/rewards/:reward_id" component={RewardDetails} />
                                    <PrivateRoute exact path="/reward_lines/:reward_line_id" component={RewardLineDetails} />
                                    <PrivateRoute exact path="/campaign_participants/:campaign_participant_id" component={CampaignParticipantDetails} />
                                    <PrivateRoute exact path="/user_roles" component={UserRoles} />
                                    <PrivateRoute exact path="/user_roles/:user_role_id" component={UserRoleDetails} />
                                    <PrivateRoute exact path="/user_role_permissions/:user_role_permissions_id" component={UserRolePermissionsDetails} />
                                    <PrivateRoute exact path="/participant_accounts" component={ParticipantAccounts} />
                                    <PrivateRoute exact path="/cashier_centers/:cashier_center_id" component={CashierCentersDetails} />
                                    <PrivateRoute exact path="/participant_accounts/:participant_account_id" component={ParticipantAccountDetails} />
                                    <PrivateRoute exact path="/account_stakeholders/:account_stakeholder_id" component={AccountStakeholderDetails} />
                                    <PrivateRoute exact path="/stakeholder_transaction_histories/:transaction_history_id" component={TransactionHistoryDetails} />
                                    <PrivateRoute path="/pageone" component={PageOne} />

                                </>
                            {/* )} */}
                            <Route component={NoMatch} />
                        </Switch>
                    </Container>
                </SideBar>
            </Router>
            
        {/* )} */}
        </>
    )
}

export default App;
