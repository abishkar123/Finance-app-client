import React, { useState } from 'react';
import { Col, Container, Form, Spinner, Button } from 'react-bootstrap';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

export const Register = () => {
  const rootUrl = process.env.NODE_ENV === 'production'
    ? 'https://your-production-api-url.com/api/v1/user'
    : 'http://localhost:8000/api/v1/user';

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

  const PasswordValidate = (password)=>{

    if(password.length <6){
        return( "Password must be at least 6 characters long")
    }
    if (!/[A-Za-z-]/.test(password)){
        return ("Password must be contain at least one letter or hyhen")
    }
    if (!/\d/.test(password)){}
    return ("Password is valid")
};

const handleonPasswordcheck = (event) =>{ 
  const newPass = event.target.value;
  setPassword(newPass)
  const validationMessage = PasswordValidate(newPass)
  if (validationMessage !== "Password is valid") {
    toast.error(validationMessage);
} else {
    toast.success(validationMessage);
}
setMessage(validationMessage);
 
};

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

   
    try {
      const response = await axios.post(`${rootUrl}/register`, form);
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
      <Container>
        <div className='register-page'>
          <p className='text-3xl font-semibold'>Register Here</p>
         
            <Form className='mt-5' onSubmit={handleOnSubmit}>
              {inputes.map((input, idx) => (
                <div className="mb-7 relative" key={idx}>
                  <input
                    type={input.type}
                    id={input.name}
                    name={input.name}
                    value={form[input.name] || ''}
                    onChange={handleOnChange}
                    onFocus={() => handleFocus(input.name)}
                    onBlur={(e) => handleBlur(e, input.name)}
                    className=" w-50 p-3 custom-form rounded-lg focus:outline-none"
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
                <Button className='w-50 p-2.5 Custom-button' type='submit' disabled={isLoading}>
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
              <Link  className="no-underline"to="/login"> <span className='custom-color'>Sign In here</span></Link>
            </Form>
          
        </div>
      </Container>
    </div>
  );
};
