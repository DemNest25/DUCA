import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/client';
import fondo from '../assets/img/fondo-equipo.png'; // <-- importa la imagen desde assets
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
    // Pasamos la imagen como variable CSS para usarla en ::before
    <div className="login-bg" style={{ '--bg-image': `url(${fondo})` }}>
      <div className="login-card">
        <h3 className="text-white mb-3">Bienvenido</h3>
        {msg && <div className="alert alert-danger">{msg}</div>}
        <form onSubmit={onSubmit}>
          <div className="mb-3">
            <label className="form-label text-white">Correo</label>
            <input
              className="form-control"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label text-white">Contraseña</label>
            <input
              className="form-control"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>
          <button className="btn btn-login w-100" type="submit">
            Ingresar
          </button>
        </form>
      </div>
    </div>
  );
}
