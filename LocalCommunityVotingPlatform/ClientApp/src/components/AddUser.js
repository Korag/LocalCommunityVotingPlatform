//import React, { Component } from 'react';
//import axios from 'axios';

//export class AddUser extends Component {
//    static displayName = AddUser.name;
//    constructor(props) {
//        super(props);

//        this.state = {
//            email: '',
//            password: '',
//            firstName: '',
//            lastName: '',
//            role: '',
//            availableRoles: []
//        }
//    }

//    changeValue(e) {
//        this.setState({
//            [e.target.name]: e.target.value
//        });
//    }

//    AddUser = async (e) => {
//        //this.props.callBack();
//        e.preventDefault();
//        await axios.post('/api/AddUser', {
//            headers: {
//                Authorization: token
//            },
//            FirstName: this.state.firstName,
//            LastName: this.state.lastName,
//            Email: this.state.email,
//            Password: this.state.password,
//            ConfirmPassword: this.state.confirmPassword
//        }).then(res => {
//            //this.props.history.push(/users);
//            //this.props.callBack();
//        })
//    };

//    render() {
//        return (
//            <div>
//                <div className="text-center" style={h1}>
//                    <h1>Społeczność testowa</h1>
//                </div>
//                <div className="grid-x grid-padding-x" style={{ marginTop: 30 }}>
//                    <div className="grid-container fluid callout translucent-form-overlay small-10 medium-6 large-4 cell">
//                        <div className="text-center">
//                            <h2>Dodaj nowego użytkownika</h2>
//                        </div>
//                        <form onSubmit={e => this.updateUser(e)}>
//                            <div className="grid-container">
//                                <div>
//                                    <label>Adres email</label>
//                                    <input type="text" name="email" onChange={e => this.changeValue(e)} value={this.state.email} />
//                                    <label>Imię</label>
//                                    <input type="text" name="firstName" onChange={e => this.changeValue(e)} value={this.state.password} />
//                                    <label>Nazwisko</label>
//                                    <input type="text" name="lastName" onChange={e => this.changeValue(e)} value={this.state.password} />
//                                    <label>Hasło</label>
//                                    <input type="password" name="password" onChange={e => this.changeValue(e)} value={this.state.password} />
//                                    <label>Potwierdź hasło</label>
//                                    <input type="password" name="confirmPassword" onChange={e => this.changeValue(e)} value={this.state.password} />
//                                </div>
//                                <div>
//                                    <button className="button secondary float-center" style={buttonStyle} type="submit">Dodaj użytkownika</button>
//                                </div>
//                            </div>
//                        </form>
//                    </div>
//                </div>
//            </div>
//        );
//    }
//}

//export default AddUser;


