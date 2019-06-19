import React, { Component } from 'react';

export class ArchiveResolutions extends Component {
    static displayName = ArchiveResolutions.name;
    constructor(props) {
        super(props);


    }

    RefreshComponent = () => {
        this.setState({
            refreshNeeded: !this.state.refreshNeeded
        });
    }

    render() {
        return
              <div>

             </div>
    }
}

export default ArchiveResolutions;