import React, { Component } from 'react';
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';

class DeleteResolutionConfirmationModal extends Component {
    static displayName = DeleteResolutionConfirmationModal.name;
    constructor(props) {
        super(props);
    }

    state = {
        modal: false
    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    }

    DeleteResolutionFromModal = () => {
        this.props.DeleteResolution();
        this.toggle();
    }

    render() {
        return (
            <MDBContainer className="buttonToLeft">
                <MDBBtn className="button tiny alert" style={{ marginBottom: 0 }} onClick={this.toggle}>Usuń</MDBBtn>
                <MDBModal isOpen={this.state.modal} toggle={this.toggle}>
                    <MDBModalHeader toggle={this.toggle}>Usuwanie uchwały</MDBModalHeader>
                    <MDBModalBody>
                       Czy na pewno chcesz usunąć uchwałę "{this.props.resolutionCredentials}" ?
        </MDBModalBody>
                    <MDBModalFooter>
                        <MDBBtn color="secondary" onClick={this.toggle}>Anuluj</MDBBtn>
                        <MDBBtn color="primary" onClick={this.DeleteResolutionFromModal}>Usuń</MDBBtn>
                    </MDBModalFooter>
                </MDBModal>
            </MDBContainer>
        );
    }
}

export default DeleteResolutionConfirmationModal;