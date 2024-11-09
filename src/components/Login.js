// src/components/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebaseConfig';  // Certifique-se de ter importado o Firebase da configuração
import { Button, TextField, Grid } from '@mui/material';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);

    // Checando as credenciais fixas (admin e senha 123)
    if (username === 'admin' && password === '123') {
      try {
        // Aqui, se você tiver configurado Firebase Authentication, você pode usar:
        // await auth.signInWithEmailAndPassword("admin@example.com", "senha_do_admin");
        navigate('/employee-list'); // Redireciona para a página de funcionários
      } catch (error) {
        setError("Erro ao fazer login. Verifique as credenciais.");
      }
    } else {
      setError("Credenciais inválidas.");
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg max-w-md mx-auto mt-8 text-gray-800">
      <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
      <form onSubmit={handleLogin} className="bg-gray-100 p-6 rounded-lg">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Username"
              fullWidth
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Password"
              type="password"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              variant="outlined"
            />
          </Grid>
          {error && (
            <Grid item xs={12}>
              <p className="text-red-500 text-sm">{error}</p>
            </Grid>
          )}
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
            >
              Entrar
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default Login;
