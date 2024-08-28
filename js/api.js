document.addEventListener('DOMContentLoaded', async function() {
    // Get the div element with id="api"
    var apiElement = document.getElementById('bepio');

    if (!apiElement) {
        console.error('API element not found');
        return; // Exit if the API element is not found
    }

    // Extract the text content from the div to use as the title
    var titleText = apiElement.innerText.trim();
    
    // Normalize the title for the API request
    var normalizedTitle = encodeURIComponent(titleText);

    // API URL
    var apiUrl = `https://bepio.net/api/content/${normalizedTitle}`;

    // Fetch content from the API
    fetch(apiUrl)
        .then(response => response.text())
        .then(htmlContent => {
            // Set the API response content back inside the div with id="api"
            apiElement.innerHTML = htmlContent;
        })
        .catch(error => {
            console.error('Error fetching content:', error);
        });
});