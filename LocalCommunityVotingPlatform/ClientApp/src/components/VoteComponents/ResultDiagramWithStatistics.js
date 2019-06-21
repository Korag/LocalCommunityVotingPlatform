import React, { Component } from 'react';

import { Bar } from "react-chartjs-2";
import { MDBContainer } from "mdbreact";

import { getJWTtoken } from '../../helpers/jwtHandler'
import axios from 'axios'

export class ResultDiagramWithStatistics extends Component {
    static displayName = ResultDiagramWithStatistics.name;
    constructor(props) {
        super(props);

        this.state = {
            voteQuantity: 0,

            dataBar: {
                labels: ["Za", "Przeciw", "Wstrzymaj się"],
                datasets: [
                    {
                        label: "% oddanych głosów",
                        data: [1],
                        backgroundColor: [
                            "rgba(124, 252, 0, 0.4)",
                            "rgba(255, 134,159,0.4)",
                            "rgba(255, 218, 128,0.4)"
                        ],
                        borderWidth: 2,
                        borderColor: [
                            "rgba(124, 252, 0, 0.4)",
                            "rgba(255, 134, 159, 1)",
                            "rgba(255, 218, 128, 1)"
                        ]
                    }
                ]
            },
            barChartOptions: {
                responsive: true,
                maintainAspectRatio: true,
                legend: {
                    labels: {
                        fontColor: 'white'
                    }
                },

                scales: {
                    xAxes: [
                        {
                            barPercentage: 1,
                            gridLines: {
                                display: true,
                                color: "rgba(255, 255, 255, 0.2)",
                            },
                            ticks: {
                                fontColor: 'white'
                            }
                        }
                    ],
                    yAxes: [
                        {
                            gridLines: {
                                display: true,
                                color: "rgba(255, 255, 255, 0.2)"
                            },
                            ticks: {
                                beginAtZero: true,
                                fontColor: 'white'
                            }
                        }
                    ]
                }
            }
        }
    }

    componentDidMount = () => {
        axios.get('api/Vote/GetVoteOnResolutionStatistics', {
            headers: {
                Authorization: getJWTtoken()
            },
            params: {
                resolutionId: this.props.resolutionId
            }
        }).then(result => {
            let dataBar = Object.assign({}, this.state.dataBar);
            dataBar.datasets.data = result.data.arrayWithStatistics;
            this.setState({
                voteQuantity: result.data.voteQuantity,
                dataBar
            });
        })
    }

    RefreshComponent = () => {
        this.setState({
            refreshNeeded: !this.state.refreshNeeded
        });
    }

    render() {
        return (
            <div>
                <div className="grid-x grid-padding-x" style={{ marginTop: 30 }}>
                    <div className="grid-container fluid callout translucent-form-overlay small-10 medium-6 large-4 cell">

                        <div className="text-center">
                            <h2>Wyniki głosowania</h2>
                        </div>

                        <form>
                            <div className="grid-container">
                                <div className="row" style={{ marginTop: 20 }}>
                                    <label>Liczba oddanych głosów</label>
                                    <input type="text" name="voteQuantity" value={this.state.voteQuantity} disabled />

                                    <MDBContainer>
                                        <Bar data={this.state.dataBar} options={this.state.barChartOptions} className="text-white" />
                                    </MDBContainer>
                                </div>

                                <div className="row" style={{ marginTop: 10 }}>
                                    <button className="button alert float-center" style={{ marginBottom: 0 }} onClick={this.props.ShowResultDiagram}>Anuluj</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default ResultDiagramWithStatistics;






