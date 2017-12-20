import React, { Component }  from 'react';
import { Menu, Accordion, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';


export default class MobileMenu extends Component {
    constructor (props) {
        super(props)
        this.state = {}
    }

    render() {
        const {menuLinks} = this.props;

        return (
          <Menu stackable inverted>
            {menuLinks.dashboard.visible &&
              <Menu.Item as={Link} to={menuLinks.dashboard.to}>
                  {menuLinks.dashboard.text}
              </Menu.Item>
            }

            {this.props.isAuthenticated &&
              <Menu.Item as={Link} to='/senders'>
                  Senders
              </Menu.Item>
            }

            <Menu.Item as={Link} to='/about'>
              About
            </Menu.Item>

            {this.props.isAuthenticated && this.props.isAdmin &&
              <Menu.Item as={Link} to='/status'>
                  User Status
              </Menu.Item>
             }

            <Menu.Menu position='right'>
                {this.props.isAuthenticated && this.props.isAdmin &&
                  <Menu.Item as={Link} to='/users'>
                      Users
                  </Menu.Item>
                }
                {this.props.isAuthenticated && this.props.isAdmin &&
                    <Menu.Item as={Link} to='/register'>
                        Register
                    </Menu.Item>
                }
                {menuLinks.login.visible &&
                    <Menu.Item as={Link} to={menuLinks.login.to}>
                         {menuLinks.login.text}
                    </Menu.Item>
                }
                {menuLinks.logout.visible &&
                    <Menu.Item as={Link} to={menuLinks.logout.to}>
                        {menuLinks.logout.text}
                    </Menu.Item>
                }
             </Menu.Menu>
          </Menu>
        )
    }
}
