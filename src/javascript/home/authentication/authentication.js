const url = 'https://api.noroff.dev/api/v1';
const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
};
const html = document.getElementById('alert-container');
const creditsHTML = document.getElementById('nav-credits');
const logoutBtn = document.getElementById('nav-logout-btn');

export const login = () => {

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

    if (checkEmail(email)) {
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
                    setTimeout(function () { window.location.href = "/"; }, 3000);
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
                    if (data.accessToken) {

                        localStorage.setItem('access-token', data.accessToken);
                        // I had to inclue the replace method to remove the quotes from the name
                        // otherwise it would not work with the profile page
                        localStorage.setItem('user', JSON.stringify(data.name).replace(/"/g, ''));
                        localStorage.setItem('userimage', data.avatar);
                        setTimeout(function () { html.innerHTML = `<div class="alert alert-success" role="alert">User successfully created! Please login!</div>` }, 2000);
                    } else {
                        html.innerHTML = `<div class="alert alert-danger" role="alert">${data.message}</div>`;
                    }
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

function checkEmail(email) {
    const re = /\S+@\S+\.\S+/;
    if (re.test(email)) {
        if (email.indexOf("@stud.noroff.no", email.length - "@stud.noroff.no".length) !== -1) {
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