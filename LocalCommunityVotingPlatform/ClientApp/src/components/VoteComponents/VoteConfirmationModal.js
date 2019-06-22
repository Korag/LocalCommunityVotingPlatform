import React, { Component } from 'react';
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';

class VoteConfirmationModal extends Component {
    static displayName = VoteConfirmationModal.name;
    constructor(props) {
        super(props);

        this.state = ({
            disabled: false
        });
    }

    state = {
        modal: false
    }

    toggle = () => {
        if (this.props.selectedOption === '0') {
            this.setState({
                disabled: true
            });
        }
        else {
            this.setState({
                disabled: false
            });  
        }
        this.setState({
            modal: !this.state.modal
        });
        console.log(this.props.selectedOption)
    }

    VoteForResolution = (e) => {
        this.props.Vote(e);
        this.toggle();
    }

    GetChosenOptionName = () => {
        switch (this.props.selectedOption) {
            case '1':
                return "Za"
            case '2':
                return "Przeciw"
            case '3':
                return "Wstrzymaj się"
        }
    }

    render() {
        return (
            <div className="float-center">
                <MDBBtn className="button secondary" style={{ marginBottom: 0 }} onClick={this.toggle}>Głosuj</MDBBtn>
                <MDBModal isOpen={this.state.modal} toggle={this.toggle}>
                    <MDBModalHeader toggle={this.toggle} className="text-dark">Głosowanie nad uchwałą</MDBModalHeader>
                    <MDBModalBody className="text-dark">
                        {!this.state.disabled ?
                            <p>Czy na pewno chcesz oddać swój głos o treści "{this.GetChosenOptionName()}" ? </p>
                            :
                            <p>Nie wybrano żadnej z dostępnych opcji. Powróć do panelu głosowania</p>
                        }
                    </MDBModalBody>
                    <MDBModalFooter>
                        <MDBBtn color="secondary" onClick={this.toggle}>Anuluj</MDBBtn>
                        <MDBBtn color="primary" onClick={(e) => this.VoteForResolution(e)} disabled={this.state.disabled ? "disabled" : null}>Oddaj głos</MDBBtn>
                    </MDBModalFooter>
                </MDBModal>
            </div>
        );
    }
}

export default VoteConfirmationModal;