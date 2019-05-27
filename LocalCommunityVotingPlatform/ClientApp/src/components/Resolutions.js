import React, { Component } from 'react';

export class Resolutions extends Component {
    static displayName = Resolutions.name;
    constructor(props) {
        super(props);

        this.state = {
            showList: true,
            resolutionId: '',
            addResolutionReq: false,
            refreshNeeded: false,
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

    RefreshComponent = () => {
        this.setState({
            refreshNeeded: !this.state.refreshNeeded
        });
    }

    DeleteResolution = (resolutionIdFromButton) => {

        axios.defaults.headers.common['Authorization'] = getJWTtoken();
        axios.post('/api/DeleteResolution', null,
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
        if (this.state.addResolutionReq == false) {
            return <div style={{ marginTop: 30 }}>
                {this.state.showList
                    ? <UsersTable ShowFormEditResolution={this.ShowFormEditResolution} DeleteResolution={this.DeleteResolution} ShowFormAddResolution={this.ShowFormAddResolution} refreshNeeded={this.state.refreshNeeded} RefreshComponent={this.RefreshComponent} />
                    : <UpdateUser ShowFormEditResolution={this.ShowFormEditResolution} resolutionId={this.state.resolutionId} />
                }
            </div>
        }
        else {
            return <div style={{ marginTop: 30 }}>
                <AddUser ShowFormAddResolution={this.ShowFormAddResolution} />
            </div>
        }
    }
}