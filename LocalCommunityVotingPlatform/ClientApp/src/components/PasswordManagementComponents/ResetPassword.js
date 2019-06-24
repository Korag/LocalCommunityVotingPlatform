import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from "react-router-dom";
import { NotificationManager } from 'react-notifications';
import { ValidationHandler } from "../../helpers/ValidationHandler";

class ResetPassword extends Component {
    static displayName = ResetPassword.name;
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            newPassword: '',
            confirmNewPassword: '',

            code: '',
            expectedCode: '',

            emailSent: false,

            formNotValid: false,
            validationErrors: []
        }
    }

    changeValue(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    ShowFormLogin = () => {
        console.log(this.props);
        this.props.history.push('/');
    }

    SendCode = (e) => {
        e.preventDefault();

        axios.get('api/User/GetResetPasswordCode',{
            headers: {
            },
                params: {
                    Email: this.state.email,
                }
        }).then(res => {
            this.setState({
                expectedCode: res.data.expectedCode,
                emailSent: true,

                formNotValid: false,
                validationErrors: []
            })
            NotificationManager.info('Na Twój adres email został wysłany kod autoryzujący', 'Resetowanie hasła');
        }).catch(err => {
                this.setState({
                    formNotValid: true,
                    validationErrors: err.response.data
            })
            NotificationManager.error('Nieudana próba wysłania wiadomości', 'Resetowanie hasła');
            })
    };

    ResetPassword = (e) => {
        e.preventDefault();

        axios.post("api/User/ResetUserPassword", null,
            {
                params: {
                    Code: this.state.code,
                    ExpectedCode: this.state.expectedCode,
                    Email: this.state.email,
                    NewPassword: this.state.newPassword,
                    ConfirmNewPassword: this.state.confirmNewPassword
                }
            }).then(res => {
                NotificationManager.success('Hasło zostało zmienione', 'Resetowanie hasła');
                this.props.history.push('/');
            }).catch(err => {
                this.setState({
                    formNotValid: true,
                    validationErrors: err.response.data
                })
                NotificationManager.error('Nieudana próba resetu hasła', 'Resetowanie hasła');
            })
    }

    render() {
        return (
            <div>
                <div className="text-center headerStyle">
                    <h1>Społeczność testowa</h1>
                </div>

                {!this.state.emailSent ? 
                    <div className="grid-x grid-padding-x" style={{ marginTop: 30 }}>
                        <div className="grid-container fluid callout translucent-form-overlay small-10 medium-6 large-4 cell">
                            <div className="text-center">
                                <h2>Resetuj hasło</h2>
                            </div>
                            <form onSubmit={e => this.SendCode(e)}>
                                <div className="grid-container">
                                    <div>
                                        <label>Adres email</label>
                                        <input type="text" name="email" onChange={e => this.changeValue(e)} value={this.state.email} />
                                    </div>
                                    <div className="row">
                                        <button className="button secondary float-center" style={{ marginBottom: 0 }} type="submit">Wyślij kod na podany email</button>
                                        <button className="button alert float-center" style={{ marginBottom: 0 }} onClick={this.ShowFormLogin}>Anuluj</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    :     
                    <div className="grid-x grid-padding-x" style={{ marginTop: 30 }}>
                        <div className="grid-container fluid callout translucent-form-overlay small-10 medium-6 large-4 cell">
                            <div className="text-center">
                                <h2>Resetuj hasło</h2>
                            </div>
                            <form onSubmit={e => this.ResetPassword(e)}>
                                <div className="grid-container">
                                    <div>
                                        <label>Kod wysłany na adres email</label>
                                        <input type="text" name="code" onChange={e => this.changeValue(e)} value={this.state.code} />
                                        <label>Nowe hasło</label>
                                        <input type="password" name="newPassword" onChange={e => this.changeValue(e)} value={this.state.newPassword} />
                                        <label>Powtórz nowe hasło</label>
                                        <input type="password" name="confirmNewPassword" onChange={e => this.changeValue(e)} value={this.state.confirmPassword} />
                                    </div>
                                    <div className="row">
                                        <button className="button secondary float-center" style={{ marginBottom: 0 }} type="submit">Zmień hasło</button>
                                        <button className="button alert float-center" style={{ marginBottom: 0 }} onClick={this.ShowFormLogin}>Anuluj</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
               }

                {this.state.formNotValid ?
                    <div className="grid-x grid-padding-x" style={{ marginTop: 20 }}>
                        <div className="grid-container fluid alert translucent-form-overlay small-12 medium-6 large-4 cell">
                            <h4 className="text-center">Wprowadzono błędne dane</h4>
                            <div className="grid-container">
                                <div className="alertValidation">
                                    <ValidationHandler fieldName={'Overall'} validationErrors={this.state.validationErrors} />
                                    <ValidationHandler fieldName={'Email'} validationErrors={this.state.validationErrors} />
                                    <ValidationHandler fieldName={'NewPassword'} validationErrors={this.state.validationErrors} />
                                    <ValidationHandler fieldName={'ConfirmNewPassword'} validationErrors={this.state.validationErrors} />
                                    <ValidationHandler fieldName={'Code'} validationErrors={this.state.validationErrors} />
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

export default withRouter(ResetPassword);