import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios';
import { withRouter } from "react-router-dom";

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

export class ResetPassword extends Component {
    static displayName = ResetPassword.name;
    constructor(props) {
        super(props);

        this.state = {
            userId = '',
            newPassword: '',
            confirmNewPassword: '',
        }
    }

    changeValue(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }


    Rerender = () => {
        this.forceUpdate();
    }


    render() {
        return (
            <div>
                <div className="text-center" style={h1}>
                    <h1>Społeczność testowa</h1>
                </div>
                <div className="grid-x grid-padding-x" style={{ marginTop: 30 }}>
                    <div className="grid-container fluid callout translucent-form-overlay small-10 medium-6 large-4 cell">
                        <div className="text-center">
                            <h2>Resetuj hasło</h2>
                        </div>
                        <form onSubmit={e => this.changePassword(e)}>
                            <div className="grid-container">
                                <div>
                                    <label>Nowe hasło</label>
                                    <input type="password" name="newPassword" onChange={e => this.changeValue(e)} value={this.state.newPassword} />
                                    <label>Powtórz nowe hasło</label>
                                    <input type="password" name="confirmNewPassword" onChange={e => this.changeValue(e)} value={this.state.confirmPassword} />
                                </div>
                                <div className="row">
                                    <button className="button secondary float-center" style={buttonStyle} type="submit">Zmień hasło</button>
                                    <button className="button alert float-center" style={buttonStyle} onClick={this.props.ShowFormLogin} type="submit">Anuluj</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(ResetPassword);