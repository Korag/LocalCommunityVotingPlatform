﻿import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from "react-router-dom";
import { getJWTtoken } from '../../helpers/jwtHandler'

const buttonStyle = {
    "marginBottom": '0px',
};

const inlineBlock = {
    "display": 'inline-block',
    "fontSize": "20px"
};

const h1 = {
    "background": "rgb(9,30,121)",
    "background": "linear-gradient(90deg, rgba(9,30,121,0.9023984593837535) 5%, rgba(97,159,237,0.7035189075630253) 50%, rgba(9,30,121,0.8995973389355743) 95%)",
    "fontSize": "24px",
    "color": "white"
};

export class ChangePassword extends Component {
    static displayName = ChangePassword.name;
    constructor(props) {
        super(props);

        this.state = {
            oldPassword: '',
            newPassword: '',
            confirmNewPassword: '',
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
            });
    };

    ReloadApp = () => {
        window.history.pushState("", "", "/");
        window.location.reload();
    }

    render() {
        return (
            <div>
                <div className="grid-x grid-padding-x" style={{ marginTop: 30 }}>
                    <div className="grid-container fluid callout translucent-form-overlay small-10 medium-6 large-4 cell">
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
                                    <button className="button secondary float-center" style={buttonStyle} type="submit">Zmień hasło</button>
                                    <button className="button alert float-center" style={buttonStyle} onClick={this.props.ShowChangePasswordForm} type="submit">Anuluj</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(ChangePassword);