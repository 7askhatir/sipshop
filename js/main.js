/* ============================================================
   SIP — Shared site chrome (header, footer, cart, search)
   ============================================================ */

const ICONS = {
  bag: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>`,
  search: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>`,
  close: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg>`,
  menu: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M3 6h18M3 12h18M3 18h18"/></svg>`,
  arrow: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>`,
  heart: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0 0-7.8Z"/></svg>`,
  plus: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg>`,
  minus: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M5 12h14"/></svg>`,
  instagram: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>`,
  twitter: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.9 2H22l-6.8 7.8L23.2 22h-6.3l-4.9-6.4L6.3 22H3.2l7.3-8.4L2.6 2h6.5l4.4 5.9L18.9 2Zm-1.1 18h1.7L7.6 3.9H5.8L17.8 20Z"/></svg>`,
  tiktok: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M16.5 2c.3 2.2 1.6 3.7 3.9 3.9v2.6c-1.5.1-2.8-.4-4-1.2v6.9c0 4.1-3.1 6.8-7 6.8-3.7 0-6.4-2.6-6.4-6.2 0-3.7 2.9-6.3 6.7-6.3.4 0 .8 0 1.2.1v2.8c-.4-.1-.8-.2-1.2-.2-2.2 0-3.8 1.5-3.8 3.6 0 2 1.5 3.5 3.6 3.5 2.3 0 3.9-1.6 3.9-4V2h3.1Z"/></svg>`,
  pinterest: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 0 0-3.6 19.3c-.1-.8-.2-2 0-2.9l1.2-5s-.3-.6-.3-1.5c0-1.4.8-2.4 1.8-2.4.9 0 1.3.6 1.3 1.4 0 .8-.5 2.1-.8 3.3-.2 1 .5 1.8 1.4 1.8 1.7 0 3-1.8 3-4.4 0-2.3-1.6-3.9-4-3.9-2.7 0-4.4 2-4.4 4.2 0 .8.3 1.7.7 2.2.1.1.1.2.1.3l-.3 1.1c0 .2-.2.2-.4.1-1.4-.7-2.3-2.7-2.3-4.4 0-3.6 2.6-6.9 7.5-6.9 3.9 0 6.9 2.8 6.9 6.5 0 3.9-2.4 7-5.8 7-1.1 0-2.2-.6-2.5-1.3l-.7 2.6c-.2 1-.9 2.2-1.4 3A10 10 0 1 0 12 2Z"/></svg>`,
};

function renderHeader() {
  const mount = document.getElementById('app-header');
  if (!mount) return;
  mount.innerHTML = `
    <div class="announcement">FREE SHIPPING ON ORDERS OVER $100 <span class="announcement-dot"></span> NEW SEASON DROP AVAILABLE NOW</div>
    <header class="site-header" id="siteHeader">
      <div class="nav-wrap">
        <a href="index.html" class="logo" aria-label="SIP home">
          <span class="logo-mark">SIP<span class="logo-slash">/</span></span>
          <span class="logo-sub">UNISEX STUDIO</span>
        </a>
        <nav class="main-nav" aria-label="Main navigation">
          <a href="index.html" data-nav="home">Home</a>
          <a href="products.html" data-nav="shop">Shop</a>
          <a href="contact.html" data-nav="contact">Contact</a>
        </nav>
        <div class="nav-actions">
          <button class="icon-btn" id="searchToggle" aria-label="Search">${ICONS.search}</button>
          <button class="icon-btn cart-toggle" id="cartToggle" aria-label="Open cart">
            ${ICONS.bag}<span class="cart-badge" data-cart-count>0</span>
          </button>
          <button class="icon-btn menu-toggle" id="menuToggle" aria-label="Open menu">${ICONS.menu}</button>
        </div>
      </div>
    </header>
    <div class="mobile-menu" id="mobileMenu">
      <button class="icon-btn mobile-menu-close" id="mobileMenuClose" aria-label="Close menu">${ICONS.close}</button>
      <nav>
        <a href="index.html">Home <span>01</span></a>
        <a href="products.html">Shop <span>02</span></a>
        <a href="contact.html">Contact <span>03</span></a>
      </nav>
      <p class="mobile-menu-foot">NO RULES. NO GENDER. JUST STYLE.</p>
    </div>
  `;

  const header = document.getElementById('siteHeader');
  const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 40);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Highlight active nav link
  const page = document.body.dataset.page || '';
  document.querySelectorAll('[data-nav]').forEach((a) => {
    if (a.dataset.nav === page) a.classList.add('active');
  });

  document.getElementById('cartToggle').addEventListener('click', openCart);
  document.getElementById('searchToggle').addEventListener('click', openSearch);
  document.getElementById('menuToggle').addEventListener('click', () => {
    document.getElementById('mobileMenu').classList.add('open');
    document.body.classList.add('no-scroll');
  });
  document.getElementById('mobileMenuClose').addEventListener('click', closeMenu);
  document.querySelectorAll('#mobileMenu nav a').forEach((a) =>
    a.addEventListener('click', closeMenu)
  );
}

function closeMenu() {
  document.getElementById('mobileMenu')?.classList.remove('open');
  document.body.classList.remove('no-scroll');
}

function renderFooter() {
  const mount = document.getElementById('app-footer');
  if (!mount) return;
  mount.innerHTML = `
    <footer class="site-footer">
      <div class="footer-top">
        <div class="footer-brand">
          <a href="index.html" class="logo footer-logo">
            <span class="logo-mark">SIP<span class="logo-slash">/</span></span>
            <span class="logo-sub">UNISEX STUDIO</span>
          </a>
          <p>Clothing without labels. Designed for everyone, made to be lived in.</p>
          <div class="socials">
            <a href="#" aria-label="Instagram">${ICONS.instagram}</a>
            <a href="#" aria-label="TikTok">${ICONS.tiktok}</a>
            <a href="#" aria-label="Twitter">${ICONS.twitter}</a>
            <a href="#" aria-label="Pinterest">${ICONS.pinterest}</a>
          </div>
        </div>
        <div class="footer-col">
          <h4>Shop</h4>
          <a href="products.html">All Products</a>
          <a href="products.html?category=T-Shirts">T-Shirts</a>
          <a href="products.html?category=Hoodies">Hoodies</a>
          <a href="products.html?category=Jackets">Jackets</a>
          <a href="products.html?category=Accessories">Accessories</a>
        </div>
        <div class="footer-col">
          <h4>Support</h4>
          <a href="contact.html">Contact Us</a>
          <a href="contact.html">Shipping &amp; Returns</a>
          <a href="contact.html">Size Guide</a>
          <a href="contact.html">FAQ</a>
          <a href="contact.html">Care Instructions</a>
        </div>
        <div class="footer-col footer-contact">
          <h4>Get in touch</h4>
          <a href="mailto:hello@sip.studio">hello@sip.studio</a>
          <a href="tel:+15550142980">+1 (555) 014-2980</a>
          <p>Studio 04, 128 Mercer Street<br/>New York, NY 10012</p>
          <p class="footer-hours">Mon–Fri: 9am – 6pm EST</p>
        </div>
      </div>
      <div class="footer-bottom">
        <p>© <span id="year"></span> SIP Studio. All rights reserved.</p>
        <div class="footer-legal">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
          <a href="#">Cookies</a>
        </div>
        <p class="footer-note">Designed for everyone.</p>
      </div>
    </footer>
  `;
  document.getElementById('year').textContent = new Date().getFullYear();
}

function renderCartDrawer() {
  const overlay = document.createElement('div');
  overlay.className = 'overlay';
  overlay.id = 'cartOverlay';
  overlay.addEventListener('click', closeCart);
  document.body.appendChild(overlay);

  const drawer = document.createElement('aside');
  drawer.className = 'cart-drawer';
  drawer.id = 'cartDrawer';
  drawer.setAttribute('aria-label', 'Shopping cart');
  drawer.innerHTML = `
    <div class="drawer-head">
      <div><h2>Your Bag <span id="drawerCount">(0)</span></h2></div>
      <button class="icon-btn" id="cartClose" aria-label="Close cart">${ICONS.close}</button>
    </div>
    <div class="drawer-body" id="drawerBody"></div>
    <div class="drawer-foot" id="drawerFoot"></div>
  `;
  document.body.appendChild(drawer);
  document.getElementById('cartClose').addEventListener('click', closeCart);

  window.addEventListener('cart:updated', renderCart);
  renderCart();
}

function renderCart() {
  const cart = CartStore.get();
  const body = document.getElementById('drawerBody');
  const foot = document.getElementById('drawerFoot');
  if (!body || !foot) return;

  document.getElementById('drawerCount').textContent = `(${CartStore.count()})`;

  if (cart.length === 0) {
    body.innerHTML = `
      <div class="cart-empty">
        <div class="cart-empty-icon">${ICONS.bag}</div>
        <h3>Your bag is empty</h3>
        <p>Good things start here. Explore the collection and find your next favourite.</p>
        <a href="products.html" class="btn btn-dark" id="emptyShopBtn">Shop the collection ${ICONS.arrow}</a>
      </div>`;
    foot.innerHTML = '';
    document.getElementById('emptyShopBtn')?.addEventListener('click', closeCart);
    return;
  }

  body.innerHTML = cart
    .map(
      (item) => `
      <div class="cart-line">
        <img src="${item.image}" alt="${item.name}" />
        <div class="cart-line-info">
          <div class="cart-line-top">
            <h4>${item.name}</h4>
            <button class="remove-line" data-remove="${item.key}" aria-label="Remove">${ICONS.close}</button>
          </div>
          <p class="cart-meta">${item.color} · Size ${item.size}</p>
          <div class="cart-line-bottom">
            <div class="qty small">
              <button data-qty="dec" data-key="${item.key}" aria-label="Decrease">${ICONS.minus}</button>
              <span>${item.qty}</span>
              <button data-qty="inc" data-key="${item.key}" aria-label="Increase">${ICONS.plus}</button>
            </div>
            <strong>${money(item.price * item.qty)}</strong>
          </div>
        </div>
      </div>`
    )
    .join('');

  const subtotal = CartStore.subtotal();
  const shipping = subtotal >= 100 ? 0 : 12;
  foot.innerHTML = `
    <div class="cart-summary-row"><span>Subtotal</span><span>${money(subtotal)}</span></div>
    <div class="cart-summary-row"><span>Shipping</span><span>${shipping === 0 ? 'FREE' : money(shipping)}</span></div>
    ${shipping > 0 ? `<p class="ship-note">Add ${money(100 - subtotal)} more for free shipping.</p>` : ''}
    <div class="cart-summary-row total"><span>Total</span><span>${money(subtotal + shipping)}</span></div>
    <button class="btn btn-dark btn-block" id="checkoutBtn">Checkout ${ICONS.arrow}</button>
    <button class="btn btn-ghost btn-block" id="continueBtn">Continue shopping</button>
  `;

  body.querySelectorAll('[data-remove]').forEach((b) =>
    b.addEventListener('click', () => CartStore.remove(b.dataset.remove))
  );
  body.querySelectorAll('[data-qty]').forEach((b) =>
    b.addEventListener('click', () => {
      const line = CartStore.get().find((i) => i.key === b.dataset.key);
      if (!line) return;
      CartStore.updateQty(b.dataset.key, line.qty + (b.dataset.qty === 'inc' ? 1 : -1));
    })
  );
  document.getElementById('checkoutBtn').addEventListener('click', () => {
    const items = CartStore.get();
    if (!items.length) {
      showToast('Your bag is empty.');
      return;
    }
    sessionStorage.setItem('sip_checkout_order', JSON.stringify({ items, source: 'cart' }));
    closeCart();
    window.location.href = 'checkout.html';
  });
  document.getElementById('continueBtn').addEventListener('click', closeCart);
}

function openCart() {
  document.getElementById('cartOverlay')?.classList.add('show');
  document.getElementById('cartDrawer')?.classList.add('open');
  document.body.classList.add('no-scroll');
}
function closeCart() {
  document.getElementById('cartOverlay')?.classList.remove('show');
  document.getElementById('cartDrawer')?.classList.remove('open');
  document.body.classList.remove('no-scroll');
}

function renderSearch() {
  const overlay = document.createElement('div');
  overlay.className = 'search-overlay';
  overlay.id = 'searchOverlay';
  overlay.innerHTML = `
    <div class="search-inner">
      <button class="icon-btn search-close" id="searchClose" aria-label="Close search">${ICONS.close}</button>
      <form class="search-form" id="searchForm">
        <label for="searchInput">What are you looking for?</label>
        <div class="search-field">
          <input type="text" id="searchInput" placeholder="Search products…" autocomplete="off" />
          <button type="submit" aria-label="Submit search">${ICONS.arrow}</button>
        </div>
      </form>
      <div class="search-results" id="searchResults"></div>
      <p class="search-hint">Try “hoodie”, “jacket” or “tee”</p>
    </div>
  `;
  document.body.appendChild(overlay);
  document.getElementById('searchClose').addEventListener('click', closeSearch);
  const input = document.getElementById('searchInput');
  input.addEventListener('input', () => renderSearchResults(input.value.trim()));
  document.getElementById('searchForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const q = encodeURIComponent(input.value.trim());
    if (q) window.location.href = `products.html?search=${q}`;
  });
}

function renderSearchResults(q) {
  const mount = document.getElementById('searchResults');
  if (!mount) return;
  if (!q) {
    mount.innerHTML = '';
    return;
  }
  const results = PRODUCTS.filter((p) =>
    (p.name + ' ' + p.category).toLowerCase().includes(q.toLowerCase())
  ).slice(0, 5);
  mount.innerHTML = results.length
    ? results
        .map(
          (p) => `<a class="search-item" href="product.html?id=${p.id}">
            <img src="${p.images[0]}" alt="${p.name}" />
            <span><strong>${p.name}</strong><small>${p.category}</small></span>
            <em>${money(p.price)}</em>
          </a>`
        )
        .join('')
    : `<p class="search-none">No matches. Press enter to search the full catalogue.</p>`;
}

function openSearch() {
  document.getElementById('searchOverlay')?.classList.add('open');
  document.body.classList.add('no-scroll');
  setTimeout(() => document.getElementById('searchInput')?.focus(), 60);
}
function closeSearch() {
  document.getElementById('searchOverlay')?.classList.remove('open');
  document.body.classList.remove('no-scroll');
}

/* Scroll reveal */
function initReveal() {
  const els = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window) || !els.length) {
    els.forEach((e) => e.classList.add('visible'));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );
  els.forEach((e) => io.observe(e));
}

/* Newsletter form (shared) */
function initNewsletter() {
  document.querySelectorAll('[data-newsletter]').forEach((form) => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = form.querySelector('input[type="email"]');
      if (!input.value.trim()) return;
      showToast('You’re on the list. Welcome to SIP.');
      input.value = '';
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  renderHeader();
  renderFooter();
  renderCartDrawer();
  renderSearch();
  initReveal();
  initNewsletter();
  CartStore.updateBadge();
  Wishlist.updateHearts();

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeCart();
      closeSearch();
      closeMenu();
      if (window.closeProductModal) window.closeProductModal();
      else document.body.classList.remove('no-scroll');
    }
  });
});
