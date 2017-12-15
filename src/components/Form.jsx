import React from 'react';
import { Button, Form} from 'semantic-ui-react';
import { Redirect } from 'react-router-dom';

const UserForm = (props) => {
    if (props.isAuthenticated) {
      return <Redirect to='/' />;
    }

    return (
    <div>
      <h1>{props.formType}</h1>
      <Form onSubmit={(event) => props.handleUserFormSubmit(event)}>
        {props.formType === 'Register' &&
          <Form.Field>
            <label>Username</label>
            <input
              name='username'
              type="text"
              placeholder="Enter a username"
              required
              value={props.formData.username}
              onChange={props.handleFormChange}
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
            value={props.formData.email}
            onChange={props.handleFormChange}
          />
        </Form.Field>
        <Form.Field>
          <label>Password</label>
          <input
            name='password'
            type="password"
            required
            placeholder="Enter a password"
            value={props.formData.password}
            onChange={props.handleFormChange}
          />
        </Form.Field>
        <Button type='submit'>Submit</Button>
      </Form>
    </div>
    )
}

export default UserForm
