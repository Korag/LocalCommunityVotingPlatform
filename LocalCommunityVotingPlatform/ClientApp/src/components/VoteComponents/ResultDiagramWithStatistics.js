import React, { Component } from 'react';

export class ResultDiagramWithStatistics extends Component {
    static displayName = ResultDiagramWithStatistics.name;
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

export default ResultDiagramWithStatistics;


