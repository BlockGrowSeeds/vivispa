(function() {

  var toggleMenuButton = document.querySelector('.header__toggle-menu');
  var menu = document.querySelector('.menu');
  var toggleMenuButtonWithMouse = false;

  if (toggleMenuButton) {
    toggleMenuButton.addEventListener('click', function(event) {
      var targetHeight;
      event.preventDefault();

      if (menu.offsetHeight) {
        toggleMenuButton.classList.remove('header__toggle-menu--close');
        menu.style.height = menu.offsetHeight + 'px';
        setTimeout(function() {
          menu.style.height = '0';
        }, 0);
      } else {
        toggleMenuButton.classList.add('header__toggle-menu--close');
        menu.style.height = 'auto';
        targetHeight = menu.offsetHeight;
        menu.style.height = '0';
        setTimeout(function() {
          menu.style.height = targetHeight + 'px';
        }, 0);
      }
    });

    toggleMenuButton.addEventListener('keydown', function(event) {
      if (event.keyCode === 9) {
        toggleMenuButtonWithMouse = false;
      }
    });

    toggleMenuButton.addEventListener('mousedown', function() {
      toggleMenuButtonWithMouse = true;
    });

    toggleMenuButton.addEventListener('focus', function() {
      if (toggleMenuButtonWithMouse) {
        toggleMenuButton.classList.add('header__toggle-menu--mouse-focus');
      }
    });

    toggleMenuButton.addEventListener('blur', function() {
      toggleMenuButton.classList.remove('header__toggle-menu--mouse-focus');
    });
  }

  var lazyImages = document.querySelectorAll('img[data-src]');
  if ('IntersectionObserver' in window
      && 'IntersectionObserverEntry' in window
      && 'isIntersecting' in window.IntersectionObserverEntry.prototype) {
    var lazyImageObserver = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.src = entry.target.dataset.src;
          lazyImageObserver.unobserve(entry.target);
        }
      })
    });
    for (var i = 0; i < lazyImages.length; i++) {
      lazyImageObserver.observe(lazyImages[i]);
    }
  } else {
    for (var i = 0; i < lazyImages.length; i++) {
      lazyImages[i].src = lazyImages[i].dataset.src;
    }
  }

  if (/iPad|iPhone|iPod/.test(navigator.platform) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)) {
    document.body.classList.add('is-mobile');
  }
  if (/Safari/.test(navigator.userAgent) && !/CriOS/.test(navigator.userAgent)) {
    document.body.classList.add('is-safari');
  }

  if ((document.cookie = 'cookies_enabled=1') && (document.cookie.indexOf('cookies_enabled=') !== -1) && (document.cookie = 'cookies_enabled=1; expires=Thu, 01-Jan-1970 00:00:01 GMT')) {
    document.body.classList.add('cookies-enabled');
  }
})();

// ScrollReveal //

window.sr = ScrollReveal()
sr.reveal('.header', {
  duration: 2000,
  origin: 'top'
});