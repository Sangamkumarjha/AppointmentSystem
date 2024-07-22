import jwt from 'jsonwebtoken';

export const generateToken = (userId, role) => {
  return jwt.sign({ userId, role }, 'sassdsdshfdddfr', { expiresIn: '1h' });
};
