import './profile/index.js';
import { getUser, autoLogin, isLoggedIn, editImage, profileListing } from './profile/index.js';


// Onload functions

const htmlSection = document.getElementById('user-section');

window.onload = () => {
    if (isLoggedIn() === true) {
        getUser();
        autoLogin();
        profileListing();
    } else {
        htmlSection.innerHTML = `
        <div class="alert alert-danger" role="alert">
            You are not logged in!
            Plesae log in to view your profile.
        </div>
        `;
        setTimeout(() => {
        window.location.href = '/';
        }, 3000);
    }
}

// onclick functions

const editImgBtn = document.getElementById('edit-image-btn');
const logoutBtn = document.getElementById('nav-logout-btn');

editImgBtn.onclick = () => {
    editImage();
};

logoutBtn.onclick = () => {
    localStorage.clear();
    localStorage.setItem('guest', 'true');
    window.location.href = '/';
}