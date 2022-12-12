import './listing/auctions/viewListing.js';
import { getListing } from './listing/auctions/viewListing.js';

// Run on Load Functions

window.onload = () => {
    if (isLoggedIn() === true) {
        autoLogin();
        getListing();
    }
}

export function isLoggedIn() {
    return Boolean(localStorage.getItem('access-token'));
}

export function autoLogin() {
    if (isLoggedIn() === true) {
        const navLogin = document.getElementById('nav-login');
        const loggedInAs = document.getElementById('logged-as');
        const navRegister = document.getElementById('nav-register');
        const navLogout = document.getElementById('nav-logout');
        const creditsHTML = document.getElementById('nav-credits');
        loggedInAs.innerHTML = 'Welcome Back: ' + localStorage.getItem('user');
        navLogin.style.display = 'none';
        navRegister.style.display = 'none';
        navLogout.style.display = 'block';
        creditsHTML.innerHTML = `<label id="nav-credits" class="rounded border-1"
        >Credits: ${localStorage.getItem('credits')}</label>`
    }
}

const logoutBtn = document.getElementById('nav-logout-btn');

logoutBtn.onclick = function logout() {
    const navLogin = document.getElementById('nav-login');
    const loggedInAs = document.getElementById('logged-as');
    const navRegister = document.getElementById('nav-register');
    const navLogout = document.getElementById('nav-logout');
    loggedInAs.innerHTML = '';
    localStorage.removeItem('access-token');
    localStorage.removeItem('username');
    localStorage.removeItem('userimage');
    localStorage.removeItem('credits');
    navLogin.innerHTML = `<a id="nav-login-btn" class="nav-link" href="#">Login</a>`;
    navRegister.style.display = 'block';
    navLogout.style.display = 'none';
    window.location.href = "/";
}