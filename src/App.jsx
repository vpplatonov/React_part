import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import axios from 'axios';
import { Grid, Header, Divider } from 'semantic-ui-react';
import UsersList from './components/UsersList';
import AddUser from './components/AddUser';
import About from './components/About';
import NavBar from './components/Navbar';
import UserForm from './components/Form';

class App extends Component {
  constructor() {
    super()
    this.state = {
      users: [],
      username: '',
      email: '',
      title: 'TestDriven.io',
      formData: {
        username: '',
        email: '',
        password: ''
      }
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
  addUser(event) {
    event.preventDefault();
    const data = {
      username: this.state.username,
      email: this.state.email
    }
    axios.post(`${process.env.REACT_APP_USERS_SERVICE_URL}/users`, data)
    .then((res) => {
      this.getUsers();
      this.setState({ username: '', email: '' });
    })
    .catch((err) => { console.log(err); })
  }
  handleChange(event) {
    const obj = {};
    obj[event.target.name] = event.target.value;
    this.setState(obj);
  }
  render() {
    return (
      <div>
        <NavBar
            title={this.state.title}
         />
          <Grid columns={3}>
            <Grid.Row>
              <Grid.Column width={1}>
              </Grid.Column>
              <Grid.Column width={14}>
              <Switch>
                <Route exact path='/' render={() => (
                  <div>
                    <h1>Add Users</h1>
                    <AddUser
                      username={this.state.username}
                      email={this.state.email}
                      handleChange={this.handleChange.bind(this)}
                      addUser={this.addUser.bind(this)}
                    />
                    <Divider />
                    <h1>All Users</h1>
                    <UsersList users={this.state.users}/>
                  </div>
                )} />
                <Route exact path='/about' component={About}/>
                <Route exact path='/register' render={() => (
                  <UserForm
                    formType={'Register'}
                    formData={this.state.formData}
                  />
                )} />
                <Route exact path='/login' render={() => (
                  <UserForm
                    formType={'Login'}
                    formData={this.state.formData}
                  />
                )} />
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
