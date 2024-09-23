document.addEventListener('DOMContentLoaded', function() {
    // Function to scroll to a specific element smoothly
    function scrollToElement(elementId) {
        const element = document.getElementById(elementId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    }

    // Attach click event listeners to navigation links
    const navLinks = document.querySelectorAll('nav ul li a');
    //this is same as
    //const navLinks = document.querySelectorAll("nav > ul > li > a");

    //explaination:
    //querySelectorAll: This function collects all the <a> elements 
    //located within nav > ul > li into a NodeList 
    //(similar to an array but specific to DOM nodes).
    navLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault(); // Prevent default link behavior
            const targetId = this.getAttribute('href').slice(1); // Remove '#' from href
            scrollToElement(targetId);
        });
    });
});
