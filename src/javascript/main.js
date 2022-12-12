import './home/auction/index.js';
import './home/authentication/index.js';
import './profile/index.js';
import './home/html/index.js';
import './error/error.js';
import { autoLogin, isLoggedIn } from './home/authentication/index.js';
import { auctionListings } from './home/auction/index.js';

// Run on Load Functions

window.onload = () => {
    const welcomePage = document.getElementById('welcome-section');
    const auctionPage = document.getElementById('auction-section');
    if (isLoggedIn() === true) {
        welcomePage.style.display = 'none';
        auctionPage.style.display = 'block';
        auctionListings();
        autoLogin();
    }
}

// Button Click Functions