import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Card } from 'semantic-ui-react';
import DashboardCardComponent from './../containers/Dashboard/components/DashboardCardComponent';

class UserStatus extends Component {
  constructor (props) {
    super(props)
    this.state = {
      created_at: '',
      email: '',
      id: '',
      username: ''
    }
  }
  componentDidMount() {
      if (this.props.isAuthenticated) {
          this.getUserStatus();
      }
  }
  getUserStatus(event) {
    const options = {
      url: `${process.env.REACT_APP_USERS_SERVICE_URL}/auth/status`,
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${window.localStorage.authToken}`
      }
    };
    return axios(options)
        .then((res) => {
            this.setState({
                created_at: res.data.data.created_at,
                email: res.data.data.email,
                id: res.data.data.id,
                username: res.data.data.username
            })
        })
        .catch((error) => { console.log(error); })
  }
  render() {
    if (!this.props.isAuthenticated) {
        return <p>You must be logged in to view this. Click <Link to="/login">here</Link> to log back in.</p>
    }
    return (

        <Card.Group itemsPerRow={1} doubling stackable>
            <DashboardCardComponent title={'User status'} state={this.state} render={(props) => {
                return (
                <div>
                    <ul>
                        <li><strong>User ID: </strong>{props.state.id}</li>
                        <li><strong>Email: </strong>{props.state.email}</li>
                        <li><strong>Username: </strong>{props.state.username}</li>
                        <li><strong>Created: </strong>{props.state.created_at}</li>
                    </ul>
                </div>
                )
            }}
            />
        </Card.Group>
    )
  }
}

export default UserStatus
