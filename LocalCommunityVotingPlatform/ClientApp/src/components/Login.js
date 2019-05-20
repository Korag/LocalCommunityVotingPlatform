import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios';
import { withRouter } from "react-router-dom";

const buttonStyle = {
    "marginBottom": '0px',
};

const inlineBlock = {
    "display": 'inline-block',
    "font-size": "20px"
};

export class Login extends Component {
    static displayName = Login.name;
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: ''
        }
    }

    changeValue(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    login(e) {
        e.preventDefault();
        axios.post('/api/Login', {
                Email: this.state.email,
                Password: this.state.password
        }).then(res => {
            localStorage.setItem('jwt_token', res.data),
                this.props.history.push('/counter');
        });
    }

    render() {
        return (
            <div className="grid-x grid-padding-x">
                <div className="grid-container fluid callout translucent-form-overlay small-12 medium-6 cell">
                    <div className="text-center">
                        <h1>Logowanie</h1>
                    </div>
                    <form onSubmit={e=> this.login(e)}>
                        <div className="grid-container">
                            <div>
                                <label><span><FontAwesomeIcon icon="envelope" /></span> Adres email</label>
                                <input type="text" name="email" onChange={e => this.changeValue(e)} value={this.state.email} />

                                <label><span><FontAwesomeIcon icon="key" /></span> Hasło</label>
                                <input type="password" name="password" onChange={e => this.changeValue(e)} value={this.state.password}/>
                            </div>
                            <div>
                                <button className="button secondary float-center" style={buttonStyle} type="submit">Zaloguj</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default withRouter(Login);