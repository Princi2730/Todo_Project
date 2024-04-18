const db = require('../model/db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.createUser = (req, res) => {
    const { username, email, password } = req.body;

    // Check if user with the provided email already exists
    const SELECT_USER_QUERY = 'SELECT * FROM users WHERE email = ?';
    db.query(SELECT_USER_QUERY, [email], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results.length > 0) {
            // User with this email already exists
            return res.status(409).json({ error: 'User with this email already exists' });
        }

        // Generate salt and hash the password
        bcrypt.hash(password, 10, (err, hashedPassword) => {
            if (err) {
                return res.status(500).json({ error: 'Password encryption failed' });
            }

            // Insert the user with hashed password into the database
            const INSERT_USER_QUERY = `INSERT INTO users (username, email, password) VALUES (?, ?, ?)`;
            db.query(INSERT_USER_QUERY, [username, email, hashedPassword], (err, result) => {
                if (err) {
                    return res.status(500).json({ error: err.message });
                }
                res.status(201).json({ message: 'User created successfully' });
            });
        });
    });
};

exports.login = (req, res) => {
    const { email, password } = req.body;
    console.log(email,password);
    const SELECT_USER_QUERY = 'SELECT id, username, password FROM users WHERE email = ?';

    db.query(SELECT_USER_QUERY, [email], async (err, results) => {
        console.log(results,"results");
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        // if (results.length === 0) {
        //     return res.status(401).json({ error: 'Invalid email or password' });
        // }
        const user = { ...results[0] }; // Convert RowDataPacket to regular object

        console.log(user)

        try {
            if (await bcrypt.compare(password, user.password)) {
                const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
                res.status(200).json({ token, username: user.username });
            } else {
                res.status(401).json({ error: 'Invalid email or password' });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });
};


exports.refreshToken = (req, res) => {
    const { token } = req.body;

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

        if (Date.now() >= decodedToken.exp * 1000) {
            const newToken = jwt.sign({ userId: decodedToken.userId }, process.env.JWT_SECRET, { expiresIn: '1h' });
            res.status(200).json({ token: newToken });
        } else {
            res.status(400).json({ error: 'Token has not expired yet' });
        }
    } catch (error) {
        res.status(401).json({ error: 'Invalid token' });
    }
};
