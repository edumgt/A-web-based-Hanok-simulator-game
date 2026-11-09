/**
 * Dynamic Living Traffic & Citizens Simulation Engine for Seoul Time Builder
 * Supports Joseon Era (소달구지, 가마, 나귀 보부상, 선비, 주민),
 * Modern Seoul (서울 간선/지선 버스, 해치 주황 택시, 승용차, 보행자),
 * and Future Seoul 2099 (UAM 플라잉 에어택시, 네온 사이버 크루저, 배송 드론, 공중 순찰기).
 */

const ROWS = 16;
const COLS = 16;
const HALF_W = 64;
const QUARTER_W = 32;
const ORIGIN_X = 64 + (16 - 1) * 64; // 1024
const ORIGIN_Y = 64; // 64

// Direction vectors: 
// 0: +Col (SE: down-right, dc = +1, dr = 0)
// 1: +Row (SW: down-left,  dc = 0,  dr = +1)
// 2: -Col (NW: up-left,    dc = -1, dr = 0)
// 3: -Row (NE: up-right,   dc = 0,  dr = -1)
const DIR_VECTORS = [
  { dc: 1, dr: 0, dx: HALF_W, dy: QUARTER_W },
  { dc: 0, dr: 1, dx: -HALF_W, dy: QUARTER_W },
  { dc: -1, dr: 0, dx: -HALF_W, dy: -QUARTER_W },
  { dc: 0, dr: -1, dx: HALF_W, dy: -QUARTER_W }
];

function isRoadTile(tid) {
  if (!tid) return false;
  // Road tiles r01 ~ r12, bridges, plazas
  if (tid.startsWith('r0') || tid.startsWith('r1') || tid.startsWith('h0')) return true;
  if (tid.includes('road') || tid.includes('bridge') || tid.includes('street')) return true;
  return false;
}

function isWalkableTile(tid) {
  if (isRoadTile(tid)) return true;
  if (!tid) return false;
  // Plazas, markets, garden walkways
  if (tid.startsWith('d01') || tid.startsWith('d02') || tid.startsWith('d03') || tid.startsWith('d08') || tid.startsWith('d07')) return true;
  return false;
}

function cellToScreen(r, c) {
  const ox = ORIGIN_X + (c - r) * HALF_W;
  const oy = ORIGIN_Y + (r + c) * QUARTER_W;
  return {
    x: ox + 64,
    y: oy + 96
  };
}

class TrafficEngine {
  constructor() {
    this.vehicles = [];
    this.era = 'joseon';
    this.enabled = true;
    this.getGrid = null;
    this.getLighting = null;
    this.getHD = null;
    this.maxVehicles = 16;
    this.spawnTimer = 0;
    this.particles = [];
  }

  init(getGridFn, getEraFn, getLightingFn, getHDFn) {
    this.getGrid = getGridFn;
    this.era = getEraFn() || 'joseon';
    this.getLighting = getLightingFn;
    this.getHD = getHDFn;
    this.vehicles = [];
    this.particles = [];
    this.populateInitialVehicles();
  }

  setEra(newEra) {
    if (this.era === newEra) return;
    this.era = newEra;
    // Morph or respawn vehicles for the new era
    this.vehicles = [];
    this.particles = [];
    this.populateInitialVehicles();
  }

  toggle(forceState) {
    if (forceState !== undefined) {
      this.enabled = forceState;
    } else {
      this.enabled = !this.enabled;
    }
    return this.enabled;
  }

  isEnabled() {
    return this.enabled;
  }

  getRoadCells() {
    if (!this.getGrid) return [];
    const grid = this.getGrid();
    if (!grid) return [];
    const roads = [];
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        if (isRoadTile(grid[r][c])) {
          roads.push({ r, c, tid: grid[r][c] });
        }
      }
    }
    return roads;
  }

  getWalkableCells() {
    if (!this.getGrid) return [];
    const grid = this.getGrid();
    if (!grid) return [];
    const cells = [];
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        if (isWalkableTile(grid[r][c])) {
          cells.push({ r, c, tid: grid[r][c] });
        }
      }
    }
    return cells;
  }

  populateInitialVehicles() {
    const roadCells = this.getRoadCells();
    const walkableCells = this.getWalkableCells();
    const targetCount = this.maxVehicles;

    for (let i = 0; i < targetCount; i++) {
      this.spawnAgent(roadCells, walkableCells, true);
    }
  }

  spawnAgent(roadCells, walkableCells, randomizeProgress = false) {
    if (!roadCells) roadCells = this.getRoadCells();
    if (!walkableCells) walkableCells = this.getWalkableCells();

    const isFuture = this.era === 'future';
    const isJoseon = this.era === 'joseon';
    const isModern = this.era === 'modern';

    // Pick type based on era
    let type = '';
    let isAirborne = false;
    let altitude = 0;
    let speed = 1.0;

    if (isJoseon) {
      const types = ['ox_cart', 'donkey_peddler', 'palanquin', 'scholar', 'villager'];
      type = types[Math.floor(Math.random() * types.length)];
      if (type === 'ox_cart') speed = 0.65 + Math.random() * 0.2;
      else if (type === 'palanquin') speed = 0.85 + Math.random() * 0.25;
      else if (type === 'donkey_peddler') speed = 0.75 + Math.random() * 0.2;
      else speed = 0.55 + Math.random() * 0.25; // pedestrian
    } else if (isModern) {
      const types = ['bus_blue', 'bus_green', 'taxi_orange', 'taxi_silver', 'car_white', 'car_black', 'pedestrian'];
      type = types[Math.floor(Math.random() * types.length)];
      if (type.startsWith('bus')) speed = 1.25 + Math.random() * 0.3;
      else if (type.startsWith('taxi')) speed = 1.5 + Math.random() * 0.4;
      else if (type.startsWith('car')) speed = 1.4 + Math.random() * 0.35;
      else speed = 0.6 + Math.random() * 0.25; // pedestrian
    } else {
      // Future
      const types = ['sky_cab', 'drone_cargo', 'cyber_cruiser', 'police_skimmer', 'hover_commuter'];
      type = types[Math.floor(Math.random() * types.length)];
      isAirborne = true;
      altitude = 35 + Math.random() * 45; // 35px to 80px hovering height
      speed = 1.8 + Math.random() * 0.8;
    }

    // Determine start cell
    let startCell = null;
    const isPedestrian = type === 'scholar' || type === 'villager' || type === 'pedestrian';
    const candidateCells = (isPedestrian && walkableCells.length > 0) ? walkableCells : roadCells;

    if (candidateCells.length > 0) {
      startCell = candidateCells[Math.floor(Math.random() * candidateCells.length)];
    } else {
      // Fallback to random grid cell
      startCell = { r: Math.floor(Math.random() * ROWS), c: Math.floor(Math.random() * COLS) };
    }

    // Determine initial direction & next cell
    const validDirs = this.getValidDirs(startCell.r, startCell.c, isAirborne);
    const dir = validDirs.length > 0 ? validDirs[Math.floor(Math.random() * validDirs.length)] : Math.floor(Math.random() * 4);
    const vec = DIR_VECTORS[dir];
    const toR = Math.max(0, Math.min(ROWS - 1, startCell.r + vec.dr));
    const toC = Math.max(0, Math.min(COLS - 1, startCell.c + vec.dc));

    const agent = {
      id: Math.random().toString(36).substring(2, 9),
      era: this.era,
      type,
      isAirborne,
      altitude,
      baseAltitude: altitude,
      fromR: startCell.r,
      fromC: startCell.c,
      toR,
      toC,
      dir,
      speed,
      progress: randomizeProgress ? Math.random() : 0.0,
      bobPhase: Math.random() * Math.PI * 2,
      lightTimer: Math.random() * 10
    };

    this.vehicles.push(agent);
  }

  getValidDirs(r, c, isAirborne) {
    const valid = [];
    const grid = this.getGrid ? this.getGrid() : null;

    for (let d = 0; d < 4; d++) {
      const nr = r + DIR_VECTORS[d].dr;
      const nc = c + DIR_VECTORS[d].dc;
      if (nr >= 0 && nr < ROWS && nc >= 0 && nc < COLS) {
        if (isAirborne) {
          // Future airborne vehicles can fly anywhere across the map
          valid.push(d);
        } else if (grid) {
          const tid = grid[nr][nc];
          if (isRoadTile(tid) || isWalkableTile(tid)) {
            valid.push(d);
          }
        } else {
          valid.push(d);
        }
      }
    }
    return valid;
  }

  update(dt) {
    if (!this.enabled) return;

    // Maintain vehicle count
    if (this.vehicles.length < this.maxVehicles) {
      this.spawnTimer += dt;
      if (this.spawnTimer > 0.4) {
        this.spawnTimer = 0;
        this.spawnAgent();
      }
    }

    // Update particles
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.life -= dt;
      p.x += p.vx * dt;
      p.y += p.vy * dt;
      p.alpha = Math.max(0, p.life / p.maxLife);
      if (p.life <= 0) {
        this.particles.splice(i, 1);
      }
    }

    // Update each vehicle
    for (let i = this.vehicles.length - 1; i >= 0; i--) {
      const v = this.vehicles[i];
      v.progress += (v.speed * dt);
      v.bobPhase += dt * 5.0;

      // Future hovering vehicle gentle sinusoidal floating
      if (v.isAirborne) {
        v.altitude = v.baseAltitude + Math.sin(v.bobPhase * 0.8) * 4.5;
        // Spawn thruster particle trail
        if (Math.random() < 0.6) {
          const pos = this.getVehicleScreenPos(v);
          const color = v.type === 'cyber_cruiser' ? 'rgba(255, 0, 150,' : 'rgba(0, 240, 255,';
          this.particles.push({
            x: pos.x - DIR_VECTORS[v.dir].dx * 0.25 + (Math.random() - 0.5) * 4,
            y: pos.y - DIR_VECTORS[v.dir].dy * 0.25 + (Math.random() - 0.5) * 4,
            vx: -DIR_VECTORS[v.dir].dx * 0.15 + (Math.random() - 0.5) * 10,
            vy: -DIR_VECTORS[v.dir].dy * 0.15 + (Math.random() - 0.5) * 10,
            life: 0.35 + Math.random() * 0.2,
            maxLife: 0.55,
            alpha: 1.0,
            size: 2.5 + Math.random() * 2,
            color
          });
        }
      }

      // Check if reached destination cell
      if (v.progress >= 1.0) {
        v.progress = 0.0;
        v.fromR = v.toR;
        v.fromC = v.toC;

        // Pick next direction
        const validDirs = this.getValidDirs(v.fromR, v.fromC, v.isAirborne);
        // Exclude 180-degree reverse unless dead end
        const oppositeDir = (v.dir + 2) % 4;
        const forwardDirs = validDirs.filter(d => d !== oppositeDir);
        let nextDir = v.dir;

        if (forwardDirs.length > 0) {
          // 70% chance to continue straight if possible, otherwise turn
          if (forwardDirs.includes(v.dir) && Math.random() < 0.65) {
            nextDir = v.dir;
          } else {
            nextDir = forwardDirs[Math.floor(Math.random() * forwardDirs.length)];
          }
        } else if (validDirs.length > 0) {
          nextDir = validDirs[Math.floor(Math.random() * validDirs.length)];
        } else {
          // Nowhere to go, respawn elsewhere
          this.vehicles.splice(i, 1);
          continue;
        }

        v.dir = nextDir;
        v.toR = Math.max(0, Math.min(ROWS - 1, v.fromR + DIR_VECTORS[nextDir].dr));
        v.toC = Math.max(0, Math.min(COLS - 1, v.fromC + DIR_VECTORS[nextDir].dc));
      }
    }
  }

  getVehicleScreenPos(v) {
    const p1 = cellToScreen(v.fromR, v.fromC);
    const p2 = cellToScreen(v.toR, v.toC);
    const x = p1.x + (p2.x - p1.x) * v.progress;
    const y = p1.y + (p2.y - p1.y) * v.progress - (v.altitude || 0);
    const groundY = p1.y + (p2.y - p1.y) * v.progress;
    return { x, y, groundY, depth: (v.fromR + (v.toR - v.fromR) * v.progress) + (v.fromC + (v.toC - v.fromC) * v.progress) };
  }

  render(ctx, camera) {
    if (!this.enabled || this.vehicles.length === 0) return;

    const isNight = this.getLighting && this.getLighting() === 'night';
    const isHD = this.getHD && this.getHD();

    // Sort vehicles by depth (Y position) so near vehicles draw on top of far vehicles
    const renderList = this.vehicles.map(v => {
      const pos = this.getVehicleScreenPos(v);
      return { vehicle: v, pos };
    });
    renderList.sort((a, b) => a.pos.depth - b.pos.depth);

    // 1. Draw Ground Shadows first (especially for future flying cars & ground carts)
    for (const item of renderList) {
      const { vehicle: v, pos } = item;
      this.drawShadow(ctx, v, pos, isNight);
    }

    // 2. Draw Thruster Particles for Future vehicles
    if (this.particles.length > 0) {
      ctx.save();
      for (const p of this.particles) {
        ctx.fillStyle = `${p.color} ${p.alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    }

    // 3. Draw Vehicle Sprites
    for (const item of renderList) {
      const { vehicle: v, pos } = item;
      this.drawVehicle(ctx, v, pos, isNight, isHD);
    }

    // 4. Night Mode Headlights and Lantern Glow
    if (isNight) {
      this.drawNightLights(ctx, renderList);
    }
  }

  drawShadow(ctx, v, pos, isNight) {
    ctx.save();
    const shadowAlpha = isNight ? 0.35 : 0.22;
    ctx.fillStyle = `rgba(18, 14, 28, ${shadowAlpha})`;

    if (v.isAirborne) {
      // Projected shadow below flying vehicle on the ground
      const scale = Math.max(0.6, 1.0 - (v.altitude / 160));
      ctx.beginPath();
      ctx.ellipse(pos.x, pos.groundY, 18 * scale, 9 * scale, -0.3, 0, Math.PI * 2);
      ctx.fill();
    } else {
      // Ground contact shadow
      ctx.beginPath();
      ctx.ellipse(pos.x + 2, pos.groundY + 2, 14, 7, -0.3, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  }

  drawVehicle(ctx, v, pos, isNight, isHD) {
    ctx.save();
    ctx.translate(Math.round(pos.x), Math.round(pos.y));

    // Direction flip: dir 0 (+Col, SE) and dir 3 (-Row, NE) face rightwards;
    // dir 1 (+Row, SW) and dir 2 (-Col, NW) face leftwards.
    const isFacingLeft = v.dir === 1 || v.dir === 2;
    const isFacingUp = v.dir === 2 || v.dir === 3;

    if (isFacingLeft) {
      ctx.scale(-1, 1);
    }

    switch (v.type) {
      // ================= JOSEON ERA =================
      case 'ox_cart':
        this.renderJoseonOxCart(ctx, v, isFacingUp, isNight);
        break;
      case 'palanquin':
        this.renderJoseonPalanquin(ctx, v, isFacingUp, isNight);
        break;
      case 'donkey_peddler':
        this.renderJoseonDonkeyPeddler(ctx, v, isFacingUp);
        break;
      case 'scholar':
        this.renderJoseonScholar(ctx, v, isFacingUp);
        break;
      case 'villager':
        this.renderJoseonVillager(ctx, v, isFacingUp);
        break;

      // ================= MODERN SEOUL =================
      case 'bus_blue':
        this.renderModernBus(ctx, v, isFacingUp, '#005baa', '140', isNight);
        break;
      case 'bus_green':
        this.renderModernBus(ctx, v, isFacingUp, '#38a834', '7016', isNight);
        break;
      case 'taxi_orange':
        this.renderModernTaxi(ctx, v, isFacingUp, '#ea6518', isNight);
        break;
      case 'taxi_silver':
        this.renderModernTaxi(ctx, v, isFacingUp, '#d6dbe0', isNight);
        break;
      case 'car_white':
        this.renderModernCar(ctx, v, isFacingUp, '#f4f6fa', isNight);
        break;
      case 'car_black':
        this.renderModernCar(ctx, v, isFacingUp, '#22262c', isNight);
        break;
      case 'pedestrian':
        this.renderModernPedestrian(ctx, v, isFacingUp);
        break;

      // ================= FUTURE SEOUL 2099 =================
      case 'sky_cab':
        this.renderFutureSkyCab(ctx, v, isFacingUp, isNight);
        break;
      case 'drone_cargo':
        this.renderFutureDrone(ctx, v, isFacingUp, isNight);
        break;
      case 'cyber_cruiser':
        this.renderFutureCyberCruiser(ctx, v, isFacingUp, isNight);
        break;
      case 'police_skimmer':
        this.renderFuturePoliceSkimmer(ctx, v, isFacingUp, isNight);
        break;
      case 'hover_commuter':
        this.renderFutureHoverCommuter(ctx, v, isFacingUp, isNight);
        break;

      default:
        // Generic fallback vehicle
        ctx.fillStyle = '#666';
        ctx.fillRect(-6, -6, 12, 12);
        break;
    }

    ctx.restore();
  }

  // ------------------ JOSEON SPRITES ------------------

  renderJoseonOxCart(ctx, v, isFacingUp, isNight) {
    const wheelRot = v.bobPhase * 2.5;

    // 1. Ox in front
    ctx.save();
    ctx.translate(14, 0);
    // Ox body (brown)
    ctx.fillStyle = '#8a4b24';
    ctx.fillRect(-8, -8, 16, 10);
    // Ox head & muzzle
    ctx.fillStyle = '#6f3918';
    ctx.fillRect(8, -12, 8, 8);
    ctx.fillStyle = '#f3cfab';
    ctx.fillRect(14, -8, 3, 4); // muzzle
    // Horns
    ctx.fillStyle = '#3a2b20';
    ctx.fillRect(10, -15, 2, 4);
    ctx.fillRect(13, -15, 2, 3);
    // Legs (alternating walking)
    const legOffset = Math.sin(v.bobPhase * 4) * 3;
    ctx.fillStyle = '#5c2d13';
    ctx.fillRect(-6, 2, 3, 6 + legOffset);
    ctx.fillRect(4, 2, 3, 6 - legOffset);
    ctx.restore();

    // 2. Harness yoke shafts
    ctx.strokeStyle = '#5a3d28';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(6, -2);
    ctx.lineTo(14, -4);
    ctx.stroke();

    // 3. Wooden Cart Bed
    ctx.fillStyle = '#6d4c2b';
    ctx.fillRect(-16, -10, 22, 10);
    ctx.fillStyle = '#8c6239';
    ctx.fillRect(-15, -9, 20, 8);

    // 4. Cargo on cart: Rice straw sacks (가마니) or Pottery jars (옹기)
    ctx.fillStyle = '#d4b26f';
    ctx.beginPath();
    ctx.ellipse(-8, -13, 8, 5, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#8b6932';
    ctx.lineWidth = 1;
    ctx.stroke();

    // Secondary smaller sack
    ctx.fillStyle = '#c79d55';
    ctx.beginPath();
    ctx.ellipse(-3, -15, 5, 4, 0, 0, Math.PI * 2);
    ctx.fill();

    // 5. Wooden Spoke Wheels (turning)
    ctx.save();
    ctx.translate(-7, 2);
    ctx.strokeStyle = '#3e2716';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(0, 0, 6, 0, Math.PI * 2);
    ctx.stroke();
    // Spokes
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(Math.cos(wheelRot) * 6, Math.sin(wheelRot) * 6);
    ctx.lineTo(-Math.cos(wheelRot) * 6, -Math.sin(wheelRot) * 6);
    ctx.moveTo(Math.cos(wheelRot + 1.57) * 6, Math.sin(wheelRot + 1.57) * 6);
    ctx.lineTo(-Math.cos(wheelRot + 1.57) * 6, -Math.sin(wheelRot + 1.57) * 6);
    ctx.stroke();
    ctx.restore();

    // Hanging lantern at night
    if (isNight) {
      ctx.fillStyle = '#ffb338';
      ctx.fillRect(-18, -4, 4, 6);
      ctx.fillStyle = '#fff';
      ctx.fillRect(-17, -3, 2, 4);
    }
  }

  renderJoseonPalanquin(ctx, v, isFacingUp, isNight) {
    const legWalk = Math.sin(v.bobPhase * 4) * 3;

    // Bearer 1 (Front bearer)
    ctx.save();
    ctx.translate(18, 0);
    // Blue robe (철릭)
    ctx.fillStyle = '#2c5282';
    ctx.fillRect(-3, -10, 6, 10);
    // Head & Sangtu topknot
    ctx.fillStyle = '#dcb085';
    ctx.fillRect(-2, -14, 4, 4);
    ctx.fillStyle = '#1a202c';
    ctx.fillRect(-2, -16, 4, 2);
    // Legs
    ctx.fillStyle = '#e2e8f0';
    ctx.fillRect(-3, 0, 2, 6 + legWalk);
    ctx.fillRect(1, 0, 2, 6 - legWalk);
    ctx.restore();

    // Bearer 2 (Rear bearer)
    ctx.save();
    ctx.translate(-18, 0);
    // Blue robe
    ctx.fillStyle = '#2c5282';
    ctx.fillRect(-3, -10, 6, 10);
    // Head
    ctx.fillStyle = '#dcb085';
    ctx.fillRect(-2, -14, 4, 4);
    ctx.fillStyle = '#1a202c';
    ctx.fillRect(-2, -16, 4, 2);
    // Legs
    ctx.fillStyle = '#e2e8f0';
    ctx.fillRect(-3, 0, 2, 6 - legWalk);
    ctx.fillRect(1, 0, 2, 6 + legWalk);
    ctx.restore();

    // Long carrying poles (가마채)
    ctx.strokeStyle = '#8d5b30';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(-22, -6);
    ctx.lineTo(22, -6);
    ctx.stroke();

    // Ornate Palanquin Box (가마 본체)
    // Red lacquered wood with gold trimming
    ctx.fillStyle = '#7b181b';
    ctx.fillRect(-11, -17, 22, 14);
    ctx.fillStyle = '#9b2c2c';
    ctx.fillRect(-10, -16, 20, 12);

    // Roof & Eaves (지붕 처마 곡선)
    ctx.fillStyle = '#2d3748';
    ctx.beginPath();
    ctx.moveTo(-14, -17);
    ctx.lineTo(14, -17);
    ctx.lineTo(0, -22);
    ctx.closePath();
    ctx.fill();

    // Gold trim ornament & window
    ctx.fillStyle = '#d69e2e';
    ctx.fillRect(-1, -23, 2, 2); // pinnacle
    ctx.fillStyle = '#fbd38d';
    ctx.fillRect(-4, -13, 8, 6); // silk curtain window
    ctx.strokeStyle = '#744210';
    ctx.lineWidth = 1;
    ctx.strokeRect(-4, -13, 8, 6);
  }

  renderJoseonDonkeyPeddler(ctx, v, isFacingUp) {
    const legWalk = Math.sin(v.bobPhase * 4) * 2.5;

    // Peddler walking ahead
    ctx.save();
    ctx.translate(14, 0);
    // Peddler White/hemp robe (무명 저고리)
    ctx.fillStyle = '#e2d9cc';
    ctx.fillRect(-3, -10, 6, 9);
    // Straw Hat (패랭이모자 with cotton pom)
    ctx.fillStyle = '#dcb085';
    ctx.fillRect(-2, -13, 4, 3);
    ctx.fillStyle = '#b7791f';
    ctx.beginPath();
    ctx.ellipse(0, -14, 6, 2, 0, 0, Math.PI * 2);
    ctx.fill();
    // Walking stick
    ctx.strokeStyle = '#5a3d28';
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.moveTo(3, -10);
    ctx.lineTo(4, 5);
    ctx.stroke();
    // Legs
    ctx.fillStyle = '#cbd5e0';
    ctx.fillRect(-3, -1, 2, 6 + legWalk);
    ctx.fillRect(1, -1, 2, 6 - legWalk);
    ctx.restore();

    // Lead rope
    ctx.strokeStyle = '#718096';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(3, -4);
    ctx.lineTo(11, -5);
    ctx.stroke();

    // Pack Donkey (나귀)
    ctx.save();
    ctx.translate(-4, 0);
    // Donkey body (grey)
    ctx.fillStyle = '#718096';
    ctx.fillRect(-8, -8, 14, 9);
    // Donkey head & long ears
    ctx.fillStyle = '#4a5568';
    ctx.fillRect(6, -11, 6, 6);
    ctx.fillStyle = '#2d3748';
    ctx.fillRect(8, -15, 2, 5); // ear
    ctx.fillRect(10, -15, 2, 4);
    // Wicker cargo bundles (봇짐) on back
    ctx.fillStyle = '#d69e2e';
    ctx.fillRect(-7, -13, 12, 6);
    ctx.strokeStyle = '#744210';
    ctx.lineWidth = 1;
    ctx.strokeRect(-7, -13, 12, 6);
    // Donkey legs
    ctx.fillStyle = '#4a5568';
    ctx.fillRect(-6, 1, 2, 6 - legWalk);
    ctx.fillRect(2, 1, 2, 6 + legWalk);
    ctx.restore();
  }

  renderJoseonScholar(ctx, v, isFacingUp) {
    const walk = Math.sin(v.bobPhase * 4) * 2;
    // White Flowing Dopo Coat (흰 도포)
    ctx.fillStyle = '#f7fafc';
    ctx.fillRect(-4, -12, 8, 12);
    // Blue waist cord (세조대)
    ctx.fillStyle = '#3182ce';
    ctx.fillRect(-4, -6, 8, 2);
    // Face
    ctx.fillStyle = '#f6ad55';
    ctx.fillRect(-2, -15, 4, 3);
    // Joseon Horsehair Gat (흑립 갓)
    ctx.fillStyle = '#1a202c';
    ctx.fillRect(-2, -18, 4, 3); // crown
    ctx.beginPath();
    ctx.ellipse(0, -15, 7, 2, 0, 0, Math.PI * 2); // wide brim
    ctx.fill();
    // Legs
    ctx.fillStyle = '#edf2f7';
    ctx.fillRect(-3, 0, 2, 5 + walk);
    ctx.fillRect(1, 0, 2, 5 - walk);
  }

  renderJoseonVillager(ctx, v, isFacingUp) {
    const walk = Math.sin(v.bobPhase * 4) * 2;
    // Hanbok Yellow Jeogori & Indigo Chima
    ctx.fillStyle = '#ecc94b';
    ctx.fillRect(-3, -11, 6, 5); // top
    ctx.fillStyle = '#2b6cb0';
    ctx.fillRect(-4, -6, 8, 7); // skirt
    // Hair braided chignon
    ctx.fillStyle = '#f6ad55';
    ctx.fillRect(-2, -14, 4, 3);
    ctx.fillStyle = '#1a202c';
    ctx.fillRect(-2, -16, 4, 3);
    // Legs
    ctx.fillStyle = '#fff';
    ctx.fillRect(-2, 1, 2, 4 + walk);
    ctx.fillRect(1, 1, 2, 4 - walk);
  }

  // ------------------ MODERN SEOUL SPRITES ------------------

  renderModernBus(ctx, v, isFacingUp, busColor, routeNo, isNight) {
    // Seoul City Bus: 2:1 dimetric isometric elongated box
    const len = 34;
    const wid = 14;
    const hgt = 16;

    // Bus lower chassis (dark grey)
    ctx.fillStyle = '#1a202c';
    ctx.fillRect(-len / 2, -hgt / 2, len, hgt);

    // Colored Bus Main Body (Blue 140 / Green 7016)
    ctx.fillStyle = busColor;
    ctx.fillRect(-len / 2, -hgt, len, hgt);

    // White Roof Cap
    ctx.fillStyle = '#f7fafc';
    ctx.fillRect(-len / 2, -hgt - 3, len, 4);

    // Panoramic Windows (tinted dark cyan-blue)
    ctx.fillStyle = '#2d3748';
    ctx.fillRect(-len / 2 + 3, -hgt + 2, len - 6, 6);
    ctx.fillStyle = '#63b3ed';
    for (let w = 0; w < 5; w++) {
      ctx.fillRect(-len / 2 + 5 + w * 5, -hgt + 3, 3.5, 4.5);
    }

    // Front Windshield & Route Number Display
    ctx.fillStyle = '#edf2f7';
    ctx.fillRect(len / 2 - 4, -hgt + 2, 4, 6);
    // Route LED badge
    ctx.fillStyle = '#e2e8f0';
    ctx.fillRect(len / 2 - 5, -hgt - 1, 5, 3);
    ctx.fillStyle = '#c53030';
    ctx.fillRect(len / 2 - 4, -hgt, 3, 1.5);

    // Wheels (rubber black with silver hubcap)
    ctx.fillStyle = '#171923';
    ctx.fillRect(-len / 2 + 5, 0, 5, 3);
    ctx.fillRect(len / 2 - 9, 0, 5, 3);
    ctx.fillStyle = '#cbd5e0';
    ctx.fillRect(-len / 2 + 6, 1, 3, 1.5);
    ctx.fillRect(len / 2 - 8, 1, 3, 1.5);

    // Headlights (Front right) & Taillights (Rear left)
    ctx.fillStyle = '#ecc94b';
    ctx.fillRect(len / 2 - 1, -4, 2, 3);
    ctx.fillStyle = '#e53e3e';
    ctx.fillRect(-len / 2, -4, 2, 3);
  }

  renderModernTaxi(ctx, v, isFacingUp, taxiColor, isNight) {
    const len = 22;
    const hgt = 10;

    // Body
    ctx.fillStyle = taxiColor;
    ctx.fillRect(-len / 2, -hgt, len, hgt);

    // Cabin roof & tinted glass
    ctx.fillStyle = '#2d3748';
    ctx.fillRect(-len / 2 + 4, -hgt - 5, 12, 6);
    ctx.fillStyle = '#90cdf4';
    ctx.fillRect(-len / 2 + 5, -hgt - 4, 10, 4);

    // Roof TAXI Dome Light
    ctx.fillStyle = '#edf2f7';
    ctx.fillRect(-2, -hgt - 8, 6, 3);
    ctx.fillStyle = '#3182ce';
    ctx.fillRect(-1, -hgt - 7, 4, 1.5);

    // Wheels
    ctx.fillStyle = '#171923';
    ctx.fillRect(-len / 2 + 3, 0, 4, 2);
    ctx.fillRect(len / 2 - 6, 0, 4, 2);

    // Headlight & Taillight
    ctx.fillStyle = '#fff566';
    ctx.fillRect(len / 2 - 1, -3, 2, 2);
    ctx.fillStyle = '#f5222d';
    ctx.fillRect(-len / 2, -3, 2, 2);
  }

  renderModernCar(ctx, v, isFacingUp, carColor, isNight) {
    const len = 22;
    const hgt = 9;

    ctx.fillStyle = carColor;
    ctx.fillRect(-len / 2, -hgt, len, hgt);

    // Cabin
    ctx.fillStyle = '#1a202c';
    ctx.fillRect(-len / 2 + 4, -hgt - 4, 12, 5);
    ctx.fillStyle = '#718096';
    ctx.fillRect(-len / 2 + 5, -hgt - 3, 10, 3.5);

    // Wheels
    ctx.fillStyle = '#171923';
    ctx.fillRect(-len / 2 + 3, 0, 4, 2);
    ctx.fillRect(len / 2 - 6, 0, 4, 2);

    // Lights
    ctx.fillStyle = '#fff';
    ctx.fillRect(len / 2 - 1, -3, 2, 2);
    ctx.fillStyle = '#e53e3e';
    ctx.fillRect(-len / 2, -3, 2, 2);
  }

  renderModernPedestrian(ctx, v, isFacingUp) {
    const walk = Math.sin(v.bobPhase * 5) * 2;
    // Modern Casual / Suit
    ctx.fillStyle = '#2b6cb0';
    ctx.fillRect(-2, -9, 5, 5); // jacket
    ctx.fillStyle = '#ecc94b';
    ctx.fillRect(-1, -12, 3, 3); // face/hair
    ctx.fillStyle = '#1a202c';
    ctx.fillRect(-1, -13, 3, 2); // hair
    // Pants & walking legs
    ctx.fillStyle = '#4a5568';
    ctx.fillRect(-2, -4, 2, 5 + walk);
    ctx.fillRect(1, -4, 2, 5 - walk);
  }

  // ------------------ FUTURE SEOUL 2099 SPRITES ------------------

  renderFutureSkyCab(ctx, v, isFacingUp, isNight) {
    // Aerodynamic Neon Cyan UAM Hover Taxi
    const len = 28;
    const hgt = 10;

    // Sleek Hull (Metallic Midnight Charcoal)
    ctx.fillStyle = '#1a202c';
    ctx.beginPath();
    ctx.moveTo(len / 2, 0);
    ctx.lineTo(len / 2 - 4, -hgt);
    ctx.lineTo(-len / 2 + 6, -hgt);
    ctx.lineTo(-len / 2, -2);
    ctx.closePath();
    ctx.fill();

    // Glowing Neon Cyan Cockpit Canopy
    ctx.fillStyle = '#00f0ff';
    ctx.beginPath();
    ctx.moveTo(len / 2 - 6, -3);
    ctx.lineTo(len / 2 - 8, -hgt + 2);
    ctx.lineTo(-len / 2 + 10, -hgt + 2);
    ctx.lineTo(-len / 2 + 8, -3);
    ctx.closePath();
    ctx.fill();

    // Rear Dual Thruster Pods (Glowing Cyan Flame)
    ctx.fillStyle = '#00f0ff';
    ctx.fillRect(-len / 2 - 3, -7, 4, 3);
    ctx.fillRect(-len / 2 - 3, -2, 4, 3);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(-len / 2 - 1, -6, 2, 1.5);
    ctx.fillRect(-len / 2 - 1, -1, 2, 1.5);

    // Front Holographic Projector Beam
    ctx.fillStyle = '#79ffe1';
    ctx.fillRect(len / 2 - 2, -4, 3, 2);

    // Anti-gravity repulsor pads on underside (flashing neon pulse)
    const pulse = 0.5 + 0.5 * Math.sin(v.bobPhase * 3);
    ctx.fillStyle = `rgba(0, 240, 255, ${pulse * 0.8})`;
    ctx.fillRect(-len / 2 + 6, 1, 6, 2);
    ctx.fillRect(len / 2 - 10, 1, 6, 2);
  }

  renderFutureDrone(ctx, v, isFacingUp, isNight) {
    // Quad-Rotor Sky Cargo Delivery Drone
    const armLen = 14;

    // Center Cargo Pod (High-tech yellow/hazard stripes)
    ctx.fillStyle = '#ecc94b';
    ctx.fillRect(-7, -8, 14, 10);
    ctx.strokeStyle = '#2d3748';
    ctx.lineWidth = 1;
    ctx.strokeRect(-7, -8, 14, 10);

    // Digital Core Display
    ctx.fillStyle = '#48bb78';
    ctx.fillRect(-4, -5, 8, 4);

    // 4 Neon Rotor Arms
    ctx.strokeStyle = '#718096';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(-armLen, -12);
    ctx.lineTo(armLen, 2);
    ctx.moveTo(-armLen, 2);
    ctx.lineTo(armLen, -12);
    ctx.stroke();

    // Spinning Blurred Rotors (Neon Green)
    ctx.fillStyle = 'rgba(72, 187, 120, 0.7)';
    ctx.beginPath();
    ctx.ellipse(-armLen, -12, 6, 2, 0, 0, Math.PI * 2);
    ctx.ellipse(armLen, 2, 6, 2, 0, 0, Math.PI * 2);
    ctx.ellipse(-armLen, 2, 6, 2, 0, 0, Math.PI * 2);
    ctx.ellipse(armLen, -12, 6, 2, 0, 0, Math.PI * 2);
    ctx.fill();

    // Flashing Anti-Collision Beacon
    const blink = Math.sin(v.bobPhase * 8) > 0;
    ctx.fillStyle = blink ? '#f56565' : '#742a2a';
    ctx.beginPath();
    ctx.arc(0, -10, 2, 0, Math.PI * 2);
    ctx.fill();
  }

  renderFutureCyberCruiser(ctx, v, isFacingUp, isNight) {
    // Cyberpunk Magenta/Pink Neon Speed Cruiser
    const len = 30;
    const hgt = 8;

    // Wedge Shape Body
    ctx.fillStyle = '#171923';
    ctx.beginPath();
    ctx.moveTo(len / 2, -2);
    ctx.lineTo(len / 2 - 8, -hgt);
    ctx.lineTo(-len / 2, -hgt);
    ctx.lineTo(-len / 2, 1);
    ctx.closePath();
    ctx.fill();

    // Magenta Neon Ribbons
    ctx.fillStyle = '#ff007f';
    ctx.fillRect(-len / 2, -2, len - 4, 2);

    // Cockpit Tint
    ctx.fillStyle = '#e2e8f0';
    ctx.fillRect(len / 2 - 14, -hgt + 2, 8, 3);

    // Twin Rear Plasma Jets (Hot Pink Flame)
    ctx.fillStyle = '#ff007f';
    ctx.fillRect(-len / 2 - 4, -hgt + 2, 4, 4);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(-len / 2 - 2, -hgt + 3, 2, 2);
  }

  renderFuturePoliceSkimmer(ctx, v, isFacingUp, isNight) {
    // Police Skimmer with alternating red and blue emergency strobe
    const len = 26;
    const hgt = 9;

    ctx.fillStyle = '#f7fafc';
    ctx.fillRect(-len / 2, -hgt, len, hgt);
    ctx.fillStyle = '#1a365d';
    ctx.fillRect(-len / 2, -hgt / 2, len, hgt / 2);

    // Strobe Lightbar
    const strobe = Math.sin(v.bobPhase * 12) > 0;
    ctx.fillStyle = strobe ? '#e53e3e' : '#3182ce';
    ctx.fillRect(-3, -hgt - 3, 3, 3);
    ctx.fillStyle = !strobe ? '#e53e3e' : '#3182ce';
    ctx.fillRect(1, -hgt - 3, 3, 3);
  }

  renderFutureHoverCommuter(ctx, v, isFacingUp, isNight) {
    // Streamlined Pearlescent Hover Pod
    const len = 24;
    const hgt = 9;

    ctx.fillStyle = '#e2e8f0';
    ctx.beginPath();
    ctx.ellipse(0, -hgt / 2, len / 2, hgt / 2, 0, 0, Math.PI * 2);
    ctx.fill();

    // Dark glass ring
    ctx.fillStyle = '#2b6cb0';
    ctx.beginPath();
    ctx.ellipse(2, -hgt / 2, len / 3, hgt / 3, 0, 0, Math.PI * 2);
    ctx.fill();

    // Amber trim
    ctx.fillStyle = '#ed8936';
    ctx.fillRect(-len / 2, -hgt / 2, 4, 2);
  }

  // ------------------ NIGHT LIGHTING PASS ------------------

  drawNightLights(ctx, renderList) {
    ctx.save();
    ctx.globalCompositeOperation = 'screen';

    for (const item of renderList) {
      const { vehicle: v, pos } = item;
      const vec = DIR_VECTORS[v.dir];

      if (v.era === 'modern' && !v.type.includes('pedestrian')) {
        // Vehicle Headlight cone projecting onto road
        const hx = pos.x + vec.dx * 0.45;
        const hy = pos.groundY + vec.dy * 0.45;
        const grad = ctx.createRadialGradient(hx, hy, 2, hx + vec.dx * 0.6, hy + vec.dy * 0.6, 32);
        grad.addColorStop(0, 'rgba(255, 240, 180, 0.45)');
        grad.addColorStop(0.5, 'rgba(255, 230, 140, 0.18)');
        grad.addColorStop(1, 'rgba(255, 200, 100, 0)');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(hx + vec.dx * 0.3, hy + vec.dy * 0.3, 28, 0, Math.PI * 2);
        ctx.fill();

        // Red taillight glow
        const rx = pos.x - vec.dx * 0.4;
        const ry = pos.groundY - vec.dy * 0.4;
        const rGrad = ctx.createRadialGradient(rx, ry, 1, rx, ry, 12);
        rGrad.addColorStop(0, 'rgba(255, 30, 30, 0.6)');
        rGrad.addColorStop(1, 'rgba(255, 0, 0, 0)');
        ctx.fillStyle = rGrad;
        ctx.beginPath();
        ctx.arc(rx, ry, 12, 0, Math.PI * 2);
        ctx.fill();
      } else if (v.era === 'future') {
        // Neon thruster bloom and ground lighting
        const px = pos.x;
        const py = pos.groundY;
        const color = v.type === 'cyber_cruiser' ? 'rgba(255, 0, 128,' : 'rgba(0, 240, 255,';
        const fGrad = ctx.createRadialGradient(px, py, 2, px, py, 24);
        fGrad.addColorStop(0, `${color} 0.35)`);
        fGrad.addColorStop(1, `${color} 0)`);
        ctx.fillStyle = fGrad;
        ctx.beginPath();
        ctx.arc(px, py, 24, 0, Math.PI * 2);
        ctx.fill();
      } else if (v.era === 'joseon' && (v.type === 'ox_cart' || v.type === 'palanquin')) {
        // Warm lantern glow
        const lx = pos.x;
        const ly = pos.y - 4;
        const lGrad = ctx.createRadialGradient(lx, ly, 1, lx, ly, 22);
        lGrad.addColorStop(0, 'rgba(255, 200, 90, 0.55)');
        lGrad.addColorStop(0.5, 'rgba(255, 150, 40, 0.2)');
        lGrad.addColorStop(1, 'rgba(255, 100, 20, 0)');
        ctx.fillStyle = lGrad;
        ctx.beginPath();
        ctx.arc(lx, ly, 22, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    ctx.restore();
  }
}

export const trafficEngine = new TrafficEngine();
