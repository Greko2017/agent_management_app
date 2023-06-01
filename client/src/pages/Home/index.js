import React, { useEffect } from 'react'
import { Header, Message, Button, Icon, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import RewardWidget from '../../components/RewardWidget'
import PolicyModal from '../../components/PolicyModal';
export const Home = () => {
    // access to the isAuthenticated property from the auth reducer state
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
    const user = useSelector(state => state.auth.currentUser);
    // const state = useSelector(state=> state)
    // useEffect(() => {
    //   console.log('-- Home user:', user)
    //   console.log('-- Home state:', state)
    // }, [])
    
    const showLoginBtn = () => {
        if (!isAuthenticated) {
            return (
                <Button color="black" animated secondary>
                    <Button.Content visible>Login</Button.Content>
                    <Button.Content hidden>
                        <Icon name='arrow right' />
                    </Button.Content>
                </Button>
            )
        }
    }

    return (
        <div>
            <Message className="message-container" size="huge" secondary="true">
                <Image  size='small' rounded wrapped src='/images/logo.png' />
                <hr/>
                <Header size="medium"> Optimal Healthcare Mission by (LFD)-Services Present... </Header>
                <Header size="huge">(ETA) Hybrid (ECHO) Platform</Header>

                <p style={{ margin: "5px 0 25px" }}>This App aim to digitalized the the flow to reward agents and evaluate their performances.
                {/* <br/>
                It is a complete restful and serverless application. */}</p>
                <Link to="/login">
                    {showLoginBtn()}
                </Link>

            </Message>
            <Message style={{textAlign:'center'}} size="small" secondary="true">
                
            {/* <Link to='/policies'>Policies</Link> */}
            <PolicyModal />
            </Message>
            {isAuthenticated && user.is_elite ? (
                <RewardWidget />
            ) : (
                <></>
            )}

        </div>
    )
};

export default Home;
