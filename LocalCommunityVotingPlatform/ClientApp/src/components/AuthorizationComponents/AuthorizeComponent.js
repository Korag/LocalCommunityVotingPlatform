import React, { Component } from 'react';
import { getJWTtoken } from '../../helpers/jwtHandler'
import { withRouter } from 'react-router-dom'
import axios from 'axios'

import { Login } from './Login';
import { Layout } from '../NavigationComponents/Layout';

class AuthorizeComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            authorized: null,
            performedLogin: false,

            SuperUser: false,
            communityName: ''
        };
    }

    componentDidMount = () => {
       this.GetCommunityName();
       this.CheckIfAuthorized()
    }

    GetCommunityName = () => {
        axios.get('api/User/GetCommunityName', {
            headers: {
            },
            params: {
            }
        }).then(result => {
            this.setState({
                communityName: result.data,
            });
        })
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
                SuperUser: res.data,
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
        if (this.state.authorized === true)
        {
            return (<Layout Logout={this.Logout} CommunityName={this.state.communityName} SuperUser={this.state.SuperUser}/>);
        }
        else {
            return (<Login callBack={this.CheckIfAuthorized} CommunityName={this.state.communityName} history={this.props.history} />);
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