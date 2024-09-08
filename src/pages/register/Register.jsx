import React, { useState } from 'react';
import { Col, Container, Form, Spinner, Button } from 'react-bootstrap';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

export const Register = () => {

  // const rootUrl = "http://finance-backend-env-env.eba-pcmrgz3r.ap-southeast-2.elasticbeanstalk.com/api/v1"

  const rootUrl = import.meta.env.MODE === 'production'
  ? import.meta.env.VITE_ROOT_API
  : 'http://localhost:8000/api/v1';

  const clientapi = `${rootUrl}/user`;

  const [form, setForm] = useState({
    fname: '',
    lname: '',
    email: '',
    password: '',
    phonenumber: ''
  });

  const [isLoading, setIsLoading] = useState(false);
  const [password, setPassword] = useState('')

 
  const [focusedFields, setFocusedFields] = useState({
    fname: false,
    lname: false,
    email: false,
    password: false,
    phonenumber: false,
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value
    });
  };

  const handleFocus = (field) => {
    setFocusedFields({
      ...focusedFields,
      [field]: true
    });
  };

  const handleBlur = (e, field) => {
    setFocusedFields({
      ...focusedFields,
      [field]: e.target.value !== "" 
    });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
   console.log(form)
    try {
      const response = await axios.post(`${clientapi}/register`, form);
      console.log(response)
      toast('Registration successful:', response.data);
    } catch (error) {
      toast('Registration error:', error.response ? error.response.data : error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const inputes = [
    {
      label: "First Name",
      type: "text",
      name: "fname",
      required: true,
    },
    {
      label: "Last Name",
      type: "text",
      name: "lname",
      required: true,
    },
    {
      label: "Email",
      type: "email",
      name: "email",
     
    },
    {
      label: "Phone Number",
      type: "number",
      name: "phonenumber",
      
    },
    {
      label: "Password",
      type: "password",
      name: "password",
      required: true,
    }
  ];

  return (
    <div>
        <div className='register-page'>
        <div className='text-2xl font-semibold text-center p-3'>Register here!</div>
            <Form className='p-5' onSubmit={handleOnSubmit}>
              {inputes.map((input, idx) => (
                <div className="mb-7 p-2 relative" key={idx}>
                  <input
                    type={input.type}
                    id={input.name}
                    name={input.name}
                    value={form[input.name] || ''}
                    onChange={handleOnChange}
                    onFocus={() => handleFocus(input.name)}
                    onBlur={(e) => handleBlur(e, input.name)}
                    className="p-3 custom-form rounded-lg focus:outline-none"
                    placeholder={input.placeholder}
                    required={input.required}
                  />
                  <label
                    htmlFor={input.name}
                    className={`absolute left-3 top-4 transition-all duration-200 ease-in-out ${
                      focusedFields[input.name] ? "top-0 text-xs text-gray-600" : "top-4 text-gray-600"
                    }`}
                  >
                    {input.label}
                  </label>
                </div>
              ))}

              <div className="mb-7">
                <Button className='p-2.5 Custom-button' type='submit' disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Spinner animation="border" role="status" size='sm' aria-hidden="true" />
                      <div role='status'>
                        <span className='visually-hidden'>loading...</span>
                      </div>
                    </>
                  ) : (
                    <span className='custom-button-font'><i className="fa-solid fa-right-to-bracket"></i> Sign In</span>
                  )}
                </Button>

                
              </div>
              <Link  className="no-underline"to="/"> <span className='custom-color'>Login!</span></Link>
            </Form>
          
        </div>
      
    </div>
  );
};
