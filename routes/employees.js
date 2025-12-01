const express = require('express');
const employees = express.Router();
const db = require('../config/database');

employees.get("/", async (req, res, next) => {
    const empleado = await db.query("SELECT * FROM employees");
    return res.status(200).json({ code: 200, message: empleado });
});

employees.post("/", async (req, res, next) => {
    const { name, last_name, phone, email, address } = req.body;
    if (name && last_name && phone && email && address) {
        let query = `INSERT INTO employees(name, last_name, phone, email, address) VALUES('${name}', '${last_name}', '${phone}', '${email}', '${address}')`;
        const rows = await db.query(query);
        if (rows.affectedRows == 1) {
            return res.status(201).json({ code: 201, message: "Empleado agregado correctamente." });
        }
        return res.status(500).json({ code: 500, message: "Ocurrió un error." });
    }
    return res.status(400).json({ code: 400, message: "Campos incompletos." });
});

employees.put(/^\/(\d{1,3})$/, async (req, res, next) => {
    const id = req.params[0];
    const { name, last_name, phone, email, address } = req.body;
    if (name && last_name && phone && email && address) {
        let query = `UPDATE employees SET name='${name}', last_name='${last_name}', phone='${phone}', email='${email}', address='${address}' WHERE employee_id = ${id}`;
        const rows = await db.query(query);
        if (rows.affectedRows == 1) {
            return res.status(200).json({ code: 200, message: "Empleado actualizado correctamente." });
        }
        return res.status(404).json({ code: 404, message: "Empleado no encontrado." });
    }
    return res.status(400).json({ code: 400, message: "Campos incompletos." });
});

employees.delete(/^\/(\d{1,3})$/, async (req, res, next) => {
    const id = req.params[0];
    const query = `DELETE FROM employees WHERE employee_id = ${id}`;
    const rows = await db.query(query);
    if (rows.affectedRows == 1) {
        return res.status(200).json({ code: 200, message: "Empleado borrado correctamente." });
    }
    return res.status(404).json({ code: 404, message: "Empleado no encontrado." });
});

employees.get(/^\/([A-Za-z]+)$/, async (req, res, next) => {
    const name = req.params[0];
    const empleado = await db.query(`SELECT * FROM employees WHERE name LIKE '%${name}%'`);
    if (empleado.length > 0) {
        return res.status(200).json({ code: 200, message: empleado });
    }
    return res.status(404).json({ code: 404, message: "Empleado no encontrado." });
});

module.exports = employees;