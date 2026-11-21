/* ============================================================
   SIP — Shared product detail modal
   ============================================================ */

(function () {
  let overlay, modal, galleryEl, detailEl;
  let activeProduct = null;
  let selectedSize = null;
  let selectedColor = null;
  let selectedQty = 1;

  function build() {
    if (document.getElementById('productModal')) return;

    overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    overlay.id = 'modalOverlay';
    overlay.addEventListener('click', closeProductModal);
    document.body.appendChild(overlay);

    modal = document.createElement('div');
    modal.className = 'product-modal';
    modal.id = 'productModal';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.setAttribute('aria-label', 'Product details');
    modal.innerHTML = `
      <button class="modal-close" id="modalClose" aria-label="Close">${ICONS.close}</button>
      <div class="modal-gallery" id="modalGallery"></div>
      <div class="modal-detail" id="modalDetail"></div>
    `;
    document.body.appendChild(modal);

    document.getElementById('modalClose').addEventListener('click', closeProductModal);
    galleryEl = document.getElementById('modalGallery');
    detailEl = document.getElementById('modalDetail');
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

  function renderDetail() {
    const p = activeProduct;
    detailEl.innerHTML = `
      <span class="eyebrow">${p.category}${p.isNew ? ' · New Arrival' : p.isBestSeller ? ' · Bestseller' : ''}</span>
      <h2>${p.name}</h2>
      <div class="modal-price">${money(p.price)}</div>
      <p class="modal-desc">${p.description}</p>

      <div class="option-block">
        <div class="option-label"><span>Colour</span><span id="colorLabel">${selectedColor.name}</span></div>
        <div class="modal-colors">
          ${p.colors
            .map(
              (c, i) => `<button class="color-chip ${i === 0 ? 'active' : ''}" style="--c:${c.hex}"
                data-color="${i}" aria-label="${c.name}" title="${c.name}"></button>`
            )
            .join('')}
        </div>
      </div>

      <div class="option-block">
        <div class="option-label"><span>Select Size</span>
          <button class="size-guide-link" id="sizeGuideBtn">Size guide</button>
        </div>
        <div class="modal-sizes ${p.sizes.length > 6 ? 'many' : ''}">
          ${(p.sizes || ALL_SIZES).map(
            (s) => `<button class="size-chip" data-size="${s}">${s}</button>`
          ).join('')}
        </div>
      </div>

      <div class="purchase-row">
        <div class="qty">
          <button data-q="dec" aria-label="Decrease">${ICONS.minus}</button>
          <span id="modalQty">1</span>
          <button data-q="inc" aria-label="Increase">${ICONS.plus}</button>
        </div>
        <button class="btn btn-dark" id="addToCartBtn">Add to Bag — ${money(p.price)}</button>
        <button class="modal-wish" data-wish-id="${p.id}" aria-label="Wishlist">${ICONS.heart}</button>
      </div>

      <div class="modal-spec-strip">
        <div><span>Style No.</span><strong>${p.sku || '—'}</strong></div>
        <div><span>Fabric</span><strong>${p.fabric || '—'}</strong></div>
        <div><span>Fit</span><strong>${p.fit || '—'}</strong></div>
        <div><span>Origin</span><strong>${p.origin || '—'}</strong></div>
      </div>

      ${p.model ? `<p class="modal-model">${p.model}</p>` : ''}

      <div class="detail-accordions">
        <div class="detail-acc">
          <button class="detail-acc-head" type="button">Product Details <i></i></button>
          <div class="detail-acc-body">
            <p class="detail-summary">${p.details}</p>
            <ul class="feature-list">
              ${(p.features || []).map((f) => `<li>${f}</li>`).join('')}
            </ul>
          </div>
        </div>
        <div class="detail-acc" id="sizeAccordion">
          <button class="detail-acc-head" type="button">Size Guide <i></i></button>
          <div class="detail-acc-body">
            ${sizeChartHTML(p.sizeChart || APPAREL_SIZE_CHART)}
            <p class="size-note">${(p.sizeChart || APPAREL_SIZE_CHART).note}</p>
          </div>
        </div>
        <div class="detail-acc">
          <button class="detail-acc-head" type="button">Care &amp; Delivery <i></i></button>
          <div class="detail-acc-body">
            <ul class="care-list">
              ${(p.care || STANDARD_CARE).map((c) => `<li>${c}</li>`).join('')}
            </ul>
            <p class="delivery-note"><strong>Shipping &amp; returns:</strong> Free standard shipping on orders over $100. 30-day returns on unworn items in original condition.</p>
          </div>
        </div>
      </div>
    `;

    // Colour selection
    detailEl.querySelectorAll('[data-color]').forEach((btn) => {
      btn.addEventListener('click', () => {
        detailEl.querySelectorAll('[data-color]').forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        selectedColor = p.colors[Number(btn.dataset.color)];
        document.getElementById('colorLabel').textContent = selectedColor.name;
      });
    });

    // Size selection
    detailEl.querySelectorAll('[data-size]').forEach((btn) => {
      btn.addEventListener('click', () => {
        detailEl.querySelectorAll('[data-size]').forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        selectedSize = btn.dataset.size;
      });
    });

    // Quantity
    detailEl.querySelectorAll('[data-q]').forEach((btn) => {
      btn.addEventListener('click', () => {
        selectedQty = Math.max(1, selectedQty + (btn.dataset.q === 'inc' ? 1 : -1));
        document.getElementById('modalQty').textContent = selectedQty;
      });
    });

    document.querySelectorAll('.detail-acc-head').forEach((head) => {
      head.addEventListener('click', () => {
        head.closest('.detail-acc').classList.toggle('open');
      });
    });

    document.getElementById('sizeGuideBtn').addEventListener('click', () => {
      const acc = document.getElementById('sizeAccordion');
      acc.classList.add('open');
      acc.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });

    document.getElementById('addToCartBtn').addEventListener('click', () => {
      if (!selectedSize) {
        showToast('Please select a size first.');
        return;
      }
      CartStore.add(p, selectedSize, selectedColor, selectedQty);
      closeProductModal();
      showToast(`${p.name} added to your bag.`);
      openCart();
    });

    const wish = detailEl.querySelector('.modal-wish');
    wish.classList.toggle('active', Wishlist.has(p.id));
    wish.addEventListener('click', () => {
      const on = Wishlist.toggle(p.id);
      wish.classList.toggle('active', on);
      showToast(on ? 'Saved to your wishlist.' : 'Removed from wishlist.');
    });
  }

  window.openProductModal = function (product) {
    build();
    activeProduct = product;
    selectedSize = null;
    selectedColor = product.colors[0];
    selectedQty = 1;

    galleryEl.innerHTML = product.images
      .map((src) => `<img src="${src}" alt="${product.name}" />`)
      .join('');
    detailEl.scrollTop = 0;
    renderDetail();

    overlay.classList.add('open');
    modal.classList.add('open');
    document.body.classList.add('no-scroll');
  };

  window.closeProductModal = function () {
    overlay?.classList.remove('open');
    modal?.classList.remove('open');
    document.body.classList.remove('no-scroll');
  };
})();
