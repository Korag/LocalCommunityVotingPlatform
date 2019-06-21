import React, { Component } from 'react';

import { getJWTtoken } from '../../helpers/jwtHandler'
import axios from 'axios';

export class VoteForResolution extends Component {
    static displayName = VoteForResolution.name;
    constructor(props) {
        super(props);

        this.state = {
            selectedOption: '',
            refresh: false
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

    RefreshComponent = () => {
        this.setState({
            refreshNeeded: !this.state.refreshNeeded
        });
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
                //this.props.history.push('/');
            });
    }

    render() {
        return (
            <div>
                <div className="grid-x grid-padding-x" style={{ marginTop: 30 }}>
                    <div className="grid-container fluid callout translucent-form-overlay small-10 medium-6 large-4 cell">

                        <div className="text-center">
                            <h2>Głosowanie nad uchwałą</h2>
                        </div>

                        <form onSubmit={e => this.Vote(e)}>
                            <div className="grid-container">

                                <div className="row" style={{ marginTop: 20 }}>
                                    <div className="button-group round toggle float-center">
                                        <input type="radio" id="for" name="chosenOption" value="1" onChange={this.handleOptionChange} checked={this.state.selectedOption === '1'} disabled={this.props.alreadyVoted ? "disabled" : null}/>
                                        <label className="button" for="for">Za</label>

                                        <input type="radio" id="against" name="chosenOption" value="2" onChange={this.handleOptionChange} checked={this.state.selectedOption === '2'} disabled={this.props.alreadyVoted ? "disabled" : null}/>
                                        <label className="button" for="against">Przeciw</label>

                                        <input type="radio" id="abstain" name="chosenOption" value="3" onChange={this.handleOptionChange} checked={this.state.selectedOption === '3'} disabled={this.props.alreadyVoted ? "disabled" : null}/>
                                        <label className="button" for="abstain">Wstrzymaj się</label>
                                    </div>
                                </div>

                                {!this.props.alreadyVoted ?
                                    <div className="row" style={{ marginTop: 10 }}>
                                        <button className="button secondary float-center" style={{ marginBottom: 0 }} type="submit" >Głosuj</button>
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


