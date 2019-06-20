﻿import React, { Component } from 'react';
import axios from 'axios';
import { getJWTtoken } from '../../helpers/jwtHandler'

export class UpdateUser extends Component {
    static displayName = UpdateUser.name;
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            role: '',
            availableRoles: []
        }
    }

    changeValue = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleChange = (e) => {
        this.setState({ role: e.target.value });
    }

    componentDidMount = () => {
        this.DownloadUserData();
    }

    updateUser = (e) => {
        e.preventDefault();

        axios.defaults.headers.common['Authorization'] = getJWTtoken();
        axios.post("api/User/EditUser",
            {
                FirstName: this.state.firstName,
                LastName: this.state.lastName,
                Email: this.state.email,
                Role: this.state.role
            }).then(res => {
                this.props.ShowFormEdit();
            });
    };

    DownloadUserData = () => {
        axios.get('api/User/GetUserByEmail', {
            headers: {
                Authorization: getJWTtoken()
            },
            params: {
                email: this.props.userEmail 
            }
        }).then(result => {
                    this.setState({
                    email: result.data.email,
                    password: result.data.password,
                    firstName: result.data.firstName,
                    lastName: result.data.lastName,
                    role: result.data.role,     
                });
            })
    }

    render() {
        return (
            <div>
                <div className="text-center headerStyle">
                    <h1>Społeczność testowa</h1>
                </div>
                <div className="grid-x grid-padding-x" style={{ marginTop: 30 }}>
                    <div className="grid-container fluid callout translucent-form-overlay small-10 medium-6 large-4 cell">
                        <div className="text-center">
                            <h2>Aktualizuj użytkownika</h2>
                        </div>
                        <form onSubmit={e => this.updateUser(e)}>
                            <div className="grid-container">
                                <div>
                                    <label>Adres email</label>
                                    <input type="text" name="email" onChange={e => this.changeValue(e)} value={this.state.email} />
                                    <label>Imię</label>
                                    <input type="text" name="firstName" onChange={e => this.changeValue(e)} value={this.state.firstName} />
                                    <label>Nazwisko</label>
                                    <input type="text" name="lastName" onChange={e => this.changeValue(e)} value={this.state.lastName} />
                                    <label>Rola</label>
                                    <select value={this.state.role} onChange={this.handleChange}>
                                        <option value="User">Użytkownik</option>
                                        <option value="Admin">Administrator</option>
                                    </select>
                                </div>
                                <div className="row">
                                    <button className="button secondary float-center" style={{ marginBottom: 0 }} type="submit">Aktualizuj</button>
                                    <button className="button alert float-center" style={{ marginBottom: 0 }} onClick={this.props.ShowFormEdit} type="submit">Anuluj</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default UpdateUser;


