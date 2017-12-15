import React, { Component } from 'react';
import { Button, Form} from 'semantic-ui-react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';


class UserForm extends Component {
  constructor (props) {
    super(props)
    this.state = {
      formData: {
        username: '',
        email: '',
        password: ''
      }
    }
    this.handleUserFormSubmit = this.handleUserFormSubmit.bind(this);
  }
  componentDidMount() {
    this.clearForm();
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.formType !== nextProps.formType) {
      this.clearForm();
    }
  }
  clearForm() {
    this.setState({
      formData: {username: '', email: '', password: ''}
    });
  }
  handleFormChange(event) {
    const obj = this.state.formData;
    obj[event.target.name] = event.target.value;
    this.setState(obj);
  }
  handleUserFormSubmit(event) {
    event.preventDefault();
    const formType = this.props.formType
    let data;
    if (formType === 'login') {
      data = {
        email: this.state.formData.email,
        password: this.state.formData.password
      }
    }
    if (formType === 'register') {
      data = {
        username: this.state.formData.username,
        email: this.state.formData.email,
        password: this.state.formData.password
      }
    }
    const url = `${process.env.REACT_APP_USERS_SERVICE_URL}/auth/${formType}`
    axios.post(url, data)
        .then((res) => {
          this.clearForm();
          this.props.loginUser(res.data.auth_token);
        })
        .catch((err) => { console.log(err); })
  }

  render() {
      if (this.props.isAuthenticated) {
          return <Redirect to='/'/>;
      }

      return (
          <div>
              <h1>{this.props.formType}</h1>
              <Form onSubmit={(event) => this.props.handleUserFormSubmit(event)}>
                  {this.props.formType === 'Register' &&
                  <Form.Field>
                      <label>Username</label>
                      <input
                          name='username'
                          type="text"
                          placeholder="Enter a username"
                          required
                          value={this.props.formData.username}
                          onChange={this.props.handleFormChange}
                      />
                  </Form.Field>
                  }
                  <Form.Field>
                      <label>Email</label>
                      <input
                          name='email'
                          type='email'
                          required
                          placeholder='Enter a email address'
                          value={this.props.formData.email}
                          onChange={this.props.handleFormChange}
                      />
                  </Form.Field>
                  <Form.Field>
                      <label>Password</label>
                      <input
                          name='password'
                          type="password"
                          required
                          placeholder="Enter a password"
                          value={this.props.formData.password}
                          onChange={this.props.handleFormChange}
                      />
                  </Form.Field>
                  <Button type='submit'>Submit</Button>
              </Form>
          </div>
      )
  }
}

export default UserForm
