import React, { Component } from 'react';
import { NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import './NavMenu.css';

import $ from 'jquery';
import 'foundation-sites';

export class NavMenu extends Component {
    static displayName = NavMenu.name;

    constructor(props) {
        super(props);

        this.toggleNavbar = this.toggleNavbar.bind(this);
        this.state = {
            collapsed: true
        };
    }

    componentDidMount() {
        $(document).foundation();
    }

    toggleNavbar() {
        this.setState({
            collapsed: !this.state.collapsed
        });
    }

    render() {
        return (

            <header>
                <div className="title-bar" data-responsive-toggle="example-menu" data-hide-for="medium">
                    <button className="menu-icon" type="button" data-toggle="example-menu"></button>
                    <div className="title-bar-title">Menu</div>
                </div>
                <div className="top-bar" id="example-menu">
                    <div className="top-bar-left">
                        <ul className="dropdown menu" data-dropdown-menu>
                            <li className="menu-text">{this.props.CommunityName}</li>

                            <NavItem>
                                <NavLink tag={Link} to="/">Aktualne uchwały</NavLink>
                            </NavItem>

                            <NavItem>
                                <NavLink tag={Link} to="/archive">Archiwalne uchwały</NavLink>
                            </NavItem>

                            {this.props.SuperUser ?
                                <NavItem>
                                    <NavLink tag={Link} to="/users">Użytkownicy</NavLink>
                                </NavItem>
                                : null}

                            <NavItem>
                                <NavLink tag={Link} to="/userdata">Moje dane</NavLink>
                            </NavItem>

                        </ul>
                    </div>
                    <div className="top-bar-right">
                        <ul className="menu align-right">
                            <li><button className="button alert" onClick={this.props.Logout}>Wyloguj</button></li>
                        </ul>
                    </div>
                </div>
            </header>
        );
    }
}
