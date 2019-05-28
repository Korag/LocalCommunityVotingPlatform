import React, { Component } from 'react';
import axios from 'axios';
import { getJWTtoken } from '../../helpers/jwtHandler'

const buttonStyle = {
    "marginBottom": '0px',
};

const inlineBlock = {
    "display": 'inline-block',
    "fontSize": "20px"
};

const h1 = {
    "background": "rgb(9,30,121)",
    "background": "linear-gradient(90deg, rgba(9,30,121,0.9023984593837535) 5%, rgba(97,159,237,0.7035189075630253) 50%, rgba(9,30,121,0.8995973389355743) 95%)",
    "fontSize": "24px",
    "color": "white"
};

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
            role: 'User'
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
            });
    };

    render() {
        return (
            <div>
                <div className="text-center" style={h1}>
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
                                    <button className="button secondary float-center" style={buttonStyle} type="submit">Dodaj</button>
                                    <button className="button alert float-center" style={buttonStyle} onClick={this.props.ShowFormAddUser} type="submit">Anuluj</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default AddUser;


