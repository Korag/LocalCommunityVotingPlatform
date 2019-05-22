﻿import React, { Component } from 'react';
//import { UsersTable } from './UsersTable';
import { UsersTable } from './UsersTable';
import { UpdateUser } from './UpdateUser';

import axios from 'axios'
import { getJWTtoken } from '../helpers/jwtHandler'

export class Users extends Component {
    static displayName = Users.name;

    constructor(props) {
        super(props);

        this.state = {
            showList: true,
            userEmail: ''
        }
    }


    ShowFormEdit = (userEmailFromButton) => {
        this.setState({
            showList: !this.state.showList,
            userEmail: userEmailFromButton
        })          
        console.log(userEmailFromButton);
        console.log(this.state.userEmail)
    }


    Delete = (userEmailFromButton) => {
        
        axios.post('/api/DeleteUser', {
            headers: {
                Authorization: getJWTtoken()
            },
            email: this.state.userEmail
        }).then(res => this.ShowFormEdit(userEmailFromButton));
    }

    render() {
        return <div style={{ marginTop: 30 }}>
            {this.state.showList ? <UsersTable ShowFormEdit={this.ShowFormEdit} Delete
                ={this.Delete} /> : <UpdateUser ShowFormEdit={this.ShowFormEdit} userEmail={this.state.userEmail} />}
            </div>
    }
}