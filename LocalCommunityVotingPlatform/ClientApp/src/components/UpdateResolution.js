import React, { Component } from 'react';
import axios from 'axios';
import { getJWTtoken } from '../helpers/jwtHandler'
import DatePicker, { registerLocale } from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';
import pl from 'date-fns/locale/pl';
registerLocale('pl', pl);

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

export class UpdateResolution extends Component {
    static displayName = UpdateResolution.name;
    constructor(props) {
        super(props);

        this.state = {
            title: '',
            description: '',
            activeToVoteBeforeDate: ''
        }
    }

    changeValue = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    componentDidMount = () => {
        this.DownloadResolutionData();
    }

    updateResolution = (e) => {
        e.preventDefault();

        axios.defaults.headers.common['Authorization'] = getJWTtoken();
        axios.post("api/EditResolution",
            {
                Title: this.state.title,
                Description: this.state.description,
                ActiveToVoteBeforeDate: this.state.activeToVoteBeforeDate
            }).then(res => {
                this.props.ShowFormEditResolution();
            });
    };

    DownloadResolutionData = () => {
        axios.get('api/GetResolutionById', {
            headers: {
                Authorization: getJWTtoken()
            },
            params: {
                Id: this.props.Id
            }
        }).then(result => {
            this.setState({
                title: result.data.title,
                description: result.data.description,
                activeToVoteBeforeDate: result.data.activeToVoteBeforeDate
            });
        })
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
                            <h2>Edytuj uchwałę</h2>
                        </div>
                        <form onSubmit={e => this.updateResolution(e)}>
                            <div className="grid-container">
                                <div>
                                    <label>Tytuł uchwały</label>
                                    <input type="text" name="title" onChange={e => this.changeValue(e)} value={this.state.title} />
                                    <label>
                                        Treść uchwały
                                    <textarea placeholder="None" name="description" onChange={e => this.changeValue(e)} value={this.state.description}></textarea>
                                    </label>
                                    <label>Data końca głosowania</label>
                                    <DatePicker
                                        dateFormat="dd/MM/YYYY"
                                        locale="pl"
                                        todayButton={"Dzisiaj"}
                                        selected={this.state.activeToVoteBeforeDate}
                                        onChange={this.changeValue}
                                    />
                                </div>
                                <div className="row">
                                    <button className="button secondary float-center" style={buttonStyle} type="submit">Aktualizuj</button>
                                    <button className="button alert float-center" style={buttonStyle} onClick={this.props.ShowFormEditResolution} type="submit">Anuluj</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default UpdateResolution;