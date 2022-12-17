import './home/auction/index.js';
import './home/authentication/index.js';
import './profile/index.js';
import './home/html/index.js';
import './error/error.js';
import { autoLogin, isLoggedIn, guestLogin } from './home/authentication/index.js';
import { auctionListings } from './home/auction/index.js';

// Run on Load Functions

window.onload = () => {
    history.replaceState(null, null, '?#');
    const welcomePage = document.getElementById('welcome-section');
    const auctionPage = document.getElementById('auction-section');
    if (isLoggedIn() === true) {
        welcomePage.style.display = 'none';
        auctionPage.style.display = 'block';
        auctionListings();
        autoLogin();
    } else if (localStorage.getItem('guest') === 'true') {
        welcomePage.style.display = 'none';
        auctionPage.style.display = 'block';
        auctionListings();
        guestLogin();
        document.querySelector('#open-listing-btn').style.display = 'none';
    }
}

// Button Click Functions