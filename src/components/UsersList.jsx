import React from 'react';
import { Icon, Menu, Table } from 'semantic-ui-react';

const UsersList = (props) => {
  return (
    <div>
      <h1>{props.title}</h1>
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>User ID</Table.HeaderCell>
            <Table.HeaderCell>Email</Table.HeaderCell>
            <Table.HeaderCell>Username</Table.HeaderCell>
            <Table.HeaderCell>Created Date</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {
            props.users.map((user) => {
              return (
                  <Table.Row key={user.id}>
                    <Table.Cell>{user.id}</Table.Cell>
                    <Table.Cell>{user.email || user.login}</Table.Cell>
                    <Table.Cell>{user.username || user.label}</Table.Cell>
                    <Table.Cell>{user.created_at}</Table.Cell>
                  </Table.Row>
              )
            })
          }
        </Table.Body>

        <Table.Footer>
          <Table.Row>
            <Table.HeaderCell colSpan='4'>
              <Menu floated='right' pagination>
                <Menu.Item as='a' icon>
                  <Icon name='left chevron' />
                </Menu.Item>
                <Menu.Item as='a'>1</Menu.Item>
                <Menu.Item as='a'>2</Menu.Item>
                <Menu.Item as='a'>3</Menu.Item>
                <Menu.Item as='a'>4</Menu.Item>
                <Menu.Item as='a' icon>
                  <Icon name='right chevron' />
                </Menu.Item>
              </Menu>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
      </Table>
    </div>
  )
};

export default UsersList;
