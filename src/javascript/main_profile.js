import './profile/index.js';
import { getUser, autoLogin, isLoggedIn, editImage } from './profile/index.js';

// Onload functions

window.onload = () => {
    if (isLoggedIn() === true) {
        getUser();
        autoLogin();
    }
}

// onclick functions

const editImgBtn = document.getElementById('edit-image-btn');

editImgBtn.onclick = () => {
    editImage();
};