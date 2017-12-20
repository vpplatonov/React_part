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
import DashboardComponent from './containers/Dashboard/components/';
import DashboardLogin from './components/DashboardLogin/DashboardLogin';
import LogoSMTP from './components/LogoSMTP';
import { Redirect } from 'react-router-dom';
import {Helmet} from 'react-helmet'

class App extends Component {
  constructor() {
    super()
    this.state = {
      users: [],
      senders: [],
      title: 'TestDriven.io',
      isAuthenticated: false,
      isAdmin: false
    }
  }
  componentDidMount() {
    this.getUsers();
  }
  getUsers() {
      axios.get(`${process.env.REACT_APP_USERS_SERVICE_URL}/api/users`)
        .then((res) => { this.setState({ users: res.data.data.users }); })
        .catch((err) => { console.log(err); })
  }
  getSenders() {
      axios.get(`${process.env.REACT_APP_USERS_SERVICE_URL}/api/senders`)
        .then((res) => { this.setState({ senders: res.data.data.senders }); })
        .catch((err) => { console.log(err); })
  }
  logoutUser() {
    window.localStorage.clear();
    this.setState({ isAuthenticated: false, isAdmin: false});
  }
  loginUser(token, is_admin = false) {
    window.localStorage.setItem('authToken', token);
    this.setState({ isAuthenticated: true, isAdmin: is_admin });
    this.getUsers();
    this.getSenders();
  }

  render() {
    return (
      <div>
          <LogoSMTP/>
          {this.state.isAuthenticated &&
          <NavBar
              title={this.state.title}
              isAuthenticated={this.state.isAuthenticated}
              isAdmin={this.state.isAdmin}
          />
          }

          {!this.state.isAuthenticated &&
            <DashboardLogin/>
          }
          <Grid columns={3}>
            <Grid.Row>
              <Grid.Column width={1}>
              </Grid.Column>
              <Grid.Column width={14}>
              <Switch>

                <Route exact path='/' render={(props) => (
                    this.state.isAuthenticated
                    ? <div>
                        <Helmet>
					        <title>Dashboard</title>
				        </Helmet>
                        <DashboardComponent posts={[{title: 'Dummy', body: 'Empty', id: 1, userId: 1}]} postsLoaded={true} />
                      </div>
                    : <Redirect to={{pathname: '/login', state: {from: props.location}}} />
                )}/>

                <Route exact path='/users' render={(props) => (
                    this.state.isAuthenticated
                    ? <div>
                          <UsersList users={this.state.users} title={'All Users'}/>
                      </div>
                    : <Redirect to={{pathname: '/login', state: {from: props.location}}} />
                )}/>


                <Route exact path='/senders' render={(props) => (
                    this.state.isAuthenticated
                      ? <div>
                          <UsersList users={this.state.senders} title={'Senders'}/>
                        </div>
                      : <Redirect to={{pathname: '/login', state: {from: props.location}}} />
                )}/>

                <Route exact path='/about' component={About}/>
                <Route exact path='/register' render={(props) => (
                  this.state.isAuthenticated
                      ? <UserForm
                        formType={'register'}
                        isAdmin={this.state.isAdmin}
                        isAuthenticated={this.state.isAuthenticated}
                        loginUser={this.loginUser.bind(this)}
                      />
                      : <Redirect to={{pathname: '/login', state: {from: props.location}}} />
                )} />
                <Route exact path='/login' render={(props) => (
                  this.state.isAuthenticated
                      ? <Redirect to={{pathname: '/'}} />
                      : <UserForm
                        formType={'login'}
                        isAuthenticated={this.state.isAuthenticated}
                        isAdmin={this.state.isAdmin}
                        loginUser={this.loginUser.bind(this)}
                        />

                )} />
                <Route exact path='/logout' render={(props) => (
                  <Logout
                    logoutUser={this.logoutUser.bind(this)}
                    isAuthenticated={this.state.isAuthenticated}
                  />
                )} />
                <Route exact path='/status' render={(props) => (
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
