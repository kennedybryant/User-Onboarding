import React, { useState, useEffect } from 'react';
import Form from './Form';
import schema from './validation/formSchema';
import axios from 'axios';
import * as yup from 'yup';


const initialFormValues = {
  name: '',
  email: '',
  password: '',
  terms: false,
}

const initialFormErrors = {
  name: '',
  email: '',
  password: '',
}

const initialUsers = []
const initialDisabled = true

function App() {

const [users, setUsers] = useState(initialUsers)

const [formValues, setFormValues] = useState(initialFormValues)

const [formErrors, setFormErrors] = useState(initialFormErrors)

const [disabled, setDisabled] = useState(initialDisabled)

const getUsers = () => {
  axios.get('https://reqres.in/api/users') 
    .then(res => {
      console.log(res.data);
      setUsers(res.data.data)
    }).catch(err => console.error(err))
}

const postNewUser = newUser => {
  axios.post('https://reqres.in/api/users', newUser)
    .then(res => {
      setUsers([res.data, ...users])
    }).catch(err => console.error(err))

    setFormValues(initialFormValues);
}

const validate = (name, value) => {
  yup.reach(schema, name)
    .validate(value)
    .then(() => setFormErrors({ ...formErrors, [name]: '' }))
    .catch(err => setFormErrors({ ...formErrors, [name]: err.errors[0]}))
}

const inputChange = (name, value) => {
  validate(name, value)
  setFormValues({
    ...formValues,
    [name]: value
  })
}

const formSubmit = () => {
  const newUser = {
    name: formValues.name.trim(),
    email: formValues.email.trim(),
    password: formValues.password.trim(),
    terms: formValues.terms
  }
  postNewUser(newUser);
}

useEffect(() => {
  getUsers()
}, [])

useEffect(() => {
  schema.isValid(formValues).then(valid => setDisabled(!valid))
}, [formValues])

  return (
    <div className="App">
      <header className="App-header"><h1>User Onboarding App</h1></header>

      <Form 
        values={formValues}
        change={inputChange}
        submit={formSubmit}
        disabled={disabled}
        errors={formErrors}
      />

      {
        users.map((user, index) => {
          return (
            <div key={index}>
              <h3>{user.first_name} {user.last_name}</h3>
              <h3>{user.name}</h3>
              <p>{user.email}</p>
            </div>
          )
        })
      }

    </div>
  );
}

export default App;
