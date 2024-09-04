import React, { useState } from 'react';
import { Container, Form } from 'react-bootstrap';
import axios from 'axios';

export const Register = () => {
  // Set rootUrl based on the environment
  const rootUrl = process.env.NODE_ENV === 'production'
    ? 'https://your-production-api-url.com/api/v1/user'
    : 'http://localhost:8000/api/v1/user';

  const [form, setForm] = useState({
    fname: '',
    lname: '',
    email: '',
    password: ''
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value
    });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    console.log(form)
    try {
      const response = await axios.post(`${rootUrl}/register`, form);
      console.log(response)
      console.log('Registration successful:', response.data);
    } catch (error) {
      console.error('Registration error:', error.response ? error.response.data : error.message);
    }
  };
  console.log(form)

  return (
    <div>
      <Container>
        <Form className='mt-3' onSubmit={handleOnSubmit}>
          <input
            name="fname"
            value={form.fname}
            type='text'
            onChange={handleOnChange}
            placeholder="First Name"
          />

          <input
            name="lname"
            value={form.lname}
            type='text'
            onChange={handleOnChange}
            placeholder="Last Name"
          />

          <input
            name="email"
            value={form.email}
            type='email'
            onChange={handleOnChange}
            placeholder="Email"
          />

          <input
            name="password"
            value={form.password}
            type='password'
            onChange={handleOnChange}
            placeholder="Password"
          />

          <button className='bg-blue-400' type='submit'>Sign In

          </button>
        </Form>
      </Container>
    </div>
  );
};
