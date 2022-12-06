import './auction/index.js';
import './authentication/index.js';
import './profile/index.js';
import './html/index.js';
import './error/error.js';
import { autoLogin, isLoggedIn } from './authentication/index.js';

// Run on Load Functions

window.onload = () => {
    const welcomePage = document.getElementById('welcome-section');
    const auctionPage = document.getElementById('auction-section');
    if (isLoggedIn() === true) {
        autoLogin();
        welcomePage.style.display = 'none';
        auctionPage.style.display = 'block';

    }
}

// Button Click Functions