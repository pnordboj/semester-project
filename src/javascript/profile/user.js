const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('user');

const url = `https://api.noroff.dev/api/v1/auction/profiles/${id}`;
const alert = document.getElementById('alert-container');

const headers = {
    Authorization: 'Bearer ' + localStorage.getItem('access-token'),
};

export async function getUser() {
    const response = await fetch(url, {
        headers: headers,
    });
    const data = await response.json();
    console.log(data);
    const user = document.getElementById('user-container');
    user.innerHTML = '';
    user.innerHTML = `
        <div id="user-box" class="card-body">
            <div class="card" id="card-image"> 
                <img id="user-image" src="${data.avatar}" class="card-img-top" alt="${data.name} (No profile picture)">
                <button id="edit-image-btn" class="btn btn-secondary">Edit Image</button>
            </div>
            <div id="user-info">
                <label id="username-label">Username:</label>
                <div id="user-title-box">
                    <p class="card-title
                    ">${data.name}</p>
                    <button id="edit-name-btn" class="btn btn-secondary">Edit Username</button>
                </div>
                <hr id="whiteline">
                <label id="user-email-label">Email:</label>
                <div id="user-email-box">
                    <p class="card-text">${data.email}</p>
                    <button id="edit-email-btn" class="btn btn-secondary">Edit</button>
                </div>
                <hr id="whiteline">
                <p class="card-text">Credits available: ${data.credits}</p>
            </div>
        </div>
    `;
}