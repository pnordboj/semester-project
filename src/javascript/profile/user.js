const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('user');

const url = `https://api.noroff.dev/api/v1/auction/profiles/${id}`;
const alert = document.getElementById('alert-container');

const headers = {
    Authorization: 'Bearer ' + localStorage.getItem('access-token'),
    'Content-Type': 'application/json',
};

export async function getUser() {
    const response = await fetch(url, {
        headers: headers,
    });
    const data = await response.json();
    const cardImage = document.getElementById('card-image');
    const userName = document.getElementById('user-title-box');
    const userEmail = document.getElementById('user-email-box');
    const totalCredits = document.getElementById('total-credits');
    cardImage.innerHTML = `
        <img id="user-image" src="${data.avatar}" class="card-img-top" alt="${data.name} (No profile picture)">
    `;
    userName.innerHTML = `
        <p class="card-title">${data.name}</p>
    `;
    userEmail.innerHTML = `
        <p class="card-text">${data.email}</p>
    `;
    totalCredits.innerHTML = `
        <p class="card-text">Credits available: ${data.credits}</p>
    `;
}

export async function editImage() {

    const newImg = document.getElementById('new-image-url').value;
    const response = await fetch(url + '/media', {
        method: 'PUT',
        headers: headers,
        body: JSON.stringify({ 
            avatar: newImg,
        }),
    });
    const data = await response.json();
    if (data.status === 200) {
        alert.innerHTML = `
            <div class="alert alert-success" role="alert">
                Image updated!
            </div>
        `;
        getUser();
    } else {
        alert.innerHTML = `
            <div class="alert alert-danger" role="alert">
                Something went wrong!
            </div>
        `;
    }
}

let sortUrl = '/listings?sort=created&sortOrder=desc';

async function profileListing() {
    const response = await fetch(url + sortUrl, {
        headers: headers,
    });
    const data = await response.json();
    const listings = document.getElementById('profile-listing');
    listings.innerHTML = '';
    data.forEach((listing) => {
        listings.innerHTML += `
            <div class="auction-card">
                <div class="card mb-4" href="/listing/?id=${listing.id}">
                    <img src="${listing.media[0]}" class="card-img-top auction-img" alt="${listing.title}">
                    <div class="card-body">
                        <h5 class="card-title">${listing.title}</h5>
                        <p class="card-text">${listing.description}</p>
                        <p class="card-text">Bids: ${listing._count.bids}</p>
                        <p class="card-text">Ends: ${listing.endsAt}</p>
                        <a href="/listing/?id=${listing.id}" class="btn btn-primary">View</a>
                    </div>
                </div>
            </div>
        `;
    });
}

window.onload = () => {
    profileListing();
};