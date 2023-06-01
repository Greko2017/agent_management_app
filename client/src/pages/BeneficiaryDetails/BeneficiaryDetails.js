
import React, { useEffect, useState } from 'react'
import {  useDispatch, useSelector } from "react-redux";
import { Button, Message,GridColumn,GridRow,  Header, HeaderContent} from "semantic-ui-react";
import {  useParams } from 'react-router-dom'
import { getBeneficiaryById, deleteBeneficiary } from '../../services/BeneficiaryServices/BeneficiaryServices';
import BeneficiaryForm from '../../components/BeneficiaryForm';
import { getInstallments } from '../../services/InstalmentServices/InstalmentServices';
import { getCenters } from '../../services/CenterServices/CenterServices';
import { getBeneficiaryInstalmentHistoriesByBeneficiaryId } from '../../services/BeneficiaryInstalmentHistoryServices/BeneficiaryInstalmentHistoryServices';
import BeneficiaryInstalmentHistoryTable from '../../components/BeneficiaryInstalmentHistoryTable';
import axios from 'axios';
import { saveAs } from 'file-saver';
import {generateName} from '../../utils/tools'
import history from "../../history"
function BeneficiaryDetails() {
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [beneficiary, setBeneficiary] = useState({});  
    const [installments, setInstallments] = useState([]);  
    const [centers, setCenters] = useState([]);  
    const [beneficiary_instalment_histories, setBeneficiaryInstalmentHistories] = useState([]);  

    const {role, permissions} = useSelector(state => state.auth);
    const [permission, setPermission] = useState({})

    const { beneficiary_id } = useParams() 
    const dispatch = useDispatch();   

    useEffect(() => {
        let _permission = {}
        if (permissions instanceof Array) {
          _permission = permissions.filter(i => i.module_name === "beneficiaries")[0]
          setPermission(_permission)
        }
        
        (async () => {
            console.log('history', history)
          await loadBeneficiary()
          await loadInstallments()
          await loadCenters()
          await loadBeneficiaryInstalmentHistory()
        })()
       // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const loadBeneficiary = async () => {        
        const response = await dispatch(getBeneficiaryById(beneficiary_id, setErrorMessage, setSuccessMessage, setIsLoading));
        // console.log('response', response)
        setBeneficiary(response.data) 
    }

    const loadCenters = async () => {        
        const response = await dispatch(getCenters(setErrorMessage, setSuccessMessage, setIsLoading));
        setCenters(response.data) 
    }


    const loadInstallments = async () => {        
        const response = await dispatch(getInstallments(setErrorMessage, setSuccessMessage, setIsLoading));
        setInstallments(response.data)       
    }

    
    const loadBeneficiaryInstalmentHistory = async () => {        
        const response = await dispatch(getBeneficiaryInstalmentHistoriesByBeneficiaryId(beneficiary_id, setErrorMessage, setSuccessMessage, setIsLoading));
        setBeneficiaryInstalmentHistories(response.data)       
    }

    const handleDelete = async () => {
        await dispatch(deleteBeneficiary(beneficiary_id, setErrorMessage, setSuccessMessage, setIsLoading));
        // console.log('response', response)
    }
    const handleGeneratePdfInvoice = async () => {
        let invoice_seq = generateName('INV');
        setIsLoading(true)
        axios.post('/invoice/create-pdf', {invoice_seq, installments: beneficiary_instalment_histories, beneficiary})
        .then(() => axios.get(`/invoice/fetch-pdf/${invoice_seq}`, { responseType: 'blob' }))
        .then((res) => {
        const pdfBlob = new Blob([res.data], { type: 'application/pdf' });

        saveAs(pdfBlob, `${invoice_seq}.pdf`);
        setIsLoading(false)
        }).catch(err=>{
            setIsLoading(false)
            setErrorMessage(err.Message)
        })
    }
  return (
    <>
    {errorMessage ? <Message className="alertMssg" basic='true' color='red'> {errorMessage} </Message> : ""}
    
    {successMessage ? <Message className="alertMssg" basic='true' color='green'> {successMessage} </Message> : ""}
    
        <GridColumn equals>
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
                            form='beneficiary-form'
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
                                content='Invoice'

                                labelPosition='right'
                                onClick={handleGeneratePdfInvoice}
                                icon='file pdf'
                                primary
                                />
                                ):null}
                                

                                {role && (role.name === 'collaborator' || role.name === 'elite')? (
                                    <>

                            {!beneficiary.is_collaborator ? <Button
                                loading={isLoading}
                                disabled={isLoading}
                                content='Promote'

                                labelPosition='right'
                                onClick={handleDelete}
                                icon='thumbs up'
                                primary
                                /> : <Button
                                loading={isLoading}
                                disabled={isLoading}
                                content='thumbs down'

                                labelPosition='right'
                                onClick={handleDelete}
                                icon='cancel'
                                negative
                                />}

                                </>
                                ):null} 
                                
                        </div>
                    
                </Message>
            </GridRow>
            <GridRow>
            </GridRow>
        </GridColumn>
    <Message>
        {Object.keys(beneficiary || {}).length >0 ? <BeneficiaryForm  installments={installments} centers={centers}  loadBeneficiary={loadBeneficiary} isLoading={isLoading} setIsLoading={setIsLoading} parent={beneficiary.parent} beneficiary={beneficiary} is_edit={true} /> : 
            <Message className="alertMssg" basic='true' > {'Lead data could not be load, please if refresh the page or contact the support'} </Message>
        }
    </Message>

    
    <Message>
        <Header>
            {beneficiary ? <HeaderContent>{`${beneficiary.first_name}'s Installments Histories`}</HeaderContent> : <HeaderContent>{`Here you can manage to instalment history of a beneficiary`}</HeaderContent>}
        </Header>
        <p>List of the beneficiary History</p>
    </Message>
    <Message>
        <BeneficiaryInstalmentHistoryTable beneficiary={beneficiary} beneficiary_instalment_history={beneficiary_instalment_histories} loadBeneficiaryInstalmentHistory={loadBeneficiaryInstalmentHistory} beneficiary_instalment_histories={beneficiary_instalment_histories} parent={{}}  isLoading={isLoading} setIsLoading={setIsLoading}  />
    </Message>

    </>
  )
}

export default BeneficiaryDetails