// Modern & Future Seoul Isometric Building & Architecture Tile Generators
// Produces 128x128 2:1 dimetric isometric tiles for Modern Seoul and Future Seoul.

// Helper to create an offscreen 128x128 canvas
function createTileCanvas() {
  const canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 128;
  const ctx = canvas.getContext('2d');
  ctx.imageSmoothingEnabled = false;
  return { canvas, ctx };
}

// 2:1 Dimetric Isometric coordinate helper
// Base center: (64, 96), Diamond: Top(64,64), Right(128,96), Bottom(64,128), Left(0,96)
function isoPt(x, y, z = 0) {
  return {
    x: 64 + (x - y),
    y: 96 + (x + y) * 0.5 - z
  };
}

// Draw ground polygon with varying themes
function drawModernGround(ctx, type = 'asphalt') {
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(64, 64);
  ctx.lineTo(128, 96);
  ctx.lineTo(64, 128);
  ctx.lineTo(0, 96);
  ctx.closePath();

  if (type === 'asphalt') {
    ctx.fillStyle = '#2f343b'; // Clean city asphalt
    ctx.fill();
    // Sidewalk curb border
    ctx.strokeStyle = '#636b75';
    ctx.lineWidth = 1;
    ctx.stroke();
  } else if (type === 'plaza') {
    ctx.fillStyle = '#7a828e'; // Granite modern plaza
    ctx.fill();
    ctx.strokeStyle = '#575f6b';
    ctx.lineWidth = 0.8;
    ctx.stroke();
  } else if (type === 'cyber') {
    ctx.fillStyle = '#16192b'; // Dark futuristic obsidian
    ctx.fill();
    ctx.strokeStyle = '#00f0ff';
    ctx.lineWidth = 1;
    ctx.stroke();
  } else if (type === 'park') {
    ctx.fillStyle = '#3a6635'; // Manicured city park grass
    ctx.fill();
  }
  ctx.restore();
}

// Draw isometric prism block with front-left, front-right, and top surfaces
function drawIsoBlock(ctx, minX, minY, maxX, maxY, zBase, height, options = {}) {
  const {
    leftColor = '#4a5568',
    rightColor = '#718096',
    topColor = '#a0aec0',
    outlineColor = null,
    lineWidth = 1
  } = options;

  const p1 = isoPt(minX, minY, zBase + height);
  const p2 = isoPt(maxX, minY, zBase + height);
  const p3 = isoPt(maxX, maxY, zBase + height);
  const p4 = isoPt(minX, maxY, zBase + height);

  const p1b = isoPt(minX, minY, zBase);
  const p3b = isoPt(maxX, maxY, zBase);
  const p4b = isoPt(minX, maxY, zBase);

  ctx.save();

  // 1. Front-left face (minX, minY -> minX, maxY)
  ctx.fillStyle = leftColor;
  ctx.beginPath();
  ctx.moveTo(p1.x, p1.y);
  ctx.lineTo(p4.x, p4.y);
  ctx.lineTo(p4b.x, p4b.y);
  ctx.lineTo(p1b.x, p1b.y);
  ctx.closePath();
  ctx.fill();
  if (outlineColor) {
    ctx.strokeStyle = outlineColor;
    ctx.lineWidth = lineWidth;
    ctx.stroke();
  }

  // 2. Front-right face (minX, maxY -> maxX, maxY)
  ctx.fillStyle = rightColor;
  ctx.beginPath();
  ctx.moveTo(p4.x, p4.y);
  ctx.lineTo(p3.x, p3.y);
  ctx.lineTo(p3b.x, p3b.y);
  ctx.lineTo(p4b.x, p4b.y);
  ctx.closePath();
  ctx.fill();
  if (outlineColor) {
    ctx.strokeStyle = outlineColor;
    ctx.lineWidth = lineWidth;
    ctx.stroke();
  }

  // 3. Top face
  ctx.fillStyle = topColor;
  ctx.beginPath();
  ctx.moveTo(p1.x, p1.y);
  ctx.lineTo(p2.x, p2.y);
  ctx.lineTo(p3.x, p3.y);
  ctx.lineTo(p4.x, p4.y);
  ctx.closePath();
  ctx.fill();
  if (outlineColor) {
    ctx.strokeStyle = outlineColor;
    ctx.lineWidth = lineWidth;
    ctx.stroke();
  }

  ctx.restore();
}

// Draw realistic window grid on isometric faces
function drawIsoWindows(ctx, minX, minY, maxX, maxY, zBase, height, rows, cols, windowColor = '#a5d8ff', frameColor = '#2b394a') {
  ctx.save();
  const dz = height / (rows + 1);

  // Left Face Windows (minX fixed, variable Y)
  const dy = (maxY - minY) / (cols + 1);
  for (let r = 1; r <= rows; r++) {
    const z = zBase + r * dz;
    for (let c = 1; c <= cols; c++) {
      const y = minY + c * dy;
      const wPt = isoPt(minX, y, z);
      ctx.fillStyle = windowColor;
      ctx.fillRect(wPt.x - 2, wPt.y - 1, 3, 2);
    }
  }

  // Right Face Windows (maxY fixed, variable X)
  const dx = (maxX - minX) / (cols + 1);
  for (let r = 1; r <= rows; r++) {
    const z = zBase + r * dz;
    for (let c = 1; c <= cols; c++) {
      const x = minX + c * dx;
      const wPt = isoPt(x, maxY, z);
      ctx.fillStyle = windowColor;
      ctx.fillRect(wPt.x - 1, wPt.y - 1, 3, 2);
    }
  }
  ctx.restore();
}

// -------------------------------------------------------------------------
// 1. MODERN SEOUL BUILDING GENERATORS (현재 서울: 아파트, 빌딩, 랜드마크)
// -------------------------------------------------------------------------
export function generateModernSeoulTiles() {
  const tiles = {};

  // b01: 대단지 래미안/자이 현대 아파트 타워
  {
    const { canvas, ctx } = createTileCanvas();
    drawModernGround(ctx, 'asphalt');
    // Apartment ground landscaped garden & parking lines
    drawIsoBlock(ctx, -26, -26, 26, 26, 0, 4, {
      leftColor: '#5c6470', rightColor: '#8a94a6', topColor: '#b4c0d4'
    });
    // Main Apartment Tower
    const aptHeight = 58;
    drawIsoBlock(ctx, -18, -14, 18, 14, 4, aptHeight, {
      leftColor: '#e0dcd3', rightColor: '#f7f4ed', topColor: '#b8c0cc', outlineColor: '#848e9c'
    });
    // Distinctive color brand accent bands (Green/Blue Xi/Raemian accent)
    drawIsoBlock(ctx, -18.5, -14.5, 18.5, 14.5, 36, 5, {
      leftColor: '#1e5f74', rightColor: '#2d89a4', topColor: '#38a3c2'
    });
    // Apartment window grid with balconies
    drawIsoWindows(ctx, -18, -14, 18, 14, 8, aptHeight - 12, 7, 3, '#90b4ce');
    // Rooftop elevator penthouse / water tank & solar panel
    drawIsoBlock(ctx, -8, -6, 8, 6, 4 + aptHeight, 8, {
      leftColor: '#5a6270', rightColor: '#7c8698', topColor: '#9aa5b8'
    });
    // Rooftop red aviation beacon
    const beacon = isoPt(0, 0, 4 + aptHeight + 11);
    ctx.fillStyle = '#ff3333';
    ctx.fillRect(beacon.x - 1, beacon.y - 2, 2, 2);

    tiles['b01_cottage_red'] = canvas.toDataURL('image/png');
  }

  // b02: 강남 테헤란로 유리 커튼월 오피스 타워 (Gangnam Glass Office Skyscraper)
  {
    const { canvas, ctx } = createTileCanvas();
    drawModernGround(ctx, 'plaza');
    // Podium lobby
    drawIsoBlock(ctx, -24, -24, 24, 24, 0, 8, {
      leftColor: '#3a4454', rightColor: '#4f5d73', topColor: '#687b96'
    });
    // Glass curtain wall highrise tower
    const towerH = 68;
    drawIsoBlock(ctx, -16, -16, 16, 16, 8, towerH, {
      leftColor: '#2b5876', rightColor: '#4e87a0', topColor: '#74b4ce', outlineColor: '#8ecae6'
    });
    // Reflective glass mullion lines
    ctx.save();
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.45)';
    ctx.lineWidth = 1;
    for (let h = 14; h < towerH + 6; h += 7) {
      const pL = isoPt(-16, -16, h);
      const pM = isoPt(-16, 16, h);
      const pR = isoPt(16, 16, h);
      ctx.beginPath();
      ctx.moveTo(pL.x, pL.y);
      ctx.lineTo(pM.x, pM.y);
      ctx.lineTo(pR.x, pR.y);
      ctx.stroke();
    }
    ctx.restore();
    // Rooftop helipad
    drawIsoBlock(ctx, -10, -10, 10, 10, 8 + towerH, 3, {
      leftColor: '#404552', rightColor: '#525a6b', topColor: '#f1faee'
    });
    // Red 'H' on helipad
    const hPt = isoPt(0, 0, 8 + towerH + 3);
    ctx.fillStyle = '#e63946';
    ctx.font = 'bold 8px monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('H', hPt.x, hPt.y);

    tiles['b02_tudor_inn'] = canvas.toDataURL('image/png');
  }

  // b03: 롯데월드타워 초고층 빌딩 (Lotte World Tower Inspired Supertall)
  {
    const { canvas, ctx } = createTileCanvas();
    drawModernGround(ctx, 'plaza');
    // Tier 1 Base
    drawIsoBlock(ctx, -22, -22, 22, 22, 0, 20, {
      leftColor: '#3b556e', rightColor: '#537895', topColor: '#7ba0c0'
    });
    // Tier 2 Mid
    drawIsoBlock(ctx, -16, -16, 16, 16, 20, 26, {
      leftColor: '#476d8c', rightColor: '#6395b8', topColor: '#8ec0e4'
    });
    // Tier 3 High
    drawIsoBlock(ctx, -10, -10, 10, 10, 46, 26, {
      leftColor: '#5a8cb3', rightColor: '#7bb8dd', topColor: '#b3e0ff'
    });
    // Tapering Spire Pinnacle
    drawIsoBlock(ctx, -4, -4, 4, 4, 72, 16, {
      leftColor: '#7ab8e0', rightColor: '#a0d8ff', topColor: '#ffffff'
    });
    // Crown Needle tip
    const needleTop = isoPt(0, 0, 95);
    const needleBot = isoPt(0, 0, 88);
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(needleBot.x, needleBot.y);
    ctx.lineTo(needleTop.x, needleTop.y);
    ctx.stroke();
    ctx.fillStyle = '#ff2a2a';
    ctx.fillRect(needleTop.x - 1, needleTop.y - 1, 2, 2);

    tiles['b03_blacksmith_forge'] = canvas.toDataURL('image/png');
  }

  // b04: 복합 쇼핑몰 & 백화점 (Modern Seoul Department Store & Mall)
  {
    const { canvas, ctx } = createTileCanvas();
    drawModernGround(ctx, 'asphalt');
    // Large commercial block
    drawIsoBlock(ctx, -25, -25, 25, 25, 0, 28, {
      leftColor: '#282b30', rightColor: '#3b4047', topColor: '#525a63', outlineColor: '#1c1e21'
    });
    // Giant LED digital billboard / media facade on left face
    const ledTopLeft = isoPt(-25, -15, 24);
    const ledBotLeft = isoPt(-25, -15, 8);
    const ledBotRight = isoPt(-25, 15, 8);
    const ledTopRight = isoPt(-25, 15, 24);
    ctx.save();
    ctx.fillStyle = '#ff007f';
    ctx.beginPath();
    ctx.moveTo(ledTopLeft.x, ledTopLeft.y);
    ctx.lineTo(ledTopRight.x, ledTopRight.y);
    ctx.lineTo(ledBotRight.x, ledBotRight.y);
    ctx.lineTo(ledBotLeft.x, ledBotLeft.y);
    ctx.closePath();
    ctx.fill();
    // Glitz on media billboard
    ctx.fillStyle = '#00f5d4';
    ctx.fillRect((ledTopLeft.x + ledBotRight.x) / 2 - 4, (ledTopLeft.y + ledBotRight.y) / 2 - 2, 8, 4);
    ctx.restore();
    // Glass canopy entrance on right face
    drawIsoBlock(ctx, -10, 25, 10, 29, 0, 8, {
      leftColor: '#00b4d8', rightColor: '#90e0ef', topColor: '#caf0f8'
    });
    // Rooftop garden
    drawIsoBlock(ctx, -18, -18, 18, 18, 28, 4, {
      leftColor: '#2d6a4f', rightColor: '#40916c', topColor: '#52b788'
    });

    tiles['b04_windmill'] = canvas.toDataURL('image/png');
  }

  // b05: 남산 서울타워 (N Seoul Tower Landmark)
  {
    const { canvas, ctx } = createTileCanvas();
    drawModernGround(ctx, 'park');
    // Mountain ridge base
    drawIsoBlock(ctx, -24, -24, 24, 24, 0, 10, {
      leftColor: '#386641', rightColor: '#6a994e', topColor: '#a7c957'
    });
    // Tower plaza terrace
    drawIsoBlock(ctx, -14, -14, 14, 14, 10, 6, {
      leftColor: '#4a4e69', rightColor: '#6c757d', topColor: '#adb5bd'
    });
    // Tower stem concrete column
    drawIsoBlock(ctx, -4, -4, 4, 4, 16, 44, {
      leftColor: '#8d99ae', rightColor: '#edf2f4', topColor: '#ffffff'
    });
    // 360 Observatory Deck (pod)
    drawIsoBlock(ctx, -12, -12, 12, 12, 60, 10, {
      leftColor: '#1d3557', rightColor: '#457b9d', topColor: '#a8dadc'
    });
    // Observatory blue/green glass windows
    ctx.fillStyle = '#00f5d4';
    const podCenter = isoPt(0, 0, 65);
    ctx.fillRect(podCenter.x - 7, podCenter.y - 2, 14, 3);
    // Upper antenna mast
    const mastBase = isoPt(0, 0, 70);
    const mastTip = isoPt(0, 0, 94);
    ctx.strokeStyle = '#e63946';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(mastBase.x, mastBase.y);
    ctx.lineTo(mastTip.x, mastTip.y);
    ctx.stroke();
    // Night glow beacon
    ctx.fillStyle = '#00f5ff';
    ctx.fillRect(mastTip.x - 1, mastTip.y - 2, 3, 3);

    tiles['b05_watermill'] = canvas.toDataURL('image/png');
  }

  // b06: 현대식 빌라 & 다세대 주택 (Modern Red Brick Urban Villa / Rowhouse)
  {
    const { canvas, ctx } = createTileCanvas();
    drawModernGround(ctx, 'asphalt');
    // Ground pilotis parking (필로티 주차장)
    drawIsoBlock(ctx, -20, -18, 20, 18, 0, 10, {
      leftColor: '#33373d', rightColor: '#495057', topColor: '#6c757d'
    });
    // Parked white car in pilotis
    drawIsoBlock(ctx, -4, 2, 12, 14, 0, 6, {
      leftColor: '#adb5bd', rightColor: '#dee2e6', topColor: '#f8f9fa'
    });
    // 3-story red brick residential villa
    drawIsoBlock(ctx, -20, -18, 20, 18, 10, 32, {
      leftColor: '#8b3a2b', rightColor: '#b84a39', topColor: '#d66853', outlineColor: '#5c1d11'
    });
    // Villa windows & AC outdoor units
    drawIsoWindows(ctx, -20, -18, 20, 18, 14, 24, 3, 2, '#e0fbfc');
    // Rooftop blue waterproof coat (옥상 우레탄 녹색/청색 방수)
    drawIsoBlock(ctx, -19, -17, 19, 17, 42, 2, {
      leftColor: '#1d7874', rightColor: '#07b1ca', topColor: '#67e8f9'
    });
    // Rooftop small water tank & clothesline
    drawIsoBlock(ctx, -12, -8, -4, 0, 44, 6, {
      leftColor: '#1b4965', rightColor: '#2a6f97', topColor: '#468faf'
    });

    tiles['b06_bakery'] = canvas.toDataURL('image/png');
  }

  // b07: 24시 편의점 & 카페 (24H Convenience Store & Franchise Cafe)
  {
    const { canvas, ctx } = createTileCanvas();
    drawModernGround(ctx, 'asphalt');
    // 2-story commercial street corner building
    drawIsoBlock(ctx, -22, -22, 22, 22, 0, 24, {
      leftColor: '#2b2d42', rightColor: '#3d405b', topColor: '#8d99ae'
    });
    // 1F Bright convenience store glass storefront
    drawIsoBlock(ctx, -22.5, 0, 0, 22.5, 0, 10, {
      leftColor: '#ffffff', rightColor: '#f8f9fa', topColor: '#e9ecef'
    });
    // GS25 / CU style bright neon sign band
    ctx.fillStyle = '#00b4d8';
    const s1 = isoPt(-22, 0, 10);
    const s2 = isoPt(0, 22, 10);
    ctx.fillRect(s1.x - 2, s1.y - 1, 12, 3);
    ctx.fillStyle = '#ffb703';
    ctx.fillRect(s1.x + 10, s1.y - 1, 10, 3);
    // 2F Coffee shop warm amber windows
    drawIsoWindows(ctx, -22, -22, 22, 22, 12, 10, 1, 3, '#ffe3a8');

    tiles['b07_apothecary'] = canvas.toDataURL('image/png');
  }

  // b08: DDP 동대문디자인플라자 (Dongdaemun Design Plaza - Curved Aluminum Pod)
  {
    const { canvas, ctx } = createTileCanvas();
    drawModernGround(ctx, 'plaza');
    // Smooth parametric metallic curved volume
    drawIsoBlock(ctx, -26, -24, 26, 24, 0, 18, {
      leftColor: '#6c757d', rightColor: '#979dac', topColor: '#ced4da', outlineColor: '#495057'
    });
    // Sweeping organic rooftop walk & glass slit skylights
    drawIsoBlock(ctx, -18, -16, 18, 16, 18, 8, {
      leftColor: '#828a95', rightColor: '#b0b8c4', topColor: '#e9ecef'
    });
    // LED light ribbon embedded in facade
    ctx.strokeStyle = '#00f0ff';
    ctx.lineWidth = 1.5;
    const l1 = isoPt(-26, 10, 10);
    const l2 = isoPt(10, 24, 14);
    ctx.beginPath();
    ctx.moveTo(l1.x, l1.y);
    ctx.quadraticCurveTo(isoPt(0, 20, 18).x, isoPt(0, 20, 18).y, l2.x, l2.y);
    ctx.stroke();

    tiles['b08_watchtower'] = canvas.toDataURL('image/png');
  }

  // b09: 종합 대학 캠퍼스 & 연구소 (University Campus / Hospital)
  {
    const { canvas, ctx } = createTileCanvas();
    drawModernGround(ctx, 'park');
    // Classical granite academic hall with central clock tower
    drawIsoBlock(ctx, -24, -20, 24, 20, 0, 28, {
      leftColor: '#4a4e69', rightColor: '#6c757d', topColor: '#c9ada7'
    });
    // Classical colonnade pillars
    drawIsoWindows(ctx, -24, -20, 24, 20, 4, 22, 2, 4, '#f2e9e4');
    // Center clock tower
    drawIsoBlock(ctx, -8, -8, 8, 8, 28, 18, {
      leftColor: '#3d405b', rightColor: '#535775', topColor: '#9a8c98'
    });
    // Gilded clock dial
    const cPt = isoPt(0, 8, 38);
    ctx.fillStyle = '#ffb703';
    ctx.beginPath();
    ctx.arc(cPt.x, cPt.y, 3, 0, Math.PI * 2);
    ctx.fill();

    tiles['b09_chapel'] = canvas.toDataURL('image/png');
  }

  // b10: 여의도 국회의사당 돔 (National Assembly Dome / Yeouido Civic Hall)
  {
    const { canvas, ctx } = createTileCanvas();
    drawModernGround(ctx, 'plaza');
    // Grand white stone colonnade base
    drawIsoBlock(ctx, -26, -22, 26, 22, 0, 22, {
      leftColor: '#b0b8c2', rightColor: '#d8dee6', topColor: '#edf2f7', outlineColor: '#808c99'
    });
    // Iconic turquoise patina copper dome
    drawIsoBlock(ctx, -14, -14, 14, 14, 22, 14, {
      leftColor: '#1d7874', rightColor: '#2ec4b6', topColor: '#cbf3f0'
    });
    // Dome cupola finial
    const domeFinial = isoPt(0, 0, 40);
    ctx.fillStyle = '#ffb703';
    ctx.fillRect(domeFinial.x - 1, domeFinial.y - 2, 3, 3);

    tiles['b10_wizard_tower'] = canvas.toDataURL('image/png');
  }

  // Additional Modern Seoul Highrise & Apartment Blocks for b11 ~ b56
  for (let idx = 11; idx <= 56; idx++) {
    const tid = `b${idx < 10 ? '0' + idx : idx}`;
    const { canvas, ctx } = createTileCanvas();
    drawModernGround(ctx, idx % 2 === 0 ? 'asphalt' : 'plaza');

    if (idx === 11) {
      // 주상복합 아파트 (Mixed-Use Commercial & Highrise Residential)
      drawIsoBlock(ctx, -22, -22, 22, 22, 0, 14, { leftColor: '#343a40', rightColor: '#495057', topColor: '#6c757d' });
      drawIsoBlock(ctx, -14, -14, 14, 14, 14, 50, { leftColor: '#b08968', rightColor: '#ddb892', topColor: '#e6ccb2' });
      drawIsoWindows(ctx, -14, -14, 14, 14, 18, 42, 6, 2, '#a5d8ff');
    } else if (idx === 12) {
      // 한강변 뷰 아파트 (Han River Riverside Luxury Apartment)
      drawIsoBlock(ctx, -20, -16, 20, 16, 0, 54, { leftColor: '#2b5876', rightColor: '#4e87a0', topColor: '#89c2d9' });
      drawIsoWindows(ctx, -20, -16, 20, 16, 6, 44, 7, 3, '#e0fbfc');
    } else if (idx === 13) {
      // 강남 IT 벤처 테크 타워 (Tehran Valley IT Tech Hub)
      drawIsoBlock(ctx, -18, -18, 18, 18, 0, 60, { leftColor: '#1f242d', rightColor: '#323946', topColor: '#00adb5', outlineColor: '#00fff5' });
      drawIsoWindows(ctx, -18, -18, 18, 18, 8, 48, 8, 2, '#00fff5');
    } else if (idx === 14) {
      // 서울시청 신청사 스타일 (Seoul City Hall Wave Glass Building)
      drawIsoBlock(ctx, -24, -22, 24, 22, 0, 36, { leftColor: '#1d3557', rightColor: '#457b9d', topColor: '#a8dadc' });
      drawIsoBlock(ctx, -16, 12, 16, 22, 0, 20, { leftColor: '#2a9d8f', rightColor: '#52b788', topColor: '#95d5b2' });
    } else {
      // General Modern Apartment / Office Tower variants (신축 아파트 & 오피스텔)
      const h = 46 + (idx * 3) % 24;
      drawIsoBlock(ctx, -18, -18, 18, 18, 0, h, {
        leftColor: idx % 3 === 0 ? '#3f4e4f' : '#334155',
        rightColor: idx % 3 === 0 ? '#5a6b6c' : '#475569',
        topColor: idx % 3 === 0 ? '#a27b5c' : '#94a3b8'
      });
      drawIsoWindows(ctx, -18, -18, 18, 18, 6, h - 10, 6, 3, '#bae6fd');
    }

    // Map to tile ID
    const fullKey = Object.keys(tiles).find(k => k.startsWith(tid + '_'));
    if (fullKey) {
      tiles[fullKey] = canvas.toDataURL('image/png');
    } else {
      tiles[tid] = canvas.toDataURL('image/png');
    }
  }

  return tiles;
}

// -------------------------------------------------------------------------
// 2. FUTURE SEOUL BUILDING GENERATORS (미래 서울: 메가스트럭처, 사이버 시티)
// -------------------------------------------------------------------------
export function generateFutureSeoulTiles() {
  const tiles = {};

  // b01: 네오 사이버펑크 메가타워 (Cyberpunk Neo-Seoul Sky Arcology)
  {
    const { canvas, ctx } = createTileCanvas();
    drawModernGround(ctx, 'cyber');
    // Massive hexagonal base with neon conduits
    drawIsoBlock(ctx, -26, -26, 26, 26, 0, 14, {
      leftColor: '#0a0d18', rightColor: '#12172a', topColor: '#1e2640', outlineColor: '#00f0ff'
    });
    // Vertical Mega Arcology
    const h = 72;
    drawIsoBlock(ctx, -18, -18, 18, 18, 14, h, {
      leftColor: '#0f1422', rightColor: '#182035', topColor: '#2a3556', outlineColor: '#ff007f'
    });
    // Glowing Holographic Billboard on upper side
    const holo1 = isoPt(-18, -10, 52);
    const holo2 = isoPt(-18, 10, 52);
    ctx.save();
    ctx.fillStyle = 'rgba(255, 0, 128, 0.85)';
    ctx.fillRect(holo1.x - 2, holo1.y - 8, holo2.x - holo1.x + 4, 16);
    ctx.fillStyle = '#00ffff';
    ctx.font = 'bold 6px monospace';
    ctx.fillText('SEOUL 2099', holo1.x + 2, holo1.y);
    ctx.restore();
    // Sky-bridge docking port at top
    drawIsoBlock(ctx, -22, -6, 22, 6, 14 + h - 12, 6, {
      leftColor: '#0052cc', rightColor: '#0066ff', topColor: '#00f0ff'
    });
    // Anti-gravity levitation ring
    const ringCenter = isoPt(0, 0, 14 + h + 8);
    ctx.save();
    ctx.strokeStyle = '#00ffc4';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.ellipse(ringCenter.x, ringCenter.y, 14, 7, 0, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();

    tiles['b01_cottage_red'] = canvas.toDataURL('image/png');
  }

  // b02: 공중 드론 하이웨이 & 플라잉카 승강장 (Skyway Drone & Flying Taxi Hub)
  {
    const { canvas, ctx } = createTileCanvas();
    drawModernGround(ctx, 'cyber');
    // Lower energy pylon
    drawIsoBlock(ctx, -8, -8, 8, 8, 0, 48, {
      leftColor: '#0f172a', rightColor: '#1e293b', topColor: '#38bdf8'
    });
    // Elevated Sky Traffic Platform
    drawIsoBlock(ctx, -26, -26, 26, 26, 48, 8, {
      leftColor: '#1e1b4b', rightColor: '#312e81', topColor: '#4338ca', outlineColor: '#818cf8'
    });
    // Neon runway guides
    ctx.strokeStyle = '#22d3ee';
    ctx.lineWidth = 1.5;
    const r1 = isoPt(-20, 0, 56);
    const r2 = isoPt(20, 0, 56);
    ctx.beginPath();
    ctx.moveTo(r1.x, r1.y);
    ctx.lineTo(r2.x, r2.y);
    ctx.stroke();
    // Hovering Flying Car (플라잉카 / UAM 드론 택시)
    drawIsoBlock(ctx, -6, -4, 6, 4, 62, 4, {
      leftColor: '#f43f5e', rightColor: '#fb7185', topColor: '#fda4af'
    });
    // Blue thruster glow under flying car
    const glowPt = isoPt(0, 0, 60);
    ctx.fillStyle = 'rgba(0, 240, 255, 0.8)';
    ctx.beginPath();
    ctx.arc(glowPt.x, glowPt.y, 4, 0, Math.PI * 2);
    ctx.fill();

    tiles['b02_tudor_inn'] = canvas.toDataURL('image/png');
  }

  // b03: 미래 생태 바이오스피어 돔 (Eco-Biosphere Hydroponic Dome)
  {
    const { canvas, ctx } = createTileCanvas();
    drawModernGround(ctx, 'cyber');
    // Geodesic glass biodome
    drawIsoBlock(ctx, -24, -24, 24, 24, 0, 34, {
      leftColor: '#042f2e', rightColor: '#115e59', topColor: '#14b8a6', outlineColor: '#5eead4'
    });
    // Interior glowing green bio-plants and spiral hydroponics
    ctx.fillStyle = '#4ade80';
    const cPt = isoPt(0, 0, 20);
    ctx.beginPath();
    ctx.arc(cPt.x, cPt.y, 8, 0, Math.PI * 2);
    ctx.fill();
    // Clean energy spire
    const spTop = isoPt(0, 0, 50);
    const spBot = isoPt(0, 0, 34);
    ctx.strokeStyle = '#a7f3d0';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(spBot.x, spBot.y);
    ctx.lineTo(spTop.x, spTop.y);
    ctx.stroke();

    tiles['b03_blacksmith_forge'] = canvas.toDataURL('image/png');
  }

  // b04: 퀀텀 데이터코어 타워 (Quantum Data Core & AI Supercluster)
  {
    const { canvas, ctx } = createTileCanvas();
    drawModernGround(ctx, 'cyber');
    // Black monolith block
    drawIsoBlock(ctx, -20, -20, 20, 20, 0, 64, {
      leftColor: '#09090b', rightColor: '#18181b', topColor: '#27272a', outlineColor: '#a855f7'
    });
    // Vertical purple neon data bus streams
    ctx.fillStyle = '#c084fc';
    for (let h = 8; h <= 56; h += 8) {
      const p = isoPt(-20, 0, h);
      ctx.fillRect(p.x - 1, p.y, 3, 2);
    }
    for (let h = 12; h <= 60; h += 8) {
      const p = isoPt(0, 20, h);
      ctx.fillRect(p.x, p.y, 3, 2);
    }

    tiles['b04_windmill'] = canvas.toDataURL('image/png');
  }

  // b05: 핵융합 발전소 & 플라즈마 리액터 (Fusion Clean Energy Reactor)
  {
    const { canvas, ctx } = createTileCanvas();
    drawModernGround(ctx, 'cyber');
    // Tokamak Torus Reactor Ring
    drawIsoBlock(ctx, -22, -22, 22, 22, 0, 24, {
      leftColor: '#172554', rightColor: '#1e3a8a', topColor: '#2563eb', outlineColor: '#60a5fa'
    });
    // Glowing core
    const pCenter = isoPt(0, 0, 28);
    const radGrad = ctx.createRadialGradient(pCenter.x, pCenter.y, 1, pCenter.x, pCenter.y, 14);
    radGrad.addColorStop(0, '#ffffff');
    radGrad.addColorStop(0.4, '#38bdf8');
    radGrad.addColorStop(1, 'rgba(14, 165, 233, 0)');
    ctx.fillStyle = radGrad;
    ctx.beginPath();
    ctx.arc(pCenter.x, pCenter.y, 14, 0, Math.PI * 2);
    ctx.fill();

    tiles['b05_watermill'] = canvas.toDataURL('image/png');
  }

  // Generic Future Megastructure tiles for b06 ~ b56
  for (let idx = 6; idx <= 56; idx++) {
    const tid = `b${idx < 10 ? '0' + idx : idx}`;
    const { canvas, ctx } = createTileCanvas();
    drawModernGround(ctx, 'cyber');

    const h = 48 + (idx * 5) % 36;
    drawIsoBlock(ctx, -18, -18, 18, 18, 0, h, {
      leftColor: '#0b0f19',
      rightColor: '#151d30',
      topColor: idx % 2 === 0 ? '#0284c7' : '#9333ea',
      outlineColor: idx % 2 === 0 ? '#38bdf8' : '#c084fc'
    });
    drawIsoWindows(ctx, -18, -18, 18, 18, 6, h - 10, 6, 2, idx % 2 === 0 ? '#38bdf8' : '#e879f9');

    const fullKey = Object.keys(tiles).find(k => k.startsWith(tid + '_'));
    if (fullKey) {
      tiles[fullKey] = canvas.toDataURL('image/png');
    } else {
      tiles[tid] = canvas.toDataURL('image/png');
    }
  }

  return tiles;
}

// Architectural Metadata & Labels for Modern Seoul
export const MODERN_SEOUL_LABELS = {
  'b01_cottage_red': { label: '래미안·자이 대단지 아파트 (Xi Tower)', doc: '발코니와 조경 정원, 옥상 엘리베이터 권상기실을 갖춘 현대 서울 대단지 고층 아파트.' },
  'b02_tudor_inn': { label: '테헤란로 유리 커튼월 빌딩 (Tehran Skyscraper)', doc: '강남 중심가 테헤란로의 반사 유리 커튼월 고층 오피스 타워와 옥상 헬리패드.' },
  'b03_blacksmith_forge': { label: '롯데월드타워 첨탑 (Lotte World Tower)', doc: '서울 스카이라인을 압도하는 초고층 첨탑 랜드마크. 유려한 곡선과 정상 항공장애등.' },
  'b04_windmill': { label: '현대 백화점 & 미디어 파사드 (Department Store)', doc: '거대한 화려한 LED 디지털 전광판과 쇼핑몰 캐노피를 갖춘 대형 백화점.' },
  'b05_watermill': { label: '필로티 다세대 빌라 (Pilotis Villa)', doc: '서울 주택가의 대표적 건축 양식. 1층 지상 필로티 주차장과 붉은 벽돌 다세대 주택.' },
  'b06_bakery': { label: '24시 편의점 & 1층 카페 (GS25/Cafe Plaza)', doc: '1층 24시간 불을 밝히는 편의점과 통유리 테라스 카페가 입점한 신축 근린생활 상가.' },
  'b07_apothecary': { label: 'N서울타워 남산 타워 (N Seoul Tower)', doc: '남산 정상에서 서울 전역을 굽어보는 전파탑 전망대와 회전 레스토랑.' },
  'b08_watchtower': { label: '동대문 디자인플라자 DDP (DDP Curved Pavilion)', doc: '자하 하디드 설계의 미래지향적 비정형 알루미늄 패널 유선형 곡면 건축물.' },
  'b09_chapel': { label: '서울 명문대 본관 석조관 (University Stone Hall)', doc: '화강암 고딕 아치와 삼각 박공 지붕을 갖춘 역사 깊은 대학 학술 본관.' },
  'b10_wizard_tower': { label: '여의도 국회의사당 돔 (National Assembly)', doc: '거대한 녹색 청동 돔과 웅장한 화강암 기둥 열주를 자랑하는 의사당 랜드마크.' },
  'b11_carpenter_sawmill': { label: '주상복합 초고층 타워 (Mixed-Use Complex)', doc: '하층부 프리미엄 상가와 상층부 펜트하우스 주거가 결합된 현대 주상복합 타워.' },
  'b12_general_store': { label: '한강변 뷰 럭셔리 아파트 (Riverside Luxury Apt)', doc: '전면 통창으로 한강 파노라마 뷰를 조망할 수 있는 최고급 한강변 아파트.' },
  'b13_barn_silo': { label: '강남 IT 벤처 테크 타워 (IT Tech Hub)', doc: '네온 조명과 통유리로 디자인된 테헤란밸리 첨단 IT 스타트업 R&D 사옥.' },
  'b14_town_hall': { label: '서울시청 신청사 곡면 유리관 (Seoul City Hall)', doc: '전통 한옥 처마의 곡선을 현대적 파도 형상의 글라스 커튼월로 재해석한 신청사.' },
  'b15_library_scholar': { label: '국립중앙도서관 & 디지털 서고 (National Library)', doc: '방대한 장서와 전자 정보 디지털 아카이브를 갖춘 현대식 공공 도서관.' },
  'b16_alchemist_workshop': { label: '성수동 붉은벽돌 카페 팩토리 (Seongsu Brick Factory)', doc: '옛 공장을 감각적인 복합문화공간과 로스터리 카페로 재생한 성수동 명소.' },
  'b17_twin_gatehouse': { label: '강남대로 미디어폴 광장 게이트 (Media Pole Gate)', doc: '양옆으로 솟은 디지털 미디어 폴과 보행자 전용 스마트 시티 관문.' },
  'b18_greenhouse_orangery': { label: '서울 식물원 온실 돔 (Seoul Botanic Dome)', doc: '지름 100m의 오목한 연꽃 형태 온실 돔. 열대 및 지중해 희귀 식물 전시관.' },
  'b19_lighthouse_dock': { label: '한강 아라호 유람선 선착장 (Han River Cruise Dock)', doc: '여의도 한강공원 물빛광장과 연결된 유람선 선착장과 수상 레저 스테이션.' },
  'b20_noble_manor': { label: '평창동 대저택 갤러리 하우스 (Luxury Villa Manor)', doc: '높은 담장과 개인 중정, 조각 정원을 갖춘 프라이빗 하이엔드 주택.' }
};

// Architectural Metadata & Labels for Future Seoul 2099
export const FUTURE_SEOUL_LABELS = {
  'b01_cottage_red': { label: '네오 서울 사이버 아콜로지 (Sky Arcology)', doc: '상공 500m에 달하는 수직 입체 메가도시. 홀로그램 간판과 자기부상 링 탑재.' },
  'b02_tudor_inn': { label: '공중 드론 하이웨이 포트 (Flying Taxi Hub)', doc: '플라잉카(UAM)와 자율비행 드론이 실시간 이착륙하는 공중 스카이 교통 환승장.' },
  'b03_blacksmith_forge': { label: '생태 바이오스피어 돔 (Eco-Biosphere Dome)', doc: '기후 통제 지오데식 글라스 돔 내부에서 수직 수경재배를 수행하는 미래 농업 코어.' },
  'b04_windmill': { label: '퀀텀 데이터코어 타워 (Quantum Data Core)', doc: '도시 전체 인공지능을 총괄하는 초전도 양자 연산 슈퍼클러스터 모놀리스.' },
  'b05_watermill': { label: '상온 핵융합 플라즈마 리액터 (Fusion Reactor)', doc: '토카막 자기장 링으로 무한 청정에너지를 공급하는 도시 청정 핵융합 발전소.' },
  'b06_bakery': { label: '홀로그램 사이버 마켓 (Holo-Market Plaza)', doc: '실물 없이 양자 전송과 3D 홀로그램 쇼핑이 이루어지는 미래 사이버 상업 구역.' },
  'b07_apothecary': { label: '나노 메디컬 바이오센터 (Nano-Med Center)', doc: '재생 의학 캡슐과 나노봇 치료 시스템을 갖춘 미래 중앙 의료 아콜로지.' },
  'b08_watchtower': { label: '행성간 통신 비컨 타워 (Orbital Beacon Spire)', doc: '궤도 엘리베이터 및 우주 정거장과 고속 레이저 통신을 연결하는 통신탑.' },
  'b09_chapel': { label: '사이버 스피릿 신전 (Cybernetic Sanctuary)', doc: '디지털 의식과 메타버스 아카이브를 보존하는 네온 에너지 성소.' },
  'b10_wizard_tower': { label: '테라포밍 대기정화 타워 (Atmosphere Scrub Spire)', doc: '대기 중 탄소를 포집해 플라즈마 분해하는 친환경 미래 대기정화 탑.' }
};

