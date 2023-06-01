import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { Button, Message,GridColumn,GridRow, Icon} from "semantic-ui-react";
import { Link, useParams } from 'react-router-dom'
import { getRewardLineById, deleteRewardLine } from '../../services/RewardLineServices/RewardLineServices';
import RewardLineForm from '../../components/RewardLineForm';
import { getRewards } from '../../services/RewardServices/RewardServices';
import history from "../../history"

function RewardLineDetails() {
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [reward_line, setRewardLine] = useState({});  
    const [rewards, setRewards] = useState([]);  

    const { reward_line_id } = useParams() 
    const dispatch = useDispatch();   

    useEffect(() => {
        (async () => {
          await loadRewardLine()
          await loadRewards()
        })()
       // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const loadRewardLine = async () => {        
        const response = await dispatch(getRewardLineById(reward_line_id, setErrorMessage, setSuccessMessage, setIsLoading));
        // console.log('response', response)
        setRewardLine(response.data) 
    }

    const loadRewards = async () => {        
        const response = await dispatch(getRewards(setErrorMessage, setSuccessMessage, setIsLoading));
        setRewards(response.data) 
    }
  
    const handleDelete = async () => {
        await dispatch(deleteRewardLine(reward_line, setErrorMessage, setSuccessMessage, setIsLoading));
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
                        form='reward_line-form'
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
        {Object.keys(reward_line || {}).length >0 ? <RewardLineForm rewards={rewards} loadRewardLine={loadRewardLine} isLoading={isLoading} setIsLoading={setIsLoading} reward_line={reward_line} is_edit={true} /> : 
            <Message className="alertMssg" basic='true' > {'Lead data could not be load, please if refresh the page or contact the support'} </Message>
        }
    </Message>
    </>
  )
}

export default RewardLineDetails