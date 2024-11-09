// src/components/EmployeeForm.js
import React from 'react';
import { useForm } from 'react-hook-form';
import { TextField, Button, Grid, Box, Typography } from '@mui/material';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import employeeService from '../services/employeeService';
import storageService from '../services/storageService';

const schema = yup.object({
  name: yup.string().required('Nome é obrigatório'),
  surname: yup.string().required('Sobrenome é obrigatório'), // Novo campo para sobrenome
  position: yup.string().required('Cargo é obrigatório'),
  department: yup.string().required('Setor é obrigatório'),
  salary: yup.number().required('Salário é obrigatório').positive(),
  hireDate: yup.date().required('Data de Admissão é obrigatória'),
  address: yup.string().required('Endereço é obrigatório'),
  phone: yup.string().required('Telefone é obrigatório'),
  email: yup.string().email('E-mail inválido').required('E-mail é obrigatório'),
  nationality: yup.string().required('Nacionalidade é obrigatória'),
}).required();

function EmployeeForm({ employee, onSave }) {
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(schema),
    defaultValues: employee || {}
  });

  const onSubmit = async (data) => {
    try {
      let profilePictureUrl = null;
      if (data.profilePicture && data.profilePicture[0]) {
        profilePictureUrl = await storageService.uploadProfilePicture(data.profilePicture[0]);
      }
      if (employee) {
        await employeeService.updateEmployee(employee.id, { ...data, profilePictureUrl });
      } else {
        await employeeService.addEmployee({ ...data, profilePictureUrl });
      }
      onSave();
      reset();
    } catch (error) {
      console.error('Erro ao salvar funcionário:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2}>
        
        {/* Coluna da foto e dos campos de nome */}
        <Grid item xs={12} md={4} display="flex" justifyContent="center" alignItems="center">
          {/* Área para upload da foto */}
          <Box
            sx={{
              width: '150px',
              height: '200px',
              backgroundColor: '#f0f0f0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid #ccc',
              mb: 2
            }}
          >
            <input
              type="file"
              {...register('profilePicture')}
              accept="image/*"
            />
          </Box>
        </Grid>

        {/* Coluna de Nome e Sobrenome */}
        <Grid item xs={12} md={8}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                label="Nome"
                {...register('name')}
                error={!!errors.name}
                helperText={errors.name?.message}
                placeholder="Nome"
                fullWidth
                InputProps={{ style: { backgroundColor: '#f5f5f5', color: '#6b6b6b' } }}
              />
              <Typography variant="caption" color="textSecondary">Exemplo: Paulo</Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Sobrenome"
                {...register('surname')}
                error={!!errors.surname}
                helperText={errors.surname?.message}
                placeholder="Sobrenome"
                fullWidth
                InputProps={{ style: { backgroundColor: '#f5f5f5', color: '#6b6b6b' } }}
              />
              <Typography variant="caption" color="textSecondary">Exemplo: Silva</Typography>
            </Grid>
          </Grid>
        </Grid>

        {/* Restante dos campos */}
        <Grid item xs={12}>
          <TextField
            label="Cargo"
            {...register('position')}
            error={!!errors.position}
            helperText={errors.position?.message}
            placeholder="Cargo"
            fullWidth
            InputProps={{ style: { backgroundColor: '#f5f5f5', color: '#6b6b6b' } }}
          />
          <Typography variant="caption" color="textSecondary">Exemplo: Fullstack Developer</Typography>
        </Grid>
        
        <Grid item xs={12}>
          <TextField
            label="Setor"
            {...register('department')}
            error={!!errors.department}
            helperText={errors.department?.message}
            placeholder="Setor"
            fullWidth
            InputProps={{ style: { backgroundColor: '#f5f5f5', color: '#6b6b6b' } }}
          />
          <Typography variant="caption" color="textSecondary">Exemplo: Desenvolvimento</Typography>
        </Grid>

        <Grid item xs={12}>
          <TextField
            label="Salário"
            type="number"
            {...register('salary')}
            error={!!errors.salary}
            helperText={errors.salary?.message}
            placeholder="Salário"
            fullWidth
            InputProps={{ style: { backgroundColor: '#f5f5f5', color: '#6b6b6b' } }}
          />
          <Typography variant="caption" color="textSecondary">Exemplo: R$ 5000,00</Typography>
        </Grid>

        <Grid item xs={12}>
          <TextField
            label="Data de Admissão"
            type="date"
            {...register('hireDate')}
            error={!!errors.hireDate}
            helperText={errors.hireDate?.message}
            fullWidth
            InputLabelProps={{ shrink: true }}
          />
        </Grid>

        {/* Novos campos */}
        <Grid item xs={12}>
          <TextField
            label="Endereço"
            {...register('address')}
            error={!!errors.address}
            helperText={errors.address?.message}
            placeholder="Endereço"
            fullWidth
            InputProps={{ style: { backgroundColor: '#f5f5f5', color: '#6b6b6b' } }}
          />
          <Typography variant="caption" color="textSecondary">Exemplo: Rua das Flores, 123</Typography>
        </Grid>

        <Grid item xs={12}>
          <TextField
            label="Telefone"
            {...register('phone')}
            error={!!errors.phone}
            helperText={errors.phone?.message}
            placeholder="Telefone"
            fullWidth
            InputProps={{ style: { backgroundColor: '#f5f5f5', color: '#6b6b6b' } }}
          />
          <Typography variant="caption" color="textSecondary">Exemplo: (81) 99999-9999</Typography>
        </Grid>

        <Grid item xs={12}>
          <TextField
            label="E-mail"
            {...register('email')}
            error={!!errors.email}
            helperText={errors.email?.message}
            placeholder="E-mail"
            fullWidth
            InputProps={{ style: { backgroundColor: '#f5f5f5', color: '#6b6b6b' } }}
          />
          <Typography variant="caption" color="textSecondary">Exemplo: exemplo@email.com</Typography>
        </Grid>

        <Grid item xs={12}>
          <TextField
            label="Nacionalidade"
            {...register('nationality')}
            error={!!errors.nationality}
            helperText={errors.nationality?.message}
            placeholder="Nacionalidade"
            fullWidth
            InputProps={{ style: { backgroundColor: '#f5f5f5', color: '#6b6b6b' } }}
          />
          <Typography variant="caption" color="textSecondary">Exemplo: Brasileiro</Typography>
        </Grid>

        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary">Salvar</Button>
        </Grid>
      </Grid>
    </form>
  );
}

export default EmployeeForm;
