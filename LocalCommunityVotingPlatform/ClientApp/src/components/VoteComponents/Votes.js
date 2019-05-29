import React, { Component } from 'react';
import { ActiveResolutionsList } from './ActiveResolutionsList';

export class Votes extends Component {
    static displayName = Votes.name;
    constructor(props) {
        super(props);

        this.state = {
            resolutionId: '',
            refreshNeeded: false,
        }
    }

    RefreshComponent = () => {
        this.setState({
            refreshNeeded: !this.state.refreshNeeded
        });
    }

    VoteForResolution = (singleId) => {

    }

    render() {
        return (
            <div style={{ marginTop: 30 }}>
                <ActiveResolutionsList refreshNeeded={this.state.refreshNeeded} VoteForResolution={this.VoteForResolution} RefreshComponent={this.RefreshComponent} />
            </div >
        )
    }
}