const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('id');

const url = `https://api.noroff.dev/api/v1/auction/listings/${id}?_seller=true&_bids=true`;
const alert = document.getElementById('alert-container');
const headers = {
    Authorization: 'Bearer ' + localStorage.getItem('access-token'),

};

let highestCurrentBid = 0;

export async function getListing() {
    const response = await fetch(url, {
        headers: headers,
    });
    const data = await response.json();
    let sortedBids = 0;
    if (data._count.bids > 0) {
        sortedBids = data.bids.sort((a, b) => b.amount - a.amount);
        highestCurrentBid = sortedBids[0].amount;
        sortedBids = sortedBids[0].amount;
    }
    const seller = document.getElementById('seller-container');

    const listingBody = document.getElementById('listing-body');
    listingBody.innerHTML = `
        <img id="listing-image" src="${data.media[0]}" class="card-img-top" alt="${data.title}">
        <h5 class="card-title">${data.title}</h5>
        <p class="card-text">${data.description}</p>
    `;

    const footerInfo = document.getElementById('footer-info');
    footerInfo.innerHTML = `    
        <p class="card-text">Bids: ${data._count.bids}</p>
        <p class="card-text">Highest bid: ${sortedBids}</p>
        <p class="card-text">Ends: ${data.endsAt}</p>
    `;
    seller.innerHTML = '';
    seller.innerHTML += `
        <div class="card mb-4">
            <div id="seller-box" class="card-body">
                <p>Posted by</p>
                <h3 class="card-title">${data.seller.name}</h3>
                <img id="seller-image" src="${data.seller.avatar}" class="card-img-top" alt="${data.seller.name} (No profile picture)">
            </div>
            <div class="card-footer">
                <p class="card-text">Email: ${data.seller.email}</p>
            </div>
        </div>
    `;
    
}

window.onload = () => {
    getListing();
}

const bidBtn = document.getElementById('bid-btn');
const bidUrl = `https://api.noroff.dev/api/v1/auction/listings/${id}/bids`;

bidBtn.onclick = () => {
    const bid = document.getElementById('bid').value;
    // Turn value of bid into a number
    const options = {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${localStorage.getItem('access-token')}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            amount: Number(bid),
        }),
    };
    if (bid <= localStorage.getItem('credits')) {
        fetch(bidUrl, options)
            .then((response) => response.json())
            .then((data) => {
                if (data.error) {
                    alert.innerHTML = `
                        <div class="alert alert-danger" role="alert">
                            ${data.error}
                        </div>
                    `;
                } 
                else if (highestCurrentBid > bid) {
                    alert.innerHTML = `
                        <div class="alert alert-danger" role="alert">
                            Your bid must be higher than the highest bid!
                        </div>
                    `;
                } else {
                    alert.innerHTML = `
                        <div class="alert alert-success" role="alert">
                            Successfully bid ${bid} credits
                        </div>
                    `;
                    const toalCredits = localStorage.getItem('credits') - bid;
                    localStorage.setItem('credits', toalCredits);
                }
            }
            );
    } else {
        alert.innerHTML = `
            <div class="alert alert-danger" role="alert">
                You do not have enough credits to place this bid!
            </div>
        `;
    }
};