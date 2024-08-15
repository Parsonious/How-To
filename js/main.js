document.addEventListener("DOMContentLoaded", function()
{
    //get the title from the head of the html doc
    const titleText = document.title;

    //select the div where the title will be displayed
    const titleDiv = document.getElementById("title");

    //Initialize index for the current character
    let index = 0;

    //function to display the title one character at a time
    function displayTitle()
    {
        if (index < titleText.length)
        {
            titleDiv.textContent += titleText.charAt(index);
            index++;
            setTimeout(displayTitle, 50); //this controls the speed of the animation (by pausing the thread?)
        }
    }

    //start the animation by calling the function
    displayTitle();

    //Add event listeners to TOC links
    const tocLinks = document.querySelectorAll(".toc-link");

    tocLinks.forEach(function(link){
        link.addEventListener("click", function(event){
            event.preventDefault(); //prevent default anchor click behavior (jump to section)
            console.log("click event triggered");
            //Get the target section ID
            const targetID = this.getAttribute("data-target");
            const targetSection = document.getElementById(targetID);

            // Toggle the visibility of the section
    if (targetSection) {
        if (targetSection.style.display === "none" || !targetSection.style.display) {
            targetSection.style.display = "block";
        } else {
            targetSection.style.display = "none";
        }
    } else {
        console.error("No section found with id:", targetId);
    }
        });
    });
});