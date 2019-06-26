import React, { Component } from 'react';

import { getJWTtoken } from '../../helpers/jwtHandler'
import axios from 'axios'
import { withRouter } from "react-router-dom";
import { ChangePassword } from '../PasswordManagementComponents/ChangePassword';

export class UserData extends Component {
    static displayName = UserData.name;

    constructor(props) {
        super(props);

        this.state = {
            email: '',
            firstName: '',
            lastName: '',

            enabledChangePasswordForm: false
        }
    }

    componentDidMount = () => {
        //localStorage.removeItem('jwt_token');
        //this.props.history.push('/');
        console.log(this.props);

            axios.get('api/User/GetUserData', {
                headers: {
                    Authorization: getJWTtoken()
                }
            }).then(result => {

                this.setState({
                    email: result.data.email,
                    firstName: result.data.firstName,
                    lastName: result.data.lastName
                });
            })
    }

    ShowChangePasswordForm = (e) => {
        e.preventDefault();
        this.setState({
            enabledChangePasswordForm: !this.state.enabledChangePasswordForm
        })
    }

    render() {
        return (
            <div style={{ marginTop: 30 }}>
                <div className="grid-x grid-padding-x" style={{ marginTop: 30 }}>
                    <div className="grid-container fluid callout translucent-form-overlay small-12 medium-6 large-4 cell">
                        <div className="text-center">
                            <h2>Dane użytkownika</h2>
                        </div>
                        <form>
                            <div className="grid-container">
                                <div>
                                    <label>Adres email</label>
                                    <input type="text" name="email" value={this.state.email} disabled />
                                    <label>Imię</label>
                                    <input type="text" name="firstName" value={this.state.firstName} disabled />
                                    <label>Nazwisko</label>
                                    <input type="text" name="lastName" value={this.state.lastName} disabled />
                                </div>
                                <div className="row">
                                    {!this.state.enabledChangePasswordForm ?
                                        <button className="button secondary float-center" style={{ marginBottom: 0 }} onClick={e => this.ShowChangePasswordForm(e)}>Zmień hasło</button>
                                        : null}
                                </div>
                            </div>
                        </form>
                    </div>
                </div>

                {this.state.enabledChangePasswordForm ?
                    <ChangePassword email={this.state.email} ShowChangePasswordForm={this.ShowChangePasswordForm} history={this.props.history} />
                    : null}
            </div>
        )
    }
}

export default withRouter(UserData);