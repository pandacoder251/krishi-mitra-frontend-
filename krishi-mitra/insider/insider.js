document.addEventListener('DOMContentLoaded', () => {
 
// Hamburger & Mobile Menu

  const hamburger = document.getElementById('menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      mobileMenu.classList.toggle('show');
    });
  }


// Smooth Scroll for Mobile Links

  const mobileLinks = document.querySelectorAll('.mobile-menu .link');
  mobileLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href')?.slice(1);
      const section = document.getElementById(targetId);
      if (section) {
        e.preventDefault();
        section.scrollIntoView({ behavior: 'smooth' });
      }
      mobileMenu?.classList.remove('show');
      hamburger?.classList.remove('active');
    });
  });

// Language Change Handler

  function handleLanguageChange(selectElement) {
    const selectedLang = selectElement.options[selectElement.selectedIndex].text;
    alert(`Your language has been changed to: ${selectedLang}`);
  }


  const desktopLang = document.getElementById('language-toggle');
  const mobileLang = document.getElementById('language-toggle-mobile');

  desktopLang?.addEventListener('change', function () {
    handleLanguageChange(this);
  });

  mobileLang?.addEventListener('change', function () {
    handleLanguageChange(this);
  });


// Chat Bubble Click

  const chatToggle = document.getElementById('chat-toggle');

  chatToggle?.addEventListener('click', (e) => {
    e.preventDefault();
    window.open('/chatbot/chatbot.html', '_blank');
  });

// Drag to Scroll Sliders

  const sliders = document.querySelectorAll('.feature-slider, .news-slider');

  sliders.forEach(slider => {
    let isDown = false;
    let startX = 0;
    let scrollLeft = 0;

    slider.addEventListener('mousedown', (e) => {
      isDown = true;
      slider.classList.add('active');
      startX = e.pageX - slider.offsetLeft;
      scrollLeft = slider.scrollLeft;
    });

    slider.addEventListener('mouseleave', () => {
      isDown = false;
      slider.classList.remove('active');
    });

    slider.addEventListener('mouseup', () => {
      isDown = false;
      slider.classList.remove('active');
    });

    slider.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - slider.offsetLeft;
      const walk = (x - startX) * 2;
      slider.scrollLeft = scrollLeft - walk;
    });
  });


// Feature Card Click Scroll to Blog Section
  const featureCards = document.querySelectorAll('.feature-card');

  featureCards.forEach(card => {
    card.addEventListener('click', () => {
      const targetId = card.dataset.target;
      const section = document.getElementById(targetId);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
});