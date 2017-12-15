import React from 'react';
import { Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const NavBar = (props) => (

  <Menu stackable inverted>
    <img src='/logo.png' />
    <Menu.Item as={Link} to='/'>
      Home
    </Menu.Item>

    <Menu.Item as={Link} to='/about'>
      About
    </Menu.Item>

    <Menu.Item as={Link} to='/status'>
      User Status
    </Menu.Item>
    <Menu.Menu position='right'>
        <Menu.Item as={Link} to='/register'>
          Register
        </Menu.Item>
         <Menu.Item as={Link} to='/login'>
          Login
        </Menu.Item>
        <Menu.Item as={Link} to='/logout'>
          Logout
        </Menu.Item>
     </Menu.Menu>
  </Menu>
)

export default NavBar
