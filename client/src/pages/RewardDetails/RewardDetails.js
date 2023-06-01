import React, { useEffect, useState } from 'react'
import { useDispatch } from "react-redux";
import { Button, Message,GridColumn,GridRow, Icon, HeaderContent, Segment, Header} from "semantic-ui-react";
import { Link, useParams } from 'react-router-dom'
import { getRewardById, deleteReward, getRewards } from '../../services/RewardServices/RewardServices';
import RewardForm from '../../components/RewardForm';
import { getRewardLinesByParentId } from '../../services/RewardLineServices/RewardLineServices'
import RewardLineTable from '../../components/RewardLineTable'
import history from "../../history"

function RewardDetails() {
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [reward, setReward] = useState({});  
    const [reward_lines, setRewardLines] = useState([])
    const [rewards, setRewards] = useState([]);  

    const { reward_id } = useParams() 
    const dispatch = useDispatch();   

    useEffect(() => {
        (async () => {
          await loadReward()
          await loadRewards()
          await loadRewardLines()
        })()
       // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const loadRewards = async () => {        
        const response = await dispatch(getRewards(setErrorMessage, setSuccessMessage, setIsLoading));
        setRewards(response.data) 
    }
  
    const loadReward = async () => {        
        const response = await dispatch(getRewardById(reward_id, setErrorMessage, setSuccessMessage, setIsLoading));
        // console.log('response', response)
        setReward(response.data) 
    }

    const loadRewardLines = async () => {        
        const response = await dispatch(getRewardLinesByParentId(reward_id, setErrorMessage, setSuccessMessage, setIsLoading));
        // console.log('response', response)
        setRewardLines(response.data) 
    }

    const handleDelete = async () => {
        await dispatch(deleteReward(reward_id, setErrorMessage, setSuccessMessage, setIsLoading));
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

                    <Button
                        loading={isLoading}
                        disabled={isLoading}
                        content='Edit'
                        labelPosition='right'
                        form='reward-form'
                        icon='edit'
                        positive
                        />
                        <Button
                            loading={isLoading}
                            disabled={isLoading}
                            content='Delete'

                            labelPosition='right'
                            onClick={handleDelete}
                            icon='cancel'
                            negative
                            />
                </Message>
            </GridRow>
            <GridRow>

            </GridRow>
        </GridColumn>
    <Message>
        {Object.keys(reward || {}).length >0 ? <RewardForm loadReward={loadReward} isLoading={isLoading} setIsLoading={setIsLoading} reward={reward} is_edit={true} /> : 
            <Message className="alertMssg" basic='true' > {'Reward data could not be load, please if refresh the page or contact the support'} </Message>
        }
    </Message>

    
    <Message>
        <Header>
            {reward ? <HeaderContent>{`${reward?.name}'s RewardLines`}</HeaderContent> : <HeaderContent>{`Reward with this Id doesn't exist`}</HeaderContent>}
        </Header>
        <p>List of the Reward Lines</p>
    </Message>

    <Segment.Group color='grey' loading={isLoading.toString()}>
         <RewardLineTable  rewards={rewards} reward_lines={reward_lines} loadRewardLines={loadRewardLines}  parent={reward}  isLoading={isLoading} setIsLoading={setIsLoading}  />
    </Segment.Group>

    </>
  )
}

export default RewardDetails