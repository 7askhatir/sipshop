/* ============================================================
   SIP — Home page interactions
   ============================================================ */

function productCardHTML(p) {
  const tag = p.isNew
    ? `<span class="product-tag new">New</span>`
    : p.isBestSeller
    ? `<span class="product-tag">Bestseller</span>`
    : '';
  return `
    <article class="product-card" data-product-id="${p.id}">
      <div class="product-media">
        ${tag}
        <button class="wish-btn" data-wish-id="${p.id}" aria-label="Add to wishlist" aria-pressed="false">
          ${ICONS.heart}
        </button>
        <img class="primary" src="${p.images[0]}" alt="${p.name}" loading="lazy" />
        <img class="img-alt" src="${p.images[1] || p.images[0]}" alt="${p.name} alternate view" loading="lazy" />
        <button class="quick-add" data-quick="${p.id}">Quick Add</button>
      </div>
      <a href="product.html?id=${p.id}" class="product-info-link">
        <div class="product-info">
          <h3>${p.name}</h3>
          <div class="product-cat">${p.category}</div>
          <div class="product-row">
            <span class="product-price">${money(p.price)}</span>
            <div class="swatches">
              ${p.colors
                .slice(0, 4)
                .map((c) => `<span class="swatch" style="background:${c.hex}" title="${c.name}"></span>`)
                .join('')}
            </div>
          </div>
        </div>
      </a>
    </article>`;
}

document.addEventListener('DOMContentLoaded', () => {
  // Marquee
  const track = document.getElementById('marqueeTrack');
  if (track) {
    const words = ['NO RULES', 'NO GENDER', 'JUST STYLE', 'MADE FOR ALL', 'UNISEX ESSENTIALS'];
    const unit = words.map((w) => `<span>${w} <i>✳</i></span>`).join('');
    track.innerHTML = unit + unit;
  }

  // Product rails
  const newArrivals = document.getElementById('newArrivals');
  if (newArrivals) {
    newArrivals.innerHTML = PRODUCTS.filter((p) => p.isNew)
      .slice(0, 4)
      .map(productCardHTML)
      .join('');
  }
  const best = document.getElementById('bestSellers');
  if (best) {
    best.innerHTML = PRODUCTS.filter((p) => p.isBestSeller)
      .slice(0, 4)
      .map(productCardHTML)
      .join('');
  }

  // Gallery
  const gallery = document.getElementById('galleryGrid');
  if (gallery) {
    gallery.innerHTML = CAMPAIGN.map(
      (c) => `<figure class="gallery-item"><img src="${c.src}" alt="${c.alt}" loading="lazy" /></figure>`
    ).join('');
  }

  // Wishlist hearts
  document.querySelectorAll('[data-wish-id]').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const on = Wishlist.toggle(btn.dataset.wishId);
      btn.classList.toggle('active', on);
      btn.setAttribute('aria-pressed', String(on));
      showToast(on ? 'Saved to your wishlist.' : 'Removed from wishlist.');
    });
  });

  // Any card click opens the dedicated product details page
  document.querySelectorAll('.product-card').forEach((card) => {
    card.addEventListener('click', (e) => {
      if (e.target.closest('.wish-btn')) return;
      window.location.href = `product.html?id=${card.dataset.productId}`;
    });
  });

  Wishlist.updateHearts();
});
