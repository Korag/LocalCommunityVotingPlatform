import React, { Component } from 'react';

export class ValidationHandler extends Component {
    static displayName = ValidationHandler.name;

    constructor(props) {
        super(props);
    };

    validateState = () => {
        if (!this.props.validationErrors) {
            return null
        }

        if (!this.props.validationErrors[this.props.fieldName]) {
            return null
        }

        return (
            <div className='errors-container'>
                <ul>
                    {this.props.validationErrors[this.props.fieldName].map(error => <li>{error}</li>)}
                </ul>
            </div>)
    }

    render() {
        return (
            <div>{this.validateState()}</div>
        );
    }
}

export default ValidationHandler;