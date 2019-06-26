import React, { Component } from 'react';
import { MDBDataTable, MDBBtn } from '../../modifiedNpmPackages/mdbreact/dist/mdbreact';
import { getJWTtoken } from '../../helpers/jwtHandler';
import PrintResolutions from '../ResolutionComponents/PrintResolutions';
import { trackPromise } from 'react-promise-tracker';
import qs from 'qs';
import axios from 'axios';

export class ActiveResolutionsListUser extends Component {
    static displayName = ActiveResolutionsListUser.name;
    constructor(props) {
        super(props);

        this.state = {
            ResolutionsList: [],
            ResolutionsData: [],

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
                        label: 'Szczegóły/Głosuj',
                        field: 'details',
                        sort: 'asc',
                        width: 100
                    },
                    {
                        label: 'Druk',
                        field: 'print',
                        sort: 'asc',
                        width: 20
                    }
                ],
                rows: []
            }
        }
    }

    componentDidUpdate = async () => {
        if (this.props.refreshNeeded === true) {
            await this.downloadActiveResolutions();
            await this.props.RefreshComponent();
        }
    }

    componentDidMount = () => {
        this.downloadActiveResolutions();
    }

    PrepareArrayOfObjects = () => {
        axios.get('api/Resolution/GetResolutionsById', {
            headers: {
                Authorization: getJWTtoken()
            },
            params: {
                resolutionsId: this.state.ResolutionsList
            },
            paramsSerializer: params => {
                return qs.stringify(params)
            }
        }).then(result => {
            console.log(result.data)
            this.setState({
                ResolutionsData: result.data
            });
        })
        console.log(this.state.ResolutionsData);
    }

    handleOptionChange = (singleId) => {
        let checkboxData = Object.assign([], this.state.ResolutionsList);

        var exist = checkboxData.includes(singleId);
        if (exist) {
            var index = checkboxData.indexOf(singleId);
            if (index > -1) {
                checkboxData.splice(index, 1);
            }
        }
        else {
            checkboxData.push(singleId);
        }
        this.setState({
            ResolutionsList: checkboxData
        }, () => {
            this.PrepareArrayOfObjects()
        })
    }

    downloadActiveResolutions() {
        let data = Object.assign({}, this.state.data);
        trackPromise(
        fetch('api/Resolution/GetActiveResolutions', {
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

                    data.rows[i].details = <MDBBtn label="Details" className="button tiny success" onClick={() => this.props.ShowResolutionDetails(singleId)} style={{ marginBottom: 0 }}>Szczegóły/Głosuj</MDBBtn>

                    data.rows[i].print = <input type="checkbox" value={singleId} name={singleId} onChange={() => this.handleOptionChange(singleId)} />
                }

                this.setState({ data });
            }))
    }

    render() {
        return (
            <div>
                <div className="row customToolbar">
                    <PrintResolutions ResolutionsData={this.state.ResolutionsData} />
                </div>
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

export default ActiveResolutionsListUser;