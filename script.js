/* ===================================================
   FINAL script.js - Shree Dattarekha Enterprise
   BRANDS: GITS, SAWAI, MOM (ghee/products), BLG (pickles)
   Excel export includes header:
     Shop Name: ...
     Address: ...
     Date: ...
   NOTE: BLG data taken from uploaded PDF at:
   /mnt/data/stock_position (3).pdf
=================================================== */

/* =======================
   ALWAYS CLEAR OLD DATA WHEN COMING BACK TO INDEX PAGE
   (User requested: index.html is main page)
======================= */
if (window.location.pathname.includes("index.html") || window.location.pathname.endsWith("/")) {
  try {
    localStorage.removeItem("cart");
    localStorage.removeItem("selectedBrand");
    localStorage.removeItem("selectedProduct");
    localStorage.removeItem("invoiceData");
    // keep shopData persistent if you still want it; remove if you want fresh shop form too:
    // localStorage.removeItem("shopData");
  } catch (e) {
    console.error('Error clearing storage on index load', e);
  }
}

/* ----------------------------
   DATA: BRANDS + PRODUCTS
   (UNCHANGED product lists exactly as you provided)
---------------------------- */
const BRANDS = {
  'GITS': [
    { id:'GITS-001', name: 'Basundi Mix 125 G', price: 99 },
    { id:'GITS-002', name: 'Dahi Vada Mix 200 G', price: 110 },
    { id:'GITS-003', name: 'Idli Mix 200 G', price: 80 },
    { id:'GITS-004', name: 'Khamman Dhokla Mix 180 G', price: 75 },
    { id:'GITS-005', name: 'Khatta Dhokla Mix 200 G', price: 75 },
    { id:'GITS-006', name: 'Kheer Mix Rice 100 G', price: 75 },
    { id:'GITS-007', name: 'Rabadi Mix 100 G', price: 99 },
    { id:'GITS-008', name: 'Rava Dosa Mix 200 G', price: 80 },
    { id:'GITS-009', name: 'Rava Idli Mix 200 G', price: 80 },
    { id:'GITS-010', name: 'Kheer Mix Vermicelli 100 G', price: 75 },
    { id:'GITS-011', name: 'Sonpapadi 250 G', price: 75 },
    { id:'GITS-012', name: 'Dosa Mix 200 G Stand Up', price: 80 },
    { id:'GITS-013', name: 'Gulab Jamun Stand Up 200 G', price: 125 },
    { id:'GITS-014', name: 'Gulab Jamun Mix 500 G Pouch', price: 245 },
    { id:'GITS-015', name: 'Gulab Jamun Mix 100 G Pouch', price: 85 },
    { id:'GITS-016', name: 'Gulab Jamun 225 G Can', price: 65 },
    { id:'GITS-017', name: 'Gulab Jamun 500 G Can', price: 125 },
    { id:'GITS-018', name: 'Rasgulla 500 G Can', price: 125 },
    { id:'GITS-019', name: 'Ghee 1 Ltr Jar', price: 755 },
    { id:'GITS-020', name: 'Ghee 100 ml Jar', price: 99 },
    { id:'GITS-021', name: 'Ghee 200 ml Jar', price: 175 },
    { id:'GITS-022', name: 'Ghee 500 ml Jar', price: 385 },
    { id:'GITS-023', name: 'Ghee 20 ml Pouch', price: 20 }
  ],
  'SAWAI': [
    { id:'SAWAI-001', name:'Bharali Wangi', price:30 },
    { id:'SAWAI-002', name:'Shev Bhaji', price:30 },
    { id:'SAWAI-003', name:'Pav Bhaji', price:30 },
    { id:'SAWAI-004', name:'Kolhapuri Misal', price:30 },
    { id:'SAWAI-005', name:'Nashik Misal', price:30 },
    { id:'SAWAI-006', name:'Puneri Misal', price:30 },
    { id:'SAWAI-007', name:'Veg Biryani', price:30 },
    { id:'SAWAI-008', name:'Fish Fry', price:30 },
    { id:'SAWAI-009', name:'Fish Rassa', price:30 },
    { id:'SAWAI-010', name:'Anda Rassa', price:30 },
    { id:'SAWAI-011', name:'Chicken Biryani', price:30 },
    { id:'SAWAI-012', name:'Chicken Rassa Kolhapuri', price:30 },
    { id:'SAWAI-013', name:'Chicken Rassa Malvani', price:30 },
    { id:'SAWAI-014', name:'Chicken Rassa Khandeshi', price:30 },
    { id:'SAWAI-015', name:'Chicken Sukkha', price:30 },
    { id:'SAWAI-016', name:'Mutton Biryani', price:30 },
    { id:'SAWAI-017', name:'Mutton Rassa Kolhapuri', price:30 },
    { id:'SAWAI-018', name:'Mutton Rassa Khandeshi', price:30 },
    { id:'SAWAI-019', name:'Mutton Sukkha', price:30 },
    { id:'SAWAI-020', name:'Dhangari Mutton Kalwan', price:30 },
    { id:'SAWAI-021', name:'Kolhapuri Thecha 30 Gm', price:30 },
    { id:'SAWAI-022', name:'Kolhapuri Thecha 17 Gm', price:17 },
    { id:'SAWAI-023', name:'Javas Chutney', price:50 },
    { id:'SAWAI-024', name:'Karala Chutney', price:50 },
    { id:'SAWAI-025', name:'Shengdana Chutney', price:50 },
    { id:'SAWAI-026', name:'Lasun Chutney', price:50 },
    { id:'SAWAI-027', name:'Kal Watan', price:25 },
    { id:'SAWAI-028', name:'Lal Watan', price:25 },
    { id:'SAWAI-029', name:'Kanda Lasun 15 Gm', price:10 },
    { id:'SAWAI-030', name:'Kanda Lasun 200 Gm', price:63 },
    { id:'SAWAI-031', name:'Kala Masala 20 Gm', price:10 },
    { id:'SAWAI-032', name:'Kala Masala 200 Gm', price:120 },
    { id:'SAWAI-033', name:'Chicken Rassa Saoji', price:30 },
    { id:'SAWAI-034', name:'Mutton Rassa Saoji', price:30 },
    { id:'SAWAI-035', name:'Chicken Rassa Varhadi', price:30 },
    { id:'SAWAI-036', name:'Mutton Rassa Varhadi', price:30 },
    { id:'SAWAI-037', name:'Kanda Lasun 500 Gm', price:120 },
    { id:'SAWAI-038', name:'Red Chilli 200 Gm', price:120 },
    { id:'SAWAI-039', name:'Haldi Powder 200 Gm', price:110 },
    { id:'SAWAI-040', name:'Dhana Powder 200 Gm', price:85 },
    { id:'SAWAI-041', name:'Goda Masala 200 Gm', price:86 },
    { id:'SAWAI-042', name:'Mango Pickle 200 Gm Jar', price:65 }
  ],
  'MOM': [
    { id:'MOM-125', name:'Raw Makhana 250g', price:250 },
    { id:'MOM-126', name:'Ragi Chips Desi Masala', price:55 },
    { id:'MOM-127', name:'Ragi Chips Peri Peri', price:55 },
    { id:'MOM-128', name:'Banana Chips 60g', price:60 },
    { id:'MOM-129', name:'Banana Chips Salted 60g', price:60 },
    { id:'MOM-130', name:'Banana Chips Masala 60g', price:60 },
    { id:'MOM-131', name:'Banana Chips Peri Peri 60g', price:60 },
    { id:'MOM-133', name:'Banana Chips Salted 20g', price:20 },
    { id:'MOM-134', name:'Banana Chips Masala 20g', price:20 },
    { id:'MOM-135', name:'Seed Mix 199g', price:199 },
    { id:'MOM-136', name:'Daily Nutri Mix 199g', price:199 },
    { id:'MOM-137', name:'Daily Sports Mix 199g', price:199 },
    { id:'MOM-138', name:'Panchmeva 199g', price:199 },
    { id:'MOM-139', name:'Panchmeva Jar 600g', price:600 },
    { id:'MOM-140', name:'Crunchy Par Mix 149g', price:149 },
    { id:'MOM-141', name:'Daily Health Mix 199g', price:199 },
    { id:'MOM-142', name:'Royal Party Mix 199g', price:199 },
    { id:'MOM-143', name:'Almonds 199g', price:199 },
    { id:'MOM-144', name:'Cashews 199g', price:199 },
    { id:'MOM-145', name:'Nut Mix 199g', price:199 },
    { id:'MOM-146', name:'Pistachios 199g', price:199 },
    { id:'MOM-147', name:'Cashew Salted 30g', price:30 },
    { id:'MOM-148', name:'Almonds 20g', price:20 },
    { id:'MOM-149', name:'Cashew 20g', price:20 },
    { id:'MOM-150', name:'Pistachip 20g', price:20 },
    { id:'MOM-151', name:'Nut Mix 20g', price:20 },
    { id:'MOM-152', name:'Pasta Cheese 85g', price:85 },
    { id:'MOM-153', name:'Pasta Peri Peri 85g', price:85 },
    { id:'MOM-154', name:'Pasta Creamy Tom 85g', price:85 },
    { id:'MOM-155', name:'Makhana Pudina 30g', price:30 },
    { id:'MOM-156', name:'Makhana Mast Masala 30g', price:30 },
    { id:'MOM-157', name:'Makhana Cream N Onion 30g', price:30 },
    { id:'MOM-158', name:'Makhana Cheddar Cheese 30g', price:30 },
    { id:'MOM-159', name:'Makhana Himalaya Salted 30g', price:30 },
    { id:'MOM-160', name:'Almonds 99g', price:99 },
    { id:'MOM-161', name:'Cashew 99g', price:99 },
    { id:'MOM-162', name:'Pista 99g', price:99 },
    { id:'MOM-163', name:'Nut Mix 99g', price:99 },
    { id:'MOM-164', name:'Makhana Cheddar Cheese 99g', price:99 },
    { id:'MOM-165', name:'Makhana Cream N Onion 99g', price:99 },
    { id:'MOM-166', name:'Makhana Himalayan Salted 99g', price:99 },
    { id:'MOM-167', name:'Makhana Black Salt 99g', price:99 },
    { id:'MOM-168', name:'Makhana Mast Masala 99g', price:99 },
    { id:'MOM-169', name:'Makhana Pudina 99g', price:99 },
    { id:'MOM-170', name:'Gimi Gimi Hot Cheese 99g', price:99 },
    { id:'MOM-171', name:'Gimi Gimi Veg Carbonara 99g', price:99 },
    { id:'MOM-172', name:'Gimi Gimi Fiery Hot 99g', price:99 },
    { id:'MOM-173', name:'Gimi Gimi K Curry 99g', price:99 },
    { id:'MOM-174', name:'Gimi Gimi KI Kimchi 99g', price:99 },
    { id:'MOM-175', name:'Gimi Gimi Soul Umami 99g', price:99 },
    { id:'MOM-176', name:'Nut Mix 199g (alt)', price:199 },
    { id:'MOM-177', name:'Cashew Masala 99g', price:99 }
  ],
  'BLG': [
    { id:'BLG-093', name:'Pop N Hop Golden Delight 33g', price:630 },
    { id:'BLG-094', name:'Pop N Hop Classic Salted 33g', price:615 },
    { id:'BLG-095', name:'Pop N Hop Butter Sizzle 33g', price:615 },
    { id:'BLG-096', name:'Soya Chunks 40g', price:2740 },
    { id:'BLG-097', name:'Soya Mini Chunks 40g', price:3050 },
    { id:'BLG-098', name:'Kasuri Methi 10g', price:590 },
    { id:'BLG-099', name:'Kasuri Methi Box 25g', price:198 },
    { id:'BLG-100', name:'Dhana Powder 200g', price:205 },
    { id:'BLG-101', name:'Halad Powder 50g', price:1240 },
    { id:'BLG-102', name:'Halad Powder 200g', price:350 },
    { id:'BLG-103', name:'Pasta Masala 6g', price:1860 },
    { id:'BLG-104', name:'Magic Masala 6g', price:2000 },
    { id:'BLG-105', name:'Jeera Powder 16g', price:660 },
    { id:'BLG-106', name:'Chicken Masala 16g', price:590 },
    { id:'BLG-107', name:'Mutton Masala 16g', price:660 },
    { id:'BLG-108', name:'Biryani Chicken/Mutton 16g', price:680 },
    { id:'BLG-109', name:'Chilli Powder 200g', price:151 },
    { id:'BLG-110', name:'Pani Puri Kit 230g (4-in-1)', price:131 }, 
    { id:'BLG-112', name:'Pink Salt 1 Kg', price:-5 },
    { id:'BLG-113', name:'Kashmiri Chilli 12g', price:580 },
    { id:'BLG-114', name:'Hing Tufani Tadka 10/-', price:340 },
    { id:'BLG-115', name:'Hing Yellow Powder 50g', price:-160 },
    { id:'BLG-116', name:'BLG Dhana Powder 50g', price:920 }
  ]
};

let cart = [];
let shopData = {};

/* =======================
   Utilities (smart checks & fixes)
======================= */
function safeParseNumber(v, fallback = 0) {
  if (v === null || v === undefined) return fallback;
  const cleaned = String(v).replace(/[, ]+/g, '').trim();
  const n = Number(cleaned);
  return Number.isFinite(n) ? n : fallback;
}

function showToast(text, timeout = 1400) {
  let t = document.querySelector('.toast');
  if (!t) {
    t = document.createElement('div');
    t.className = 'toast';
    t.style.position = 'fixed';
    t.style.left = '50%';
    t.style.transform = 'translateX(-50%) translateY(6px)';
    t.style.bottom = '20px';
    t.style.padding = '8px 12px';
    t.style.borderRadius = '8px';
    t.style.background = 'rgba(0,0,0,0.8)';
    t.style.color = '#fff';
    t.style.zIndex = 9999;
    t.style.transition = 'all 0.25s ease';
    document.body.appendChild(t);
  }
  t.textContent = text;
  t.style.opacity = '1';
  t.style.transform = 'translateX(-50%) translateY(0)';
  clearTimeout(t._timeout);
  t._timeout = setTimeout(() => {
    t.style.opacity = '0';
    t.style.transform = 'translateX(-50%) translateY(6px)';
  }, timeout);
}

/* single saveCart function */
function saveCart() {
  try {
    cart = cart.map((c, i) => ({
      ...c,
      sr: i + 1,
      qty: safeParseNumber(c.qty, 0),
      price: safeParseNumber(c.price, 0)
    }));
  } catch (e) {
    console.error('saveCart error', e);
  }
  try { localStorage.setItem('cart', JSON.stringify(cart)); } catch (e) {}
  updateCartBadge();
}

/* update badge on proceed button and show/hide clear buttons */
function updateCartBadge() {
  const proceedBtn = document.getElementById('proceedOrder');
  if (proceedBtn) {
    const count = cart.reduce((s, i) => s + (Number(i.qty) || 0), 0);
    let badge = proceedBtn.querySelector('.cart-badge');
    if (!badge) {
      badge = document.createElement('span');
      badge.className = 'cart-badge';
      badge.style.marginLeft = '8px';
      badge.style.background = '#ffffff20';
      badge.style.padding = '2px 8px';
      badge.style.borderRadius = '999px';
      badge.style.fontWeight = '700';
      proceedBtn.appendChild(badge);
    }
    badge.textContent = count;
    proceedBtn.disabled = (count === 0) || !isShopFormFilled();
  }

  // show/hide clear cart button on products page (if present)
  const clearProductsBtn = document.getElementById('clearCartProducts');
  if (clearProductsBtn) {
    clearProductsBtn.style.display = cart.length ? 'inline-block' : 'none';
  }

  // show/hide clear cart button on order page
  const clearOrderBtn = document.getElementById('clearCart');
  if (clearOrderBtn) {
    clearOrderBtn.style.display = cart.length ? 'inline-block' : 'none';
  }
}

function isShopFormFilled() {
  const form = document.getElementById('shopForm');
  if (!form) return true; // allow proceed if form not present on page
  const els = [...form.querySelectorAll('input, textarea')];
  if (!els.length) return true;
  return els.every(e => e.value && String(e.value).trim() !== '');
}

/* =======================
   Theme toggle
======================= */
const themeBtn = document.getElementById('themeToggle');
if (themeBtn) {
  try {
    if (localStorage.getItem('theme') === 'light') {
      document.body.classList.add('light');
      document.body.classList.remove('dark');
      themeBtn.textContent = '☀️';
    } else {
      const isDark = document.body.classList.contains('dark');
      themeBtn.textContent = isDark ? '🌙' : '☀️';
    }
  } catch (e) {}
  themeBtn.onclick = () => {
    document.body.classList.toggle('dark');
    document.body.classList.toggle('light');
    const isDark = document.body.classList.contains('dark');
    themeBtn.textContent = isDark ? '🌙' : '☀️';
    try { localStorage.setItem('theme', isDark ? 'dark' : 'light'); } catch (e) {}
  };
}

/* =======================
   Brand images mapping & responsive size
   - Put your brand images in same folder or adjust path below:
     images/gits.png, images/sawai.png, images/mom.png, images/blg.png
======================= */
const BRAND_IMAGES = {
  'GITS': 'images/gits.png',
  'SAWAI': 'images/sawai.png',
  'MOM': 'images/mom.png',
  'BLG': 'images/blg.png'
};
// responsive size helper: Option B (mobile-first)
// We'll apply inline styles to keep JS-only changes
function brandImageSizeStyle() {
  // small devices: 44px, medium: 56px, desktop: 72px
  return 'width:44px;height:44px;object-fit:contain;border-radius:6px;';
}

/* =======================
   PRODUCTS PAGE
======================= */
const productListEl = document.getElementById('productList');

if (productListEl) {
  try { shopData = JSON.parse(localStorage.getItem('shopData') || '{}') || {}; } catch (e) { shopData = {}; }
  try { cart = JSON.parse(localStorage.getItem('cart') || '[]') || []; } catch (e) { cart = []; }
  fillShopForm();

  // ensure brand buttons exist — if not, create simple tabs (with images)
  let brandButtonsContainer = document.querySelector('.brand-buttons');
  if (!brandButtonsContainer) {
    // create container above productListEl
    const container = document.createElement('div');
    container.className = 'brand-buttons';
    container.style.display = 'flex';
    container.style.gap = '8px';
    container.style.marginBottom = '10px';
    container.style.flexWrap = 'wrap';
    productListEl.parentNode.insertBefore(container, productListEl);
    brandButtonsContainer = container;

    for (const brand of Object.keys(BRANDS)) {
      const btn = document.createElement('button');
      btn.className = 'brand-btn';
      btn.dataset.brand = brand;
      btn.style.display = 'flex';
      btn.style.alignItems = 'center';
      btn.style.gap = '8px';
      btn.style.padding = '6px 10px';
      btn.style.borderRadius = '8px';
      btn.style.border = '1px solid rgba(0,0,0,0.08)';
      btn.style.background = 'transparent';
      btn.style.cursor = 'pointer';

      // image (if available)
      const imgSrc = BRAND_IMAGES[brand];
      if (imgSrc) {
        const img = document.createElement('img');
        img.src = imgSrc;
        img.alt = brand;
        img.setAttribute('style', brandImageSizeStyle());
        // accessibility label
        img.setAttribute('aria-hidden', 'true');
        btn.appendChild(img);
      }

      const span = document.createElement('span');
      span.textContent = brand;
      span.style.fontWeight = '700';
      span.style.letterSpacing = '0.6px';
      btn.appendChild(span);

      btn.addEventListener('click', () => loadBrand(brand));
      container.appendChild(btn);
    }
  } else {
    // wire existing brand buttons (if user placed them manually)
    document.querySelectorAll('.brand-btn').forEach(btn => {
      if (!btn.dataset.brand) return;
      btn.addEventListener('click', () => loadBrand(btn.dataset.brand));
    });
  }

  // search input
  const searchInput = document.getElementById('productSearch');
  if (searchInput) {
    searchInput.addEventListener('input', () => {
      const activeBtn = document.querySelector('.brand-btn.active');
      const brand = activeBtn?.dataset.brand;
      const q = searchInput.value.trim().toLowerCase();
      if (brand) loadBrand(brand, q);
      else loadAllBrands(q);
    });
  }

  // sorting controls (if present) - optional: id="productSort"
  const sortSelect = document.getElementById('productSort');
  if (sortSelect) {
    sortSelect.addEventListener('change', () => {
      // re-run current view with sorting applied
      const activeBtn = document.querySelector('.brand-btn.active');
      const brand = activeBtn?.dataset.brand;
      const q = searchInput?.value?.trim().toLowerCase() || '';
      if (brand) loadBrand(brand, q);
      else loadAllBrands(q);
    });
  }

  // proceed button
  const proceedBtn = document.getElementById('proceedOrder');
  if (proceedBtn) {
    proceedBtn.addEventListener('click', () => {
      saveShopInfo();
      saveCart();
      location.href = 'order.html';
    });
  }

  // shop form change => toggle proceed enabling
  document.querySelectorAll('#shopForm input, #shopForm textarea').forEach(inp=>{
    inp.addEventListener('input', () => {
      if (proceedBtn) proceedBtn.disabled = !isShopFormFilled() || cart.length === 0;
      updateCartBadge();
    });
  });

  // clear cart button on products page (optional — add id="clearCartProducts" to your HTML)
  const clearProductsBtn = document.getElementById('clearCartProducts');
  if (clearProductsBtn) {
    clearProductsBtn.style.display = cart.length ? 'inline-block' : 'none';
    clearProductsBtn.addEventListener('click', () => {
      if (confirm('Do you want to clear all items from cart?')) {
        cart = [];
        saveCart();
        // re-render current brand or all
        const activeBtn = document.querySelector('.brand-btn.active');
        if (activeBtn) loadBrand(activeBtn.dataset.brand);
        else loadAllBrands();
        showToast('Cart cleared');
      }
    });
  }

  updateCartBadge();

  // if there's an active brand in query or saved state, load it; else load first brand
  const firstBrand = Object.keys(BRANDS)[0];
  // set the first brand active visually if none active
  if (!document.querySelector('.brand-btn.active')) {
    const firstBtn = document.querySelector(`.brand-btn[data-brand="${firstBrand}"]`);
    if (firstBtn) firstBtn.classList.add('active');
  }
  // initial load: if a search exists, don't filter brand
  const initialSearch = (document.getElementById('productSearch')?.value || '').trim().toLowerCase();
  const activeBrand = document.querySelector('.brand-btn.active')?.dataset.brand || firstBrand;
  if (initialSearch) loadBrand(activeBrand, initialSearch);
  else loadBrand(activeBrand);
}

/* Helper: apply sorting to an array of products based on UI control (if present) */
function applySort(products) {
  const sortSelect = document.getElementById('productSort');
  if (!sortSelect) return products;
  const val = sortSelect.value;
  const arr = [...products];
  if (val === 'az') arr.sort((a,b)=> a.name.localeCompare(b.name));
  else if (val === 'za') arr.sort((a,b)=> b.name.localeCompare(a.name));
  else if (val === 'plh') arr.sort((a,b)=> safeParseNumber(a.price, Infinity) - safeParseNumber(b.price, Infinity));
  else if (val === 'phl') arr.sort((a,b)=> safeParseNumber(b.price, -Infinity) - safeParseNumber(a.price, -Infinity));
  return arr;
}

/* render products for a single brand (with optional search) */
function loadBrand(brand, search='') {
  const productList = document.getElementById('productList');
  if (!productList) return;
  productList.innerHTML = '';

  // toggle active class
  document.querySelectorAll('.brand-btn').forEach(b=>b.classList.toggle('active', b.dataset.brand===brand));

  if (!BRANDS[brand] || BRANDS[brand].length === 0) {
    productList.innerHTML = `<p style="text-align:center;color:rgba(0,0,0,0.6);">No products for ${brand}</p>`;
    return;
  }

  // header with brand image + title
  const header = document.createElement('div');
  header.style.display = 'flex';
  header.style.alignItems = 'center';
  header.style.gap = '10px';
  header.style.padding = '8px 0';
  header.style.marginBottom = '6px';

  const imgSrc = BRAND_IMAGES[brand];
  if (imgSrc) {
    const img = document.createElement('img');
    img.src = imgSrc;
    img.alt = brand;
    img.setAttribute('style', 'width:48px;height:48px;object-fit:contain;border-radius:6px;');
    header.appendChild(img);
  }
  const title = document.createElement('div');
  title.innerHTML = `<strong style="color:var(--gold);font-weight:900">${brand}</strong> — Select items`;
  header.appendChild(title);
  productList.appendChild(header);

  // prepare list and apply sort
  const productsToRender = applySort(BRANDS[brand]);

  productsToRender.forEach(p => {
    if (search && !p.name.toLowerCase().includes(search)) return;

    const card = document.createElement('div');
    card.className = 'product-card';
    card.style.padding = '10px';
    card.style.borderRadius = '8px';
    card.style.background = 'transparent';
    card.style.display = 'flex';
    card.style.justifyContent = 'space-between';
    card.style.alignItems = 'center';
    card.style.gap = '10px';
    card.style.marginBottom = '8px';

    // left: product info (clickable name opens product page)
    const left = document.createElement('div');
    left.style.flex = '1';
    left.style.cursor = 'pointer';
    left.innerHTML = `<h3 style="margin:0 0 .35rem 0;font-size:1rem">${p.name}</h3>
                      <div style="font-weight:700">₹${p.price}</div>`;
    left.addEventListener('click', (e) => {
      // open product detail page (if exists) or just highlight — opens product.html?product=ID
      const url = `product.html?product=${encodeURIComponent(p.id)}`;
      // try to open in same tab; if product.html not present, this simply navigates and user can handle
      window.location.href = url;
    });

    // right: controls
    const right = document.createElement('div');
    right.style.display = 'flex';
    right.style.gap = '8px';
    right.style.alignItems = 'center';

    const qEl = document.createElement('input');
    qEl.setAttribute('aria-label', `Quantity for ${p.name}`);
    qEl.id = `q-${p.id}`;
    qEl.type = 'number';
    qEl.min = '0';
    qEl.placeholder = 'Qty';
    qEl.style.width = '72px';
    qEl.style.padding = '6px';
    qEl.style.borderRadius = '6px';
    qEl.style.border = '1px solid #ccc';
    qEl.value = ''; // default empty

    // if this product already in cart, show qty
    const existingCart = cart.find(it => it.id === p.id);
    if (existingCart) qEl.value = String(safeParseNumber(existingCart.qty, 0));

    // live input handler: update cart immediately (persist qty live)
    qEl.addEventListener('input', () => {
      const q = safeParseNumber(qEl.value, 0);
      const existing = cart.find(it => it.id === p.id);
      if (q <= 0) {
        // if zero or empty => remove from cart
        if (existing) {
          cart = cart.filter(it => it.id !== p.id);
          saveCart();
        }
      } else {
        if (existing) {
          existing.qty = q;
        } else {
          cart.push({ id: p.id, name: p.name, qty: q, brand, price: p.price });
        }
        saveCart();
      }
      updateCartBadge();
    });

    const addBtn = document.createElement('button');
    addBtn.className = 'add-btn';
    addBtn.dataset.id = p.id;
    addBtn.style.padding = '6px 10px';
    addBtn.style.borderRadius = '8px';
    addBtn.style.border = 'none';
    addBtn.style.cursor = 'pointer';
    addBtn.textContent = 'Add';

    // Add button click: add the current input quantity (or 1 if empty)
    addBtn.addEventListener('click', () => {
      const q = safeParseNumber(qEl.value, 0) || 1;
      if (!q || q <= 0) {
        showToast('Enter a valid quantity');
        if (qEl) qEl.focus();
        return;
      }
      const existing = cart.find(it => it.id === p.id);
      if (existing) existing.qty = safeParseNumber(existing.qty, 0) + q;
      else cart.push({ id: p.id, name: p.name, qty: q, brand, price: p.price });

      saveCart();
      qEl.value = '';
      updateCartBadge();
      showToast(`${p.name} added`);
    });

    const removeBtn = document.createElement('button');
    removeBtn.className = 'remove-btn';
    removeBtn.dataset.id = p.id;
    removeBtn.style.background = '#ff4444';
    removeBtn.style.color = 'white';
    removeBtn.style.marginLeft = '6px';
    removeBtn.style.padding = '6px';
    removeBtn.style.borderRadius = '8px';
    removeBtn.style.border = 'none';
    removeBtn.style.cursor = 'pointer';
    removeBtn.textContent = '🗑 Delete';

    removeBtn.addEventListener('click', () => {
      const existed = cart.find(it => it.id === p.id);
      if (!existed) {
        showToast(`${p.name} is not in cart`);
        return;
      }
      if (!confirm(`Remove all ${p.name} from cart?`)) return;
      cart = cart.filter(it => it.id !== p.id);
      saveCart();
      updateCartBadge();
      showToast(`${p.name} removed from cart`);
      // also clear input
      qEl.value = '';
    });

    right.appendChild(qEl);
    right.appendChild(addBtn);
    right.appendChild(removeBtn);

    card.appendChild(left);
    card.appendChild(right);

    productList.appendChild(card);
  });

  // ensure the delete/add buttons are visible (safety)
  productList.querySelectorAll('.remove-btn, .add-btn').forEach(b => {
    b.style.display = 'inline-block';
  });
}

/* load all brands (search across all) */
function loadAllBrands(search='') {
  const productList = document.getElementById('productList');
  if (!productList) return;
  productList.innerHTML = '';
  document.querySelectorAll('.brand-btn').forEach(b=>b.classList.remove('active'));

  for (const brand of Object.keys(BRANDS)) {
    const header = document.createElement('div');
    header.style.display = 'flex';
    header.style.alignItems = 'center';
    header.style.gap = '10px';
    header.style.padding = '8px 0';
    header.style.marginBottom = '6px';

    const imgSrc = BRAND_IMAGES[brand];
    if (imgSrc) {
      const img = document.createElement('img');
      img.src = imgSrc;
      img.alt = brand;
      img.setAttribute('style', 'width:40px;height:40px;object-fit:contain;border-radius:6px;');
      header.appendChild(img);
    }
    const title = document.createElement('div');
    title.innerHTML = `<strong style="color:var(--gold);font-weight:900">${brand}</strong> — Select items`;
    header.appendChild(title);
    productList.appendChild(header);

    const productsToRender = applySort(BRANDS[brand]);

    BRANDS[brand].forEach(p => {
      if (search && !p.name.toLowerCase().includes(search)) return;

      const card = document.createElement('div');
      card.className = 'product-card';
      card.style.padding = '10px';
      card.style.borderRadius = '8px';
      card.style.background = 'transparent';
      card.style.display = 'flex';
      card.style.justifyContent = 'space-between';
      card.style.alignItems = 'center';
      card.style.gap = '10px';
      card.style.marginBottom = '8px';
      // left info clickable
      const left = document.createElement('div');
      left.style.flex = '1';
      left.style.cursor = 'pointer';
      left.innerHTML = `<h3 style="margin:0 0 .35rem 0;font-size:1rem">${p.name}</h3>
                        <div style="font-weight:700">₹${p.price}</div>`;
      left.addEventListener('click', ()=> {
        const url = `product.html?product=${encodeURIComponent(p.id)}`;
        window.location.href = url;
      });

      const right = document.createElement('div');
      right.style.display = 'flex';
      right.style.gap = '8px';
      right.style.alignItems = 'center';

      const qEl = document.createElement('input');
      qEl.setAttribute('aria-label', `Quantity for ${p.name}`);
      qEl.id = `q-${p.id}`;
      qEl.type = 'number';
      qEl.min = '0';
      qEl.placeholder = 'Qty';
      qEl.style.width = '72px';
      qEl.style.padding = '6px';
      qEl.style.borderRadius = '6px';
      qEl.style.border = '1px solid #ccc';
      const existingCart = cart.find(it => it.id === p.id);
      if (existingCart) qEl.value = String(safeParseNumber(existingCart.qty, 0));

      qEl.addEventListener('input', () => {
        const q = safeParseNumber(qEl.value, 0);
        const existing = cart.find(it => it.id === p.id);
        if (q <= 0) {
          if (existing) {
            cart = cart.filter(it => it.id !== p.id);
            saveCart();
          }
        } else {
          if (existing) existing.qty = q;
          else cart.push({ id: p.id, name: p.name, qty: q, brand, price: p.price });
          saveCart();
        }
        updateCartBadge();
      });

      const addBtn = document.createElement('button');
      addBtn.className = 'add-btn';
      addBtn.dataset.id = p.id;
      addBtn.style.padding = '6px 10px';
      addBtn.style.borderRadius = '8px';
      addBtn.style.border = 'none';
      addBtn.style.cursor = 'pointer';
      addBtn.textContent = 'Add';

      addBtn.addEventListener('click', () => {
        const q = safeParseNumber(qEl.value, 0) || 1;
        if (!q || q <= 0) {
          showToast('Enter a valid quantity');
          if (qEl) qEl.focus();
          return;
        }
        const existing = cart.find(it => it.id === p.id);
        if (existing) existing.qty = safeParseNumber(existing.qty, 0) + q;
        else cart.push({ id: p.id, name: p.name, qty: q, brand, price: p.price });

        saveCart();
        qEl.value = '';
        updateCartBadge();
        showToast(`${p.name} added`);
      });

      const removeBtn = document.createElement('button');
      removeBtn.className = 'remove-btn';
      removeBtn.dataset.id = p.id;
      removeBtn.style.background = '#ff4444';
      removeBtn.style.color = 'white';
      removeBtn.style.marginLeft = '6px';
      removeBtn.style.padding = '6px';
      removeBtn.style.borderRadius = '8px';
      removeBtn.style.border = 'none';
      removeBtn.style.cursor = 'pointer';
      removeBtn.textContent = '🗑 Delete';

      removeBtn.addEventListener('click', () => {
        const existed = cart.find(it => it.id === p.id);
        if (!existed) {
          showToast(`${p.name} is not in cart`);
          return;
        }
        if (!confirm(`Remove all ${p.name} from cart?`)) return;
        cart = cart.filter(it => it.id !== p.id);
        saveCart();
        updateCartBadge();
        showToast(`${p.name} removed from cart`);
        qEl.value = '';
      });

      right.appendChild(qEl);
      right.appendChild(addBtn);
      right.appendChild(removeBtn);

      card.appendChild(left);
      card.appendChild(right);

      productList.appendChild(card);
    });
  }

  productList.querySelectorAll('.remove-btn, .add-btn').forEach(b => {
    b.style.display = 'inline-block';
  });
}

/* =======================
   Form helpers
======================= */
function saveShopInfo(){
  const data={
    date:document.getElementById('orderDate')?.value || '',
    shopName:document.getElementById('shopName')?.value || '',
    contact:document.getElementById('contactNumber')?.value || '',
    address:document.getElementById('address')?.value || ''
  };
  shopData = data;
  try { localStorage.setItem('shopData', JSON.stringify(data)); } catch(e) {}
}
function fillShopForm(){
  const data = (() => {
    try { return JSON.parse(localStorage.getItem('shopData') || '{}') || {}; } catch(e){ return {}; }
  })();
  if (document.getElementById('orderDate')) document.getElementById('orderDate').value = data.date || '';
  if (document.getElementById('shopName')) document.getElementById('shopName').value = data.shopName || '';
  if (document.getElementById('contactNumber')) document.getElementById('contactNumber').value = data.contact || '';
  if (document.getElementById('address')) document.getElementById('address').value = data.address || '';
}

/* =======================
   ORDER PAGE
======================= */
function renderOrderTable() {
  const tbody = document.querySelector('#orderTable tbody');
  if (!tbody) return;
  tbody.innerHTML = '';
  let total = 0;

  cart.forEach((c,i) => {
    const safeQty = safeParseNumber(c.qty, 0);
    const safePrice = safeParseNumber(c.price, 0);
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td style="padding:8px;border-bottom:1px solid #eee">${i+1}</td>
      <td style="padding:8px;border-bottom:1px solid #eee">${c.name}</td>
      <td style="padding:8px;border-bottom:1px solid #eee">${safeQty}</td>
      <td style="padding:8px;border-bottom:1px solid #eee">${c.brand}</td>
      <td style="padding:8px;border-bottom:1px solid #eee">₹${safePrice}</td>
      <td style="padding:8px;border-bottom:1px solid #eee"><button class="del-item" data-id="${c.id}" style="background:#ff4444;color:white;padding:6px 8px;border-radius:6px;border:none;cursor:pointer;">🗑 Delete</button></td>
    `;
    tbody.appendChild(tr);
    total += (safePrice * safeQty);
  });

  const totalEl = document.getElementById('orderTotal');
  if (totalEl) totalEl.textContent = `₹${total}`;

  document.querySelectorAll('.del-item').forEach(btn=>{
    btn.addEventListener('click', () => {
      const id = btn.dataset.id;
      if (!confirm('Remove this item?')) return;
      cart = cart.filter(c => c.id !== id);
      saveCart();
      renderOrderTable();
      showToast('Item removed');
    });
  });

  updateCartBadge();
}

if (document.getElementById('orderTable')){
  try { shopData = JSON.parse(localStorage.getItem('shopData') || '{}') || {}; } catch(e){ shopData = {}; }
  try { cart = JSON.parse(localStorage.getItem('cart') || '[]') || []; } catch(e){ cart = []; }

  document.getElementById('infoDate').textContent = shopData.date || '';
  document.getElementById('infoShop').textContent = shopData.shopName || '';
  document.getElementById('infoContact').textContent = shopData.contact || '';
  document.getElementById('infoAddress').textContent = shopData.address || '';

  const orderNo = (Number(localStorage.getItem('lastOrderNo') || 0) + 1);
  const orderNoEl = document.getElementById('orderNo');
  if (orderNoEl) orderNoEl.textContent = orderNo;
  try { localStorage.setItem('lastOrderNo', orderNo); } catch(e) {}

  renderOrderTable();

  document.getElementById('orderNow')?.addEventListener('click', () => generateExcelAndWhatsApp());
  document.getElementById('clearCart')?.addEventListener('click', () => {
    if (confirm('Do you want to clear all items?')) {
      cart = [];
      saveCart();
      renderOrderTable();
    }
  });

  // Show/hide clear button initially
  const clearOrderBtn = document.getElementById('clearCart');
  if (clearOrderBtn) clearOrderBtn.style.display = cart.length ? 'inline-block' : 'none';
}

/* =======================
   Excel + WhatsApp export
======================= */
function generateExcelAndWhatsApp(){
  // refresh saved shopData from localStorage
  try { shopData = JSON.parse(localStorage.getItem('shopData') || '{}') || {}; } catch(e){ shopData = {}; }

  const headerRows = [
    [`Shop Name:`, shopData.shopName || ''],
    [`Address:`, shopData.address || ''],
    [`Date:`, shopData.date || ''],
    []
  ];
  const tableHeader = ["Sr.No","Item","Quantity","Brand","Price"];
  const wsData = [...headerRows, tableHeader];

  cart.forEach((c, idx) => {
    wsData.push([idx+1, c.name, safeParseNumber(c.qty,0), c.brand, safeParseNumber(c.price,0)]);
  });

  // create workbook (SheetJS) if available
  if (window.XLSX) {
    try {
      const wb = XLSX.utils.book_new();
      const ws = XLSX.utils.aoa_to_sheet(wsData);
      XLSX.utils.book_append_sheet(wb, ws, "Order");

      const safeShop = (shopData.shopName || 'Shop').replace(/[^\w\- ]/g,'').replace(/\s+/g,'_') || 'Shop';
      const fileName = `Order_${safeShop}_${(shopData.date || new Date().toISOString().slice(0,10))}.xlsx`;
      XLSX.writeFile(wb, fileName);
    } catch (e) {
      console.error('XLSX write error', e);
      showToast('Failed to generate Excel file');
    }
  } else {
    showToast('Excel library not loaded. Excel will not be generated.');
  }

  // WhatsApp message
  const lines = [
    `Shop: ${shopData.shopName || ''}`,
    `Contact: ${shopData.contact || ''}`,
    `Address: ${shopData.address || ''}`,
    `Date: ${shopData.date || ''}`,
    '',
    'Items:'
  ];
  cart.forEach((c,i) => lines.push(`${i+1}. ${c.name} x ${c.qty} (₹${c.price})`));
  const msg = lines.join('\n');
  const phone = '919503984711'; // your number
  const url = `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;
  window.open(url,'_blank');
}

/* load SheetJS if necessary (only once) */
(function(){
  if (!window.XLSX) {
    const s=document.createElement('script');
    s.src="https://cdn.jsdelivr.net/npm/xlsx@0.18.5/dist/xlsx.full.min.js";
    s.onload = () => { /* loaded */ };
    s.onerror = () => { console.error('Failed to load XLSX library'); };
    document.head.appendChild(s);
  }
})();

/* Ensure UI elements that might be hidden are visible (safety) */
(function ensureButtonsVisible() {
  document.querySelectorAll('button, input[type="number"]').forEach(el => {
    if (el instanceof HTMLElement) {
      el.style.visibility = el.style.visibility || 'visible';
    }
  });
})();