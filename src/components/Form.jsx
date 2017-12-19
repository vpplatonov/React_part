import React, { Component } from 'react';
import { Button, Form} from 'semantic-ui-react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import FormErrors from './FormError';

class UserForm extends Component {
  constructor (props) {
    super(props)
    this.state = {
      formData: {
        username: '',
        email: '',
        password: ''
      },
      formRules: [
        {
          id: 1,
          field: 'username',
          name: 'Username must be greater than 5 characters.',
          valid: false
        },
        {
          id: 2,
          field: 'email',
          name: 'Email must be greater than 5 characters.',
          valid: false
        },
        {
          id: 3,
          field: 'email',
          name: 'Email must be a valid email address.',
          valid: false
        },
        {
          id: 4,
          field: 'password',
          name: 'Password must be greater than 3 characters.',
          valid: false
        }
      ],
      valid: false
    }
    this.handleUserFormSubmit = this.handleUserFormSubmit.bind(this);
  }
  componentDidMount() {
    this.clearForm();
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.formType !== nextProps.formType) {
      this.clearForm();
      this.initRules();
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
    this.validateForm();
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
    const url = `${process.env.REACT_APP_USERS_SERVICE_URL}/api/auth/${formType}`
    axios.post(url, data)
        .then((res) => {
          this.clearForm();
          this.props.loginUser(res.data.auth_token);
        })
        .catch((err) => { console.log(err); })
  }
  validateForm() {
      const formType = this.props.formType;
      const rules = this.state.formRules;
      const formData = this.state.formData;
      this.setState({valid: false});
      for (const rule of rules) {
        rule.valid = false;
      }
      if (formType === 'register') {
        if (formData.username.length > 5) rules[0].valid = true;
      }
      if (formType === 'login') rules[0].valid = true;
      if (formData.email.length > 5) rules[1].valid = true;
      if (this.validateEmail(formData.email)) rules[2].valid = true;
      if (formData.password.length >= 3) rules[3].valid = true;
      this.setState({formRules: rules})
      if (this.allTrue()) this.setState({valid: true});
  }
  validateEmail(email) {
      // eslint-disable-next-line
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
  }
  allTrue() {
      for (const rule of this.state.formRules) {
        if (!rule.valid) return false;
      }
      return true;
  }
  initRules() {
      const rules = this.state.formRules;
      for (const rule of rules) {
        rule.valid = false;
      }
      this.setState({formRules: rules})
  }

  render() {
      if (this.props.isAuthenticated) {
          return <Redirect to='/'/>;
      }

      return (
          <div>
              <h1>{this.props.formType}</h1>
              <Form onSubmit={(event) => this.handleUserFormSubmit(event)}>
                  {this.props.formType === 'register' &&
                  <Form.Field>
                      <label>Username</label>
                      <input
                          name='username'
                          type="text"
                          placeholder="Enter a username"
                          required
                          value={this.state.formData.username}
                          onChange={this.handleFormChange.bind(this)}
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
                          value={this.state.formData.email}
                          onChange={this.handleFormChange.bind(this)}
                      />
                  </Form.Field>
                  <Form.Field>
                      <label>Password</label>
                      <input
                          name='password'
                          type="password"
                          required
                          placeholder="Enter a password"
                          value={this.state.formData.password}
                          onChange={this.handleFormChange.bind(this)}
                      />
                  </Form.Field>

                  <Button
                      type='submit'
                      disabled={!this.state.valid}
                  >Submit</Button>
              </Form>
                  {!this.state.valid &&
                      <FormErrors
                          formType={this.props.formType}
                          formRules={this.state.formRules}
                       />
                  }
          </div>
      )
  }
}

export default UserForm
