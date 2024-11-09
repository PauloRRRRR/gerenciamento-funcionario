// src/services/firebaseService.js
import { db } from '../firebaseConfig';
import { collection, addDoc, getDocs } from 'firebase/firestore';

// Adicionar novo funcionário
export const addEmployee = async (employeeData) => {
  try {
    const docRef = await addDoc(collection(db, "employees"), employeeData);
    console.log("Funcionário adicionado com ID:", docRef.id);
  } catch (e) {
    console.error("Erro ao adicionar funcionário: ", e);
  }
};

// Obter lista de funcionários
export const getEmployees = async () => {
  const querySnapshot = await getDocs(collection(db, "employees"));
  const employees = [];
  querySnapshot.forEach((doc) => {
    employees.push({ id: doc.id, ...doc.data() });
  });
  return employees;
};
