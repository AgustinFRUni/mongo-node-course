import { useState } from 'react';

const LoginForm = ({ onLogin }) => {
  const initialData = { username: '', password: '' };
  const [credentials, setCredentials] = useState(initialData);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await onLogin(credentials)
      const token = response.token;
      if (token) {
        localStorage.setItem('authToken', token);
        setMessage('Login successful!');
        setCredentials(initialData);
      } else {
        setMessage('Login failed: No token received.');
      }
    } catch (error) {
      setMessage(error.response?.data?.message || 'Login failed.');
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="box">
        <h2 className="title is-4">Login</h2>
        <div className="field">
          <label className="label">Username:</label>
          <input
            className="input"
            type="text"
            name="username"
            value={credentials.username}
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
            value={credentials.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="field">
          <div className="control">
            <button className="button is-primary" type="submit">
              Login
            </button>
          </div>
        </div>
        {message && <h1 className='has-text-primary'>{message}</h1>}
      </form>
    </div>
  );
}

export default LoginForm