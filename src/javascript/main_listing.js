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
        loggedInAs.innerHTML = `<a href="/profile/?user=${localStorage.getItem('user')}" class="nav-link">Logged in as: ${localStorage.getItem('user')}</a>`;
        navLogin.style.display = 'none';
        navRegister.style.display = 'none';
        navLogout.style.display = 'block';
        creditsHTML.style.display = 'block';
        creditsHTML.innerHTML = `<a id="nav-label-credits" class="nav-link"
        >Credits: ${localStorage.getItem('credits')}</a>`
    }
}

const logoutBtn = document.getElementById('nav-logout-btn');

logoutBtn.onclick = function logout() {
    localStorage.clear();
    localStorage.setItem('guest', 'true');
    window.location.href = '/';
}