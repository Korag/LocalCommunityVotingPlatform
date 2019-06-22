import React, { Component } from 'react';
import { MDBDataTable, MDBInput, MDBBtn } from '../../modifiedNpmPackages/mdbreact/dist/mdbreact';
import { getJWTtoken } from '../../helpers/jwtHandler'

export class ArchiveResolutionList_User extends Component {
    static displayName = ArchiveResolutionList_User.name;
    constructor(props) {
        super(props);

        this.state = {
            data: {
                columns: [
                    {
                        label: 'Indeks',
                        field: 'indexer',
                        sort: 'desc',
                        width: 100
                    },
                    {
                        label: 'Tytuł',
                        field: 'title',
                        sort: 'asc',
                        width: 300
                    },
                    {
                        label: 'Treść',
                        field: 'description',
                        sort: 'asc',
                        width: 700
                    },
                    {
                        label: 'Data ważności',
                        field: 'activeToVoteBeforeDate',
                        sort: 'asc',
                        width: 100
                    },
                    {
                        label: 'Szczegóły',
                        field: 'details',
                        sort: 'asc',
                        width: 100
                    }
                ],
                rows: []
            }
        }
    }

    componentDidUpdate = async () => {
        if (this.props.refreshNeeded == true) {
            await this.downloadActiveResolutions();
            await this.props.RefreshComponent();
        }
    }

    componentDidMount = () => {
        this.downloadArchiveResolutions();
    }

    downloadArchiveResolutions() {
        let data = Object.assign({}, this.state.data);

        fetch('api/Resolution/GetArchiveResolutions', {
            headers: {
                Authorization: getJWTtoken()
            }
        })
            .then(response => response.json())
            .then(result => {
                console.log(result);
                data.rows = [];

                for (let i = 0; i < result.length; i++) {
                    let singleId = result[i].id;
                    let resolutionCredentials = result[i].indexer + " " + result[i].title;

                    let title = result[i].title.substr(0, 180);

                    if (result[i].title.length > 180) {
                        title = title + "(...)";
                    }

                    let description = result[i].description.substr(0, 300);

                    if (result[i].description.length > 300) {
                        description = description + "(...)";
                    }

                    console.log(singleId);
                    console.log(resolutionCredentials);

                    var object = {
                        indexer: result[i].indexer,
                        title: title,
                        description: description,
                        activeToVoteBeforeDate: result[i].activeToVoteBeforeDate,
                        details: '',
                    }

                    console.log(result);

                    data.rows.push(object);

                    console.log(data);

                    data.rows[i].details = <MDBBtn label="Details" className="button tiny success" onClick={() => this.props.ShowResolutionDetails(singleId)} style={{ marginBottom: 0 }}>Szczegóły</MDBBtn>
                }

                this.setState({ data });
            })
    }

    render() {
        return (
            <div>
                <MDBDataTable
                    responsive
                    striped
                    bordered
                    hover
                    data={this.state.data}
                />
            </div>
        );
    }
}

export default ArchiveResolutionList_User;


