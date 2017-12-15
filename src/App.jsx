import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import axios from 'axios';
import { Grid } from 'semantic-ui-react';
import UsersList from './components/UsersList';
import About from './components/About';
import NavBar from './components/Navbar';
import UserForm from './components/Form';
import Logout from './components/Logout';
import UserStatus from './components/UserStatus';

class App extends Component {
  constructor() {
    super()
    this.state = {
      users: [],
      title: 'TestDriven.io',
      isAuthenticated: false
    }
  }
  componentDidMount() {
    this.getUsers();
  }
  getUsers() {
      axios.get(`${process.env.REACT_APP_USERS_SERVICE_URL}/users`)
        .then((res) => { this.setState({ users: res.data.data.users }); })
        .catch((err) => { console.log(err); })
  }
  logoutUser() {
    window.localStorage.clear();
    this.setState({ isAuthenticated: false });
  }
  loginUser(token) {
    window.localStorage.setItem('authToken', token);
    this.setState({ isAuthenticated: true });
    this.getUsers();
  }

  render() {
    return (
      <div>
        <NavBar
            title={this.state.title}
            isAuthenticated={this.state.isAuthenticated}
         />
          <Grid columns={3}>
            <Grid.Row>
              <Grid.Column width={1}>
              </Grid.Column>
              <Grid.Column width={14}>
              <Switch>
                <Route exact path='/' render={() => (
                  <div>
                    <UsersList users={this.state.users}/>
                  </div>
                )} />
                <Route exact path='/about' component={About}/>
                <Route exact path='/register' render={() => (
                  <UserForm
                    formType={'register'}
                    isAuthenticated={this.state.isAuthenticated}
                    loginUser={this.loginUser.bind(this)}
                  />
                )} />
                <Route exact path='/login' render={() => (
                  <UserForm
                    formType={'login'}
                    isAuthenticated={this.state.isAuthenticated}
                    loginUser={this.loginUser.bind(this)}
                  />
                )} />
                <Route exact path='/logout' render={() => (
                  <Logout
                    logoutUser={this.logoutUser.bind(this)}
                    isAuthenticated={this.state.isAuthenticated}
                  />
                )} />
                <Route exact path='/status' render={() => (
                  <UserStatus
                    isAuthenticated={this.state.isAuthenticated}
                  />
                )}/>
              </Switch>
              </Grid.Column>
              <Grid.Column width={1}>
              </Grid.Column>
            </Grid.Row>
          </Grid>
      </div>
    )
  }
}

export default App
