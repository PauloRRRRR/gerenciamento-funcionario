// src/services/employeeService.js
import { db } from '../firebaseConfig';
import { collection, addDoc, updateDoc, doc, getDocs, deleteDoc } from 'firebase/firestore';
import storageService from './storageService';

const employeeCollection = collection(db, 'employees');

// Função para adicionar um novo funcionário
const addEmployee = async (data) => {
  try {
    let profilePictureUrl = null;
    if (data.profilePicture && data.profilePicture[0]) {
      profilePictureUrl = await storageService.uploadProfilePicture(data.profilePicture[0]);
    }

    const docRef = await addDoc(employeeCollection, {
      name: data.name,
      position: data.position,
      department: data.department,
      salary: data.salary,
      profilePictureUrl: profilePictureUrl || '',
    });

    console.log('Funcionário adicionado com ID: ', docRef.id);
    return docRef.id;
  } catch (error) {
    console.error('Erro ao adicionar funcionário: ', error);
    throw error;
  }
};

// Função para atualizar um funcionário
const updateEmployee = async (id, data) => {
  try {
    const docRef = doc(db, 'employees', id);
    await updateDoc(docRef, data);
  } catch (error) {
    console.error('Erro ao atualizar funcionário: ', error);
  }
};

// Função para recuperar todos os funcionários
const getEmployees = async () => {
  try {
    const snapshot = await getDocs(employeeCollection);
    const employeeList = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    return employeeList;
  } catch (error) {
    console.error('Erro ao recuperar funcionários: ', error);
    return [];
  }
};

// Função para excluir um funcionário
const deleteEmployee = async (id) => {
  try {
    const docRef = doc(db, 'employees', id);
    await deleteDoc(docRef);
    console.log('Funcionário excluído com sucesso.');
  } catch (error) {
    console.error('Erro ao excluir funcionário: ', error);
    throw error;
  }
};

export default {
  addEmployee,
  updateEmployee,
  getEmployees,
  deleteEmployee, // Exportando a nova função
};
