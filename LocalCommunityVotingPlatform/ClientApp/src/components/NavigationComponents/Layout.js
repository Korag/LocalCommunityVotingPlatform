import React, { Component } from 'react';
import { Container } from 'reactstrap';

import { NavMenu } from './NavMenu';

import { Route } from 'react-router';

import { Users } from '../UserComponents/Users';
import { UserData } from '../UserComponents/UserData';

import { Resolutions } from '../AdminResolutionComponents/Resolutions';
import { ArchiveResolutionsList } from '../AdminResolutionComponents/ArchiveResolutionsList'

import { Resolutions_User } from '../UserResolutionComponents/Resolutions_User'
import { ArchiveResolutionList_User } from '../UserResolutionComponents/ArchiveResolutionList_User'


export class Layout extends Component {
    static displayName = Layout.name;

    constructor(props) {
        super(props);

        console.log(this.props.SuperUser);
    };

    render() {
        return (
            <div>
                <NavMenu Logout={this.props.Logout} SuperUser={this.props.SuperUser} />
                <div className="wrapper">

                    {this.props.SuperUser.data ?
                        <Route path='/' exact component={Resolutions} />
                        :
                        <Route path='/' exact component={Resolutions_User} />
                    }

                    {this.props.SuperUser.data ?
                        <Route path='/archive' exact component={ArchiveResolutionsList} />
                        :
                        <Route path='/archive' exact component={ArchiveResolutionList_User}/>
                    }

                    {this.props.SuperUser.data ?
                        <Route path='/users' component={Users} />
                        :
                        null
                    }

                    <Route path='/userdata' component={UserData} />
                </div>
            </div>
        );
    }
}
