﻿import React, { Component } from 'react';
import axios from 'axios';
import { getJWTtoken } from '../../helpers/jwtHandler'

import { VoteForResolution } from '../VoteComponents/VoteForResolution'
import { ResultDiagramWithStatistics } from '../VoteComponents/ResultDiagramWithStatistics'

export class ResolutionDetails extends Component {
    static displayName = ResolutionDetails.name;
    constructor(props) {
        super(props);

        this.state = {
            indexer: '',
            title: '',
            description: '',
            activeToVoteBeforeDate: '',

            enableVoteForm: false,
            enableResultsDiagram: false,

            alreadyVoted: false,
            SuperUser: false
        }
    }

    componentDidMount = () => {
        axios.get('api/Resolution/GetResolutionById', {
            headers: {
                Authorization: getJWTtoken()
            },
            params: {
                resolutionId: this.props.resolutionId
            }
        }).then(result => {
            this.setState({
                indexer: result.data.indexer,
                title: result.data.title,
                description: result.data.description,
                activeToVoteBeforeDate: result.data.activeToVoteBeforeDate
            });
            })

        axios.get('api/Vote/CheckIfAlreadyVotedForResolution', {
            headers: {
                Authorization: getJWTtoken()
            },
            params: {
                resolutionId: this.props.resolutionId
            }
        }).then(result => {
            this.setState({
                alreadyVoted: result.data,
            });
            })

        axios.get('api/Account/Authorize/', {
            headers: {
                Authorization: getJWTtoken()
            }
        }).then(res => {
            this.setState({
                SuperUser: res,
            });
        })
    }

    ShowVoteForm = (e) => {
        e.preventDefault();
        this.setState({
            enableVoteForm: !this.state.enableVoteForm
        })
    }

    ShowResultDiagram = (e) => {
        e.preventDefault();
        this.setState({
            enableResultsDiagram: !this.state.enableResultsDiagram
        })
    }
  
    render() {
        return (
            <div style={{ marginTop: 30 }}>
                <div className="text-center headerStyle">
                    <h1>Społeczność testowa</h1>
                </div>

                <div className="grid-x grid-padding-x" style={{ marginTop: 30 }}>
                    <div className="grid-container fluid callout translucent-form-overlay small-10 medium-6 large-4 cell">

                        <form>
                            <div className="grid-container">
                                <div>
                                    <label>Indeks uchwały</label>
                                    <input type="text" name="indexer" value={this.state.indexer} disabled />
                                    <label>Tytuł uchwały</label>
                                    <input type="text" name="title" value={this.state.title} disabled/>
                                    <label>
                                        Treść uchwały
                                    <textarea placeholder="None" name="description" value={this.state.description} disabled></textarea>
                                    </label>
                                    <label>Data końca głosowania</label>
                                    <input type="text" name="title" value={this.state.activeToVoteBeforeDate} disabled />
                                </div>
                                <div className="row">
                                    {!this.state.alreadyVoted ?
                                        <button className="button success float-center" style={{ marginBottom: 0 }} onClick={e => this.ShowVoteForm(e)}>Głosuj</button>
                                        : null}
                                    {!this.state.enableResultsDiagram && this.state.SuperUser ?
                                        <button className="button secondary float-center" style={{ marginBottom: 0 }} onClick={e => this.ShowResultDiagram(e)}>Wyniki głosowania</button>
                                        : null}
                                </div>
                            </div>
                        </form>
                    </div>
                </div>

                {this.state.enableVoteForm || this.state.alreadyVoted ?
                    <VoteForResolution resolutionId={this.props.resolutionId} alreadyVoted={this.state.alreadyVoted} ShowVoteForm={this.ShowVoteForm} history={this.props.history} />
                    : null}

                {this.state.enableResultsDiagram ?
                    <ResultDiagramWithStatistics resolutionId={this.props.resolutionId} ShowResultDiagram={this.ShowResultDiagram} history={this.props.history} />
                    : null}
            </div>
        )
    }
}

export default ResolutionDetails;