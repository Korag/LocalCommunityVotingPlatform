import React, { Component } from 'react';
import axios from 'axios';
import { getJWTtoken } from '../../helpers/jwtHandler';
import { NotificationManager } from 'react-notifications';
import { ValidationHandler } from "../../helpers/ValidationHandler";

export class UpdateUser extends Component {
    static displayName = UpdateUser.name;
    constructor(props) {
        super(props);

        this.state = {
            emailBeforeEdit: '',

            email: '',
            firstName: '',
            lastName: '',
            address: '',
            role: '',
            availableRoles: [],

            formNotValid: false,
            validationErrors: []
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
        axios.post("api/User/EditUser", null,
            {
                params: {
                    EmailBeforeEdit: this.state.emailBeforeEdit,

                    FirstName: this.state.firstName,
                    LastName: this.state.lastName,
                    Email: this.state.email,
                    Address: this.state.address,
                    Role: this.state.role
                }
            }).then(res => {
                this.props.ShowFormEdit();
                NotificationManager.success('Dane użytkownika zostały zaktualizowane', 'Edycja użytkownika');

            }).catch(err => {
                this.setState({
                    formNotValid: true,
                    validationErrors: err.response.data
                })
                NotificationManager.error('Nieudana próba edycji użytkownika', 'Edycja użytkownika');
            })
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
                emailBeforeEdit: result.data.email,
                email: result.data.email,
                password: result.data.password,
                firstName: result.data.firstName,
                lastName: result.data.lastName,
                address: result.data.address,
                role: result.data.role
            });
        })
    }

    render() {
        return (
            <div>
                <div className="grid-x grid-padding-x" style={{ marginTop: 30 }}>
                    <div className="grid-container fluid callout translucent-form-overlay small-12 medium-6 large-4 cell">
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
                                    <label>Adres zamieszkania</label>
                                    <input type="text" name="address" onChange={e => this.changeValue(e)} value={this.state.address} />
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

                {this.state.formNotValid ?
                    <div className="grid-x grid-padding-x" style={{ marginTop: 20 }}>
                        <div className="grid-container fluid alert translucent-form-overlay small-10 medium-6 large-4 cell">
                            <h4 className="text-center">Wprowadzono błędne dane</h4>
                            <div className="grid-container">
                                <div className="alertValidation">
                                    <ValidationHandler fieldName={'Overall'} validationErrors={this.state.validationErrors} />
                                    <ValidationHandler fieldName={'Email'} validationErrors={this.state.validationErrors} />
                                    <ValidationHandler fieldName={'FirstName'} validationErrors={this.state.validationErrors} />
                                    <ValidationHandler fieldName={'LastName'} validationErrors={this.state.validationErrors} />
                                    <ValidationHandler fieldName={'Address'} validationErrors={this.state.validationErrors} />
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

export default UpdateUser;


