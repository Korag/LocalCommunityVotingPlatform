import React, { Component } from 'react';
import { getJWTtoken } from '../helpers/jwtHandler'
import { withRouter, Route, Router } from 'react-router-dom'
import axios from 'axios'

import { Login } from './Login';
import { Layout } from './Layout';

class AuthorizeComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            authorized: null,
            performedLogin: false
        };
    }

    componentDidMount = () => {
        this.CheckIfAuthorized()
    }

    CheckIfAuthorized = () => {
        const token = getJWTtoken();

        if (!token) {
            this.setState({
                authorized: false
            });
        }

        axios.get('api/Account/Authorize/', {
            headers: {
                Authorization: token
            }
        }).then(res => {
            this.setState({
                authorized: true
            });
        }
        ).catch(err => {
            localStorage.removeItem('jwt_token');
            this.setState({
                authorized: false
            });
        });

        console.log(this.state.authorized)
    }

    Logout = () => {
        localStorage.removeItem('jwt_token');
        this.setState({
            authorized: false
        });
    }

    RerenderTest = () => {
        this.forceUpdate();
    }

    resolveAuthorization = () => {
    
        if (this.state.authorized == true)
        {
            return (<Layout Logout={this.Logout}/>);
        }
        else {
            return (<Login callBack={this.CheckIfAuthorized} />);
        }
    }

    render() {
        return (
            <div>
                {this.resolveAuthorization()}
            </div>
        )
    };
}

export default withRouter(AuthorizeComponent);