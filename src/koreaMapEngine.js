import { MODERN_CITIES_REGISTRY } from './koreaModernMapData.js';
import { MAP_UI_TRANSLATIONS, CITY_LOCALIZATIONS } from './koreaMapI18n.js';

export const CITIES_DATA = MODERN_CITIES_REGISTRY;

class KoreaMapEngine {
  constructor() {
    this.selectedCityId = 'seoul';
    this.selectedEra = 'joseon';
    this.selectedPreset = 'village';
    this.activeFilter = 'all';
    this.currentLang = 'ko';
    this.showKtx = true;
    this.showExpressways = true;
    this.initialized = false;
  }

  init() {
    if (this.initialized) return;
    this.initialized = true;

    try {
      const savedLang = localStorage.getItem('koreaMapLang');
      if (savedLang && MAP_UI_TRANSLATIONS[savedLang]) {
        this.currentLang = savedLang;
      }
    } catch {
      // Ignore storage access restrictions
    }

    this.bindEvents();
    this.applyLanguage(this.currentLang);
    this.highlightCityPin('seoul');
  }

  getLocalizedCity(cityId) {
    const base = CITIES_DATA[cityId] || CITIES_DATA['seoul'];
    if (this.currentLang === 'ko') {
      const koPin = CITY_LOCALIZATIONS[base.id]?.ko;
      return koPin ? { ...base, ...koPin } : base;
    }
    const loc = CITY_LOCALIZATIONS[base.id]?.[this.currentLang] || {};
    return {
      ...base,
      ...loc
    };
  }

  bindEvents() {
    // Language selector buttons
    const langBtns = document.querySelectorAll('#map-lang-selector .lang-pill');
    langBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const lang = btn.getAttribute('data-lang');
        if (lang && MAP_UI_TRANSLATIONS[lang]) {
          this.setLanguage(lang);
        }
      });
    });

    // City pin clicks on SVG map
    const pins = document.querySelectorAll('.map-city-pin');
    pins.forEach(pin => {
      pin.addEventListener('click', () => {
        const cityId = pin.getAttribute('data-city-id');
        if (cityId && CITIES_DATA[cityId]) {
          this.selectCity(cityId);
        }
      });
    });

    // Province polygon hover and click interaction
    const provinces = document.querySelectorAll('.province-polygon');
    provinces.forEach(prov => {
      prov.addEventListener('click', () => {
        const provId = prov.getAttribute('data-province');
        // Map province to representative city
        const provCityMap = {
          seoul: 'seoul',
          gyeonggi: 'suwon',
          incheon: 'incheon',
          gangwon: 'gangneung',
          chungnam: 'daejeon',
          chungbuk: 'sejong',
          gyeongbuk: 'daegu',
          gyeongnam: 'busan',
          jeonbuk: 'jeonju',
          jeonnam: 'gwangju',
          jeju: 'jeju'
        };
        const targetCity = provCityMap[provId];
        if (targetCity && CITIES_DATA[targetCity]) {
          this.selectCity(targetCity);
        }
      });
    });

    // Region filter buttons
    const filterBtns = document.querySelectorAll('.map-filter-pill');
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.getAttribute('data-filter') || 'all';
        this.filterCities(filter);
      });
    });

    // Layer toggle: KTX rail network
    const ktxToggleBtn = document.getElementById('toggle-layer-ktx');
    if (ktxToggleBtn) {
      ktxToggleBtn.addEventListener('click', () => {
        this.showKtx = !this.showKtx;
        ktxToggleBtn.classList.toggle('active', this.showKtx);
        const ktxLayer = document.getElementById('layer-ktx');
        if (ktxLayer) {
          ktxLayer.style.display = this.showKtx ? 'inline' : 'none';
        }
      });
    }

    // Layer toggle: Expressways
    const roadsToggleBtn = document.getElementById('toggle-layer-roads');
    if (roadsToggleBtn) {
      roadsToggleBtn.addEventListener('click', () => {
        this.showExpressways = !this.showExpressways;
        roadsToggleBtn.classList.toggle('active', this.showExpressways);
        const roadsLayer = document.getElementById('layer-expressways');
        if (roadsLayer) {
          roadsLayer.style.display = this.showExpressways ? 'inline' : 'none';
        }
      });
    }

    // Direct Enter Button on top bar of map
    const directEnterBtn = document.getElementById('map-direct-enter-btn');
    if (directEnterBtn) {
      directEnterBtn.addEventListener('click', () => {
        this.launchStudio('seoul', 'joseon', 'village');
      });
    }

    // Enter Studio CTA Button inside dossier
    const launchBtn = document.getElementById('dossier-launch-btn');
    if (launchBtn) {
      launchBtn.addEventListener('click', () => {
        this.launchStudio(this.selectedCityId, this.selectedEra, this.selectedPreset);
      });
    }
  }

  setLanguage(lang) {
    if (!MAP_UI_TRANSLATIONS[lang]) return;
    this.currentLang = lang;
    try {
      localStorage.setItem('koreaMapLang', lang);
    } catch {
      // Ignore storage restrictions
    }
    this.applyLanguage(lang);
  }

  applyLanguage(lang) {
    const t = MAP_UI_TRANSLATIONS[lang] || MAP_UI_TRANSLATIONS.ko;

    // 1. Active language button
    document.querySelectorAll('#map-lang-selector .lang-pill').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
    });

    // 2. Top bar header & actions
    const mainTitleEl = document.querySelector('[data-i18n="mainTitle"]');
    if (mainTitleEl) mainTitleEl.textContent = t.mainTitle;

    const subTitleEl = document.querySelector('[data-i18n="subTitle"]');
    if (subTitleEl) subTitleEl.textContent = t.subTitle;

    document.querySelectorAll('.map-filter-pill').forEach(pill => {
      const key = pill.getAttribute('data-filter');
      if (key && t.filters[key]) {
        pill.textContent = t.filters[key];
      }
    });

    const ktxBtn = document.getElementById('toggle-layer-ktx');
    if (ktxBtn) ktxBtn.textContent = t.toggles.ktx;

    const roadsBtn = document.getElementById('toggle-layer-roads');
    if (roadsBtn) roadsBtn.textContent = t.toggles.roads;

    const directEnterLabel = document.getElementById('map-direct-enter-label');
    if (directEnterLabel) directEnterLabel.textContent = t.directEnterBtn;

    // 3. SVG map static labels
    const svgMap = {
      'svg-i18n-parallel38': t.svg.parallel38,
      'svg-i18n-westSeaTitle': t.svg.westSeaTitle,
      'svg-i18n-westSeaSub': t.svg.westSeaSub,
      'svg-i18n-eastSeaTitle': t.svg.eastSeaTitle,
      'svg-i18n-eastSeaSub': t.svg.eastSeaSub,
      'svg-i18n-southSeaTitle': t.svg.southSeaTitle,
      'svg-i18n-southSeaSub': t.svg.southSeaSub,
      'svg-i18n-dmzLabel': t.svg.dmzLabel,
      'svg-i18n-hallasan': t.svg.hallasan,
      'svg-i18n-cjuAirport': t.svg.cjuAirport,
      'svg-i18n-ulleungdo': t.svg.ulleungdo,
      'svg-i18n-dokdoTitle': t.svg.dokdoTitle,
      'svg-i18n-icnAirport': t.svg.icnAirport
    };
    Object.entries(svgMap).forEach(([id, text]) => {
      const el = document.getElementById(id);
      if (el) el.textContent = text;
    });

    // Resize DMZ box cleanly around translated text
    const dmzText = document.getElementById('svg-i18n-dmzLabel');
    const dmzBox = document.getElementById('svg-i18n-dmzBox');
    if (dmzText && dmzBox) {
      const len = typeof dmzText.getComputedTextLength === 'function' ? dmzText.getComputedTextLength() : 84;
      const boxW = Math.max(76, Math.ceil(len) + 18);
      dmzBox.setAttribute('width', String(boxW));
      dmzBox.setAttribute('x', String(400 - boxW / 2));
    }

    // 4. SVG city pin labels & dynamic banner box fitting
    const leftAlignedCities = new Set(['incheon', 'gwangju', 'sejong', 'jeonju']);
    document.querySelectorAll('.map-city-pin').forEach(pin => {
      const cityId = pin.getAttribute('data-city-id');
      if (!cityId) return;
      const locCity = this.getLocalizedCity(cityId);
      const pinText = locCity.pinLabel || locCity.nameShort;

      if (cityId === 'seoul') {
        const labelEl = document.getElementById('pin-label-seoul');
        const tagEl = document.getElementById('pin-tag-seoul');
        const tagRectEl = document.getElementById('pin-tag-rect-seoul');
        const outerRectEl = document.getElementById('pin-rect-seoul');
        if (labelEl) labelEl.textContent = pinText;
        if (tagEl) tagEl.textContent = t.svg.seoulPlayTag;
        if (labelEl && tagEl && tagRectEl && outerRectEl) {
          const labelW = typeof labelEl.getComputedTextLength === 'function' ? labelEl.getComputedTextLength() : 90;
          const tagW = typeof tagEl.getComputedTextLength === 'function' ? tagEl.getComputedTextLength() : 66;
          const tagBoxW = Math.max(60, Math.ceil(tagW) + 14);
          const tagX = Math.ceil(10 + labelW + 10);
          tagRectEl.setAttribute('x', String(tagX));
          tagRectEl.setAttribute('width', String(tagBoxW));
          tagEl.setAttribute('x', String(tagX + tagBoxW / 2));
          outerRectEl.setAttribute('width', String(tagX + tagBoxW + 8));
        }
        return;
      }

      const banner = pin.querySelector('.city-label-banner');
      if (!banner) return;
      const textEl = banner.querySelector('text');
      const rectEl = banner.querySelector('rect');
      if (textEl) textEl.textContent = pinText;
      if (textEl && rectEl) {
        const textW = typeof textEl.getComputedTextLength === 'function' ? textEl.getComputedTextLength() : 72;
        const boxW = Math.max(66, Math.ceil(textW) + 18);
        rectEl.setAttribute('width', String(boxW));
        if (leftAlignedCities.has(cityId)) {
          banner.setAttribute('transform', `translate(-${boxW + 8}, 4)`);
        }
      }
    });

    // 5. Footer legend
    document.querySelectorAll('[data-i18n-legend]').forEach(el => {
      const key = el.getAttribute('data-i18n-legend');
      if (key && t.legend[key]) {
        el.textContent = t.legend[key];
      }
    });

    // 6. Re-render active dossier in selected language
    this.renderCityDossier(this.selectedCityId);
  }

  selectCity(cityId) {
    this.selectedCityId = cityId;
    const city = CITIES_DATA[cityId];
    if (!city) return;

    // Reset era to first available
    if (city.eras && city.eras.length > 0) {
      this.selectedEra = city.eras[0].id;
      this.selectedPreset = city.eras[0].preset;
    }

    this.highlightCityPin(cityId);
    this.renderCityDossier(cityId);
  }

  highlightCityPin(cityId) {
    const pins = document.querySelectorAll('.map-city-pin');
    pins.forEach(pin => {
      const isSelected = pin.getAttribute('data-city-id') === cityId;
      pin.classList.toggle('selected', isSelected);
    });
  }

  filterCities(filter) {
    this.activeFilter = filter;
    const pins = document.querySelectorAll('.map-city-pin');
    pins.forEach(pin => {
      const cityId = pin.getAttribute('data-city-id');
      const city = CITIES_DATA[cityId];
      if (!city) return;

      if (filter === 'all' || city.region === filter) {
        pin.style.display = '';
      } else {
        pin.style.display = 'none';
      }
    });
  }

  renderCityDossier(cityId) {
    const city = this.getLocalizedCity(cityId);
    const t = MAP_UI_TRANSLATIONS[this.currentLang] || MAP_UI_TRANSLATIONS.ko;
    const container = document.getElementById('map-city-dossier-content');
    if (!container) return;

    const isSeoul = city.id === 'seoul';

    let erasHtml = '';
    if (city.eras && city.eras.length > 0) {
      erasHtml = `
        <div class="dossier-section">
          <div class="dossier-section-title">${t.dossier.erasTitle}</div>
          <div class="dossier-era-grid">
            ${city.eras.map(era => `
              <button type="button" class="dossier-era-card ${this.selectedEra === era.id ? 'active' : ''}" data-era-id="${era.id}" data-preset-id="${era.preset}">
                <div class="era-card-content">
                  <span class="era-card-title">${era.label}</span>
                  <span class="era-card-sub">${era.sub}</span>
                </div>
                <span class="era-card-arrow">&rarr;</span>
              </button>
            `).join('')}
          </div>
        </div>
      `;
    }

    let statsHtml = '';
    if (city.stats) {
      statsHtml = `
        <div class="dossier-stats-row">
          ${city.stats.map(s => `
            <div class="dossier-stat-item">
              <span class="stat-label">${s.label}</span>
              <span class="stat-value">${s.value}</span>
            </div>
          `).join('')}
        </div>
      `;
    }

    let ktxPillsHtml = '';
    if (city.ktx && city.ktx.length > 0) {
      ktxPillsHtml = `
        <div class="dossier-section">
          <div class="dossier-section-title">${t.dossier.transitTitle}</div>
          <div class="dossier-transit-tags">
            ${city.ktx.map(k => `<span class="transit-tag ktx">🚆 ${k}</span>`).join('')}
            ${city.airports ? city.airports.map(a => `<span class="transit-tag airport">✈️ ${a}</span>`).join('') : ''}
          </div>
        </div>
      `;
    }

    let quickPresetsHtml = '';
    if (city.presets && city.presets.length > 0) {
      quickPresetsHtml = `
        <div class="dossier-section">
          <div class="dossier-section-title">${t.dossier.presetsTitle}</div>
          <div class="dossier-preset-pills">
            ${city.presets.map(p => `
              <button type="button" class="dossier-preset-pill ${this.selectedPreset === p.id ? 'active' : ''}" data-era-id="${p.era}" data-preset-id="${p.id}">
                ${p.label}
              </button>
            `).join('')}
          </div>
        </div>
      `;
    }

    container.innerHTML = `
      <div class="dossier-header">
        <div class="dossier-badge-row">
          <span class="dossier-badge ${isSeoul ? 'gold' : 'blue'}">${city.statusBadge}</span>
          <span class="dossier-tier-badge">${city.tier}</span>
        </div>
        <h2 class="dossier-title">
          <span class="dossier-icon">${city.icon}</span> ${city.name}
        </h2>
        <div class="dossier-sub">${city.hanja} &bull; ${city.regionName} &bull; ${t.dossier.populationLabel} ${city.population || '-'} (${city.area || ''})</div>
      </div>

      <div class="dossier-tagline">${city.tagline}</div>
      <p class="dossier-desc">${city.desc}</p>

      ${statsHtml}
      ${ktxPillsHtml}
      ${erasHtml}
      ${quickPresetsHtml}
    `;

    // Re-bind era card clicks
    const eraCards = container.querySelectorAll('.dossier-era-card');
    eraCards.forEach(card => {
      card.addEventListener('click', () => {
        eraCards.forEach(c => c.classList.remove('active'));
        card.classList.add('active');
        this.selectedEra = card.getAttribute('data-era-id');
        this.selectedPreset = card.getAttribute('data-preset-id');
      });
    });

    // Re-bind preset pill clicks
    const presetPills = container.querySelectorAll('.dossier-preset-pill');
    presetPills.forEach(pill => {
      pill.addEventListener('click', () => {
        presetPills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        this.selectedEra = pill.getAttribute('data-era-id');
        this.selectedPreset = pill.getAttribute('data-preset-id');
        // Auto launch on direct preset pill click
        this.launchStudio(this.selectedCityId, this.selectedEra, this.selectedPreset);
      });
    });

    // Update launch button text
    const launchBtn = document.getElementById('dossier-launch-btn');
    if (launchBtn) {
      launchBtn.innerHTML = `<span>${city.nameShort} ${t.dossier.launchSuffix}</span> <span class="arrow-icon">&rarr;</span>`;
    }
  }

  launchStudio(cityId, eraId, presetId) {
    const mapScreen = document.getElementById('korea-map-screen');
    const studioScreen = document.getElementById('studio-screen');

    if (!mapScreen || !studioScreen) return;

    // Apply Era and Preset in studio engine
    if (window.__studioController) {
      window.__studioController.enterStudio(eraId || 'joseon', presetId || 'village');
    }

    // Cinematic fade-zoom transition
    mapScreen.classList.add('fade-out');
    studioScreen.classList.add('active');

    setTimeout(() => {
      mapScreen.style.display = 'none';
      mapScreen.classList.remove('fade-out');

      if (window.__studioController) {
        window.__studioController.resizeCanvas();
        window.__studioController.centerCamera();
        window.__studioController.requestRender();
      }
    }, 450);
  }

  returnToMap() {
    const mapScreen = document.getElementById('korea-map-screen');
    const studioScreen = document.getElementById('studio-screen');

    if (!mapScreen || !studioScreen) return;

    mapScreen.style.display = 'flex';
    mapScreen.classList.add('fade-in');
    studioScreen.classList.remove('active');

    setTimeout(() => {
      mapScreen.classList.remove('fade-in');
    }, 400);
  }
}

export const koreaMapEngine = new KoreaMapEngine();

// Global helper for studio top bar back button
window.showKoreaIntroMap = function() {
  koreaMapEngine.returnToMap();
};
