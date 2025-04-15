/**
 * Jerusalem Tech Blog - Main JavaScript
 */

document.addEventListener('DOMContentLoaded', function() {
  // Scroll-based header hide/show
  const setupScrollHeader = () => {
    const header = document.querySelector('.site-header');
    if (!header) return;

    let lastScroll = 0;
    const mobileBreakpoint = 768;

    window.addEventListener('scroll', function() {
      if (window.innerWidth > mobileBreakpoint) return;

      const currentScroll = window.pageYOffset;

      // At top of page - always show
      if (currentScroll <= 0) {
        header.classList.remove('hide');
        header.classList.add('show');
        return;
      }

      // Scrolling down - hide header
      if (currentScroll > lastScroll && !header.classList.contains('hide')) {
        header.classList.remove('show');
        header.classList.add('hide');
      }
      // Scrolling up - show header
      else if (currentScroll < lastScroll && header.classList.contains('hide')) {
        header.classList.remove('hide');
        header.classList.add('show');
      }

      lastScroll = currentScroll;
    });
  };

  // Mobile menu toggle
  const setupMobileMenu = () => {
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    if (menuToggle) {
      menuToggle.addEventListener('click', function() {
        document.body.classList.toggle('menu-open');
      });
    }
  };

  // Highlight current page in navigation
  const highlightCurrentPage = () => {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.main-nav a');

    navLinks.forEach(link => {
      const linkPath = link.getAttribute('href');
      if (currentPath === linkPath ||
          (linkPath !== '/' && currentPath.startsWith(linkPath))) {
        link.classList.add('active');
      }
    });
  };

  // Smooth scroll for anchor links
  const setupSmoothScroll = () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 80,
            behavior: 'smooth'
          });
        }
      });
    });
  };

  // Code syntax highlighting
  const setupCodeHighlighting = () => {
    const codeBlocks = document.querySelectorAll('pre code');
    if (window.hljs && codeBlocks.length > 0) {
      codeBlocks.forEach(block => {
        hljs.highlightElement(block);
      });
    }
  };

  // Lazy load images
  const setupLazyLoading = () => {
    if ('loading' in HTMLImageElement.prototype) {
      const images = document.querySelectorAll('img[loading="lazy"]');
      images.forEach(img => {
        img.src = img.dataset.src;
      });
    } else {
      // Fallback for browsers that don't support lazy loading
      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
      document.body.appendChild(script);
    }
  };

  // Initialize
  setupScrollHeader();
  setupMobileMenu();
  highlightCurrentPage();
  setupSmoothScroll();
  setupCodeHighlighting();
  setupLazyLoading();

  // Add animation to elements when they come into view
  if ('IntersectionObserver' in window) {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
      observer.observe(el);
    });
  } else {
    // Fallback for browsers that don't support IntersectionObserver
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
      el.classList.add('in-view');
    });
  }
});
