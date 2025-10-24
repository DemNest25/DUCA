import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/client';
import './Login.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('token')) {
      navigate('/dashboard', { replace: true });
    }
  }, [navigate]);

  async function onSubmit(e) {
    e.preventDefault();
    try {
      const { data } = await api.post('/auth/login', { email, password });
      localStorage.setItem('token', data.token);
      localStorage.setItem('role', data.role);
      localStorage.setItem('display_name', data.display_name);
      navigate('/dashboard', { replace: true });
    } catch (err) {
      setMsg(err.response?.data?.error || 'Error al iniciar sesión');
    }
  }

  return (
    <div className="login-bg">
      <div className="login-card">
        <h3 className="mb-3">SIGLAD</h3> {/* Cambié el texto aquí */}
        {msg && <div className="alert alert-danger">{msg}</div>}
        <form onSubmit={onSubmit}>
          <div className="mb-3">
            <label className="form-label">Usuario</label>
            <input
              className="form-control"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              className="form-control"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>
          <button className="btn btn-login w-100" type="submit">
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}
