document.addEventListener('DOMContentLoaded', function () {
    // Function to scroll to a specific element smoothly
    function scrollToElement(elementId) {
        const element = document.getElementById(elementId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    }

    // Attach click event listeners to navigation links
    const navLinks = document.querySelectorAll('nav ul li a');
    //this is same as below
    //const navLinks = document.querySelectorAll("nav > ul > li > a");

    //explaination:
    //querySelectorAll: This function collects all the <a> elements 
    //located within nav > ul > li into a NodeList 
    //(similar to an array but specific to DOM nodes).
    navLinks.forEach(link => {
        link.addEventListener('click', function (event) {
            event.preventDefault(); // Prevent default link behavior
            const targetId = this.getAttribute('href').slice(1); // Remove '#' from href
            scrollToElement(targetId);
        });
    });


    //The below code uses the IntersectionObserver API to track which section of the page is currently visible as you scroll. 
    //It highlights the corresponding navigation link when you scroll into that section.

    // Selecting Sections:
    // This selects all <section> elements on the page, which are the parts of the page the user scrolls through (like "About," "Projects," etc.).
    const sections = document.querySelectorAll('section');

    // Options for the IntersectionObserver:
    // root: null means it watches the whole viewport (i.e., the browser window).
    // rootMargin: '0px' means no extra margin is added; it works on the exact viewport.
    // threshold: 0.6 means the observer will trigger when 60% of a section is visible in the viewport.
    const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.3 // Change this threshold to control when the highlighting happens
                       //something like 0.2 or 0.1, which means the section will be considered "in view" when 20% or 10% of it is visible.
    };

    // Creating the IntersectionObserver:
    // This creates an observer that monitors when sections enter or leave the viewport.
    const observer = new IntersectionObserver((entries, observer) => {

        // Handling Each Section:
        // The entries represent each section that the observer is watching.
        entries.forEach(entry => {

            // Updating the Navigation Links:
            // This selects the navigation link that corresponds to the currently visible section (using the section's ID).
            const navLink = document.querySelector(`nav ul li a[href="#${entry.target.id}"]`);

            // If the section is visible (entry.isIntersecting), the code:
            if (entry.isIntersecting) {
                // Removes the active class from all navigation links (so none of them are highlighted anymore).
                navLinks.forEach(link => link.classList.remove('active'));
                // Adds the active class to the current section’s link, so it becomes highlighted.
                navLink.classList.add('active'); // changing the .active in CSS
            }
        });
    }, options);

    // Observing Each Section:
    // This tells the observer to start watching each section on the page, so it can trigger when a section becomes visible.
    sections.forEach(section => {
        observer.observe(section);
    });

});
