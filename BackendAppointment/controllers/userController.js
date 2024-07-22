import db from '../config/db.config.js';

export const getAllUsers = (req, res) => {
  const sql = 'SELECT * FROM users';
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: 'Failed to fetch users' });
    res.status(200).json(results);
  });
};

export const getUserById = (req, res) => {
  const { id } = req.params;
  const sql = 'SELECT * FROM users WHERE id = ?';
  db.query(sql, [id], (err, results) => {
    if (err || results.length === 0) return res.status(404).json({ error: 'User not found' });
    res.status(200).json(results[0]);
  });
};

export const updateUser = (req, res) => {
  const { id } = req.params;
  const { name, email, phone, role } = req.body;
  const sql = 'UPDATE users SET name = ?, email = ?, phone = ?, role = ? WHERE id = ?';
  db.query(sql, [name, email, phone, role, id], (err, result) => {
    if (err) return res.status(500).json({ error: 'Failed to update user' });
    res.status(200).json({ message: 'User updated successfully' });
  });
};

export const deleteUser = (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM users WHERE id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) return res.status(500).json({ error: 'Failed to delete user' });
    res.status(200).json({ message: 'User deleted successfully' });
  });
};
