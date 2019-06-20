import React, { Component } from 'react';
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';

class DeleteUserConfirmationModal extends Component {
    static displayName = DeleteUserConfirmationModal.name;
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

    DeleteUserFromModal = () => {
        this.props.DeleteUser();
        this.toggle();
    }

    render() {
        return (
            <MDBContainer className="buttonToLeft">
                <MDBBtn className="button tiny alert" style={{ marginBottom: 0 }} onClick={this.toggle}>Usuń</MDBBtn>
                <MDBModal isOpen={this.state.modal} toggle={this.toggle}>
                    <MDBModalHeader toggle={this.toggle}>Usuwanie użytkownika</MDBModalHeader>
                    <MDBModalBody>
                        Czy na pewno chcesz usunąć użytkownika "{this.props.userCredentials}" ?
        </MDBModalBody>
                    <MDBModalFooter>
                        <MDBBtn color="secondary" onClick={this.toggle}>Anuluj</MDBBtn>
                        <MDBBtn color="primary" onClick={this.DeleteUserFromModal}>Usuń</MDBBtn>
                    </MDBModalFooter>
                </MDBModal>
            </MDBContainer>
        );
    }
}

export default DeleteUserConfirmationModal;