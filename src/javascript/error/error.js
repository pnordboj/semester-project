export function displayError(message) {
    if (!message) {
        message = 'An error occured!';
    }
    return `<div class="alert alert-danger" role="alert">${message}</div>`;
}