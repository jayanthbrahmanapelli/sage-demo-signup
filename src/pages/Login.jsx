import { useState } from 'react';
import { Card, Field, Message } from '../components/Card.jsx';
import { Link, navigate } from '../router.jsx';
import { findUser, setCurrentUser } from '../store.js';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  function submit(event) {
    event.preventDefault();
    const user = findUser(email);
    if (!user || user.password !== password) {
      setError('Email or password is incorrect.');
      return;
    }
    setCurrentUser(user.email);
    navigate('/welcome');
  }

  return (
    <Card title="Log in">
      <form onSubmit={submit} noValidate>
        <Field label="Email" name="email" type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <Field label="Password" name="password" type="password" autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <p className="switch forgot">
          <Link to="/reset-password">Forgot password?</Link>
        </p>
        <Message>{error}</Message>
        <button type="submit">Log in</button>
      </form>
      <p className="switch">
        New here? <Link to="/signup">Create an account</Link>
      </p>
    </Card>
  );
}
