import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios';
import { withRouter } from "react-router-dom";

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

export class Login extends Component {
    static displayName = Login.name;
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            formNotValid: 'false'
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
            if (res.data != "Login attempt failed") {
                localStorage.setItem('jwt_token', res.data);
                this.props.callBack();
            }
        });
    }

    Rerender = () => {
        this.forceUpdate();
    }

    validateForm = (e) => {
        if (this.state.password.length >= 6
            && this.state.email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
            this.setState({ formNotValid: false })
            this.login(e);
        }
        else {
            this.setState({ formNotValid: true }),
                console.log(this.state.formNotValid)
        }
    }

    render() {
        return (
            <div>
                <div className="text-center" style={h1}>
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
                                    <button className="button secondary float-center" style={buttonStyle} type="submit">Zaloguj</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(Login);