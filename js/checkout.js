/* ============================================================
   SIP — Cash on Delivery checkout
   ============================================================ */

(function () {
  const ORDER_KEY = 'sip_checkout_order';
  let order = null;

  const MOROCCAN_CITIES = [
    'Casablanca', 'Rabat', 'Marrakech', 'Fès', 'Tangier', 'Agadir', 'Meknès',
    'Oujda', 'Kénitra', 'Tétouan', 'Safi', 'El Jadida', 'Nador', 'Béni Mellal',
    'Taza', 'Settat', 'Larache', 'Khénifra', 'Errachidia', 'Mohammedia',
    'Salé', 'Temara', 'Ouazzane', 'Other',
  ];

  const esc = (s) =>
    String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  function loadOrder() {
    try {
      const saved = JSON.parse(sessionStorage.getItem(ORDER_KEY) || 'null');
      if (saved && Array.isArray(saved.items) && saved.items.length) return saved;
    } catch (e) {}
    const cart = CartStore.get();
    return cart.length ? { items: cart, source: 'cart' } : null;
  }

  function totals(items) {
    const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);
    const shipping = subtotal >= 100 ? 0 : 12;
    return { subtotal, shipping, total: subtotal + shipping };
  }

  function summaryHTML(items) {
    const t = totals(items);
    return `
      <aside class="co-summary">
        <h2>Order Summary <span>${items.reduce((s, i) => s + i.qty, 0)} items</span></h2>
        <div class="co-items">
          ${items
            .map(
              (i) => `<div class="co-item">
                <img src="${i.image}" alt="${esc(i.name)}" />
                <div class="co-item-info">
                  <h4>${esc(i.name)}</h4>
                  <p>${esc(i.color)} · Size ${esc(i.size)}</p>
                  <p>Qty: ${i.qty}</p>
                </div>
                <strong>${money(i.price * i.qty)}</strong>
              </div>`
            )
            .join('')}
        </div>
        <div class="co-totals">
          <div><span>Subtotal</span><span>${money(t.subtotal)}</span></div>
          <div><span>Shipping</span><span>${t.shipping === 0 ? 'FREE' : money(t.shipping)}</span></div>
          <div class="co-total"><span>Total</span><span>${money(t.total)}</span></div>
        </div>
        <div class="cod-summary-note">
          <span class="cod-icon">$</span>
          <div><strong>Cash on Delivery</strong><p>Pay in cash when your order arrives at your door.</p></div>
        </div>
      </aside>`;
  }

  function formHTML(items) {
    const t = totals(items);
    return `
      <div class="co-form-wrap">
        <h2>Delivery &amp; Payment</h2>
        <p class="co-intro">Please fill in your details to confirm your order. Delivery is available nationwide in Morocco.</p>
        <form id="checkoutForm" novalidate>
          <section class="co-section">
            <h3><span>01</span> Delivery Details</h3>
            <div class="field">
              <label for="coName">Full Name <em>*</em></label>
              <input type="text" id="coName" placeholder="Your full name" autocomplete="name" required />
              <small class="field-error" id="errName"></small>
            </div>
            <div class="field">
              <label for="coPhone">Moroccan Phone Number <em>*</em></label>
              <input type="tel" id="coPhone" placeholder="06 12 34 56 78 or +212 612 345 678" autocomplete="tel" required />
              <small class="field-error" id="errPhone"></small>
            </div>
            <div class="field">
              <label for="coCity">City <em>*</em></label>
              <select id="coCity" required>
                <option value="" disabled selected>Select your city</option>
                ${MOROCCAN_CITIES.map((c) => `<option value="${esc(c)}">${esc(c)}</option>`).join('')}
              </select>
              <small class="field-error" id="errCity"></small>
            </div>
            <div class="field">
              <label for="coAddress">Full Address <em>*</em></label>
              <textarea id="coAddress" placeholder="Street, building number, apartment, nearest landmark…" required></textarea>
              <small class="field-error" id="errAddress"></small>
            </div>
          </section>

          <section class="co-section">
            <h3><span>02</span> Payment Method</h3>
            <label class="cod-choice">
              <input type="radio" name="payment" checked readonly />
              <span class="cod-radio"></span>
              <span class="cod-choice-body">
                <strong>Cash on Delivery (COD)</strong>
                <small>Pay with cash directly to the courier when your order arrives. No card required.</small>
              </span>
              <span class="cod-badge">COD</span>
            </label>
          </section>

          <button type="submit" class="btn btn-dark btn-block co-confirm">Confirm Order — ${money(t.total)}</button>
          <p class="co-terms">By confirming, you agree to our Terms of Service and Privacy Policy.</p>
        </form>
      </div>`;
  }

  function renderEmpty() {
    document.getElementById('checkoutRoot').innerHTML = `
      <div class="no-results" style="padding:100px 20px">
        <h3>Nothing to check out</h3>
        <p>Your bag is empty. Add something you love first.</p>
        <a href="products.html" class="btn btn-dark">Shop the collection</a>
      </div>`;
  }

  function render() {
    document.getElementById('checkoutRoot').innerHTML = `
      <div class="co-layout">
        ${formHTML(order.items)}
        ${summaryHTML(order.items)}
      </div>`;
    bind();
  }

  function setError(id, message) {
    const el = document.getElementById(id);
    if (el) el.textContent = message;
  }

  function validateForm() {
    const name = document.getElementById('coName').value.trim();
    const phone = document.getElementById('coPhone').value.replace(/[\s()-]/g, '');
    const city = document.getElementById('coCity').value;
    const address = document.getElementById('coAddress').value.trim();
    let ok = true;

    setError('errName', '');
    setError('errPhone', '');
    setError('errCity', '');
    setError('errAddress', '');

    if (name.length < 2) { setError('errName', 'Please enter your full name.'); ok = false; }
    if (!/^(\+212|00212)[0-9]{9}$/.test(phone) && !/^0[0-9]{9}$/.test(phone)) {
      setError('errPhone', 'Enter a valid Moroccan number (e.g. 0612345678 or +212612345678).');
      ok = false;
    }
    if (!city) { setError('errCity', 'Please select your city.'); ok = false; }
    if (address.length < 5) { setError('errAddress', 'Please enter your full delivery address.'); ok = false; }

    return ok ? { name, phone, city, address } : null;
  }

  function renderSuccess(data, orderId) {
    const t = totals(order.items);
    document.getElementById('checkoutBreadcrumb').innerHTML = `<a href="index.html">Home</a><span>/</span><span>Order Confirmed</span>`;
    document.getElementById('checkoutRoot').innerHTML = `
      <div class="order-success">
        <div class="success-mark">✓</div>
        <span class="eyebrow">Order confirmed</span>
        <h2>Thank you, ${esc(data.name.split(' ')[0])}.</h2>
        <p>Your order <strong>${orderId}</strong> has been placed successfully. You'll pay with cash when it arrives.</p>
        <div class="success-grid">
          <div><span>Order number</span><strong>${orderId}</strong></div>
          <div><span>Payment</span><strong>Cash on Delivery</strong></div>
          <div><span>Total</span><strong>${money(t.total)}</strong></div>
          <div><span>Deliver to</span><strong>${esc(data.city)}, Morocco</strong></div>
          <div class="full"><span>Full address</span><strong>${esc(data.address)}</strong></div>
          <div class="full"><span>Phone</span><strong>${esc(data.phone)}</strong></div>
        </div>
        <div class="success-note">We'll contact you at ${esc(data.phone)} to confirm delivery details. Estimated delivery: 3–7 business days.</div>
        <a href="products.html" class="btn btn-dark">Continue Shopping</a>
      </div>`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function bind() {
    document.getElementById('checkoutForm').addEventListener('submit', (e) => {
      e.preventDefault();
      const data = validateForm();
      if (!data) {
        document.querySelector('.field-error:not(:empty)')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        return;
      }
      const orderId = 'SIP-' + Math.floor(100000 + Math.random() * 900000);
      sessionStorage.removeItem(ORDER_KEY);
      if (order.source === 'cart') CartStore.clear();
      localStorage.setItem('sip_last_order', JSON.stringify({ orderId, data, items: order.items }));
      renderSuccess(data, orderId);
      showToast('Order confirmed — Cash on Delivery.');
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    order = loadOrder();
    if (!order) renderEmpty();
    else render();
  });
})();
