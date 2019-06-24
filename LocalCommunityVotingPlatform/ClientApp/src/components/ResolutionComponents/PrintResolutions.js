import React from "react";
import ReactToPrint from "react-to-print";
import PropTypes from "prop-types";

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

                {this.props.ResolutionsData.map(function (d, idx) {
                    return (
                        <div key={idx} style={{ marginTop: 30 }}>
                            <div className="card" style={{ width: 920 }}>
                                <div className="card-divider">
                                    <h4>{d.indexer} {d.title}</h4>
                                </div>
                                <div className="card-section">
                                    <p>{d.description}</p>
                                </div>
                                <div style={{marginLeft:820}}>
                                    <p>{d.activeToVoteBeforeDate}</p>
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
