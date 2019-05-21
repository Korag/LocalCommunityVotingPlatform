import React, { Component } from 'react';
import { MDBDataTable } from 'mdbreact';
import { getJWTtoken } from '../helpers/jwtHandler';

export class UsersTable extends Component {
    static displayName = UsersTable.name;

    constructor(props) {
        super(props);

        this.state = {
            data: {
                columns: [
                    {
                        label: 'Adres e-mail',
                        field: 'email',
                        sort: 'asc',
                        width: 200
                    },
                    {
                        label: 'Imię',
                        field: 'firstName',
                        sort: 'asc',
                        width: 200
                    },
                    {
                        label: 'Nazwisko',
                        field: 'lastName',
                        sort: 'asc',
                        width: 200
                    },
                    {
                        label: 'Rola',
                        field: 'role',
                        sort: 'asc',
                        width: 200
                    }
                ],
                rows: []
            }
        }
    }

    componentDidMount = () => {
        this.downloadUsers();
    }

    downloadUsers() {
        let data = Object.assign({}, this.state.data);

        fetch('api/GetUsers', {
            headers: {
                Authorization: getJWTtoken()
            }
        })
            .then(response => response.json())
            .then(result => {
                console.log(result);
                data.rows = result;
                this.setState({ data });
            })
    }

    render() {
        return (
            <MDBDataTable
                striped
                bordered
                hover
                data={this.state.data}
            />
        );
    }
}

export default UsersTable;