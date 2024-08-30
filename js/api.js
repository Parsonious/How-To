document.addEventListener('DOMContentLoaded', async function() {
    var elementId = 'bepio';
    var spinnerId = 'bepio.spinner';
    var apiElement = document.getElementById(elementId);
    var spinnerElement = document.getElementById(spinnerId);

    if (apiElement) {
        // Extract the text content from the div to use as the title
        var titleText = apiElement.textContent ? apiElement.textContent.trim() : apiElement.innerText.trim();

        // Normalize the title for the API request
        var normalizedTitle = encodeURIComponent(titleText);

        // API URL
        var apiUrl = `https://bepio.net/api/content/${normalizedTitle}`;
        try {
            // Fetch content from the API asynchronously
            const response = await fetch(apiUrl);
            
            // Check if the response is ok (status in the range 200-299)
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            // Get the text content from the response
            const htmlContent = await response.text();

            // Create a new <div> to contain the HTML content
            var contentDiv = document.createElement('div');
            contentDiv.innerHTML = htmlContent;

            // Insert the new div after the apiElement
            apiElement.parentNode.insertBefore(contentDiv, apiElement.nextSibling);

            // Set the spinner's visibility to invisible
            if (spinnerElement) {
                spinnerElement.style.visibility = 'hidden';
            }
        } catch (error) {
            console.error('Error fetching content:', error);
            apiElement.innerHTML = '<p>Failed to load content. Please try again later.</p>';
        }
    } else {
        console.warn(`Element with id '${elementId}' not found.`);
    }
});
