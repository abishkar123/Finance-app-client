
import React, { useEffect, useRef, useState } from 'react';
import { Container, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector} from 'react-redux';
import { loginAction } from '../../redux/user/UserAction';

export const Login = () => {
  const emailRef = useRef("");
  const passRef = useRef("");
  const [response, setResponse] = useState("");
  const navigate = useNavigate()
  const dispatch = useDispatch()


  const {user} = useSelector((state)=> state.user)
  localStorage.setItem('user', 'user._id');
  localStorage.setItem('userInfo', JSON.stringify(user)); 
  

    useEffect(()=>{
      if(user?._id){
        navigate('/home')
      }
    }, [user._id, navigate])

    const handleOnSubmit = async (e) => {
      e.preventDefault();
  
      const formDt = {
        email: emailRef.current.value,
        password: passRef.current.value,
      };
      console.log(formDt)
  
      if (!formDt.email || !formDt.password) {
        return alert("Please fill in both fields");
      }
  
      try {
        
        dispatch(loginAction(formDt))
      } catch (err) {
        setResponse({ status: 'error', message: 'Login failed' });
      }
    };

  return (
    <div>
      <Container>
        <Form className="mt-3" onSubmit={handleOnSubmit}>
          <input
            name="email"
            ref={emailRef}
            type="email"
            placeholder="Email"
            required
          />
          <input
            name="password"
            ref={passRef}
            type="password"
            placeholder="Password"
            required
          />
          <button className="bg-blue-400" type="submit">Login</button>
        </Form>

        {response && (
          <div className={`mt-3 ${response.status === 'error' ? 'text-red-500' : 'text-green-500'}`}>
            {response.message}
          </div>
        )}
      </Container>
    </div>
  );
};
