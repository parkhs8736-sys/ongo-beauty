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

const productLists = document.querySelectorAll('[data-product-list]');

const formatPrice = (price) => {
  if (typeof price === 'number' && Number.isFinite(price) && price > 0) {
    return `${new Intl.NumberFormat('ko-KR').format(price)}원`;
  }

  if (typeof price === 'string' && price.trim()) return price.trim();
  return '스토어에서 확인';
};

const getProductType = (name) => {
  if (name.includes('드라이')) return 'HAIR DRYER';
  if (name.includes('매직') || name.includes('고데기')) return 'STRAIGHTENER';
  return 'HAIR TOOL';
};

const createProductCard = (product, index) => {
  const article = document.createElement('article');
  article.className = 'store-product-card';

  const imageWrap = document.createElement('div');
  imageWrap.className = 'store-product-image';

  const image = document.createElement('img');
  image.src = product.image;
  image.alt = product.name;
  image.loading = index < 2 ? 'eager' : 'lazy';
  image.decoding = 'async';
  image.addEventListener('error', () => {
    imageWrap.classList.add('is-image-error');
    image.remove();
    imageWrap.setAttribute('aria-label', `${product.name} 이미지 준비 중`);
  });
  imageWrap.append(image);

  const body = document.createElement('div');
  body.className = 'store-product-body';

  const meta = document.createElement('div');
  meta.className = 'store-product-meta';

  const type = document.createElement('span');
  type.textContent = getProductType(product.name);

  const number = document.createElement('span');
  number.textContent = String(index + 1).padStart(2, '0');
  meta.append(type, number);

  const title = document.createElement('h3');
  title.textContent = product.name;

  const price = document.createElement('p');
  price.className = 'store-product-price';
  price.textContent = formatPrice(product.price);

  const buyLink = document.createElement('a');
  buyLink.className = 'button button-primary store-buy-button';
  buyLink.href = product.url;
  buyLink.target = '_blank';
  buyLink.rel = 'noopener noreferrer';
  buyLink.textContent = '구매하기';
  buyLink.setAttribute('aria-label', `${product.name} 구매하기 (새 탭)`);

  body.append(meta, title, price, buyLink);
  article.append(imageWrap, body);
  return article;
};

const loadProducts = async () => {
  if (!productLists.length) return;

  try {
    const response = await fetch('products.json', { cache: 'no-cache' });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const products = await response.json();
    if (!Array.isArray(products) || !products.length) throw new Error('Empty product list');

    productLists.forEach((list) => {
      const limit = Number.parseInt(list.dataset.productLimit || '', 10);
      const visibleProducts = Number.isFinite(limit) ? products.slice(0, limit) : products;
      list.replaceChildren(...visibleProducts.map(createProductCard));
    });

    document.querySelectorAll('[data-product-count]').forEach((element) => {
      element.textContent = `총 ${products.length}개 제품`;
    });
  } catch (error) {
    productLists.forEach((list) => {
      const state = document.createElement('p');
      state.className = 'product-state product-state-error';
      state.textContent = '제품을 불러오지 못했습니다. 잠시 후 다시 확인해 주세요.';
      list.replaceChildren(state);
    });
  }
};

loadProducts();

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
