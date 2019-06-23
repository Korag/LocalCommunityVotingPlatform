import React, { Component } from 'react';
import axios from 'axios';
import { getJWTtoken } from '../../helpers/jwtHandler'
import DatePicker from 'react-datepicker';
import { ValidationHandler } from "../../helpers/ValidationHandler"

import 'react-datepicker/dist/react-datepicker.css';

import moment from 'moment';
import 'moment/locale/pl';
moment().locale('pl')

export class UpdateResolution extends Component {
    static displayName = UpdateResolution.name;
    constructor(props) {
        super(props);

        this.state = {
            title: '',
            description: '',
            activeToVoteBeforeDate: moment(),

            formNotValid: false,
            validationErrors: []
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
        axios.post("api/Resolution/EditResolution", null,
            {
                params: {
                    ResolutionId: this.props.resolutionId,
                    Title: this.state.title,
                    Description: this.state.description,
                    ActiveToVoteBeforeDate: this.state.activeToVoteBeforeDate.format()
                }
            }).then(res => {
                this.props.ShowFormEditResolution();
            }).catch(err => {
                this.setState({
                    formNotValid: true,
                    validationErrors: err.response.data
                })
            })
    };

    DownloadResolutionData = () => {
        axios.get('api/Resolution/GetResolutionById', {
            headers: {
                Authorization: getJWTtoken()
            },
            params: {
                resolutionId: this.props.resolutionId
            }
        }).then(result => {
            var activeToDate = moment(result.data.activeToVoteBeforeDate, 'DD/MM/YYYY')
            this.setState({
                title: result.data.title,
                description: result.data.description,
                activeToVoteBeforeDate: activeToDate
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
                                        dateFormat="DD/MM/YYYY"
                                        locale="pl"
                                        todayButton={"Dzisiaj"}
                                        selected={this.state.activeToVoteBeforeDate}
                                        onChange={this.changeValue}
                                    />
                                </div>
                                <div className="row">
                                    <button className="button secondary float-center" style={{marginBottom: 0}} type="submit">Aktualizuj</button>
                                    <button className="button alert float-center" style={{ marginBottom: 0 }} onClick={this.props.ShowFormEditResolution} type="submit">Anuluj</button>
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
                                    <ValidationHandler fieldName={'Title'} validationErrors={this.state.validationErrors} />
                                    <ValidationHandler fieldName={'Description'} validationErrors={this.state.validationErrors} />
                                    <ValidationHandler fieldName={'ActiveToVoteBeforeDate'} validationErrors={this.state.validationErrors} />
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

export default UpdateResolution;