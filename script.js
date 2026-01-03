// Optional: highlight the About nav link if this script is reused on other pages.
document.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelectorAll(".about-nav-link");
  links.forEach(link => {
    if (link.getAttribute("href") === "#about") {
      link.classList.add("about-nav-link-active");
    }
  });
});
// footer.js
document.addEventListener("DOMContentLoaded", () => {
  const currentHash = window.location.hash || "#home";
  const footerLinks = document.querySelectorAll(".footer-nav-link");

  footerLinks.forEach(link => {
    if (link.getAttribute("href") === currentHash) {
      link.style.color = "#ffffff";
    }
  });
});

// Simple: toggle `.nav-about` on the header when the HERO leaves the viewport
document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.about-header, .site-header, .work-header');
  const hero = document.querySelector('#home-hero, .hero');
  if (!header || !hero) return;

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      // when the hero is visible, remove `.nav-about`; when it's not, add it
      if (entry.isIntersecting) header.classList.remove('nav-about');
      else header.classList.add('nav-about');
    });
  }, { threshold: 0.05 });

  io.observe(hero);

  // initial state: if hero is already out of view, set nav-about
  const rect = hero.getBoundingClientRect();
  if (rect.bottom <= 0 || rect.top < header.offsetHeight * -1) header.classList.add('nav-about');
});

// Interactive green star pointer that follows the cursor
document.addEventListener('DOMContentLoaded', () => {
  try {
    const svgNS = 'http://www.w3.org/2000/svg';
    const star = document.createElementNS(svgNS, 'svg');
    star.setAttribute('class', 'custom-cursor');
    star.setAttribute('width', '28');
    star.setAttribute('height', '28');
    star.setAttribute('viewBox', '0 0 24 24');
    // simple 5-point star path
    star.innerHTML = '<path d="M12 2.5 L14.7 8.4 L20.9 9.2 L16.5 13.6 L17.8 19.8 L12 16.6 L6.2 19.8 L7.5 13.6 L3.1 9.2 L9.3 8.4 Z" fill="#18ff3c" />';
    document.body.appendChild(star);

    // enable hiding on touch devices
    const prefersCoarse = window.matchMedia('(pointer: coarse)').matches;
    if (prefersCoarse) {
      star.style.display = 'none';
      return;
    }

    document.documentElement.classList.add('has-custom-cursor');

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let curX = mouseX;
    let curY = mouseY;
    const ease = 0.18; // follow smoothing

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      star.style.display = '';
    }, { passive: true });

    window.addEventListener('mouseleave', () => star.style.display = 'none');
    window.addEventListener('mouseenter', () => star.style.display = '');

    // hide on first touch
    function handleTouch() {
      star.style.display = 'none';
      document.documentElement.classList.remove('has-custom-cursor');
      window.removeEventListener('touchstart', handleTouch);
    }
    window.addEventListener('touchstart', handleTouch, { passive: true });

    function render() {
      curX += (mouseX - curX) * ease;
      curY += (mouseY - curY) * ease;
      // set transform so star centers on pointer
      star.style.transform = `translate3d(${curX}px, ${curY}px, 0) translate(-50%, -50%)`;
      requestAnimationFrame(render);
    }

    requestAnimationFrame(render);
  } catch (e) {
    // silent fail on very old browsers
    console.error('Custom cursor init error:', e);
  }
});
