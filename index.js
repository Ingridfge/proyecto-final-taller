const express = require('express');
const morgan = require('morgan');
const app = express();

// Routers
const userRoutes = require('./routes/user');
const employeeRoutes = require('./routes/employees');

// Middleware
const authMiddleware = require('./middleware/auth');

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/user", userRoutes);
app.use("/employees", authMiddleware, employeeRoutes);

app.use(express.static('empleados'));

app.listen(3000, () => {
    console.log('Server is running...');
});