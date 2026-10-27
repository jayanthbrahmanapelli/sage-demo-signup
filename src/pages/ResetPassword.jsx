import { useState } from 'react';
import { Card, Field, Message } from '../components/Card.jsx';
import { Link, navigate } from '../router.jsx';
import { findUser, saveUser } from '../store.js';
import { PASSWORD_RULES } from './Signup.jsx';

export default function ResetPassword() {
  const [form, setForm] = useState({ email: '', password: '', confirm: '' });
  const [error, setError] = useState('');
  const [failedRules, setFailedRules] = useState([]);

  const set = (key) => (event) => setForm({ ...form, [key]: event.target.value });

  function submit(event) {
    event.preventDefault();
    const unmet = PASSWORD_RULES.filter((rule) => !rule.test(form.password));
    setFailedRules(unmet.map((rule) => rule.id));
    if (unmet.length) {
      setError('');
      return;
    }
    if (form.password !== form.confirm) {
      setError('Passwords do not match.');
      return;
    }
    const user = findUser(form.email);
    if (!user) {
      setError('No account was found with this email.');
      return;
    }
    saveUser({ ...user, password: form.password });
    navigate('/login');
  }

  return (
    <Card title="Reset your password">
      <form onSubmit={submit} noValidate>
        <Field label="Email" name="email" type="email" autoComplete="email" value={form.email} onChange={set('email')} required />
        <Field label="New password" name="password" type="password" autoComplete="new-password" value={form.password} onChange={set('password')} required aria-describedby="password-rules" />
        <ul className="rules" id="password-rules">
          {PASSWORD_RULES.map((rule) => {
            const failed = failedRules.includes(rule.id);
            return (
              <li key={rule.id} className={failed ? 'rule failed' : 'rule'}>
                {failed ? rule.error : rule.label}
              </li>
            );
          })}
        </ul>
        <Field label="Confirm new password" name="confirm" type="password" autoComplete="new-password" value={form.confirm} onChange={set('confirm')} required />
        <Message>{error}</Message>
        <button type="submit">Reset password</button>
      </form>
      <p className="switch">
        Remembered it? <Link to="/login">Log in</Link>
      </p>
    </Card>
  );
}
