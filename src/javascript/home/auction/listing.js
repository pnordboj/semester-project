const url = 'https://api.noroff.dev/api/v1';

let sortUrl = '/auction/listings?sort=created&sortOrder=desc';


const filterSelect = document.getElementById('filter');
filterSelect.addEventListener('change', async () => {
    let loggedInAs = '';
    if (localStorage.getItem('access-token')) {
        loggedInAs = 'loggedIn';
    } else if (localStorage.getItem('guest') === 'true') {
        loggedInAs = 'guest';
    };
    switch (filterSelect.value) {
        case 'created-desc':
            sortUrl = '/auction/listings?sort=created&sortOrder=desc';
            break;
        case 'created-asc':
            sortUrl = '/auction/listings?sort=created&sortOrder=asc';
            break;
        case 'title-a-z':
            sortUrl = '/auction/listings?sort=title&sortOrder=asc';
            break;
        case 'title-z-a':
            sortUrl = '/auction/listings?sort=title&sortOrder=desc';
            break;
        }
    const response = await fetch(url + sortUrl);
    const data = await response.json();
    const listings = document.getElementById('auctions');
    listings.innerHTML = '';
    data.forEach((listing) => {
        switch (loggedInAs) {
            case 'loggedIn':
                listings.innerHTML += `
                    <div class="auction-card">
                        <div class="card mb-4">
                            <img href="listing/?id=${listing.id}" src="${listing.media[0]}" class="card-img-top auction-img" alt="${listing.title}">
                            <div class="card-body">
                                <h5 class="card-title
                                ${listing.status === 'sold' ? 'text-success' : ''}">${listing.title}</h5>
                                <p class="card-text">${listing.description}</p>
                            </div>
                            <div class="card-footer">
                                <p class="card-text">Bids: ${listing._count.bids}</p>
                                <p class="card-text">Ends: ${listing.endsAt}</p>
                                <div id="view-list-btn" class="btn-group">
                                    <a href="listing/?id=${listing.id}" class="btn btn-primary">View Post</a>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
            break;
            case 'guest':
                listings.innerHTML += `
                    <div class="auction-card">
                        <div class="card mb-4">
                            <img href="listing/?id=${listing.id}" src="${listing.media[0]}" class="card-img-top auction-img" alt="${listing.title}">
                            <div class="card-body">
                                <h5 class="card-title
                                ${listing.status === 'sold' ? 'text-success' : ''}">${listing.title}</h5>
                                <p class="card-text">${listing.description}</p>
                            </div>
                            <div class="card-footer">
                                <p class="card-text">Bids: ${listing._count.bids}</p>
                                <p class="card-text">Ends: ${listing.endsAt}</p>
                                <label>Please login to view and bid</label>
                            </div>
                        </div>
                    </div>
                `;
            break;
        }
    });
});

export async function auctionListings() {
    let loggedInAs = '';
    if (localStorage.getItem('access-token')) {
        loggedInAs = 'loggedIn';
    } else if (localStorage.getItem('guest') === 'true') {
        loggedInAs = 'guest';
    };
    const response = await fetch(url + sortUrl);
    const data = await response.json();
    const listings = document.getElementById('auctions');
    listings.innerHTML = '';
    data.forEach((listing) => {
        switch (loggedInAs) {
            case 'loggedIn':
                listings.innerHTML += `
                    <div class="auction-card">
                        <div class="card mb-4">
                            <img href="listing/?id=${listing.id}" src="${listing.media[0]}" class="card-img-top auction-img" alt="${listing.title}">
                            <div class="card-body">
                                <h5 class="card-title
                                ${listing.status === 'sold' ? 'text-success' : ''}">${listing.title}</h5>
                                <p class="card-text">${listing.description}</p>
                            </div>
                            <div class="card-footer">
                                <p class="card-text">Bids: ${listing._count.bids}</p>
                                <p class="card-text">Ends: ${listing.endsAt}</p>
                                <div id="view-list-btn" class="btn-group">
                                    <a href="listing/?id=${listing.id}" class="btn btn-primary">View Post</a>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
            break;
            case 'guest':
                listings.innerHTML += `
                    <div class="auction-card">
                        <div class="card mb-4">
                            <img href="listing/?id=${listing.id}" src="${listing.media[0]}" class="card-img-top auction-img" alt="${listing.title}">
                            <div class="card-body">
                                <h5 class="card-title
                                ${listing.status === 'sold' ? 'text-success' : ''}">${listing.title}</h5>
                                <p class="card-text">${listing.description}</p>
                            </div>
                            <div class="card-footer">
                                <p class="card-text">Bids: ${listing._count.bids}</p>
                                <p class="card-text">Ends: ${listing.endsAt}</p>
                                <label>Please login to view and bid</label>
                            </div>
                        </div>
                    </div>
                `;
            break;
        }
    });
}

const openListBtn = document.getElementById('open-listing-btn');

export function openListing() {
    const html = document.getElementById('create-section');
    const auctionHTML = document.getElementById('auction-section');
    auctionHTML.style.display = 'none';
    html.style.display = 'block';
};

const createBtn = document.getElementById('create-listing-btn');

createBtn.onclick = () => {
    const title = document.getElementById('create-title').value;
    const description = document.getElementById('create-description').value;
    const endsAt = document.getElementById('create-date').value;
    const endsAtISO = new Date(endsAt).toISOString();
    const tags = document.getElementById('create-tags').value.split(',')
    .map((tag) => tag.trim());
    const media = document.getElementById('create-image').value;

    const body = JSON.stringify({
        title: title,
        description: description,
        endsAt: endsAtISO,
        tags: tags,
        media: [media],
    });

    const options = {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${localStorage.getItem('access-token')}`,
            'Content-Type': 'application/json',
        },
        body: body,
    };
    fetch(url + '/auction/listings', options)
        .then((response) => response.json())
        .then((data) => {
            setTimeout(() => {
                window.location.href = 'listing/?id=' + data.id;
            }, 1000);
        })
        .catch((error) => {
            console.log(error);
        });
}

function noRefresh(event) {
    event.preventDefault();
}

const form = document.getElementById('create-listing');
form.addEventListener('submit', noRefresh);

openListBtn.onclick = () => {
    openListing();
};