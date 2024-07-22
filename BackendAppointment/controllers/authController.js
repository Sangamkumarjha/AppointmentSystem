import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import db from '../config/db.config.js';
import { generateToken } from '../utills/token.js';

export const register = async (req, res) => {
  const { name, email, phone, role, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  const sql = 'INSERT INTO users (name, email, phone, role, password) VALUES (?, ?, ?, ?, ?)';
  db.query(sql, [name, email, phone, role, hashedPassword], (err, result) => {
    if (err) return res.status(500).json({ error: 'Registration failed' });
    res.status(201).json({ message: 'Registration successful' });
  });
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  const sql = 'SELECT * FROM users WHERE email = ?';
  db.query(sql, [email], async (err, results) => {
    if (err || results.length === 0) return res.status(401).json({ error: 'Invalid email or password' });

    const user = results[0];
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) return res.status(401).json({ error: 'Invalid email or password' });

    const token = generateToken(user.id, user.role);
    res.status(200).json({ token });
  });
};

export const logout = (req, res) => {
  // Implement logout logic (usually handled on the client side by deleting the token)
  res.status(200).json({ message: 'Logout successful' });
};
