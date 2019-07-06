if (window.IntersectionObserver) {
  const config = {
    rootMargin: '0px 0px 50px 0px',
    threshold: 0
  };

  const preloadImage = function (img) {
    const dataSrc = img.getAttribute('data-src')
    img.setAttribute('src', dataSrc)
  }

  const observer = new IntersectionObserver(function (entries, self) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        preloadImage(entry.target);
        self.unobserve(entry.target);
      }
    });
  }, config);

  const imgs = document.querySelectorAll('[data-src]');
  imgs.forEach(img => {
    observer.observe(img);
  });
};