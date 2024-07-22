import mysql from 'mysql2';
import { Sequelize } from 'sequelize';
import { createUserTable,createAppointmentTable } from '../models/userModel.js';

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Sangam123#@', 
  database: 'appointment_system',
});

db.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL database');
  
    // Create tables if they don't exist
    createUserTable();
    createAppointmentTable();
});

export default db;

