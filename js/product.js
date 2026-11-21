/* ============================================================
   SIP — Dedicated product details page
   ============================================================ */

(function () {
  let product = null;
  let selectedColor = null;
  let selectedSize = null;
  let qty = 1;
  let activeImage = 0;

  function stockHTML(stock) {
    if (stock <= 5) {
      return `<span class="stock-dot low"></span> Low stock — only <strong>${stock}</strong> left`;
    }
    return `<span class="stock-dot"></span> In stock — ready to ship`;
  }

  function sizeChartHTML(chart) {
    return `<div class="size-chart-scroll">
      <table class="size-chart">
        <thead><tr><th>Size</th>${chart.columns.map((c) => `<th>${c}</th>`).join('')}</tr></thead>
        <tbody>
          ${chart.rows
            .map(
              (r) => `<tr><th>${r.label} (${chart.unit})</th>${r.values
                .map((v) => `<td>${v}</td>`)
                .join('')}</tr>`
            )
            .join('')}
        </tbody>
      </table>
    </div>`;
  }

  function renderNotFound() {
    document.getElementById('pdpBreadcrumb').innerHTML = '';
    document.getElementById('pdpRoot').innerHTML = `
      <div class="no-results" style="padding:120px 20px">
        <h3>Product not found</h3>
        <p>We couldn't find that piece. Explore the full collection instead.</p>
        <a href="products.html" class="btn btn-dark">Shop all products</a>
      </div>`;
  }

  function render() {
    const p = product;
    const gallery = p.gallery || p.images;
    document.title = `${p.name} / SIP — Unisex Studio`;
    document.getElementById('pdpBreadcrumb').innerHTML = `
      <a href="index.html">Home</a><span>/</span>
      <a href="products.html">Shop</a><span>/</span>
      <a href="products.html?category=${encodeURIComponent(p.category)}">${p.category}</a><span>/</span>
      <span>${p.name}</span>`;

    document.getElementById('pdpRoot').innerHTML = `
      <div class="pdp-layout">
        <div class="pdp-gallery">
          <div class="pdp-stage">
            <img id="pdpMainImg" src="${gallery[0]}" alt="${p.name}" />
            ${p.isNew ? '<span class="pdp-tag new">New Arrival</span>' : p.isBestSeller ? '<span class="pdp-tag">Bestseller</span>' : ''}
            <span class="pdp-img-count" id="pdpImgCount">1 / ${gallery.length}</span>
          </div>
          <div class="pdp-thumbs" id="pdpThumbs">
            ${gallery
              .map(
                (src, i) => `<button class="pdp-thumb ${i === 0 ? 'active' : ''}" data-img="${i}" aria-label="View image ${i + 1}">
                  <img src="${src}" alt="${p.name} view ${i + 1}" />
                </button>`
              )
              .join('')}
          </div>
        </div>

        <div class="pdp-info">
          <span class="eyebrow">${p.category} · Style ${p.sku}</span>
          <h1>${p.name}</h1>
          <div class="pdp-price">${money(p.price)}</div>
          <p class="pdp-desc">${p.description}</p>
          <div class="pdp-stock" id="pdpStock">${stockHTML(p.stock)}</div>

          <div class="option-block">
            <div class="option-label"><span>Colour</span><span id="pdpColorLabel">${selectedColor.name}</span></div>
            <div class="modal-colors">
              ${p.colors
                .map(
                  (c, i) => `<button class="color-chip ${i === 0 ? 'active' : ''}" style="--c:${c.hex}"
                    data-pcolor="${i}" aria-label="${c.name}" title="${c.name}"></button>`
                )
                .join('')}
            </div>
          </div>

          <div class="option-block">
            <div class="option-label"><span>Select Size <em>*</em></span>
              <button class="size-guide-link" id="pdpSizeGuide">Size guide</button>
            </div>
            <div class="modal-sizes ${p.sizes.length > 6 ? 'many' : ''}">
              ${p.sizes.map((s) => `<button class="size-chip" data-psize="${s}">${s}</button>`).join('')}
            </div>
            <p class="size-error" id="sizeError">Please select a size to continue.</p>
          </div>

          <div class="pdp-actions">
            <div class="qty">
              <button id="pdpQtyDec" aria-label="Decrease quantity">${ICONS.minus}</button>
              <span id="pdpQty">1</span>
              <button id="pdpQtyInc" aria-label="Increase quantity">${ICONS.plus}</button>
            </div>
            <button class="btn btn-dark" id="pdpAdd">Add to Cart</button>
            <button class="btn btn-outline" id="pdpBuy">Buy Now</button>
          </div>

          <button class="pdp-wish ${Wishlist.has(p.id) ? 'active' : ''}" id="pdpWish">
            ${ICONS.heart}<span>${Wishlist.has(p.id) ? 'Saved to wishlist' : 'Save to wishlist'}</span>
          </button>

          <div class="pdp-perks">
            <div><strong>Free shipping</strong><span>On orders over $100</span></div>
            <div><strong>30-day returns</strong><span>On unworn items</span></div>
            <div><strong>Secure checkout</strong><span>Cash on Delivery available</span></div>
          </div>

          <div class="detail-accordions">
            <div class="detail-acc">
              <button class="detail-acc-head" type="button">Product Details <i></i></button>
              <div class="detail-acc-body">
                <p class="detail-summary">${p.details}</p>
                <ul class="feature-list">${(p.features || []).map((f) => `<li>${f}</li>`).join('')}</ul>
                <p class="modal-model">${p.model || ''}</p>
              </div>
            </div>
            <div class="detail-acc" id="pdpSizeAccordion">
              <button class="detail-acc-head" type="button">Size Guide <i></i></button>
              <div class="detail-acc-body">
                ${sizeChartHTML(p.sizeChart || APPAREL_SIZE_CHART)}
                <p class="size-note">${(p.sizeChart || APPAREL_SIZE_CHART).note}</p>
              </div>
            </div>
            <div class="detail-acc">
              <button class="detail-acc-head" type="button">Care &amp; Delivery <i></i></button>
              <div class="detail-acc-body">
                <ul class="care-list">${(p.care || STANDARD_CARE).map((c) => `<li>${c}</li>`).join('')}</ul>
                <p class="delivery-note"><strong>Shipping &amp; returns:</strong> Free standard shipping on orders over $100. 30-day returns on unworn items in original condition. Cash on Delivery available nationwide.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section class="pdp-related">
        <div class="section-head">
          <div><span class="eyebrow">Complete the look</span><h2>You May Also Like</h2></div>
          <a href="products.html" class="text-link">View all
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
          </a>
        </div>
        <div class="product-grid" id="pdpRelated"></div>
      </section>
    `;

    // Related products
    const related = PRODUCTS.filter((x) => x.id !== p.id)
      .sort((a, b) => (a.category === p.category ? -1 : 0) - (b.category === p.category ? -1 : 0))
      .slice(0, 4);
    document.getElementById('pdpRelated').innerHTML = related
      .map(
        (r) => `<article class="product-card" data-related="${r.id}">
          <div class="product-media">
            <img class="primary" src="${r.images[0]}" alt="${r.name}" loading="lazy" />
            <img class="img-alt" src="${r.images[1]}" alt="${r.name} alternate" loading="lazy" />
          </div>
          <div class="product-info">
            <h3>${r.name}</h3><div class="product-cat">${r.category}</div>
            <div class="product-row"><span class="product-price">${money(r.price)}</span></div>
          </div>
        </article>`
      )
      .join('');

    bindEvents();
  }

  function validate() {
    if (!selectedSize) {
      document.getElementById('sizeError').classList.add('show');
      document.querySelector('[data-psize]')?.focus();
      document.querySelector('.pdp-actions').scrollIntoView({ behavior: 'smooth', block: 'center' });
      return false;
    }
    if (!selectedColor) {
      showToast('Please select a colour.');
      return false;
    }
    return true;
  }

  function orderItem() {
    return {
      key: `${product.id}|${selectedSize}|${selectedColor.name}`,
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      size: selectedSize,
      color: selectedColor.name,
      colorHex: selectedColor.hex,
      qty,
    };
  }

  function bindEvents() {
    const gallery = product.gallery || product.images;
    const stage = document.getElementById('pdpMainImg');

    document.querySelectorAll('[data-img]').forEach((btn) => {
      btn.addEventListener('click', () => {
        activeImage = Number(btn.dataset.img);
        stage.src = gallery[activeImage];
        document.getElementById('pdpImgCount').textContent = `${activeImage + 1} / ${gallery.length}`;
        document.querySelectorAll('[data-img]').forEach((b) => b.classList.toggle('active', b === btn));
      });
    });

    document.querySelectorAll('[data-pcolor]').forEach((btn) => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('[data-pcolor]').forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        selectedColor = product.colors[Number(btn.dataset.pcolor)];
        document.getElementById('pdpColorLabel').textContent = selectedColor.name;
      });
    });

    document.querySelectorAll('[data-psize]').forEach((btn) => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('[data-psize]').forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        selectedSize = btn.dataset.psize;
        document.getElementById('sizeError').classList.remove('show');
      });
    });

    document.getElementById('pdpQtyDec').addEventListener('click', () => {
      qty = Math.max(1, qty - 1);
      document.getElementById('pdpQty').textContent = qty;
    });
    document.getElementById('pdpQtyInc').addEventListener('click', () => {
      if (qty >= product.stock) {
        showToast(`Only ${product.stock} available.`);
        return;
      }
      qty += 1;
      document.getElementById('pdpQty').textContent = qty;
    });

    document.getElementById('pdpAdd').addEventListener('click', () => {
      if (!validate()) return;
      CartStore.add(product, selectedSize, selectedColor, qty);
      showToast(`${product.name} added to your bag.`);
      openCart();
    });

    document.getElementById('pdpBuy').addEventListener('click', () => {
      if (!validate()) return;
      sessionStorage.setItem(
        'sip_checkout_order',
        JSON.stringify({ items: [orderItem()], source: 'buy-now' })
      );
      window.location.href = 'checkout.html';
    });

    const wish = document.getElementById('pdpWish');
    wish.addEventListener('click', () => {
      const on = Wishlist.toggle(product.id);
      wish.classList.toggle('active', on);
      wish.querySelector('span').textContent = on ? 'Saved to wishlist' : 'Save to wishlist';
      showToast(on ? 'Saved to your wishlist.' : 'Removed from wishlist.');
    });

    document.querySelectorAll('.detail-acc-head').forEach((head) => {
      head.addEventListener('click', () => head.closest('.detail-acc').classList.toggle('open'));
    });
    document.getElementById('pdpSizeGuide').addEventListener('click', () => {
      const acc = document.getElementById('pdpSizeAccordion');
      acc.classList.add('open');
      acc.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });

    document.querySelectorAll('[data-related]').forEach((card) => {
      card.addEventListener('click', () => {
        window.location.href = `product.html?id=${card.dataset.related}`;
      });
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    const id = new URLSearchParams(window.location.search).get('id');
    product = PRODUCTS.find((p) => p.id === id);
    if (!product) {
      renderNotFound();
      return;
    }
    selectedColor = product.colors[0];
    selectedSize = null;
    qty = 1;
    activeImage = 0;
    render();
  });
})();
