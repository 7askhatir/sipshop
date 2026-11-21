/* ============================================================
   SIP — Products / catalogue page
   ============================================================ */

const state = {
  categories: new Set(),
  sizes: new Set(),
  colors: new Set(),
  maxPrice: 200,
  search: '',
  sort: 'featured',
};

const MAX_PRICE = Math.max(...PRODUCTS.map((p) => p.price));

function catalogCardHTML(p) {
  const tag = p.isNew
    ? `<span class="product-tag new">New</span>`
    : p.isBestSeller
    ? `<span class="product-tag">Bestseller</span>`
    : '';
  return `
    <article class="product-card" data-id="${p.id}">
      <div class="product-media">
        ${tag}
        <button class="wish-btn" data-wish-id="${p.id}" aria-label="Add to wishlist" aria-pressed="false">${ICONS.heart}</button>
        <img class="primary" src="${p.images[0]}" alt="${p.name}" loading="lazy" />
        <img class="img-alt" src="${p.images[1] || p.images[0]}" alt="${p.name} alternate view" loading="lazy" />
        <button class="quick-add" data-quick="${p.id}">Quick Add</button>
      </div>
      <div class="product-info" data-open="${p.id}" style="cursor:pointer">
        <h3>${p.name}</h3>
        <div class="product-cat">${p.category}</div>
        <div class="product-row">
          <span class="product-price">${money(p.price)}</span>
          <div class="swatches">
            ${p.colors.slice(0, 4).map((c) => `<span class="swatch" style="background:${c.hex}" title="${c.name}"></span>`).join('')}
          </div>
        </div>
      </div>
    </article>`;
}

function buildFilters() {
  // Categories
  const catCounts = {};
  PRODUCTS.forEach((p) => (catCounts[p.category] = (catCounts[p.category] || 0) + 1));
  document.getElementById('categoryFilters').innerHTML = CATEGORIES.map(
    (c) => `<label class="checkbox">
      <input type="checkbox" data-filter="category" value="${c}" />
      <span class="box"></span><span>${c}</span><span class="count">${catCounts[c] || 0}</span>
    </label>`
  ).join('');

  // Sizes
  document.getElementById('sizeFilters').innerHTML = ALL_SIZES.map(
    (s) => `<button class="size-chip" data-filter="size" value="${s}">${s}</button>`
  ).join('');

  // Colours (unique)
  const colors = [];
  PRODUCTS.forEach((p) =>
    p.colors.forEach((c) => {
      if (!colors.find((x) => x.name === c.name)) colors.push(c);
    })
  );
  document.getElementById('colorFilters').innerHTML = colors
    .map(
      (c) => `<button class="color-chip" style="--c:${c.hex}" data-filter="color"
        value="${c.name}" aria-label="${c.name}" title="${c.name}"></button>`
    )
    .join('');
}

function filteredProducts() {
  let list = PRODUCTS.filter((p) => {
    if (state.categories.size && !state.categories.has(p.category)) return false;
    if (state.sizes.size && ![...state.sizes].some((s) => p.sizes.includes(s))) return false;
    if (state.colors.size && !p.colors.some((c) => state.colors.has(c.name))) return false;
    if (p.price > state.maxPrice) return false;
    if (state.search) {
      const hay = (p.name + ' ' + p.category + ' ' + p.description + ' ' + p.colors.map((c) => c.name).join(' ')).toLowerCase();
      if (!hay.includes(state.search.toLowerCase())) return false;
    }
    return true;
  });

  switch (state.sort) {
    case 'newest':
      list = list.slice().sort((a, b) => Number(b.isNew) - Number(a.isNew));
      break;
    case 'price-asc':
      list = list.slice().sort((a, b) => a.price - b.price);
      break;
    case 'price-desc':
      list = list.slice().sort((a, b) => b.price - a.price);
      break;
    case 'popularity':
      list = list.slice().sort((a, b) => b.popularity - a.popularity);
      break;
  }
  return list;
}

function render() {
  const list = filteredProducts();
  const grid = document.getElementById('catalogGrid');
  const noRes = document.getElementById('noResults');
  grid.innerHTML = list.map(catalogCardHTML).join('');
  noRes.style.display = list.length ? 'none' : 'block';
  document.getElementById('resultCount').textContent = `${list.length} product${list.length === 1 ? '' : 's'}`;

  // Wishlist
  grid.querySelectorAll('[data-wish-id]').forEach((btn) => {
    btn.classList.toggle('active', Wishlist.has(btn.dataset.wishId));
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const on = Wishlist.toggle(btn.dataset.wishId);
      btn.classList.toggle('active', on);
      showToast(on ? 'Saved to your wishlist.' : 'Removed from wishlist.');
    });
  });

  // Any card click opens the dedicated product details page
  grid.querySelectorAll('.product-card').forEach((card) => {
    card.addEventListener('click', (e) => {
      if (e.target.closest('.wish-btn')) return;
      window.location.href = `product.html?id=${card.dataset.id}`;
    });
  });
}

function resetFilters() {
  state.categories.clear();
  state.sizes.clear();
  state.colors.clear();
  state.maxPrice = MAX_PRICE;
  state.search = '';
  document.getElementById('catalogSearch').value = '';
  document.getElementById('priceRange').value = MAX_PRICE;
  document.getElementById('priceValue').textContent = money(MAX_PRICE);
  document.querySelectorAll('[data-filter]').forEach((el) => {
    if (el.type === 'checkbox') el.checked = false;
    el.classList.remove('active');
  });
  render();
}

document.addEventListener('DOMContentLoaded', () => {
  buildFilters();
  document.getElementById('priceRange').max = MAX_PRICE;
  document.getElementById('priceRange').value = MAX_PRICE;
  document.getElementById('priceValue').textContent = money(MAX_PRICE);

  // Category checkboxes
  document.querySelectorAll('[data-filter="category"]').forEach((input) => {
    input.addEventListener('change', () => {
      input.checked ? state.categories.add(input.value) : state.categories.delete(input.value);
      render();
    });
  });

  // Size chips
  document.querySelectorAll('[data-filter="size"]').forEach((btn) => {
    btn.addEventListener('click', () => {
      btn.classList.toggle('active');
      btn.classList.contains('active') ? state.sizes.add(btn.value) : state.sizes.delete(btn.value);
      render();
    });
  });

  // Colour chips
  document.querySelectorAll('[data-filter="color"]').forEach((btn) => {
    btn.addEventListener('click', () => {
      btn.classList.toggle('active');
      btn.classList.contains('active') ? state.colors.add(btn.value) : state.colors.delete(btn.value);
      render();
    });
  });

  // Price range
  document.getElementById('priceRange').addEventListener('input', (e) => {
    state.maxPrice = Number(e.target.value);
    document.getElementById('priceValue').textContent = money(state.maxPrice);
    render();
  });

  // Search
  document.getElementById('catalogSearch').addEventListener('input', (e) => {
    state.search = e.target.value.trim();
    render();
  });

  // Sort
  document.getElementById('sortSelect').addEventListener('change', (e) => {
    state.sort = e.target.value;
    render();
  });

  // Clear / reset
  document.getElementById('clearFilters').addEventListener('click', resetFilters);
  document.getElementById('resetBtn').addEventListener('click', resetFilters);

  // Mobile filter toggle
  document.getElementById('filterToggle').addEventListener('click', () => {
    document.getElementById('filters').classList.toggle('mobile-open');
  });

  // URL params
  const params = new URLSearchParams(window.location.search);
  const category = params.get('category');
  const search = params.get('search');
  const productId = params.get('product');
  if (category && CATEGORIES.includes(category)) state.categories.add(category);
  if (search) {
    state.search = search;
    document.getElementById('catalogSearch').value = search;
  }

  render();

  if (productId) {
    window.location.href = `product.html?id=${encodeURIComponent(productId)}`;
  }
});
