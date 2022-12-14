// Function to toggle between light and dark mode
function toggleTheme() {
    // Get the current theme from the data-theme attribute
    const currentTheme = document.body.getAttribute('data-theme');
  
    if (currentTheme === 'light') {
      // Set the theme to dark mode
      document.body.setAttribute('data-theme', 'dark');
    } else {
      // Set the theme to light mode
      document.body.setAttribute('data-theme', 'light');
    }
}
