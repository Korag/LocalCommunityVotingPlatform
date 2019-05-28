import React, { Component } from 'react';
//import { UsersTable } from './UsersTable';
import { UsersTable } from './UsersTable';
import { UpdateUser } from './UpdateUser';
import { AddUser } from './AddUser'

import axios from 'axios'
import { getJWTtoken } from '../helpers/jwtHandler'


export class Users extends Component {
    static displayName = Users.name;

    constructor(props) {
        super(props);

        this.state = {
            showList: true,
            userEmail: '',
            addUserReq: false,
            refreshNeeded: false,
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

    ShowFormAddUser = () => {
        console.log("jestem");
        this.setState({
            addUserReq: !this.state.addUserReq,
        })
    }

    RefreshComponent = () => {
        this.setState({
            refreshNeeded: !this.state.refreshNeeded
        });
    }

    Delete = (userEmailFromButton) => {

        axios.defaults.headers.common['Authorization'] = getJWTtoken();
        axios.post('/api/User/DeleteUser', null,
            {
                params:
                {
                    email: userEmailFromButton
                }
            }).then(res => {
                this.RefreshComponent()
            });
    }

    render() {
        if (this.state.addUserReq == false) {
            return <div style={{ marginTop: 30 }}>
                {this.state.showList
                    ? <UsersTable ShowFormEdit={this.ShowFormEdit} Delete={this.Delete} ShowFormAddUser={this.ShowFormAddUser} refreshNeeded={this.state.refreshNeeded} RefreshComponent={this.RefreshComponent} />
                    : <UpdateUser ShowFormEdit={this.ShowFormEdit} userEmail={this.state.userEmail} />
                }
            </div>
        }
        else {
            return <div style={{ marginTop: 30 }}>
                <AddUser ShowFormAddUser={this.ShowFormAddUser} />
            </div>
        }
    }
}