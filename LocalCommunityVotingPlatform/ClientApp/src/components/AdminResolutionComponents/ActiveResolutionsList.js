import React, { Component } from 'react';
import { MDBDataTable, MDBBtn } from '../../modifiedNpmPackages/mdbreact/dist/mdbreact';
import { getJWTtoken } from '../../helpers/jwtHandler';
import DeleteResolutionConfirmationModal from './DeleteResolutionConfirmationModal';

export class ActiveResolutionsList extends Component {
    static displayName = ActiveResolutionsList.name;
    constructor(props) {
        super(props);

        this.state = {
            data: {
                columns: [
                    {
                        label: 'Indeks',
                        field: 'indexer',
                        sort: 'desc',
                        width: 50
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
                        width: 80
                    },
                    {
                        label: 'Szczegóły/Głosuj',
                        field: 'details',
                        sort: 'asc',
                        width: 100
                    },
                    {
                        label: 'Edytuj',
                        field: 'edit',
                        sort: 'asc',
                        width: 100
                    },
                    {
                        label: 'Usuń',
                        field: 'delete',
                        sort: 'asc',
                        width: 100
                    }
                ],
                rows: []
            }
        }
    }

    componentDidUpdate = async () => {
        if (this.props.refreshNeeded === true) {
            await this.downloadResolutions();
            await this.props.RefreshComponent();
        }
    }

    componentDidMount = () => {
        this.downloadResolutions();
    }

    downloadResolutions() {
        let data = Object.assign({}, this.state.data);

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
                        edit: '',
                        delete: ''
                    }

                    console.log(result);

                    data.rows.push(object);

                    console.log(data);

                    data.rows[i].details = <MDBBtn label="Details" className="button tiny success" onClick={() => this.props.ShowResolutionDetails(singleId)} style={{ marginBottom: 0 }}>Szczegóły/Głosuj</MDBBtn>

                    data.rows[i].edit = <MDBBtn label="Update" className="button tiny warning" onClick={() => this.props.ShowFormEditResolution(singleId)} style={{ marginBottom: 0 }}>Edytuj</MDBBtn>

                    //data.rows[i].delete = <MDBBtn label="Delete" className="button tiny alert" onClick={() => { if (window.confirm(`Czy na pewno chcesz usunąć uchwałę "${resolutionCredentials}" ?`)) this.props.DeleteResolution(singleId) }} style={{ marginBottom: 0 }}>Usuń</MDBBtn>
                    data.rows[i].delete = <DeleteResolutionConfirmationModal resolutionCredentials={result[i].indexer} DeleteResolution={() => this.props.DeleteResolution(singleId)}/>
                }
                this.setState({ data });
            })
    }

    render() {
        return (
            <div>
                <div className="row customToolbar">
                    <button className="button float-left" onClick={() => this.props.ShowFormAddResolution()}>Dodaj nową uchwałę</button>
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

export default ActiveResolutionsList;