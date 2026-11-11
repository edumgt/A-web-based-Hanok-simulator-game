/**
 * Scenic Surrounding Environment Engine for Seoul Time Builder
 * Fills the surrounding void with majestic mountains (Bukhansan / Inwangsan style peaks),
 * pine forests, mist, the grand Han River and coastal sea, sandy riverbanks, animated sailboats,
 * and atmospheric sky, ensuring the 16x16 diamond building grid sits in a breathtaking natural landscape.
 */

const ROWS = 16;
const COLS = 16;
const HALF_W = 64;
const QUARTER_W = 32;
const PAD = 64;
const ORIGIN_X = PAD + (ROWS - 1) * HALF_W; // 1024
const ORIGIN_Y = PAD; // 64

// Diamond boundary vertices on ground plane:
// Top:    (1088, 128)
// Right:  (2112, 640)
// Bottom: (1088, 1152)
// Left:   (64, 640)

class ScenicEnvironment {
  constructor() {
    this.starSeeds = [];
    for (let i = 0; i < 90; i++) {
      this.starSeeds.push({
        x: (i * 137.5) % 3600 - 800,
        y: (i * 79.3) % 1800 - 800,
        size: 0.8 + ((i * 19) % 15) * 0.1,
        twinkleSpeed: 1.2 + ((i * 31) % 20) * 0.1,
        phase: (i * 47) % 10
      });
    }

    // Precomputed boat parameters
    this.boats = [
      { id: 1, baseX: 450, baseY: 1100, speed: 18, travelDist: 900, dir: 1, scale: 1.0 },
      { id: 2, baseX: 1450, baseY: 1350, speed: -14, travelDist: 1100, dir: -1, scale: 0.9 },
      { id: 3, baseX: 850, baseY: 1480, speed: 10, travelDist: 800, dir: 1, scale: 0.75 }
    ];
  }

  /**
   * Render scenic screen-space sky backdrop before camera transformation
   */
  renderScreenSky(ctx, width, height, lightingState, animTime, isHD) {
    ctx.save();
    const isNight = lightingState === 'night';

    if (isNight) {
      // Midnight celestial indigo gradient
      const skyGrad = ctx.createLinearGradient(0, 0, 0, height);
      skyGrad.addColorStop(0, '#040711');
      skyGrad.addColorStop(0.4, '#091224');
      skyGrad.addColorStop(0.8, '#101d36');
      skyGrad.addColorStop(1, '#15243f');
      ctx.fillStyle = skyGrad;
      ctx.fillRect(0, 0, width, height);

      // Starry sky
      ctx.save();
      for (const s of this.starSeeds) {
        const sx = ((s.x + 800) % width + width) % width;
        const sy = ((s.y + 800) % Math.max(100, height * 0.55));
        const twinkle = 0.3 + 0.7 * Math.abs(Math.sin(animTime * s.twinkleSpeed + s.phase));
        ctx.fillStyle = `rgba(220, 238, 255, ${twinkle * 0.85})`;
        ctx.fillRect(sx, sy, s.size, s.size);
      }

      // Crescent Moon in the night sky
      const moonX = Math.min(width - 120, width * 0.85);
      const moonY = 70;
      const moonHalo = ctx.createRadialGradient(moonX, moonY, 4, moonX, moonY, 48);
      moonHalo.addColorStop(0, 'rgba(255, 250, 220, 0.45)');
      moonHalo.addColorStop(0.4, 'rgba(230, 240, 255, 0.15)');
      moonHalo.addColorStop(1, 'rgba(200, 220, 255, 0)');
      ctx.fillStyle = moonHalo;
      ctx.beginPath();
      ctx.arc(moonX, moonY, 48, 0, Math.PI * 2);
      ctx.fill();

      // Crescent shape
      ctx.fillStyle = '#fffce0';
      ctx.beginPath();
      ctx.arc(moonX, moonY, 16, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#091224'; // shadow cutout
      ctx.beginPath();
      ctx.arc(moonX + 6, moonY - 3, 14, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    } else {
      // Sunlit Korean sky gradient: soft cerulean blue fading to warm horizon haze
      const skyGrad = ctx.createLinearGradient(0, 0, 0, height);
      skyGrad.addColorStop(0, '#5a9ed4');
      skyGrad.addColorStop(0.3, '#7ab8e6');
      skyGrad.addColorStop(0.7, '#a5d4f3');
      skyGrad.addColorStop(1, '#d8eef8');
      ctx.fillStyle = skyGrad;
      ctx.fillRect(0, 0, width, height);

      // Morning/Afternoon Sun with warm glow
      ctx.save();
      const sunX = Math.max(80, width * 0.15);
      const sunY = 65;
      const sunGlow = ctx.createRadialGradient(sunX, sunY, 6, sunX, sunY, 65);
      sunGlow.addColorStop(0, 'rgba(255, 255, 240, 0.7)');
      sunGlow.addColorStop(0.3, 'rgba(255, 235, 180, 0.35)');
      sunGlow.addColorStop(1, 'rgba(255, 220, 160, 0)');
      ctx.fillStyle = sunGlow;
      ctx.beginPath();
      ctx.arc(sunX, sunY, 65, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(sunX, sunY, 14, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // Distant soft cumulus clouds
      if (isHD) {
        ctx.save();
        ctx.fillStyle = 'rgba(255, 255, 255, 0.28)';
        for (let c = 0; c < 5; c++) {
          const cloudX = ((animTime * 6 + c * 280) % (width + 400)) - 200;
          const cloudY = 40 + (c * 35) % 120;
          ctx.beginPath();
          ctx.arc(cloudX, cloudY, 60, 0, Math.PI * 2);
          ctx.arc(cloudX + 45, cloudY - 15, 45, 0, Math.PI * 2);
          ctx.arc(cloudX + 90, cloudY, 55, 0, Math.PI * 2);
          ctx.arc(cloudX + 40, cloudY + 10, 50, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      }
    }
    ctx.restore();
  }

  /**
   * Main scenic backdrop rendered in world coordinates before the 16x16 grid
   */
  renderWorldBackdrop(ctx, animTime, lightingState, isHD, era) {
    const isNight = lightingState === 'night';

    // 1. Distant Mountains (North, North-East, North-West: y < 640)
    this.renderMountains(ctx, animTime, isNight, isHD, era);

    // 2. Wide Han River & Ocean (South, South-West, South-East: y > 500)
    this.renderWaterExpanse(ctx, animTime, isNight, isHD, era);

    // 3. Surrounding Foothills, Forests & Natural Shorelines (Buffer around Diamond)
    this.renderSurroundingTerrain(ctx, animTime, isNight, isHD, era);

    // 4. Island Cliff Foundation supporting the 16x16 City Grid
    this.renderIslandFoundation(ctx, isNight, isHD);
  }

  /**
   * Render majestic Korean granite mountain ridges (Bukhansan, Inwangsan, Achasan)
   */
  renderMountains(ctx, animTime, isNight, isHD, era) {
    ctx.save();

    // Layer 1: Far distant mountain silhouettes
    const farColor = isNight ? '#0b1626' : (isHD ? '#6289ab' : '#577c9c');
    ctx.fillStyle = farColor;
    ctx.beginPath();
    ctx.moveTo(-1200, 400);
    // Draw sweeping rugged mountain crests across the northern horizon
    ctx.lineTo(-800, 180);
    ctx.lineTo(-500, -80);
    ctx.lineTo(-200, 120);
    ctx.lineTo(200, -220); // High Bukhansan peak
    ctx.lineTo(450, -40);
    ctx.lineTo(750, -320); // Baegundae crest
    ctx.lineTo(1088, -260); // Central north peak
    ctx.lineTo(1420, -310);
    ctx.lineTo(1700, -90);
    ctx.lineTo(2050, -240); // Inwangsan crest
    ctx.lineTo(2400, 50);
    ctx.lineTo(2800, -140);
    ctx.lineTo(3200, 190);
    ctx.lineTo(3500, 450);
    ctx.lineTo(3500, 700);
    ctx.lineTo(-1200, 700);
    ctx.closePath();
    ctx.fill();

    // Layer 2: Midground rugged granite peaks with rock facets
    const midColor = isNight ? '#122238' : '#4b6f54'; // pine green & granite
    const rockShadow = isNight ? '#0a1626' : '#394d3d';
    const rockHighlight = isNight ? '#1a2e48' : '#88a38c';

    ctx.fillStyle = midColor;
    ctx.beginPath();
    ctx.moveTo(-900, 480);
    ctx.lineTo(-600, 220);
    ctx.lineTo(-300, 40);
    ctx.lineTo(-50, 180);
    ctx.lineTo(280, -60);
    ctx.lineTo(600, 120);
    ctx.lineTo(950, -110);
    ctx.lineTo(1088, -40);
    ctx.lineTo(1280, -130);
    ctx.lineTo(1550, 60);
    ctx.lineTo(1850, -70);
    ctx.lineTo(2180, 140);
    ctx.lineTo(2550, 40);
    ctx.lineTo(2900, 320);
    ctx.lineTo(3200, 520);
    ctx.lineTo(3200, 700);
    ctx.lineTo(-900, 700);
    ctx.closePath();
    ctx.fill();

    // Granite cliff facets (암벽 명암 디테일)
    const granitePeaks = [
      { x: 280, y: -60, h: 140 },
      { x: 950, y: -110, h: 160 },
      { x: 1280, y: -130, h: 150 },
      { x: 1850, y: -70, h: 130 }
    ];

    for (const g of granitePeaks) {
      // Sunlit facet (Left)
      ctx.fillStyle = rockHighlight;
      ctx.beginPath();
      ctx.moveTo(g.x, g.y);
      ctx.lineTo(g.x - 45, g.y + g.h);
      ctx.lineTo(g.x, g.y + g.h * 0.9);
      ctx.closePath();
      ctx.fill();

      // Shadow facet (Right)
      ctx.fillStyle = rockShadow;
      ctx.beginPath();
      ctx.moveTo(g.x, g.y);
      ctx.lineTo(g.x, g.y + g.h * 0.9);
      ctx.lineTo(g.x + 55, g.y + g.h);
      ctx.closePath();
      ctx.fill();
    }

    // Historical Hanyang Fortress Wall (한양도성 성곽길) winding along eastern crest
    if (era === 'joseon' || era === 'modern') {
      ctx.save();
      ctx.strokeStyle = isNight ? '#263447' : '#9c9384';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(1280, -120);
      ctx.lineTo(1380, -50);
      ctx.lineTo(1550, 60);
      ctx.lineTo(1680, 10);
      ctx.lineTo(1850, -60);
      ctx.stroke();

      // Battlements (성곽 치성과 여장 디테일)
      ctx.fillStyle = isNight ? '#3a4b60' : '#b5ab99';
      for (let w = 0; w < 12; w++) {
        const wx = 1300 + w * 45;
        const wy = -100 + (w % 3) * 30 + w * 8;
        ctx.fillRect(wx, wy, 5, 4);
      }
      ctx.restore();
    }

    // Future Communication Beacons / Sky Spire (미래 시대 송신탑)
    if (era === 'future') {
      ctx.save();
      const spirePulse = 0.5 + 0.5 * Math.sin(animTime * 4);
      ctx.strokeStyle = '#00f0ff';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(950, -110);
      ctx.lineTo(950, -220);
      ctx.moveTo(1280, -130);
      ctx.lineTo(1280, -240);
      ctx.stroke();
      // Flashing cyber beacon
      ctx.fillStyle = `rgba(0, 240, 255, ${spirePulse})`;
      ctx.beginPath();
      ctx.arc(950, -220, 4, 0, Math.PI * 2);
      ctx.arc(1280, -240, 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    // Pine trees dotted on mountain ridges (능선 소나무 숲)
    ctx.fillStyle = isNight ? '#0b1c18' : '#223d24';
    for (let p = 0; p < 36; p++) {
      const px = -300 + (p * 83) % 2700;
      const py = 60 + (p * 51) % 240;
      // Draw small iconic Korean pine crown
      ctx.beginPath();
      ctx.arc(px, py, 6, 0, Math.PI * 2);
      ctx.arc(px + 4, py - 3, 5, 0, Math.PI * 2);
      ctx.arc(px - 3, py - 2, 4.5, 0, Math.PI * 2);
      ctx.fill();
    }

    // Valley Mist / Fog drifting (아침 산안개)
    if (isHD) {
      ctx.save();
      const mistShift = Math.sin(animTime * 0.4) * 40;
      const mistColor = isNight ? 'rgba(28, 46, 75, 0.32)' : 'rgba(235, 245, 255, 0.45)';
      ctx.fillStyle = mistColor;
      ctx.beginPath();
      ctx.ellipse(800 + mistShift, 140, 420, 45, -0.05, 0, Math.PI * 2);
      ctx.ellipse(1500 - mistShift, 180, 480, 50, 0.04, 0, Math.PI * 2);
      ctx.ellipse(200 + mistShift * 0.8, 220, 360, 40, -0.02, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    ctx.restore();
  }

  /**
   * Render the grand Han River and coastal sea with procedural waves and boats
   */
  renderWaterExpanse(ctx, animTime, isNight, isHD, era) {
    ctx.save();

    // River & Sea water plane extending across the southern horizon
    const waterGrad = ctx.createLinearGradient(1088, 550, 1088, 2600);
    if (isNight) {
      waterGrad.addColorStop(0, '#0a1628');
      waterGrad.addColorStop(0.3, '#0e1f38');
      waterGrad.addColorStop(0.7, '#081426');
      waterGrad.addColorStop(1, '#050c18');
    } else {
      waterGrad.addColorStop(0, '#31739c');
      waterGrad.addColorStop(0.2, '#276288');
      waterGrad.addColorStop(0.6, '#1a4b6d');
      waterGrad.addColorStop(1, '#113550');
    }

    ctx.fillStyle = waterGrad;
    ctx.beginPath();
    // Cover the southern expanse outside the diamond
    ctx.moveTo(-1500, 500);
    ctx.lineTo(3600, 500);
    ctx.lineTo(3600, 2600);
    ctx.lineTo(-1500, 2600);
    ctx.closePath();
    ctx.fill();

    // Animated sinusoidal wave crests & caustics
    const waveColor = isNight ? 'rgba(120, 180, 240, 0.12)' : 'rgba(220, 245, 255, 0.22)';
    ctx.strokeStyle = waveColor;
    ctx.lineWidth = 1.5;

    for (let w = 0; w < 24; w++) {
      const wy = 680 + w * 65;
      const speed = 1.2 + (w % 4) * 0.3;
      const xOffset = ((animTime * speed * 25 + w * 170) % 600) - 300;

      ctx.beginPath();
      for (let wx = -600; wx < 3000; wx += 120) {
        const cx = wx + xOffset;
        const cy = wy + Math.sin((wx * 0.02) + (animTime * 2.5) + w) * 5;
        if (wx === -600) ctx.moveTo(cx, cy);
        else ctx.lineTo(cx, cy);
      }
      ctx.stroke();
    }

    // Specular water sun glitters (윤슬 - 햇빛 물비늘) in day mode
    if (isHD && !isNight) {
      ctx.save();
      for (let s = 0; s < 45; s++) {
        const sx = 200 + ((s * 67 + animTime * 15) % 1800);
        const sy = 750 + ((s * 41 + Math.sin(animTime * 3 + s) * 20) % 900);
        const sparkle = 0.3 + 0.7 * Math.abs(Math.sin(animTime * 4 + s * 1.5));
        ctx.fillStyle = `rgba(255, 255, 230, ${sparkle * 0.65})`;
        ctx.fillRect(sx, sy, 3, 1.5);
      }
      ctx.restore();
    }

    // Sandy Islet (밤섬/여의도 모래톱 섬) in mid-river
    this.renderRiverIslet(ctx, 420, 1260, isNight, isHD);
    this.renderRiverIslet(ctx, 1720, 1420, isNight, isHD);

    // Animated Cruising Watercraft
    this.renderWatercraft(ctx, animTime, isNight, era);

    ctx.restore();
  }

  /**
   * Render peaceful sandy islets with reeds in the river
   */
  renderRiverIslet(ctx, ix, iy, isNight, isHD) {
    ctx.save();
    // Sandbank (모래톱)
    ctx.fillStyle = isNight ? '#1e2d3d' : '#c9b88e';
    ctx.beginPath();
    ctx.ellipse(ix, iy, 120, 45, -0.25, 0, Math.PI * 2);
    ctx.fill();

    // Grass & Reeds (갈대밭)
    ctx.fillStyle = isNight ? '#162e22' : '#5b7d48';
    ctx.beginPath();
    ctx.ellipse(ix - 15, iy - 6, 85, 28, -0.22, 0, Math.PI * 2);
    ctx.fill();

    // Pine tree on islet
    ctx.fillStyle = isNight ? '#0d1f15' : '#274422';
    ctx.beginPath();
    ctx.arc(ix + 15, iy - 18, 12, 0, Math.PI * 2);
    ctx.arc(ix + 24, iy - 22, 9, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  /**
   * Render era-appropriate animated watercraft cruising on the Han River / Sea
   */
  renderWatercraft(ctx, animTime, isNight, era) {
    for (const b of this.boats) {
      const progress = ((animTime * b.speed * 0.05 + b.id * 0.33) % 1.0 + 1.0) % 1.0;
      const bx = b.baseX + (progress - 0.5) * b.travelDist;
      // 2:1 dimetric water movement slope
      const by = b.baseY + (progress - 0.5) * b.travelDist * 0.5;
      const bob = Math.sin(animTime * 3 + b.id) * 3;

      ctx.save();
      ctx.translate(bx, by + bob);
      ctx.scale(b.scale * b.dir, b.scale);

      if (era === 'joseon') {
        // Traditional Hwangpodotbae (황포돛배)
        // Wooden hull
        ctx.fillStyle = isNight ? '#261b14' : '#6d4825';
        ctx.beginPath();
        ctx.moveTo(-24, 0);
        ctx.lineTo(24, 0);
        ctx.lineTo(18, 8);
        ctx.lineTo(-18, 8);
        ctx.closePath();
        ctx.fill();

        // Mast & Yellow Hemp Sail (황포 돛)
        ctx.strokeStyle = isNight ? '#1c1510' : '#452b14';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(0, -32);
        ctx.stroke();

        ctx.fillStyle = isNight ? '#635338' : '#d4b267';
        ctx.beginPath();
        ctx.moveTo(0, -30);
        ctx.lineTo(16, -14);
        ctx.lineTo(0, -4);
        ctx.closePath();
        ctx.fill();

        // Hanging lantern at night
        if (isNight) {
          ctx.fillStyle = '#ffb338';
          ctx.beginPath();
          ctx.arc(-16, 2, 3, 0, Math.PI * 2);
          ctx.fill();
        }
      } else if (era === 'modern') {
        // Han River Ferry Cruise Ship (한강 유람선)
        // White streamline hull
        ctx.fillStyle = isNight ? '#3a4b60' : '#f0f4f8';
        ctx.beginPath();
        ctx.moveTo(-32, -2);
        ctx.lineTo(32, -2);
        ctx.lineTo(26, 8);
        ctx.lineTo(-24, 8);
        ctx.closePath();
        ctx.fill();

        // Navy blue stripe
        ctx.fillStyle = '#1a365d';
        ctx.fillRect(-28, 0, 56, 3);

        // Cabin & Windows
        ctx.fillStyle = isNight ? '#202d3f' : '#cbd5e0';
        ctx.fillRect(-18, -12, 36, 10);
        ctx.fillStyle = isNight ? '#fffa88' : '#63b3ed';
        for (let w = 0; w < 4; w++) {
          ctx.fillRect(-14 + w * 8, -9, 5, 4);
        }
      } else {
        // Future Seoul 2099: Floating Autonomous Aqua-Drone
        // Sleek metallic cyber platform
        ctx.fillStyle = isNight ? '#171923' : '#2d3748';
        ctx.beginPath();
        ctx.ellipse(0, 2, 22, 7, 0, 0, Math.PI * 2);
        ctx.fill();

        // Neon cyan repulsor ring
        ctx.strokeStyle = '#00f0ff';
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Holographic beacon
        ctx.fillStyle = '#00f0ff';
        ctx.beginPath();
        ctx.arc(0, -6, 3, 0, Math.PI * 2);
        ctx.fill();
      }

      // Water wake trail behind boat
      ctx.strokeStyle = isNight ? 'rgba(100, 160, 220, 0.25)' : 'rgba(255, 255, 255, 0.4)';
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.moveTo(-25, 4);
      ctx.lineTo(-55, -8);
      ctx.moveTo(-25, 6);
      ctx.lineTo(-50, 16);
      ctx.stroke();

      ctx.restore();
    }
  }

  /**
   * Surrounding buffer terrain connecting naturally to the 16x16 diamond
   */
  renderSurroundingTerrain(ctx, animTime, isNight, isHD, era) {
    ctx.save();

    // North-West & North-East Green Foothills (bordering the northern diamond edges)
    const hillColor = isNight ? '#11221b' : '#3f6340';
    ctx.fillStyle = hillColor;

    // NW Foothill Buffer
    ctx.beginPath();
    ctx.moveTo(64, 640);
    ctx.lineTo(1088, 128);
    ctx.lineTo(800, -80);
    ctx.lineTo(-200, 300);
    ctx.lineTo(-100, 700);
    ctx.closePath();
    ctx.fill();

    // NE Foothill Buffer
    ctx.beginPath();
    ctx.moveTo(1088, 128);
    ctx.lineTo(2112, 640);
    ctx.lineTo(2400, 400);
    ctx.lineTo(1800, -60);
    ctx.lineTo(1200, -80);
    ctx.closePath();
    ctx.fill();

    // Sandy Shoreline along SW and SE Riverfront edges of the diamond
    // SW Beach: from (64, 640) to (1088, 1152)
    // SE Beach: from (1088, 1152) to (2112, 640)
    const sandColor = isNight ? '#1e2b36' : '#d5c49b';
    ctx.fillStyle = sandColor;

    ctx.beginPath();
    ctx.moveTo(64, 640);
    ctx.lineTo(1088, 1152);
    ctx.lineTo(2112, 640);
    ctx.lineTo(2200, 680);
    ctx.lineTo(1088, 1220);
    ctx.lineTo(-20, 680);
    ctx.closePath();
    ctx.fill();

    // Pine trees cluster in the foothills
    const pineColor = isNight ? '#0b1913' : '#1e3820';
    ctx.fillStyle = pineColor;
    const treePositions = [
      { x: 350, y: 350 }, { x: 420, y: 310 }, { x: 500, y: 280 },
      { x: 720, y: 180 }, { x: 800, y: 150 }, { x: 880, y: 120 },
      { x: 1300, y: 140 }, { x: 1420, y: 190 }, { x: 1580, y: 260 },
      { x: 1750, y: 340 }, { x: 1900, y: 440 }, { x: 2020, y: 520 }
    ];

    for (const t of treePositions) {
      ctx.beginPath();
      ctx.arc(t.x, t.y, 14, 0, Math.PI * 2);
      ctx.arc(t.x + 8, t.y - 7, 11, 0, Math.PI * 2);
      ctx.arc(t.x - 6, t.y - 5, 10, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.restore();
  }

  /**
   * Render the 3D isometric plateau foundation / cliff under the 16x16 grid
   * so the city has solid architectural presence above the river and valley
   */
  renderIslandFoundation(ctx, isNight, isHD) {
    ctx.save();
    const cliffHeight = 36; // 36px isometric cliff depth

    // West face of the cliff (from Left vertex to Bottom vertex)
    // Left: (64, 640), Bottom: (1088, 1152)
    const westFaceColor = isNight ? '#161e27' : '#5e5142';
    ctx.fillStyle = westFaceColor;
    ctx.beginPath();
    ctx.moveTo(64, 640);
    ctx.lineTo(1088, 1152);
    ctx.lineTo(1088, 1152 + cliffHeight);
    ctx.lineTo(64, 640 + cliffHeight);
    ctx.closePath();
    ctx.fill();

    // East face of the cliff (from Bottom vertex to Right vertex)
    // Bottom: (1088, 1152), Right: (2112, 640)
    // Slightly darker shadow side
    const eastFaceColor = isNight ? '#10171f' : '#453a2d';
    ctx.fillStyle = eastFaceColor;
    ctx.beginPath();
    ctx.moveTo(1088, 1152);
    ctx.lineTo(2112, 640);
    ctx.lineTo(2112, 640 + cliffHeight);
    ctx.lineTo(1088, 1152 + cliffHeight);
    ctx.closePath();
    ctx.fill();

    // Stone masonry texture along the cliff edge
    ctx.strokeStyle = isNight ? '#0a0f14' : '#2b2319';
    ctx.lineWidth = 1;
    for (let c = 0; c < 16; c++) {
      const wx = 64 + c * 64;
      const wy = 640 + c * 32;
      ctx.beginPath();
      ctx.moveTo(wx, wy);
      ctx.lineTo(wx, wy + cliffHeight);
      ctx.stroke();

      const ex = 1088 + c * 64;
      const ey = 1152 - c * 32;
      ctx.beginPath();
      ctx.moveTo(ex, ey);
      ctx.lineTo(ex, ey + cliffHeight);
      ctx.stroke();
    }

    ctx.restore();
  }

  /**
   * Render atmospheric forefront elements (water reflections, coastal sparkles)
   */
  renderForefront(ctx, animTime, lightingState, isHD) {
    // Soft atmospheric boundary blending
    ctx.save();
    // Shimmering water sparkles on the riverbank
    if (!lightingState.includes('night') && isHD) {
      for (let k = 0; k < 18; k++) {
        const sx = 200 + ((k * 89 + animTime * 12) % 1700);
        const sy = 680 + ((k * 37) % 500);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.45)';
        ctx.fillRect(sx, sy, 2, 2);
      }
    }
    ctx.restore();
  }
}

export const scenicEnvironment = new ScenicEnvironment();
