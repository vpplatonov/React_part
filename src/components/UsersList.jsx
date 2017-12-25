import React from 'react';
import { Icon, Menu, Table } from 'semantic-ui-react';

const UsersList = (props) => {
  return (
    <div>
      {props.title && <h4>{props.title}</h4>}
      <Table compact size='small' basic>
        <Table.Header className='backColor'>
          <Table.Row>
              {
                  props.tableHeader.map((columnName) => {
                      return (
                          <Table.HeaderCell key={columnName}>{columnName}</Table.HeaderCell>
                      )
                  })
              }
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {
            props.users.map((user, i) => {
                if (!props.rowsPerPage || props.rowsPerPage > i) {
                    return (
                        <Table.Row key={user.id}>
                            {
                                props.tableFields.map((prop) => {

                                    if (props.tableFields.indexOf(prop) >= 0 && !Array.isArray(prop) && !(typeof prop === 'object')) {
                                        return (
                                            <Table.Cell key={prop}>{user[prop]}</Table.Cell>
                                        )
                                    }
                                    else {
                                        return null;
                                    }
                                })
                            }
                        </Table.Row>
                    )
                }
                else {
                    return null;
                }
            })
          }
        </Table.Body>

          {props.rowsPerPage && props.users.length > 0 &&
          <Table.Footer>
              <Table.Row>
                  <Table.HeaderCell colSpan={props.tableHeader.length} textAlign='center'>
                      <Menu pagination compact size='small'>
                          <Menu.Item as='a' icon>
                              <Icon name='left chevron'/>
                          </Menu.Item>
                          {
                              [...Array(Math.ceil(props.users.length / props.rowsPerPage))].fill(1).map((x, i) => {
                                  if ( i < 5 ) {
                                      return (
                                          <Menu.Item as='a' key={i}>{i+1}</Menu.Item>
                                      )
                                  }
                                  else {
                                      return null;
                                  }
                              })
                          }
                          <Menu.Item as='a' icon>
                              <Icon name='right chevron'/>
                          </Menu.Item>
                      </Menu>
                  </Table.HeaderCell>
              </Table.Row>
          </Table.Footer>
          }
      </Table>
    </div>
  )
};

export default UsersList;
