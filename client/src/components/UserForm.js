
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Button, Form, Message, Segment, Label, } from 'semantic-ui-react';
import { Field, reduxForm } from "redux-form";
import { clearErrors } from "../actions/authActions";
// import { getUserRoles } from '../services/UserRoleServices/UserRoleServices';
// const setIsLoading = ( ) => {
//     console.log('loading data...', )
// }
const UserForm = (props) => {

    const error = useSelector(state => state.errors);
    const [errorMessage, setErrorMessage] = useState("");
    // const [user_roles, setUserRoles] = useState([])

    const dispatch = useDispatch();

    useEffect(() => {

        if (error.message) {
            setErrorMessage(error.message)
            dispatch(clearErrors())
        }
        (async () => {
        //   await loadUserRoles()
        })()
    }, [error])

    // const loadUserRoles = async () => {        
    //     const response = await dispatch(getUserRoles(setErrorMessage, setErrorMessage, setIsLoading));
    //     // console.log('response', response)
    //     setUserRoles(response.data) 
    // }

    return (
        <>

            <Form onSubmit={props.handleSubmit(props.onSubmit)} size='large'>

                <Segment>
                                    
                    {/* {user_roles?.length > 0 && <Form.Field
                            name='role_id'
                            control={Select}
                            options={user_roles.map(user_role=>{user_role.key = user_role._id.toString(); user_role.value = user_role._id.toString(); user_role.text = `${user_role.name}`; return user_role})}
                            label={{ children: 'User Role', htmlFor: 'form-select-control-role_id' }}
                            placeholder='User Role'
                            search
                            searchInput={{ id: 'form-select-control-role_id' }}
                        />} */}


                    <Field
                        name="email"
                        component={renderInput}
                        label="E-mail address"
                    />
                    {errorMessage ? <Label className="alertMssg" basic color='red'>{errorMessage}</Label> : ""}
                    <Field
                        name="password"
                        component={renderInput}
                        label="Password"
                    />
                    <Button secondary fluid size='large'>
                        {props.buttonText}
                    </Button>
                </Segment>
            </Form>
            <Message>
                {props.renderMessage()}
            </Message>
        </>
    )
}

const renderInput = ({ input, label }) => {

    return (

        <div className="field">
            <div className="ui fluid left icon input">
                <input {...input} autoComplete="off" placeholder={label} type={`${input.name === "email" ? "text" : "password"}`} />
                <i aria-hidden="true" className={`${input.name === "email" ? "user" : "lock"} icon`}></i>
            </div>
        </div>

    )
}


export default reduxForm({
    form: "userform"
})(UserForm)