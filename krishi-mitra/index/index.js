document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.getElementById('menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      mobileMenu.classList.toggle('show');
    });

    // Smooth scroll for mobile menu links
    const links = document.querySelectorAll('.mobile-menu .link');
    links.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href')?.slice(1);
        const section = document.getElementById(targetId);
        if (section) section.scrollIntoView({ behavior: 'smooth' });

        // Close menu
        mobileMenu.classList.remove('show');
        hamburger.classList.remove('active');
      });
    });
  }
})
