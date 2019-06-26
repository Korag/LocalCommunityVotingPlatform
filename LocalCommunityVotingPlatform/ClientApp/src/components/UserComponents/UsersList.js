import React, { Component } from 'react';
import { MDBDataTable, MDBBtn } from '../../modifiedNpmPackages/mdbreact/dist/mdbreact';
import { getJWTtoken } from '../../helpers/jwtHandler';
import { trackPromise } from 'react-promise-tracker';
import DeleteUserConfirmationModal from './DeleteUserConfirmationModal';

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
                    },
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

    componentDidUpdate = async () => {
        if (this.props.refreshNeeded === true) {
            await this.downloadUsers();
            await this.props.RefreshComponent();
        }
    }

    componentDidMount = () => {
        this.downloadUsers();
    }

    downloadUsers() {
        let data = Object.assign({}, this.state.data);
        trackPromise(
        fetch('api/User/GetUsers', {
            headers: {
                Authorization: getJWTtoken()
            }
        })
            .then(response => response.json())
            .then(result => {
                console.log(result);
                data.rows = result;

                for (let i = 0; i < data.rows.length; i++) {
                    let singleEmail = data.rows[i].email;
                    let userCredentials = data.rows[i].firstName + " " + data.rows[i].lastName;
                    console.log(singleEmail);
                    console.log(userCredentials);
                    data.rows[i].edit = <MDBBtn label="Update" className="button tiny warning" onClick={() => this.props.ShowFormEdit(singleEmail)} style={{ marginBottom: 0 }}>Edytuj</MDBBtn>
                    //data.rows[i].delete = <MDBBtn label="Delete" className="button tiny alert" onClick={() => { if (window.confirm(`Czy na pewno chcesz usunąć użytkownika "${userCredentials}" ?`)) this.props.Delete(singleEmail) }} style={{ marginBottom: 0 }}>Usuń</MDBBtn>
                    data.rows[i].delete = <DeleteUserConfirmationModal userCredentials={userCredentials} DeleteUser={() => this.props.Delete(singleEmail)} />
                }

                this.setState({ data });
            }))
    }


    render() {
        return (
            <div>
                <div className="row customToolbar">
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