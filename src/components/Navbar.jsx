import React from 'react';
import { Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const NavBar = (props) => (

  <Menu stackable inverted>
    <Menu.Item as={Link} to='/'>
      Dashboard
    </Menu.Item>

    {props.isAuthenticated &&
      <Menu.Item as={Link} to='/users'>
          Users
      </Menu.Item>
    }

    {props.isAuthenticated &&
      <Menu.Item as={Link} to='/senders'>
          Senders
      </Menu.Item>
    }

    <Menu.Item as={Link} to='/about'>
      About
    </Menu.Item>
    {props.isAuthenticated && props.isAdmin &&
      <Menu.Item as={Link} to='/status'>
          User Status
      </Menu.Item>
     }
    <Menu.Menu position='right'>
        {props.isAuthenticated && props.isAdmin &&
            <Menu.Item as={Link} to='/register'>
                Register
            </Menu.Item>
        }
        {!props.isAuthenticated &&
            <Menu.Item as={Link} to='/login'>
                Login
            </Menu.Item>
        }
        {props.isAuthenticated &&
            <Menu.Item as={Link} to='/logout'>
                Logout
            </Menu.Item>
        }
     </Menu.Menu>
  </Menu>
)

export default NavBar
