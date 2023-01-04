import { useState } from 'react';
import { API } from '../lib/api';
import { AUTH } from '../lib/auth';
import { useNavigate } from 'react-router-dom';
import '../styles/Register.scss';

export default function Register() {
  const navigate = useNavigate();
  const [formFields, setFormFields] = useState({
    username: '',
    email: '',
    password: '',
    passwordConfirmation: ''
  });

  const handleChange = (event) => {
    setFormFields({ ...formFields, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await API.POST(API.ENDPOINTS.register, formFields);

      const loginData = await API.POST(API.ENDPOINTS.login, {
        email: formFields.email,
        password: formFields.password
      });

      AUTH.setToken(loginData.data.token);

      console.log('Logged in!');
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='Register'>
      <div className='outer-container'>
        <h2>Register</h2>
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
            <label htmlFor='username'>Username:</label>
            <input
              type='text'
              id='username'
              name='username'
              value={formFields.username}
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
          <div>
            <label htmlFor='passwordConfirmation'>Confirm Password:</label>
            <input
              type='password'
              id='passwordConfirmation'
              name='passwordConfirmation'
              value={formFields.passwordConfirmation}
              onChange={handleChange}
            ></input>
          </div>

          <button type='submit'>Sign up</button>
        </form>
      </div>
    </div>
  );
}
