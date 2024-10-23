const express = require('express');
const db = require('../database/db');
const verifyToken = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/transactions', verifyToken, (req, res) => {
  const { type, category, amount, date, description } = req.body;

  db.run(`INSERT INTO transactions (user_id, type, category, amount, date, description) VALUES (?, ?, ?, ?, ?, ?)`,
    [req.userId, type, category, amount, date, description],
    function (err) {
      if (err) {
        return res.status(500).json({ message: 'Error creating transaction' });
      }
      res.status(201).json({ message: 'Transaction created successfully', transactionId: this.lastID });
    });
});

router.get('/transactions', verifyToken, (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const offset = (page - 1) * limit;

  db.all(`SELECT * FROM transactions WHERE user_id = ? LIMIT ? OFFSET ?`, [req.userId, limit, offset], (err, rows) => {
    if (err) {
      return res.status(500).json({ message: 'Error fetching transactions' });
    }
    res.status(200).json(rows);
  });
});


router.get('/transactions/:id', verifyToken, (req, res) => {

  db.get(`SELECT * FROM transactions WHERE user_id = ?`, [req.userId], (err, transaction) => {
    if (err) {
      return res.status(500).json({ message: 'Error fetching transaction' });
    }
    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }
    res.status(200).json(transaction);
  });
});

router.put('/transactions/:id', verifyToken, (req, res) => {
  const { id } = req.params;
  const { type, category, amount, date, description } = req.body;

  db.run(`UPDATE transactions SET type = ?, category = ?, amount = ?, date = ?, description = ? WHERE user_id = ?`,
    [type, category, amount, date, description,req.userId],
    function (err) {
      if (err) {
        return res.status(500).json({ message: 'Error updating transaction' });
      }
      if (this.changes === 0) {
        return res.status(404).json({ message: 'Transaction not found' });
      }
      res.status(200).json({ message: 'Transaction updated successfully' });
    });
});

router.delete('/transactions/:id', verifyToken, (req, res) => {
  const { id } = req.params;

  db.run(`DELETE FROM transactions WHERE user_id = ?`, [req.userId], function (err) {
    if (err) {
      return res.status(500).json({ message: 'Error deleting transaction' });
    }
    if (this.changes === 0) {
      return res.status(404).json({ message: 'Transaction not found' });
    }
    res.status(200).json({ message: 'Transaction deleted successfully' });
  });
});

router.get('/summary', verifyToken, (req, res) => {
  db.all(`SELECT type, SUM(amount) as total FROM transactions WHERE user_id = ? GROUP BY type`, [req.userId], (err, summary) => {
    if (err) {
      return res.status(500).json({ message: 'Error fetching summary' });
    }
    res.status(200).json(summary);
  });
});


module.exports = router;
