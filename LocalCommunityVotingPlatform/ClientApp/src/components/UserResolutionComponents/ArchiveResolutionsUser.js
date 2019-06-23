import React, { Component } from 'react';
import { ArchiveResolutionsListUser } from './ArchiveResolutionsListUser';
import { ResolutionDetails } from '../ResolutionComponents/ResolutionDetails';

export class ArchiveResolutionsUser extends Component {
    static displayName = ArchiveResolutionsUser.name;
    constructor(props) {
        super(props);

        this.state = {
            showList: true,
            resolutionId: '',
            refreshNeeded: false,

            blockedForVote: true,
            showResolutionDetails: false
        }
    }

    ShowResolutionDetails = (singleId) => {
        this.setState({
            showResolutionDetails: !this.state.showResolutionDetails,
            resolutionId: singleId
        })
    }

    RefreshComponent = () => {
        this.setState({
            refreshNeeded: !this.state.refreshNeeded
        });
    }

    render() {
        if (this.state.showList && !this.state.showResolutionDetails) {
            return (
            <div>
                <ArchiveResolutionsListUser ShowFormEditResolution={this.ShowFormEditResolution} ShowResolutionDetails={this.ShowResolutionDetails} refreshNeeded={this.state.refreshNeeded} RefreshComponent={this.RefreshComponent} />
                </div>
                )
        }
        else {
            return (
                <div style={{ marginTop: 30 }}>
                <ResolutionDetails ShowResolutionDetails={this.ShowResolutionDetails} history={this.props.history} blockedForVote={this.state.blockedForVote} resolutionId={this.state.resolutionId} />
                </div>
            )
        }
    }
}

export default ArchiveResolutionsUser;