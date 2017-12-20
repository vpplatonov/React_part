import React, { Component } from 'react';
import MobileMenu from './MobileMenu';


class NavBar extends Component {
    constructor (props) {
        super(props)
        this.state = {}
    }

    render() {
        const menuLinks = {
            dashboard: {
                to: '/',
                text: 'Dashboard',
                description: 'Dashboard',
                icon: '',
                children: {},
                visible: this.props.isAuthenticated
            },
            statistics: {
                to: '/',
                text: 'Statistics',
                description: 'Statistics',
                icon: '',
                children: {}
            },
            settings: {
                to: '/',
                text: 'Settings',
                description: 'My Settings',
                icon: '',
                children: {
                    senders: {
                        to: '/senders',
                        text: 'Senders',
                        description: 'My senders',
                        icon: ''
                    }
                }
            },
            account: {
                to: '/',
                text: 'Account',
                description: 'My Account',
                icon: '',
                children: {}
            },
            billing: {
                to: '/',
                text: 'Billing',
                description: 'Billing',
                icon: '',
                children: {}
            },
            login: {
                to: '/login',
                text: 'login',
                description: 'login',
                icon: 'login',
                visible: !this.props.isAuthenticated
            },
            logout: {
                to: '/logout',
                text: 'Logout',
                description: 'Logout',
                icon: 'logout',
                visible: this.props.isAuthenticated
            }
        }

        return (
            <MobileMenu
                menuLinks={menuLinks}
                isAuthenticated={this.props.isAuthenticated}
                isAdmin={this.props.isAdmin}
            />
        )
    }
}

export default NavBar
