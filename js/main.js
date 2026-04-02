const STORAGE_THEME_KEY = 'lapunta_theme';

const business = {
  hours: 'Todos los días, 12:00pm - 10:00pm',
  whatsappNumber: '5350000000',
};

const menuItems = [
  {
    name: 'Filete de Salmón',
    description: 'Salmón fresco al horno con guarnición de temporada.',
    price: '2160 CUP',
    tag: 'Mar',
    image: 'Filete de Salmon 2160 CUP.jpg',
  },
  {
    name: 'Fajas de Pollo',
    description: 'Fajas de pollo tiernas con salsa especial.',
    price: '840 CUP',
    tag: 'Pollo',
    image: 'Fajas de pollo 840 CUP.jpg',
  },
  {
    name: 'Pollo Asado',
    description: 'Pollo asado con hierbas y acompañamiento.',
    price: '720 CUP',
    tag: 'Pollo',
    image: 'Pollo Azado 720 CUP.jpg',
  },
  {
    name: 'Arroz con Vegetales',
    description: 'Arroz salteado con vegetales frescos de la zona.',
    price: '240 CUP',
    tag: 'Vegetariano',
    image: 'Arroz con vegetales.jpg',
  },
  {
    name: 'Ensalada de Vegetales',
    description: 'Ensalada fresca con vegetales locales y aderezo casero.',
    price: '240 CUP',
    tag: 'Vegetariano',
    image: 'Ensalada de Vegetales 240 CUP.jpg',
  },
  {
    name: 'Pulpo Enchilado',
    description: 'Pulpo fresco con salsa enchilada picante, especialidad de la casa.',
    price: '--- CUP',
    tag: 'Mar',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=800&q=80',
  },
];

const drinkCategories = [
  {
    name: 'Cocteles',
    items: [
      { name: 'Mojito', price: '--- CUP' },
      { name: 'Daiquirí', price: '--- CUP' },
      { name: 'Cuba Libre', price: '--- CUP' },
    ],
  },
  {
    name: 'Cervezas',
    items: [
      { name: 'Bucanero', price: '--- CUP' },
      { name: 'Cristal', price: '--- CUP' },
    ],
  },
  {
    name: 'Rones',
    items: [
      { name: 'Ron añejo', price: '--- CUP' },
      { name: 'Ron reserva', price: '--- CUP' },
    ],
  },
  {
    name: 'Sin alcohol',
    items: [
      { name: 'Refresco', price: '--- CUP' },
      { name: 'Agua', price: '--- CUP' },
      { name: 'Jugo natural', price: '--- CUP' },
    ],
  },
];

function setTheme(theme) {
  const html = document.documentElement;

  if (theme === 'light') {
    html.setAttribute('data-theme', 'light');
  } else {
    html.removeAttribute('data-theme');
  }

  localStorage.setItem(STORAGE_THEME_KEY, theme);
  updateThemeToggleText(theme);
}

function getTheme() {
  return localStorage.getItem(STORAGE_THEME_KEY) || 'dark';
}

function updateThemeToggleText(theme) {
  const toggle = document.getElementById('themeToggle');
  if (!toggle) return;

  const icon = toggle.querySelector('.theme-toggle-icon');
  const text = toggle.querySelector('.theme-toggle-text');

  if (theme === 'light') {
    if (icon) icon.textContent = '☀';
    if (text) text.textContent = 'Modo claro';
  } else {
    if (icon) icon.textContent = '☾';
    if (text) text.textContent = 'Modo oscuro';
  }
}

function initTheme() {
  setTheme(getTheme());

  const toggle = document.getElementById('themeToggle');
  if (!toggle) return;

  toggle.addEventListener('click', () => {
    const next = getTheme() === 'light' ? 'dark' : 'light';
    setTheme(next);
  });
}

function initNav() {
  const navToggle = document.getElementById('navToggle');
  const siteNav = document.getElementById('siteNav');

  if (!navToggle || !siteNav) return;

  navToggle.addEventListener('click', () => {
    const isOpen = siteNav.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  siteNav.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', () => {
      if (siteNav.classList.contains('is-open')) {
        siteNav.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  });
}

function renderMenu() {
  const grid = document.getElementById('menuGrid');
  if (!grid) return;

  grid.innerHTML = menuItems
    .map((item) => {
      const imageHtml = item.image
        ? `<div class="card-media"><img src="${escapeHtml(item.image)}" alt="${escapeHtml(item.name)}" loading="lazy" /></div>`
        : '';
      const tagHtml = item.tag ? `<span class="tag">${escapeHtml(item.tag)}</span>` : '';
      return `
        <article class="card">
          ${imageHtml}
          <div class="card-body">
            <h3 class="card-title">${escapeHtml(item.name)}</h3>
            <p class="card-meta">${escapeHtml(item.description)}</p>
            <div class="card-row">
              ${tagHtml}
              <span class="price">${escapeHtml(item.price)}</span>
            </div>
          </div>
        </article>
      `;
    })
    .join('');
}

function renderDrinks() {
  const grid = document.getElementById('drinksGrid');
  if (!grid) return;

  grid.innerHTML = drinkCategories
    .map((category) => {
      const list = category.items
        .map((drink) => {
          return `
            <li class="drink-item">
              <span class="drink-name">${escapeHtml(drink.name)}</span>
              <span class="drink-price">${escapeHtml(drink.price)}</span>
            </li>
          `;
        })
        .join('');

      return `
        <div class="drink-card">
          <h3>${escapeHtml(category.name)}</h3>
          <ul class="drink-list">${list}</ul>
        </div>
      `;
    })
    .join('');
}

function initBusinessInfo() {
  const hoursEl = document.getElementById('businessHours');
  if (hoursEl) hoursEl.textContent = business.hours;

  const wa = `https://wa.me/${business.whatsappNumber}`;

  const waLink = document.getElementById('whatsAppLink');
  if (waLink) {
    waLink.href = wa;
    waLink.textContent = `+${business.whatsappNumber}`;
  }

  const waFloat = document.getElementById('waFloat');
  if (waFloat) waFloat.href = wa;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function main() {
  initTheme();
  initNav();
  initBusinessInfo();
  renderMenu();
  renderDrinks();
}

document.addEventListener('DOMContentLoaded', main);
