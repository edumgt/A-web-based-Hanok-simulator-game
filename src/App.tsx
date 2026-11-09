import React, { useEffect } from 'react';
import { initIsometricStudio } from './studioEngine.js';
import './styles.css';

const STUDIO_MARKUP = `  <!-- Top utility bar -->
  <header class="top-bar">
    <div class="top-bar-left">
      <span class="top-bar-title" id="app-title-display">서울 타임 빌더</span>
      <span class="top-bar-subtitle" id="app-subtitle-display">16&times;16 studio &bull; 조선 &bull; 현대 &bull; 미래</span>
    </div>

    <div class="top-bar-center">
      <div class="era-selector-wrap" id="era-selector-group" role="tablist" aria-label="시대 선택">
        <button type="button" class="era-tab-btn active" data-era="joseon" id="era-btn-joseon" title="조선시대: 한옥, 기와집, 초가집, 주막, 관아">🏯 조선시대</button>
        <button type="button" class="era-tab-btn" data-era="modern" id="era-btn-modern" title="현재 서울: 고층 아파트 단지, 오피스 빌딩, 롯데월드타워, N서울타워">🏙️ 현재 서울</button>
        <button type="button" class="era-tab-btn" data-era="future" id="era-btn-future" title="미래 서울: 네오 사이버펑크 메가타워, 플라잉카, 바이오스피어">🚀 미래 서울</button>
      </div>
    </div>

    <div class="top-bar-right">
      <button type="button" class="builder-text-btn" id="builder-rotate-btn" title="건축 중인 가옥 90도 회전 (단축키: R)"><span class="rotate-icon">↻</span> 90° 회전 (<span id="top-rotate-label">0°</span>)</button>
      <button type="button" class="builder-text-btn active" id="builder-traffic-toggle" title="살아 움직이는 차량 & 보행자 시뮬레이션 토글 (현재 ON)">🚗 트래픽 ON</button>
      <button type="button" class="builder-text-btn active" id="builder-graphics-toggle" title="그래픽 고도화 모드 (입체 그림자 & 대기 효과 토글)">✨ 그래픽 고도화 (HD)</button>
      <button type="button" class="builder-text-btn" id="builder-lighting-toggle" title="낮/밤 조명 모드 전환">☀️ 낮 (Day)</button>
      <button type="button" class="builder-text-btn active" id="builder-animate-toggle" title="애니메이션 토글">애니메이션</button>
      <button type="button" class="builder-text-btn" id="builder-undo-btn">실행취소</button>
      <div class="zoom-group">
        <button type="button" class="zoom-btn" id="builder-zoom-out" title="축소">&minus;</button>
        <span id="builder-zoom-readout" class="zoom-readout" title="100% 확대율로 초기화">100%</span>
        <button type="button" class="zoom-btn" id="builder-zoom-in" title="확대">&plus;</button>
      </div>
      <button type="button" class="builder-text-btn" id="builder-reset-view-btn">화면 중앙</button>
      <button type="button" class="builder-action-btn primary" id="builder-export-btn">스냅샷 PNG 저장</button>
    </div>
  </header>

  <!-- Left Fixed Control Panel / Sidebar -->
  <aside class="builder-sidebar" id="builder-sidebar">
    <!-- Presets Section -->
    <div class="sidebar-section-presets">
      <div class="sidebar-header">
        <span id="sidebar-presets-title">도시 레이아웃 프리셋</span>
      </div>
      <div class="preset-pill-grid" id="preset-pill-grid">
        <button type="button" class="preset-pill active" data-preset="village">조선 한옥마을</button>
        <button type="button" class="preset-pill" data-preset="gangnam">강남 현대 테헤란로</button>
        <button type="button" class="preset-pill" data-preset="apartments">한강변 대단지 아파트</button>
        <button type="button" class="preset-pill" data-preset="future_city">2099 미래 메가시티</button>
        <button type="button" class="preset-pill" data-preset="riverside">청계천과 한옥계곡</button>
        <button type="button" class="preset-pill" data-preset="market">종로 저잣거리</button>
        <button type="button" class="preset-pill span-2" data-preset="meadow">들판 전체 비우기</button>
      </div>
    </div>

    <!-- Active Brush Card -->
    <div class="sidebar-brush-card" id="sidebar-brush-card">
      <div class="brush-thumb-wrap">
        <img id="sidebar-brush-img" class="brush-thumb pixelated" src="" alt="선택된 가옥" />
      </div>
      <div class="brush-info">
        <div class="brush-title-row">
          <div class="brush-title" id="sidebar-brush-name">초가집 (Chogajip)</div>
          <button type="button" class="brush-rotate-card-btn" id="card-rotate-btn" title="가옥 90도 회전 (단축키: R)">
            <span class="rotate-icon">↻</span> 회전 <span class="brush-rotate-badge" id="brush-rotate-deg">0°</span>
          </button>
        </div>
        <div class="brush-meta" id="sidebar-brush-meta">B01 &bull; 전통 가옥</div>
        <div class="brush-doc" id="sidebar-brush-doc">조선시대 전통 볏짚 지붕과 황토벽, 온돌 굴뚝, 장독대를 갖춘 아늑한 초가집.</div>
      </div>
    </div>

    <!-- Palette Categories -->
    <div class="sidebar-section-categories">
      <div class="sidebar-header">
        <span>건축 & 지형 팔레트</span>
      </div>
      <div class="category-pills-wrap">
        <button type="button" class="builder-text-btn category-pill active" data-tray-cat="all">전체 (256)</button>
        <button type="button" class="builder-text-btn category-pill" data-tray-cat="building" id="cat-pill-building">시대별 건물 & 아파트 (56)</button>
        <button type="button" class="builder-text-btn category-pill" data-tray-cat="road">도로 & 수로 & 하이웨이 (36)</button>
        <button type="button" class="builder-text-btn category-pill" data-tray-cat="decoration">정원 & 가로시설 (12)</button>
        <button type="button" class="builder-text-btn category-pill" data-tray-cat="terrain">지형과 언덕 (44)</button>
        <button type="button" class="builder-text-btn category-pill" data-tray-cat="biome">자연 해안 & 숲 (58)</button>
        <button type="button" class="builder-text-btn category-pill" data-tray-cat="landmark">명소 & 인물 (50)</button>
      </div>
    </div>

    <!-- Tile Palette Grid -->
    <div class="sidebar-tray-grid" id="builder-tray">
      <!-- Populated via JavaScript -->
    </div>

    <!-- Sidebar Footer -->
    <div class="sidebar-footer">
      <div class="sidebar-footer-row">
        <button type="button" class="sidebar-footer-rotate-btn" id="sidebar-footer-rotate-btn" title="건축 중인 가옥 90도 회전 (단축키: R)">
          <span class="rotate-icon">↻</span> 90° 회전 (<span id="footer-rotate-label">0°</span>)
        </button>
        <span class="sidebar-footer-hint">단축키 R &bull; 클릭: 배치 &bull; 휠: 줌</span>
      </div>
    </div>
  </aside>

  <!-- Canvas Container -->
  <div id="canvas-container">
    <canvas id="builder-canvas"></canvas>
  </div>

  <!-- Snapshot Modal Dialog -->
  <div class="snapshot-modal-backdrop" id="snapshot-modal" role="dialog" aria-modal="true" aria-labelledby="snapshot-modal-title">
    <div class="snapshot-modal-card">
      <div class="snapshot-modal-header">
        <div>
          <h2 class="snapshot-modal-title" id="snapshot-modal-title">조선 마을 스냅샷 저장</h2>
          <p class="snapshot-modal-subtitle">2,176 &times; 1,216 픽셀 &bull; 16&times;16 전경 &bull; 1:1 고해상도 픽셀 아트</p>
        </div>
        <button type="button" class="snapshot-modal-close" id="snapshot-modal-close" title="닫기">&times;</button>
      </div>

      <div class="snapshot-modal-body">
        <img id="snapshot-modal-img" class="snapshot-preview-img pixelated" alt="16x16 조선 왕국 스냅샷" />
      </div>

      <div class="snapshot-modal-footer">
        <div style="display: flex; gap: 0.75rem; align-items: center; flex-wrap: wrap;">
          <a id="snapshot-modal-download-link" class="snapshot-action-btn primary" download="joseon-village-16x16.png">PNG 다운로드</a>
          <button type="button" id="snapshot-modal-copy-btn" class="snapshot-action-btn">이미지 복사</button>
          <a id="snapshot-modal-open-link" class="snapshot-action-link" target="_blank" rel="noopener">원본 보기 &rarr;</a>
        </div>
        <button type="button" class="snapshot-action-link" id="snapshot-modal-dismiss-btn">완료</button>
      </div>
    </div>
  </div>
`;

export default function App() {
  useEffect(() => {
    initIsometricStudio();
  }, []);

  return (
    <div
      style={{ width: '100%', height: '100%' }}
      dangerouslySetInnerHTML={{ __html: STUDIO_MARKUP }}
    />
  );
}
