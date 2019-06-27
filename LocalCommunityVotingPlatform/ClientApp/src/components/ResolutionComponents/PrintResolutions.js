import React from "react";
import ReactToPrint from "react-to-print";
import PropTypes from "prop-types";
import { MDBTable, MDBTableBody, MDBTableHead } from '../../modifiedNpmPackages/mdbreact';

const hidden = {
    "display": "none"
}

class ComponentToPrint extends React.Component {
    constructor(props) {
        super(props);

        console.log(this.props.ResolutionsData)
    }

    render() {
        return (
            <div className="pdf">
                <div className="text-center headerStyle">
                    <h1>Społeczność testowa</h1>
                </div>
                <div style={{ marginTop: 30 }}>
                    <div className="row">
                        <p>Imię i nazwisko głosującego: ........................................................................</p>
                        <p style={{ marginLeft: 180 }}>Data oddania głosu: ...............................................</p>
                    </div>
                    <div className="row">
                        <p>Adres zamieszkania: .....................................................................................</p>
                    </div>


                </div>

                {this.props.ResolutionsData.map(function (d, idx) {
                    return (
                        <div key={idx} style={{ marginTop: 30 }}>
                            <div className="card" style={{ width: 920 }}>
                                <div className="card-divider">
                                    <h5>{d.indexer}</h5>
                                </div>
                                <div className="card-section">
                                    <h5 style={{ textAlign: "center" }}>{d.title}</h5>
                                    <div className="card" style={{ width: 890 }}>
                                        <p>{d.description}</p>
                                    </div>
                                </div>

                                <h5 style={{ textAlign: "center" }}>Głosowanie</h5>
                                <table className="table-pdf" border="2">
                                    <thead>
                                        <tr className="tr-pdf">
                                            <th className="td-pdf">Za</th>
                                            <th className="td-pdf">Przeciw</th>
                                            <th className="td-pdf">Wstrzymaj się</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="tr-pdf">
                                            <td className="td-pdf"></td>
                                            <td className="td-pdf"></td>
                                            <td className="td-pdf"></td>
                                        </tr>
                                    </tbody>
                                </table>

                                <div style={{ marginLeft: 660 }}>
                                    <p>Głosowanie otwarte do: {d.activeToVoteBeforeDate}</p>
                                </div>
                            </div>

                            {console.log(d)}
                        </div>

                    )
                })}
            </div>
        );
    }
}

class PrinResolutions extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="float-center" style={{ marginRight: 0 }}>
                <ReactToPrint
                    trigger={() => <button className="button">Drukuj</button>}
                    content={() => this.componentRef}
                />
                <div className="hidden" style={hidden}>
                    <ComponentToPrint ResolutionsData={this.props.ResolutionsData} ref={el => (this.componentRef = el)} />;
                </div>
            </div>
        );
    }
}

export default PrinResolutions;
