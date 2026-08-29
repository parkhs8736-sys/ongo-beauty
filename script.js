const menuButton = document.querySelector('.menu-button');
const mobileMenu = document.querySelector('.mobile-menu');

if (menuButton && mobileMenu) {
  const setMenu = (open) => {
    menuButton.setAttribute('aria-expanded', String(open));
    mobileMenu.hidden = !open;
    document.body.classList.toggle('menu-open', open);
    menuButton.querySelector('.sr-only').textContent = open ? '메뉴 닫기' : '메뉴 열기';
  };

  menuButton.addEventListener('click', () => {
    setMenu(menuButton.getAttribute('aria-expanded') !== 'true');
  });

  mobileMenu.addEventListener('click', (event) => {
    if (event.target.closest('a')) setMenu(false);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') setMenu(false);
  });
}

document.querySelectorAll('[data-year]').forEach((element) => {
  element.textContent = new Date().getFullYear();
});

const revealElements = document.querySelectorAll('[data-reveal]');

if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12 });

  revealElements.forEach((element) => revealObserver.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add('is-visible'));
}

const contactForm = document.querySelector('[data-contact-form]');

if (contactForm) {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const status = contactForm.querySelector('[data-form-status]');

    if (!contactForm.checkValidity()) {
      contactForm.reportValidity();
      status.textContent = '필수 항목을 확인해 주세요.';
      return;
    }

    status.textContent = '문의가 접수된 것으로 표시했습니다. 실제 전송 기능은 연락처 확정 후 연결할 예정입니다.';
    contactForm.reset();
  });
}
