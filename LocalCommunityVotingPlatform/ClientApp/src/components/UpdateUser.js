import React, { Component } from 'react';
import axios from 'axios';

export class UpdateUser extends Component {
    static displayName = AddUser.name;
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

    changeValue(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    updateUser = async (e) => {
        //this.props.callBack();
        e.preventDefault();
        await axios.post('/api/UpdateUser', {
            headers: {
                Authorization: token
            },
            FirstName: this.state.firstName,
            LastName: this.state.lastName,
            Email: this.state.email,
            Role: this.state.role
        }).then(res => {
            //this.props.history.push(/users);
            //this.props.callBack();
        })
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
                            <h2>Aktualizuj użytkownika</h2>
                        </div>
                        <form onSubmit={e => this.updateUser(e)}>
                            <div className="grid-container">
                                <div>
                                    <label>Adres email</label>
                                    <input type="text" name="email" onChange={e => this.changeValue(e)} value={this.state.email} />
                                    <label>Imię</label>
                                    <input type="text" name="firstName" onChange={e => this.changeValue(e)} value={this.state.password} />
                                    <label>Nazwisko</label>
                                    <input type="text" name="lastName" onChange={e => this.changeValue(e)} value={this.state.password} />
                                    <label>Rola</label>
                                    <select value={this.state.role} onChange={this.changeValue}>
                                        <option value="Admin">Administrator</option>
                                        <option value="User">Użytkownik</option>
                                    </select>
                                </div>
                                <div>
                                    <button className="button secondary float-center" style={buttonStyle} type="submit">Aktualizuj</button>
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


