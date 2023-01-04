import { useState } from 'react';
import { API } from '../lib/api';
import { AUTH } from '../lib/auth';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();
  const [formFields, setFormFields] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      API.POST(API.ENDPOINTS.login, formFields).then(({ data }) => {
        AUTH.setToken(data.token);
        navigate('/posts');
        console.log('Successfully logged in');
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (event) => {
    setFormFields({ ...formFields, [event.target.name]: event.target.value });
    console.log(formFields);
  };

  return (
    <div className='Register'>
      <div className='outer-container'>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor='email'>Email:</label>
            <input
              type='email'
              id='email'
              name='email'
              value={formFields.email}
              onChange={handleChange}
            ></input>
          </div>
          <div>
            <label htmlFor='password'>Password:</label>
            <input
              type='password'
              id='password'
              name='password'
              value={formFields.password}
              onChange={handleChange}
            ></input>
          </div>
          <button type='submit'>Log In</button>
        </form>
      </div>
    </div>
  );
}
