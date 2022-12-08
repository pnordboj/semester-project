const url = 'https://api.noroff.dev/api/v1';

const html = document.getElementById('alert-container');

async function auctionListings() {
    const response = await fetch(url + '/auction/listings');
    const data = await response.json();
    console.log(data);
    const listings = document.getElementById('auctions');
    listings.innerHTML = '';
    data.forEach((listing) => {
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
                        <div class="btn-group">
                            <a href="#" class="btn btn-primary">Bid</a>
                            <a href="listing/?id=${listing.id}" class="btn btn-primary">View Post</a>
                        </div>
                    </div>
                </div>
            </div>
        `;
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
    const title = document.getElementById('create-listing')[0].value;
    const description = document.getElementById('create-listing')[1].value;
    const endsAt = document.getElementById('create-listing')[2].value;
    const tags = document.getElementById('create-listing')[3].value;
    const media = document.getElementById('create-listing')[4].value;
    console.log(document.getElementById('create-listing'));
    const options = {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${localStorage.getItem('access-token')}`,
        },
        body: JSON.stringify({ title, description, endsAt, tags, media }),
    };
    console.log(options.body);
    fetch(url + '/auction/listings', options)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            setTimeout(function () { auctionListings }, 2000);
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

auctionListings();

openListBtn.onclick = () => {
    openListing();
};