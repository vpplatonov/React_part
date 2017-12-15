import React from 'react';
import { Message } from 'semantic-ui-react';

const FormErrors = (props) => {
  return (
      <Message error>
          {
              // eslint-disable-next-line
              props.formRules.map((rule) => {
                  if (rule.field === 'username') {
                      if (props.formType === 'Register') {
                          return (
                              !rule.valid && <Message.Item key={rule.id} content={rule.name}/>
                          )
                      }
                  } else {
                      return (
                          !rule.valid && <Message.Item key={rule.id} content={rule.name}/>
                      )
                  }
              })
          }
      </Message>
  )
}

export default FormErrors;
