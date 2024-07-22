import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { createUserTable, createAppointmentTable } from './models/userModel.js';

const app = express();

createUserTable();
createAppointmentTable();

app.use(bodyParser.json());
app.use(cors());

// Routes
import authRoutes from './routes/authRouter.js';
import userRoutes from './routes/userRouter.js';
import appointmentRoutes from './routes/appointmentRouter.js';

app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/appointments', appointmentRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
