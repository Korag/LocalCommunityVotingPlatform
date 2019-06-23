﻿import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios';
import { withRouter } from "react-router-dom";

import { ValidationHandler } from "../../helpers/ValidationHandler"

export class Login extends Component {
    static displayName = Login.name;
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',

            formNotValid: false,
            validationErrors: []

        }
    }

    changeValue(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    login = async (e) => {
        this.props.callBack();
        e.preventDefault();
        await axios.post('/api/Account/Login', {
            Email: this.state.email,
            Password: this.state.password
        }).then(res => {
            localStorage.setItem('jwt_token', res.data);
            this.props.callBack();
        }).catch(err => {
            this.setState({
                formNotValid: true,
                validationErrors: err.response.data
                //validationMessage: err.response.data
            }),
                console.log(err.response);
                console.log(this.state.validationErrors);
        });
    }

    Rerender = () => {
        this.forceUpdate();
    }

    //validateForm = (e) => {
    //    if (this.state.password.length >= 6
    //        && this.state.email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
    //        this.setState({ formNotValid: false })
    //        this.login(e);
    //    }
    //    else {
    //        this.setState({ formNotValid: true }),
    //            console.log(this.state.formNotValid)
    //    }
    //}

    //ResolveValidationErrors = () => {
    //    //Get the keys in data.content. This will return ['people', 'pets']
    //    var contentKeys = Object.keys(this.state.validationMessage);

    //    //Now start iterating through these keys and use those keys to
    //    //retrieve the underlying arrays and then extract the name field
    //    var allNames = contentKeys.map((t) =>
    //        this.state.validationMessage[t].map((e) => (<div>{e}</div>))
    //    );

    //    return (<div>{allNames}</div>)
    //}

    //ResolveValidationErrors3 = () => {
    //    let string = [];
    //    for (var key in this.state.validationErrors) {

    //            console.log(this.state.validationErrors);
       
    //    for (let error in this.state.validationErrors.key) {
    //        console.log(this.state.validationErrors.key[error]);
    //    }
    //    }


    //}

    //ResolveValidationErrors2 = () => {

    //    let validationErrors = this.state.validationErrors;
    //    let fieldName = 'Email';

    //    if (!validationErrors) {
    //        return null
    //    }

    //    if (!validationErrors[fieldName]) {
    //        return null
    //    }

    //    return (<div className='errors-container'>
    //        <ul>
    //            {validationErrors[fieldName].map(error => <li>{error}</li>)}
    //        </ul>
    //    </div>)
    //}

    render() {
        return (
            <div>
                <div className="text-center headerStyle">
                    <h1>Społeczność testowa</h1>
                </div>
                <div className="grid-x grid-padding-x" style={{ marginTop: 30 }}>
                    <div className="grid-container fluid callout translucent-form-overlay small-10 medium-6 large-4 cell">
                        <div className="text-center">
                            <h2>Logowanie</h2>
                        </div>
                        <form onSubmit={e => this.login(e)}>
                            <div className="grid-container">
                                <div>
                                    <label><span><FontAwesomeIcon icon="envelope" /></span> Adres email</label>
                                    <input type="text" name="email" onChange={e => this.changeValue(e)} value={this.state.email} />

                                    <label><span><FontAwesomeIcon icon="key" /></span> Hasło</label>
                                    <input type="password" name="password" onChange={e => this.changeValue(e)} value={this.state.password} />
                                </div>
                                <div>
                                    <button className="button secondary float-center" style={{ marginBottom: 0 }} type="submit">Zaloguj</button>
                                </div>
                                <button className="button warning" style={{ marginTop: 10, marginBottom: 0 }} onClick={e => this.ResetPassword(e)}>Zapomniałem hasła</button>
                            </div>
                        </form>
                    </div>
                </div>

                {this.state.formNotValid ?
                    <div className="grid-x grid-padding-x" style={{ marginTop: 20 }}>
                        <div className="grid-container fluid alert translucent-form-overlay small-10 medium-6 large-4 cell">
                            <h4 className="text-center">Wprowadzono błędne dane</h4>
                            <div className="grid-container">
                                <div className="alertValidation">
                                    <ValidationHandler fieldName={'Overall'} validationErrors={this.state.validationErrors} />
                                    <ValidationHandler fieldName={'Email'} validationErrors={this.state.validationErrors} />
                                    <ValidationHandler fieldName={'Password'} validationErrors={this.state.validationErrors} />
                                </div>
                            </div>
                        </div>
                    </div>
                    :
                    null};

                </div>
        );
    }
}

export default withRouter(Login);