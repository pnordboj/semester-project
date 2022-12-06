const url = 'https://api.noroff.dev/api/v1';
const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
};
const html = document.getElementById('alert-container');

export const login = () => {

    const email = document.getElementById('login')[0].value;
    const password = document.getElementById('login')[1].value;

    const options = {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({
            email: email,
            password: password,
        }),
    };

    if (checkEmail(email)) {
        fetch(url + '/auction/auth/login', options)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                if (data.access_token) {
                    localStorage.setItem('access-token', data.token);
                    localStorage.setItem('user', JSON.stringify(data.user));
                    setTimeout(function () { window.location.href = "/"; }, 500);
                } else {
                    html.innerHTML = `<div class="alert alert-danger" role="alert">${data.message}</div>`;
                }
            })
            .catch((error) => {
                console.log(error);
            });
    } else {
        html.innerHTML = `<div class="alert alert-danger" role="alert">Invalid email</div>`;
    }
}

export const register = () => {
    try {

        const username = document.getElementById('register')[0].value;
        const email = document.getElementById('register')[1].value;
        const avatar = document.getElementById('register')[2].value;
        const password = document.getElementById('register')[3].value;

        const options = {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({
                name: username,
                email: email,
                avatar: avatar,
                password: password,
            }),
        }

        if (checkEmail(email)) {
            fetch(url + '/auction/auth/register', options)
                .then((response) => response.json())
                .then((data) => {
                    console.log(data);
                    if (data.access_token) {
                        localStorage.setItem('access-token', data.token);
                        localStorage.setItem('user', JSON.stringify(data.user));
                        setTimeout(function () { html.innerHTML = `<div class="alert alert-success" role="alert">User successfully created! Please login!</div>` }, 2000);
                    } else {
                        html.innerHTML = `<div class="alert alert-danger" role="alert">${data.message}</div>`;
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        } else {
            html.innerHTML = `<div class="alert alert-danger" role="alert">Invalid email</div>`;
        }
    } catch (error) {
        console.log(error);
    }
}

export function isLoggedIn() {
    return Boolean(localStorage.getItem('access-token'));
}

export function autoLogin() {
    if (isLoggedIn() === true) {
        const navLogin = document.getElementById('nav-login');
        const navRegister = document.getElementById('nav-register');
        navLogin.innerHTML = `<a class="nav-link" onclick="profilePage()">Welcome: ${localStorage.getItem('username')}</a>`;
        navRegister.innerHTML = `<a class="nav-link" onclick="logout()">Logout</a>`;
    }
}

export function logout() {
    const navLogin = document.getElementById('nav-login');
    const navRegister = document.getElementById('nav-register');
    localStorage.removeItem('access-token');
    localStorage.removeItem('user');
    navLogin.innerHTML = `<a id="nav-login-btn" class="nav-link" href="#">Login</a>`;
    navRegister.innerHTML = `<a class="nav-link" id="nav-register-btn" href="#">Create Account</a>`;
    window.location.href = "/";
}

function checkEmail(email) {
    const re = /\S+@\S+\.\S+/;
    if (re.test(email)) {
        if (email.indexOf("@stud.noroff.no", email.length - "@stud.noroff.no".length) !== -1) {
            console.log("Valid email");
            return true;
        }
    }
}

const loginBtn = document.getElementById('login-btn');
const registerBtn = document.getElementById('register-btn');

loginBtn.onclick = () => {
    login();
}

registerBtn.onclick = () => {
    register();
}