import React, { Component } from 'react';
import { ArchiveResolutionsList } from './ArchiveResolutionsList';
import { UpdateResolution } from './UpdateResolution';
import { ResolutionDetails } from '../ResolutionComponents/ResolutionDetails';

import axios from 'axios'
import { getJWTtoken } from '../../helpers/jwtHandler'

export class ArchiveResolutions extends Component {
    static displayName = ArchiveResolutions.name;
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

    ShowFormEditResolution = (resolutionIdFromButton) => {
        this.setState({
            showList: !this.state.showList,
            resolutionId: resolutionIdFromButton
        })
        console.log(resolutionIdFromButton);
        console.log(this.state.resolutionId)
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

    DeleteResolution = (resolutionIdFromButton) => {

        axios.defaults.headers.common['Authorization'] = getJWTtoken();
        axios.post('/api/Resolution/DeleteResolution', null,
            {
                params:
                {
                    resolutionId: resolutionIdFromButton
                }
            }).then(res => {
                this.RefreshComponent()
            });
    }

    render() {
        if (!this.state.showResolutionDetails) {
            return <div style={{ marginTop: 30 }}>
                {this.state.showList
                    ? <ArchiveResolutionsList ShowFormEditResolution={this.ShowFormEditResolution} ShowResolutionDetails={this.ShowResolutionDetails} DeleteResolution={this.DeleteResolution} refreshNeeded={this.state.refreshNeeded} RefreshComponent={this.RefreshComponent} />
                    : <UpdateResolution ShowFormEditResolution={this.ShowFormEditResolution} resolutionId={this.state.resolutionId} />
                }
            </div>
        }
        else {
            return <div style={{ marginTop: 30 }}>
                <ResolutionDetails ShowResolutionDetails={this.ShowResolutionDetails} history={this.props.history} blockedForVote={this.state.blockedForVote} resolutionId={this.state.resolutionId} />
            </div>
        }
    }
}

export default ArchiveResolutions;