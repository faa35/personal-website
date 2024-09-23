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
    navLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault(); // Prevent default link behavior
            const targetId = this.getAttribute('href').slice(1); // Remove '#' from href
            scrollToElement(targetId);
        });
    });
});
