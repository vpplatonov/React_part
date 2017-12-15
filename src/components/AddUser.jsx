import React from 'react';
import { Button, Checkbox, Form} from 'semantic-ui-react';

const AddUser = (props) => {
  return (
    <Form onSubmit={(event) => props.addUser(event)}>
      <Form.Field>
        <label>username</label>
        <input
            type='text'
            required
            placeholder='Enter a username'
            value={props.username}
            onChange={props.handleChange}
        />
      </Form.Field>
        <Form.Field>
          <label>email</label>
          <input
            type="email"
            required
            placeholder="Enter an email address"
            value={props.email}
            onChange={props.handleChange}
          />
        </Form.Field>
        <Button type='submit'>Submit</Button>
    </Form>
  )
}

export default AddUser;