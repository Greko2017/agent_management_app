import React, { useEffect, useState, PureComponent } from 'react';
import { Button, Grid, GridColumn, GridRow, Header, Message, Progress, Segment, Statistic } from "semantic-ui-react";
import { useDispatch, useSelector } from "react-redux";
import { getGeneralsGeneric } from '../../services/GeneralServices/GeneralServices';
import { clearErrors } from '../../actions/authActions';

import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer
  } from "recharts";

  const data = [
    {
      name: "Page A",
      uv: 4000,
      pv: 2400,
      amt: 2400
    },
    {
      name: "Page B",
      uv: 3000,
      pv: 1398,
      amt: 2210
    },
    {
      name: "Page C",
      uv: 2000,
      pv: 9800,
      amt: 2290
    },
    {
      name: "Page D",
      uv: 2780,
      pv: 3908,
      amt: 2000
    },
    {
      name: "Page E",
      uv: 1890,
      pv: 4800,
      amt: 2181
    },
    {
      name: "Page F",
      uv: 2390,
      pv: 3800,
      amt: 2500
    },
    {
      name: "Page G",
      uv: 3490,
      pv: 4300,
      amt: 2100
    }
  ];
  const getIntroOfPage = (label) => {
    if (label === "Page A") {
      return "Page A is about men's clothing";
    }
    if (label === "Page B") {
      return "Page B is about women's dress";
    }
    if (label === "Page C") {
      return "Page C is about women's bag";
    }
    if (label === "Page D") {
      return "Page D is about household goods";
    }
    if (label === "Page E") {
      return "Page E is about food";
    }
    if (label === "Page F") {
      return "Page F is about baby food";
    }
    return "";
  };
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="label">{`${label} : ${payload[0].value}`}</p>
          <p className="intro">{getIntroOfPage(label)}</p>
          <p className="desc">Anything you want can be displayed here.</p>
        </div>
      );
    }
  
    return null;
  };

export const UserDashboard = (props) => {
    // access to the currentUser property from the auth reducer state
    const user = useSelector(state => state.auth.currentUser);
    const error = useSelector(state => state.errors);
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const {role, permissions, currentUser} = useSelector(state => state.auth);
    const [permission, setPermission] = useState({})
    const [dashboard_data, setDashboardData] = useState({})
    const dispatch = useDispatch();   

    useEffect(() => {
        // console.log('In ParticipantAccountForm props', props)
        if (error.message) {
            setErrorMessage(error.message)
            dispatch(clearErrors())
        }
        (async () => {
          await computeDashboardData()
        })()
    }, [])
    
    const computeDashboardData = async () => { 
        let query = {}
        let tmp_dashboard_data = {}
        if (role.name === 'elite') {
            query = {is_collaborator: true, parent_id: currentUser?._id }
            console.log('-- computeDashboardData query', query)
            // get elite's collaborators
            let _res_col = await dispatch(getGeneralsGeneric(query, setErrorMessage, setSuccessMessage, setIsLoading));
            
            console.log('-- computeDashboardData _res_col.data', _res_col.data)
            tmp_dashboard_data.collaborators = _res_col.data

            // get elite's beneficiaries
            query = {is_beneficiary: true, parent_id: currentUser?._id }
            let _res_ben = await dispatch(getGeneralsGeneric(query, setErrorMessage, setSuccessMessage, setIsLoading));
            tmp_dashboard_data.beneficiaries = _res_ben.data
        }
        setDashboardData(tmp_dashboard_data) 
      }

    return (
        <>
        {/* <p>{JSON.stringify(dashboard_data)}</p> */}
        <GridColumn equals>
            <GridRow>
                <Segment style={{display: 'flex', justifyContent: 'space-between'}} raised  color='teal'>
                        <div>
                            
                        </div>
                        <div>
                            <Button
                                loading={isLoading}
                                disabled={isLoading}
                                content='Reload'

                                labelPosition='right'
                                onClick={()=>{}}
                                icon='arrow alternate circle down'
                                color='green'
                                />
                        </div>
                </Segment>
            </GridRow>
        </GridColumn>

        <Grid style={{marginTop: '.5em', marginBottom: '.5em'}}>
            <Grid.Column computer={4} mobile={8} tablet={8}>

                <Segment.Group raised >
                    <Segment><h4>{role.name === 'elite' ? 'Beneficiaries' : 'N/A'}</h4></Segment>
                    <Segment align='center'>                                
                        <Statistic size='small'>
                        <Statistic.Value>{dashboard_data.beneficiaries && dashboard_data.beneficiaries?.length || 0}</Statistic.Value>
                            <Statistic.Label></Statistic.Label>
                        </Statistic>
                    </Segment>
                </Segment.Group>

            </Grid.Column>
            <Grid.Column computer={4} mobile={8} tablet={8}>
                
                <Segment.Group raised>
                    <Segment><h4>collaborators</h4></Segment>
                    <Segment align='center'>                                
                        <Statistic size='small'>
                            <Statistic.Value>{dashboard_data.collaborators && dashboard_data.collaborators?.length || 0}</Statistic.Value>
                            <Statistic.Label></Statistic.Label>
                        </Statistic>
                    </Segment>
                </Segment.Group>
            </Grid.Column>
            <Grid.Column computer={4} mobile={8} tablet={3}>
                
                <Segment.Group raised>
                    <Segment><h4>Income Earned</h4></Segment>
                    <Segment align='right'>                                
                        <Statistic  size='small' horizontal>
                            <Statistic.Value>6,150</Statistic.Value>
                            <Statistic.Label>Fcfa</Statistic.Label>
                        </Statistic>
                    </Segment>
                </Segment.Group>
            </Grid.Column>
            <Grid.Column computer={4} mobile={8} tablet={3}>
                
                <Segment.Group raised>
                    <Segment><h4>Income Withdrawn</h4></Segment>
                    <Segment align='right'>                                
                        <Statistic  size='small' horizontal>
                            <Statistic.Value>600</Statistic.Value>
                            <Statistic.Label>Fcfa</Statistic.Label>
                        </Statistic>
                    </Segment>
                </Segment.Group>
            </Grid.Column>
        </Grid>


        <Grid style={{marginTop: '.5em', marginBottom: '.5em'}}>
            <Grid.Column computer={8} mobile={16} tablet={8}>

                <Segment.Group raised fill>
                    <Segment><h4>Income Balance</h4></Segment>
                    <Segment align='center'>                                
                        <Statistic size='large' horizontal text>
                            <Statistic.Value>5,550</Statistic.Value>
                            <Statistic.Label>Fcfa</Statistic.Label>
                        </Statistic>
                    </Segment>
                </Segment.Group>

            </Grid.Column>
            <Grid.Column computer={4} mobile={8} tablet={8}>
                
                <Segment.Group raised>
                    <Segment><h4>Collaborators Aquired</h4></Segment>
                    <Segment>                                
                        <Progress value={dashboard_data.collaborators?.length || 0} total='15' progress='percent' success />
                    </Segment>
                </Segment.Group>
            </Grid.Column>
            <Grid.Column computer={4} mobile={8} tablet={3}>
                
                <Segment.Group raised>
                    <Segment><h4>Beneficiaries Aquired</h4></Segment>
                    <Segment >                                
                        <Progress value={dashboard_data.beneficiaries?.length || 0} total='25' progress='ratio' />
                    </Segment>
                </Segment.Group>
            </Grid.Column>
        </Grid>
        
        
        <Grid style={{marginTop: '.5em', marginBottom: '.5em'}}>
            <Grid.Column computer={12} mobile={16} tablet={8}>

                <Segment.Group raised >
                    <Segment><h4>Weekly new Beneficiaries </h4></Segment>
                    <Segment align='center'>
      <ResponsiveContainer width="100%" height={300}>
 
                        <BarChart
                            width={500}
                            height={300}
                            data={data}
                            margin={{
                                top: 5,
                                right: 30,
                                left: 20,
                                bottom: 5
                            }}
                            >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip content={<CustomTooltip />} />
                            <Legend />
                            <Bar dataKey="pv" barSize={20} fill="#8884d8" />
                        </BarChart>
                        </ResponsiveContainer>                        

                    </Segment>
                </Segment.Group>

            </Grid.Column>
            <Grid.Column computer={4} mobile={16} tablet={8}>
                
                <Segment.Group raised>
                    <Segment><h4>Campaigns</h4></Segment>
                    <Segment align='center'>                                
                        <Statistic size='tiny' text>
                            <Statistic.Value>1er Sem 2023</Statistic.Value>
                            <Statistic.Label>10 Beneficiaries</Statistic.Label>
                        </Statistic>
                    </Segment>
                </Segment.Group>
            </Grid.Column>
            
        </Grid>

            {/* <Message className="message-container" size="huge" secondary="true">
                <Header size="huge"> User Dashboard </Header>
                <p>This is a Protected Route</p>
                <p>Welcome {user ? user.email : ""}</p>
            </Message> */}
        </>
    )
}

export default UserDashboard;