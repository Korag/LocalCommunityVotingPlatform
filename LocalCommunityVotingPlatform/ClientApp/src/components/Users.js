import React, { Component } from 'react';
//import { UsersTable } from './UsersTable';
import { UsersTable } from './UsersTable';

export class Users extends Component {
    static displayName = Users.name;

    render() {
        return <div style={{ marginTop: 30 }}>
             <UsersTable/>
            </div>
    }
}