import React, { Component } from 'react';

import { getJWTtoken } from '../../helpers/jwtHandler'
import axios from 'axios'

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

export class UserData extends Component {
    static displayName = UserData.name;

    constructor(props) {
        super(props);

        this.state = {
            email: '',
            firstName: '',
            lastName: ''
        }
    }

    componentDidMount = () => {
        axios.get('api/User/GetUserData', {
            headers: {
                Authorization: getJWTtoken()
            }
        }).then(result => {

            this.setState({
                email: result.data.email,
                firstName: result.data.firstName,
                lastName: result.data.lastName
            });
        })
    }

    render() {
        return (
            <div style={{marginTop: 30}}>
                <div className="text-center" style={h1}>
                    <h1>Społeczność testowa</h1>
                </div>

                <div className="grid-x grid-padding-x" style={{ marginTop: 30 }}>
                    <div className="grid-container fluid callout translucent-form-overlay small-10 medium-6 large-4 cell">

                        <form>
                            <div className="grid-container">
                                <div>
                                    <label>Adres email</label>
                                    <input type="text" name="email" value={this.state.email} disabled/>
                                    <label>Imię</label>
                                    <input type="text" name="firstName" value={this.state.firstName} disabled/>
                                    <label>Nazwisko</label>
                                    <input type="text" name="lastName" value={this.state.lastName} disabled/>
                                </div>
                                <div className="row">
                                    <button className="button secondary float-center" style={buttonStyle} onClick={e=> this.props.ShowChangePasswordForm(e)}>Zmień hasło</button>
                                </div>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
        )
    }
}