const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('id');

const url = `https://api.noroff.dev/api/v1/auction/listings/${id}?_seller=true&_bids=true`;
const html = document.getElementById('listing-container');
const alert = document.getElementById('alert-container');
const headers = {
    Authorization: 'Bearer ' + localStorage.getItem('access-token'),
};

export async function getListing() {
    const response = await fetch(url, {
        headers: headers,
    });
    const data = await response.json();
    console.log(data);
    const listing = document.getElementById('listing-container');
    const seller = document.getElementById('seller-container');
    const image = document.getElementById('image-container');
    listing.innerHTML = '';
    seller.innerHTML = '';
    image.innerHTML = '';
    image.innerHTML += `
        <img src="${data.media[0]}" id="listing-img" class="card-img-top" alt="${data.title}">
    `;
    seller.innerHTML += `
        <div class="card mb-4">
            <div class="card-body">
                <p style="font-size="16px"">Seller</p>
                <img id="seller-image" src="${data.seller.avatar}" class="card-img-top" alt="${data.seller.name} (No profile picture)">
                <p class="card-title">${data.seller.name}</p>
            </div>
            <div class="card-footer">
                <p class="card-text">Email: ${data.seller.email}</p>
            </div>
        </div>
    `;
    listing.innerHTML += `
    <div id="listing-card">
            <div class="card mb-4">
                <div class="card-body">
                    <h5 class="card-title">${data.title}</h5>
                    <p class="card-text">${data.description}</p>
                </div>
                <div class="card-footer">
                    <p class="card-text">Bids: ${data._count.bids}</p>
                    <p class="card-text">Ends: ${data.endsAt}</p>
                    <div class="btn-group">
                        <form id="bid-form">
                            <input type="number" name="bid" id="bid" placeholder="Bid Amount">
                            <button id="bid-btn" class="btn btn-primary">Bid</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    `;
}

window.onload = () => {
    getListing();
}


const bidBtn = document.getElementById('bid-btn');

bidBtn.onclick = () => {
    const bid = document.getElementById('bid').value;
    const options = {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${localStorage.getItem('access-token')}`,
        },
        body: JSON.stringify({ bid }),
    };
    console.log(options.body);
    if (bid > localStorage.getItem('credits')) {
        fetch(url, options)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                if (data.error) {
                    html.innerHTML = `
                        <div class="alert alert-danger" role="alert">
                            ${data.error}
                        </div>
                    `;
                } else {
                    html.innerHTML = `
                        <div class="alert alert-success" role="alert">
                            Successfully bid ${data.amount} credits
                        </div>
                    `;
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