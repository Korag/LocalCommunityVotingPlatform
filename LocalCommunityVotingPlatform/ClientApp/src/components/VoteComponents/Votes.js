import React, { Component } from 'react';
import { ActiveResolutionsList } from './ActiveResolutionsList';
import { ResolutionDetails } from '../ResolutionComponents/ResolutionDetails';

export class Votes extends Component {
    static displayName = Votes.name;
    constructor(props) {
        super(props);

        this.state = {
            resolutionId: '',
            showResolutionDetails: false,

            refreshNeeded: false,
        }
    }

    RefreshComponent = () => {
        this.setState({
            refreshNeeded: !this.state.refreshNeeded
        });
    }

    ShowResolutionDetails = (singleId) => {
        this.setState({
            showResolutionDetails: !this.state.showResolutionDetails,
            resolutionId: singleId
        })
    }

    render() {
        return (
            <div style={{ marginTop: 30 }}>
                {!this.state.showResolutionDetails
                    ? <ActiveResolutionsList refreshNeeded={this.state.refreshNeeded} ShowResolutionDetails={this.ShowResolutionDetails} RefreshComponent={this.RefreshComponent} />
                    : <ResolutionDetails ShowResolutionDetails={this.ShowResolutionDetails} history={this.props.history} resolutionId={this.state.resolutionId} />
                }
            </div>
        )
    }
}