import { useState } from 'react';

const RegisterForm = ({ onRegister }) => {
  const initialFormData = { username: '', password: '' }
  const [formData, setFormData] = useState(initialFormData);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = onRegister(formData)
      setFormData(initialFormData);
      setMessage(response.message || 'User registered successfully!');
    } catch (error) {
      setMessage(error.response?.message || 'Registration failed.');
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="box">
        <h2 className="title is-4">Register</h2>
        <div className="field">
          <label className="label">Username:</label>
          <input
            className="input"
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className="field">
          <label className="label">Password:</label>
          <input
            className="input"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="field">
          <div className="control">
            <button className="button is-primary" type="submit">
              Register
            </button>
          </div>
        </div>
        {message && <h1 className='has-text-primary'>{message}</h1>}
      </form>

    </div>
  );
}

export default RegisterForm