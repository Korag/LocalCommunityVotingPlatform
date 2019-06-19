import React, { Component } from 'react';

export class ArchiveVotes extends Component {
    static displayName = ArchiveVotes.name;
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

export default ArchiveVotes;


