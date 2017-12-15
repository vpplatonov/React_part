import React from 'react';
import { Button, Checkbox, Form} from 'semantic-ui-react';

const UserForm = (props) => {
  return (
    <div>
      <h1>{props.formType}</h1>
      <Form onSubmit={(event) => props.handleUserFormSubmit(event)}>
        {props.formType === 'Register' &&
          <Form.Field>
            <label>Username</label>
            <input
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
