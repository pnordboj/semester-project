const url = 'https://api.noroff.dev/api/v1';
const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
};
const html = document.getElementById('alert-container');
const creditsHTML = document.getElementById('nav-credits');
const logoutBtn = document.getElementById('nav-logout-btn');

const userImage = [];

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
                if (data.accessToken) {
                    localStorage.setItem('access-token', data.accessToken);
                    localStorage.setItem('user', JSON.stringify(data.name).replace(/"/g, ''));
                    localStorage.setItem('userimage', data.avatar);
                    localStorage.setItem('credits', data.credits);
                    creditsHTML.innerHTML = `<a id="nav-credits" class="nav-link"
                    >Credits: ${localStorage.getItem('credits')}</a>`
                    setTimeout(function () { window.location.href = "/"; }, 2000);
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

export function autoLogin() {
    if (isLoggedIn() === true) {
        
        const navLogin = document.getElementById('nav-login');
        const navRegister = document.getElementById('nav-register');
        const navLogout = document.getElementById('nav-logout');
        const auctionButtons = document.getElementsByClassName('auction-buttons');
        const loggedAs = document.getElementById('logged-as');

        loggedAs.innerHTML = `<a href="/profile/?user=${localStorage.getItem('user')}" class="nav-link">Logged in as: ${localStorage.getItem('user')}</a>`;
        navLogin.style.display = 'none';
        navRegister.style.display = 'none';
        navLogout.style.display = 'block';
        creditsHTML.innerHTML = `<a id="nav-credits" class="nav-link"
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
    const navLogin = document.getElementById('nav-login');
    const navRegister = document.getElementById('nav-register');
    const navLogout = document.getElementById('nav-logout');
    localStorage.removeItem('access-token');
    localStorage.removeItem('user');
    localStorage.removeItem('userimage');
    localStorage.removeItem('credits');
    navLogin.innerHTML = `<a id="nav-login-btn" class="nav-link" href="#">Login</a>`;
    navRegister.style.display = 'block';
    navLogout.style.display = 'none';
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