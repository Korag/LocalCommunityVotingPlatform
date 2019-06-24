import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios';
import { withRouter } from "react-router-dom";
import { NotificationManager } from 'react-notifications';
import { ValidationHandler } from "../../helpers/ValidationHandler";

export class Login extends Component {
    static displayName = Login.name;
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',

            formNotValid: false,
            validationErrors: [],

            showResetPassword: false
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
            NotificationManager.success('Pomyślnie zalogowano', 'Logowanie');
        }).catch(err => {
            this.setState({
                formNotValid: true,
                validationErrors: err.response.data
            })
            NotificationManager.error('Nieudana próba logowania', 'Logowanie');
        })
    }

    Rerender = () => {
        this.forceUpdate();
    }

    ResetPassword = () => {
        this.props.history.push('/resetpassword');
    }

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
                    null}

           </div>
        );
    }
}

export default withRouter(Login);