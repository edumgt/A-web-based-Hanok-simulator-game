import { MODERN_CITIES_REGISTRY } from './koreaModernMapData.js';

export const CITIES_DATA = MODERN_CITIES_REGISTRY;

class KoreaMapEngine {
  constructor() {
    this.selectedCityId = 'seoul';
    this.selectedEra = 'joseon';
    this.selectedPreset = 'village';
    this.activeFilter = 'all';
    this.showKtx = true;
    this.showExpressways = true;
    this.initialized = false;
  }

  init() {
    if (this.initialized) return;
    this.initialized = true;

    this.bindEvents();
    this.renderCityDossier('seoul');
    this.highlightCityPin('seoul');
  }

  bindEvents() {
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
    const city = CITIES_DATA[cityId] || CITIES_DATA['seoul'];
    const container = document.getElementById('map-city-dossier-content');
    if (!container) return;

    const isSeoul = city.id === 'seoul';

    let erasHtml = '';
    if (city.eras && city.eras.length > 0) {
      erasHtml = `
        <div class="dossier-section">
          <div class="dossier-section-title">선택 가능한 시대 & 테마</div>
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
          <div class="dossier-section-title">고속철도 및 모빌리티 연계</div>
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
          <div class="dossier-section-title">추천 16×16 레이아웃 프리셋으로 바로 시작</div>
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
        <div class="dossier-sub">${city.hanja} &bull; ${city.regionName} &bull; 인구 ${city.population || '집계중'} (${city.area || ''})</div>
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
      launchBtn.innerHTML = `<span>${city.nameShort} 16×16 스튜디오 입장하기</span> <span class="arrow-icon">&rarr;</span>`;
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
