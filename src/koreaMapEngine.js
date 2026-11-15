import { MODERN_CITIES_REGISTRY } from './koreaModernMapData.js';
import { MAP_LANGUAGES, MAP_UI_TRANSLATIONS, CITY_LOCALIZATIONS } from './koreaMapI18n.js';

export const CITIES_DATA = MODERN_CITIES_REGISTRY;

class KoreaMapEngine {
  constructor() {
    this.selectedCityId = 'seoul';
    this.selectedEra = 'joseon';
    this.selectedPreset = 'village';
    this.activeFilter = 'all';
    this.currentLang = 'ko';
    this.currentTheme = 'dark';
    this.showKtx = true;
    this.showExpressways = true;
    this.showParks = true;
    this.isLnbOpen = false;
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
      const savedTheme = localStorage.getItem('appTheme');
      if (savedTheme === 'light' || savedTheme === 'dark') {
        this.currentTheme = savedTheme;
      }
    } catch {
      // Ignore storage access restrictions
    }

    this.applyTheme(this.currentTheme);
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

  openLnb(focusSectionId) {
    const drawer = document.getElementById('map-lnb-offcanvas');
    const backdrop = document.getElementById('map-lnb-backdrop');
    const openBtn = document.getElementById('lnb-open-btn');
    if (!drawer) return;

    this.isLnbOpen = true;
    drawer.classList.add('open');
    if (backdrop) backdrop.classList.add('visible');
    if (openBtn) openBtn.setAttribute('aria-expanded', 'true');

    if (focusSectionId) {
      const target = document.getElementById(focusSectionId);
      if (target) {
        setTimeout(() => {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 80);
      }
    }
  }

  closeLnb() {
    const drawer = document.getElementById('map-lnb-offcanvas');
    const backdrop = document.getElementById('map-lnb-backdrop');
    const openBtn = document.getElementById('lnb-open-btn');
    if (!drawer) return;

    this.isLnbOpen = false;
    drawer.classList.remove('open');
    if (backdrop) backdrop.classList.remove('visible');
    if (openBtn) openBtn.setAttribute('aria-expanded', 'false');
  }

  toggleLnb() {
    if (this.isLnbOpen) {
      this.closeLnb();
    } else {
      this.openLnb();
    }
  }

  bindEvents() {
    // LNB Offcanvas open/close triggers
    const openBtn = document.getElementById('lnb-open-btn');
    if (openBtn) {
      openBtn.addEventListener('click', () => this.toggleLnb());
    }

    const closeBtn = document.getElementById('lnb-close-btn');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => this.closeLnb());
    }

    const backdrop = document.getElementById('map-lnb-backdrop');
    if (backdrop) {
      backdrop.addEventListener('click', () => this.closeLnb());
    }

    const contextCrumb = document.getElementById('map-context-crumb');
    if (contextCrumb) {
      contextCrumb.addEventListener('click', () => this.openLnb());
    }

    // Left quick-rail buttons open offcanvas & focus target section
    document.querySelectorAll('.rail-icon-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const targetId = btn.getAttribute('data-lnb-target');
        this.openLnb(targetId);
      });
    });

    // Escape closes offcanvas
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isLnbOpen) {
        this.closeLnb();
      }
    });

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

    // Theme toggle buttons (Map Top Bar, Studio Top Bar, and LNB Drawer)
    const mapThemeBtn = document.getElementById('map-theme-toggle');
    if (mapThemeBtn) {
      mapThemeBtn.addEventListener('click', () => this.toggleTheme());
    }

    const studioThemeBtn = document.getElementById('studio-theme-toggle');
    if (studioThemeBtn) {
      studioThemeBtn.addEventListener('click', () => this.toggleTheme());
    }

    document.querySelectorAll('#map-theme-selector .theme-choice-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const choice = btn.getAttribute('data-theme-choice');
        if (choice === 'light' || choice === 'dark') {
          this.setTheme(choice);
        }
      });
    });

    // City & National Park pin clicks on SVG map
    const pins = document.querySelectorAll('.map-city-pin');
    pins.forEach(pin => {
      pin.addEventListener('click', () => {
        const cityId = pin.getAttribute('data-city-id');
        if (cityId && CITIES_DATA[cityId]) {
          this.selectCity(cityId);
        }
      });
    });

    // Byeonsanbando National Park polygon click
    const byeonsanPoly = document.getElementById('park-byeonsan-poly');
    if (byeonsanPoly) {
      byeonsanPoly.addEventListener('click', () => {
        this.selectCity('byeonsan');
      });
    }

    // Province polygon click interaction
    const provinces = document.querySelectorAll('.province-polygon');
    provinces.forEach(prov => {
      prov.addEventListener('click', () => {
        const provId = prov.getAttribute('data-province');
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

    // Region filter buttons in LNB
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
        ktxToggleBtn.setAttribute('aria-pressed', String(this.showKtx));
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
        roadsToggleBtn.setAttribute('aria-pressed', String(this.showExpressways));
        const roadsLayer = document.getElementById('layer-expressways');
        if (roadsLayer) {
          roadsLayer.style.display = this.showExpressways ? 'inline' : 'none';
        }
      });
    }

    // Layer toggle: National Parks
    const parksToggleBtn = document.getElementById('toggle-layer-parks');
    if (parksToggleBtn) {
      parksToggleBtn.addEventListener('click', () => {
        this.showParks = !this.showParks;
        parksToggleBtn.classList.toggle('active', this.showParks);
        parksToggleBtn.setAttribute('aria-pressed', String(this.showParks));
        const parksLayer = document.getElementById('layer-parks');
        if (parksLayer) {
          parksLayer.style.display = this.showParks ? 'inline' : 'none';
        }
        document.querySelectorAll('.map-city-pin.park-pin').forEach(pin => {
          const cityId = pin.getAttribute('data-city-id');
          const city = CITIES_DATA[cityId];
          const matchesRegion = this.activeFilter === 'all' || (city && city.region === this.activeFilter);
          pin.style.display = this.showParks && matchesRegion ? '' : 'none';
        });
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

    // 2. Top bar & LNB header labels
    document.querySelectorAll('[data-i18n="mainTitle"]').forEach(el => {
      el.textContent = t.mainTitle;
    });

    const menuLabelEl = document.getElementById('lnb-trigger-label');
    if (menuLabelEl && t.menuBtn) menuLabelEl.textContent = t.menuBtn;

    const directEnterLabel = document.getElementById('map-direct-enter-label');
    if (directEnterLabel) directEnterLabel.textContent = t.directEnterBtn;

    // LNB headings & rail captions
    if (t.lnb) {
      document.querySelectorAll('[data-i18n-lnb]').forEach(el => {
        const key = el.getAttribute('data-i18n-lnb');
        if (key && t.lnb[key]) {
          el.textContent = t.lnb[key];
        }
      });
    }

    // Region filter pills inside LNB
    document.querySelectorAll('.map-filter-pill').forEach(pill => {
      const key = pill.getAttribute('data-filter');
      const labelSpan = pill.querySelector('.lnb-nav-label');
      if (key && t.filters[key]) {
        if (labelSpan) {
          labelSpan.textContent = t.filters[key];
        } else {
          pill.textContent = t.filters[key];
        }
      }
    });

    // Layer toggle labels inside LNB
    const ktxLabel = document.getElementById('toggle-label-ktx');
    if (ktxLabel) ktxLabel.textContent = t.toggles.ktx;

    const roadsLabel = document.getElementById('toggle-label-roads');
    if (roadsLabel) roadsLabel.textContent = t.toggles.roads;

    const parksLabel = document.getElementById('toggle-label-parks');
    if (parksLabel && t.toggles.parks) parksLabel.textContent = t.toggles.parks;

    // Theme labels (5-language localized)
    this.syncThemeLabels(lang);

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

    const dmzText = document.getElementById('svg-i18n-dmzLabel');
    const dmzBox = document.getElementById('svg-i18n-dmzBox');
    if (dmzText && dmzBox) {
      const len = typeof dmzText.getComputedTextLength === 'function' ? dmzText.getComputedTextLength() : 84;
      const boxW = Math.max(76, Math.ceil(len) + 18);
      dmzBox.setAttribute('width', String(boxW));
      dmzBox.setAttribute('x', String(400 - boxW / 2));
    }

    // 4. SVG city & national park pin labels & dynamic banner box fitting
    const leftAlignedCities = new Set(['incheon', 'gwangju', 'sejong', 'byeonsan']);
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
        const textW = typeof textEl.getComputedTextLength === 'function' ? textEl.getComputedTextLength() : 76;
        const boxW = Math.max(66, Math.ceil(textW) + 18);
        rectEl.setAttribute('width', String(boxW));
        if (leftAlignedCities.has(cityId)) {
          banner.setAttribute('transform', `translate(-${boxW + 8}, 4)`);
        } else {
          banner.setAttribute('transform', 'translate(14, 4)');
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

    // 6. Re-render LNB directory, top context crumb, and dossier
    this.renderLnbDirectory();
    this.updateContextBreadcrumb();
    this.renderCityDossier(this.selectedCityId);
  }

  setTheme(theme) {
    if (theme !== 'light' && theme !== 'dark') return;
    this.currentTheme = theme;
    try {
      localStorage.setItem('appTheme', theme);
    } catch {
      // Ignore storage restrictions
    }
    this.applyTheme(theme);
  }

  toggleTheme() {
    const nextTheme = this.currentTheme === 'light' ? 'dark' : 'light';
    this.setTheme(nextTheme);
  }

  applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    this.syncThemeLabels(this.currentLang);
  }

  syncThemeLabels(lang) {
    const t = MAP_UI_TRANSLATIONS[lang] || MAP_UI_TRANSLATIONS.ko;
    const themeMeta = t.theme || MAP_UI_TRANSLATIONS.ko.theme;
    const isLight = this.currentTheme === 'light';

    const mapToggleBtn = document.getElementById('map-theme-toggle');
    const mapToggleLabel = document.getElementById('map-theme-toggle-label');
    if (mapToggleLabel) {
      mapToggleLabel.textContent = isLight ? themeMeta.lightShort : themeMeta.darkShort;
    }
    if (mapToggleBtn) {
      mapToggleBtn.setAttribute('title', themeMeta.toggleTitle);
      mapToggleBtn.setAttribute('aria-label', themeMeta.toggleTitle);
      mapToggleBtn.setAttribute('aria-pressed', String(isLight));
    }

    const studioToggleBtn = document.getElementById('studio-theme-toggle');
    if (studioToggleBtn) {
      studioToggleBtn.textContent = isLight ? themeMeta.lightShort : themeMeta.darkShort;
      studioToggleBtn.setAttribute('title', themeMeta.toggleTitle);
      studioToggleBtn.setAttribute('aria-pressed', String(!isLight));
    }

    const lnbLightBtn = document.getElementById('lnb-theme-light');
    const lnbDarkBtn = document.getElementById('lnb-theme-dark');
    if (lnbLightBtn) {
      lnbLightBtn.textContent = themeMeta.lightFull;
      lnbLightBtn.classList.toggle('active', isLight);
      lnbLightBtn.setAttribute('aria-pressed', String(isLight));
    }
    if (lnbDarkBtn) {
      lnbDarkBtn.textContent = themeMeta.darkFull;
      lnbDarkBtn.classList.toggle('active', !isLight);
      lnbDarkBtn.setAttribute('aria-pressed', String(!isLight));
    }
  }

  updateContextBreadcrumb() {
    const t = MAP_UI_TRANSLATIONS[this.currentLang] || MAP_UI_TRANSLATIONS.ko;
    const locCity = this.getLocalizedCity(this.selectedCityId);
    const langMeta = MAP_LANGUAGES.find(l => l.code === this.currentLang) || MAP_LANGUAGES[0];

    const regionEl = document.getElementById('crumb-region');
    const cityEl = document.getElementById('crumb-city');
    const langEl = document.getElementById('crumb-lang');

    if (regionEl) regionEl.textContent = t.filters[this.activeFilter] || t.filters.all;
    if (cityEl) cityEl.textContent = locCity.nameShort;
    if (langEl) langEl.textContent = `${langMeta.flag} ${langMeta.label}`;
  }

  renderLnbDirectory() {
    const container = document.getElementById('lnb-city-directory');
    if (!container) return;

    const cities = Object.values(CITIES_DATA).filter(c => this.activeFilter === 'all' || c.region === this.activeFilter);
    container.innerHTML = cities.map(c => {
      const loc = this.getLocalizedCity(c.id);
      const isSelected = c.id === this.selectedCityId;
      const isPark = c.category === 'park';
      return `
        <button type="button" class="lnb-dir-item ${isSelected ? 'active' : ''} ${isPark ? 'is-park' : ''}" data-city-id="${c.id}">
          <span class="dir-item-icon">${c.icon}</span>
          <span class="dir-item-text">
            <span class="dir-item-name">${loc.nameShort}</span>
            <span class="dir-item-sub">${loc.regionName}</span>
          </span>
        </button>
      `;
    }).join('');

    container.querySelectorAll('.lnb-dir-item').forEach(btn => {
      btn.addEventListener('click', () => {
        const cityId = btn.getAttribute('data-city-id');
        if (cityId && CITIES_DATA[cityId]) {
          this.selectCity(cityId);
          this.closeLnb();
        }
      });
    });
  }

  selectCity(cityId) {
    this.selectedCityId = cityId;
    const city = CITIES_DATA[cityId];
    if (!city) return;

    if (city.eras && city.eras.length > 0) {
      this.selectedEra = city.eras[0].id;
      this.selectedPreset = city.eras[0].preset;
    }

    this.highlightCityPin(cityId);
    this.renderLnbDirectory();
    this.updateContextBreadcrumb();
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

      const hiddenByParkToggle = pin.classList.contains('park-pin') && !this.showParks;
      if (!hiddenByParkToggle && (filter === 'all' || city.region === filter)) {
        pin.style.display = '';
      } else {
        pin.style.display = 'none';
      }
    });

    this.renderLnbDirectory();
    this.updateContextBreadcrumb();
  }

  renderCityDossier(cityId) {
    const city = this.getLocalizedCity(cityId);
    const t = MAP_UI_TRANSLATIONS[this.currentLang] || MAP_UI_TRANSLATIONS.ko;
    const container = document.getElementById('map-city-dossier-content');
    if (!container) return;

    const isSeoul = city.id === 'seoul';
    const isPark = city.category === 'park';
    const badgeVariant = isSeoul ? 'gold' : (isPark ? 'emerald' : 'blue');

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
        <div class="dossier-meta-line">
          <span class="dossier-status-text ${badgeVariant}">${city.statusBadge}</span>
          <span aria-hidden="true">·</span>
          <span>${city.tier}</span>
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

    const eraCards = container.querySelectorAll('.dossier-era-card');
    eraCards.forEach(card => {
      card.addEventListener('click', () => {
        eraCards.forEach(c => c.classList.remove('active'));
        card.classList.add('active');
        this.selectedEra = card.getAttribute('data-era-id');
        this.selectedPreset = card.getAttribute('data-preset-id');
      });
    });

    const presetPills = container.querySelectorAll('.dossier-preset-pill');
    presetPills.forEach(pill => {
      pill.addEventListener('click', () => {
        presetPills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        this.selectedEra = pill.getAttribute('data-era-id');
        this.selectedPreset = pill.getAttribute('data-preset-id');
        this.launchStudio(this.selectedCityId, this.selectedEra, this.selectedPreset);
      });
    });

    const launchBtn = document.getElementById('dossier-launch-btn');
    if (launchBtn) {
      launchBtn.innerHTML = `<span>${city.nameShort} ${t.dossier.launchSuffix}</span> <span class="arrow-icon">&rarr;</span>`;
    }
  }

  launchStudio(cityId, eraId, presetId) {
    const mapScreen = document.getElementById('korea-map-screen');
    const studioScreen = document.getElementById('studio-screen');

    if (!mapScreen || !studioScreen) return;

    if (this.isLnbOpen) {
      this.closeLnb();
    }

    if (window.__studioController) {
      window.__studioController.enterStudio(eraId || 'joseon', presetId || 'village');
    }

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

window.showKoreaIntroMap = function() {
  koreaMapEngine.returnToMap();
};
