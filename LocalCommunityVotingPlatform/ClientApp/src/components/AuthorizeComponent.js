import React, { Component } from 'react';
import { getJWTtoken } from '../helpers/jwtHandler'
import { withRouter } from 'react-router-dom'
import axios from 'axios'

class AuthorizeComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userRole: null
        };
    }

    componentDidMount() {
        const token = getJWTtoken();
        if (!token) {
            this.props.history.push('/Login');
        }

        axios.get('/getUserRole/', {
            headers: {
                Authorization: token
            }
        }).then(res => this.setState({
            userRole: res.data
        })).catch(err => {
            localStorage.removeItem('jwt_token');
            this.props.history.push('/Login');
        });
    }

    render() {
        if (this.state.userRole === null) {
            return (
                < div > <h1>Waiting for api action..</h1></div>
            );
        }
        if (this.state.userRole == "Admin") {
            // return admin component
        }
        else {
            // return user component
        }
    };

}

export default withRouter(AuthorizeComponent);