const url = 'https://api.noroff.dev/api/v1';
const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
};
const html = document.getElementById('alert-container');
const creditsHTML = document.getElementById('nav-credits');
const logoutBtn = document.getElementById('nav-logout-btn');

export const login = () => {
    try {
        localStorage.setItem('guest', 'false');

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

        if (validateLogin(email, password)) {
            fetch(url + '/auction/auth/login', options)
                .then((response) => response.json())
                .then((data) => {
                    if (data.accessToken) {
                        localStorage.setItem('access-token', data.accessToken);
                        localStorage.setItem('user', JSON.stringify(data.name).replace(/"/g, ''));
                        localStorage.setItem('userimage', data.avatar);
                        localStorage.setItem('credits', data.credits);
                        creditsHTML.innerHTML = `<a id="nav-credits" class="nav-link"
                        >Credits: ${localStorage.getItem('credits')}</a>`
                        setTimeout(function () { window.location.href = "/"; }, 1000);
                    } else {
                        html.innerHTML = `<div class="alert alert-danger" role="alert">${data.message}</div>`;
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    } catch (error) {
        console.log(error);
    }
}

function checkLoginEmail(email) {
    const re = /\S+@\S+\.\S+/;
    const alertEmail = document.getElementById('login-alert-email');
    if (re.test(email)) {
        if (email.indexOf("@stud.noroff.no", email.length - "@stud.noroff.no".length) !== -1) {
            if  (alertEmail.innerHTML !== '') {
                alertEmail.style.display = 'none';
            }
            return true;
        } else {
            alertEmail.innerHTML = `<div class="alert alert-danger" role="alert">Invalid email, email needs to be @stud.noroff.no</div>`;
            return false;
        }
    } else {
        alertEmail.innerHTML = `<div class="alert alert-danger" role="alert">Invalid email</div>`;
        return false;
    }
}

function checkLoginPassword(password) {
    const alertPassword = document.getElementById('login-alert-password');
    if (password.length < 8) {
        alertPassword.innerHTML = `<div class="alert alert-danger" role="alert">Password must be at least 8 characters</div>`;
        return false;
    } else {
        if (alertPassword.innerHTML !== '') {
            alertPassword.style.display = 'none';
        }
        return true;
    }
}

function validateLogin(email, password) {

    // Checks if the input is valid
    const check1 = checkLoginEmail(email);
    const check2 = checkLoginPassword(password);

    if (check1 && check2) {
        return true;
    } else if (!check1) {
        return false;
    } else if (!check2) {
        return false;
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
        
        const alertHtml = document.getElementById('register-alert');
        if (validateRegister(username, email, avatar, password)) {
            fetch(url + '/auction/auth/register', options)
                .then((response) => response.json())
                .then((data) => {
                    if (data.id) {
                        localStorage.setItem('access-token', data.accessToken);
                        localStorage.setItem('user', JSON.stringify(data.name).replace(/"/g, ''));
                        localStorage.setItem('userimage', data.avatar);
                        localStorage.setItem('credits', data.credits);
                        setTimeout(function () { html.innerHTML = `<div class="alert alert-success" role="alert">User successfully created!</div>`
                        window.location.reload }, 2000);
                    } else {
                        alertHtml.innerHTML = `<div class="alert alert-danger" role="alert">${data.errors[0].message}</div>`;
                    }
                })
                .catch((error) => {
                    console.log(error);
                    alertHtml.innerHTML = `<div class="alert alert-danger" role="alert">${error}</div>`;
                });
        }
    } catch (error) {
        console.log(error);
        alertHtml.innerHTML = `<div class="alert alert-danger" role="alert">${error}</div>`;
    }
}

function checkUsername(username) {
    const alertUsername = document.getElementById('register-alert-username');
    if (username.length < 3) {
        alertUsername.innerHTML = `<div class="alert alert-danger" role="alert">Username must be at least 3 characters</div>`;
        return false;
    } else {
        if (alertUsername.innerHTML !== '') {
            alertUsername.style.display = 'none';
        }
        return true;
    }
}

function checkEmail(email) {
    const re = /\S+@\S+\.\S+/;
    const alertEmail = document.getElementById('register-alert-email');
    if (re.test(email)) {
        if (email.indexOf("@stud.noroff.no", email.length - "@stud.noroff.no".length) !== -1) {
            if  (alertEmail.innerHTML !== '') {
                alertEmail.style.display = 'none';
            }
            return true;
        } else {
            alertEmail.innerHTML = `<div class="alert alert-danger" role="alert">Invalid email, email needs to be @stud.noroff.no</div>`;
            return false;
        }
    } else {
        alertEmail.innerHTML = `<div class="alert alert-danger" role="alert">Invalid email</div>`;
        return false;
    }
}

function checkUrl(avatar) {
    const re = /^(ftp|http|https):\/\/[^ "]+$/;
    const alertUrl= document.getElementById('register-alert-url');
    if (re.test(avatar)) {
        if (alertUrl.innerHTML !== '') {
            alertUrl.style.display = 'none';
        }
        return true;
    } else {
        alertUrl.innerHTML = `<div class="alert alert-danger" role="alert">Invalid URL</div>`;
        return false;
    }
}

function checkPassword(password) {
    const alertPassword = document.getElementById('register-alert-password');
    if (password.length < 8) {
        alertPassword.innerHTML = `<div class="alert alert-danger" role="alert">Password must be at least 8 characters</div>`;
        return false;
    } else {
        if (alertPassword.innerHTML !== '') {
            alertPassword.style.display = 'none';
        }
        return true;
    }
}

function validateRegister(username, email, avatar, password) {

    // Checks if the input is valid
    const check1 = checkUsername(username);
    const check2 = checkEmail(email);
    const check3 = checkUrl(avatar);
    const check4 = checkPassword(password);

    if (check1 && check2 && check3 && check4) {
        return true;
    } else if (!check1) {
        return false;
    } else if (!check2) {
        return false;
    } else if (!check3) {
        return false;
    } else if (!check4) {
         return false;
    }
}

export function isLoggedIn() {
    return Boolean(localStorage.getItem('access-token'));
}

export function guestLogin() {
    if (localStorage.getItem('guest') === 'true') {
        const auctionButtons = document.getElementsByClassName('auction-buttons');
        const loggedAs = document.getElementById('logged-as');
        loggedAs.innerHTML = `<a href="/profile/?user=${localStorage.getItem('user')}" class="nav-link">Logged in as: Guest</a>`;
        auctionButtons.innerHTML = ``;
    }
}

export function autoLogin() {
    if (isLoggedIn() === true) {
        localStorage.setItem('guest', 'false');
        const navLogin = document.getElementById('nav-login');
        const navRegister = document.getElementById('nav-register');
        const navLogout = document.getElementById('nav-logout');
        const creditsHTML = document.getElementById('nav-credits');
        const auctionButtons = document.getElementsByClassName('auction-buttons');
        const loggedAs = document.getElementById('logged-as');

        loggedAs.innerHTML = `<a href="/profile/?user=${localStorage.getItem('user')}" class="nav-link">Logged in as: ${localStorage.getItem('user')}</a>`;
        navLogin.style.display = 'none';
        navRegister.style.display = 'none';
        navLogout.style.display = 'block';
        creditsHTML.style.display = 'block';
        creditsHTML.innerHTML = `<a id="nav-label-credits" class="nav-link"
        >Credits: ${localStorage.getItem('credits')}</a>`
        auctionButtons.innerHTML = `
        <button id="open-listing-btn" type="button" class="btn btn-secondary">
            Create Auction
        </button>
        <button type="button" class="btn btn-secondary">My Auctions</button>
        <a href="/profile/?user=${localStorage.getItem('user')}" class="btn btn-secondary">My Profile</a>
        `;
    }
}

logoutBtn.onclick = function logout() {
    localStorage.clear();
    localStorage.setItem('guest', 'true')
    const navLogin = document.getElementById('nav-login');
    const navRegister = document.getElementById('nav-register');
    const navLogout = document.getElementById('nav-logout');
    navLogin.innerHTML = `<a id="nav-login-btn" class="nav-link" href="#">Login</a>`;
    navRegister.style.display = 'block';
    navLogout.style.display = 'none';
    window.location.href = "/";
}

const loginBtn = document.getElementById('login-btn');
const registerBtn = document.getElementById('register-btn');

loginBtn.onclick = () => {
    login();
}

registerBtn.onclick = () => {
    register();
}