import React, { Component } from 'react';
import { MDBDataTable, MDBInput, MDBBtn } from 'mdbreact';
import { getJWTtoken } from '../../helpers/jwtHandler'


export class ResolutionsTableAdministrative extends Component {
    static displayName = ResolutionsTableAdministrative.name;
    constructor(props) {
        super(props);

        this.state = {
            data: {
                columns: [
                    {
                        label: 'Indeks',
                        field: 'indexer',
                        sort: 'asc',
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
                        label: 'Edytuj',
                        field: 'edit',
                        sort: 'asc',
                        width: 100
                    }
                    ,
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
        if (this.props.refreshNeeded == true) {
            await this.downloadResolutions();
            await this.props.RefreshComponent();
        }
    }

    componentDidMount = () => {
        this.downloadResolutions();
    }

    downloadResolutions() {
        let data = Object.assign({}, this.state.data);

        fetch('api/Resolution/GetResolutions', {
            headers: {
                Authorization: getJWTtoken()
            }
        })
            .then(response => response.json())
            .then(result => {
                console.log(result);

                //data.rows = result;
                var tmp = result;

                for (let i = 0; i < tmp.length; i++) {
                    let singleId = tmp[i].id;
                    let resolutionCredentials = tmp[i].indexer + " " + tmp[i].title;

                    console.log(singleId);
                    console.log(resolutionCredentials);

                    data.rows[i].push(tmp[i].indexer);
                    data.rows[i].push(tmp[i].title);
                    data.rows[i].push(tmp[i].description);
                    data.rows[i].push(tmp[i].activeToVoteBeforeDate);
                    data.rows[i].push(tmp[i].edit);
                    data.rows[i].push(tmp[i].delete);

                    data.rows[i].edit = <MDBBtn label="Update" className="button tiny success" onClick={() => this.props.ShowFormEditResolution(singleId)} style={{ marginBottom: 0 }}>Edytuj</MDBBtn>
                    data.rows[i].delete = <MDBBtn label="Delete" className="button tiny alert" onClick={() => { if (window.confirm(`Czy na pewno chcesz usunąć uchwałę "${resolutionCredentials}" ?`)) this.props.DeleteResolution(singleId) }} style={{ marginBottom: 0 }}>Usuń</MDBBtn>
                }

                this.setState({ data });
            })
    }

    render() {
        return (
            <div>
                <div className="row">
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

export default ResolutionsTableAdministrative;