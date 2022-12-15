/* Navbar */

const navAuction = document.getElementById('nav-auction-btn');
const navAbout = document.getElementById('nav-about-btn');
const navLogin = document.getElementById('nav-login-btn');
const navRegister = document.getElementById('nav-register-btn');

/* Welcome Tab */
const welcome = document.getElementById('welcome-section');
const welcomeRegister = document.getElementById('welcome-create-button');
const welcomeLogin = document.getElementById('welcome-login-button');
const welcomeGuest = document.getElementById('welcome-guest-button');

/* Authroize Tab */
const authorize = document.getElementById('authorize-container');
const login = document.getElementById('login-container');
const register = document.getElementById('register-container');

/* Auction Tab */
const auction = document.getElementById('auction-section');

/* Profile Tab */
const profile = document.getElementById('profile-section');

/* Create Tab */
const create = document.getElementById('create-section');

/* Navbar Functions */

navAuction.onclick = () => {
    welcome.style.display = 'none';
    authorize.style.display = 'none';
    auction.style.display = 'block';
    profile.style.display = 'none';
    create.style.display = 'none';
}

navAbout.onclick = () => {
    welcome.style.display = 'block';
    authorize.style.display = 'none';
    auction.style.display = 'none';
    profile.style.display = 'none';
    create.style.display = 'none';
}

navLogin.onclick = () => {
    welcome.style.display = 'none';
    authorize.style.display = 'block';
    login.style.display = 'block';
    register.style.display = 'none';
    auction.style.display = 'none';
    profile.style.display = 'none';
    create.style.display = 'none';
}

navRegister.onclick = () => {
    welcome.style.display = 'none';
    authorize.style.display = 'block';
    login.style.display = 'none';
    register.style.display = 'block';
    auction.style.display = 'none';
    profile.style.display = 'none';
    create.style.display = 'none';
}

/* Welcome Functions */

welcomeRegister.onclick = () => {
    welcome.style.display = 'none';
    authorize.style.display = 'block';
    login.style.display = 'none';
    register.style.display = 'block';
    auction.style.display = 'none';
    profile.style.display = 'none';
    create.style.display = 'none';
}

welcomeLogin.onclick = () => {
    welcome.style.display = 'none';
    authorize.style.display = 'block';
    login.style.display = 'block';
    register.style.display = 'none';
    auction.style.display = 'none';
    profile.style.display = 'none';
    create.style.display = 'none';
}

welcomeGuest.onclick = () => {
    welcome.style.display = 'none';
    auction.style.display = 'block';
}
