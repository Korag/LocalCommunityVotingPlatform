import React, { Component } from 'react';
import { ActiveResolutionsList_User } from './ActiveResolutionsList_User';
import { ResolutionDetails } from '../ResolutionComponents/ResolutionDetails';

export class Resolutions_User extends Component {
    static displayName = Resolutions_User.name;
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
                    ? <ActiveResolutionsList_User refreshNeeded={this.state.refreshNeeded} ShowResolutionDetails={this.ShowResolutionDetails} RefreshComponent={this.RefreshComponent} />
                    : <ResolutionDetails ShowResolutionDetails={this.ShowResolutionDetails} history={this.props.history} resolutionId={this.state.resolutionId} />
                }
            </div>
        )
    }
}