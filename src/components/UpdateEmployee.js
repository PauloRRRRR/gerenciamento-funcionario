// src/components/UpdateEmployee.js
import React, { useState, useEffect } from 'react';
import { db, auth } from '../firebaseConfig'; // Certifique-se de ter configurado corretamente
import { Button, TextField, Grid } from '@mui/material';
import { doc, updateDoc, getDoc, collection, addDoc, Timestamp } from 'firebase/firestore';

const UpdateEmployee = ({ employeeId }) => {
  const [employee, setEmployee] = useState({ name: '', position: '', salary: '' });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchEmployee = async () => {
      const employeeRef = doc(db, 'employees', employeeId);
      const docSnap = await getDoc(employeeRef);
      if (docSnap.exists()) {
        setEmployee(docSnap.data());
      } else {
        setError('Funcionário não encontrado');
      }
    };
    fetchEmployee();
  }, [employeeId]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Registrando o histórico
      const historyRef = collection(db, 'employees', employeeId, 'history');
      await addDoc(historyRef, {
        changedAt: Timestamp.now(),
        changedBy: auth.currentUser ? auth.currentUser.email : 'admin', // Usando o e-mail do usuário logado
        changes: {
          name: employee.name,
          position: employee.position,
          salary: employee.salary,
        },
      });

      // Atualizando os dados do funcionário
      const employeeRef = doc(db, 'employees', employeeId);
      await updateDoc(employeeRef, {
        name: employee.name,
        position: employee.position,
        salary: employee.salary,
      });

      alert('Funcionário atualizado com sucesso!');
    } catch (err) {
      setError('Erro ao atualizar funcionário');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg max-w-md mx-auto mt-8 text-gray-800">
      <h2 className="text-2xl font-bold text-center mb-6">Atualizar Funcionário</h2>
      <form onSubmit={handleUpdate} className="bg-gray-100 p-6 rounded-lg">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Nome"
              fullWidth
              value={employee.name}
              onChange={(e) => setEmployee({ ...employee, name: e.target.value })}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Cargo"
              fullWidth
              value={employee.position}
              onChange={(e) => setEmployee({ ...employee, position: e.target.value })}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Salário"
              fullWidth
              value={employee.salary}
              onChange={(e) => setEmployee({ ...employee, salary: e.target.value })}
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
              disabled={loading}
            >
              {loading ? 'Atualizando...' : 'Atualizar'}
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default UpdateEmployee;
