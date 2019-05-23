import React, { Component } from 'react';
import { MDBDataTable, MDBInput, MDBBtn } from 'mdbreact';
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
                    },
                    {
                        label: 'Edytuj',
                        field: 'edit',
                        sort: 'asc',
                        width: 150
                    }
                    ,
                    {
                        label: 'Usuń',
                        field: 'delete',
                        sort: 'asc',
                        width: 150
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

                for (var i = 0; i < data.rows.length; i++) {
                    var singleEmail = data.rows[i].email;
                    data.rows[i].edit = <MDBBtn label="Update" className="button tiny success" onClick={() => this.props.ShowFormEdit(singleEmail)} style={{ marginBottom: 0 }}>Edytuj</MDBBtn>
                    data.rows[i].delete = <MDBBtn label="Delete" className="button tiny alert" onClick={() => this.props.Delete(singleEmail)} style={{ marginBottom: 0 }}>Usuń</MDBBtn>
                }

                //data.rows.push(
                //    {
                //        email: "l.czepielik@gmail.com",
                //        firstName: "Łukasz",
                //        lastName: "Czepielik",
                //        role: "Admin",
                //        edit: <MDBBtn label="Check" className="button tiny success" style={{ marginBottom: 0}}>Edytuj</MDBBtn>
                //    });

                this.setState({ data });
            })
    }

    render() {
        return (
            <div>
                <div className="row">
                    <button className="button float-left" onClick={() => this.props.ShowFormAddUser()}>Dodaj nowego użytkownika</button>
                </div>
                <MDBDataTable
                    responsive
                    striped
                    bordered
                    hover
                    data={this.state.data}
                />
            </div>
        );
    }
}

export default UsersTable;