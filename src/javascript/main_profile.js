import './profile/index.js';
import { getUser, autoLogin, isLoggedIn } from './profile/index.js';

// Onload functions

window.onload = () => {
    if (isLoggedIn() === true) {
        getUser();
        autoLogin();
    }
}
