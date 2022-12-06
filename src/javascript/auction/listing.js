const url = 'https://api.noroff.dev/api/v1';

const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    Authorization: 'Bearer ' + localStorage.getItem('access-token'),
};

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
                    <img src="${listing.media[0]}" class="card-img-top auction-img" alt="${listing.title}">
                    <div class="card-body">
                        <h5 class="card-title
                        ${listing.status === 'sold' ? 'text-success' : ''}">${listing.title}</h5>
                        <p class="card-text">${listing.description}</p>
                    </div>
                    <div class="card-footer">
                        <p class="card-text">Bids: ${listing._count.bids}</p>
                        <p class="card-text">Ends: ${listing.endsAt}</p>
                        <a href="#" class="btn btn-primary">Bid</a>
                    </div>
                </div>
            </div>
        `;
    });
}

const createBtn = document.getElementById('create-listing-btn');

createBtn.onclick = () => {
    const title = document.getElementById('create-listing')[0].value;
    const description = document.getElementById('create-listing')[1].value;
    const media = document.getElementById('create-listing')[2].value;
    const endsAt = document.getElementById('create-listing')[3].value;
    const options = {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({
            title: title,
            description: description,
            media: media,
            endsAt: endsAt,
        }),
    };
    fetch(url + '/auction/listings', options)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            setTimeout(function () { auctionListings }, 1000);
        })
        .catch((error) => {
            console.log(error);
        });
}

auctionListings();