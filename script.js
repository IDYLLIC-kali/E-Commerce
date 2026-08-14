/* =============================================
   IGNITEPULSE – MAIN SCRIPT
   All prices in Kenyan Shillings (KES/Ksh)
   ============================================= */

'use strict';

// ── Data ─────────────────────────────────────

const PRODUCTS = [
  { id: 1,  name: 'Premium Wireless Headphones', cat: 'electronics', price: 44999, oldPrice: 59999, rating: 4.7, reviews: 1247, badge: 'sale', img: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80' },
  { id: 2,  name: 'Designer Leather Jacket',     cat: 'fashion',     price: 67499, oldPrice: null,   rating: 4.5, reviews: 892,  badge: 'new',  img: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&q=80' },
  { id: 3,  name: 'Modern Accent Chair',         cat: 'home',        price: 89999, oldPrice: 112499, rating: 4.6, reviews: 543,  badge: 'sale', img: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&q=80' },
  { id: 4,  name: 'Smart Watch Pro',             cat: 'electronics', price: 52499, oldPrice: null,   rating: 4.8, reviews: 1089, badge: 'new',  img: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80' },
  { id: 5,  name: 'Slim Fit Chino Trousers',     cat: 'fashion',     price: 13499, oldPrice: 19499, rating: 4.3, reviews: 678,  badge: null,   img: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=400&q=80' },
  { id: 6,  name: 'Portable Bluetooth Speaker',  cat: 'electronics', price: 19499, oldPrice: 26999, rating: 4.6, reviews: 2103, badge: 'hot',  img: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&q=80' },
  { id: 7,  name: 'Minimalist Wall Clock',       cat: 'home',        price: 8999,  oldPrice: null,   rating: 4.4, reviews: 389,  badge: 'new',  img: 'https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?w=400&q=80' },
  { id: 8,  name: 'Classic Oxford Shirt',        cat: 'fashion',     price: 11999, oldPrice: 14999,  rating: 4.5, reviews: 512,  badge: 'sale', img: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=400&q=80' },
];

const DEALS = [
  { id: 10, name: 'Compact Pocket Power Bank',     cat: 'Electronics', price: 2700,  oldPrice: 3150, save: 450, img: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=400&q=80' },
  { id: 11, name: 'Keyboard & Mouse Combo',         cat: 'Electronics', price: 1800,  oldPrice: 2100, save: 300, img: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&q=80' },
  { id: 12, name: 'Open-Ear Wireless Earbuds',      cat: 'Audio',       price: 6750,  oldPrice: 7350, save: 600, img: 'https://images.unsplash.com/photo-1572536147248-ac59a8abfa4b?w=400&q=80' },
  { id: 13, name: 'Portable Outdoor Speaker',       cat: 'Audio',       price: 2550,  oldPrice: 3150, save: 600, img: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&q=80' },
];

const TRENDING = [
  { id: 20, name: 'MacBook Air M3',           price: 194999, img: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&q=80' },
  { id: 21, name: 'Sony WH-1000XM5',          price: 49499,  img: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80' },
  { id: 22, name: 'iPhone 15 Pro Case',       price: 5999,   img: 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=400&q=80' },
  { id: 23, name: 'Linen Throw Pillow Set',   price: 7499,   img: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=400&q=80' },
  { id: 24, name: 'Running Sneakers',         price: 22499,  img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80' },
];

// ── State ─────────────────────────────────────
let cart = JSON.parse(localStorage.getItem('ip_cart') || '[]');
let currentFilter = 'all';
let currentSlide = 0;
let slideInterval;

// ── Utility ───────────────────────────────────
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];
const fmt = (n) => 'Ksh ' + Number(n).toLocaleString('en-KE', {
  minimumFractionDigits: 0,
  maximumFractionDigits: 0
});

function showToast(msg) {
  const toast = $('#toast');
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2800);
}

function saveCart() {
  localStorage.setItem('ip_cart', JSON.stringify(cart));
}

// ── Dark Mode ─────────────────────────────────
const darkToggle = $('#darkToggle');
const darkIcon = $('#darkIcon');
let darkMode = localStorage.getItem('ip_dark') === '1';

function applyTheme() {
  document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : '');
  darkIcon.className = darkMode ? 'fa fa-sun' : 'fa fa-moon';
}
applyTheme();
darkToggle.addEventListener('click', () => {
  darkMode = !darkMode;
  localStorage.setItem('ip_dark', darkMode ? '1' : '0');
  applyTheme();
});

// ── Navbar Scroll ─────────────────────────────
window.addEventListener('scroll', () => {
  $('#navbar').classList.toggle('scrolled', window.scrollY > 40);
  $('#backToTop').classList.toggle('visible', window.scrollY > 400);
});

// ── Hamburger ─────────────────────────────────
$('#hamburger').addEventListener('click', () => {
  $('#navLinks').classList.toggle('open');
});

// ── Back to Top ───────────────────────────────
$('#backToTop').addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// ── Hero Slider ───────────────────────────────
const slides = $$('.hero-slide');
const dots = $$('.hero-dot');

function goToSlide(n) {
  slides[currentSlide].classList.remove('active');
  dots[currentSlide].classList.remove('active');
  currentSlide = (n + slides.length) % slides.length;
  slides[currentSlide].classList.add('active');
  dots[currentSlide].classList.add('active');
}
function startSlider() {
  clearInterval(slideInterval);
  slideInterval = setInterval(() => goToSlide(currentSlide + 1), 5000);
}
$('.hero-next').addEventListener('click', () => { goToSlide(currentSlide + 1); startSlider(); });
$('.hero-prev').addEventListener('click', () => { goToSlide(currentSlide - 1); startSlider(); });
dots.forEach(dot => dot.addEventListener('click', () => { goToSlide(+dot.dataset.slide); startSlider(); }));
startSlider();

// ── Cart ──────────────────────────────────────
function updateCartUI() {
  const totalItems = cart.reduce((s, i) => s + i.qty, 0);
  const totalPrice = cart.reduce((s, i) => s + i.price * i.qty, 0);
  $('#cartBadge').textContent = totalItems;
  $('#cartCount').textContent = `(${totalItems})`;
  $('#cartTotal').textContent = fmt(totalPrice);

  const body = $('#cartBody');
  const footer = $('#cartFooter');
  const empty = $('#cartEmpty');

  if (cart.length === 0) {
    empty.style.display = '';
    footer.style.display = 'none';
    body.innerHTML = '';
    body.appendChild(empty);
    return;
  }
  empty.style.display = 'none';
  footer.style.display = '';
  body.innerHTML = cart.map(item => `
    <div class="cart-item" data-id="${item.id}">
      <img src="${item.img}" alt="${item.name}" />
      <div class="cart-item-info">
        <h4>${item.name}</h4>
        <span class="cart-price">${fmt(item.price)}</span>
        <div class="cart-item-qty">
          <button class="qty-btn" data-action="dec" data-id="${item.id}">−</button>
          <span class="qty-val">${item.qty}</span>
          <button class="qty-btn" data-action="inc" data-id="${item.id}">+</button>
          <button class="cart-item-remove" data-id="${item.id}" style="margin-left:8px;"><i class="fa fa-trash"></i></button>
        </div>
      </div>
    </div>
  `).join('');
}

function openCart() {
  $('#cartDrawer').classList.add('open');
  $('#cartOverlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeCart() {
  $('#cartDrawer').classList.remove('open');
  $('#cartOverlay').classList.remove('open');
  document.body.style.overflow = '';
}
$('#cartToggle').addEventListener('click', openCart);
$('#cartClose').addEventListener('click', closeCart);
$('#cartOverlay').addEventListener('click', closeCart);

$('#cartBody').addEventListener('click', (e) => {
  const btn = e.target.closest('[data-action]');
  const rem = e.target.closest('.cart-item-remove');
  if (btn) {
    const id = +btn.dataset.id;
    const item = cart.find(i => i.id === id);
    if (item) {
      if (btn.dataset.action === 'inc') item.qty++;
      else if (btn.dataset.action === 'dec') {
        item.qty--;
        if (item.qty <= 0) cart = cart.filter(i => i.id !== id);
      }
    }
    saveCart();
    updateCartUI();
  }
  if (rem) {
    const id = +rem.dataset.id;
    cart = cart.filter(i => i.id !== id);
    saveCart();
    updateCartUI();
    showToast('Item removed from cart');
  }
});

function addToCart(product) {
  const existing = cart.find(i => i.id === product.id);
  if (existing) {
    existing.qty++;
  } else {
    cart.push({ ...product, qty: 1 });
  }
  saveCart();
  updateCartUI();
  showToast(`🛒 ${product.name} added to cart!`);
}

// ── Render Products ───────────────────────────
function renderStars(rating) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  let s = '';
  for (let i = 0; i < full; i++) s += '★';
  if (half) s += '☆';
  // Fill remaining with empty stars
  const total = 5;
  const empty = total - full - (half ? 1 : 0);
  for (let i = 0; i < empty; i++) s += '☆';
  return s;
}

function renderProducts(filter = 'all') {
  const grid = $('#productsGrid');
  const filtered = filter === 'all' ? PRODUCTS : PRODUCTS.filter(p => p.cat === filter);
  grid.innerHTML = filtered.map(p => `
    <div class="product-card" data-aos>
      <div class="product-img">
        <img src="${p.img}" alt="${p.name}" loading="lazy" />
        ${p.badge ? `<span class="product-badge badge-${p.badge}">${p.badge.toUpperCase()}</span>` : ''}
        <div class="product-actions">
          <button class="action-btn" title="Add to Wishlist" onclick="addToWishlist(${p.id})"><i class="fa fa-heart"></i></button>
          <button class="action-btn" title="Quick View"><i class="fa fa-eye"></i></button>
        </div>
      </div>
      <div class="product-body">
        <div class="product-cat">${p.cat}</div>
        <div class="product-name">${p.name}</div>
        <div class="product-rating">
          <span class="stars">${renderStars(p.rating)}</span>
          <span class="rating-count">(${p.reviews.toLocaleString()})</span>
        </div>
        <div class="product-price">
          <span class="price-cur">${fmt(p.price)}</span>
          ${p.oldPrice ? `<span class="price-old">${fmt(p.oldPrice)}</span>` : ''}
        </div>
        <button class="product-add" onclick='addToCart(${JSON.stringify(p)})'>
          <i class="fa fa-shopping-bag"></i> Add to Cart
        </button>
      </div>
    </div>
  `).join('');
  initAOS();
}

function renderDeals() {
  $('#dealsGrid').innerHTML = DEALS.map(d => `
    <div class="deal-card">
      <div class="deal-img">
        <img src="${d.img}" alt="${d.name}" loading="lazy" />
        <span class="deal-save">Save Ksh ${d.save.toLocaleString()}</span>
      </div>
      <div class="deal-body">
        <div class="deal-cat">${d.cat}</div>
        <div class="deal-name">${d.name}</div>
        <div class="deal-price">
          <span class="cur">Ksh ${d.price.toLocaleString()}</span>
          <span class="old">Ksh ${d.oldPrice.toLocaleString()}</span>
        </div>
        <button class="deal-add" onclick='addToCart({id:${d.id},name:"${d.name}",price:${d.price},img:"${d.img}"})'>Add to Cart</button>
      </div>
    </div>
  `).join('');
}

function renderTrending() {
  $('#trendingGrid').innerHTML = TRENDING.map(t => `
    <div class="trending-card" onclick='addToCart({id:${t.id},name:"${t.name}",price:${t.price},img:"${t.img}"})'>
      <div class="trending-img">
        <img src="${t.img}" alt="${t.name}" loading="lazy" />
      </div>
      <div class="trending-body">
        <div class="trending-name">${t.name}</div>
        <div class="trending-price">${fmt(t.price)}</div>
      </div>
    </div>
  `).join('');
}

// ── Filter Tabs ───────────────────────────────
$$('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    $$('.tab-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentFilter = btn.dataset.filter;
    renderProducts(currentFilter);
  });
});

// ── Countdown Timer ───────────────────────────
function startCountdown() {
  const target = new Date();
  target.setDate(target.getDate() + 2);
  target.setHours(23, 59, 59, 0);

  function tick() {
    const now = new Date();
    const diff = target - now;
    if (diff <= 0) return;
    const days = Math.floor(diff / 86400000);
    const hrs  = Math.floor((diff % 86400000) / 3600000);
    const mins = Math.floor((diff % 3600000) / 60000);
    const secs = Math.floor((diff % 60000) / 1000);
    $('#cd-days').textContent  = String(days).padStart(2,'0');
    $('#cd-hours').textContent = String(hrs).padStart(2,'0');
    $('#cd-mins').textContent  = String(mins).padStart(2,'0');
    $('#cd-secs').textContent  = String(secs).padStart(2,'0');
  }
  tick();
  setInterval(tick, 1000);
}

// ── Search ────────────────────────────────────
const searchInput = $('#searchInput');
const searchDropdown = $('#searchDropdown');

searchInput.addEventListener('input', () => {
  const q = searchInput.value.trim().toLowerCase();
  if (!q) { searchDropdown.classList.remove('open'); return; }
  const results = PRODUCTS.filter(p => p.name.toLowerCase().includes(q) || p.cat.toLowerCase().includes(q));
  if (results.length === 0) {
    searchDropdown.innerHTML = '<div class="search-result-item"><div class="search-result-info"><strong>No results found</strong></div></div>';
  } else {
    searchDropdown.innerHTML = results.map(p => `
      <div class="search-result-item" onclick='addToCart(${JSON.stringify(p)});searchDropdown.classList.remove("open");searchInput.value=""'>
        <img src="${p.img}" alt="${p.name}" />
        <div class="search-result-info">
          <strong>${p.name}</strong>
          <span>${fmt(p.price)}</span>
        </div>
      </div>
    `).join('');
  }
  searchDropdown.classList.add('open');
});

document.addEventListener('click', (e) => {
  if (!e.target.closest('.search-wrapper')) searchDropdown.classList.remove('open');
});

// ── Wishlist ──────────────────────────────────
let wishlist = JSON.parse(localStorage.getItem('ip_wishlist') || '[]');

function updateWishlistBadge() {
  $('#wishlistBadge').textContent = wishlist.length;
}

window.addToWishlist = (id) => {
  if (!wishlist.includes(id)) {
    wishlist.push(id);
    localStorage.setItem('ip_wishlist', JSON.stringify(wishlist));
    updateWishlistBadge();
    showToast('❤️ Added to wishlist!');
  } else {
    showToast('Already in your wishlist');
  }
};

// ── Newsletter ────────────────────────────────
$('#nlBtn').addEventListener('click', () => {
  const email = $('#nlEmail').value.trim();
  const note = $('#nlNote');
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!re.test(email)) {
    note.textContent = '⚠️ Please enter a valid email address.';
    note.style.color = '#ff5722';
    return;
  }
  note.textContent = '✅ Thank you for subscribing! Check your inbox.';
  note.style.color = '#4caf50';
  $('#nlEmail').value = '';
});

// ── AOS (Animate on Scroll) ───────────────────
function initAOS() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(el => {
      if (el.isIntersecting) {
        el.target.classList.add('aos-animate');
        observer.unobserve(el.target);
      }
    });
  }, { threshold: 0.12 });
  $$('[data-aos]').forEach(el => observer.observe(el));
}

// ── Init ──────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  renderProducts('all');
  renderDeals();
  renderTrending();
  startCountdown();
  updateCartUI();
  updateWishlistBadge();
  initAOS();
});