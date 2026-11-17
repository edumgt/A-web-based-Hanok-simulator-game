/**
 * High-Precision Korean Peninsula Cartographic Projection & Satellite Shaded-Relief Engine
 * Uses authentic WGS84 longitude/latitude coordinates projected onto SVG 860x1000 space,
 * and procedurally synthesizes photorealistic topographic hillshading, bathymetry, biomes,
 * river basins, and night-light / daylight urban footprints onto a crisp raster backdrop.
 */

export const KOREA_SVG_WIDTH = 860;
export const KOREA_SVG_HEIGHT = 1000;

export function geoToSvg(lon, lat) {
  const x = 400 + (lon - 127.5) * 72;
  const y = 55 + (43.0 - lat) * 90;
  return [Number(x.toFixed(1)), Number(y.toFixed(1))];
}

// Authentic Korean Peninsula Mainland Coastline & Northern Border (Lon, Lat)
export const KOREA_MAINLAND_GEO = [
  // Yalu (Amnok) Estuary -> Northern Border -> Baekdusan -> Tumen (Duman) Estuary
  [124.30, 39.82], [124.42, 40.11], [124.94, 40.46], [125.55, 40.62],
  [126.28, 41.15], [126.86, 41.48], [127.50, 41.40], [128.18, 41.41],
  [128.08, 42.00], [128.60, 42.06], [129.22, 42.22], [129.75, 42.45],
  [129.99, 42.95], [130.35, 42.65], [130.65, 42.30],
  // East Coast Descending (East Sea)
  [130.32, 42.20], [129.92, 42.05], [129.78, 41.80], [129.72, 41.40],
  [129.20, 40.67], [128.65, 40.28], [128.22, 40.04], [127.68, 39.86],
  [127.45, 39.55], [127.38, 39.24], [127.46, 39.14], [127.88, 38.94],
  [128.32, 38.66], [128.60, 38.20], [128.92, 37.76], [129.18, 37.45],
  [129.42, 36.99], [129.38, 36.41], [129.37, 36.02], [129.57, 36.08], // Yeongil Bay & Homigot
  [129.51, 35.80], [129.44, 35.50], [129.18, 35.16], [128.96, 35.06], // Ulsan & Busan
  // South Coast (Korea Strait & Dadohae)
  [128.68, 35.13], [128.56, 35.04], [128.41, 34.84], [128.06, 34.93],
  [127.75, 34.73], [127.65, 34.90], [127.44, 34.60], [127.31, 34.48],
  [127.16, 34.64], [126.92, 34.56], [126.64, 34.45], [126.52, 34.30], // Haenam Land's End
  [126.32, 34.55], [126.38, 34.79],
  // West Coast Ascending (Yellow Sea)
  [126.34, 35.02], [126.42, 35.29], [126.46, 35.47],
  [126.44, 35.63], [126.55, 35.72], [126.66, 35.76], // Byeonsanbando Headland
  [126.64, 35.98], [126.55, 36.32], [126.44, 36.55],
  [126.13, 36.75], [126.35, 36.92], [126.76, 37.02], // Taean Peninsula & Asan Bay
  [126.82, 37.22], [126.62, 37.38], [126.69, 37.47], // Songdo & Incheon
  [126.56, 37.74], [126.15, 37.84], [125.70, 37.98], // Han Estuary & Haeju
  [125.35, 37.90], [125.08, 37.97], [124.85, 38.13], // Ongjin & Jangsan Cape
  [125.25, 38.45], [125.36, 38.72], [125.44, 39.25], // Taedong Estuary
  [125.48, 39.62], [125.05, 39.68], [124.65, 39.77]
];

export const KOREA_ISLANDS_GEO = [
  // Jeju Island
  [
    [126.16, 33.30], [126.26, 33.44], [126.53, 33.52], [126.80, 33.53],
    [126.94, 33.46], [126.90, 33.34], [126.72, 33.24], [126.48, 33.21],
    [126.25, 33.22]
  ],
  // Geoje Island
  [
    [128.54, 34.96], [128.72, 34.97], [128.74, 34.81], [128.58, 34.74], [128.48, 34.85]
  ],
  // Namhae Island
  [
    [127.82, 34.88], [128.00, 34.85], [128.02, 34.72], [127.86, 34.73], [127.78, 34.81]
  ],
  // Jindo Island
  [
    [126.15, 34.50], [126.32, 34.54], [126.33, 34.39], [126.17, 34.38]
  ],
  // Wando Island
  [
    [126.64, 34.36], [126.76, 34.36], [126.75, 34.28], [126.64, 34.29]
  ],
  // Anmyeon Island
  [
    [126.30, 36.60], [126.40, 36.58], [126.42, 36.42], [126.32, 36.44]
  ],
  // Ganghwa Island
  [
    [126.34, 37.78], [126.51, 37.78], [126.52, 37.62], [126.36, 37.63]
  ],
  // Yeongjongdo (Incheon Int'l Airport)
  [
    [126.37, 37.50], [126.55, 37.50], [126.56, 37.42], [126.39, 37.42]
  ],
  // Baengnyeongdo
  [
    [124.62, 37.98], [124.73, 37.98], [124.72, 37.91], [124.62, 37.92]
  ],
  // Ulleungdo
  [
    [130.80, 37.54], [130.92, 37.53], [130.92, 37.45], [130.80, 37.46]
  ],
  // Dokdo (Seodo & Dongdo)
  [
    [131.83, 37.26], [131.87, 37.26], [131.87, 37.22], [131.83, 37.22]
  ],
  [
    [131.88, 37.25], [131.92, 37.25], [131.92, 37.21], [131.88, 37.21]
  ]
];

// Subtle northern Manchuria / Russian Far East continental margin north of Amnok/Tumen
const CONTINENTAL_NORTH_GEO = [
  [120.00, 44.00], [134.50, 44.00], [134.50, 42.30], [130.65, 42.30],
  [130.35, 42.65], [129.99, 42.95], [129.75, 42.45], [129.22, 42.22],
  [128.60, 42.06], [128.08, 42.00], [128.18, 41.41], [127.50, 41.40],
  [126.86, 41.48], [126.28, 41.15], [125.55, 40.62], [124.94, 40.46],
  [124.42, 40.11], [124.30, 39.82], [123.50, 39.82], [122.40, 39.15],
  [121.60, 38.80], [120.90, 39.60], [120.00, 40.20]
];

export function buildSmoothGeoPath(geoPoints) {
  if (!geoPoints || geoPoints.length === 0) return '';
  const pts = geoPoints.map(([lon, lat]) => geoToSvg(lon, lat));
  let d = `M ${pts[0][0]},${pts[0][1]}`;
  for (let i = 1; i < pts.length; i++) {
    d += ` L ${pts[i][0]},${pts[i][1]}`;
  }
  return `${d} Z`;
}

// Major real mountain chains & elevation features (lon, lat, sigmaLon, sigmaLat, height 0..1)
const ELEVATION_CENTERS = [
  // Baekdusan & Gaema Plateau
  { lon: 128.08, lat: 42.00, sx: 0.45, sy: 0.35, h: 1.00 },
  { lon: 128.20, lat: 41.20, sx: 1.15, sy: 0.65, h: 0.78 },
  { lon: 129.00, lat: 41.50, sx: 0.85, sy: 0.55, h: 0.72 },
  // Nangnim & Myohyang Ranges
  { lon: 126.90, lat: 40.30, sx: 0.65, sy: 0.90, h: 0.68 },
  // Taebaek Mountains (Kumgangsan -> Seoraksan -> Odaesan -> Taebaeksan)
  { lon: 128.10, lat: 38.65, sx: 0.38, sy: 0.50, h: 0.74 },
  { lon: 128.46, lat: 38.12, sx: 0.36, sy: 0.48, h: 0.82 },
  { lon: 128.55, lat: 37.68, sx: 0.38, sy: 0.48, h: 0.72 },
  { lon: 128.90, lat: 37.10, sx: 0.42, sy: 0.55, h: 0.76 },
  { lon: 129.00, lat: 36.45, sx: 0.35, sy: 0.45, h: 0.52 },
  // Sobaek Mountains -> Deogyusan -> Jirisan
  { lon: 128.20, lat: 36.78, sx: 0.55, sy: 0.42, h: 0.60 },
  { lon: 127.75, lat: 35.86, sx: 0.45, sy: 0.48, h: 0.68 },
  { lon: 127.73, lat: 35.34, sx: 0.48, sy: 0.36, h: 0.85 },
  // Central & Gyeonggi Highlands (Bukhansan / Yongmunsan / Chiaksan)
  { lon: 127.95, lat: 37.36, sx: 0.55, sy: 0.45, h: 0.50 },
  { lon: 126.99, lat: 37.66, sx: 0.18, sy: 0.14, h: 0.36 },
  // Byeonsanbando Naebyeonsan ridge
  { lon: 126.58, lat: 35.64, sx: 0.16, sy: 0.14, h: 0.38 },
  // Mudeungsan / Jeonnam ridge
  { lon: 126.99, lat: 35.13, sx: 0.30, sy: 0.28, h: 0.46 },
  // Hallasan Volcanic Shield Cone (Jeju)
  { lon: 126.53, lat: 33.36, sx: 0.25, sy: 0.11, h: 0.88 }
];

// Alluvial plains / low river basins (carve elevation downward for lush plains)
const PLAIN_BASINS = [
  { lon: 125.65, lat: 39.00, sx: 0.55, sy: 0.45, d: 0.35 }, // Pyongyang / Chaeryong Plain
  { lon: 126.75, lat: 37.55, sx: 0.42, sy: 0.28, d: 0.28 }, // Gimpo / Han River Lower Plain
  { lon: 126.95, lat: 36.85, sx: 0.45, sy: 0.40, d: 0.26 }, // Pyeongtaek / Chungnam Coast
  { lon: 126.88, lat: 35.82, sx: 0.42, sy: 0.38, d: 0.32 }, // Honam / Gimje Rice Plain
  { lon: 126.62, lat: 34.98, sx: 0.38, sy: 0.32, d: 0.28 }, // Naju / Yeongsan Plain
  { lon: 128.60, lat: 35.50, sx: 0.45, sy: 0.50, d: 0.26 }  // Nakdong River Valley
];

// Metropolitan satellite light / concrete footprints
const URBAN_CLUSTERS = [
  { lon: 126.98, lat: 37.56, r: 0.34, intensity: 1.00 }, // Seoul
  { lon: 126.71, lat: 37.46, r: 0.18, intensity: 0.82 }, // Incheon
  { lon: 126.64, lat: 37.39, r: 0.14, intensity: 0.78 }, // Songdo
  { lon: 127.03, lat: 37.26, r: 0.18, intensity: 0.74 }, // Suwon
  { lon: 129.07, lat: 35.18, r: 0.24, intensity: 0.88 }, // Busan
  { lon: 129.31, lat: 35.54, r: 0.16, intensity: 0.65 }, // Ulsan
  { lon: 128.60, lat: 35.87, r: 0.20, intensity: 0.76 }, // Daegu
  { lon: 127.38, lat: 36.35, r: 0.18, intensity: 0.70 }, // Daejeon
  { lon: 127.29, lat: 36.48, r: 0.12, intensity: 0.52 }, // Sejong
  { lon: 126.85, lat: 35.16, r: 0.18, intensity: 0.68 }, // Gwangju
  { lon: 127.15, lat: 35.82, r: 0.13, intensity: 0.54 }, // Jeonju
  { lon: 128.88, lat: 37.75, r: 0.12, intensity: 0.46 }, // Gangneung
  { lon: 126.53, lat: 33.49, r: 0.13, intensity: 0.52 }, // Jeju
  { lon: 125.76, lat: 39.04, r: 0.16, intensity: 0.50 }  // Pyongyang
];

// Fast deterministic value noise for natural micro-terrain relief
function hash2d(ix, iy) {
  let n = Math.sin(ix * 127.1 + iy * 311.7) * 43758.5453123;
  return n - Math.floor(n);
}

function smoothNoise(x, y) {
  const ix = Math.floor(x);
  const iy = Math.floor(y);
  const fx = x - ix;
  const fy = y - iy;
  const ux = fx * fx * (3 - 2 * fx);
  const uy = fy * fy * (3 - 2 * fy);
  const a = hash2d(ix, iy);
  const b = hash2d(ix + 1, iy);
  const c = hash2d(ix, iy + 1);
  const d = hash2d(ix + 1, iy + 1);
  return a + (b - a) * ux + (c - a) * uy + (a - b - c + d) * ux * uy;
}

function fbm(x, y) {
  let v = 0;
  let amp = 0.52;
  let freq = 1;
  for (let i = 0; i < 4; i++) {
    v += amp * smoothNoise(x * freq, y * freq);
    freq *= 2.15;
    amp *= 0.48;
  }
  return v;
}

function svgToGeo(x, y) {
  return [127.5 + (x - 400) / 72, 43.0 - (y - 55) / 90];
}

function sampleElevation(x, y) {
  const [lon, lat] = svgToGeo(x, y);
  let elev = 0.14;

  for (let i = 0; i < ELEVATION_CENTERS.length; i++) {
    const c = ELEVATION_CENTERS[i];
    const dx = (lon - c.lon) / c.sx;
    const dy = (lat - c.lat) / c.sy;
    const d2 = dx * dx + dy * dy;
    if (d2 < 6.0) {
      elev += c.h * Math.exp(-d2);
    }
  }

  for (let i = 0; i < PLAIN_BASINS.length; i++) {
    const p = PLAIN_BASINS[i];
    const dx = (lon - p.lon) / p.sx;
    const dy = (lat - p.lat) / p.sy;
    const d2 = dx * dx + dy * dy;
    if (d2 < 4.0) {
      elev -= p.d * Math.exp(-d2);
    }
  }

  // Multi-octave mountain ridge texture
  const n = fbm(x * 0.022, y * 0.022);
  const ridge = 1.0 - Math.abs(fbm(x * 0.038 + 11.4, y * 0.038 + 4.7) * 2.0 - 1.0);
  elev = Math.max(0.02, elev * 0.72 + ridge * 0.34 * Math.min(1.0, elev + 0.15) + (n - 0.5) * 0.16);
  return Math.min(1.15, elev);
}

const SATELLITE_CACHE = {};

export function renderKoreaSatelliteDataUrl(theme = 'dark') {
  if (SATELLITE_CACHE[theme]) return SATELLITE_CACHE[theme];
  if (typeof document === 'undefined') return '';

  const W = KOREA_SVG_WIDTH;
  const H = KOREA_SVG_HEIGHT;
  const canvas = document.createElement('canvas');
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext('2d');
  if (!ctx) return '';

  const isLight = theme === 'light';

  // 1. Build crisp land masks (Korea Mainland+Islands vs Continental North)
  const landMaskCanvas = document.createElement('canvas');
  landMaskCanvas.width = W;
  landMaskCanvas.height = H;
  const mCtx = landMaskCanvas.getContext('2d');
  mCtx.fillStyle = '#000000';
  mCtx.fillRect(0, 0, W, H);

  // Subtle continental north mask (channel R=110)
  mCtx.fillStyle = 'rgb(110, 0, 0)';
  mCtx.beginPath();
  CONTINENTAL_NORTH_GEO.forEach(([lon, lat], idx) => {
    const [x, y] = geoToSvg(lon, lat);
    if (idx === 0) mCtx.moveTo(x, y);
    else mCtx.lineTo(x, y);
  });
  mCtx.closePath();
  mCtx.fill();

  // Korean Peninsula + Islands mask (channel R=255)
  mCtx.fillStyle = 'rgb(255, 0, 0)';
  mCtx.beginPath();
  KOREA_MAINLAND_GEO.forEach(([lon, lat], idx) => {
    const [x, y] = geoToSvg(lon, lat);
    if (idx === 0) mCtx.moveTo(x, y);
    else mCtx.lineTo(x, y);
  });
  mCtx.closePath();
  mCtx.fill();

  KOREA_ISLANDS_GEO.forEach(ring => {
    mCtx.beginPath();
    ring.forEach(([lon, lat], idx) => {
      const [x, y] = geoToSvg(lon, lat);
      if (idx === 0) mCtx.moveTo(x, y);
      else mCtx.lineTo(x, y);
    });
    mCtx.closePath();
    mCtx.fill();
  });

  // Compute coastal proximity blur mask (G channel) for shallow continental shelf & East Sea abyssal depth
  const shelfCanvas = document.createElement('canvas');
  shelfCanvas.width = W;
  shelfCanvas.height = H;
  const sCtx = shelfCanvas.getContext('2d');
  sCtx.filter = 'blur(26px)';
  sCtx.drawImage(landMaskCanvas, 0, 0);
  sCtx.filter = 'none';

  const maskData = mCtx.getImageData(0, 0, W, H).data;
  const shelfData = sCtx.getImageData(0, 0, W, H).data;
  const outImg = ctx.createImageData(W, H);
  const out = outImg.data;

  // Precompute elevation grid for fast hillshading normals
  const elevGrid = new Float32Array(W * H);
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      const idx = y * W + x;
      const mVal = maskData[idx * 4];
      if (mVal > 20) {
        elevGrid[idx] = sampleElevation(x, y);
      }
    }
  }

  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      const idx = y * W + x;
      const p4 = idx * 4;
      const mVal = maskData[p4];
      const isKorea = mVal > 200;
      const isContinent = mVal > 50 && !isKorea;
      const coastalShelf = shelfData[p4] / 255;

      if (!isKorea && !isContinent) {
        // Real Ocean Bathymetry (Yellow Sea shallow shelf vs deep East Sea basin)
        const [lon, lat] = svgToGeo(x, y);
        const eastSeaDepth = Math.max(0, Math.min(1, (lon - 127.9) * 0.45));
        const westShelf = Math.max(0, Math.min(1, (127.1 - lon) * 0.5)) * (lat > 34.4 ? 1 : 0.4);
        const seaWave = fbm(x * 0.015, y * 0.015) * 0.08;

        let r, g, b;
        if (isLight) {
          // Daylight Satellite Ocean: turquoise-teal coastal shallows -> rich pelagic cobalt
          const shallowMix = Math.min(1, coastalShelf * 1.45 + westShelf * 0.25);
          r = 160 + shallowMix * 24 - eastSeaDepth * 38 + seaWave * 28;
          g = 196 + shallowMix * 20 - eastSeaDepth * 28 + seaWave * 24;
          b = 224 + shallowMix * 12 - eastSeaDepth * 14 + seaWave * 18;
        } else {
          // Dark Satellite Ocean: deep slate-navy with subtle coastal bathymetric shelf
          const shallowMix = Math.min(1, coastalShelf * 1.15 + westShelf * 0.18);
          r = 8 + shallowMix * 14 - eastSeaDepth * 4 + seaWave * 12;
          g = 19 + shallowMix * 24 - eastSeaDepth * 7 + seaWave * 16;
          b = 36 + shallowMix * 32 - eastSeaDepth * 8 + seaWave * 22;
        }
        out[p4] = Math.max(0, Math.min(255, r));
        out[p4 + 1] = Math.max(0, Math.min(255, g));
        out[p4 + 2] = Math.max(0, Math.min(255, b));
        out[p4 + 3] = 255;
        continue;
      }

      // Hillshade calculation (NW sunlight)
      const eC = elevGrid[idx];
      const eL = x > 0 ? elevGrid[idx - 1] : eC;
      const eR = x < W - 1 ? elevGrid[idx + 1] : eC;
      const eU = y > 0 ? elevGrid[idx - W] : eC;
      const eD = y < H - 1 ? elevGrid[idx + W] : eC;
      const gx = (eR - eL) * 4.8;
      const gy = (eD - eU) * 4.8;
      // Dot product with light direction (-0.65, -0.60, 0.46)
      const shadeRaw = (-gx * 0.65 - gy * 0.60 + 0.46) / Math.sqrt(gx * gx + gy * gy + 1.0);
      const shade = Math.max(0.32, Math.min(1.45, shadeRaw * 1.45 + 0.35));

      const [lon, lat] = svgToGeo(x, y);
      let urban = 0;
      if (isKorea) {
        for (let u = 0; u < URBAN_CLUSTERS.length; u++) {
          const uc = URBAN_CLUSTERS[u];
          const dx = lon - uc.lon;
          const dy = (lat - uc.lat) * 1.25;
          const d2 = (dx * dx + dy * dy) / (uc.r * uc.r);
          if (d2 < 3.0) {
            urban = Math.max(urban, uc.intensity * Math.exp(-d2 * 1.8));
          }
        }
      }

      const microTex = (fbm(x * 0.085, y * 0.085) - 0.5) * 0.14;
      const veg = Math.max(0, Math.min(1, eC * 1.1 + microTex));

      let r, g, b;
      if (isLight) {
        // Natural-Color Daylight Satellite Biomes
        if (eC > 0.78) {
          // High alpine granite / Baekdu-Hallasan-Seorak ridges
          r = 136 + (eC - 0.78) * 95;
          g = 132 + (eC - 0.78) * 85;
          b = 118 + (eC - 0.78) * 80;
        } else if (eC > 0.36) {
          // Dense temperate forest mountain slopes
          const t = (eC - 0.36) / 0.42;
          r = 74 + (1 - t) * 28 + microTex * 40;
          g = 104 + (1 - t) * 18 + microTex * 35;
          b = 64 + (1 - t) * 10 + microTex * 20;
        } else {
          // Fertile alluvial valleys & coastal lowlands
          const t = eC / 0.36;
          r = 124 - t * 22 + microTex * 35;
          g = 138 - t * 16 + microTex * 30;
          b = 92 - t * 18 + microTex * 20;
        }

        // Apply crisp NW relief hillshading
        r *= 0.62 + shade * 0.44;
        g *= 0.62 + shade * 0.44;
        b *= 0.64 + shade * 0.42;

        // Subtle urban daylight metropolis footprint
        if (urban > 0.15) {
          const uMix = Math.min(0.75, urban * 0.8);
          r = r * (1 - uMix) + 178 * uMix;
          g = g * (1 - uMix) + 174 * uMix;
          b = b * (1 - uMix) + 168 * uMix;
        }

        // Dim continental Manchuria softly so Korea stands out cleanly
        if (isContinent) {
          r = r * 0.58 + 216 * 0.42;
          g = g * 0.58 + 220 * 0.42;
          b = b * 0.58 + 224 * 0.42;
        }
      } else {
        // Dark Satellite Earth Observatory Relief + Realistic Night Lights
        const base = 18 + veg * 24;
        r = base * (0.68 + shade * 0.42);
        g = (base + 7) * (0.70 + shade * 0.44);
        b = (base + 18) * (0.74 + shade * 0.46);

        if (eC > 0.78) {
          r += 16;
          g += 18;
          b += 22;
        }

        // Warm sodium/LED city night lights glow
        if (urban > 0.08) {
          const sparkle = 0.7 + 0.5 * hash2d(x * 0.7, y * 0.7);
          const glow = Math.min(1, urban * sparkle * 1.15);
          r += glow * 165;
          g += glow * 118;
          b += glow * 45;
        }

        if (isContinent) {
          r *= 0.65;
          g *= 0.65;
          b *= 0.68;
        }
      }

      out[p4] = Math.max(0, Math.min(255, r));
      out[p4 + 1] = Math.max(0, Math.min(255, g));
      out[p4 + 2] = Math.max(0, Math.min(255, b));
      out[p4 + 3] = 255;
    }
  }

  ctx.putImageData(outImg, 0, 0);

  // Subtle continental border sheen along Amnok & Tumen rivers
  ctx.strokeStyle = isLight ? 'rgba(15, 23, 42, 0.35)' : 'rgba(148, 163, 184, 0.35)';
  ctx.lineWidth = 1.4;
  ctx.beginPath();
  for (let i = 0; i <= 14; i++) {
    const [x, y] = geoToSvg(KOREA_MAINLAND_GEO[i][0], KOREA_MAINLAND_GEO[i][1]);
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.stroke();

  const dataUrl = canvas.toDataURL('image/png');
  SATELLITE_CACHE[theme] = dataUrl;
  return dataUrl;
}
