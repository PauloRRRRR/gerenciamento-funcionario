// src/components/EmployeeHistory.js
import React, { useState, useEffect } from 'react';
import { db } from '../firebaseConfig'; 
import { collection, query, where, orderBy, getDocs } from 'firebase/firestore';
import { List, ListItem, ListItemText, Divider } from '@mui/material';

const EmployeeHistory = ({ employeeId }) => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      const historyRef = collection(db, 'employees', employeeId, 'history');
      const q = query(historyRef, orderBy('changedAt', 'desc'));
      const querySnapshot = await getDocs(q);
      const historyData = querySnapshot.docs.map(doc => doc.data());
      setHistory(historyData);
    };
    fetchHistory();
  }, [employeeId]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Histórico de Alterações</h2>
      <List>
        {history.map((entry, index) => (
          <div key={index}>
            <ListItem>
              <ListItemText
                primary={`Alterado por: ${entry.changedBy}`}
                secondary={`Data: ${entry.changedAt.toDate().toLocaleString()}`}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary={`Alterações: `}
                secondary={`Nome: ${entry.changes.name}, Cargo: ${entry.changes.position}, Salário: ${entry.changes.salary}`}
              />
            </ListItem>
            {index < history.length - 1 && <Divider />}
          </div>
        ))}
      </List>
    </div>
  );
};

export default EmployeeHistory;
