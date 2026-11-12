/**
 * Accurate Modern Korea Map Data & Geometries
 * Includes modern provincial boundaries (17 administrative divisions),
 * KTX / SRT high-speed rail network, expressways, major airports, and city profiles.
 */

export const MODERN_PROVINCES = [
  {
    id: 'seoul_metro',
    name: '서울특별시',
    nameShort: '서울',
    type: 'special_city',
    color: '#e2b474',
    center: { x: 350, y: 395 },
    path: 'M 338,388 C 344,385 356,386 362,392 C 364,398 360,405 352,406 C 344,407 336,400 338,388 Z'
  },
  {
    id: 'gyeonggi',
    name: '경기도',
    nameShort: '경기',
    type: 'province',
    color: '#3b82f6',
    center: { x: 375, y: 430 },
    // Surrounding Seoul, touching Incheon, Gangwon, Chungnam, Chungbuk
    path: `
      M 315,365 
      C 340,350 375,340 405,355 
      C 425,370 435,400 425,435 
      C 415,465 390,475 355,470 
      C 325,465 305,445 310,410 
      C 295,400 290,380 315,365 Z
    `
  },
  {
    id: 'incheon_metro',
    name: '인천광역시',
    nameShort: '인천',
    type: 'metro_city',
    color: '#10b981',
    center: { x: 305, y: 405 },
    path: 'M 295,385 C 315,380 325,395 320,415 C 310,425 290,420 285,405 C 285,395 290,388 295,385 Z'
  },
  {
    id: 'gangwon',
    name: '강원특별자치도',
    nameShort: '강원',
    type: 'special_self_governing_province',
    color: '#8b5cf6',
    center: { x: 465, y: 360 },
    // East coast down from DMZ to Samcheok, border Gyeonggi and Chungbuk
    path: `
      M 405,345 
      C 435,320 460,300 475,325 
      C 490,350 515,390 530,440 
      C 515,465 470,470 435,460 
      C 420,430 415,380 405,345 Z
    `
  },
  {
    id: 'chungnam',
    name: '충청남도 & 대전·세종',
    nameShort: '충남·대전·세종',
    type: 'province',
    color: '#06b6d4',
    center: { x: 335, y: 520 },
    // West coast, Taean peninsula to Geum river
    path: `
      M 310,465 
      C 345,465 375,475 390,505 
      C 400,535 385,570 350,575 
      C 315,580 280,560 270,520 
      C 260,480 285,465 310,465 Z
    `
  },
  {
    id: 'chungbuk',
    name: '충청북도',
    nameShort: '충북',
    type: 'province',
    color: '#f59e0b',
    center: { x: 410, y: 495 },
    // Inland province (Cheongju, Chungju, Danyang)
    path: `
      M 390,460 
      C 425,455 450,470 470,490 
      C 455,530 425,550 400,545 
      C 385,525 380,485 390,460 Z
    `
  },
  {
    id: 'gyeongbuk',
    name: '경상북도 & 대구',
    nameShort: '경북·대구',
    type: 'province',
    color: '#ec4899',
    center: { x: 495, y: 575 },
    // East coast from Uljin, Pohang down, inland Daegu, Andong
    path: `
      M 470,470 
      C 525,450 545,510 565,600 
      C 570,640 535,665 490,660 
      C 455,640 445,580 445,530 
      C 450,495 460,480 470,470 Z
    `
  },
  {
    id: 'gyeongnam',
    name: '경상남도 & 부산·울산',
    nameShort: '경남·부산·울산',
    type: 'province',
    color: '#14b8a6',
    center: { x: 475, y: 705 },
    // South coast, Busan, Ulsan, Changwon, Geoje, Namhae
    path: `
      M 450,650 
      C 500,645 550,650 545,690 
      C 540,735 500,760 450,765 
      C 405,760 400,720 420,680 
      C 435,660 445,655 450,650 Z
    `
  },
  {
    id: 'jeonbuk',
    name: '전북특별자치도',
    nameShort: '전북',
    type: 'special_self_governing_province',
    color: '#6366f1',
    center: { x: 335, y: 620 },
    // Jeonju, Gunsan, Saemangeum, Iksan
    path: `
      M 310,575 
      C 355,570 395,580 415,615 
      C 415,650 375,665 330,660 
      C 290,655 275,620 290,590 
      C 300,580 305,578 310,575 Z
    `
  },
  {
    id: 'jeonnam',
    name: '전라남도 & 광주',
    nameShort: '전남·광주',
    type: 'province',
    color: '#ef4444',
    center: { x: 325, y: 720 },
    // Mokpo, Yeosu, Suncheon, Dadohae archipelago
    path: `
      M 300,655 
      C 340,655 385,650 410,685 
      C 415,730 380,775 330,785 
      C 275,780 245,740 255,700 
      C 265,670 285,660 300,655 Z
    `
  },
  {
    id: 'jeju_province',
    name: '제주특별자치도',
    nameShort: '제주',
    type: 'special_self_governing_province',
    color: '#eab308',
    center: { x: 285, y: 920 },
    path: 'M 235,920 C 235,905 260,895 285,895 C 320,895 340,905 340,920 C 340,935 315,945 285,945 C 255,945 235,935 235,920 Z'
  },
  {
    id: 'north_korea',
    name: '이북 5도 (황해·평안·함경)',
    nameShort: '이북권',
    type: 'northern_territory',
    color: '#475569',
    center: { x: 380, y: 200 },
    // North of DMZ up to Amnok (Yalu) and Tumen rivers
    path: `
      M 180,90
      C 210,95 280,75 360,65
      C 430,55 520,50 620,70
      C 630,90 610,130 580,150
      C 550,170 510,185 480,210
      C 460,230 450,260 460,290
      C 440,310 405,330 360,340
      C 300,345 260,335 235,310
      C 220,280 230,240 240,200
      C 220,165 195,140 180,90 Z
    `
  }
];

export const MODERN_TRANSIT_NETWORK = {
  // KTX / SRT high-speed railway routes
  ktxLines: [
    {
      id: 'gyeongbu_ktx',
      name: '경부고속선 (KTX/SRT)',
      color: '#38bdf8',
      stations: ['서울', '광명', '수원', '천안아산', '오송', '대전', '김천구미', '동대구', '경주', '울산', '부산'],
      path: 'M 350,395 L 345,410 L 355,430 L 365,470 L 380,490 L 390,520 L 440,570 L 475,610 L 535,645 L 545,680 L 525,725'
    },
    {
      id: 'honam_ktx',
      name: '호남고속선 (KTX/SRT)',
      color: '#34d399',
      stations: ['오송', '공주', '익산', '정읍', '광주송정', '나주', '목포'],
      path: 'M 380,490 L 360,525 L 340,590 L 330,640 L 320,695 L 315,730 L 295,765'
    },
    {
      id: 'gangneung_ktx',
      name: '강릉선 KTX',
      color: '#a78bfa',
      stations: ['서울', '청량리', '양평', '만종(원주)', '횡성', '평창', '진부(오대산)', '강릉'],
      path: 'M 350,395 L 375,390 L 405,395 L 430,395 L 450,385 L 470,380 L 485,375 L 495,370'
    },
    {
      id: 'srt_connection',
      name: '수서평택고속선 (SRT)',
      color: '#f472b6',
      stations: ['수서', '동탄', '지제(평택)'],
      path: 'M 360,405 L 365,425 L 365,455 L 365,470'
    }
  ],
  // Major Expressways (경부고속도로, 서해안고속도로, 영동고속도로)
  expressways: [
    {
      id: 'gyeongbu_expressway',
      name: '경부고속도로 (1번)',
      path: 'M 352,398 L 360,430 L 370,480 L 392,525 L 480,615 L 526,720',
      color: 'rgba(226, 180, 116, 0.45)'
    },
    {
      id: 'seohaean_expressway',
      name: '서해안고속도로 (15번)',
      path: 'M 330,420 L 310,470 L 300,540 L 295,620 L 290,750',
      color: 'rgba(226, 180, 116, 0.35)'
    },
    {
      id: 'yeongdong_expressway',
      name: '영동고속도로 (50번)',
      path: 'M 305,420 L 365,430 L 430,410 L 495,372',
      color: 'rgba(226, 180, 116, 0.35)'
    }
  ],
  // Major Airports
  airports: [
    { id: 'icn', name: '인천국제공항 (ICN)', code: 'ICN', x: 295, y: 400, runway: true },
    { id: 'gmp', name: '김포국제공항 (GMP)', code: 'GMP', x: 335, y: 390 },
    { id: 'pus', name: '김해국제공항 (PUS)', code: 'PUS', x: 505, y: 720 },
    { id: 'cju', name: '제주국제공항 (CJU)', code: 'CJU', x: 285, y: 905 }
  ]
};

export const MODERN_CITIES_REGISTRY = {
  seoul: {
    id: 'seoul',
    name: '서울특별시 (Seoul)',
    nameShort: '서울',
    hanja: '首爾特別市 • 漢陽',
    tier: '수도 / 글로벌 메가시티',
    population: '9,385,000명',
    area: '605.2 km²',
    region: 'capital',
    regionName: '수도권',
    status: 'active',
    statusBadge: '🌟 활성화 • 3대 시대 건축 플레이 가능',
    coords: { x: 350, y: 395 },
    icon: '🌟',
    ktx: ['KTX 경부선', 'KTX 호남선', '강릉선 KTX', 'GTX-A/B/C'],
    airports: ['김포공항 (15km)', '인천공항 (52km)'],
    tagline: '대한민국의 심장 • 600년 조선 왕도에서 2099 글로벌 메가시티로',
    desc: '조선 600년 한양도성부터 한강변 대단지 아파트, 강남 테헤란로 빌딩숲, 2099년 UAM 플라잉카와 사이버펑크 메가타워까지! 살아 움직이는 트래픽(버스, 택시, 승용차, 플라잉카)과 보행자, 배산임수(북한산·한강) 산수화 파노라마를 직접 건축하고 체험할 수 있는 메인 메가시티입니다.',
    stats: [
      { label: '건축 가능 타일', value: '256종 (56종 빌딩)' },
      { label: '지원 시대', value: '조선 • 현대 • 2099 미래' },
      { label: '시뮬레이션', value: '실시간 차량 & 주민' }
    ],
    eras: [
      { id: 'joseon', label: '🏯 조선시대', sub: '한옥마을 & 읍성', preset: 'village' },
      { id: 'modern', label: '🏙️ 현재 서울', sub: '강남 테헤란로 & 아파트', preset: 'gangnam' },
      { id: 'future', label: '🚀 2099 미래', sub: '네오 메가시티 & UAM', preset: 'future_city' }
    ],
    presets: [
      { id: 'village', label: '한옥마을', era: 'joseon' },
      { id: 'gangnam', label: '테헤란로', era: 'modern' },
      { id: 'apartments', label: '한강 아파트', era: 'modern' },
      { id: 'future_city', label: '미래 메가시티', era: 'future' }
    ]
  },
  busan: {
    id: 'busan',
    name: '부산광역시 (Busan)',
    nameShort: '부산',
    hanja: '釜山廣域市',
    tier: '대한민국 제2도시 / 해양수도',
    population: '3,290,000명',
    area: '770.2 km²',
    region: 'yeongnam',
    regionName: '영남권',
    status: 'ready',
    statusBadge: '스튜디오 탐방 가능',
    coords: { x: 525, y: 725 },
    icon: '🌊',
    ktx: ['KTX 경부선 종착역', 'SRT 경부선', '동해선 광역전철'],
    airports: ['김해국제공항 (PUS)', '가덕도신공항(예정)'],
    tagline: '동북아 최대 해양 허브 & 해운대 센텀시티 마천루',
    desc: '동래포구 왜관의 역사에서 세계 6대 컨테이너 항만이자 해운대 엘시티, 센텀시티의 초고층 스카이라인을 자랑하는 대한민국의 해양 수도입니다.',
    stats: [
      { label: '주요 명소', value: '해운대 • 광안대교 • 자갈치' },
      { label: '특화 지형', value: '해양 항만 & 해변 마천루' }
    ],
    eras: [
      { id: 'modern', label: '🏙️ 현대 부산', sub: '해안 비즈니스 벨트', preset: 'gangnam' },
      { id: 'joseon', label: '🏯 동래포구', sub: '조선 무역항', preset: 'riverside' }
    ],
    presets: [
      { id: 'gangnam', label: '해안 마천루', era: 'modern' },
      { id: 'riverside', label: '동래포구 수변', era: 'joseon' }
    ]
  },
  incheon: {
    id: 'incheon',
    name: '인천광역시 (Incheon)',
    nameShort: '인천',
    hanja: '仁川廣域市',
    tier: '경제자유구역 / 대한민국 관문',
    population: '3,010,000명',
    area: '1,066.4 km²',
    region: 'capital',
    regionName: '수도권',
    status: 'ready',
    statusBadge: '스튜디오 탐방 가능',
    coords: { x: 305, y: 405 },
    icon: '✈️',
    ktx: ['인천발 KTX(송도)', '공항철도(AREX)'],
    airports: ['인천국제공항 (세계 3대 허브 공항)'],
    tagline: '글로벌 에어로트로폴리스 & 송도 바이오 메가클러스터',
    desc: '영종도 인천국제공항과 송도·청라·영종 경제자유구역(IFEZ), 근대 개항장 차이나타운의 역사가 융합된 국제 관문 스마트시티입니다.',
    stats: [
      { label: '주요 인프라', value: '인천공항(4활주로) • 송도센트럴' },
      { label: '특화 지형', value: '서해 갯벌 & 해상 스마트단지' }
    ],
    eras: [
      { id: 'modern', label: '🏙️ 송도 센트럴', sub: '미래형 워터프런트', preset: 'apartments' },
      { id: 'future', label: '🚀 에어로시티', sub: '2099 글로벌 허브', preset: 'future_city' }
    ],
    presets: [
      { id: 'apartments', label: '송도 마천루', era: 'modern' },
      { id: 'future_city', label: '미래 에어로시티', era: 'future' }
    ]
  },
  daegu: {
    id: 'daegu',
    name: '대구광역시 (Daegu)',
    nameShort: '대구',
    hanja: '大邱廣域市',
    tier: '영남 내륙 중추 메가시티',
    population: '2,360,000명',
    area: '1,499.5 km²',
    region: 'yeongnam',
    regionName: '영남권',
    status: 'ready',
    statusBadge: '스튜디오 탐방 가능',
    coords: { x: 475, y: 615 },
    icon: '⚡',
    ktx: ['KTX/SRT 동대구역 (전국 승하차 2위)', '대구권 광역철도'],
    airports: ['대구국제공항 (TAE)', '대구경북신공항(예정)'],
    tagline: '동대구 초광역 교통 허브 & 첨단 미래 모빌리티 수도',
    desc: '조선시대 경상감영과 서문시장, 사과와 섬유의 도시에서 로봇·모빌리티·의료 산업의 미래 내륙 허브로 도약한 영남권의 중심 도시입니다.',
    stats: [
      { label: '주요 랜드마크', value: '동대구 복합환승센터 • 83타워' },
      { label: '특화 지형', value: '팔공산 & 신천 수변축' }
    ],
    eras: [
      { id: 'modern', label: '🏙️ 현대 대구', sub: '도심 복합 단지', preset: 'gangnam' }
    ],
    presets: [
      { id: 'gangnam', label: '도심 상업지구', era: 'modern' }
    ]
  },
  daejeon: {
    id: 'daejeon',
    name: '대전광역시 (Daejeon)',
    nameShort: '대전',
    hanja: '大田廣域市',
    tier: '대한민국 과학기술 수도',
    population: '1,440,000명',
    area: '539.8 km²',
    region: 'chungcheong',
    regionName: '충청권',
    status: 'ready',
    statusBadge: '스튜디오 탐방 가능',
    coords: { x: 390, y: 520 },
    icon: '🔬',
    ktx: ['KTX/SRT 대전역 • 서대전역', '충청권 광역철도'],
    airports: ['청주국제공항 (연계 35분)'],
    tagline: '대덕연구개발특구 • KAIST & 첨단 R&D 혁신 클러스터',
    desc: '대한민국 과학기술의 두뇌 대덕연구단지와 정부대전청사, 한국철도공사 본사가 위치한 국토 교통망의 핵심 요충지입니다.',
    stats: [
      { label: '연구 클러스터', value: '대덕특구 • KAIST • 한국원자력연' },
      { label: '특화 지형', value: '갑천 수변 & 과학 벨트' }
    ],
    eras: [
      { id: 'future', label: '🚀 사이언스 밸리', sub: '2099 양자 R&D', preset: 'future_city' }
    ],
    presets: [
      { id: 'future_city', label: '연구 메가타운', era: 'future' }
    ]
  },
  gwangju: {
    id: 'gwangju',
    name: '광주광역시 (Gwangju)',
    nameShort: '광주',
    hanja: '光州廣域市',
    tier: '호남권 수부 메가시티',
    population: '1,420,000명',
    area: '501.2 km²',
    region: 'honam',
    regionName: '호남권',
    status: 'ready',
    statusBadge: '스튜디오 탐방 가능',
    coords: { x: 320, y: 695 },
    icon: '💡',
    ktx: ['KTX/SRT 광주송정역', '달빛철도(광주-대구 예정)'],
    airports: ['광주공항 (KWJ)'],
    tagline: '국립아시아문화전당(ACC) & 국가 AI 데이터센터 혁신도시',
    desc: '무등산 국립공원의 서정 아래 아시아 문화 예술 허브와 국가 인공지능(AI) 혁신 거점 단지가 융합된 호남권 대표 거점도시입니다.',
    stats: [
      { label: '핵심 단지', value: '첨단3지구 AI클러스터 • ACC' },
      { label: '특화 지형', value: '무등산 & 영산강' }
    ],
    eras: [
      { id: 'modern', label: '🏙️ 현대 광주', sub: '문화 & 비즈니스', preset: 'gangnam' }
    ],
    presets: [
      { id: 'gangnam', label: '도심 복합가', era: 'modern' }
    ]
  },
  suwon: {
    id: 'suwon',
    name: '수원특례시 (Suwon)',
    nameShort: '수원',
    hanja: '水原特例市 • 華城',
    tier: '경기남부 중추 특례시',
    population: '1,190,000명',
    area: '121.0 km²',
    region: 'capital',
    regionName: '수도권',
    status: 'ready',
    statusBadge: '스튜디오 탐방 가능',
    coords: { x: 355, y: 430 },
    icon: '🏯',
    ktx: ['KTX 수원역', 'GTX-C(예정)', '신분당선'],
    airports: ['김포/인천공항 광역버스 연계'],
    tagline: '정조의 계획도시 수원화성 & 삼성전자 글로벌 R&D 본사',
    desc: '유네스코 세계문화유산 수원화성의 웅장한 팔달문과 방화수류정 누각, 그리고 글로벌 반도체 혁신을 이끄는 삼성 디지털시티가 공존하는 역사·첨단 복합도시입니다.',
    stats: [
      { label: '세계유산', value: '수원화성 (성곽 둘레 5.7km)' },
      { label: '첨단 산업', value: '삼성전자 디지털시티 본사' }
    ],
    eras: [
      { id: 'joseon', label: '🏯 정조의 화성', sub: '성곽과 한옥계곡', preset: 'riverside' }
    ],
    presets: [
      { id: 'riverside', label: '화성 성곽계곡', era: 'joseon' }
    ]
  },
  sejong: {
    id: 'sejong',
    name: '세종특별자치시 (Sejong)',
    nameShort: '세종',
    hanja: '世宗特別自治市',
    tier: '대한민국 행정수도',
    population: '390,000명',
    area: '465.2 km²',
    region: 'chungcheong',
    regionName: '충청권',
    status: 'ready',
    statusBadge: '스튜디오 탐방 가능',
    coords: { x: 375, y: 505 },
    icon: '🏛️',
    ktx: ['KTX 오송역(인접)', '충청권 광역급행철도(CTX)'],
    airports: ['청주국제공항 (25분)'],
    tagline: '국가균형발전의 상징 • 대한민국 행정중심복합도시',
    desc: '기네스북에 등재된 세계 최장 옥상정원을 갖춘 정부세종청사와 금강 보행교(이응다리), 세종호수공원이 펼쳐지는 대한민국 친환경 녹색 행정수도입니다.',
    stats: [
      { label: '핵심 기관', value: '정부세종청사 • 국회세종의사당(예정)' },
      { label: '녹지 비율', value: '도시 면적 50% 이상 녹지' }
    ],
    eras: [
      { id: 'future', label: '🚀 미래 행정타운', sub: '녹색 수변도시', preset: 'future_city' }
    ],
    presets: [
      { id: 'future_city', label: '스마트 행정도시', era: 'future' }
    ]
  },
  gyeongju: {
    id: 'gyeongju',
    name: '경주시 (Gyeongju)',
    nameShort: '경주',
    hanja: '慶州市 • 金城',
    tier: '천년 신라 왕도 & 세계유산도시',
    population: '250,000명',
    area: '1,324.8 km²',
    region: 'yeongnam',
    regionName: '영남권',
    status: 'ready',
    statusBadge: '스튜디오 탐방 가능',
    coords: { x: 535, y: 645 },
    icon: '🏛️',
    ktx: ['KTX 신경주역'],
    airports: ['울산/포항공항 연계'],
    tagline: '신라 천년의 서라벌 • 도시 전체가 거대한 노천 박물관',
    desc: '동양 최고의 천문대 첨성대와 대릉원 천마총 고분군, 불국사와 석굴암, 월정교 야경이 빛나는 대한민국 역사문화관광의 영원한 수도입니다.',
    stats: [
      { label: '문화유산', value: '유네스코 세계유산 4개 영역' },
      { label: '역사', value: '기원전 57년~서기 935년 (992년간 왕도)' }
    ],
    eras: [
      { id: 'joseon', label: '🏯 고도 서라벌', sub: '신라 왕경 한옥', preset: 'village' }
    ],
    presets: [
      { id: 'village', label: '천년 한옥마을', era: 'joseon' }
    ]
  },
  jeonju: {
    id: 'jeonju',
    name: '전주시 (Jeonju)',
    nameShort: '전주',
    hanja: '全州市 • 完山',
    tier: '전통문화 & 유네스코 음식창의도시',
    population: '645,000명',
    area: '206.1 km²',
    region: 'honam',
    regionName: '호남권',
    status: 'ready',
    statusBadge: '스튜디오 탐방 가능',
    coords: { x: 350, y: 625 },
    icon: '🏮',
    ktx: ['전라선 KTX 전주역 (한옥형 역사)'],
    airports: ['군산공항 연계'],
    tagline: '700채 기와지붕이 물결치는 대한민국 대표 전주한옥마을',
    desc: '조선 태조 이성계의 어진을 모신 경기전과 전동성당, 700여 채 전통 한옥이 원형 그대로 보존된 한옥마을에서 한국의 맛과 멋을 오롯이 누릴 수 있습니다.',
    stats: [
      { label: '한옥 규모', value: '국내 최대 도심형 한옥군 (700여 채)' },
      { label: '지정', value: '유네스코 음식창의도시' }
    ],
    eras: [
      { id: 'joseon', label: '🏯 전주 한옥', sub: '전통 저잣거리', preset: 'market' }
    ],
    presets: [
      { id: 'market', label: '풍남문 저잣거리', era: 'joseon' }
    ]
  },
  gangneung: {
    id: 'gangneung',
    name: '강릉시 (Gangneung)',
    nameShort: '강릉',
    hanja: '江陵市',
    tier: '관동팔경 수부 & 동해안 철도 거점',
    population: '210,000명',
    area: '1,040.8 km²',
    region: 'gangwon',
    regionName: '강원권',
    status: 'ready',
    statusBadge: '스튜디오 탐방 가능',
    coords: { x: 495, y: 370 },
    icon: '🌲',
    ktx: ['강릉선 KTX 종착역', '동해선 KTX(예정)'],
    airports: ['양양국제공항 (40분)'],
    tagline: '신사임당과 율곡의 오죽헌 • 경포호와 커피거리',
    desc: '검은 대나무 숲이 감싼 오죽헌과 선교장, 경포호 호반 누각, 동해안 해송 숲과 안목 커피거리가 어우러진 동해안 대표 문화관광도시입니다.',
    stats: [
      { label: '명소', value: '오죽헌 • 경포호 • 안목커피거리' },
      { label: '교통', value: '서울-강릉 KTX 1시간 40분 주파' }
    ],
    eras: [
      { id: 'joseon', label: '🏯 관동 호반', sub: '경포 솔숲마을', preset: 'riverside' }
    ],
    presets: [
      { id: 'riverside', label: '호반 솔숲정원', era: 'joseon' }
    ]
  },
  jeju: {
    id: 'jeju',
    name: '제주특별자치도 (Jeju)',
    nameShort: '제주',
    hanja: '濟州特別自治道',
    tier: '세계자연유산 & 국제자유도시',
    population: '675,000명',
    area: '1,850.3 km²',
    region: 'jeju',
    regionName: '제주권',
    status: 'ready',
    statusBadge: '스튜디오 탐방 가능',
    coords: { x: 285, y: 920 },
    icon: '🌴',
    ktx: ['목포/완도 쾌속선 연계'],
    airports: ['제주국제공항 (CJU - 세계 최다 운항 노선)'],
    tagline: '유네스코 3관왕 • 에메랄드 바다와 한라산의 영험한 섬',
    desc: '검은 현무암 돌담길과 삼다도 억새풀, 한라산 백록담과 성산일출봉, 만장굴 등 천혜의 자연이 빚어낸 대한민국 최고의 세계자연유산 휴양도시입니다.',
    stats: [
      { label: '유네스코', value: '생물권보전지역 • 세계자연유산 • 세계지질공원' },
      { label: '최고봉', value: '한라산 (1,947m - 남한 최고봉)' }
    ],
    eras: [
      { id: 'joseon', label: '🏯 탐라 섬마을', sub: '들판과 초막', preset: 'meadow' }
    ],
    presets: [
      { id: 'meadow', label: '제주 들판건축', era: 'joseon' }
    ]
  },
  pyongyang: {
    id: 'pyongyang',
    name: '평양직할시 (Pyongyang)',
    nameShort: '평양',
    hanja: '平壤直轄市',
    tier: '고구려 천년 도읍 & 이북 거점',
    population: '3,000,000명 (추정)',
    area: '1,100.0 km²',
    region: 'north',
    regionName: '이북권',
    status: 'ready',
    statusBadge: '스튜디오 탐방 가능',
    coords: { x: 280, y: 220 },
    icon: '🏔️',
    ktx: ['경의선 고속철도(구상안)'],
    airports: ['순안국제공항'],
    tagline: '대동강변 을밀대와 고구려 안학궁의 대륙 기상',
    desc: '고구려 장수왕 평양 천도의 웅장한 역사와 대동강 부벽루, 모란봉 을밀대, 대동문 등 유구한 한반도 북부의 천년 역사가 서린 고도입니다.',
    stats: [
      { label: '역사 유적', value: '고구려 고분군 • 안학궁터 • 대동문' },
      { label: '수계', value: '대동강 & 보통강' }
    ],
    eras: [
      { id: 'joseon', label: '🏯 대동강변', sub: '강변 고도', preset: 'village' }
    ],
    presets: [
      { id: 'village', label: '대동강 마을', era: 'joseon' }
    ]
  }
};
