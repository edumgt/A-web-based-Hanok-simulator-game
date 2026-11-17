/**
 * Elaborate Modern Korea Map Markup & Modern Vector GIS Template
 * Restructured with a slim 3-zone Top Bar + Left Rail + LNB Offcanvas Navigation UX,
 * featuring Byeonsanbando National Park, 17 modern administrative boundaries,
 * KTX/SRT high-speed rail lines, expressways, airport hubs, Dokdo/Ulleungdo, and DMZ.
 */

export const KOREA_MAP_MARKUP = `
<!-- Elaborate Modern Korea Map Intro Screen -->
<div id="korea-map-screen" class="korea-map-screen modern-gis-theme">
  <!-- Slim 3-Zone Top App Bar -->
  <header class="map-top-bar">
    <div class="map-top-left">
      <button type="button" class="lnb-trigger-btn" id="lnb-open-btn" aria-label="Open Navigation Menu" aria-expanded="false" aria-controls="map-lnb-offcanvas">
        <svg viewBox="0 0 20 20" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round">
          <line x1="3" y1="5" x2="17" y2="5"/>
          <line x1="3" y1="10" x2="17" y2="10"/>
          <line x1="3" y1="15" x2="17" y2="15"/>
        </svg>
        <span id="lnb-trigger-label">탐색 메뉴</span>
      </button>
      <div class="top-bar-sep" aria-hidden="true"></div>
      <h1 class="map-main-title" data-i18n="mainTitle">대한민국 현대 전도</h1>
    </div>

    <!-- Center: Quiet Breadcrumb Context (opens LNB on click) -->
    <button type="button" class="map-context-crumb" id="map-context-crumb" title="탐색 메뉴 열기">
      <span id="crumb-region">전국 전체</span>
      <span class="crumb-dot" aria-hidden="true">·</span>
      <span id="crumb-city">서울특별시</span>
      <span class="crumb-dot" aria-hidden="true">·</span>
      <span id="crumb-lang">한국어</span>
    </button>

    <!-- Right: Theme Toggle & Primary Action -->
    <div class="map-top-right">
      <button type="button" class="theme-toggle-btn" id="map-theme-toggle" title="화이트 / 다크 모드 전환" aria-label="화이트 / 다크 모드 전환">
        <span class="theme-toggle-label" id="map-theme-toggle-label">🌙 다크</span>
      </button>
      <button type="button" class="map-direct-enter-btn" id="map-direct-enter-btn">
        <span id="map-direct-enter-label">서울 스튜디오 입장 &rarr;</span>
      </button>
    </div>
  </header>

  <!-- Main Workspace Shell: Left Rail + Offcanvas LNB + Map Viewport + Dossier -->
  <div class="map-content-layout">
    <!-- Compact Left Quick Rail (Desktop) -->
    <nav class="map-lnb-rail" aria-label="Quick Map Navigation">
      <button type="button" class="rail-icon-btn" data-lnb-target="lnb-sec-regions" title="권역 탐색">
        <svg class="rail-svg" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"/>
          <line x1="9" y1="3" x2="9" y2="18"/>
          <line x1="15" y1="6" x2="15" y2="21"/>
        </svg>
        <span class="rail-caption" data-i18n-lnb="railRegions">권역</span>
      </button>
      <button type="button" class="rail-icon-btn" data-lnb-target="lnb-sec-directory" title="주요 도시 및 국립공원">
        <svg class="rail-svg" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M12 21s-6-5.33-6-10a6 6 0 1 1 12 0c0 4.67-6 10-6 10z"/>
          <circle cx="12" cy="11" r="2.2"/>
        </svg>
        <span class="rail-caption" data-i18n-lnb="railPlaces">명소</span>
      </button>
      <button type="button" class="rail-icon-btn" data-lnb-target="lnb-sec-studios" title="각 지역 스튜디오 바로가기">
        <svg class="rail-svg" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
          <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
          <line x1="12" y1="22.08" x2="12" y2="12"/>
        </svg>
        <span class="rail-caption" data-i18n-lnb="railStudios">스튜디오</span>
      </button>
      <button type="button" class="rail-icon-btn" data-lnb-target="lnb-sec-layers" title="지도 인프라 레이어">
        <svg class="rail-svg" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <polygon points="12 2 2 7 12 12 22 7 12 2"/>
          <polyline points="2 12 12 17 22 12"/>
          <polyline points="2 17 12 22 22 17"/>
        </svg>
        <span class="rail-caption" data-i18n-lnb="railLayers">레이어</span>
      </button>
      <button type="button" class="rail-icon-btn" data-lnb-target="lnb-sec-language" title="언어 설정">
        <svg class="rail-svg" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <circle cx="12" cy="12" r="9.5"/>
          <line x1="2.5" y1="12" x2="21.5" y2="12"/>
          <path d="M12 2.5a14 14 0 0 1 0 19 14 14 0 0 1 0-19z"/>
        </svg>
        <span class="rail-caption" data-i18n-lnb="railLang">언어</span>
      </button>
      <button type="button" class="rail-icon-btn" data-lnb-target="lnb-sec-theme" title="화면 테마">
        <svg class="rail-svg" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <circle cx="12" cy="12" r="9"/>
          <path d="M12 3v18"/>
          <path d="M12 3a9 9 0 0 1 0 18z" fill="currentColor" opacity="0.22"/>
        </svg>
        <span class="rail-caption" data-i18n-lnb="railTheme">테마</span>
      </button>
    </nav>

    <!-- Offcanvas Backdrop Scrim -->
    <div class="map-lnb-backdrop" id="map-lnb-backdrop" aria-hidden="true"></div>

    <!-- Left Navigation Bar (LNB) Offcanvas Drawer -->
    <aside id="map-lnb-offcanvas" class="map-lnb-offcanvas" role="dialog" aria-modal="true" aria-label="Navigation Drawer">
      <div class="lnb-header">
        <div class="lnb-brand-block">
          <div class="lnb-brand-title" data-i18n="mainTitle">대한민국 현대 전도</div>
          <div class="lnb-brand-sub" data-i18n-lnb="brandSub">국토 공간 아틀라스</div>
        </div>
        <button type="button" class="lnb-close-btn" id="lnb-close-btn" aria-label="Close Menu">&times;</button>
      </div>

      <div class="lnb-search-wrap">
        <svg class="lnb-search-icon" viewBox="0 0 20 20" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true">
          <circle cx="8.5" cy="8.5" r="5.5"/>
          <line x1="12.5" y1="12.5" x2="17" y2="17"/>
        </svg>
        <input type="search" id="lnb-search-input" class="lnb-search-input" placeholder="도시 · 국립공원 검색..." autocomplete="off" />
        <button type="button" id="lnb-search-clear" class="lnb-search-clear" aria-label="Clear search" hidden>&times;</button>
      </div>

      <div class="lnb-scroll-body">
        <!-- LNB Section 1: Region Filters -->
        <section class="lnb-section" id="lnb-sec-regions">
          <h2 class="lnb-section-heading" data-i18n-lnb="regionTitle">권역 탐색</h2>
          <div class="lnb-nav-list" role="tablist" aria-label="권역 선택">
            <button type="button" class="lnb-nav-item map-filter-pill active" data-filter="all">
              <span class="lnb-nav-label">전국 전체</span>
              <span class="lnb-nav-count">15</span>
            </button>
            <button type="button" class="lnb-nav-item map-filter-pill" data-filter="capital">
              <span class="lnb-nav-label">수도권 (서울·인천·송도·수원)</span>
              <span class="lnb-nav-count">4</span>
            </button>
            <button type="button" class="lnb-nav-item map-filter-pill" data-filter="chungcheong">
              <span class="lnb-nav-label">충청·세종 (대전·세종)</span>
              <span class="lnb-nav-count">2</span>
            </button>
            <button type="button" class="lnb-nav-item map-filter-pill" data-filter="yeongnam">
              <span class="lnb-nav-label">영남권 (부산·대구·경주)</span>
              <span class="lnb-nav-count">3</span>
            </button>
            <button type="button" class="lnb-nav-item map-filter-pill" data-filter="honam">
              <span class="lnb-nav-label">호남권 (광주·전주·변산)</span>
              <span class="lnb-nav-count">3</span>
            </button>
            <button type="button" class="lnb-nav-item map-filter-pill" data-filter="gangwon">
              <span class="lnb-nav-label">강원권 (강릉·원주)</span>
              <span class="lnb-nav-count">1</span>
            </button>
            <button type="button" class="lnb-nav-item map-filter-pill" data-filter="jeju">
              <span class="lnb-nav-label">제주권</span>
              <span class="lnb-nav-count">1</span>
            </button>
            <button type="button" class="lnb-nav-item map-filter-pill" data-filter="north">
              <span class="lnb-nav-label">이북권 (평양)</span>
              <span class="lnb-nav-count">1</span>
            </button>
          </div>
        </section>

        <!-- LNB Section 2: Quick Directory of Cities & National Parks -->
        <section class="lnb-section" id="lnb-sec-directory">
          <h2 class="lnb-section-heading" data-i18n-lnb="directoryTitle">주요 도시 및 국립공원</h2>
          <div class="lnb-directory-list" id="lnb-city-directory">
            <!-- Dynamically populated by koreaMapEngine.js -->
          </div>
        </section>

        <!-- LNB Section 2B: Direct Studio Launch Links -->
        <section class="lnb-section" id="lnb-sec-studios">
          <h2 class="lnb-section-heading" data-i18n-lnb="studioLinksTitle">각 지역 스튜디오 바로가기</h2>
          <div class="lnb-studio-links-list" id="lnb-studio-links">
            <!-- Dynamically populated by koreaMapEngine.js -->
          </div>
        </section>

        <!-- LNB Section 3: Infrastructure & Park Layer Toggles -->
        <section class="lnb-section" id="lnb-sec-layers">
          <h2 class="lnb-section-heading" data-i18n-lnb="layersTitle">지도 인프라 레이어</h2>
          <div class="lnb-toggle-list">
            <button type="button" class="lnb-switch-row active" id="toggle-layer-satellite" aria-pressed="true">
              <span class="switch-label" id="toggle-label-satellite">실사 위성·지형 지도</span>
              <span class="switch-track"><span class="switch-thumb"></span></span>
            </button>
            <button type="button" class="lnb-switch-row active" id="toggle-layer-ktx" aria-pressed="true">
              <span class="switch-label" id="toggle-label-ktx">KTX / SRT 고속철도망</span>
              <span class="switch-track"><span class="switch-thumb"></span></span>
            </button>
            <button type="button" class="lnb-switch-row active" id="toggle-layer-roads" aria-pressed="true">
              <span class="switch-label" id="toggle-label-roads">주요 고속도로망</span>
              <span class="switch-track"><span class="switch-thumb"></span></span>
            </button>
            <button type="button" class="lnb-switch-row active" id="toggle-layer-parks" aria-pressed="true">
              <span class="switch-label" id="toggle-label-parks">국립공원 및 자연보전구역</span>
              <span class="switch-track"><span class="switch-thumb"></span></span>
            </button>
          </div>
        </section>

        <!-- LNB Section 4: 5-Language Switcher -->
        <section class="lnb-section" id="lnb-sec-language">
          <h2 class="lnb-section-heading" data-i18n-lnb="languageTitle">언어 설정</h2>
          <div class="map-lang-selector" id="map-lang-selector" role="group" aria-label="Language Selector">
            <button type="button" class="lang-pill active" data-lang="ko">🇰🇷 한국어</button>
            <button type="button" class="lang-pill" data-lang="en">🇺🇸 English</button>
            <button type="button" class="lang-pill" data-lang="zh">🇨🇳 中文</button>
            <button type="button" class="lang-pill" data-lang="ja">🇯🇵 日本語</button>
            <button type="button" class="lang-pill" data-lang="es">🇪🇸 Español</button>
          </div>
        </section>

        <!-- LNB Section 5: White / Dark Mode Switcher -->
        <section class="lnb-section" id="lnb-sec-theme">
          <h2 class="lnb-section-heading" data-i18n-lnb="themeTitle">화면 테마</h2>
          <div class="map-theme-selector" id="map-theme-selector" role="group" aria-label="Theme Selector">
            <button type="button" class="theme-choice-btn" data-theme-choice="light" id="lnb-theme-light">☀️ 화이트 모드</button>
            <button type="button" class="theme-choice-btn active" data-theme-choice="dark" id="lnb-theme-dark">🌙 다크 모드</button>
          </div>
        </section>
      </div>
    </aside>

    <!-- Center: High-Precision Photorealistic Satellite + Vector GIS Map -->
    <div class="map-viewport-wrap">
      <div class="map-canvas-card">
        <!-- GIS Geodetic Coordinates Readout -->
        <div class="gis-telemetry-corner top-left">
          <span class="telemetry-value">KGD2002 / WGS84</span>
          <span class="telemetry-sub" id="gis-active-coords">37°33'59"N · 126°58'41"E</span>
        </div>

        <div class="gis-telemetry-corner top-right">
          <div class="map-compass-modern" title="사방 방위계">
            <svg viewBox="0 0 54 54" width="46" height="46">
              <circle class="compass-ring" cx="27" cy="27" r="24" stroke-width="1.2"/>
              <path class="compass-north" d="M27 7 L31 24 L27 21 L23 24 Z"/>
              <path class="compass-other" d="M27 47 L31 30 L27 33 L23 30 Z"/>
              <path class="compass-other" d="M7 27 L24 23 L21 27 L24 31 Z"/>
              <path class="compass-other" d="M47 27 L30 23 L33 27 L30 31 Z"/>
              <text class="compass-north-label" x="27" y="6" font-size="6.5" font-weight="bold" text-anchor="middle">N</text>
            </svg>
          </div>
        </div>

        <!-- High Precision Modern Korea Satellite & Vector SVG Map -->
        <svg id="korea-peninsula-svg" class="korea-peninsula-svg modern-svg" viewBox="0 0 860 1000" preserveAspectRatio="xMidYMid meet">
          <defs>
            <!-- Modern Ocean Depth Radial Gradient (Fallback when satellite imagery off) -->
            <radialGradient id="modernOceanGrad" cx="45%" cy="50%" r="65%">
              <stop offset="0%" class="ocean-stop-1"/>
              <stop offset="60%" class="ocean-stop-2"/>
              <stop offset="100%" class="ocean-stop-3"/>
            </radialGradient>

            <!-- Modern Land Gradient (Fallback when satellite imagery off) -->
            <linearGradient id="modernLandGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" class="land-stop-1"/>
              <stop offset="50%" class="land-stop-2"/>
              <stop offset="100%" class="land-stop-3"/>
            </linearGradient>

            <!-- Active Seoul Gold Beacon Glow -->
            <filter id="seoulGoldGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="7" result="blur"/>
              <feColorMatrix type="matrix" values="
                1 0 0 0 0.88
                0 1 0 0 0.70
                0 0 1 0 0.45
                0 0 0 1 0" />
              <feMerge>
                <feMergeNode/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>

          <!-- Vector Fallback Ocean Backdrop -->
          <rect width="860" height="1000" fill="url(#modernOceanGrad)"/>

          <!-- High-Resolution Photorealistic Satellite & Shaded-Relief Raster Layer -->
          <image id="korea-satellite-layer" class="korea-satellite-layer" x="0" y="0" width="860" height="1000" preserveAspectRatio="none"/>

          <!-- Calibrated WGS84 Geographic Graticule (Parallels & Meridians) -->
          <g class="graticule-lines" fill="none" stroke-width="0.75">
            <line x1="0" y1="145" x2="860" y2="145"/>
            <line x1="0" y1="325" x2="860" y2="325"/>
            <line x1="0" y1="505" x2="860" y2="505" stroke-dasharray="4 4"/>
            <line x1="0" y1="685" x2="860" y2="685"/>
            <line x1="0" y1="865" x2="860" y2="865"/>
            <line x1="148" y1="0" x2="148" y2="1000"/>
            <line x1="292" y1="0" x2="292" y2="1000"/>
            <line x1="436" y1="0" x2="436" y2="1000"/>
            <line x1="580" y1="0" x2="580" y2="1000"/>
            <line x1="724" y1="0" x2="724" y2="1000"/>
          </g>

          <!-- Graticule Coordinate Labels -->
          <g class="graticule-labels" font-family="'JetBrains Mono', monospace" font-size="9">
            <text x="20" y="140">42°00'N</text>
            <text x="20" y="320">40°00'N</text>
            <text x="20" y="500" id="svg-i18n-parallel38">38°00'N (38선)</text>
            <text x="20" y="680">36°00'N</text>
            <text x="20" y="860">34°00'N</text>
            <text x="148" y="986" text-anchor="middle">124°00'E</text>
            <text x="292" y="986" text-anchor="middle">126°00'E</text>
            <text x="436" y="986" text-anchor="middle">128°00'E</text>
            <text x="580" y="986" text-anchor="middle">130°00'E</text>
            <text x="724" y="986" text-anchor="middle">132°00'E</text>
          </g>

          <!-- Sea Territorial Waters Names -->
          <g class="sea-labels-modern" font-family="'Plus Jakarta Sans', sans-serif">
            <!-- West Sea (Yellow Sea) -->
            <g transform="translate(135, 595)" text-anchor="middle">
              <text id="svg-i18n-westSeaTitle" class="sea-title-text" font-size="26" font-weight="600" letter-spacing="6">西 海</text>
              <text id="svg-i18n-westSeaSub" class="sea-sub-text" y="22" font-size="10.5">황해 &bull; 서해 영해 (Yellow Sea)</text>
            </g>
            <!-- East Sea -->
            <g transform="translate(685, 390)" text-anchor="middle">
              <text id="svg-i18n-eastSeaTitle" class="sea-title-text" font-size="26" font-weight="600" letter-spacing="6">東 海</text>
              <text id="svg-i18n-eastSeaSub" class="sea-sub-text" y="22" font-size="10.5">대한민국 동해 (East Sea)</text>
            </g>
            <!-- South Sea & Korea Strait -->
            <g transform="translate(520, 892)" text-anchor="middle">
              <text id="svg-i18n-southSeaTitle" class="sea-title-text" font-size="26" font-weight="600" letter-spacing="6">南 海</text>
              <text id="svg-i18n-southSeaSub" class="sea-sub-text" y="22" font-size="10.5">대한해협 &bull; 남해 (South Sea)</text>
            </g>
          </g>

          <!-- ================= REALISTIC PENINSULA COASTLINE & ISLANDS ================= -->

          <!-- Authentic WGS84 Korean Peninsula Mainland Coastline (Hydrated from KOREA_MAINLAND_GEO) -->
          <path id="korea-peninsula-base" class="korea-peninsula-base" d="" stroke-width="1.5" stroke-linejoin="round"/>

          <!-- Authentic Korean Islands Outlines (Hydrated from KOREA_ISLANDS_GEO) -->
          <g id="korea-islands-vector" class="korea-islands-vector" stroke-width="1.2" stroke-linejoin="round"></g>

          <!-- Subtle Metropolitan Sector Rings / Seoul Focus -->
          <g id="modern-provinces-layer" class="modern-provinces-layer">
            <circle class="province-polygon seoul-highlight" data-province="seoul" cx="363" cy="544" r="14" fill="rgba(226, 180, 116, 0.16)" stroke="#e2b474" stroke-width="1.8"/>
          </g>

          <!-- National Parks & Marine Reserves Layer -->
          <g id="layer-parks" class="modern-parks-layer">
            <!-- Byeonsanbando National Park (변산반도 국립공원 - Real WGS84 Headland) -->
            <path id="park-byeonsan-poly" class="national-park-zone" data-city-id="byeonsan" d="
              M 321,717 L 325,709 L 336,708 L 341,717 L 336,725 L 325,725 Z
            " fill="rgba(16, 185, 129, 0.24)" stroke="#10b981" stroke-width="1.6" stroke-dasharray="3 2" cursor="pointer"/>
            <!-- Mt. Hallasan National Park Reserve (Jeju 33.36°N 126.53°E -> 330, 922) -->
            <ellipse cx="330" cy="922" rx="18" ry="8.5" fill="rgba(16, 185, 129, 0.2)" stroke="#10b981" stroke-width="1.2" stroke-dasharray="2 2"/>
          </g>

          <!-- Authentic Modern Military Demarcation Line (DMZ / 휴전선) -->
          <g class="dmz-layer" stroke="#f43f5e" stroke-width="1.8" stroke-dasharray="5 3">
            <path d="M 335,527 L 341,509 L 378,480 L 408,470 L 462,450" fill="none"/>
            <rect id="svg-i18n-dmzBox" class="dmz-box" x="348" y="458" width="96" height="15" rx="3" stroke="#f43f5e" stroke-width="0.9"/>
            <text id="svg-i18n-dmzLabel" class="dmz-label" x="396" y="469" font-family="'JetBrains Mono', monospace" font-size="8" font-weight="bold" text-anchor="middle">DMZ 휴전선 (MDL)</text>
          </g>

          <!-- Authentic Major River Systems (Daedong, Han, Geum, Yeongsan, Nakdong) -->
          <g class="modern-rivers" stroke-width="1.6" fill="none" stroke-linecap="round">
            <!-- Han River & Bukhan River -->
            <path d="M 470,579 C 435,565 405,552 387,547 C 375,546 368,546 363,546 C 350,542 338,535 332,528"/>
            <path d="M 417,516 C 405,530 396,538 387,547"/>
            <!-- Nakdong River -->
            <path d="M 507,586 C 498,610 492,624 489,635 C 474,654 462,664 460,674 C 464,686 468,694 470,699 C 482,728 494,752 504,767"/>
            <!-- Geum River -->
            <path d="M 401,696 C 404,670 403,654 399,645 C 392,642 386,642 383,643 C 370,650 362,655 357,660 C 350,670 345,678 341,685"/>
            <!-- Yeongsan River -->
            <path d="M 363,746 C 358,754 354,758 351,762 C 347,768 345,771 343,773 C 334,782 327,789 320,795"/>
            <!-- Daedong River -->
            <path d="M 321,374 C 300,390 286,403 275,413 C 263,424 254,433 246,440"/>
          </g>

          <!-- Islands Landmarks & Airport Hubs (Jeju, Ulleungdo, Dokdo, Incheon Yeongjong ICN) -->
          <g id="modern-islands">
            <!-- Jeju Mt. Hallasan Peak & CJU Airport -->
            <g id="island-jeju" class="province-polygon" data-province="jeju">
              <path class="jeju-hallasan-icon" d="M 326,925 L 330,917 L 334,925 Z"/>
              <text id="svg-i18n-hallasan" class="jeju-hallasan-text" x="330" y="947" font-family="'JetBrains Mono', monospace" font-size="8.5" font-weight="bold" text-anchor="middle">한라산 1,947m</text>
              <text id="svg-i18n-cjuAirport" class="jeju-cju-text" x="330" y="898" font-size="8" font-weight="600" text-anchor="middle">✈️ CJU 제주국제공항</text>
            </g>

            <!-- Ulleungdo & Dokdo Sovereign Territory (Exact WGS84 Coords) -->
            <g id="islands-dokdo-ulleung">
              <circle cx="642" cy="550" r="3" fill="none" stroke="rgba(56, 189, 248, 0.7)" stroke-width="1"/>
              <text id="svg-i18n-ulleungdo" class="ulleung-label" x="642" y="571" font-family="'Plus Jakarta Sans', sans-serif" font-size="9.5" font-weight="bold" text-anchor="middle">울릉도</text>

              <circle cx="715" cy="573" r="6" fill="none" stroke="rgba(56, 189, 248, 0.65)" stroke-width="1" stroke-dasharray="2 2"/>
              <g transform="translate(715, 601)">
                <rect class="dokdo-box" x="-54" y="-12" width="108" height="24" rx="4" stroke-width="1"/>
                <text id="svg-i18n-dokdoTitle" class="dokdo-title" x="0" y="0" font-family="'Plus Jakarta Sans', sans-serif" font-size="9.5" font-weight="bold" text-anchor="middle">독도 🇰🇷 DOKDO</text>
                <text class="dokdo-coords" x="0" y="9" font-family="'JetBrains Mono', monospace" font-size="6.5" text-anchor="middle">37°14'26"N 131°52'10"E</text>
              </g>
            </g>

            <!-- Yeongjongdo & Incheon International Airport (ICN) -->
            <g transform="translate(324, 554)">
              <ellipse class="icn-ellipse" cx="0" cy="0" rx="7.5" ry="5.5" stroke-width="1.2"/>
              <line x1="-4.5" y1="-2.5" x2="4.5" y2="2.5" stroke="#38bdf8" stroke-width="1.3"/>
              <line x1="-3" y1="-4.5" x2="3" y2="4.5" stroke="#38bdf8" stroke-width="1.3"/>
              <text id="svg-i18n-icnAirport" class="icn-label" x="-11" y="3" font-family="'JetBrains Mono', monospace" font-size="7.5" font-weight="bold" text-anchor="end">ICN 인천공항</text>
            </g>
          </g>

          <!-- ================= MODERN INFRASTRUCTURE NETWORKS ================= -->

          <!-- 1. Major Expressways -->
          <g id="layer-expressways" class="modern-expressways" stroke-linecap="round" fill="none">
            <path class="expressway-main" d="M 363,544 L 366,572 L 377,615 L 391,654 L 479,697 L 514,759" stroke-width="2.1"/>
            <path class="expressway-branch" d="M 346,568 L 345,615 L 340,670 L 336,718 L 320,795" stroke-width="1.5"/>
            <path class="expressway-branch" d="M 343,554 L 366,572 L 432,565 L 499,527" stroke-width="1.5"/>
          </g>

          <!-- 2. KTX / SRT High-Speed Railway Network -->
          <g id="layer-ktx" class="modern-ktx-network">
            <path class="ktx-path gyeongbu" d="M 363,544 L 355,558 L 372,614 L 389,628 L 391,654 L 445,675 L 479,697 L 524,698 L 517,726 L 514,759" stroke="#38bdf8" stroke-width="2.4" fill="none" stroke-linecap="round"/>
            <path class="ktx-path honam" d="M 389,628 L 371,652 L 362,690 L 354,725 L 349,763 L 320,795" stroke="#10b981" stroke-width="2.2" fill="none" stroke-linecap="round"/>
            <path class="ktx-path gangneung" d="M 363,544 L 399,551 L 432,565 L 464,544 L 478,537 L 499,527" stroke="#a78bfa" stroke-width="2.2" fill="none" stroke-linecap="round"/>
            <path class="ktx-path srt" d="M 371,552 L 370,577 L 370,593 L 372,614" stroke="#f472b6" stroke-width="1.8" fill="none" stroke-dasharray="3 3"/>

            <!-- Key KTX Station Nodes -->
            <g class="ktx-station-nodes" stroke-width="1.4">
              <circle cx="363" cy="544" r="3.8"/>
              <circle cx="372" cy="614" r="2.8"/>
              <circle cx="389" cy="628" r="2.8"/>
              <circle cx="391" cy="654" r="3.2"/>
              <circle cx="479" cy="697" r="3.2"/>
              <circle cx="524" cy="698" r="2.8"/>
              <circle cx="514" cy="759" r="3.8"/>
              <circle cx="349" cy="763" r="3.2"/>
              <circle cx="499" cy="527" r="3.2"/>
            </g>
          </g>

          <!-- ================= INTERACTIVE MODERN CITY & PARK NODES (WGS84 PROJECTED) ================= -->

          <!-- 1. SEOUL (37.57N, 126.98E -> 363, 544) -->
          <g class="map-city-pin active selected" data-city-id="seoul" transform="translate(363, 544)" cursor="pointer">
            <circle class="radar-ring ring-1" cx="0" cy="0" r="14"/>
            <circle class="radar-ring ring-2" cx="0" cy="0" r="26"/>
            <circle class="radar-ring ring-3" cx="0" cy="0" r="38"/>
            <circle cx="0" cy="0" r="13" fill="rgba(226,180,116,0.35)" filter="url(#seoulGoldGlow)"/>
            <circle cx="0" cy="0" r="7.5" fill="#e2b474"/>
            <circle class="seoul-core-dot" cx="0" cy="0" r="3.5"/>
            <g class="city-label-banner active" transform="translate(16, -14)">
              <rect id="pin-rect-seoul" class="seoul-banner-bg" x="0" y="-13" width="194" height="28" rx="6" stroke-width="1.8"/>
              <text id="pin-label-seoul" class="seoul-banner-text" x="10" y="5" font-family="'Plus Jakarta Sans', sans-serif" font-size="11.5" font-weight="bold">🌟 서울특별시</text>
              <rect id="pin-tag-rect-seoul" class="seoul-tag-bg" x="110" y="-8" width="76" height="18" rx="4"/>
              <text id="pin-tag-seoul" class="seoul-tag-text" x="148" y="5" font-family="'Plus Jakarta Sans', sans-serif" font-size="9" font-weight="bold" text-anchor="middle">3대 시대 플레이</text>
            </g>
          </g>

          <!-- 2. BUSAN (35.18N, 129.08E -> 514, 759) -->
          <g class="map-city-pin" data-city-id="busan" transform="translate(514, 759)" cursor="pointer">
            <circle class="radar-ring ring-1" cx="0" cy="0" r="10" stroke="#38bdf8"/>
            <circle cx="0" cy="0" r="6.8" fill="#0284c7"/>
            <circle cx="0" cy="0" r="3.2" fill="#ffffff"/>
            <g class="city-label-banner" transform="translate(14, 4)">
              <rect class="pin-banner-bg" x="0" y="-11" width="94" height="20" rx="4" stroke="#0284c7" stroke-width="1.2"/>
              <text class="pin-banner-text" x="8" y="3" font-size="10.5" font-weight="600">🌊 부산광역시</text>
            </g>
          </g>

          <!-- 3. INCHEON (37.46N, 126.71E -> 343, 554) -->
          <g class="map-city-pin" data-city-id="incheon" transform="translate(343, 554)" cursor="pointer">
            <circle cx="0" cy="0" r="6" fill="#10b981"/>
            <circle cx="0" cy="0" r="2.8" fill="#ffffff"/>
            <g class="city-label-banner" transform="translate(-104, -20)">
              <rect class="pin-banner-bg" x="0" y="-11" width="96" height="20" rx="4" stroke="#10b981" stroke-width="1.2"/>
              <text class="pin-banner-text" x="8" y="3" font-size="10.5" font-weight="600">✈️ 인천광역시</text>
            </g>
          </g>

          <!-- Incheon Bridge Connector (Yeongjong ICN -> Songdo) -->
          <path d="M 324,555 Q 331,561 338,562" fill="none" stroke="#06b6d4" stroke-width="1.4" stroke-dasharray="2.5 2" opacity="0.85"/>

          <!-- 3B. INCHEON SONGDO INTERNATIONAL CITY (37.38N, 126.64E -> 338, 562) -->
          <g class="map-city-pin" data-city-id="songdo" transform="translate(338, 562)" cursor="pointer">
            <circle cx="0" cy="0" r="6" fill="#06b6d4"/>
            <circle cx="0" cy="0" r="2.8" fill="#ffffff"/>
            <g class="city-label-banner" transform="translate(-102, 14)">
              <rect class="pin-banner-bg" x="0" y="-11" width="94" height="20" rx="4" stroke="#06b6d4" stroke-width="1.2"/>
              <text class="pin-banner-text" x="8" y="3" font-size="10.5" font-weight="600">🌉 인천 송도</text>
            </g>
          </g>

          <!-- 4. DAEGU (35.87N, 128.60E -> 479, 697) -->
          <g class="map-city-pin" data-city-id="daegu" transform="translate(479, 697)" cursor="pointer">
            <circle cx="0" cy="0" r="6.2" fill="#ec4899"/>
            <circle cx="0" cy="0" r="2.8" fill="#ffffff"/>
            <g class="city-label-banner" transform="translate(-102, -16)">
              <rect class="pin-banner-bg" x="0" y="-11" width="94" height="20" rx="4" stroke="#ec4899" stroke-width="1.2"/>
              <text class="pin-banner-text" x="8" y="3" font-size="10.5" font-weight="600">⚡ 대구광역시</text>
            </g>
          </g>

          <!-- 5. DAEJEON (36.35N, 127.38E -> 391, 654) -->
          <g class="map-city-pin" data-city-id="daejeon" transform="translate(391, 654)" cursor="pointer">
            <circle cx="0" cy="0" r="6.2" fill="#06b6d4"/>
            <circle cx="0" cy="0" r="2.8" fill="#ffffff"/>
            <g class="city-label-banner" transform="translate(14, 4)">
              <rect class="pin-banner-bg" x="0" y="-11" width="94" height="20" rx="4" stroke="#06b6d4" stroke-width="1.2"/>
              <text class="pin-banner-text" x="8" y="3" font-size="10.5" font-weight="600">🔬 대전광역시</text>
            </g>
          </g>

          <!-- 6. GWANGJU (35.16N, 126.85E -> 353, 761) -->
          <g class="map-city-pin" data-city-id="gwangju" transform="translate(353, 761)" cursor="pointer">
            <circle cx="0" cy="0" r="6.2" fill="#ef4444"/>
            <circle cx="0" cy="0" r="2.8" fill="#ffffff"/>
            <g class="city-label-banner" transform="translate(-104, 4)">
              <rect class="pin-banner-bg" x="0" y="-11" width="96" height="20" rx="4" stroke="#ef4444" stroke-width="1.2"/>
              <text class="pin-banner-text" x="8" y="3" font-size="10.5" font-weight="600">💡 광주광역시</text>
            </g>
          </g>

          <!-- 7. SUWON (37.26N, 127.03E -> 366, 572) -->
          <g class="map-city-pin" data-city-id="suwon" transform="translate(366, 572)" cursor="pointer">
            <circle cx="0" cy="0" r="5.8" fill="#3b82f6"/>
            <circle cx="0" cy="0" r="2.6" fill="#ffffff"/>
            <g class="city-label-banner" transform="translate(14, 6)">
              <rect class="pin-banner-bg" x="0" y="-10" width="84" height="19" rx="4" stroke="#3b82f6" stroke-width="1"/>
              <text class="pin-banner-text" x="8" y="3" font-size="10" font-weight="600">🏯 수원특례시</text>
            </g>
          </g>

          <!-- 8. SEJONG (36.48N, 127.29E -> 385, 642) -->
          <g class="map-city-pin" data-city-id="sejong" transform="translate(385, 642)" cursor="pointer">
            <circle cx="0" cy="0" r="5.8" fill="#10b981"/>
            <circle cx="0" cy="0" r="2.6" fill="#ffffff"/>
            <g class="city-label-banner" transform="translate(-94, -4)">
              <rect class="pin-banner-bg" x="0" y="-10" width="86" height="19" rx="4" stroke="#10b981" stroke-width="1"/>
              <text class="pin-banner-text" x="8" y="3" font-size="10" font-weight="600">🏛️ 세종특별자치시</text>
            </g>
          </g>

          <!-- 9. GYEONGJU (35.86N, 129.22E -> 524, 698) -->
          <g class="map-city-pin" data-city-id="gyeongju" transform="translate(524, 698)" cursor="pointer">
            <circle cx="0" cy="0" r="5.8" fill="#f59e0b"/>
            <circle cx="0" cy="0" r="2.6" fill="#ffffff"/>
            <g class="city-label-banner" transform="translate(14, 4)">
              <rect class="pin-banner-bg" x="0" y="-10" width="76" height="19" rx="4" stroke="#f59e0b" stroke-width="1"/>
              <text class="pin-banner-text" x="8" y="3" font-size="10" font-weight="600">🏛️ 경주시</text>
            </g>
          </g>

          <!-- 10. JEONJU (35.82N, 127.15E -> 375, 701) -->
          <g class="map-city-pin" data-city-id="jeonju" transform="translate(375, 701)" cursor="pointer">
            <circle cx="0" cy="0" r="5.8" fill="#6366f1"/>
            <circle cx="0" cy="0" r="2.6" fill="#ffffff"/>
            <g class="city-label-banner" transform="translate(14, 6)">
              <rect class="pin-banner-bg" x="0" y="-10" width="78" height="19" rx="4" stroke="#6366f1" stroke-width="1"/>
              <text class="pin-banner-text" x="8" y="3" font-size="10" font-weight="600">🏮 전주시</text>
            </g>
          </g>

          <!-- 11. BYEONSANBANDO NATIONAL PARK (35.63N, 126.53E -> 330, 718) -->
          <g class="map-city-pin park-pin" data-city-id="byeonsan" transform="translate(330, 718)" cursor="pointer">
            <circle cx="0" cy="0" r="6.8" fill="#10b981"/>
            <circle cx="0" cy="0" r="2.8" fill="#ecfdf5"/>
            <g class="city-label-banner" transform="translate(-142, 4)">
              <rect class="park-banner-bg" x="0" y="-10" width="134" height="20" rx="4" stroke="#10b981" stroke-width="1.3"/>
              <text class="park-banner-text" x="8" y="3" font-size="10" font-weight="600">🏞️ 변산반도 국립공원</text>
            </g>
          </g>

          <!-- 12. GANGNEUNG (37.75N, 128.88E -> 499, 527) -->
          <g class="map-city-pin" data-city-id="gangneung" transform="translate(499, 527)" cursor="pointer">
            <circle cx="0" cy="0" r="5.8" fill="#8b5cf6"/>
            <circle cx="0" cy="0" r="2.6" fill="#ffffff"/>
            <g class="city-label-banner" transform="translate(14, 4)">
              <rect class="pin-banner-bg" x="0" y="-10" width="76" height="19" rx="4" stroke="#8b5cf6" stroke-width="1"/>
              <text class="pin-banner-text" x="8" y="3" font-size="10" font-weight="600">🌲 강릉시</text>
            </g>
          </g>

          <!-- 13. JEJU (33.43N, 126.53E -> 330, 916) -->
          <g class="map-city-pin" data-city-id="jeju" transform="translate(330, 916)" cursor="pointer">
            <circle cx="0" cy="0" r="6.2" fill="#eab308"/>
            <circle cx="0" cy="0" r="2.8" fill="#ffffff"/>
            <g class="city-label-banner" transform="translate(16, 4)">
              <rect class="pin-banner-bg" x="0" y="-10" width="86" height="19" rx="4" stroke="#eab308" stroke-width="1"/>
              <text class="pin-banner-text" x="8" y="3" font-size="10" font-weight="600">🌴 제주특별자치도</text>
            </g>
          </g>

          <!-- 14. PYONGYANG (39.04N, 125.76E -> 275, 411) -->
          <g class="map-city-pin" data-city-id="pyongyang" transform="translate(275, 411)" cursor="pointer">
            <circle cx="0" cy="0" r="5.8" fill="#64748b"/>
            <circle cx="0" cy="0" r="2.6" fill="#ffffff"/>
            <g class="city-label-banner" transform="translate(14, 4)">
              <rect class="pin-banner-bg" x="0" y="-10" width="80" height="19" rx="4" stroke="#64748b" stroke-width="1"/>
              <text class="pin-banner-text" x="8" y="3" font-size="10" font-weight="600">🏔️ 평양직할시</text>
            </g>
          </g>
        </svg>

        <!-- Modern Map Footer Legend & Cartographic Scale -->
        <div class="map-modern-legend">
          <div class="legend-item"><span class="legend-marker gold-star">★</span> <span data-i18n-legend="capital">수도/활성화</span></div>
          <div class="legend-item"><span class="legend-line ktx-blue"></span> <span data-i18n-legend="ktx">KTX 고속철도</span></div>
          <div class="legend-item"><span class="legend-line hwy-amber"></span> <span data-i18n-legend="highway">고속도로</span></div>
          <div class="legend-item"><span class="legend-dot metro"></span> <span data-i18n-legend="metro">광역시/거점</span></div>
          <div class="legend-item"><span class="legend-dot park"></span> <span data-i18n-legend="park">국립공원</span></div>
          <div class="legend-item"><span class="legend-line dmz-red"></span> <span data-i18n-legend="dmz">DMZ 휴전선</span></div>
        </div>

        <div class="map-scale-bar" aria-hidden="true">
          <div class="scale-ticks">
            <span>0</span>
            <span>50</span>
            <span>100 km</span>
          </div>
          <div class="scale-rule">
            <span class="scale-seg dark"></span>
            <span class="scale-seg light"></span>
          </div>
        </div>
      </div>
    </div>

    <!-- Right: Modern City Dossier & Era Launcher Drawer -->
    <aside class="map-dossier-panel modern-dossier" id="map-city-dossier">
      <div class="dossier-scroll-wrap" id="map-city-dossier-content">
        <!-- Dynamically rendered via koreaMapEngine.js -->
      </div>

      <div class="dossier-footer">
        <button type="button" class="dossier-launch-btn primary" id="dossier-launch-btn">
          <span>서울 건축 스튜디오 입장하기</span> <span class="arrow-icon">&rarr;</span>
        </button>
      </div>
    </aside>
  </div>
</div>
`;
