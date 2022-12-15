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
        'content-type': 'application/json',
    });
    const data = await response.json();
    console.log(data);
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
    const body = JSON.stringify({
        avatar: newImg,
    });
    const response = await fetch(url, {
        method: 'PUT',
        headers: headers,
        body: body,
    });
    const data = await response.json();
    console.log(data);
    if (response.status === 200) {
        alert.innerHTML = `
            <div class="alert alert-success" role="alert">
                Image updated!
            </div>
        `;
        setTimeout(() => {
            location.reload();
        }, 1000);
    } else {
        alert.innerHTML = `
            <div class="alert alert-danger" role="alert">
                Something went wrong!
            </div>
        `;
    }
}