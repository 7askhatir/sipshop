/* ============================================================
   SIP — Cart store (localStorage backed)
   ============================================================ */

const CartStore = {
  KEY: 'sip_cart_v1',

  get() {
    try {
      return JSON.parse(localStorage.getItem(this.KEY) || '[]');
    } catch (e) {
      return [];
    }
  },

  save(cart) {
    localStorage.setItem(this.KEY, JSON.stringify(cart));
    this.updateBadge();
    window.dispatchEvent(new CustomEvent('cart:updated', { detail: cart }));
  },

  add(product, size, color, qty = 1) {
    const cart = this.get();
    const key = `${product.id}|${size}|${color.name}`;
    const line = cart.find((i) => i.key === key);
    if (line) {
      line.qty += qty;
    } else {
      cart.push({
        key,
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images[0],
        size,
        color: color.name,
        colorHex: color.hex,
        qty,
      });
    }
    this.save(cart);
    return cart;
  },

  updateQty(key, qty) {
    const cart = this.get();
    const line = cart.find((i) => i.key === key);
    if (!line) return;
    if (qty <= 0) {
      this.remove(key);
      return;
    }
    line.qty = qty;
    this.save(cart);
  },

  remove(key) {
    this.save(this.get().filter((i) => i.key !== key));
  },

  clear() {
    this.save([]);
  },

  count() {
    return this.get().reduce((sum, i) => sum + i.qty, 0);
  },

  subtotal() {
    return this.get().reduce((sum, i) => sum + i.price * i.qty, 0);
  },

  updateBadge() {
    document.querySelectorAll('[data-cart-count]').forEach((el) => {
      const n = this.count();
      el.textContent = n;
      el.classList.toggle('is-visible', n > 0);
    });
  },
};

/* Shared helpers available to every page */
function showToast(message) {
  let toast = document.getElementById('toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast';
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => toast.classList.remove('show'), 3000);
}

function money(value) {
  return '$' + value.toFixed(2);
}

/* Wishlist (saved to localStorage) */
const Wishlist = {
  KEY: 'sip_wishlist_v1',
  get() {
    try {
      return JSON.parse(localStorage.getItem(this.KEY) || '[]');
    } catch (e) {
      return [];
    }
  },
  toggle(id) {
    const list = this.get();
    const idx = list.indexOf(id);
    if (idx === -1) list.push(id);
    else list.splice(idx, 1);
    localStorage.setItem(this.KEY, JSON.stringify(list));
    window.dispatchEvent(new CustomEvent('wishlist:updated', { detail: list }));
    return list.includes(id);
  },
  has(id) {
    return this.get().includes(id);
  },
  updateHearts() {
    document.querySelectorAll('[data-wish-id]').forEach((btn) => {
      const active = this.has(btn.dataset.wishId);
      btn.classList.toggle('active', active);
      btn.setAttribute('aria-pressed', String(active));
    });
  },
};
