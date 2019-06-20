import React, { Component } from 'react';

export class VoteForResolution extends Component {
    static displayName = VoteForResolution.name;
    constructor(props) {
        super(props);
    }

    RefreshComponent = () => {
        this.setState({
            refreshNeeded: !this.state.refreshNeeded
        });
    }

    render() {
        return (
            <div>
              
            </div >
        )
    }
}

export default VoteForResolution;


