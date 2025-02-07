// JavaScript to toggle the menu
const menuIcon = document.getElementById('menu-icon');
const navLinks = document.getElementById('nav-links');

menuIcon.addEventListener('click', () => {
    navLinks.classList.toggle('active'); // Toggles the 'active' class on the nav links
});
