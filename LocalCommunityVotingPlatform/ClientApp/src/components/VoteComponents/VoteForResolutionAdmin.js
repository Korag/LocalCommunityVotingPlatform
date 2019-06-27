import React, { Component } from 'react';
import { NotificationManager } from 'react-notifications';
import { getJWTtoken } from '../../helpers/jwtHandler';
import axios from 'axios';
import VoteConfirmationModal from './VoteConfirmationModal';

export class VoteForResolutionAdmin extends Component {
    static displayName = VoteForResolutionAdmin.name;
    constructor(props) {
        super(props);

        this.state = {
            selectedOption: '0',

            availableUsers: [],
            userId: '',
            allVoted: false,
            refresh: false
        }
    }

    componentDidMount = () => {
        axios.get('api/Vote/GetUsersCredentialsWithoutVote', {
            headers: {
                Authorization: getJWTtoken()
            },
            params: {
                resolutionId: this.props.resolutionId
            }
        }).then(result => {
            console.log(result.data)
            this.setState({
                availableUsers: result.data
            }, () => {
                if (this.state.availableUsers.length == 0) {
                    this.setState({
                        allVoted: true
                    })
                }
                else {
                    this.setState({
                        userId: result.data[0].userId
                    })
                }
            });
        })
    }

    handleOptionChange = (changeEvent) => {
        this.setState({
            selectedOption: changeEvent.target.value
        })
    }

    handleChange = (e) => {
        this.setState({ userId: e.target.value });
    }

    Vote = async (e) => {
        e.preventDefault();

        axios.defaults.headers.common['Authorization'] = getJWTtoken();
        await axios.post("api/Vote/VoteForResolutionAsAdmin", null,
            {
                params: {
                    resolutionId: this.props.resolutionId,
                    userId: this.state.userId,
                    chosenOption: this.state.selectedOption
                }
            }).then(res => {
                NotificationManager.success('Pomyślnie zagłosowano', 'Głosowanie');
                this.RefreshComponent();
            });
    }

    RefreshComponent = () => {
        this.setState({
            selectedOption: '0',
            availableUsers: [],
            userId: '',
            allVoted: false,
            refresh: false
        })
        this.componentDidMount();
    }

    render() {
        return (
            <div>
                <div className="grid-x grid-padding-x" style={{ marginTop: 20 }}>
                    <div className="grid-container fluid callout translucent-form-overlay small-12 medium-6 large-4 cell">

                        <div className="text-center">
                            <h2>Głosowanie nad uchwałą</h2>
                        </div>

                        {!this.state.allVoted ?
                            <form>
                                <div className="grid-container">

                                    <select value={this.state.userId} onChange={this.handleChange}>
                                        {this.state.availableUsers.map(function (d, idx) {
                                            return (
                                                <option value={d.userId}>{d.firstName} {d.lastName}</option>
                                            )
                                        })}
                                    </select>

                                    <div className="row" style={{ marginTop: 10 }}>
                                        <div className="button-group round toggle float-center">
                                            <input type="radio" id="for" name="chosenOption" value="1" onChange={this.handleOptionChange} checked={this.state.selectedOption === '1'} disabled={this.props.alreadyVoted || this.props.blockedForVote ? "disabled" : null} />
                                            <label className="button" for="for">Za</label>

                                            <input type="radio" id="against" name="chosenOption" value="2" onChange={this.handleOptionChange} checked={this.state.selectedOption === '2'} disabled={this.props.alreadyVoted || this.props.blockedForVote ? "disabled" : null} />
                                            <label className="button" for="against">Przeciw</label>

                                            <input type="radio" id="abstain" name="chosenOption" value="3" onChange={this.handleOptionChange} checked={this.state.selectedOption === '3'} disabled={this.props.alreadyVoted || this.props.blockedForVote ? "disabled" : null} />
                                            <label className="button" for="abstain">Wstrzymaj się</label>
                                        </div>
                                    </div>

                                    <div className="row" style={{ marginTop: 10 }}>
                                        <VoteConfirmationModal selectedOption={this.state.selectedOption} Vote={(e) => this.Vote(e)} />
                                        <button className="button alert float-center" style={{ marginBottom: 0 }} onClick={this.props.ShowVoteForm} type="submit">Anuluj</button>
                                    </div>
                                </div>
                            </form>
                            :
                            <div className="text-center">
                                <p>Wszyscy użytkownicy oddali już swój głos na tą uchwałę</p>
                            </div>}
                    </div>
                </div>
            </div>
        )
    }
}

export default VoteForResolutionAdmin;


