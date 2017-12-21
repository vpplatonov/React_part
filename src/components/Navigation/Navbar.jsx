import React, { Component } from 'react';
import DesktopMenu from './DesktopMenu';
import MainMenuMobileComponent from './MainMenuMobileComponent';


class NavBar extends Component {
    constructor (props) {
        super(props);
        this.state = {};
    }

    render() {
        const menuLinks = {
            dashboard: {
                to: '/',
                text: 'Dashboard',
                description: 'Dashboard',
                icon: '',
                visible: this.props.isAuthenticated
            },
            statistics: {
                to: '/statistics',
                text: 'Statistics',
                description: 'Statistics',
                icon: '',
                visible: this.props.isAuthenticated,
                children: {
                    overview: {
                        to: '/statistics/overview',
                        text: 'Overview',
                        description: 'overview',
                        icon: ''
                    },
                    emailqueue: {
                        to: '/statistics/emailqueue',
                        text: 'Email queue',
                        description: 'Email queue',
                        icon: ''
                    },
                    reporting: {
                        to: '/statistics/reporting',
                        text: 'Reporting',
                        description: 'Reporting',
                        icon: ''
                    },
                    deliverability: {
                        to: '/statistics/deliverability',
                        text: 'Deliverability',
                        description: 'Deliverability',
                        icon: ''
                    },
                    bouncesblocks: {
                        to: '/statistics/bouncesblocks',
                        text: 'Bounces & Blocks',
                        description: 'Bounces & Blocks',
                        icon: ''
                    },
                }
            },
            settings: {
                to: '/settings',
                text: 'Settings',
                description: 'My Settings',
                icon: '',
                visible: this.props.isAuthenticated,
                children: {
                    general: {
                        to: '/settings/general',
                        text: 'General',
                        description: 'General',
                        icon: ''
                    },
                    senders: {
                        to: '/senders',
                        text: 'Senders',
                        description: 'My senders',
                        icon: ''
                    },
                    api: {
                        to: '/settings/api',
                        text: 'API',
                        description: 'API',
                        icon: ''
                    },
                    notifications: {
                        to: '/settings/dedip',
                        text: 'Dedicated IP',
                        description: 'dedicated ip',
                        icon: ''
                    },
                    dedicatedIP: {
                        to: '/settings/notifications',
                        text: 'Notifications',
                        description: 'notifications',
                        icon: ''
                    }
                }
            },
            account: {
                to: '/account',
                text: 'Account',
                description: 'My Account',
                icon: '',
                visible: this.props.isAuthenticated,
                children: {
                    general: {
                        to: '/accounts/general',
                        text: 'Dedicated IP',
                        description: 'dedicated ip',
                        icon: ''
                    },
                    contacts: {
                        to: '/accounts/contacts',
                        text: 'Contacts',
                        description: 'Contacts',
                        icon: ''
                    },
                    features: {
                        to: '/accounts/features',
                        text: 'Account-wide features',
                        description: 'Account-wide features',
                        icon: ''
                    },
                }
            },
            billing: {
                to: '/billing',
                text: 'Billing',
                description: 'Billing',
                icon: '',
                visible: this.props.isAuthenticated,
                children: {
                    overview: {
                        to: '/billing/overview',
                        text: 'Overview',
                        description: 'Overview',
                        icon: ''
                    },
                    invoices: {
                        to: '/billing/invoices',
                        text: 'Invoices',
                        description: 'Invoices',
                        icon: ''
                    },
                }
            },
            admin: {
                to: '/admin',
                text: 'Admin area',
                description: 'Admin area',
                icon: '',
                visible: this.props.isAuthenticated && this.props.isAdmin,
                children: {
                    users: {
                        to: '/users',
                        text: 'Users',
                        description: 'users',
                        icon: 'users',
                    },
                    register: {
                        to: '/register',
                        text: 'Register',
                        description: 'register',
                        icon: 'register',
                    },
                    status: {
                        to: '/status',
                        text: 'User status',
                        description: 'status',
                        icon: 'status',
                    }
                }
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
        };

        let contentElement_elMainMenuSwapper;  // This element's content can vary based on screen size
        contentElement_elMainMenuSwapper = (
            <MainMenuMobileComponent
                menuLinks={menuLinks}
                isAuthenticated={this.props.isAuthenticated}
                isAdmin={this.props.isAdmin}
            />
        );
        if (this.props.deviceInfo.screenFormatId === 'wide-tablet') {
            contentElement_elMainMenuSwapper = (
                <DesktopMenu
                    menuLinks={menuLinks}
                    isAuthenticated={this.props.isAuthenticated}
                    isAdmin={this.props.isAdmin}
                />
            );
        }

        return (
            <div className="screenFgContainer">
                <div className="foreground">
                    <div className='hasNestedComps elMainMenuSwapper'>
                        {contentElement_elMainMenuSwapper}
                    </div>
                </div>
            </div>
        )
    }
}

export default NavBar
