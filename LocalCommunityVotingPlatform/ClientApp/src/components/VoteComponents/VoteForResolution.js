import React, { Component } from 'react';
import { NotificationManager } from 'react-notifications';
import { getJWTtoken } from '../../helpers/jwtHandler';
import axios from 'axios';
import VoteConfirmationModal from './VoteConfirmationModal';

export class VoteForResolution extends Component {
    static displayName = VoteForResolution.name;
    constructor(props) {
        super(props);

        this.state = {
            selectedOption: '0'
        }
    }

    componentDidMount = () => {
            axios.get('api/Vote/GetVoteSelectedOption', {
                headers: {
                    Authorization: getJWTtoken()
                },
                params: {
                    resolutionId: this.props.resolutionId
                }
            }).then(result => {
                console.log(result.data)
                this.setState({
                    selectedOption: result.data.toString()
                });
            })
        
    }

    handleOptionChange = (changeEvent) => {
        this.setState({
            selectedOption: changeEvent.target.value
        })
    }

    Vote = async (e) => {
        e.preventDefault();

        axios.defaults.headers.common['Authorization'] = getJWTtoken();
        await axios.post("api/Vote/VoteForResolution", null,
            {
                params: {
                    resolutionId: this.props.resolutionId,
                    chosenOption: this.state.selectedOption
                }
            }).then(res => {
                NotificationManager.success('Pomyślnie oddano swój głos', 'Głosowanie');
                this.props.RefreshComponent();
            });
    }

    render() {
        return (
            <div>
                <div className="grid-x grid-padding-x" style={{ marginTop: 20 }}>
                    <div className="grid-container fluid callout translucent-form-overlay small-12 medium-6 large-4 cell">

                        <div className="text-center">
                            {this.props.blockedForVote ? 
                                <h2>Głosowanie zostało zakończone</h2>
                                :
                                <h2>Głosowanie nad uchwałą</h2>
                            }
                                
                            {(this.state.selectedOption === '0') && this.props.blockedForVote ?
                                        <p>Nie głosowałeś nad tą uchwałą</p>
                                        :
                                        null
                                    }      

                            {(this.state.selectedOption != '0') && this.props.alreadyVoted ?
                                        <p>Oddałeś następujący głos:</p>
                                        :
                                        null
                                    }    
                        </div>

                        <form>
                            <div className="grid-container">

                                <div className="row" style={{ marginTop: 20 }}>
                                    <div className="button-group round toggle float-center">
                                        <input type="radio" id="for" name="chosenOption" value="1" onChange={this.handleOptionChange} checked={this.state.selectedOption === '1'} disabled={this.props.alreadyVoted || this.props.blockedForVote ? "disabled" : null}/>
                                        <label className="button" for="for">Za</label>

                                        <input type="radio" id="against" name="chosenOption" value="2" onChange={this.handleOptionChange} checked={this.state.selectedOption === '2'} disabled={this.props.alreadyVoted || this.props.blockedForVote ? "disabled" : null}/>
                                        <label className="button" for="against">Przeciw</label>

                                        <input type="radio" id="abstain" name="chosenOption" value="3" onChange={this.handleOptionChange} checked={this.state.selectedOption === '3'} disabled={this.props.alreadyVoted || this.props.blockedForVote ? "disabled" : null}/>
                                        <label className="button" for="abstain">Wstrzymaj się</label>
                                    </div>
                                </div>

                                {!this.props.alreadyVoted && !this.props.blockedForVote ?
                                    <div className="row" style={{ marginTop: 10 }}>
                                        <VoteConfirmationModal selectedOption={this.state.selectedOption} Vote={(e) => this.Vote(e)} />
                                        <button className="button alert float-center" style={{ marginBottom: 0 }} onClick={this.props.ShowVoteForm} type="submit">Anuluj</button>
                                    </div>
                                    : null}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default VoteForResolution;


