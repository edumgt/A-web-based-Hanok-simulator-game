// Joseon Dynasty Korean Traditional House & Building Pixel Art Generator
// Produces 128x128 2:1 dimetric isometric tiles for all Joseon buildings & houses.

export function generateJoseonBuildingTiles() {
  const tiles = {};

  // Helper to create an offscreen 128x128 canvas
  function createTileCanvas() {
    const canvas = document.createElement('canvas');
    canvas.width = 128;
    canvas.height = 128;
    const ctx = canvas.getContext('2d');
    ctx.imageSmoothingEnabled = false;
    return { canvas, ctx };
  }

  // --- Core Isometric Geometry Helpers (128x128 tile) ---
  // Ground Diamond Base:
  // Top: (64, 64), Right: (128, 96), Bottom: (64, 128), Left: (0, 96)
  // Center of base: (64, 96)
  // Isometric projection: isoX(x, y) = 64 + (x - y), isoY(x, y, z) = 96 + (x + y)*0.5 - z

  function isoPt(x, y, z = 0) {
    return {
      x: 64 + (x - y),
      y: 96 + (x + y) * 0.5 - z
    };
  }

  // Draw ground polygon (madang courtyard / yard)
  function drawIsoGround(ctx, type = 'madang') {
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(64, 64);
    ctx.lineTo(128, 96);
    ctx.lineTo(64, 128);
    ctx.lineTo(0, 96);
    ctx.closePath();

    if (type === 'madang') {
      // Warm Korean courtyard sand & clay
      ctx.fillStyle = '#c7b293';
      ctx.fill();
      // Subtle pebble / soil speckles
      ctx.fillStyle = '#b59e7e';
      ctx.fillRect(52, 92, 2, 1);
      ctx.fillRect(74, 98, 2, 1);
      ctx.fillRect(60, 110, 2, 1);
      ctx.fillRect(86, 88, 2, 1);
      ctx.fillRect(40, 95, 2, 1);
      ctx.fillRect(68, 80, 2, 1);
    } else if (type === 'grass') {
      ctx.fillStyle = '#628a42';
      ctx.fill();
      ctx.fillStyle = '#527534';
      ctx.fillRect(54, 90, 2, 2);
      ctx.fillRect(72, 102, 2, 2);
      ctx.fillRect(44, 98, 2, 2);
      ctx.fillRect(80, 86, 2, 2);
    } else if (type === 'stone') {
      ctx.fillStyle = '#949599';
      ctx.fill();
      // Flagstone grid
      ctx.strokeStyle = '#7c7d82';
      ctx.lineWidth = 1;
      ctx.stroke();
    }
    ctx.restore();
  }

  // Draw raised stone foundation (기단 - Gidan)
  function drawGidan(ctx, minX, minY, maxX, maxY, height = 7) {
    // Top surface
    const p1 = isoPt(minX, minY, height);
    const p2 = isoPt(maxX, minY, height);
    const p3 = isoPt(maxX, maxY, height);
    const p4 = isoPt(minX, maxY, height);

    // Front-left face (minX, minY) to (minX, maxY)
    const p1b = isoPt(minX, minY, 0);
    const p4b = isoPt(minX, maxY, 0);

    // Front-right face (minX, maxY) to (maxX, maxY)
    const p3b = isoPt(maxX, maxY, 0);

    ctx.save();
    // Front-left stone face (shaded darker)
    ctx.fillStyle = '#6b6c70';
    ctx.beginPath();
    ctx.moveTo(p1.x, p1.y);
    ctx.lineTo(p4.x, p4.y);
    ctx.lineTo(p4b.x, p4b.y);
    ctx.lineTo(p1b.x, p1b.y);
    ctx.closePath();
    ctx.fill();

    // Front-right stone face (medium light)
    ctx.fillStyle = '#828388';
    ctx.beginPath();
    ctx.moveTo(p4.x, p4.y);
    ctx.lineTo(p3.x, p3.y);
    ctx.lineTo(p3b.x, p3b.y);
    ctx.lineTo(p4b.x, p4b.y);
    ctx.closePath();
    ctx.fill();

    // Top stone surface
    ctx.fillStyle = '#9e9fa4';
    ctx.beginPath();
    ctx.moveTo(p1.x, p1.y);
    ctx.lineTo(p2.x, p2.y);
    ctx.lineTo(p3.x, p3.y);
    ctx.lineTo(p4.x, p4.y);
    ctx.closePath();
    ctx.fill();

    // Joint lines on stone foundation
    ctx.strokeStyle = '#5a5b5e';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(p4.x, p4.y);
    ctx.lineTo(p4b.x, p4b.y);
    ctx.stroke();

    ctx.restore();
  }

  // Draw Hanok wall block (white plaster / earthen clay)
  function drawHanokWalls(ctx, minX, minY, maxX, maxY, zBase, zHeight, wallType = 'white') {
    const p1 = isoPt(minX, minY, zBase + zHeight);
    const p2 = isoPt(maxX, minY, zBase + zHeight);
    const p3 = isoPt(maxX, maxY, zBase + zHeight);
    const p4 = isoPt(minX, maxY, zBase + zHeight);

    const p1b = isoPt(minX, minY, zBase);
    const p3b = isoPt(maxX, maxY, zBase);
    const p4b = isoPt(minX, maxY, zBase);

    ctx.save();
    // Front-left wall
    ctx.fillStyle = (wallType === 'white') ? '#dcd6ca' : '#b2723c';
    ctx.beginPath();
    ctx.moveTo(p1.x, p1.y);
    ctx.lineTo(p4.x, p4.y);
    ctx.lineTo(p4b.x, p4b.y);
    ctx.lineTo(p1b.x, p1b.y);
    ctx.closePath();
    ctx.fill();

    // Front-right wall
    ctx.fillStyle = (wallType === 'white') ? '#f2ece1' : '#c9844a';
    ctx.beginPath();
    ctx.moveTo(p4.x, p4.y);
    ctx.lineTo(p3.x, p3.y);
    ctx.lineTo(p3b.x, p3b.y);
    ctx.lineTo(p4b.x, p4b.y);
    ctx.closePath();
    ctx.fill();

    // Wooden timber columns (기둥 - Gidung) at corners
    const timberColor = '#4a3224';
    function drawPillar(px, py) {
      const topP = isoPt(px, py, zBase + zHeight);
      const botP = isoPt(px, py, zBase);
      ctx.fillStyle = timberColor;
      ctx.fillRect(topP.x - 1, topP.y, 3, botP.y - topP.y);
    }
    drawPillar(minX, minY);
    drawPillar(minX, maxY);
    drawPillar(maxX, maxY);

    // Horizontal wooden lintel beams (인방 / 도리)
    ctx.strokeStyle = timberColor;
    ctx.lineWidth = 2;
    // Top lintel
    ctx.beginPath();
    ctx.moveTo(p1.x, p1.y);
    ctx.lineTo(p4.x, p4.y);
    ctx.lineTo(p3.x, p3.y);
    ctx.stroke();

    // Bottom sill beam
    ctx.beginPath();
    ctx.moveTo(p1b.x, p1b.y);
    ctx.lineTo(p4b.x, p4b.y);
    ctx.lineTo(p3b.x, p3b.y);
    ctx.stroke();

    ctx.restore();
  }

  // Draw Changhomun lattice sliding door / window (창호문)
  function drawChanghomun(ctx, face, x1, y1, x2, y2, zBase, zHeight) {
    const pt1 = isoPt(x1, y1, zBase + zHeight);
    const pt2 = isoPt(x2, y2, zBase + zHeight);
    const pt3 = isoPt(x2, y2, zBase);
    const pt4 = isoPt(x1, y1, zBase);

    ctx.save();
    // Hanji paper panel
    ctx.fillStyle = '#faf8f2';
    ctx.beginPath();
    ctx.moveTo(pt1.x, pt1.y);
    ctx.lineTo(pt2.x, pt2.y);
    ctx.lineTo(pt3.x, pt3.y);
    ctx.lineTo(pt4.x, pt4.y);
    ctx.closePath();
    ctx.fill();

    // Outer timber frame
    ctx.strokeStyle = '#5d4037';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Delicate lattice grid
    ctx.strokeStyle = '#8d6e63';
    ctx.lineWidth = 0.8;
    // Horizontal mullions
    for (let f = 0.25; f <= 0.75; f += 0.25) {
      const pTop = { x: pt1.x + (pt2.x - pt1.x) * f, y: pt1.y + (pt2.y - pt1.y) * f };
      const pBot = { x: pt4.x + (pt3.x - pt4.x) * f, y: pt4.y + (pt3.y - pt4.y) * f };
      ctx.beginPath();
      ctx.moveTo(pTop.x, pTop.y);
      ctx.lineTo(pBot.x, pBot.y);
      ctx.stroke();
    }
    for (let f = 0.33; f <= 0.67; f += 0.33) {
      const pL = { x: pt1.x + (pt4.x - pt1.x) * f, y: pt1.y + (pt4.y - pt1.y) * f };
      const pR = { x: pt2.x + (pt3.x - pt2.x) * f, y: pt2.y + (pt3.y - pt2.y) * f };
      ctx.beginPath();
      ctx.moveTo(pL.x, pL.y);
      ctx.lineTo(pR.x, pR.y);
      ctx.stroke();
    }
    ctx.restore();
  }

  // Draw open wooden floor / Daechung-maru veranda (대청마루)
  function drawDaechungMaru(ctx, x1, y1, x2, y2, zBase) {
    const pt1 = isoPt(x1, y1, zBase);
    const pt2 = isoPt(x2, y1, zBase);
    const pt3 = isoPt(x2, y2, zBase);
    const pt4 = isoPt(x1, y2, zBase);

    ctx.save();
    ctx.fillStyle = '#b08b59';
    ctx.beginPath();
    ctx.moveTo(pt1.x, pt1.y);
    ctx.lineTo(pt2.x, pt2.y);
    ctx.lineTo(pt3.x, pt3.y);
    ctx.lineTo(pt4.x, pt4.y);
    ctx.closePath();
    ctx.fill();

    // Planks
    ctx.strokeStyle = '#8c6838';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(pt1.x, pt1.y);
    ctx.lineTo(pt4.x, pt4.y);
    ctx.lineTo(pt3.x, pt3.y);
    ctx.stroke();
    ctx.restore();
  }

  // Draw Giwa curved tile roof (기와지붕 - Paljak / Matbae)
  function drawGiwaRoof(ctx, minX, minY, maxX, maxY, zBase, roofHeight = 18, overhang = 6, dancheong = false) {
    // Eaves overhang boundaries
    const eMinX = minX - overhang;
    const eMinY = minY - overhang;
    const eMaxX = maxX + overhang;
    const eMaxY = maxY + overhang;

    // Corner eaves points with upward flair (처마 반전)
    const flare = 4; // upturned corners
    const cNW = isoPt(eMinX, eMinY, zBase + flare); // Back
    const cNE = isoPt(eMaxX, eMinY, zBase + flare); // Right
    const cSE = isoPt(eMaxX, eMaxY, zBase + flare); // Front
    const cSW = isoPt(eMinX, eMaxY, zBase + flare); // Left

    // Mid-eaves points (drooping gracefully in middle)
    const mFront = isoPt((eMinX + eMaxX) * 0.5, eMaxY, zBase);
    const mLeft = isoPt(eMinX, (eMinY + eMaxY) * 0.5, zBase);
    const mRight = isoPt(eMaxX, (eMinY + eMaxY) * 0.5, zBase);

    // Ridge (용마루 - Yongmaru)
    const rZ = zBase + roofHeight;
    const rInset = (eMaxX - eMinX) * 0.18;
    const rLeft = isoPt(eMinX + rInset, (eMinY + eMaxY) * 0.5, rZ);
    const rRight = isoPt(eMaxX - rInset, (eMinY + eMaxY) * 0.5, rZ);

    ctx.save();

    // Optional Dancheong eaves trim beneath roof
    if (dancheong) {
      ctx.fillStyle = '#00796b'; // Dancheong jade-green
      ctx.fillRect(cSW.x - 2, cSW.y + 1, 4, 3);
      ctx.fillRect(cSE.x - 2, cSE.y + 1, 4, 3);
      ctx.fillStyle = '#c62828'; // Dancheong vermilion red
      ctx.fillRect(mFront.x - 1, mFront.y + 1, 3, 2);
    }

    // Exposed rafters (서까래) shadow under eaves
    ctx.strokeStyle = '#2d221c';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(cSW.x, cSW.y + 2);
    ctx.quadraticCurveTo(mFront.x, mFront.y + 3, cSE.x, cSE.y + 2);
    ctx.stroke();

    // 1. Left slope of Giwa roof (shaded dark)
    ctx.fillStyle = '#262a33';
    ctx.beginPath();
    ctx.moveTo(rLeft.x, rLeft.y);
    ctx.lineTo(rRight.x, rRight.y);
    ctx.lineTo(cSE.x, cSE.y);
    ctx.quadraticCurveTo(mFront.x, mFront.y, cSW.x, cSW.y);
    ctx.closePath();
    ctx.fill();

    // Front-left hipped hip/gable
    ctx.fillStyle = '#1c1f26';
    ctx.beginPath();
    ctx.moveTo(rLeft.x, rLeft.y);
    ctx.lineTo(cSW.x, cSW.y);
    ctx.quadraticCurveTo(mLeft.x, mLeft.y, cNW.x, cNW.y);
    ctx.closePath();
    ctx.fill();

    // Giwa tile grooves (골기와 - parallel ridge curves)
    ctx.strokeStyle = '#383d49';
    ctx.lineWidth = 1;
    const steps = 7;
    for (let i = 1; i < steps; i++) {
      const t = i / steps;
      const topX = rLeft.x + (rRight.x - rLeft.x) * t;
      const topY = rLeft.y + (rRight.y - rLeft.y) * t;
      const botX = cSW.x + (cSE.x - cSW.x) * t;
      const botY = mFront.y + (cSE.y - mFront.y) * Math.abs(t - 0.5) * 2;

      ctx.beginPath();
      ctx.moveTo(topX, topY);
      ctx.lineTo(botX, botY);
      ctx.stroke();
    }

    // White lime capping along roof ridge (용마루 백회)
    ctx.strokeStyle = '#f0f3f6';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(rLeft.x - 1, rLeft.y);
    ctx.lineTo(rRight.x + 1, rRight.y);
    ctx.stroke();

    // Ridge end ornaments (치미 / 망와)
    ctx.fillStyle = '#cfd8dc';
    ctx.fillRect(rLeft.x - 3, rLeft.y - 2, 3, 3);
    ctx.fillRect(rRight.x, rRight.y - 2, 3, 3);

    // Eaves edge circular end-tiles (수막새 - white dots along bottom edge)
    ctx.fillStyle = '#ffffff';
    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      const bx = cSW.x + (cSE.x - cSW.x) * t;
      const by = mFront.y + (cSE.y - mFront.y) * Math.abs(t - 0.5) * 2;
      ctx.fillRect(bx - 0.5, by - 0.5, 1.5, 1.5);
    }

    ctx.restore();
  }

  // Draw Chogajip Thatched Roof (초가지붕 - rounded golden straw thatch)
  function drawChogaRoof(ctx, minX, minY, maxX, maxY, zBase, roofHeight = 16, overhang = 7) {
    const eMinX = minX - overhang;
    const eMinY = minY - overhang;
    const eMaxX = maxX + overhang;
    const eMaxY = maxY + overhang;

    const cNW = isoPt(eMinX, eMinY, zBase);
    const cNE = isoPt(eMaxX, eMinY, zBase);
    const cSE = isoPt(eMaxX, eMaxY, zBase);
    const cSW = isoPt(eMinX, eMaxY, zBase);

    const midX = (eMinX + eMaxX) * 0.5;
    const midY = (eMinY + eMaxY) * 0.5;
    const apex = isoPt(midX, midY, zBase + roofHeight);

    ctx.save();
    // Warm golden straw thatch base
    ctx.fillStyle = '#bd822b';
    ctx.beginPath();
    ctx.moveTo(apex.x, apex.y);
    ctx.lineTo(cNE.x, cNE.y);
    ctx.quadraticCurveTo(isoPt(eMaxX, midY, zBase).x, isoPt(eMaxX, midY, zBase).y, cSE.x, cSE.y);
    ctx.quadraticCurveTo(isoPt(midX, eMaxY, zBase).x, isoPt(midX, eMaxY, zBase).y + 2, cSW.x, cSW.y);
    ctx.closePath();
    ctx.fill();

    // Left shadow slope
    ctx.fillStyle = '#9c661b';
    ctx.beginPath();
    ctx.moveTo(apex.x, apex.y);
    ctx.lineTo(cSW.x, cSW.y);
    ctx.quadraticCurveTo(isoPt(eMinX, midY, zBase).x, isoPt(eMinX, midY, zBase).y, cNW.x, cNW.y);
    ctx.closePath();
    ctx.fill();

    // Top highlights (golden straw yellow)
    ctx.fillStyle = '#dc9e3f';
    ctx.beginPath();
    ctx.moveTo(apex.x, apex.y);
    ctx.lineTo(cSE.x - 3, cSE.y - 2);
    ctx.quadraticCurveTo(isoPt(midX, eMaxY, zBase).x, isoPt(midX, eMaxY, zBase).y - 2, cSW.x + 3, cSW.y - 2);
    ctx.closePath();
    ctx.fill();

    // Straw rope binding (새끼줄 격자)
    ctx.strokeStyle = '#7c4d10';
    ctx.lineWidth = 1;
    // Radial ropes from apex
    const ropes = [cSW, isoPt(midX - 8, eMaxY, zBase), isoPt(midX + 8, eMaxY, zBase), cSE];
    ropes.forEach(pt => {
      ctx.beginPath();
      ctx.moveTo(apex.x, apex.y);
      ctx.lineTo(pt.x, pt.y);
      ctx.stroke();
    });

    // Thatched eaves thick rim
    ctx.fillStyle = '#e8ae4c';
    ctx.fillRect(apex.x - 4, apex.y - 1, 8, 3);

    // Hanging red chili peppers under eaves (고추)
    ctx.fillStyle = '#d32f2f';
    ctx.fillRect(cSW.x + 12, cSW.y + 4, 2, 4);
    ctx.fillRect(cSW.x + 15, cSW.y + 3, 2, 5);
    ctx.fillStyle = '#2e7d32'; // stem
    ctx.fillRect(cSW.x + 12, cSW.y + 3, 2, 1);
    ctx.fillRect(cSW.x + 15, cSW.y + 2, 2, 1);

    ctx.restore();
  }

  // Draw traditional Korean Jangdokdae (장독대 - earthenware onggi jars)
  function drawJangdokdae(ctx, x, y, count = 3) {
    const pt = isoPt(x, y, 0);
    ctx.save();
    // Flat stone platform
    ctx.fillStyle = '#787a7e';
    ctx.fillRect(pt.x - 10, pt.y - 2, 20, 5);

    const jarOffsets = [
      { dx: -6, dy: -6, rad: 5, h: 8, col: '#3e2723' },
      { dx: 3, dy: -4, rad: 4, h: 7, col: '#4e342e' },
      { dx: -1, dy: 1, rad: 3.5, h: 6, col: '#2c1810' }
    ];

    jarOffsets.slice(0, count).forEach(j => {
      const jx = pt.x + j.dx;
      const jy = pt.y + j.dy;
      // Body
      ctx.fillStyle = j.col;
      ctx.beginPath();
      ctx.ellipse(jx, jy, j.rad, j.h * 0.6, 0, 0, Math.PI * 2);
      ctx.fill();

      // Glaze highlight
      ctx.fillStyle = '#8d6e63';
      ctx.fillRect(jx - 1, jy - j.h * 0.4, 2, 3);

      // Lid (뚜껑)
      ctx.fillStyle = '#21130d';
      ctx.beginPath();
      ctx.ellipse(jx, jy - j.h * 0.5, j.rad * 0.9, 2, 0, 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.restore();
  }

  // Draw traditional Ondol Chimney (온돌 굴뚝)
  function drawOndolChimney(ctx, x, y, h = 18, type = 'brick') {
    const pt = isoPt(x, y, 0);
    ctx.save();
    // Chimney pillar
    ctx.fillStyle = (type === 'brick') ? '#8d6e63' : '#757575';
    ctx.fillRect(pt.x - 2, pt.y - h, 5, h);

    // Mortar lines
    ctx.strokeStyle = '#5d4037';
    ctx.lineWidth = 1;
    ctx.strokeRect(pt.x - 2, pt.y - h, 5, h);

    // Mini Giwa tile roof cap
    ctx.fillStyle = '#262a33';
    ctx.beginPath();
    ctx.moveTo(pt.x + 0.5, pt.y - h - 3);
    ctx.lineTo(pt.x + 5, pt.y - h);
    ctx.lineTo(pt.x - 4, pt.y - h);
    ctx.closePath();
    ctx.fill();

    ctx.restore();
  }

  // Draw traditional Cheongsachorong lantern (청사초롱)
  function drawCheongsachorong(ctx, x, y) {
    ctx.save();
    // Red top
    ctx.fillStyle = '#d32f2f';
    ctx.fillRect(x - 2, y, 4, 3);
    // Blue bottom
    ctx.fillStyle = '#1976d2';
    ctx.fillRect(x - 2, y + 3, 4, 3);
    // Tassel
    ctx.strokeStyle = '#fbc02d';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(x, y + 6);
    ctx.lineTo(x, y + 9);
    ctx.stroke();
    ctx.restore();
  }

  // Draw Korean low wooden platform bench (평상 - Pyeongsang)
  function drawPyeongsang(ctx, x, y, w = 12, d = 12) {
    const p1 = isoPt(x, y, 4);
    const p2 = isoPt(x + w, y, 4);
    const p3 = isoPt(x + w, y + d, 4);
    const p4 = isoPt(x, y + d, 4);

    ctx.save();
    // Wooden board
    ctx.fillStyle = '#a1887f';
    ctx.beginPath();
    ctx.moveTo(p1.x, p1.y);
    ctx.lineTo(p2.x, p2.y);
    ctx.lineTo(p3.x, p3.y);
    ctx.lineTo(p4.x, p4.y);
    ctx.closePath();
    ctx.fill();

    // 4 legs
    ctx.fillStyle = '#5d4037';
    [p1, p2, p3, p4].forEach(p => {
      ctx.fillRect(p.x - 1, p.y, 2, 4);
    });
    ctx.restore();
  }

  // ==========================================
  // INDIVIDUAL JOSEON HOUSE / BUILDING RENDERS
  // ==========================================

  // b01: 초가집 (Chogajip - Straw-thatched cottage)
  function renderB01() {
    const { canvas, ctx } = createTileCanvas();
    drawIsoGround(ctx, 'madang');

    // Stone foundation
    drawGidan(ctx, -20, -18, 20, 18, 5);

    // Earthen mud walls
    drawHanokWalls(ctx, -16, -14, 16, 14, 5, 18, 'mud');

    // Wooden veranda (쪽마루) on front
    drawDaechungMaru(ctx, -14, 10, 14, 16, 5);

    // Changhomun sliding doors
    drawChanghomun(ctx, 'sw', -14, 14, -2, 14, 5, 14);
    drawChanghomun(ctx, 'sw', 2, 14, 14, 14, 5, 14);

    // Straw-thatched roof
    drawChogaRoof(ctx, -17, -15, 17, 15, 23, 17, 7);

    // Jangdokdae & ondol chimney
    drawJangdokdae(ctx, 22, -4, 3);
    drawOndolChimney(ctx, -22, -10, 16, 'mud');

    return canvas.toDataURL('image/png');
  }

  // b02: 조선 주막 (Jumak - Traditional Tavern & Inn)
  function renderB02() {
    const { canvas, ctx } = createTileCanvas();
    drawIsoGround(ctx, 'madang');

    // Foundation
    drawGidan(ctx, -22, -20, 22, 16, 5);

    // Main building (L-shaped)
    drawHanokWalls(ctx, -18, -16, 8, 12, 5, 19, 'mud');
    drawHanokWalls(ctx, 8, -16, 18, 4, 5, 17, 'mud');

    // Outdoor wooden eating platform (평상)
    drawPyeongsang(ctx, -20, 18, 14, 14);

    // Doors and serving window
    drawChanghomun(ctx, 'sw', -16, 12, -4, 12, 5, 14);
    drawChanghomun(ctx, 'se', 8, -8, 8, 2, 5, 13);

    // Thatch roof over main house
    drawChogaRoof(ctx, -20, -18, 10, 14, 24, 18, 7);
    drawChogaRoof(ctx, 6, -18, 20, 6, 22, 14, 5);

    // Wine jars (술독) and Cheongsachorong lanterns
    drawJangdokdae(ctx, 20, 14, 3);
    drawCheongsachorong(ctx, isoPt(-12, 14, 22).x, isoPt(-12, 14, 22).y);
    drawCheongsachorong(ctx, isoPt(6, 14, 22).x, isoPt(6, 14, 22).y);

    drawOndolChimney(ctx, -22, -14, 17, 'brick');

    return canvas.toDataURL('image/png');
  }

  // b03: 조선 대장간 (Daejanggan - Forge & Anvil Workshop)
  function renderB03() {
    const { canvas, ctx } = createTileCanvas();
    drawIsoGround(ctx, 'madang');

    drawGidan(ctx, -20, -18, 20, 18, 5);

    // Open-sided workshop walls
    drawHanokWalls(ctx, -16, -14, 16, 6, 5, 17, 'mud');

    // Forge Hearth (화덕) with glowing coals
    const hPt = isoPt(-4, -6, 5);
    ctx.fillStyle = '#424242';
    ctx.fillRect(hPt.x - 6, hPt.y - 8, 12, 8);
    ctx.fillStyle = '#ff5722';
    ctx.fillRect(hPt.x - 4, hPt.y - 7, 8, 5);
    ctx.fillStyle = '#ffeb3b';
    ctx.fillRect(hPt.x - 2, hPt.y - 5, 4, 3);

    // Iron Anvil (모루)
    const aPt = isoPt(2, 6, 5);
    ctx.fillStyle = '#263238';
    ctx.fillRect(aPt.x - 4, aPt.y - 6, 8, 6);
    ctx.fillRect(aPt.x - 6, aPt.y - 8, 12, 3);

    // Water trough (담금질 물통)
    const wPt = isoPt(12, 4, 5);
    ctx.fillStyle = '#5d4037';
    ctx.fillRect(wPt.x - 4, wPt.y - 4, 8, 5);
    ctx.fillStyle = '#0288d1';
    ctx.fillRect(wPt.x - 3, wPt.y - 3, 6, 3);

    // Thatched awning / roof
    drawChogaRoof(ctx, -18, -16, 18, 16, 22, 16, 6);

    // Stone forge chimney
    drawOndolChimney(ctx, -16, -12, 22, 'stone');

    return canvas.toDataURL('image/png');
  }

  // b04: 풍로 곳간 / 풍차 (Pungro Gotgan - Grain Granary)
  function renderB04() {
    const { canvas, ctx } = createTileCanvas();
    drawIsoGround(ctx, 'grass');

    // Elevated wooden stilt base
    drawGidan(ctx, -18, -18, 18, 18, 8);

    // Wooden timber granary body
    drawHanokWalls(ctx, -14, -14, 14, 14, 8, 22, 'mud');

    // Ladder and doors
    drawChanghomun(ctx, 'sw', -8, 14, 8, 14, 8, 16);

    // Roof
    drawChogaRoof(ctx, -16, -16, 16, 16, 30, 18, 7);

    // Traditional wind vane / winnower indicator on top
    const apex = isoPt(0, 0, 48);
    ctx.strokeStyle = '#3e2723';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(apex.x, apex.y);
    ctx.lineTo(apex.x, apex.y - 12);
    ctx.stroke();

    ctx.fillStyle = '#c62828';
    ctx.fillRect(apex.x, apex.y - 12, 8, 5);

    return canvas.toDataURL('image/png');
  }

  // b05: 조선 물레방앗간 (Mullebang-atgan - Traditional Watermill)
  function renderB05(animStep = 0) {
    const { canvas, ctx } = createTileCanvas();
    // Canal waterway under mill
    ctx.fillStyle = '#2b5c77';
    ctx.beginPath();
    ctx.moveTo(0, 96);
    ctx.lineTo(64, 128);
    ctx.lineTo(128, 96);
    ctx.lineTo(64, 64);
    ctx.closePath();
    ctx.fill();

    // Stone canal banks
    ctx.fillStyle = '#616161';
    ctx.fillRect(10, 85, 40, 6);
    ctx.fillRect(78, 105, 40, 6);

    // Milling shed foundation on stone bank
    drawGidan(ctx, -16, -16, 16, 4, 6);
    drawHanokWalls(ctx, -12, -12, 12, 0, 6, 17, 'mud');
    drawChanghomun(ctx, 'sw', -8, 0, 4, 0, 6, 14);
    drawChogaRoof(ctx, -14, -14, 14, 2, 23, 16, 6);

    // Traditional wooden Waterwheel (물레방아) mounted on river side
    const wCenter = isoPt(8, 12, 10);
    const rad = 14;
    ctx.save();
    ctx.translate(wCenter.x, wCenter.y);

    // Rim
    ctx.strokeStyle = '#3e2723';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(0, 0, rad, 0, Math.PI * 2);
    ctx.stroke();

    // Spokes & paddles rotated by animStep (0 to 3)
    const angleOffset = (animStep * Math.PI) / 8;
    ctx.lineWidth = 1.5;
    for (let i = 0; i < 8; i++) {
      const a = (i * Math.PI) / 4 + angleOffset;
      const sx = Math.cos(a) * rad;
      const sy = Math.sin(a) * rad * 0.55; // Dimetric squash
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(sx, sy);
      ctx.stroke();

      // Bucket paddle
      ctx.fillStyle = '#5d4037';
      ctx.fillRect(sx - 2, sy - 2, 4, 3);
    }

    // Axle
    ctx.fillStyle = '#212121';
    ctx.beginPath();
    ctx.arc(0, 0, 3, 0, Math.PI * 2);
    ctx.fill();

    // Animated water spray droplets
    ctx.fillStyle = '#b3e5fc';
    const sprayY = rad * 0.5;
    ctx.fillRect(-4 + ((animStep * 3) % 8), sprayY + 1, 2, 2);
    ctx.fillRect(2 - ((animStep * 2) % 6), sprayY + 3, 2, 2);

    ctx.restore();

    return canvas.toDataURL('image/png');
  }

  // b06: 전통 떡방 (Tteokbang - Rice Cake Bakery)
  function renderB06() {
    const { canvas, ctx } = createTileCanvas();
    drawIsoGround(ctx, 'madang');

    drawGidan(ctx, -18, -18, 18, 18, 5);
    drawHanokWalls(ctx, -14, -14, 14, 14, 5, 18, 'white');
    drawChanghomun(ctx, 'sw', -12, 14, 0, 14, 5, 14);

    // Steamer pots (시루) and rice cake display board
    const sPt = isoPt(6, 12, 5);
    ctx.fillStyle = '#4e342e'; // Ceramic earthenware steamer
    ctx.fillRect(sPt.x - 3, sPt.y - 7, 7, 7);
    ctx.fillStyle = '#e0e0e0'; // Steam
    ctx.fillRect(sPt.x - 2, sPt.y - 10, 5, 2);

    // Display tray with colorful rice cakes (송편, 인절미)
    const tPt = isoPt(8, 6, 5);
    ctx.fillStyle = '#8d6e63';
    ctx.fillRect(tPt.x - 5, tPt.y - 3, 10, 4);
    ctx.fillStyle = '#4caf50'; // mugwort songpyeon
    ctx.fillRect(tPt.x - 3, tPt.y - 4, 2, 2);
    ctx.fillStyle = '#ffeb3b'; // pumpkin songpyeon
    ctx.fillRect(tPt.x, tPt.y - 4, 2, 2);
    ctx.fillStyle = '#f48fb1'; // pink songpyeon
    ctx.fillRect(tPt.x + 2, tPt.y - 4, 2, 2);

    // Giwa roof
    drawGiwaRoof(ctx, -16, -16, 16, 16, 23, 16, 6);
    drawOndolChimney(ctx, -18, -12, 18, 'brick');

    return canvas.toDataURL('image/png');
  }

  // b07: 한약방 / 혜민서 (Hanyakbang - Herbal Medicine Clinic)
  function renderB07() {
    const { canvas, ctx } = createTileCanvas();
    drawIsoGround(ctx, 'madang');

    drawGidan(ctx, -20, -18, 20, 18, 5);
    drawHanokWalls(ctx, -16, -14, 16, 14, 5, 19, 'white');
    drawDaechungMaru(ctx, -14, 6, 14, 14, 5);

    // Medicine Cabinet (약장 - grid of tiny drawers) inside
    const mPt = isoPt(-4, 0, 7);
    ctx.fillStyle = '#3e2723';
    ctx.fillRect(mPt.x - 10, mPt.y - 12, 20, 12);
    ctx.fillStyle = '#ffecb3';
    // Draw tiny drawer handles
    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 4; c++) {
        ctx.fillRect(mPt.x - 8 + c * 5, mPt.y - 10 + r * 4, 2, 1);
      }
    }

    // Dried medicinal herbs hanging from eaves (인삼 & 약초)
    const ePt = isoPt(-10, 14, 22);
    ctx.fillStyle = '#8d6e63';
    ctx.fillRect(ePt.x, ePt.y, 2, 5);
    ctx.fillRect(ePt.x + 6, ePt.y, 2, 6);

    // Giwa Roof
    drawGiwaRoof(ctx, -18, -16, 18, 16, 24, 18, 6);
    drawCheongsachorong(ctx, isoPt(12, 14, 22).x, isoPt(12, 14, 22).y);
    drawOndolChimney(ctx, -20, -12, 18, 'brick');

    return canvas.toDataURL('image/png');
  }

  // b08: 조선 읍성 망루 (Eupseong Watchtower)
  function renderB08() {
    const { canvas, ctx } = createTileCanvas();
    drawIsoGround(ctx, 'stone');

    // Tall ashlar fortress granite bastion (성벽)
    drawGidan(ctx, -18, -18, 18, 18, 20);

    // Wooden pavilion on top (누각)
    drawHanokWalls(ctx, -12, -12, 12, 12, 20, 16, 'white');

    // Giwa roof on top of watchtower
    drawGiwaRoof(ctx, -15, -15, 15, 15, 36, 18, 6, true);

    // Joseon Fortress Banner (깃발)
    const fPt = isoPt(14, 14, 20);
    ctx.strokeStyle = '#4e342e';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(fPt.x, fPt.y);
    ctx.lineTo(fPt.x, fPt.y - 20);
    ctx.stroke();

    ctx.fillStyle = '#d32f2f'; // Red banner
    ctx.fillRect(fPt.x, fPt.y - 20, 10, 7);
    ctx.fillStyle = '#fbc02d'; // Yellow sun emblem
    ctx.beginPath();
    ctx.arc(fPt.x + 5, fPt.y - 16.5, 2, 0, Math.PI * 2);
    ctx.fill();

    return canvas.toDataURL('image/png');
  }

  // b09: 향교 / 사당 (Hyanggyo / Ancestral Shrine Hall)
  function renderB09() {
    const { canvas, ctx } = createTileCanvas();
    drawIsoGround(ctx, 'stone');

    drawGidan(ctx, -22, -18, 22, 18, 6);
    drawHanokWalls(ctx, -18, -14, 18, 14, 6, 20, 'white');

    // Double folding doors (쌍여닫이문)
    drawChanghomun(ctx, 'sw', -12, 14, -2, 14, 6, 16);
    drawChanghomun(ctx, 'sw', 2, 14, 12, 14, 6, 16);

    // Monumental Giwa roof with Dancheong
    drawGiwaRoof(ctx, -20, -16, 20, 16, 26, 20, 7, true);

    // Red ceremonial gate pillars (홍살문 미니어처)
    const gPt = isoPt(0, 22, 0);
    ctx.fillStyle = '#b71c1c';
    ctx.fillRect(gPt.x - 8, gPt.y - 10, 2, 10);
    ctx.fillRect(gPt.x + 8, gPt.y - 10, 2, 10);
    ctx.fillRect(gPt.x - 9, gPt.y - 9, 19, 2);

    return canvas.toDataURL('image/png');
  }

  // b10: 첨성대 (Cheomseongdae - Astronomical Observatory)
  function renderB10() {
    const { canvas, ctx } = createTileCanvas();
    drawIsoGround(ctx, 'grass');

    // Square granite foundation plinth (기단석)
    drawGidan(ctx, -16, -16, 16, 16, 6);

    // Curved cylindrical stone bottle tower (27 layers of stone)
    const cPt = isoPt(0, 0, 6);
    ctx.save();
    for (let z = 0; z < 32; z += 2) {
      // Taper in and out slightly like the real Cheomseongdae
      const radius = 13 - Math.sin((z / 32) * Math.PI) * 2;
      ctx.fillStyle = (z % 4 === 0) ? '#9e9e9e' : '#757575';
      ctx.beginPath();
      ctx.ellipse(cPt.x, cPt.y - z, radius, radius * 0.5, 0, 0, Math.PI * 2);
      ctx.fill();
    }

    // South-facing observation window opening
    ctx.fillStyle = '#212121';
    ctx.fillRect(cPt.x - 3, cPt.y - 18, 6, 8);

    // Square crown stones on top (#자 형태의 정자석)
    const topPt = { x: cPt.x, y: cPt.y - 32 };
    ctx.fillStyle = '#bdbdbd';
    ctx.fillRect(topPt.x - 8, topPt.y - 4, 16, 4);
    ctx.fillStyle = '#616161';
    ctx.fillRect(topPt.x - 4, topPt.y - 2, 8, 2);

    ctx.restore();
    return canvas.toDataURL('image/png');
  }

  // b11: 대목장 공방 (Hanok Carpenter Yard)
  function renderB11() {
    const { canvas, ctx } = createTileCanvas();
    drawIsoGround(ctx, 'madang');

    drawGidan(ctx, -20, -18, 10, 18, 5);
    drawHanokWalls(ctx, -16, -14, 6, 14, 5, 17, 'mud');
    drawChogaRoof(ctx, -18, -16, 8, 16, 22, 16, 6);

    // Timber log stack (통나무 적재) in front yard
    const lPt = isoPt(14, 4, 0);
    ctx.fillStyle = '#6d4c41';
    ctx.fillRect(lPt.x - 6, lPt.y - 4, 14, 4);
    ctx.fillRect(lPt.x - 4, lPt.y - 7, 12, 3);
    ctx.fillStyle = '#d7ccc8'; // cut log circles
    ctx.beginPath();
    ctx.arc(lPt.x - 6, lPt.y - 2, 2, 0, Math.PI * 2);
    ctx.arc(lPt.x - 4, lPt.y - 5.5, 1.5, 0, Math.PI * 2);
    ctx.fill();

    return canvas.toDataURL('image/png');
  }

  // b12: 시전 상점 (Sijeon Merchant Store - Silk & General Merchant)
  function renderB12() {
    const { canvas, ctx } = createTileCanvas();
    drawIsoGround(ctx, 'madang');

    drawGidan(ctx, -20, -18, 20, 18, 5);
    drawHanokWalls(ctx, -16, -14, 16, 14, 5, 19, 'white');
    drawDaechungMaru(ctx, -14, 6, 14, 14, 5);

    // Display rolls of Korean silk fabrics (비단보따리)
    const fPt = isoPt(-2, 10, 5);
    ctx.fillStyle = '#e91e63'; // pink silk
    ctx.fillRect(fPt.x - 6, fPt.y - 3, 5, 3);
    ctx.fillStyle = '#00bcd4'; // cyan silk
    ctx.fillRect(fPt.x, fPt.y - 3, 5, 3);
    ctx.fillStyle = '#ffeb3b'; // yellow silk
    ctx.fillRect(fPt.x + 6, fPt.y - 3, 5, 3);

    // Giwa roof with sign
    drawGiwaRoof(ctx, -18, -16, 18, 16, 24, 18, 6);
    drawCheongsachorong(ctx, isoPt(-12, 14, 22).x, isoPt(-12, 14, 22).y);
    drawCheongsachorong(ctx, isoPt(12, 14, 22).x, isoPt(12, 14, 22).y);

    return canvas.toDataURL('image/png');
  }

  // b13: 외양간과 나락곳간 (Farm Stable & Granary with Yellow Ox)
  function renderB13() {
    const { canvas, ctx } = createTileCanvas();
    drawIsoGround(ctx, 'madang');

    // Split barn: granary on left, ox stable on right
    drawGidan(ctx, -20, -18, 20, 18, 5);
    drawHanokWalls(ctx, -16, -14, 0, 14, 5, 18, 'mud'); // Granary

    // Wooden fence stall on right for Korean Yellow Ox (황소)
    const sP1 = isoPt(0, -14, 5);
    const sP2 = isoPt(16, -14, 5);
    const sP3 = isoPt(16, 14, 5);
    const sP4 = isoPt(0, 14, 5);

    ctx.strokeStyle = '#5d4037';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(sP1.x, sP1.y);
    ctx.lineTo(sP2.x, sP2.y);
    ctx.lineTo(sP3.x, sP3.y);
    ctx.lineTo(sP4.x, sP4.y);
    ctx.stroke();

    // Korean Yellow Ox (누렁이 황소)
    const oxPt = isoPt(8, 2, 5);
    ctx.fillStyle = '#c67d38'; // Ox body
    ctx.beginPath();
    ctx.ellipse(oxPt.x, oxPt.y - 4, 6, 4, 0, 0, Math.PI * 2);
    ctx.fill();
    // Head & horns
    ctx.fillRect(oxPt.x - 7, oxPt.y - 8, 4, 4);
    ctx.fillStyle = '#f5f5f5'; // Horns
    ctx.fillRect(oxPt.x - 8, oxPt.y - 10, 2, 3);
    ctx.fillRect(oxPt.x - 5, oxPt.y - 10, 2, 3);

    // Roof over granary
    drawChogaRoof(ctx, -18, -16, 4, 16, 23, 16, 6);

    return canvas.toDataURL('image/png');
  }

  // b14: 관아 동헌 (Gwana Dongheon - Joseon Magistrate Hall)
  function renderB14() {
    const { canvas, ctx } = createTileCanvas();
    drawIsoGround(ctx, 'stone');

    // High 2-tier granite terrace
    drawGidan(ctx, -24, -20, 24, 20, 8);

    // High civic hall with Dancheong painted pillars
    drawHanokWalls(ctx, -18, -16, 18, 16, 8, 22, 'white');
    drawDaechungMaru(ctx, -16, 4, 16, 16, 8);

    // Magistrate's chair & folding screen (일월오봉도 미니어처)
    const cPt = isoPt(0, -4, 10);
    ctx.fillStyle = '#b71c1c'; // Red chair
    ctx.fillRect(cPt.x - 4, cPt.y - 8, 8, 8);
    ctx.fillStyle = '#fbc02d';
    ctx.fillRect(cPt.x - 3, cPt.y - 10, 6, 2);

    // Grand sweeping Giwa roof with rich Dancheong
    drawGiwaRoof(ctx, -22, -18, 22, 18, 30, 24, 8, true);

    // Large ceremonial drum (대북) in court
    const dPt = isoPt(18, 14, 8);
    ctx.fillStyle = '#d32f2f';
    ctx.beginPath();
    ctx.arc(dPt.x, dPt.y - 4, 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#ffeb3b';
    ctx.beginPath();
    ctx.arc(dPt.x, dPt.y - 4, 2, 0, Math.PI * 2);
    ctx.fill();

    return canvas.toDataURL('image/png');
  }

  // b15: 규장각 / 서고 (Kyujanggak - Royal Scholar Academy & Library)
  function renderB15() {
    const { canvas, ctx } = createTileCanvas();
    drawIsoGround(ctx, 'stone');

    drawGidan(ctx, -22, -18, 22, 18, 7);
    drawHanokWalls(ctx, -18, -14, 18, 14, 7, 24, 'white');

    // First and second level windows
    drawChanghomun(ctx, 'sw', -14, 14, -2, 14, 7, 12);
    drawChanghomun(ctx, 'sw', 2, 14, 14, 14, 7, 12);
    drawChanghomun(ctx, 'sw', -10, 14, 10, 14, 20, 10);

    // Grand 2-tier Giwa roof
    drawGiwaRoof(ctx, -20, -16, 20, 16, 31, 20, 7, true);

    return canvas.toDataURL('image/png');
  }

  // b16: 도자기 가마 & 양조장 (Pottery Kiln & Brewery)
  function renderB16() {
    const { canvas, ctx } = createTileCanvas();
    drawIsoGround(ctx, 'madang');

    drawGidan(ctx, -20, -18, 6, 18, 5);
    drawHanokWalls(ctx, -16, -14, 2, 14, 5, 17, 'mud');
    drawChogaRoof(ctx, -18, -16, 4, 16, 22, 16, 6);

    // Climbing ceramic dragon kiln (등요) on right slope
    const kPt = isoPt(12, -4, 2);
    ctx.fillStyle = '#bcaaa4';
    ctx.beginPath();
    ctx.ellipse(kPt.x, kPt.y, 8, 12, Math.PI / 4, 0, Math.PI * 2);
    ctx.fill();

    // Celadon / White porcelain vase display
    const vPt = isoPt(14, 12, 0);
    ctx.fillStyle = '#e0f2f1'; // Jade celadon
    ctx.fillRect(vPt.x - 3, vPt.y - 5, 3, 5);
    ctx.fillStyle = '#ffffff'; // White porcelain
    ctx.fillRect(vPt.x + 2, vPt.y - 6, 3, 6);

    return canvas.toDataURL('image/png');
  }

  // b17: 솟을성문 / 읍성 대문 (Soseuldaemun / Fortress Gate)
  function renderB17() {
    const { canvas, ctx } = createTileCanvas();
    // Cobblestone road passes right through center!
    drawIsoGround(ctx, 'stone');

    // Stone arched gateway flanks
    drawGidan(ctx, -22, -18, -6, 18, 16);
    drawGidan(ctx, 6, -18, 22, 18, 16);

    // Central arched span
    const archPt = isoPt(0, 0, 16);
    ctx.fillStyle = '#757575';
    ctx.fillRect(archPt.x - 12, archPt.y - 4, 24, 6);

    // Wooden pavilion bridging across the gate
    drawHanokWalls(ctx, -16, -14, 16, 14, 16, 14, 'white');
    drawGiwaRoof(ctx, -18, -16, 18, 16, 30, 20, 7, true);

    return canvas.toDataURL('image/png');
  }

  // b18: 조선 온실과 화계 (Joseon Royal Greenhouse & Terraced Garden)
  function renderB18() {
    const { canvas, ctx } = createTileCanvas();
    drawIsoGround(ctx, 'grass');

    drawGidan(ctx, -20, -18, 20, 18, 5);

    // Semi-translucent oiled Hanji paper greenhouse walls & roof
    drawHanokWalls(ctx, -16, -14, 16, 14, 5, 16, 'white');

    // Stone flower terraces (화계 - Hwagye) with blooming azaleas & lotus
    const hPt = isoPt(0, 16, 0);
    ctx.fillStyle = '#795548';
    ctx.fillRect(hPt.x - 12, hPt.y - 2, 24, 4);
    ctx.fillStyle = '#e91e63'; // pink flowers
    ctx.fillRect(hPt.x - 8, hPt.y - 4, 3, 2);
    ctx.fillRect(hPt.x + 4, hPt.y - 4, 3, 2);

    // Sloped oiled paper skylight roof
    drawGiwaRoof(ctx, -18, -16, 18, 16, 21, 14, 5);

    return canvas.toDataURL('image/png');
  }

  // b19: 봉수대와 나루터 (Bongsu Fire Beacon & Ferry Dock)
  function renderB19() {
    const { canvas, ctx } = createTileCanvas();
    // Half water, half land
    ctx.fillStyle = '#2b5c77';
    ctx.beginPath();
    ctx.moveTo(64, 64);
    ctx.lineTo(128, 96);
    ctx.lineTo(64, 128);
    ctx.lineTo(0, 96);
    ctx.closePath();
    ctx.fill();

    // Wooden timber ferry pier (나루터)
    const pierPt = isoPt(-8, 6, 2);
    ctx.fillStyle = '#5d4037';
    ctx.fillRect(pierPt.x - 12, pierPt.y - 4, 24, 8);

    // Small ferry boat (나룻배)
    const bPt = isoPt(10, 12, 1);
    ctx.fillStyle = '#8d6e63';
    ctx.beginPath();
    ctx.ellipse(bPt.x, bPt.y, 10, 4, -Math.PI / 6, 0, Math.PI * 2);
    ctx.fill();

    // Stone beacon tower (봉수대) on shore
    const sPt = isoPt(-12, -12, 0);
    ctx.fillStyle = '#757575';
    ctx.fillRect(sPt.x - 8, sPt.y - 18, 16, 18);
    // Fire brazier on top with glowing embers
    ctx.fillStyle = '#d32f2f';
    ctx.fillRect(sPt.x - 4, sPt.y - 21, 8, 3);
    ctx.fillStyle = '#ff9800';
    ctx.fillRect(sPt.x - 2, sPt.y - 23, 4, 2);

    return canvas.toDataURL('image/png');
  }

  // b20: 양반가 99칸 기와집 (Grand Yangban Giwajip Noble Estate)
  function renderB20() {
    const { canvas, ctx } = createTileCanvas();
    drawIsoGround(ctx, 'madang');

    // Expansive 2-step granite foundation
    drawGidan(ctx, -24, -22, 24, 18, 7);

    // Two-wing L-shaped Sarangchae & Anchae Hanok
    drawHanokWalls(ctx, -20, -18, 4, 14, 7, 21, 'white');
    drawHanokWalls(ctx, 4, -18, 20, 2, 7, 20, 'white');

    // Expansive Daechung-maru polished wooden floor
    drawDaechungMaru(ctx, -16, 4, 2, 14, 7);

    // Lattice doors & windows
    drawChanghomun(ctx, 'sw', -18, 14, -6, 14, 7, 14);
    drawChanghomun(ctx, 'se', 4, -10, 4, 0, 7, 13);

    // Majestic Giwa tiled roofs with high eaves curve
    drawGiwaRoof(ctx, -22, -20, 6, 16, 28, 22, 7);
    drawGiwaRoof(ctx, 2, -20, 22, 4, 27, 18, 6);

    // Jangdokdae in corner
    drawJangdokdae(ctx, 16, 12, 3);

    // Korean Red Pine (소나무) bonsai in stone court
    const pPt = isoPt(-14, 20, 0);
    ctx.fillStyle = '#5d4037'; // crooked trunk
    ctx.fillRect(pPt.x - 1, pPt.y - 8, 2, 8);
    ctx.fillStyle = '#2e7d32'; // pine needle clusters
    ctx.beginPath();
    ctx.arc(pPt.x - 2, pPt.y - 9, 4, 0, Math.PI * 2);
    ctx.arc(pPt.x + 3, pPt.y - 11, 4, 0, Math.PI * 2);
    ctx.fill();

    drawOndolChimney(ctx, -22, -16, 20, 'brick');

    return canvas.toDataURL('image/png');
  }

  // Generic generator for additional Hanok variants b21 - b56
  function renderHanokVariant(id, type = 'giwa', isLong = false, orientation = 'sw') {
    const { canvas, ctx } = createTileCanvas();
    drawIsoGround(ctx, type === 'choga' ? 'madang' : (type === 'stone' ? 'stone' : 'madang'));

    const minX = -18, minY = -16, maxX = 18, maxY = 16;
    drawGidan(ctx, minX - 2, minY - 2, maxX + 2, maxY + 2, 5);

    if (type === 'choga') {
      drawHanokWalls(ctx, minX, minY, maxX, maxY, 5, 17, 'mud');
      drawChanghomun(ctx, orientation, minX + 2, maxY, maxX - 2, maxY, 5, 13);
      drawChogaRoof(ctx, minX - 1, minY - 1, maxX + 1, maxY + 1, 22, 16, 6);
      drawJangdokdae(ctx, maxX + 2, minY + 2, 2);
      drawOndolChimney(ctx, minX - 3, minY, 15, 'mud');
    } else {
      drawHanokWalls(ctx, minX, minY, maxX, maxY, 5, 19, 'white');
      drawChanghomun(ctx, orientation, minX + 2, maxY, maxX - 2, maxY, 5, 14);
      drawGiwaRoof(ctx, minX - 1, minY - 1, maxX + 1, maxY + 1, 24, 18, 6, type === 'dancheong');
      if (orientation === 'sw') {
        drawCheongsachorong(ctx, isoPt(-10, maxY, 22).x, isoPt(-10, maxY, 22).y);
      }
      drawOndolChimney(ctx, minX - 3, minY, 17, 'brick');
    }

    return canvas.toDataURL('image/png');
  }

  // Register primary buildings
  tiles['b01_cottage_red'] = renderB01();
  tiles['b02_tudor_inn'] = renderB02();
  tiles['b03_blacksmith_forge'] = renderB03();
  tiles['b04_windmill'] = renderB04();
  tiles['b05_watermill'] = renderB05(0);
  tiles['b06_bakery'] = renderB06();
  tiles['b07_apothecary'] = renderB07();
  tiles['b08_watchtower'] = renderB08();
  tiles['b09_chapel'] = renderB09();
  tiles['b10_wizard_tower'] = renderB10();
  tiles['b11_carpenter_sawmill'] = renderB11();
  tiles['b12_general_store'] = renderB12();
  tiles['b13_barn_silo'] = renderB13();
  tiles['b14_town_hall'] = renderB14();
  tiles['b15_library_scholar'] = renderB15();
  tiles['b16_alchemist_workshop'] = renderB16();
  tiles['b17_twin_gatehouse'] = renderB17();
  tiles['b18_greenhouse_orangery'] = renderB18();
  tiles['b19_lighthouse_dock'] = renderB19();
  tiles['b20_noble_manor'] = renderB20();

  // Register variants b21 - b56 as distinct Joseon architecture
  const variantStyles = {
    b21: ['giwa', false, 'sw'],
    b22: ['giwa', false, 'se'],
    b23: ['choga', true, 'sw'],
    b24: ['choga', true, 'se'],
    b25: ['choga', false, 'sw'],
    b26: ['choga', false, 'se'],
    b27: ['choga', false, 'sw'],
    b28: ['choga', false, 'se'],
    b29: ['dancheong', false, 'sw'],
    b30: ['dancheong', false, 'se'],
    b31: ['giwa', true, 'sw'],
    b32: ['giwa', true, 'se'],
    b33: ['dancheong', false, 'sw'],
    b34: ['dancheong', false, 'se'],
    b35: ['dancheong', false, 'sw'],
    b36: ['dancheong', false, 'se'],
    b37: ['giwa', false, 'sw'],
    b38: ['giwa', false, 'se'],
    b39: ['choga', false, 'sw'],
    b40: ['choga', false, 'se'],
    b41: ['choga', false, 'sw'],
    b42: ['choga', false, 'se'],
    b43: ['choga', false, 'sw'],
    b44: ['choga', false, 'se'],
    b45: ['dancheong', false, 'sw'],
    b46: ['dancheong', false, 'se'],
    b47: ['choga', false, 'sw'],
    b48: ['choga', false, 'se'],
    b49: ['dancheong', false, 'sw'],
    b50: ['dancheong', false, 'se'],
    b51: ['giwa', false, 'sw'],
    b52: ['giwa', false, 'se'],
    b53: ['giwa', false, 'sw'],
    b54: ['giwa', false, 'se'],
    b55: ['stone', false, 'sw'],
    b56: ['stone', false, 'se'],
  };

  for (let num = 21; num <= 56; num++) {
    const prefix = 'b' + num;
    const matchedKey = Object.keys(variantStyles).find(k => k === prefix);
    const style = matchedKey ? variantStyles[matchedKey] : ['giwa', false, 'sw'];
    // Find matching full tile ID from TILES_DATA pattern if needed
    tiles[prefix] = renderHanokVariant(prefix, style[0], style[1], style[2]);
  }

  // Generate 4-frame animation for watermill (b05_watermill)
  const animWatermillFrames = [
    renderB05(0),
    renderB05(1),
    renderB05(2),
    renderB05(3)
  ];

  return {
    tiles,
    animWatermillFrames
  };
}
