import { useState } from 'react';

export default function Register() {
  const [formFields, setFormFields] = useState({
    username: '',
    email: '',
    password: '',
    passwordConfirmation: ''
  });

  const handleChange = (event) => {
    setFormFields({ ...formFields, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='email'>Email</label>
          <input
            type='email'
            id='email'
            name='email'
            value={formFields.email}
            onChange={handleChange}
          ></input>
        </div>
        <div>
          <label htmlFor='username'>Username</label>
          <input
            type='text'
            id='username'
            name='username'
            value={formFields.username}
            onChange={handleChange}
          ></input>
        </div>
        <div>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            id='password'
            name='password'
            value={formFields.password}
            onChange={handleChange}
          ></input>
        </div>
        <div>
          <label htmlFor='passwordConfirmation'>Confirm Password</label>
          <input
            type='password'
            id='passwordConfirmation'
            name='passwordConfirmation'
            value={formFields.passwordConfirmation}
            onChange={handleChange}
          ></input>
        </div>
      </form>
    </div>
  );
}
