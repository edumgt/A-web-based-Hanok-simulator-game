/**
 * Elaborate Modern Korea Map Markup & Modern Vector GIS Template
 * Features precise modern administrative boundaries, KTX/SRT high-speed rail lines,
 * expressways, airport hubs, Ulleungdo/Dokdo sovereign coordinates, DMZ line,
 * and high-tech interactive city pins.
 */

import { MODERN_PROVINCES, MODERN_TRANSIT_NETWORK, MODERN_CITIES_REGISTRY } from './koreaModernMapData.js';

export const KOREA_MAP_MARKUP = `
<!-- Elaborate Modern Korea Map Intro Screen -->
<div id="korea-map-screen" class="korea-map-screen modern-gis-theme">
  <!-- Top Navigation Bar -->
  <header class="map-top-bar">
    <div class="map-brand">
      <div class="map-emblem">🇰🇷</div>
      <div class="map-brand-titles">
        <div class="map-brand-row">
          <h1 class="map-main-title" data-i18n="mainTitle">대한민국 현대 전도 &bull; 팔도 타임 빌더</h1>
          <span class="gis-status-badge">LIVE GIS ATLAS v3.2</span>
        </div>
        <p class="map-sub-title" data-i18n="subTitle">17개 광역지자체 &bull; KTX 고속철도망 &bull; 조선 600년 한양부터 2099 네오 서울 메가시티까지</p>
      </div>
    </div>

    <!-- Modern Layer & Region Navigation -->
    <div class="map-filter-group" role="tablist" aria-label="권역 선택">
      <button type="button" class="map-filter-pill active" data-filter="all">전국 (All)</button>
      <button type="button" class="map-filter-pill" data-filter="capital">수도권 (서울/경기/인천)</button>
      <button type="button" class="map-filter-pill" data-filter="chungcheong">충청·세종 (대전/세종)</button>
      <button type="button" class="map-filter-pill" data-filter="yeongnam">영남권 (부산/대구/울산/경주)</button>
      <button type="button" class="map-filter-pill" data-filter="honam">호남권 (광주/전주)</button>
      <button type="button" class="map-filter-pill" data-filter="gangwon">강원권 (강릉/원주)</button>
      <button type="button" class="map-filter-pill" data-filter="jeju">제주권</button>
      <button type="button" class="map-filter-pill" data-filter="north">이북권 (평양)</button>
    </div>

    <!-- Quick CTA, Language & Layer Controls -->
    <div class="map-top-actions">
      <div class="map-lang-selector" id="map-lang-selector" role="group" aria-label="Language Selector">
        <button type="button" class="lang-pill active" data-lang="ko" title="한국어">🇰🇷 한국어</button>
        <button type="button" class="lang-pill" data-lang="en" title="English">🇺🇸 EN</button>
        <button type="button" class="lang-pill" data-lang="zh" title="中文">🇨🇳 中文</button>
        <button type="button" class="lang-pill" data-lang="ja" title="日本語">🇯🇵 日本語</button>
        <button type="button" class="lang-pill" data-lang="es" title="Español">🇪🇸 ES</button>
      </div>
      <div class="map-layer-toggles">
        <button type="button" class="layer-toggle-btn active" id="toggle-layer-ktx" title="KTX/SRT 고속철도망 표시 토글">
          🚆 KTX 망
        </button>
        <button type="button" class="layer-toggle-btn active" id="toggle-layer-roads" title="주요 고속도로망 표시 토글">
          🛣️ 고속도로
        </button>
      </div>
      <button type="button" class="map-direct-enter-btn" id="map-direct-enter-btn" title="활성화된 서울 건축 스튜디오로 바로 입장">
        <span class="btn-sparkle">✨</span> <span id="map-direct-enter-label">서울 스튜디오 입장 &rarr;</span>
      </button>
    </div>
  </header>

  <!-- Main Map & City Dossier Layout -->
  <div class="map-content-layout">
    <!-- Left/Center: High-Precision Modern Vector Map -->
    <div class="map-viewport-wrap">
      <div class="map-canvas-card">
        <!-- GIS Geodetic Coordinates Readout -->
        <div class="gis-telemetry-corner top-left">
          <span class="telemetry-label">SYSTEM</span>
          <span class="telemetry-value">KGD2002 / WGS84 GEOID</span>
          <span class="telemetry-sub">37°33'59"N &bull; 126°58'41"E (SEOUL)</span>
        </div>

        <div class="gis-telemetry-corner top-right">
          <div class="map-compass-modern" title="사방 방위계">
            <svg viewBox="0 0 54 54" width="48" height="48">
              <circle cx="27" cy="27" r="24" fill="rgba(15,23,42,0.6)" stroke="rgba(56,189,248,0.25)" stroke-width="1.2"/>
              <path d="M27 7 L31 24 L27 21 L23 24 Z" fill="#38bdf8"/>
              <path d="M27 47 L31 30 L27 33 L23 30 Z" fill="#64748b"/>
              <path d="M7 27 L24 23 L21 27 L24 31 Z" fill="#64748b"/>
              <path d="M47 27 L30 23 L33 27 L30 31 Z" fill="#64748b"/>
              <text x="27" y="6" font-size="6.5" font-weight="bold" fill="#38bdf8" text-anchor="middle">N</text>
            </svg>
          </div>
        </div>

        <!-- High Precision Modern Korea SVG Map -->
        <svg id="korea-peninsula-svg" class="korea-peninsula-svg modern-svg" viewBox="0 0 860 1000" preserveAspectRatio="xMidYMid meet">
          <defs>
            <!-- Modern Ocean Depth Radial Gradient -->
            <radialGradient id="modernOceanGrad" cx="45%" cy="50%" r="65%">
              <stop offset="0%" stop-color="#0c1628"/>
              <stop offset="60%" stop-color="#070c18"/>
              <stop offset="100%" stop-color="#040710"/>
            </radialGradient>

            <!-- Modern Land Gradient -->
            <linearGradient id="modernLandGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#182438"/>
              <stop offset="50%" stop-color="#141c2d"/>
              <stop offset="100%" stop-color="#0f1624"/>
            </linearGradient>

            <!-- Glowing KTX Pulse Filter -->
            <filter id="ktxNeonGlow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="3.5" result="blur"/>
              <feMerge>
                <feMergeNode in="blur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>

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

            <!-- Coordinate Grid Pattern (Latitude / Longitude) -->
            <pattern id="latLonGrid" width="100" height="100" patternUnits="userSpaceOnUse">
              <path d="M 100 0 L 0 0 0 100" fill="none" stroke="rgba(255, 255, 255, 0.035)" stroke-width="0.8"/>
              <circle cx="0" cy="0" r="1.5" fill="rgba(56, 189, 248, 0.2)"/>
            </pattern>
          </defs>

          <!-- Latitude/Longitude Spatial Grid Background -->
          <rect width="860" height="1000" fill="url(#modernOceanGrad)"/>
          <rect width="860" height="1000" fill="url(#latLonGrid)"/>

          <!-- Graticule Coordinate Labels -->
          <g class="graticule-labels" font-family="'JetBrains Mono', monospace" font-size="9" fill="#475569" opacity="0.6">
            <text x="30" y="200">40°00'N</text>
            <text x="30" y="400" id="svg-i18n-parallel38">38°00'N (38선)</text>
            <text x="30" y="600">36°00'N</text>
            <text x="30" y="800">34°00'N</text>
            <text x="200" y="985">126°00'E</text>
            <text x="400" y="985">128°00'E</text>
            <text x="600" y="985">130°00'E</text>
            <text x="750" y="985">132°00'E</text>
          </g>

          <!-- Sea Territorial Waters Names -->
          <g class="sea-labels-modern" font-family="'Newsreader', Georgia, serif">
            <!-- West Sea (Yellow Sea) -->
            <g transform="translate(130, 480)" text-anchor="middle" opacity="0.38">
              <text id="svg-i18n-westSeaTitle" font-size="28" font-weight="600" fill="#94a3b8" letter-spacing="6">西 海</text>
              <text id="svg-i18n-westSeaSub" y="24" font-size="11" font-family="'Plus Jakarta Sans', sans-serif" fill="#64748b">황해 &bull; 서해 영해 (Yellow Sea)</text>
            </g>
            <!-- East Sea -->
            <g transform="translate(710, 360)" text-anchor="middle" opacity="0.38">
              <text id="svg-i18n-eastSeaTitle" font-size="28" font-weight="600" fill="#94a3b8" letter-spacing="6">東 海</text>
              <text id="svg-i18n-eastSeaSub" y="24" font-size="11" font-family="'Plus Jakarta Sans', sans-serif" fill="#64748b">대한민국 동해 (East Sea)</text>
            </g>
            <!-- South Sea & Korea Strait -->
            <g transform="translate(480, 890)" text-anchor="middle" opacity="0.38">
              <text id="svg-i18n-southSeaTitle" font-size="28" font-weight="600" fill="#94a3b8" letter-spacing="6">南 海</text>
              <text id="svg-i18n-southSeaSub" y="24" font-size="11" font-family="'Plus Jakarta Sans', sans-serif" fill="#64748b">대한해협 &bull; 남해 (South Sea)</text>
            </g>
          </g>

          <!-- Bathymetry Depth Isolines (해저 등심선) -->
          <g class="bathymetry" stroke="rgba(56, 189, 248, 0.05)" stroke-width="1.2" fill="none">
            <path d="M 120,200 C 180,400 180,700 240,900"/>
            <path d="M 680,100 C 620,400 640,700 600,850"/>
            <path d="M 200,850 C 350,840 500,820 620,800"/>
          </g>

          <!-- ================= MODERN PENINSULA LANDMASS & PROVINCES ================= -->

          <!-- Base Korean Peninsula Outer Silhouette -->
          <path id="korea-peninsula-base" class="korea-peninsula-base" d="
            M 180,90
            C 210,95 280,75 360,65
            C 430,55 520,50 620,70
            C 630,90 610,130 580,150
            C 550,170 510,185 480,210
            C 460,230 450,260 460,290
            C 475,320 495,350 510,380
            C 525,410 540,460 550,510
            C 560,560 575,610 560,650
            C 550,680 540,710 520,735
            C 490,755 450,765 410,775
            C 360,785 320,800 290,785
            C 270,770 260,740 250,700
            C 240,660 265,630 280,590
            C 295,550 300,520 280,480
            C 260,450 270,420 295,395
            C 310,380 280,355 260,335
            C 235,310 220,280 230,240
            C 240,200 220,165 195,140
            C 175,120 170,105 180,90
            Z
          " fill="url(#modernLandGrad)" stroke="#334155" stroke-width="2.5"/>

          <!-- 17 Modern Administrative Division Sectors -->
          <g id="modern-provinces-layer" class="modern-provinces-layer">
            <!-- Gyeonggi-do -->
            <path class="province-polygon" data-province="gyeonggi" d="
              M 315,365 
              C 340,350 375,340 405,355 
              C 425,370 435,400 425,435 
              C 415,465 390,475 355,470 
              C 325,465 305,445 310,410 
              C 295,400 290,380 315,365 Z
            " fill="rgba(59, 130, 246, 0.08)" stroke="#3b82f6" stroke-width="1.2" stroke-dasharray="3 2"/>

            <!-- Gangwon State -->
            <path class="province-polygon" data-province="gangwon" d="
              M 405,345 
              C 435,320 460,300 475,325 
              C 490,350 515,390 530,440 
              C 515,465 470,470 435,460 
              C 420,430 415,380 405,345 Z
            " fill="rgba(139, 92, 246, 0.07)" stroke="#8b5cf6" stroke-width="1.2" stroke-dasharray="3 2"/>

            <!-- Chungnam & Daejeon/Sejong -->
            <path class="province-polygon" data-province="chungnam" d="
              M 310,465 
              C 345,465 375,475 390,505 
              C 400,535 385,570 350,575 
              C 315,580 280,560 270,520 
              C 260,480 285,465 310,465 Z
            " fill="rgba(6, 182, 212, 0.07)" stroke="#06b6d4" stroke-width="1.2" stroke-dasharray="3 2"/>

            <!-- Chungbuk -->
            <path class="province-polygon" data-province="chungbuk" d="
              M 390,460 
              C 425,455 450,470 470,490 
              C 455,530 425,550 400,545 
              C 385,525 380,485 390,460 Z
            " fill="rgba(245, 158, 11, 0.07)" stroke="#f59e0b" stroke-width="1.2" stroke-dasharray="3 2"/>

            <!-- Gyeongbuk & Daegu -->
            <path class="province-polygon" data-province="gyeongbuk" d="
              M 470,470 
              C 525,450 545,510 565,600 
              C 570,640 535,665 490,660 
              C 455,640 445,580 445,530 
              C 450,495 460,480 470,470 Z
            " fill="rgba(236, 72, 153, 0.07)" stroke="#ec4899" stroke-width="1.2" stroke-dasharray="3 2"/>

            <!-- Gyeongnam & Busan/Ulsan -->
            <path class="province-polygon" data-province="gyeongnam" d="
              M 450,650 
              C 500,645 550,650 545,690 
              C 540,735 500,760 450,765 
              C 405,760 400,720 420,680 
              C 435,660 445,655 450,650 Z
            " fill="rgba(20, 184, 166, 0.07)" stroke="#14b8a6" stroke-width="1.2" stroke-dasharray="3 2"/>

            <!-- Jeonbuk State -->
            <path class="province-polygon" data-province="jeonbuk" d="
              M 310,575 
              C 355,570 395,580 415,615 
              C 415,650 375,665 330,660 
              C 290,655 275,620 290,590 
              C 300,580 305,578 310,575 Z
            " fill="rgba(99, 102, 241, 0.07)" stroke="#6366f1" stroke-width="1.2" stroke-dasharray="3 2"/>

            <!-- Jeonnam & Gwangju -->
            <path class="province-polygon" data-province="jeonnam" d="
              M 300,655 
              C 340,655 385,650 410,685 
              C 415,730 380,775 330,785 
              C 275,780 245,740 255,700 
              C 265,670 285,660 300,655 Z
            " fill="rgba(239, 68, 68, 0.07)" stroke="#ef4444" stroke-width="1.2" stroke-dasharray="3 2"/>

            <!-- Seoul Capital Highlight Border -->
            <path class="province-polygon seoul-highlight" data-province="seoul" d="
              M 338,388 C 344,385 356,386 362,392 C 364,398 360,405 352,406 C 344,407 336,400 338,388 Z
            " fill="rgba(226, 180, 116, 0.25)" stroke="#e2b474" stroke-width="2"/>
          </g>

          <!-- Modern Military Demarcation Line (DMZ / 휴전선) -->
          <g class="dmz-layer" stroke="#f43f5e" stroke-width="1.8" stroke-dasharray="5 3">
            <path d="M 270,360 L 315,355 L 375,342 L 435,325 L 485,305"/>
            <rect id="svg-i18n-dmzBox" x="352" y="328" width="96" height="15" rx="3" fill="#0f172a" stroke="#f43f5e" stroke-width="0.8"/>
            <text id="svg-i18n-dmzLabel" x="400" y="339" font-family="'JetBrains Mono', monospace" font-size="8" font-weight="bold" fill="#f43f5e" text-anchor="middle">DMZ 휴전선 (MDL)</text>
          </g>

          <!-- Modern Major River Systems (Han, Nakdong, Geum, Yeongsan) -->
          <g class="modern-rivers" stroke="#0284c7" stroke-width="2" fill="none" opacity="0.6">
            <!-- Han River (한강) -->
            <path d="M 440,380 C 400,388 370,392 350,395 C 330,398 315,402 290,405"/>
            <!-- Nakdong River (낙동강) -->
            <path d="M 495,490 C 465,550 460,620 480,680 C 495,710 515,725 520,730"/>
            <!-- Geum River (금강) -->
            <path d="M 405,510 C 370,535 340,560 300,575"/>
            <!-- Yeongsan River (영산강) -->
            <path d="M 345,690 C 330,710 310,740 285,760"/>
          </g>

          <!-- Islands (Jeju, Ulleungdo, Dokdo, Incheon Yeongjong Airport) -->
          <g id="modern-islands">
            <!-- Jeju Special Self-Governing Province (제주도) -->
            <g id="island-jeju" class="province-polygon" data-province="jeju">
              <ellipse cx="285" cy="920" rx="55" ry="28" fill="url(#modernLandGrad)" stroke="#38bdf8" stroke-width="1.8"/>
              <!-- Hallasan peak -->
              <path d="M 280,922 L 285,912 L 290,922 Z" fill="#e2b474"/>
              <text id="svg-i18n-hallasan" x="285" y="938" font-family="'JetBrains Mono', monospace" font-size="9" font-weight="bold" fill="#e2b474" text-anchor="middle">한라산 1,947m</text>
              <!-- CJU Jeju Airport Marker -->
              <text id="svg-i18n-cjuAirport" x="285" y="902" font-size="8" fill="#38bdf8" text-anchor="middle">✈️ CJU 제주국제공항</text>
            </g>

            <!-- Ulleungdo & Dokdo Sovereign Territory -->
            <g id="islands-dokdo-ulleung">
              <!-- Ulleungdo -->
              <ellipse cx="690" cy="450" rx="16" ry="13" fill="url(#modernLandGrad)" stroke="#38bdf8" stroke-width="1.5"/>
              <text id="svg-i18n-ulleungdo" x="690" y="475" font-family="'Plus Jakarta Sans', sans-serif" font-size="10" font-weight="bold" fill="#e2e8f0" text-anchor="middle">울릉도</text>

              <!-- Dokdo Sovereignty Box & Coordinates -->
              <ellipse cx="765" cy="470" rx="8" ry="7" fill="#0284c7" stroke="#38bdf8" stroke-width="1.5"/>
              <ellipse cx="778" cy="475" rx="7" ry="6" fill="#0284c7" stroke="#38bdf8" stroke-width="1.5"/>
              <g transform="translate(772, 498)">
                <rect x="-55" y="-12" width="110" height="24" rx="4" fill="#0f172a" stroke="#e2b474" stroke-width="1"/>
                <text id="svg-i18n-dokdoTitle" x="0" y="0" font-family="'Plus Jakarta Sans', sans-serif" font-size="10" font-weight="bold" fill="#e2b474" text-anchor="middle">독도 🇰🇷 DOKDO</text>
                <text x="0" y="9" font-family="'JetBrains Mono', monospace" font-size="6.5" fill="#94a3b8" text-anchor="middle">37°14'26"N 131°52'10"E</text>
              </g>
            </g>

            <!-- Yeongjongdo & Incheon International Airport (ICN) -->
            <g transform="translate(295, 395)">
              <ellipse cx="0" cy="0" rx="15" ry="12" fill="#1e293b" stroke="#10b981" stroke-width="1.2"/>
              <!-- Cross Dual Runways -->
              <line x1="-8" y1="-5" x2="8" y2="5" stroke="#38bdf8" stroke-width="1.5"/>
              <line x1="-5" y1="-8" x2="5" y2="8" stroke="#38bdf8" stroke-width="1.5"/>
              <text id="svg-i18n-icnAirport" x="0" y="16" font-family="'JetBrains Mono', monospace" font-size="7.5" font-weight="bold" fill="#10b981" text-anchor="middle">ICN 인천공항</text>
            </g>

            <!-- Geoje Island (거제도) -->
            <ellipse cx="495" cy="760" rx="16" ry="13" fill="url(#modernLandGrad)" stroke="#334155" stroke-width="1.2"/>
          </g>

          <!-- ================= MODERN INFRASTRUCTURE NETWORKS ================= -->

          <!-- 1. Major Expressways (1번 경부선, 15번 서해안선, 50번 영동선) -->
          <g id="layer-expressways" class="modern-expressways" stroke-linecap="round">
            <!-- Gyeongbu Expressway (1번) -->
            <path d="M 352,398 L 360,430 L 370,480 L 392,525 L 480,615 L 526,720" stroke="rgba(226, 180, 116, 0.45)" stroke-width="2.2"/>
            <!-- Seohaean Expressway (15번) -->
            <path d="M 330,420 L 310,470 L 300,540 L 295,620 L 290,750" stroke="rgba(226, 180, 116, 0.35)" stroke-width="1.6"/>
            <!-- Yeongdong Expressway (50번) -->
            <path d="M 305,420 L 365,430 L 430,410 L 495,372" stroke="rgba(226, 180, 116, 0.35)" stroke-width="1.6"/>
          </g>

          <!-- 2. KTX / SRT High-Speed Railway Network (Pulsing Neon Transit Lines) -->
          <g id="layer-ktx" class="modern-ktx-network" filter="url(#ktxNeonGlow)">
            <!-- Gyeongbu KTX Line (Cyan) -->
            <path class="ktx-path gyeongbu" d="M 350,395 L 345,410 L 355,430 L 365,470 L 380,490 L 390,520 L 440,570 L 475,610 L 535,645 L 545,680 L 525,725" stroke="#38bdf8" stroke-width="2.8" fill="none" stroke-linecap="round"/>
            <!-- Honam KTX Line (Green) -->
            <path class="ktx-path honam" d="M 380,490 L 360,525 L 340,590 L 330,640 L 320,695 L 315,730 L 295,765" stroke="#34d399" stroke-width="2.5" fill="none" stroke-linecap="round"/>
            <!-- Gangneung KTX Line (Violet) -->
            <path class="ktx-path gangneung" d="M 350,395 L 375,390 L 405,395 L 430,395 L 450,385 L 470,380 L 485,375 L 495,370" stroke="#a78bfa" stroke-width="2.5" fill="none" stroke-linecap="round"/>
            <!-- SRT Line (Pink) -->
            <path class="ktx-path srt" d="M 360,405 L 365,425 L 365,455 L 365,470" stroke="#f472b6" stroke-width="2" fill="none" stroke-dasharray="3 3"/>

            <!-- Key KTX Station Nodes -->
            <g class="ktx-station-nodes" fill="#ffffff" stroke="#0f172a" stroke-width="1.5">
              <circle cx="350" cy="395" r="4"/> <!-- Seoul -->
              <circle cx="355" cy="430" r="3"/> <!-- Suwon -->
              <circle cx="380" cy="490" r="3"/> <!-- Osong -->
              <circle cx="390" cy="520" r="3.5"/> <!-- Daejeon -->
              <circle cx="475" cy="610" r="3.5"/> <!-- Dongdaegu -->
              <circle cx="535" cy="645" r="3"/> <!-- Gyeongju -->
              <circle cx="525" cy="725" r="4"/> <!-- Busan -->
              <circle cx="320" cy="695" r="3.5"/> <!-- GwangjuSongjeong -->
              <circle cx="495" cy="370" r="3.5"/> <!-- Gangneung -->
            </g>
          </g>

          <!-- ================= INTERACTIVE MODERN CITY NODES ================= -->

          <!-- 1. SEOUL (FLAGSHIP ACTIVE 3-ERA METROPOLIS) -->
          <g class="map-city-pin active selected" data-city-id="seoul" transform="translate(350, 395)" cursor="pointer">
            <!-- Triple Pulsing Gold Radar Rings -->
            <circle class="radar-ring ring-1" cx="0" cy="0" r="14"/>
            <circle class="radar-ring ring-2" cx="0" cy="0" r="26"/>
            <circle class="radar-ring ring-3" cx="0" cy="0" r="38"/>

            <!-- Glowing Core Halo -->
            <circle cx="0" cy="0" r="13" fill="rgba(226,180,116,0.35)" filter="url(#seoulGoldGlow)"/>
            <circle cx="0" cy="0" r="7.5" fill="#e2b474"/>
            <circle cx="0" cy="0" r="3.5" fill="#0f172a"/>

            <!-- High-Tech Seoul Capital Banner -->
            <g class="city-label-banner active" transform="translate(16, -14)">
              <rect id="pin-rect-seoul" x="0" y="-13" width="194" height="28" rx="6" fill="#0f172a" stroke="#e2b474" stroke-width="1.8"/>
              <text id="pin-label-seoul" x="10" y="5" font-family="'Plus Jakarta Sans', sans-serif" font-size="11.5" font-weight="bold" fill="#e2b474">🌟 서울특별시</text>
              <rect id="pin-tag-rect-seoul" x="110" y="-8" width="76" height="18" rx="4" fill="#e2b474"/>
              <text id="pin-tag-seoul" x="148" y="5" font-family="'Plus Jakarta Sans', sans-serif" font-size="9" font-weight="bold" fill="#0f172a" text-anchor="middle">3대 시대 플레이</text>
            </g>
          </g>

          <!-- 2. BUSAN (부산광역시 - 제2도시 / 해양수도) -->
          <g class="map-city-pin" data-city-id="busan" transform="translate(525, 725)" cursor="pointer">
            <circle class="radar-ring ring-1" cx="0" cy="0" r="10" stroke="#38bdf8"/>
            <circle cx="0" cy="0" r="7" fill="#0284c7"/>
            <circle cx="0" cy="0" r="3.5" fill="#ffffff"/>
            <g class="city-label-banner" transform="translate(14, 4)">
              <rect x="0" y="-11" width="94" height="20" rx="4" fill="rgba(15,23,42,0.92)" stroke="#38bdf8" stroke-width="1.2"/>
              <text x="8" y="3" font-size="10.5" font-weight="600" fill="#e2e8f0">🌊 부산광역시</text>
            </g>
          </g>

          <!-- 3. INCHEON (인천광역시 - 송도 / ICN공항) -->
          <g class="map-city-pin" data-city-id="incheon" transform="translate(305, 405)" cursor="pointer">
            <circle cx="0" cy="0" r="6.5" fill="#10b981"/>
            <circle cx="0" cy="0" r="3" fill="#ffffff"/>
            <g class="city-label-banner" transform="translate(-104, 4)">
              <rect x="0" y="-11" width="96" height="20" rx="4" fill="rgba(15,23,42,0.92)" stroke="#10b981" stroke-width="1.2"/>
              <text x="8" y="3" font-size="10.5" font-weight="600" fill="#e2e8f0">✈️ 인천광역시</text>
            </g>
          </g>

          <!-- 4. DAEGU (대구광역시 - 영남 메가시티) -->
          <g class="map-city-pin" data-city-id="daegu" transform="translate(475, 615)" cursor="pointer">
            <circle cx="0" cy="0" r="6.5" fill="#ec4899"/>
            <circle cx="0" cy="0" r="3" fill="#ffffff"/>
            <g class="city-label-banner" transform="translate(14, 4)">
              <rect x="0" y="-11" width="94" height="20" rx="4" fill="rgba(15,23,42,0.92)" stroke="#ec4899" stroke-width="1.2"/>
              <text x="8" y="3" font-size="10.5" font-weight="600" fill="#e2e8f0">⚡ 대구광역시</text>
            </g>
          </g>

          <!-- 5. DAEJEON (대전광역시 - 과학수도 / KAIST) -->
          <g class="map-city-pin" data-city-id="daejeon" transform="translate(390, 520)" cursor="pointer">
            <circle cx="0" cy="0" r="6.5" fill="#06b6d4"/>
            <circle cx="0" cy="0" r="3" fill="#ffffff"/>
            <g class="city-label-banner" transform="translate(14, 4)">
              <rect x="0" y="-11" width="94" height="20" rx="4" fill="rgba(15,23,42,0.92)" stroke="#06b6d4" stroke-width="1.2"/>
              <text x="8" y="3" font-size="10.5" font-weight="600" fill="#e2e8f0">🔬 대전광역시</text>
            </g>
          </g>

          <!-- 6. GWANGJU (광주광역시 - 호남 거점 / AI) -->
          <g class="map-city-pin" data-city-id="gwangju" transform="translate(320, 695)" cursor="pointer">
            <circle cx="0" cy="0" r="6.5" fill="#ef4444"/>
            <circle cx="0" cy="0" r="3" fill="#ffffff"/>
            <g class="city-label-banner" transform="translate(-104, 4)">
              <rect x="0" y="-11" width="96" height="20" rx="4" fill="rgba(15,23,42,0.92)" stroke="#ef4444" stroke-width="1.2"/>
              <text x="8" y="3" font-size="10.5" font-weight="600" fill="#e2e8f0">💡 광주광역시</text>
            </g>
          </g>

          <!-- 7. SUWON (수원특례시 - 삼성 & 화성) -->
          <g class="map-city-pin" data-city-id="suwon" transform="translate(355, 430)" cursor="pointer">
            <circle cx="0" cy="0" r="6" fill="#3b82f6"/>
            <circle cx="0" cy="0" r="2.8" fill="#ffffff"/>
            <g class="city-label-banner" transform="translate(14, 4)">
              <rect x="0" y="-10" width="84" height="19" rx="4" fill="rgba(15,23,42,0.92)" stroke="#3b82f6" stroke-width="1"/>
              <text x="8" y="3" font-size="10" font-weight="600" fill="#e2e8f0">🏯 수원특례시</text>
            </g>
          </g>

          <!-- 8. SEJONG (세종특별자치시 - 정부청사) -->
          <g class="map-city-pin" data-city-id="sejong" transform="translate(375, 505)" cursor="pointer">
            <circle cx="0" cy="0" r="6" fill="#10b981"/>
            <circle cx="0" cy="0" r="2.8" fill="#ffffff"/>
            <g class="city-label-banner" transform="translate(-94, 4)">
              <rect x="0" y="-10" width="86" height="19" rx="4" fill="rgba(15,23,42,0.92)" stroke="#10b981" stroke-width="1"/>
              <text x="8" y="3" font-size="10" font-weight="600" fill="#e2e8f0">🏛️ 세종특별자치시</text>
            </g>
          </g>

          <!-- 9. GYEONGJU (경주시 - 천년 세계유산) -->
          <g class="map-city-pin" data-city-id="gyeongju" transform="translate(535, 645)" cursor="pointer">
            <circle cx="0" cy="0" r="6" fill="#f59e0b"/>
            <circle cx="0" cy="0" r="2.8" fill="#ffffff"/>
            <g class="city-label-banner" transform="translate(14, 4)">
              <rect x="0" y="-10" width="76" height="19" rx="4" fill="rgba(15,23,42,0.92)" stroke="#f59e0b" stroke-width="1"/>
              <text x="8" y="3" font-size="10" font-weight="600" fill="#e2e8f0">🏛️ 경주시</text>
            </g>
          </g>

          <!-- 10. JEONJU (전주시 - 한옥마을) -->
          <g class="map-city-pin" data-city-id="jeonju" transform="translate(350, 625)" cursor="pointer">
            <circle cx="0" cy="0" r="6" fill="#6366f1"/>
            <circle cx="0" cy="0" r="2.8" fill="#ffffff"/>
            <g class="city-label-banner" transform="translate(-86, 4)">
              <rect x="0" y="-10" width="78" height="19" rx="4" fill="rgba(15,23,42,0.92)" stroke="#6366f1" stroke-width="1"/>
              <text x="8" y="3" font-size="10" font-weight="600" fill="#e2e8f0">🏮 전주시</text>
            </g>
          </g>

          <!-- 11. GANGNEUNG (강릉시 - 동해안 관동 거점) -->
          <g class="map-city-pin" data-city-id="gangneung" transform="translate(495, 370)" cursor="pointer">
            <circle cx="0" cy="0" r="6" fill="#a78bfa"/>
            <circle cx="0" cy="0" r="2.8" fill="#ffffff"/>
            <g class="city-label-banner" transform="translate(14, 4)">
              <rect x="0" y="-10" width="76" height="19" rx="4" fill="rgba(15,23,42,0.92)" stroke="#a78bfa" stroke-width="1"/>
              <text x="8" y="3" font-size="10" font-weight="600" fill="#e2e8f0">🌲 강릉시</text>
            </g>
          </g>

          <!-- 12. JEJU (제주특별자치도) -->
          <g class="map-city-pin" data-city-id="jeju" transform="translate(285, 920)" cursor="pointer">
            <circle cx="0" cy="0" r="6.5" fill="#eab308"/>
            <circle cx="0" cy="0" r="3" fill="#ffffff"/>
            <g class="city-label-banner" transform="translate(14, 4)">
              <rect x="0" y="-10" width="86" height="19" rx="4" fill="rgba(15,23,42,0.92)" stroke="#eab308" stroke-width="1"/>
              <text x="8" y="3" font-size="10" font-weight="600" fill="#e2e8f0">🌴 제주특별자치도</text>
            </g>
          </g>

          <!-- 13. PYONGYANG (평양직할시 - 이북 거점) -->
          <g class="map-city-pin" data-city-id="pyongyang" transform="translate(280, 220)" cursor="pointer">
            <circle cx="0" cy="0" r="6" fill="#64748b"/>
            <circle cx="0" cy="0" r="2.8" fill="#ffffff"/>
            <g class="city-label-banner" transform="translate(14, 4)">
              <rect x="0" y="-10" width="80" height="19" rx="4" fill="rgba(15,23,42,0.92)" stroke="#64748b" stroke-width="1"/>
              <text x="8" y="3" font-size="10" font-weight="600" fill="#e2e8f0">🏔️ 평양직할시</text>
            </g>
          </g>
        </svg>

        <!-- Modern Map Footer Legend -->
        <div class="map-modern-legend">
          <div class="legend-item"><span class="legend-marker gold-star">★</span> <span data-i18n-legend="capital">수도/활성화</span></div>
          <div class="legend-item"><span class="legend-line ktx-blue"></span> <span data-i18n-legend="ktx">KTX 고속철도</span></div>
          <div class="legend-item"><span class="legend-line hwy-amber"></span> <span data-i18n-legend="highway">고속도로</span></div>
          <div class="legend-item"><span class="legend-dot metro"></span> <span data-i18n-legend="metro">광역시/거점</span></div>
          <div class="legend-item"><span class="legend-line dmz-red"></span> <span data-i18n-legend="dmz">DMZ 휴전선</span></div>
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
