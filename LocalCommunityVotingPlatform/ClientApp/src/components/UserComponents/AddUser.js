import React, { Component } from 'react';
import axios from 'axios';
import { getJWTtoken } from '../../helpers/jwtHandler'

import { ValidationHandler } from "../../helpers/ValidationHandler"

export class AddUser extends Component {
    static displayName = AddUser.name;
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            confirmPassword: '',
            firstName: '',
            lastName: '',
            role: 'User',

            formNotValid: false,
            validationErrors: []
        }
    }

    changeValue(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleChange = (e) => {
        this.setState({ role: e.target.value });
    }

    AddUser = async (e) => {
        e.preventDefault();
        console.log(this.state);

        axios.defaults.headers.common['Authorization'] = getJWTtoken();
        await axios.post("api/Account/Register", null,
            {
                params: {
                    FirstName: this.state.firstName,
                    LastName: this.state.lastName,
                    Email: this.state.email,
                    SelectedRole: this.state.role,
                    Password: this.state.password,
                    ConfirmPassword: this.state.confirmPassword
                }
            }).then(res => {
                this.props.ShowFormAddUser();
            }).catch(err => {
                this.setState({
                    formNotValid: true,
                    validationErrors: err.response.data
                })
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
                            <h2>Dodaj użytkownika</h2>
                        </div>
                        <form onSubmit={e => this.AddUser(e)}>
                            <div className="grid-container">
                                <div>
                                    <label>Adres email</label>
                                    <input type="text" name="email" onChange={e => this.changeValue(e)} value={this.state.email} />
                                    <label>Imię</label>
                                    <input type="text" name="firstName" onChange={e => this.changeValue(e)} value={this.state.firstName} />
                                    <label>Nazwisko</label>
                                    <input type="text" name="lastName" onChange={e => this.changeValue(e)} value={this.state.lastName} />
                                    <label>Hasło</label>
                                    <input type="text" name="password" onChange={e => this.changeValue(e)} value={this.state.password} />
                                    <label>Potwierdź hasło</label>
                                    <input type="text" name="confirmPassword" onChange={e => this.changeValue(e)} value={this.state.confirmPassword} />
                                    <label>Rola</label>
                                    <select value={this.state.role} onChange={this.handleChange}>
                                        <option value="User">Użytkownik</option>
                                        <option value="Admin">Administrator</option>
                                    </select>
                                </div>
                                <div className="row">
                                    <button className="button secondary float-center" style={{ marginBottom: 0 }} type="submit">Dodaj</button>
                                    <button className="button alert float-center" style={{ marginBottom: 0 }} onClick={this.props.ShowFormAddUser} type="submit">Anuluj</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>

                {this.state.formNotValid ?
                    <div className="grid-x grid-padding-x" style={{ marginTop: 20 }}>
                        <div className="grid-container fluid alert translucent-form-overlay small-10 medium-6 large-4 cell">
                            <h4 className="text-center">Wprowadzono błędne dane</h4>
                            <div className="grid-container">
                                <div className="alertValidation">
                                    <ValidationHandler fieldName={'Overall'} validationErrors={this.state.validationErrors} />
                                    <ValidationHandler fieldName={'Email'} validationErrors={this.state.validationErrors} />
                                    <ValidationHandler fieldName={'Password'} validationErrors={this.state.validationErrors} />
                                    <ValidationHandler fieldName={'ConfirmPassword'} validationErrors={this.state.validationErrors} />
                                    <ValidationHandler fieldName={'FirstName'} validationErrors={this.state.validationErrors} />
                                    <ValidationHandler fieldName={'LastName'} validationErrors={this.state.validationErrors} />
                                    <ValidationHandler fieldName={'Role'} validationErrors={this.state.validationErrors} />
                                </div>
                            </div>
                        </div>
                    </div>
                    :
                    null}

            </div>
        );
    }
}

export default AddUser;


