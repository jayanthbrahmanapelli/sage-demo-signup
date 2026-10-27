import { useState } from 'react';
import { Card, Field, Message } from '../components/Card.jsx';
import { Link, navigate } from '../router.jsx';
import { findUser, saveUser } from '../store.js';

const PASSWORD_RULES = [
  { label: 'At least 8 characters', test: (value) => value.length >= 8 },
  { label: 'At least one uppercase letter', test: (value) => /[A-Z]/.test(value) },
  { label: 'At least one lowercase letter', test: (value) => /[a-z]/.test(value) },
  { label: 'At least one number', test: (value) => /[0-9]/.test(value) },
  { label: 'At least one special character', test: (value) => /[^A-Za-z0-9]/.test(value) },
];

export default function Signup() {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [error, setError] = useState('');
  const [passwordErrors, setPasswordErrors] = useState([]);

  const set = (key) => (event) => setForm({ ...form, [key]: event.target.value });

  function submit(event) {
    event.preventDefault();
    const failed = PASSWORD_RULES.filter((rule) => !rule.test(form.password));
    setPasswordErrors(failed.map((rule) => rule.label));
    if (failed.length) {
      setError('');
      return;
    }
    if (form.password !== form.confirm) {
      setError('Passwords do not match.');
      return;
    }
    if (findUser(form.email)) {
      setError('An account with this email already exists.');
      return;
    }
    saveUser({ name: form.name.trim(), email: form.email.trim(), password: form.password });
    navigate('/login');
  }

  return (
    <Card title="Create your account">
      <form onSubmit={submit} noValidate>
        <Field label="Full name" name="name" autoComplete="name" value={form.name} onChange={set('name')} required />
        <Field label="Email" name="email" type="email" autoComplete="email" value={form.email} onChange={set('email')} required />
        <Field label="Password" name="password" type="password" autoComplete="new-password" value={form.password} onChange={set('password')} required aria-describedby="password-rules" />
        <ul className="rules" id="password-rules">
          {PASSWORD_RULES.map((rule) => (
            <li key={rule.label} className={passwordErrors.includes(rule.label) ? 'rule error' : 'rule'}>
              {rule.label}
            </li>
          ))}
        </ul>
        {passwordErrors.length > 0 && (
          <div role="alert">
            {passwordErrors.map((label) => (
              <p key={label} className="message error">Password must have: {label.replace(/^At least /, 'at least ')}</p>
            ))}
          </div>
        )}
        <Field label="Confirm password" name="confirm" type="password" autoComplete="new-password" value={form.confirm} onChange={set('confirm')} required />
        <Message>{error}</Message>
        <button type="submit">Sign up</button>
      </form>
      <p className="switch">
        Already have an account? <Link to="/login">Log in</Link>
      </p>
    </Card>
  );
}
