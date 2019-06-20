import React, { Component } from 'react';
import axios from 'axios';
import { getJWTtoken } from '../../helpers/jwtHandler'
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';

import moment from 'moment';
import 'moment/locale/pl';
moment().locale('pl')

export class AddResolution extends Component {
    static displayName = AddResolution.name;
    constructor(props) {
        super(props);

        this.state = {
            title: '',
            description: '',
            activeToVoteBeforeDate: moment()
        }
    }

    changeValue(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleChange = (date) => {
        console.log(this.state.activeToVoteBeforeDate)
        this.setState({
            activeToVoteBeforeDate: date
        });
    }

    AddResolution = async (e) => {
        e.preventDefault();
        console.log(this.state);
        console.log(this.state.activeToVoteBeforeDate);

        axios.defaults.headers.common['Authorization'] = getJWTtoken();
        await axios.post("/api/Resolution/AddResolution", null,
            {
                params: {
                    Title: this.state.title,
                    Description: this.state.description,
                    ActiveToVoteBeforeDate: this.state.activeToVoteBeforeDate.format()
                }
            }).then(res => {
                this.props.ShowFormAddResolution();
            });
    };

    render() {
        return (
            <div>
                <div className="text-center headerStyle">
                    <h1>Społeczność testowa</h1>
                </div>
                <div className="grid-x grid-padding-x" style={{ marginTop: 30 }}>
                    <div className="grid-container fluid callout translucent-form-overlay small-10 medium-6 large-4 cell">
                        <div className="text-center">
                            <h2>Dodaj uchwałę</h2>
                        </div>
                        <form onSubmit={e => this.AddResolution(e)}>
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
                                        dateFormat="DD/MM/YYYY"
                                        locale="pl"
                                        todayButton={"Dzisiaj"}
                                        selected={this.state.activeToVoteBeforeDate}
                                        onChange={this.handleChange}
                                        startDate={this.state.activeToVoteBeforeDate}
                                    />
                                </div>
                                <div className="row">
                                    <button className="button secondary float-center" style={{marginBottom: 0}} type="submit">Dodaj</button>
                                    <button className="button alert float-center" style={{ marginBottom: 0 }} onClick={this.props.ShowFormAddResolution} type="submit">Anuluj</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}


export default AddResolution;