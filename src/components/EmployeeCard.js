// src/components/EmployeeCard.js
import React, { useState } from 'react';
import { Card, CardContent, Typography, Button, Grid, TextField } from '@mui/material';
import employeeService from '../services/employeeService';

function EmployeeCard({ employee }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState(employee);

  const handleEditClick = () => {
    setIsExpanded(!isExpanded);
    setEditMode(!editMode);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSave = async () => {
    try {
      await employeeService.updateEmployee(employee.id, formData);
      setEditMode(false);
    } catch (error) {
      console.error("Erro ao salvar as alterações:", error);
    }
  };

  return (
    <Card variant="outlined">
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Typography variant="h6">{employee.name} {employee.surname}</Typography>
            <Typography variant="body1">Função: {employee.position}</Typography>
            <Typography variant="body1">Data de Nascimento: {employee.birthDate}</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Button variant="contained" onClick={handleEditClick}>
              {isExpanded ? 'Minimizar' : 'Editar'}
            </Button>
          </Grid>
        </Grid>

        {/* Expansão para visualizar e editar detalhes */}
        {isExpanded && (
          <Grid container spacing={2} marginTop={2}>
            {editMode ? (
              <>
                <Grid item xs={12}>
                  <TextField
                    label="Nome"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Sobrenome"
                    name="surname"
                    value={formData.surname}
                    onChange={handleChange}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Cargo"
                    name="position"
                    value={formData.position}
                    onChange={handleChange}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Setor"
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Salário"
                    name="salary"
                    type="number"
                    value={formData.salary}
                    onChange={handleChange}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Data de Nascimento"
                    name="birthDate"
                    type="date"
                    value={formData.birthDate}
                    onChange={handleChange}
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Endereço"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button variant="contained" color="primary" onClick={handleSave}>
                    Salvar
                  </Button>
                </Grid>
              </>
            ) : (
              <>
                <Grid item xs={12}>
                  <Typography variant="body1">Cargo: {employee.position}</Typography>
                  <Typography variant="body1">Setor: {employee.department}</Typography>
                  <Typography variant="body1">Salário: {employee.salary}</Typography>
                  <Typography variant="body1">Endereço: {employee.address}</Typography>
                </Grid>
              </>
            )}
          </Grid>
        )}
      </CardContent>
    </Card>
  );
}

export default EmployeeCard;
