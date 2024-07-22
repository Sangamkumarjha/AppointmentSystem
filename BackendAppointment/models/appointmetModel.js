// backend/models/AppointmentModel.js

import { DataTypes } from 'sequelize';
import sequelize from '../config/db.config.js';

const Appointment = sequelize.define('Appointment', {
  studentName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  teacherName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  appointmentDate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('Pending', 'Confirmed', 'Cancelled'),
    defaultValue: 'Pending'
  }
});

export default Appointment;
