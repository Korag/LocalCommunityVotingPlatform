import React, { Component } from 'react';
import { getJWTtoken } from '../../helpers/jwtHandler'
import { withRouter, Route, Router } from 'react-router-dom'
import axios from 'axios'

import { Login } from './Login';
import { Layout } from '../NavigationElements/Layout';

class AuthorizeComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            authorized: null,
            performedLogin: false,
            SuperUser: false
        };
    }

    componentDidMount = () => {
       this.CheckIfAuthorized()
    }

    CheckIfAuthorized = async() => {
        const token = getJWTtoken();

        if (!token) {
            this.setState({
                authorized: false,
                loading: false
            });
        }

        await axios.get('api/Account/Authorize/', {
            headers: {
                Authorization: token
            }
        }).then(res => {
            this.setState({
                authorized: true,
                SuperUser: res,
                loading: false
            });
        }
        ).catch(err => {
            localStorage.removeItem('jwt_token');
            this.setState({
                authorized: false,
                SuperUser: false,
                loading: false
            });
        });

        await console.log(this.state.authorized)
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
            return (<Layout Logout={this.Logout} SuperUser={this.state.SuperUser}/>);
        }
        else {
            return (<Login callBack={this.CheckIfAuthorized} />);
        }
    }

    render() {
        return (
            <div>
                {this.state.loading ? 
                 <div><p></p></div>
                    : this.resolveAuthorization()}
            </div>
        )
    };
}

export default withRouter(AuthorizeComponent);