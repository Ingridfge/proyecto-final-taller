window.onload = () => {
    document.getElementById("login_btn").addEventListener('click', login);
};

function login() {
    const mail = document.getElementById("user_mail").value;
    const pass = document.getElementById("user_password").value;

    axios({
        method: 'post',
        url: 'http://localhost:3000/user/login',
        data: {
            user_mail: mail,
            user_password: pass
        }
    }).then(function(res) {
        if (res.data.code == 200) {
            localStorage.setItem("token", res.data.message);
            window.location.href = "index.html";
        } else {
            alert("Usuario y/o contraseña incorrectos.");
        }
    }).catch(function(err) {
        console.log(err);
        alert("Ocurrió un error al iniciar sesión.");
    });
}