document.addEventListener('DOMContentLoaded', async function() {
    var elementId = 'bepio';
    // Get the div element with id="api"
    var apiElement = document.getElementById(elementId);

    // Extract the text content from the div to use as the title
    if ('textContent' in apiElement){
        titleText = apiElement.textContent.trim();
    } else {
        text = apiElement.innerText.trim();
    }

    // Normalize the title for the API request
    var normalizedTitle = encodeURIComponent(titleText);

    // API URL
    var apiUrl = `https://bepio.net/api/content/${normalizedTitle}`;
    try{
        // Fetch content from the API async
        const response = await fetch(apiUrl);
        //Check if the repsponse is good
        if(!response.ok){
            throw new Error('Something Went Wrong');
        }
        //Get the text content from the response
        const htmlContent = await response.text();
        //set the html content
        apiElement.innerHTML = htmlContent;
    } catch (error){
        console.error('Error fetching contnt:', error);
    }
});