window.onload = () => {
    const token = localStorage.getItem("token");
    if (!token) {
        window.location.href = "login.html";
        return;
    }

    loadEmployees(token);

    document.getElementById("add_btn").addEventListener('click', addEmployee);
    document.getElementById("logout_btn").addEventListener('click', logout);
};

function logout() {
    localStorage.removeItem("token");
    window.location.href = "login.html";
}

function loadEmployees(token) {
    axios({
        method: 'get',
        url: 'http://localhost:3000/employees',
        headers: { 'Authorization': `Bearer ${token}` }
    }).then(function(res) {
        if (res.data.code == 200) {
            displayEmployees(res.data.message);
        }
    }).catch(function(err) {
        console.log(err);
        if (err.response && err.response.status === 401) {
            logout();
        }
    });
}

function displayEmployees(employees) {
    const container = document.getElementById("employees-container");
    container.innerHTML = "";
    employees.forEach(emp => {
        container.innerHTML += `
            <div class="employee-entry">
                <p><b>${emp.name} ${emp.last_name}</b> (${emp.email})</p>
                <button onclick="deleteEmployee(${emp.employee_id})">Eliminar</button>
            </div>
        `;
    });
}

function addEmployee() {
    const token = localStorage.getItem("token");
    const name = document.getElementById("name").value;
    const lastName = document.getElementById("last_name").value;
    const phone = document.getElementById("phone").value;
    const email = document.getElementById("email").value;
    const address = document.getElementById("address").value;

    axios({
        method: 'post',
        url: 'http://localhost:3000/employees',
        headers: { 'Authorization': `Bearer ${token}` },
        data: { name, last_name: lastName, phone, email, address }
    }).then(function(res) {
        if (res.data.code == 201) {
            alert("Empleado agregado correctamente");
            loadEmployees(token);
        }
    }).catch(function(err) {
        console.log(err);
        alert("Ocurrió un error al agregar el empleado.");
    });
}

function deleteEmployee(id) {
    const token = localStorage.getItem("token");
    axios({
        method: 'delete',
        url: `http://localhost:3000/employees/${id}`,
        headers: { 'Authorization': `Bearer ${token}` }
    }).then(function(res) {
        if (res.data.code == 200) {
            alert("Empleado eliminado");
            loadEmployees(token);
        }
    }).catch(function(err) {
        console.log(err);
        alert("Ocurrió un error al eliminar.");
    });
}