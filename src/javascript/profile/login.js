export function autoLogin() {
    const creditsHTML = document.getElementById('nav-credits');
    const navLogout = document.getElementById('nav-logout');
    navLogout.style.display = 'block';
    creditsHTML.innerHTML = `<a id="nav-credits" class="nav-link"
    >Credits: ${localStorage.getItem('credits')}</a>`;
}

export function isLoggedIn() {
    return Boolean(localStorage.getItem('access-token'));
}