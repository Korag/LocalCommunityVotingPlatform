import React, { Component } from 'react';
import { ActiveResolutionsList } from './ActiveResolutionsList';
import { UpdateResolution } from './UpdateResolution';
import { AddResolution } from './AddResolution';
import { ResolutionDetails } from '../ResolutionComponents/ResolutionDetails';
import { NotificationManager } from 'react-notifications';

import axios from 'axios'
import { getJWTtoken } from '../../helpers/jwtHandler'

export class Resolutions extends Component {
    static displayName = Resolutions.name;
    constructor(props) {
        super(props);

        this.state = {
            showList: true,
            resolutionId: '',
            addResolutionReq: false,
            refreshNeeded: false,

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

    ShowFormAddResolution = () => {
        console.log("jestem");
        this.setState({
            addResolutionReq: !this.state.addResolutionReq,
        })
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
                this.RefreshComponent();
                NotificationManager.success('Uchwała została usunięta', 'Usuwanie uchwały');
            });
    }

    render() {
        if (!this.state.addResolutionReq && !this.state.showResolutionDetails) {
            return <div style={{ marginTop: 30 }}>
                {this.state.showList
                    ? <ActiveResolutionsList ShowFormEditResolution={this.ShowFormEditResolution} ShowResolutionDetails={this.ShowResolutionDetails} DeleteResolution={this.DeleteResolution} ShowFormAddResolution={this.ShowFormAddResolution} refreshNeeded={this.state.refreshNeeded} RefreshComponent={this.RefreshComponent} />
                    : <UpdateResolution ShowFormEditResolution={this.ShowFormEditResolution} resolutionId={this.state.resolutionId} />
                }
            </div>
        }
        else if (this.state.addResolutionReq && !this.state.showResolutionDetail) {
            return <div style={{ marginTop: 30 }}>
                <AddResolution ShowFormAddResolution={this.ShowFormAddResolution} />
            </div>
        }
        else {
            return <div style={{ marginTop: 30 }}>
                <ResolutionDetails ShowResolutionDetails={this.ShowResolutionDetails} history={this.props.history} resolutionId={this.state.resolutionId} />
            </div>
        }
    }
}

export default Resolutions;