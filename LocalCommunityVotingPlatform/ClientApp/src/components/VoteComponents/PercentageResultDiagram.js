import React, { Component } from 'react';

import { Bar } from "react-chartjs-2";
import { MDBContainer } from "mdbreact";

import { getJWTtoken } from '../../helpers/jwtHandler'
import axios from 'axios'

export class PercentageResultDiagram extends Component {
    static displayName = PercentageResultDiagram.name;
    constructor(props) {
        super(props);

        this.state = {
            dataBar: {
                labels: ["Za", "Przeciw", "Wstrzymaj się"],
                datasets: [
                    {
                        label: "% oddanych głosów",
                        data: [0, 0, 0],
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
        axios.get('api/Vote/GetVoteOnResolutionStatisticsPercentage', {
            headers: {
                Authorization: getJWTtoken()
            },
            params: {
                resolutionId: this.props.resolutionId
            }
        }).then(result => {
            let databar = Object.assign({}, this.state.dataBar);
            databar.datasets[0].data = result.data.arrayWithStatistics;

            this.setState({
                databar
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
            <MDBContainer>
                <Bar data={this.state.dataBar} options={this.state.barChartOptions} className="text-white" />
            </MDBContainer>
        )
    }
}

export default PercentageResultDiagram;






