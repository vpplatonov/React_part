import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import { Sidebar, Dimmer, Segment, Grid, Divider, Card } from 'semantic-ui-react';

import DashboardCardComponent from './containers/Dashboard/components/DashboardCardComponent';
import UsersList from './components/UsersList';
import About from './components/About';
import NavBar from './components/Navigation/Navbar';
import UserForm from './components/Form';
import Logout from './components/Logout';
import UserStatus from './components/UserStatus';
import DashboardComponent from './containers/Dashboard/components/';
import DashboardLogin from './components/DashboardLogin/DashboardLogin';
import BillingInvoices from './components/Billing/Invoices';
import SettingsSenders from './components/Settings/Senders';

import LogoSMTP from './components/LogoSMTP';
import btn_icon_141863 from './components/Navigation/btn_icon_141863.png';

import current_plan from './images/current_plan.png';
import top_bouncing_domain from './images/top_bouncing_domain.png';
import top_engaging_companies from './images/top_engaging_companies.png';
import selected_time_period from './images/selected_time_period.png';


class App extends Component {
  constructor() {
    super()
    this.state = {
      users: [],
      title: 'TestDriven.io',
      isAuthenticated: false,
      isAdmin: false,
      sidebarOpened: false
    }
  }
  componentWillReceiveProps(nextProps) {
      this.checkUserIsAuthenticated();
  }
  componentDidMount() {
      this.checkUserIsAuthenticated();
      this.windowDidResize();
      window.addEventListener('resize', this.windowDidResize);
  }
  checkUserIsAuthenticated() {
      const options = {
          url: `${process.env.REACT_APP_USERS_SERVICE_URL}/auth/check`,
          method: 'post',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${window.localStorage.authToken}`
          }
      };
      return axios(options)
        .then((res) => {
            this.setState({ isAuthenticated: true, isAdmin: res.data.data.admin });
        })
        .catch((err) => {
            this.logoutUser();
        })
  }
  getUsers() {
      const options = {
          url: `${process.env.REACT_APP_USERS_SERVICE_URL}/users`,
          method: 'post',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${window.localStorage.authToken}`
          }
      };
      return axios(options)
        .then((res) => {
            this.setState({ users: res.data.data.users });
        })
        .catch((err) => { console.log(err); })
  }
  logoutUser() {
    window.localStorage.clear();
    this.setState({ isAuthenticated: false, isAdmin: false, sidebarOpened: false});
  }
  loginUser(token, is_admin = false) {
    window.localStorage.setItem('authToken', token);
    this.setState({ isAuthenticated: true, isAdmin: is_admin });
    this.getUsers();
  }

  windowDidResize = () => {
    let w = window.innerWidth;
    var h = window.innerHeight;

    let rootElement = document.getElementById('root');
    rootElement.style.minHeight = `${h}px`;
    let rootSegment = document.querySelector('.ui,.segment,.pushable');
    rootSegment.style.minHeight = `${h-34}px`;
    let rootPusher = document.querySelector('.pusher');
    rootPusher.style.minHeight = `${h-104}px`;

    let formatId;
    if (w < 576) formatId = 'narrow-phone';
    else if (w < 768) formatId = 'wide-phone';
    else if (w < 1024) formatId = 'narrow-tablet';
    else {
        formatId = 'wide-tablet';
    }
    if (formatId !== this.state.screenFormatId) {
      this.setState({screenFormatId: formatId});
    }
  };
  onClick_elIconButton = (ev) => {
      this.setState({sidebarOpened: !this.state.sidebarOpened});
  };

  closeSidebar = (ev) => {
      this.setState({sidebarOpened: false});
  };

  render() {
    let deviceInfo = {
        screenFormatId: this.state.screenFormatId,
    };

    // const dimmerProps = {
    //     //  Dimmed: true,
    //     active: this.state.isAuthenticated && this.state.sidebarOpened,
    //     page: true,
    //     onClick: this.closeSidebar
    // };

    const style_iconButton = {
        display: 'block',
        backgroundImage: 'url('+btn_icon_141863+')',
        backgroundRepeat: 'no-repeat',
        backgroundSize: '89.562%',
        backgroundPosition: '0% 50%',
        cursor: 'pointer',
    };

    const sideBarPushable = true;


    return (
      <div>
        <LogoSMTP/>
        {this.state.isAuthenticated && this.state.screenFormatId !== 'wide-tablet' &&
          <div className="MainMenuMobileComponent">
              <div className="foreground">
                  <div className='actionFont elIconButton' style={style_iconButton}
                       onClick={this.onClick_elIconButton}/>
              </div>
          </div>
        }
        <Sidebar.Pushable as={Segment}>
          {this.state.isAuthenticated &&
            <div>
              <NavBar
                  title={this.state.title}
                  isAuthenticated={this.state.isAuthenticated}
                  isAdmin={this.state.isAdmin}
                  deviceInfo={deviceInfo}
                  sidebarOpened={this.state.sidebarOpened}
                  closeSidebar={this.closeSidebar}
                  sideBarPushable={sideBarPushable}
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
          <Sidebar.Pusher>
          {/*<Dimmer {...dimmerProps}/>*/}
          {/*<Dimmer.Dimmable as={Segment} blurring dimmed={this.state.sidebarOpened}>*/}
          {/*<Dimmer inverted active={this.state.sidebarOpened} />*/}
          <Divider hidden fitted/>
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
                            {title: 'Top engaging compaigns in the last 30 days', body: 'Empty', id: 2, userId: 1, src: top_engaging_companies},
                            {title: 'Top bouncing domain in the last 30 days', body: 'Empty', id: 3, userId: 1, src: top_bouncing_domain},
                            {title: 'Status for the selected time period', body: 'Empty', id: 4, userId: 1, src: selected_time_period},
                            ]} postsLoaded={true} />
                      </div>
                    : <Redirect to={{pathname: '/login', state: {from: props.location}}} />
                )}/>

                <Route exact path='/users' render={(props) => {
                    const senderFiledsLabel = ['User ID', 'Email', 'User name', 'Created Date'];
                    const userFileds = ['id', 'email', 'username', 'created_at'];

                    return (
                        this.state.isAuthenticated
                            ? (
                                <Card.Group itemsPerRow={1} doubling stackable>
                                    <DashboardCardComponent
                                        title={'User list'}
                                        state={this.state}
                                        senderFiledsLabel={senderFiledsLabel}
                                        userFileds={userFileds}
                                        render={(props) => {
                                        return (
                                           <UsersList users={props.state.users} tableHeader={props.senderFiledsLabel}
                                           tableFields={props.userFileds}/>
                                        )
                                    }}
                                    />
                                </Card.Group>
                            )
                            : <Redirect to={{pathname: '/login', state: {from: props.location}}}/>
                    )
                }}/>

                <Route exact path='/billing/invoices' render={(props) => {
                    return (
                        this.state.isAuthenticated
                            ? <BillingInvoices />
                            : <Redirect to={{pathname: '/login', state: {from: props.location}}}/>
                    )
                }}/>

                <Route exact path='/settings/senders' deviceInfo={deviceInfo} render={(props) => {
                    return (
                        this.state.isAuthenticated
                            ? <SettingsSenders deviceInfo={props.deviceInfo}/>
                            : <Redirect to={{pathname: '/login', state: {from: props.location}}}/>
                    )
                }}/>

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
                    this.state.isAuthenticated
                        ? <UserStatus isAuthenticated={this.state.isAuthenticated} />
                        : <Redirect to={{pathname: '/login', state: {from: props.location}}} />
                )}/>
              </Switch>
              </Grid.Column>
              <Grid.Column width={1}>
              </Grid.Column>
            </Grid.Row>
          </Grid>
          {/*</Dimmer.Dimmable>*/}
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </div>
    )
  }
}

export default App
