const express = require('express');
const router = express.Router();
const db = require('../config/database');
const verifyToken = require('../middleware/auth');

// Fetch comments for a specific post (public)
router.get('/:postId', (req, res) => {
    db.all(`SELECT comments.*, users.username FROM comments JOIN users ON comments.user_id = users.id WHERE post_id = ? ORDER BY comments.created_at ASC`, [req.params.postId], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

// Post a comment under a post (authenticated)
router.post('/:postId', verifyToken, (req, res) => {
    const { content } = req.body;
    db.run(`INSERT INTO comments (post_id, user_id, content) VALUES (?, ?, ?)`, [req.params.postId, req.user.id, content], function(err) {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: 'Comment added', commentId: this.lastID });
    });
});

module.exports = router;
