import db from '../config/db.config.js';

const createUserTable = () => {
  const sql = `
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) UNIQUE NOT NULL,
      phone VARCHAR(20) NOT NULL,
      role ENUM('Student', 'Teacher', 'Institute') NOT NULL,
      password VARCHAR(255) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `;
  db.query(sql, (err, result) => {
    if (err) {
      console.error('Error creating users table:', err);
      throw err;
    }
    console.log('User table created');
  });
};

const createAppointmentTable = () => {
  const sql = `
    CREATE TABLE IF NOT EXISTS appointments (
      id INT AUTO_INCREMENT PRIMARY KEY,
      student_id INT,
      teacher_id INT,
      date DATE NOT NULL,
      time TIME NOT NULL,
      status ENUM('Pending', 'Confirmed') DEFAULT 'Pending',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (student_id) REFERENCES users(id),
      FOREIGN KEY (teacher_id) REFERENCES users(id)
    )
  `;
  db.query(sql, (err, result) => {
    if (err) {
      console.error('Error creating appointments table:', err);
      throw err;
    }
    console.log('Appointment table created');
  });
};

export { createUserTable, createAppointmentTable };
