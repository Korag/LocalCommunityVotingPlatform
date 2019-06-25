import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from "react-router-dom";
import { getJWTtoken } from '../../helpers/jwtHandler';
import { ValidationHandler } from "../../helpers/ValidationHandler";
import { NotificationManager } from 'react-notifications';

export class ChangePassword extends Component {
    static displayName = ChangePassword.name;
    constructor(props) {
        super(props);

        this.state = {
            oldPassword: '',
            newPassword: '',
            confirmNewPassword: '',

            formNotValid: false,
            validationErrors: []
        }
    }

    changeValue(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    Rerender = () => {
        this.forceUpdate();
    }

    changePassword = async (e) => {
        e.preventDefault();

        axios.defaults.headers.common['Authorization'] = getJWTtoken();
        await axios.post("api/User/ChangeUserPassword", null,
            {
                params: {
                    Email: this.props.email,
                    OldPassword: this.state.oldPassword,
                    NewPassword: this.state.newPassword,
                    ConfirmPassword: this.state.confirmNewPassword
                }
            }).then(res => {
                console.log(this.props);
                localStorage.removeItem('jwt_token');
                this.ReloadApp();
            }).catch(err => {
                this.setState({
                    formNotValid: true,
                    validationErrors: err.response.data
                })
                NotificationManager.error('Nieudana próba zmiany hasła', 'Zmiana hasła');
            })
    };

    ReloadApp = () => {
        localStorage.removeItem('jwt_token');
        //window.history.pushState("", "", "/");
        //window.location.reload();
        this.props.history.push('/');
        NotificationManager.success('Hasło zostało zmienione', 'Zmiana hasła');
    }

    render() {
        return (
            <div>
                <div className="grid-x grid-padding-x" style={{ marginTop: 20 }}>
                    <div className="grid-container fluid callout translucent-form-overlay small-12 medium-6 large-4 cell">
                        <div className="text-center">
                            <h2>Zmiana hasła</h2>
                        </div>
                        <form onSubmit={e => this.changePassword(e)}>
                            <div className="grid-container">
                                <div>
                                    <label>Stare hasło</label>
                                    <input type="password" name="oldPassword" onChange={e => this.changeValue(e)} value={this.state.oldPassword} />
                                    <label>Nowe hasło</label>
                                    <input type="password" name="newPassword" onChange={e => this.changeValue(e)} value={this.state.newPassword} />
                                    <label>Powtórz nowe hasło</label>
                                    <input type="password" name="confirmNewPassword" onChange={e => this.changeValue(e)} value={this.state.confirmPassword} />
                                </div>
                                <div className="row">
                                    <button className="button secondary float-center" style={{ marginBottom: 0 }} type="submit">Zmień hasło</button>
                                    <button className="button alert float-center" style={{ marginBottom: 0 }} onClick={this.props.ShowChangePasswordForm} type="submit">Anuluj</button>
                                </div>
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
                                    <ValidationHandler fieldName={'OldPassword'} validationErrors={this.state.validationErrors} />
                                    <ValidationHandler fieldName={'NewPassword'} validationErrors={this.state.validationErrors} />
                                    <ValidationHandler fieldName={'ConfirmPassword'} validationErrors={this.state.validationErrors} />
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

export default withRouter(ChangePassword);