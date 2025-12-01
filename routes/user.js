const express = require('express');
const jwt = require('jsonwebtoken');
const user = express.Router();
const db = require('../config/database');

user.post("/login", async (req, res, next) => {
    const { user_mail, user_password } = req.body;

    if (user_mail && user_password) {
        const query = `SELECT * FROM user WHERE user_mail = '${user_mail}' AND user_password = '${user_password}';`;
        const rows = await db.query(query);

        if (rows.length == 1) {
            const token = jwt.sign({
                user_id: rows[0].user_id,   
                user_mail: rows[0].user_mail
            }, "debugkey");
            return res.status(200).json({ code: 200, message: token });
        } else {
            return res.status(401).json({ code: 401, message: "Usuario y/o contraseña incorrectos" });
        }
    }
    return res.status(400).json({ code: 400, message: "Campos incompletos" });
});

module.exports = user;