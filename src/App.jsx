import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import { Grid, Divider } from 'semantic-ui-react';

import UsersList from './components/UsersList';
import About from './components/About';
import NavBar from './components/Navigation/Navbar';
import UserForm from './components/Form';
import Logout from './components/Logout';
import UserStatus from './components/UserStatus';
import DashboardComponent from './containers/Dashboard/components/';
import DashboardLogin from './components/DashboardLogin/DashboardLogin';
import LogoSMTP from './components/LogoSMTP';

import current_plan from './images/current_plan.png';
import top_bouncing_domain from './images/top_bouncing_domain.png';
import top_engaging_companies from './images/top_engaging_companies.png';


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
    this.windowDidResize();
    window.addEventListener('resize', this.windowDidResize);
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

  windowDidResize = () => {
    let w = window.innerWidth;
    let formatId;
    if (w < 576) formatId = 'narrow-phone';
    else if (w < 768) formatId = 'wide-phone';
    else if (w < 1024) formatId = 'narrow-tablet';
    else formatId = 'wide-tablet';
    if (formatId !== this.state.screenFormatId) {
      this.setState({screenFormatId: formatId});
    }
  };

  render() {
    let deviceInfo = {
        screenFormatId: this.state.screenFormatId,
    };

    return (
      <div>
          <LogoSMTP/>
          {this.state.isAuthenticated &&
          <div>
              <NavBar
                  title={this.state.title}
                  isAuthenticated={this.state.isAuthenticated}
                  isAdmin={this.state.isAdmin}
                  deviceInfo={deviceInfo}
              />
              <Divider hidden/>
          </div>
          }

          {!this.state.isAuthenticated &&
            <div>
                <DashboardLogin/>
                <Divider hidden/>
            </div>
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
                        <DashboardComponent posts={[
                            {title: 'Current plan', body: 'Empty', id: 3, userId: 1, src: current_plan},
                            {title: 'Top engaging companies', body: 'Empty', id: 1, userId: 1, src: top_engaging_companies},
                            {title: 'Top bouncing domain', body: 'Empty', id: 2, userId: 1, src: top_bouncing_domain},
                            ]} postsLoaded={true} />
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
