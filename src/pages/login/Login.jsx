import React, { useState, useEffect } from 'react';
import { Container, Form, Spinner, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginAction } from '../../redux/user/UserAction';

export const Login = () => {
  const [form, setForm] = useState({
    email: '',
    password: ''
  });

  const [focusedFields, setFocusedFields] = useState({
    email: false,
    password: false
  });

  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    if (user?._id) {
      localStorage.setItem('user', user._id);
      localStorage.setItem('userInfo', JSON.stringify(user));
      navigate('/home');
    }
  }, [user, navigate]);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleFocus = (field) => {
    setFocusedFields({ ...focusedFields, [field]: true });
  };

  const handleBlur = (e, field) => {
    setFocusedFields({ ...focusedFields, [field]: e.target.value !== "" });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    if (!form.email || !form.password) {
      setResponse({ status: 'error', message: 'Please fill in both fields' });
      setIsLoading(false);
      return;
    }

    try {
      await dispatch(loginAction(form));
     
    } catch (err) {
      setResponse({ status: 'error', message: 'Login failed' });
    } finally {
      setIsLoading(false);
    }
  };

  const inputs = [
    {
      label: "Email",
      type: "email",
      name: "email",
  
    },
    {
      label: "Password",
      type: "password",
      name: "password",
      
    }
  ];

  return (
    <div>
      <div className='register-page'>
        <p className='text-2xl font-semibold text-center mt-3'>Login Here!</p>
        <Form className="mt-3 p-5" onSubmit={handleOnSubmit}>
          {inputs.map((input, idx) => (
            <div className="mb-7 relative" key={idx}>
              <input
                type={input.type}
                name={input.name}
                value={form[input.name]}
                onChange={handleOnChange}
                onFocus={() => handleFocus(input.name)}
                onBlur={(e) => handleBlur(e, input.name)}
                className="p-3 custom-form rounded-lg focus:outline-none"
                placeholder={input.placeholder}
                required
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
                <span className='custom-button-font'>
                  <i className="fa-solid fa-right-to-bracket"></i> Login
                </span>
              )}
            </Button>
          </div>
          <Link  className="no-underline"to="/register"> <span className='custom-color'>Register Here!</span></Link>
        </Form>
        

        {response && (
          <div className={`mt-3 ${response.status === 'error' ? 'text-red-500' : 'text-green-500'}`}>
            {response.message}
          </div>
        )}
      </div>
    </div>
  );
};
