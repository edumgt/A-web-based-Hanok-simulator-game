/**
 * Multilingual localization dictionary for the Modern Korea GIS Map Intro Screen.
 * Supports Korean (ko), English (en), Chinese Simplified (zh), Japanese (ja), and Spanish (es).
 */

export const MAP_LANGUAGES = [
  { code: 'ko', label: '한국어', short: 'KR', flag: '🇰🇷' },
  { code: 'en', label: 'English', short: 'EN', flag: '🇺🇸' },
  { code: 'zh', label: '中文', short: 'ZH', flag: '🇨🇳' },
  { code: 'ja', label: '日本語', short: 'JA', flag: '🇯🇵' },
  { code: 'es', label: 'Español', short: 'ES', flag: '🇪🇸' }
];

export const MAP_UI_TRANSLATIONS = {
  ko: {
    mainTitle: '대한민국 현대 전도 • 팔도 타임 빌더',
    subTitle: '17개 광역지자체 • KTX 고속철도망 • 조선 600년 한양부터 2099 네오 서울 메가시티까지',
    filters: {
      all: '전국 (All)',
      capital: '수도권 (서울/경기/인천)',
      chungcheong: '충청·세종 (대전/세종)',
      yeongnam: '영남권 (부산/대구/울산/경주)',
      honam: '호남권 (광주/전주)',
      gangwon: '강원권 (강릉/원주)',
      jeju: '제주권',
      north: '이북권 (평양)'
    },
    toggles: {
      ktx: '🚆 KTX 망',
      roads: '🛣️ 고속도로'
    },
    directEnterBtn: '서울 스튜디오 입장 →',
    svg: {
      westSeaTitle: '西 海',
      westSeaSub: '황해 • 서해 영해 (Yellow Sea)',
      eastSeaTitle: '東 海',
      eastSeaSub: '대한민국 동해 (East Sea)',
      southSeaTitle: '南 海',
      southSeaSub: '대한해협 • 남해 (South Sea)',
      dmzLabel: 'DMZ 휴전선 (MDL)',
      hallasan: '한라산 1,947m',
      cjuAirport: '✈️ CJU 제주국제공항',
      ulleungdo: '울릉도',
      dokdoTitle: '독도 🇰🇷 DOKDO',
      icnAirport: 'ICN 인천공항',
      parallel38: '38°00\'N (38선)',
      seoulPlayTag: '3대 시대 플레이'
    },
    legend: {
      capital: '수도/활성화',
      ktx: 'KTX 고속철도',
      highway: '고속도로',
      metro: '광역시/거점',
      dmz: 'DMZ 휴전선'
    },
    dossier: {
      populationLabel: '인구',
      transitTitle: '고속철도 및 모빌리티 연계',
      erasTitle: '선택 가능한 시대 & 테마',
      presetsTitle: '추천 16×16 레이아웃 프리셋으로 바로 시작',
      launchSuffix: '16×16 스튜디오 입장하기'
    }
  },
  en: {
    mainTitle: 'Modern Korea GIS Atlas • Paldo Time Builder',
    subTitle: '17 Provinces & Metros • KTX High-Speed Rail • From Joseon Hanyang to 2099 Neo Seoul',
    filters: {
      all: 'Nationwide',
      capital: 'Capital Area',
      chungcheong: 'Chungcheong & Sejong',
      yeongnam: 'Yeongnam',
      honam: 'Honam',
      gangwon: 'Gangwon',
      jeju: 'Jeju',
      north: 'Northern (Pyongyang)'
    },
    toggles: {
      ktx: '🚆 KTX Rail',
      roads: '🛣️ Expressways'
    },
    directEnterBtn: 'Enter Seoul Studio →',
    svg: {
      westSeaTitle: 'WEST SEA',
      westSeaSub: 'West Sea (Yellow Sea)',
      eastSeaTitle: 'EAST SEA',
      eastSeaSub: 'East Sea of Korea',
      southSeaTitle: 'SOUTH SEA',
      southSeaSub: 'Korea Strait • South Sea',
      dmzLabel: 'DMZ / MDL',
      hallasan: 'Mt. Hallasan 1,947m',
      cjuAirport: '✈️ CJU Jeju Int\'l',
      ulleungdo: 'Ulleungdo',
      dokdoTitle: 'Dokdo 🇰🇷 DOKDO',
      icnAirport: 'ICN Incheon Int\'l',
      parallel38: '38°00\'N (38th Parallel)',
      seoulPlayTag: '3 Eras Playable'
    },
    legend: {
      capital: 'Capital / Active',
      ktx: 'KTX High-Speed Rail',
      highway: 'Expressway',
      metro: 'Metro / Hub',
      dmz: 'DMZ Line'
    },
    dossier: {
      populationLabel: 'Pop.',
      transitTitle: 'High-Speed Rail & Aviation Connectivity',
      erasTitle: 'Available Eras & Themes',
      presetsTitle: 'Quick-Start 16×16 Layout Presets',
      launchSuffix: 'Enter 16×16 Studio'
    }
  },
  zh: {
    mainTitle: '大韩民国现代全图 • 八道时空建造者',
    subTitle: '17个广域行政区 • KTX高速铁路网 • 从朝鲜汉阳到2099未来首尔巨型都市',
    filters: {
      all: '全国 (All)',
      capital: '首都圈 (首尔/仁川/水原)',
      chungcheong: '忠清·世宗',
      yeongnam: '岭南圈 (釜山/大邱/庆州)',
      honam: '湖南圈 (光州/全州)',
      gangwon: '江原圈 (江陵)',
      jeju: '济州圈',
      north: '北部圈 (平壤)'
    },
    toggles: {
      ktx: '🚆 KTX高铁网',
      roads: '🛣️ 高速公路'
    },
    directEnterBtn: '进入首尔工作室 →',
    svg: {
      westSeaTitle: '西 海',
      westSeaSub: '黄海 • 西海领海',
      eastSeaTitle: '东 海',
      eastSeaSub: '韩国东海 (East Sea)',
      southSeaTitle: '南 海',
      southSeaSub: '大韩海峡 • 南海',
      dmzLabel: 'DMZ 军事分界线',
      hallasan: '汉拿山 1,947m',
      cjuAirport: '✈️ CJU 济州国际机场',
      ulleungdo: '郁陵岛',
      dokdoTitle: '独岛 🇰🇷 DOKDO',
      icnAirport: 'ICN 仁川机场',
      parallel38: '38°00\'N (三八线)',
      seoulPlayTag: '三时代可玩'
    },
    legend: {
      capital: '首都 / 已激活',
      ktx: 'KTX 高速铁路',
      highway: '高速公路',
      metro: '广域市 / 枢纽',
      dmz: 'DMZ 停战线'
    },
    dossier: {
      populationLabel: '人口',
      transitTitle: '高速铁路与交通枢纽',
      erasTitle: '可选时代与城市主题',
      presetsTitle: '选择 16×16 推荐布局快速开始',
      launchSuffix: '进入 16×16 建造工作室'
    }
  },
  ja: {
    mainTitle: '大韓民国 現代全図 • 八道タイムビルダー',
    subTitle: '17広域自治体 • KTX高速鉄道網 • 朝鮮600年の漢陽から2099ネオソウルまで',
    filters: {
      all: '全国 (All)',
      capital: '首都圏 (ソウル/仁川/水原)',
      chungcheong: '忠清・世宗',
      yeongnam: '嶺南圏 (釜山/大邱/慶州)',
      honam: '湖南圏 (光州/全州)',
      gangwon: '江原圏 (江陵)',
      jeju: '済州圏',
      north: '北朝鮮圏 (平壌)'
    },
    toggles: {
      ktx: '🚆 KTX 鉄道網',
      roads: '🛣️ 高速道路'
    },
    directEnterBtn: 'ソウルスタジオへ →',
    svg: {
      westSeaTitle: '西 海',
      westSeaSub: '黄海・西海領海',
      eastSeaTitle: '東 海',
      eastSeaSub: '韓国東海 (East Sea)',
      southSeaTitle: '南 海',
      southSeaSub: '大韓海峡・南海',
      dmzLabel: 'DMZ 休戦ライン',
      hallasan: '漢拏山 1,947m',
      cjuAirport: '✈️ CJU 済州国際空港',
      ulleungdo: '鬱陵島',
      dokdoTitle: '独島 🇰🇷 DOKDO',
      icnAirport: 'ICN 仁川空港',
      parallel38: '38°00\'N (38度線)',
      seoulPlayTag: '3時代プレイ可'
    },
    legend: {
      capital: '首都 / 有効化',
      ktx: 'KTX 高速鉄道',
      highway: '高速道路',
      metro: '広域市 / 拠点',
      dmz: 'DMZ 軍事境界線'
    },
    dossier: {
      populationLabel: '人口',
      transitTitle: '高速鉄道・空港アクセス',
      erasTitle: '選択可能な時代とテーマ',
      presetsTitle: 'おすすめ 16×16 プリセットですぐ開始',
      launchSuffix: '16×16 スタジオに入場'
    }
  },
  es: {
    mainTitle: 'Atlas Moderno de Corea • Constructor Temporal',
    subTitle: '17 Provincias • Red KTX de Alta Velocidad • De la Hanyang Joseon a Neo Seúl 2099',
    filters: {
      all: 'Todo el País',
      capital: 'Área Capital',
      chungcheong: 'Chungcheong y Sejong',
      yeongnam: 'Yeongnam',
      honam: 'Honam',
      gangwon: 'Gangwon',
      jeju: 'Jeju',
      north: 'Norte (Pionyang)'
    },
    toggles: {
      ktx: '🚆 Red KTX',
      roads: '🛣️ Autopistas'
    },
    directEnterBtn: 'Ir al Estudio de Seúl →',
    svg: {
      westSeaTitle: 'MAR OESTE',
      westSeaSub: 'Mar Occidental (Mar Amarillo)',
      eastSeaTitle: 'MAR ESTE',
      eastSeaSub: 'Mar del Este de Corea',
      southSeaTitle: 'MAR SUR',
      southSeaSub: 'Estrecho de Corea • Mar del Sur',
      dmzLabel: 'Línea DMZ / MDL',
      hallasan: 'Monte Hallasan 1,947m',
      cjuAirport: '✈️ CJU Aeropuerto de Jeju',
      ulleungdo: 'Ulleungdo',
      dokdoTitle: 'Dokdo 🇰🇷 DOKDO',
      icnAirport: 'ICN Incheon Int.',
      parallel38: '38°00\'N (Paralelo 38)',
      seoulPlayTag: '3 Eras Jugables'
    },
    legend: {
      capital: 'Capital / Activa',
      ktx: 'Tren KTX',
      highway: 'Autopista',
      metro: 'Metrópoli / Centro',
      dmz: 'Línea DMZ'
    },
    dossier: {
      populationLabel: 'Pob.',
      transitTitle: 'Tren de Alta Velocidad y Aviación',
      erasTitle: 'Eras y Temas Disponibles',
      presetsTitle: 'Iniciar con Diseños 16×16 Recomendados',
      launchSuffix: 'Entrar al Estudio 16×16'
    }
  }
};

export const CITY_LOCALIZATIONS = {
  seoul: {
    ko: { pinLabel: '🌟 서울특별시' },
    en: {
      pinLabel: '🌟 Seoul',
      name: 'Seoul Special City',
      nameShort: 'Seoul',
      tier: 'Capital / Global Megacity',
      population: '9,385,000',
      regionName: 'Capital Area',
      statusBadge: '🌟 Active • All 3 Eras Playable',
      ktx: ['Gyeongbu KTX', 'Honam KTX', 'Gangneung KTX', 'GTX-A/B/C'],
      airports: ['Gimpo Int\'l (15km)', 'Incheon Int\'l (52km)'],
      tagline: 'Heart of Korea • From 600-year Joseon Royal Capital to 2099 Neo Megacity',
      desc: 'Build and experience Seoul across three distinct eras: traditional Joseon Hanok villages and city walls, modern Gangnam Teheran-ro skyscrapers and Han River apartment complexes, and 2099 cyberpunk megatowers with UAM flying vehicles and live traffic simulation.',
      stats: [
        { label: 'Buildable Tiles', value: '256 (56 Buildings)' },
        { label: 'Supported Eras', value: 'Joseon • Modern • 2099' },
        { label: 'Simulation', value: 'Live Vehicles & Citizens' }
      ],
      eras: [
        { id: 'joseon', label: '🏯 Joseon Era', sub: 'Hanok Village & Walls', preset: 'village' },
        { id: 'modern', label: '🏙️ Modern Seoul', sub: 'Gangnam & Apartments', preset: 'gangnam' },
        { id: 'future', label: '🚀 2099 Future', sub: 'Neo Megacity & UAM', preset: 'future_city' }
      ],
      presets: [
        { id: 'village', label: 'Hanok Village', era: 'joseon' },
        { id: 'gangnam', label: 'Teheran-ro', era: 'modern' },
        { id: 'apartments', label: 'Han River Apts', era: 'modern' },
        { id: 'future_city', label: 'Future Megacity', era: 'future' }
      ]
    },
    zh: {
      pinLabel: '🌟 首尔特别市',
      name: '首尔特别市 (Seoul)',
      nameShort: '首尔',
      tier: '首都 / 全球超级都市',
      population: '9,385,000人',
      regionName: '首都圈',
      statusBadge: '🌟 已激活 • 三大时代完整可玩',
      ktx: ['KTX 京釜线', 'KTX 湖南线', '江陵线 KTX', 'GTX-A/B/C'],
      airports: ['金浦国际机场 (15km)', '仁川国际机场 (52km)'],
      tagline: '大韩民国心脏 • 从朝鲜600年汉阳王都到2099全球赛博都市',
      desc: '横跨三大时代的旗舰都市！涵盖朝鲜汉阳都城与韩屋村、现代汉江畔大型公寓区与江南德黑兰路摩天大楼，以及2099年空中飞行汽车与赛博朋克巨型塔楼，支持实时车辆与行人模拟。',
      stats: [
        { label: '可建图块', value: '256种 (56种建筑)' },
        { label: '支持时代', value: '朝鲜 • 现代 • 2099未来' },
        { label: '模拟系统', value: '实时交通与市民' }
      ],
      eras: [
        { id: 'joseon', label: '🏯 朝鲜时代', sub: '韩屋村与城郭', preset: 'village' },
        { id: 'modern', label: '🏙️ 现代首尔', sub: '江南德黑兰路与公寓', preset: 'gangnam' },
        { id: 'future', label: '🚀 2099未来', sub: '新未来巨型都市', preset: 'future_city' }
      ],
      presets: [
        { id: 'village', label: '韩屋村', era: 'joseon' },
        { id: 'gangnam', label: '德黑兰路', era: 'modern' },
        { id: 'apartments', label: '汉江公寓区', era: 'modern' },
        { id: 'future_city', label: '未来巨型都市', era: 'future' }
      ]
    },
    ja: {
      pinLabel: '🌟 ソウル特別市',
      name: 'ソウル特別市 (Seoul)',
      nameShort: 'ソウル',
      tier: '首都 / グローバル・メガシティ',
      population: '9,385,000人',
      regionName: '首都圏',
      statusBadge: '🌟 有効化 • 3大時代プレイ可能',
      ktx: ['KTX 京釜線', 'KTX 湖南線', '江陵線 KTX', 'GTX-A/B/C'],
      airports: ['金浦国際空港 (15km)', '仁川国際空港 (52km)'],
      tagline: '韓国の心臓部 • 朝鮮600年の王都から2099年ネオメガシティへ',
      desc: '朝鮮時代の漢陽都城・韓屋村から、現代の漢江沿いの高層アパート団地や江南テヘラン路のビル群、2099年の空飛ぶUAMとサイバーパンク・メガタワーまで体験できるメイン都市です。',
      stats: [
        { label: '建築タイル', value: '256種 (56種建物)' },
        { label: '対応時代', value: '朝鮮 • 現代 • 2099未来' },
        { label: 'シミュレーション', value: 'リアルタイム交通・住民' }
      ],
      eras: [
        { id: 'joseon', label: '🏯 朝鮮時代', sub: '韓屋村と城郭', preset: 'village' },
        { id: 'modern', label: '🏙️ 現代ソウル', sub: '江南テヘラン路・団地', preset: 'gangnam' },
        { id: 'future', label: '🚀 2099未来', sub: 'ネオ・メガシティ', preset: 'future_city' }
      ],
      presets: [
        { id: 'village', label: '韓屋村', era: 'joseon' },
        { id: 'gangnam', label: 'テヘラン路', era: 'modern' },
        { id: 'apartments', label: '漢江アパート', era: 'modern' },
        { id: 'future_city', label: '未来メガシティ', era: 'future' }
      ]
    },
    es: {
      pinLabel: '🌟 Seúl',
      name: 'Ciudad Especial de Seúl',
      nameShort: 'Seúl',
      tier: 'Capital / Megaciudad Global',
      population: '9,385,000 hab.',
      regionName: 'Área Capital',
      statusBadge: '🌟 Activa • 3 Eras Jugables',
      ktx: ['KTX Gyeongbu', 'KTX Honam', 'KTX Gangneung', 'GTX-A/B/C'],
      airports: ['Aerop. Gimpo (15km)', 'Aerop. Incheon (52km)'],
      tagline: 'Corazón de Corea • De la capital real Joseon a la megaciudad 2099',
      desc: 'Construye y explora Seúl a través de tres eras: aldeas tradicionales Hanok de Joseon, rascacielos de Gangnam y complejos junto al río Han, y megatorres futuristas de 2099 con autos voladores UAM y tráfico en vivo.',
      stats: [
        { label: 'Bloques', value: '256 (56 edificios)' },
        { label: 'Eras', value: 'Joseon • Moderna • 2099' },
        { label: 'Simulación', value: 'Tráfico y ciudadanos en vivo' }
      ],
      eras: [
        { id: 'joseon', label: '🏯 Era Joseon', sub: 'Aldea Hanok y Murallas', preset: 'village' },
        { id: 'modern', label: '🏙️ Seúl Moderno', sub: 'Gangnam y Rascacielos', preset: 'gangnam' },
        { id: 'future', label: '🚀 Futuro 2099', sub: 'Neomegaciudad y UAM', preset: 'future_city' }
      ],
      presets: [
        { id: 'village', label: 'Aldea Hanok', era: 'joseon' },
        { id: 'gangnam', label: 'Teheran-ro', era: 'modern' },
        { id: 'apartments', label: 'Torres del Río Han', era: 'modern' },
        { id: 'future_city', label: 'Megaciudad Futura', era: 'future' }
      ]
    }
  },
  busan: {
    ko: { pinLabel: '🌊 부산광역시' },
    en: {
      pinLabel: '🌊 Busan',
      name: 'Busan Metropolitan City',
      nameShort: 'Busan',
      tier: '2nd Largest City / Maritime Capital',
      population: '3,290,000',
      regionName: 'Yeongnam',
      statusBadge: 'Studio Ready',
      ktx: ['KTX Gyeongbu Terminus', 'SRT Gyeongbu', 'Donghae Line'],
      airports: ['Gimhae Int\'l (PUS)', 'Gadeokdo New Airport (Planned)'],
      tagline: 'Northeast Asia\'s Premier Maritime Hub & Haeundae Centum Skyline',
      desc: 'From the historic Dongnaepo trading port to one of the world\'s busiest container harbors, featuring Haeundae coastal skyscrapers and Gwangan Bridge.',
      stats: [
        { label: 'Landmarks', value: 'Haeundae • Gwangan Bridge • Jagalchi' },
        { label: 'Terrain', value: 'Ocean Port & Coastal Towers' }
      ],
      eras: [
        { id: 'modern', label: '🏙️ Modern Busan', sub: 'Coastal Business Belt', preset: 'gangnam' },
        { id: 'joseon', label: '🏯 Dongnae Port', sub: 'Joseon Trade Harbor', preset: 'riverside' }
      ],
      presets: [
        { id: 'gangnam', label: 'Coastal Skyline', era: 'modern' },
        { id: 'riverside', label: 'Dongnae Waterfront', era: 'joseon' }
      ]
    },
    zh: {
      pinLabel: '🌊 釜山广域市',
      name: '釜山广域市 (Busan)',
      nameShort: '釜山',
      tier: '韩国第二大城市 / 海洋首都',
      population: '3,290,000人',
      regionName: '岭南圈',
      statusBadge: '可进入工作室探索',
      ktx: ['KTX 京釜线终点站', 'SRT 京釜线', '东海线广域电铁'],
      airports: ['金海国际机场 (PUS)', '加德岛新机场(规划中)'],
      tagline: '东北亚最大海洋枢纽与海云台世纪城天际线',
      desc: '从朝鲜东莱浦口贸易港蜕变为世界第六大集装箱港口，兼具海云台摩天楼群与广安大桥海景的海洋大都市。',
      stats: [
        { label: '知名地标', value: '海云台 • 广安大桥 • 札嘎其' },
        { label: '特色地形', value: '海港与海滨摩天楼' }
      ],
      eras: [
        { id: 'modern', label: '🏙️ 现代釜山', sub: '海滨商务区', preset: 'gangnam' },
        { id: 'joseon', label: '🏯 东莱浦口', sub: '朝鲜贸易港', preset: 'riverside' }
      ],
      presets: [
        { id: 'gangnam', label: '海滨天际线', era: 'modern' },
        { id: 'riverside', label: '东莱水岸', era: 'joseon' }
      ]
    },
    ja: {
      pinLabel: '🌊 釜山広域市',
      name: '釜山広域市 (Busan)',
      nameShort: '釜山',
      tier: '韓国第2の都市 / 海洋首都',
      population: '3,290,000人',
      regionName: '嶺南圏',
      statusBadge: 'スタジオ探索可能',
      ktx: ['KTX 京釜線 終着駅', 'SRT 京釜線', '東海線広域電鉄'],
      airports: ['金海国際空港 (PUS)', '加徳島新空港(予定)'],
      tagline: '北東アジア最大の海洋ハブ・海雲台センタムシティの摩天楼',
      desc: '朝鮮時代の東萊浦口から世界有数のコンテナ港湾都市へ発展。海雲台の超高層ビル群と広安大橋が織りなす海洋首都です。',
      stats: [
        { label: '名所', value: '海雲台 • 広安大橋 • チャガルチ' },
        { label: '特化地形', value: '海洋港湾・海辺の高層街' }
      ],
      eras: [
        { id: 'modern', label: '🏙️ 現代釜山', sub: '海岸ビジネスベルト', preset: 'gangnam' },
        { id: 'joseon', label: '🏯 東萊浦口', sub: '朝鮮貿易港', preset: 'riverside' }
      ],
      presets: [
        { id: 'gangnam', label: '海辺の摩天楼', era: 'modern' },
        { id: 'riverside', label: '東萊水辺', era: 'joseon' }
      ]
    },
    es: {
      pinLabel: '🌊 Busán',
      name: 'Ciudad Metropolitana de Busán',
      nameShort: 'Busán',
      tier: '2.ª Ciudad de Corea / Capital Marítima',
      population: '3,290,000 hab.',
      regionName: 'Yeongnam',
      statusBadge: 'Estudio Disponible',
      ktx: ['Terminal KTX Gyeongbu', 'SRT Gyeongbu', 'Línea Donghae'],
      airports: ['Aerop. Gimhae (PUS)'],
      tagline: 'Gran Puerto Marítimo del Noreste Asiático y Rascacielos de Haeundae',
      desc: 'De puerto comercial histórico de Dongnae a uno de los puertos de contenedores más grandes del mundo, con la playa de Haeundae y el puente Gwangan.',
      stats: [
        { label: 'Hitos', value: 'Haeundae • Puente Gwangan • Jagalchi' },
        { label: 'Terreno', value: 'Puerto Marítimo y Costa' }
      ],
      eras: [
        { id: 'modern', label: '🏙️ Busán Moderno', sub: 'Distrito Costero', preset: 'gangnam' },
        { id: 'joseon', label: '🏯 Puerto Dongnae', sub: 'Puerto Comercial Joseon', preset: 'riverside' }
      ],
      presets: [
        { id: 'gangnam', label: 'Horizonte Costero', era: 'modern' },
        { id: 'riverside', label: 'Ribera de Dongnae', era: 'joseon' }
      ]
    }
  },
  incheon: {
    ko: { pinLabel: '✈️ 인천광역시' },
    en: {
      pinLabel: '✈️ Incheon',
      name: 'Incheon Metropolitan City',
      nameShort: 'Incheon',
      tier: 'Free Economic Zone / Korea Gateway',
      population: '3,010,000',
      regionName: 'Capital Area',
      statusBadge: 'Studio Ready',
      ktx: ['Incheon KTX (Songdo)', 'Airport Express (AREX)'],
      airports: ['Incheon Int\'l Airport (ICN)'],
      tagline: 'Global Aerotropolis & Songdo Bio-Smart Megacluster',
      desc: 'Integrating Incheon International Airport on Yeongjongdo, the Songdo Smart City waterfront towers, and the historic Jemulpo open port.',
      stats: [
        { label: 'Infrastructure', value: 'ICN Airport (4 Runways) • Songdo' },
        { label: 'Terrain', value: 'Yellow Sea Tidal Flats & Smart Bay' }
      ],
      eras: [
        { id: 'modern', label: '🏙️ Songdo Central', sub: 'Smart Waterfront', preset: 'apartments' },
        { id: 'future', label: '🚀 Aerocity 2099', sub: 'Global Hub', preset: 'future_city' }
      ],
      presets: [
        { id: 'apartments', label: 'Songdo Towers', era: 'modern' },
        { id: 'future_city', label: 'Future Aerocity', era: 'future' }
      ]
    },
    zh: {
      pinLabel: '✈️ 仁川广域市',
      name: '仁川广域市 (Incheon)',
      nameShort: '仁川',
      tier: '经济自由区 / 韩国国际门户',
      population: '3,010,000人',
      regionName: '首都圈',
      statusBadge: '可进入工作室探索',
      ktx: ['仁川KTX(松岛)', '机场快线(AREX)'],
      airports: ['仁川国际机场 (全球枢纽)'],
      tagline: '全球航空大都会与松岛生物智能都市群',
      desc: '融合永宗岛仁川国际机场、松岛中央公园水上摩天大楼群与近代济物浦开港历史区的国际化智能门户城市。',
      stats: [
        { label: '核心设施', value: '仁川机场(4跑道) • 松岛中央公园' },
        { label: '特色地形', value: '西海海岸线与海上新城' }
      ],
      eras: [
        { id: 'modern', label: '🏙️ 松岛中央城', sub: '未来滨水区', preset: 'apartments' },
        { id: 'future', label: '🚀 2099航空城', sub: '全球枢纽', preset: 'future_city' }
      ],
      presets: [
        { id: 'apartments', label: '松岛摩天楼', era: 'modern' },
        { id: 'future_city', label: '未来航空都市', era: 'future' }
      ]
    },
    ja: {
      pinLabel: '✈️ 仁川広域市',
      name: '仁川広域市 (Incheon)',
      nameShort: '仁川',
      tier: '経済自由区域 / 韓国の玄関口',
      population: '3,010,000人',
      regionName: '首都圏',
      statusBadge: 'スタジオ探索可能',
      ktx: ['仁川発KTX (松島)', '空港鉄道 (AREX)'],
      airports: ['仁川国際空港 (世界有数のハブ)'],
      tagline: 'グローバル・エアロトロポリス＆松島スマートシティ',
      desc: '永宗島の仁川国際空港、松島セントラルパークの未来型ウォーターフロント、近代済物浦開港場の歴史が調和する国際都市です。',
      stats: [
        { label: 'インフラ', value: '仁川空港(4滑走路) • 松島セントラル' },
        { label: '特化地形', value: '西海沿岸・スマートベイ' }
      ],
      eras: [
        { id: 'modern', label: '🏙️ 松島セントラル', sub: 'ウォーターフロント', preset: 'apartments' },
        { id: 'future', label: '🚀 未来エアロシティ', sub: '2099年ハブ都市', preset: 'future_city' }
      ],
      presets: [
        { id: 'apartments', label: '松島摩天楼', era: 'modern' },
        { id: 'future_city', label: '未来エアロシティ', era: 'future' }
      ]
    },
    es: {
      pinLabel: '✈️ Incheon',
      name: 'Ciudad Metropolitana de Incheon',
      nameShort: 'Incheon',
      tier: 'Zona Económica Libre / Puerta de Corea',
      population: '3,010,000 hab.',
      regionName: 'Área Capital',
      statusBadge: 'Estudio Disponible',
      ktx: ['KTX Incheon (Songdo)', 'Tren AREX'],
      airports: ['Aeropuerto Int. de Incheon (ICN)'],
      tagline: 'Aerotrópolis Global y Ciudad Inteligente de Songdo',
      desc: 'Conecta el Aeropuerto Internacional de Incheon en Yeongjongdo, los rascacielos inteligentes de Songdo y el puerto histórico de Jemulpo.',
      stats: [
        { label: 'Infraestructura', value: 'Aeropuerto ICN • Songdo Central' },
        { label: 'Terreno', value: 'Costa Oeste y Bahía Inteligente' }
      ],
      eras: [
        { id: 'modern', label: '🏙️ Songdo Central', sub: 'Frente Marítimo', preset: 'apartments' },
        { id: 'future', label: '🚀 Aerociudad 2099', sub: 'Centro Global', preset: 'future_city' }
      ],
      presets: [
        { id: 'apartments', label: 'Torres Songdo', era: 'modern' },
        { id: 'future_city', label: 'Aerociudad Futura', era: 'future' }
      ]
    }
  },
  daegu: {
    ko: { pinLabel: '⚡ 대구광역시' },
    en: {
      pinLabel: '⚡ Daegu',
      name: 'Daegu Metropolitan City',
      nameShort: 'Daegu',
      tier: 'Yeongnam Inland Hub Megacity',
      population: '2,360,000',
      regionName: 'Yeongnam',
      statusBadge: 'Studio Ready',
      ktx: ['KTX/SRT Dongdaegu Station', 'Daegyeong Metro Rail'],
      airports: ['Daegu Int\'l Airport (TAE)'],
      tagline: 'Dongdaegu High-Speed Rail Nexus & Future Mobility Capital',
      desc: 'Evolving from a historic Joseon provincial capital and textile powerhouse into an inland hub for robotics, healthcare, and future mobility.',
      stats: [
        { label: 'Landmarks', value: 'Dongdaegu Hub • 83 Tower' },
        { label: 'Terrain', value: 'Mt. Palgongsan & Sincheon' }
      ],
      eras: [{ id: 'modern', label: '🏙️ Modern Daegu', sub: 'Urban Commercial Hub', preset: 'gangnam' }],
      presets: [{ id: 'gangnam', label: 'Downtown Commercial', era: 'modern' }]
    },
    zh: {
      pinLabel: '⚡ 大邱广域市',
      name: '大邱广域市 (Daegu)',
      nameShort: '大邱',
      tier: '岭南内陆核心大都市',
      population: '2,360,000人',
      regionName: '岭南圈',
      statusBadge: '可进入工作室探索',
      ktx: ['KTX/SRT 东大邱站', '大邱圈广域铁路'],
      airports: ['大邱国际机场 (TAE)'],
      tagline: '东大邱综合交通枢纽与未来机器人移动之都',
      desc: '从朝鲜庆尚监营与西门市场发展为机器人、医疗与未来出行产业的内陆中心大都市。',
      stats: [
        { label: '地标建筑', value: '东大邱换乘中心 • 83塔' },
        { label: '特色地形', value: '八公山与新川水岸' }
      ],
      eras: [{ id: 'modern', label: '🏙️ 现代大邱', sub: '都市复合中心', preset: 'gangnam' }],
      presets: [{ id: 'gangnam', label: '市中心商业区', era: 'modern' }]
    },
    ja: {
      pinLabel: '⚡ 大邱広域市',
      name: '大邱広域市 (Daegu)',
      nameShort: '大邱',
      tier: '嶺南内陸の中枢メガシティ',
      population: '2,360,000人',
      regionName: '嶺南圏',
      statusBadge: 'スタジオ探索可能',
      ktx: ['KTX/SRT 東大邱駅', '大邱圏広域鉄道'],
      airports: ['大邱国際空港 (TAE)'],
      tagline: '東大邱交通ハブ＆先端モビリティ・ロボット都市',
      desc: '朝鮮時代の慶尚監営や西門市場の伝統から、ロボット・医療・未来モビリティ産業の中心地へと躍進した嶺南内陸の中核都市です。',
      stats: [
        { label: 'ランドマーク', value: '東大邱複合ターミナル • 83タワー' },
        { label: '地形', value: '八公山・新川水辺軸' }
      ],
      eras: [{ id: 'modern', label: '🏙️ 現代大邱', sub: '都心複合エリア', preset: 'gangnam' }],
      presets: [{ id: 'gangnam', label: '都心商業地区', era: 'modern' }]
    },
    es: {
      pinLabel: '⚡ Daegu',
      name: 'Ciudad Metropolitana de Daegu',
      nameShort: 'Daegu',
      tier: 'Centro Interior de Yeongnam',
      population: '2,360,000 hab.',
      regionName: 'Yeongnam',
      statusBadge: 'Estudio Disponible',
      ktx: ['Estación Dongdaegu KTX/SRT'],
      airports: ['Aeropuerto Int. de Daegu (TAE)'],
      tagline: 'Nudo Ferroviario de Dongdaegu y Capital de Movilidad Futura',
      desc: 'De histórica sede provincial Joseon a centro interior líder en robótica, biotecnología y movilidad eléctrica.',
      stats: [
        { label: 'Hitos', value: 'Centro Dongdaegu • Torre 83' },
        { label: 'Terreno', value: 'Monte Palgongsan y Río Sincheon' }
      ],
      eras: [{ id: 'modern', label: '🏙️ Daegu Moderno', sub: 'Centro Comercial', preset: 'gangnam' }],
      presets: [{ id: 'gangnam', label: 'Distrito Urbano', era: 'modern' }]
    }
  },
  daejeon: {
    ko: { pinLabel: '🔬 대전광역시' },
    en: {
      pinLabel: '🔬 Daejeon',
      name: 'Daejeon Metropolitan City',
      nameShort: 'Daejeon',
      tier: 'Science & Technology Capital',
      population: '1,440,000',
      regionName: 'Chungcheong',
      statusBadge: 'Studio Ready',
      ktx: ['KTX/SRT Daejeon & Seodaejeon', 'Chungcheong Metro Rail'],
      airports: ['Cheongju Int\'l (35m link)'],
      tagline: 'Daedeok Innopolis • KAIST & Korea\'s Premier R&D Cluster',
      desc: 'Home to KAIST, Daedeok Science Town, and KORAIL headquarters at the central railway crossroads of South Korea.',
      stats: [
        { label: 'R&D Cluster', value: 'Daedeok Innopolis • KAIST' },
        { label: 'Terrain', value: 'Gapcheon Stream & Tech Belt' }
      ],
      eras: [{ id: 'future', label: '🚀 Science Valley', sub: '2099 Quantum R&D', preset: 'future_city' }],
      presets: [{ id: 'future_city', label: 'Research Megatown', era: 'future' }]
    },
    zh: {
      pinLabel: '🔬 大田广域市',
      name: '大田广域市 (Daejeon)',
      nameShort: '大田',
      tier: '韩国科学技术之都',
      population: '1,440,000人',
      regionName: '忠清圈',
      statusBadge: '可进入工作室探索',
      ktx: ['KTX/SRT 大田站 • 西大田站', '忠清圈广域铁路'],
      airports: ['清州国际机场 (35分钟直达)'],
      tagline: '大德研发特区 • KAIST与尖端科技研发创新集群',
      desc: '汇聚韩国科学技术院(KAIST)、大德研究园及韩国铁道公社总部的国土交通要冲与科技大脑。',
      stats: [
        { label: '科研集群', value: '大德特区 • KAIST' },
        { label: '特色地形', value: '甲川水岸与科学带' }
      ],
      eras: [{ id: 'future', label: '🚀 科学谷', sub: '2099 量子研发都市', preset: 'future_city' }],
      presets: [{ id: 'future_city', label: '科研巨型城', era: 'future' }]
    },
    ja: {
      pinLabel: '🔬 大田広域市',
      name: '大田広域市 (Daejeon)',
      nameShort: '大田',
      tier: '韓国 科学技術の首都',
      population: '1,440,000人',
      regionName: '忠清圏',
      statusBadge: 'スタジオ探索可能',
      ktx: ['KTX/SRT 大田駅 • 西大田駅', '忠清圏広域鉄道'],
      airports: ['清州国際空港 (連絡35分)'],
      tagline: '大徳研究開発特区 • KAIST＆先端R&Dイノベーション拠点',
      desc: 'KAISTや大徳研究団地、韓国鉄道公社本社が集積する、韓国科学技術の中枢および国土交通の十字路です。',
      stats: [
        { label: '研究拠点', value: '大徳特区 • KAIST' },
        { label: '地形', value: '甲川水辺・サイエンスベルト' }
      ],
      eras: [{ id: 'future', label: '🚀 サイエンスバレー', sub: '2099 量子R&D', preset: 'future_city' }],
      presets: [{ id: 'future_city', label: '研究メガタウン', era: 'future' }]
    },
    es: {
      pinLabel: '🔬 Daejeon',
      name: 'Ciudad Metropolitana de Daejeon',
      nameShort: 'Daejeon',
      tier: 'Capital de Ciencia y Tecnología',
      population: '1,440,000 hab.',
      regionName: 'Chungcheong',
      statusBadge: 'Estudio Disponible',
      ktx: ['Estación Daejeon KTX/SRT'],
      airports: ['Aerop. Cheongju (35 min)'],
      tagline: 'Daedeok Innopolis • KAIST y Clúster Científico Nacional',
      desc: 'Sede de KAIST, el parque científico Daedeok y la red central ferroviaria de Corea del Sur.',
      stats: [
        { label: 'Clúster I+D', value: 'Daedeok • KAIST' },
        { label: 'Terreno', value: 'Río Gapcheon y Cinturón Tech' }
      ],
      eras: [{ id: 'future', label: '🚀 Valle Científico', sub: 'I+D Cuántico 2099', preset: 'future_city' }],
      presets: [{ id: 'future_city', label: 'Ciudad de Investigación', era: 'future' }]
    }
  },
  gwangju: {
    ko: { pinLabel: '💡 광주광역시' },
    en: {
      pinLabel: '💡 Gwangju',
      name: 'Gwangju Metropolitan City',
      nameShort: 'Gwangju',
      tier: 'Honam Capital / AI & Culture Hub',
      population: '1,420,000',
      regionName: 'Honam',
      statusBadge: 'Studio Ready',
      ktx: ['KTX/SRT Gwangju-Songjeong'],
      airports: ['Gwangju Airport (KWJ)'],
      tagline: 'Asia Culture Center (ACC) & National AI Data Center Hub',
      desc: 'Set beneath scenic Mt. Mudeungsan, blending Asia\'s cultural arts hub with Korea\'s national artificial intelligence innovation district.',
      stats: [
        { label: 'Districts', value: 'National AI Cluster • ACC' },
        { label: 'Terrain', value: 'Mt. Mudeungsan & Yeongsan River' }
      ],
      eras: [{ id: 'modern', label: '🏙️ Modern Gwangju', sub: 'Culture & Business', preset: 'gangnam' }],
      presets: [{ id: 'gangnam', label: 'Downtown Complex', era: 'modern' }]
    },
    zh: {
      pinLabel: '💡 光州广域市',
      name: '光州广域市 (Gwangju)',
      nameShort: '光州',
      tier: '湖南圈首府 / AI与文化都市',
      population: '1,420,000人',
      regionName: '湖南圈',
      statusBadge: '可进入工作室探索',
      ktx: ['KTX/SRT 光州松汀站'],
      airports: ['光州机场 (KWJ)'],
      tagline: '国立亚洲文化殿堂(ACC)与国家人工智能数据中心',
      desc: '依托无等山国立公园风光，融合亚洲文化艺术中心与国家人工智能(AI)产业集群的湖南圈代表城市。',
      stats: [
        { label: '核心园区', value: '国家AI集群 • ACC文化殿堂' },
        { label: '特色地形', value: '无等山与荣山江' }
      ],
      eras: [{ id: 'modern', label: '🏙️ 现代光州', sub: '文化与商务区', preset: 'gangnam' }],
      presets: [{ id: 'gangnam', label: '都市复合街区', era: 'modern' }]
    },
    ja: {
      pinLabel: '💡 光州広域市',
      name: '光州広域市 (Gwangju)',
      nameShort: '光州',
      tier: '湖南圏の中核都市 / AI・文化',
      population: '1,420,000人',
      regionName: '湖南圏',
      statusBadge: 'スタジオ探索可能',
      ktx: ['KTX/SRT 光州松汀駅'],
      airports: ['光州空港 (KWJ)'],
      tagline: '国立アジア文化殿堂(ACC)＆国家AIデータセンター革新都市',
      desc: '無等山国立公園のもと、アジア文化芸術の拠点と国家AIイノベーション産業団地が融合した湖南圏の中心都市です。',
      stats: [
        { label: '中核拠点', value: 'AIクラスター • ACC' },
        { label: '地形', value: '無等山・栄山江' }
      ],
      eras: [{ id: 'modern', label: '🏙️ 現代光州', sub: '文化・ビジネス街', preset: 'gangnam' }],
      presets: [{ id: 'gangnam', label: '都心複合街', era: 'modern' }]
    },
    es: {
      pinLabel: '💡 Gwangju',
      name: 'Ciudad Metropolitana de Gwangju',
      nameShort: 'Gwangju',
      tier: 'Capital de Honam / Cultura e IA',
      population: '1,420,000 hab.',
      regionName: 'Honam',
      statusBadge: 'Estudio Disponible',
      ktx: ['Estación Gwangju-Songjeong KTX/SRT'],
      airports: ['Aeropuerto de Gwangju (KWJ)'],
      tagline: 'Centro Cultural de Asia (ACC) y Distrito Nacional de IA',
      desc: 'Al pie del monte Mudeungsan, combina la creación artística asiática con el centro nacional de datos de Inteligencia Artificial.',
      stats: [
        { label: 'Distritos', value: 'Clúster IA • ACC' },
        { label: 'Terreno', value: 'Monte Mudeungsan y Río Yeongsan' }
      ],
      eras: [{ id: 'modern', label: '🏙️ Gwangju Moderno', sub: 'Cultura y Negocios', preset: 'gangnam' }],
      presets: [{ id: 'gangnam', label: 'Centro Urbano', era: 'modern' }]
    }
  },
  suwon: {
    ko: { pinLabel: '🏯 수원특례시' },
    en: {
      pinLabel: '🏯 Suwon',
      name: 'Suwon Special City',
      nameShort: 'Suwon',
      tier: 'Gyeonggi Provincial Capital',
      population: '1,190,000',
      regionName: 'Capital Area',
      statusBadge: 'Studio Ready',
      ktx: ['KTX Suwon Station', 'GTX-C (Planned)'],
      airports: ['Gimpo/ICN Express Bus'],
      tagline: 'UNESCO Hwaseong Fortress & Global Semiconductor R&D Campus',
      desc: 'King Jeongjo\'s Silhak-inspired 18th-century planned fortress city alongside Samsung Digital City\'s semiconductor innovation headquarters.',
      stats: [
        { label: 'Heritage', value: 'Hwaseong Fortress (UNESCO)' },
        { label: 'Industry', value: 'Samsung Digital City HQ' }
      ],
      eras: [{ id: 'joseon', label: '🏯 Jeongjo\'s Hwaseong', sub: 'Fortress & Valley', preset: 'riverside' }],
      presets: [{ id: 'riverside', label: 'Fortress Valley', era: 'joseon' }]
    },
    zh: {
      pinLabel: '🏯 水原特例市',
      name: '水原特例市 (Suwon)',
      nameShort: '水原',
      tier: '京畿南部中枢特例市',
      population: '1,190,000人',
      regionName: '首都圈',
      statusBadge: '可进入工作室探索',
      ktx: ['KTX 水原站', 'GTX-C(规划)'],
      airports: ['金浦/仁川机场大巴直达'],
      tagline: '正祖规划都市水原华城与三星电子全球研发总部',
      desc: '联合国教科文组织世界遗产水原华城雄伟的城郭楼阁与引领全球半导体创新的三星数字城并存的历史科技名城。',
      stats: [
        { label: '世界遗产', value: '水原华城 (城墙全长5.7km)' },
        { label: '尖端产业', value: '三星电子数字城总部' }
      ],
      eras: [{ id: 'joseon', label: '🏯 正祖华城', sub: '城郭与韩屋溪谷', preset: 'riverside' }],
      presets: [{ id: 'riverside', label: '华城城郭溪谷', era: 'joseon' }]
    },
    ja: {
      pinLabel: '🏯 水原特例市',
      name: '水原特例市 (Suwon)',
      nameShort: '水原',
      tier: '京畿道庁所在地・特例市',
      population: '1,190,000人',
      regionName: '首都圏',
      statusBadge: 'スタジオ探索可能',
      ktx: ['KTX 水原駅', 'GTX-C (予定)'],
      airports: ['金浦・仁川空港リムジン'],
      tagline: '正祖の計画都市「水原華城」＆グローバル半導体拠点',
      desc: 'ユネスコ世界遺産・水原華城の壮麗な城郭や訪花随柳亭と、サムスンデジタルシティ本社が共存する歴史と先端の都市です。',
      stats: [
        { label: '世界遺産', value: '水原華城 (城郭全長5.7km)' },
        { label: '先端産業', value: 'サムスンデジタルシティ本社' }
      ],
      eras: [{ id: 'joseon', label: '🏯 正祖の華城', sub: '城郭と韓屋渓谷', preset: 'riverside' }],
      presets: [{ id: 'riverside', label: '華城 城郭渓谷', era: 'joseon' }]
    },
    es: {
      pinLabel: '🏯 Suwon',
      name: 'Ciudad Especial de Suwon',
      nameShort: 'Suwon',
      tier: 'Capital Provincial de Gyeonggi',
      population: '1,190,000 hab.',
      regionName: 'Área Capital',
      statusBadge: 'Estudio Disponible',
      ktx: ['Estación KTX Suwon'],
      airports: ['Conexión Gimpo/ICN'],
      tagline: 'Fortaleza Hwaseong (UNESCO) y Sede Global de Semiconductores',
      desc: 'Ciudad planificada del siglo XVIII por el rey Jeongjo junto con el centro mundial de innovación tecnológica Samsung Digital City.',
      stats: [
        { label: 'Patrimonio', value: 'Fortaleza Hwaseong (UNESCO)' },
        { label: 'Industria', value: 'Samsung Digital City HQ' }
      ],
      eras: [{ id: 'joseon', label: '🏯 Hwaseong Joseon', sub: 'Fortaleza y Valle', preset: 'riverside' }],
      presets: [{ id: 'riverside', label: 'Valle de la Fortaleza', era: 'joseon' }]
    }
  },
  sejong: {
    ko: { pinLabel: '🏛️ 세종특별자치시' },
    en: {
      pinLabel: '🏛️ Sejong',
      name: 'Sejong Special Self-Governing City',
      nameShort: 'Sejong',
      tier: 'Administrative Capital of Korea',
      population: '390,000',
      regionName: 'Chungcheong',
      statusBadge: 'Studio Ready',
      ktx: ['KTX Osong Station (Adjacent)'],
      airports: ['Cheongju Int\'l (25 min)'],
      tagline: 'De-facto Administrative Capital • Eco-Friendly Smart Government City',
      desc: 'Featuring the Government Complex with the world\'s longest rooftop garden, Geumgang Ieung Bridge, and over 50% green open parkland.',
      stats: [
        { label: 'Institutions', value: 'Gov. Complex • National Assembly Branch' },
        { label: 'Green Ratio', value: '50%+ Urban Green Parks' }
      ],
      eras: [{ id: 'future', label: '🚀 Smart Capital', sub: 'Green Waterfront', preset: 'future_city' }],
      presets: [{ id: 'future_city', label: 'Smart Admin City', era: 'future' }]
    },
    zh: {
      pinLabel: '🏛️ 世宗特别自治市',
      name: '世宗特别自治市 (Sejong)',
      nameShort: '世宗',
      tier: '大韩民国行政首都',
      population: '390,000人',
      regionName: '忠清圈',
      statusBadge: '可进入工作室探索',
      ktx: ['KTX 五松站(相邻)', '忠清圈广域快铁(CTX)'],
      airports: ['清州国际机场 (25分钟)'],
      tagline: '国家均衡发展象征 • 大韩民国行政中心复合城市',
      desc: '拥有吉尼斯世界纪录最长屋顶花园的政府世宗厅舍、锦江步行桥与世宗湖水公园，绿地率超过50%的生态行政首都。',
      stats: [
        { label: '核心机构', value: '政府世宗厅舍 • 国会世宗议事堂' },
        { label: '绿化率', value: '城市面积50%以上绿地' }
      ],
      eras: [{ id: 'future', label: '🚀 未来行政城', sub: '绿色滨水都市', preset: 'future_city' }],
      presets: [{ id: 'future_city', label: '智能行政都市', era: 'future' }]
    },
    ja: {
      pinLabel: '🏛️ 世宗特別自治市',
      name: '世宗特別自治市 (Sejong)',
      nameShort: '世宗',
      tier: '大韓民国 行政首都',
      population: '390,000人',
      regionName: '忠清圏',
      statusBadge: 'スタジオ探索可能',
      ktx: ['KTX 五松駅 (隣接)', '忠清圏広域急行(CTX)'],
      airports: ['清州国際空港 (25分)'],
      tagline: '国家均衡発展の象徴 • 緑豊かなスマート行政首都',
      desc: '世界最長の屋上庭園を持つ政府世宗庁舎や錦江イウン橋、世宗湖水公園が広がる、緑地率50%超のエコ行政都市です。',
      stats: [
        { label: '中核機関', value: '政府世宗庁舎 • 国会分院' },
        { label: '緑地率', value: '都市面積50%以上の緑地' }
      ],
      eras: [{ id: 'future', label: '🚀 未来行政タウン', sub: '緑の水辺都市', preset: 'future_city' }],
      presets: [{ id: 'future_city', label: 'スマート行政都市', era: 'future' }]
    },
    es: {
      pinLabel: '🏛️ Sejong',
      name: 'Ciudad Autónoma Especial de Sejong',
      nameShort: 'Sejong',
      tier: 'Capital Administrativa de Corea',
      population: '390,000 hab.',
      regionName: 'Chungcheong',
      statusBadge: 'Estudio Disponible',
      ktx: ['Estación KTX Osong'],
      airports: ['Aerop. Cheongju (25 min)'],
      tagline: 'Capital Administrativa Sostenible • Más de 50% de Áreas Verdes',
      desc: 'Alberga el Complejo Gubernamental con el jardín en azotea más largo del mundo, el puente circular sobre el río Geum y grandes lagos.',
      stats: [
        { label: 'Instituciones', value: 'Complejo Gubernamental de Sejong' },
        { label: 'Áreas Verdes', value: '+50% Parques y Naturaleza' }
      ],
      eras: [{ id: 'future', label: '🚀 Capital Inteligente', sub: 'Ciudad Verde', preset: 'future_city' }],
      presets: [{ id: 'future_city', label: 'Ciudad Administrativa', era: 'future' }]
    }
  },
  gyeongju: {
    ko: { pinLabel: '🏛️ 경주시' },
    en: {
      pinLabel: '🏛️ Gyeongju',
      name: 'Gyeongju City',
      nameShort: 'Gyeongju',
      tier: 'Millennium Silla Capital / UNESCO City',
      population: '250,000',
      regionName: 'Yeongnam',
      statusBadge: 'Studio Ready',
      ktx: ['KTX Gyeongju Station'],
      airports: ['Ulsan / Pohang Airports'],
      tagline: 'Seorabeol of Silla • Open-Air Museum of 1,000 Years',
      desc: 'Ancient royal capital of the Silla Dynasty for 992 years, home to Cheomseongdae Observatory, Daereungwon Royal Tombs, and Bulguksa Temple.',
      stats: [
        { label: 'Heritage', value: '4 UNESCO World Heritage Zones' },
        { label: 'History', value: '57 BC – 935 AD (992 Years)' }
      ],
      eras: [{ id: 'joseon', label: '🏯 Ancient Seorabeol', sub: 'Royal Hanok Village', preset: 'village' }],
      presets: [{ id: 'village', label: 'Millennium Hanok', era: 'joseon' }]
    },
    zh: {
      pinLabel: '🏛️ 庆州市',
      name: '庆州市 (Gyeongju)',
      nameShort: '庆州',
      tier: '千年新罗王都 / 世界遗产都市',
      population: '250,000人',
      regionName: '岭南圈',
      statusBadge: '可进入工作室探索',
      ktx: ['KTX 庆州站'],
      airports: ['蔚山/浦项机场联动'],
      tagline: '新罗千年徐罗伐 • 整座城市都是露天历史博物馆',
      desc: '汇聚东方最古老天文台瞻星台、大陵苑天马冢古墓群、佛国寺与石窟庵、月精桥夜景的韩国历史文化圣地。',
      stats: [
        { label: '文化遗产', value: '4项联合国教科文组织世界遗产' },
        { label: '古都历史', value: '公元前57年~935年 (992年王都)' }
      ],
      eras: [{ id: 'joseon', label: '🏯 古都徐罗伐', sub: '新罗王京韩屋村', preset: 'village' }],
      presets: [{ id: 'village', label: '千年韩屋村', era: 'joseon' }]
    },
    ja: {
      pinLabel: '🏛️ 慶州市',
      name: '慶州市 (Gyeongju)',
      nameShort: '慶州',
      tier: '千年新羅の王都 / 世界遺産都市',
      population: '250,000人',
      regionName: '嶺南圏',
      statusBadge: 'スタジオ探索可能',
      ktx: ['KTX 慶州駅'],
      airports: ['蔚山・浦項空港連携'],
      tagline: '新羅千年の都・徐羅伐 • 街全体が巨大な屋根のない博物館',
      desc: '東洋最古の天文台・瞻星台や大陵苑古墳群、仏国寺・石窟庵、月精橋の夜景が輝く韓国歴史文化の象徴的古都です。',
      stats: [
        { label: '文化遺産', value: 'ユネスコ世界遺産 4エリア' },
        { label: '歴史', value: '紀元前57年〜935年 (992年間の王都)' }
      ],
      eras: [{ id: 'joseon', label: '🏯 古都 徐羅伐', sub: '王京の韓屋村', preset: 'village' }],
      presets: [{ id: 'village', label: '千年韓屋村', era: 'joseon' }]
    },
    es: {
      pinLabel: '🏛️ Gyeongju',
      name: 'Ciudad de Gyeongju',
      nameShort: 'Gyeongju',
      tier: 'Capital Milenaria de Silla (UNESCO)',
      population: '250,000 hab.',
      regionName: 'Yeongnam',
      statusBadge: 'Estudio Disponible',
      ktx: ['Estación KTX Gyeongju'],
      airports: ['Aeropuertos Ulsan / Pohang'],
      tagline: 'Antigua Seorabeol • Un Museo al Aire Libre de Mil Años',
      desc: 'Capital del Reino de Silla durante casi un milenio, famosa por el observatorio Cheomseongdae, las tumbas reales de Daereungwon y el templo Bulguksa.',
      stats: [
        { label: 'Patrimonio', value: '4 Zonas UNESCO' },
        { label: 'Historia', value: '57 a.C. – 935 d.C. (992 años)' }
      ],
      eras: [{ id: 'joseon', label: '🏯 Antigua Seorabeol', sub: 'Aldea Real Hanok', preset: 'village' }],
      presets: [{ id: 'village', label: 'Aldea Milenaria', era: 'joseon' }]
    }
  },
  jeonju: {
    ko: { pinLabel: '🏮 전주시' },
    en: {
      pinLabel: '🏮 Jeonju',
      name: 'Jeonju City',
      nameShort: 'Jeonju',
      tier: 'Traditional Hanok & UNESCO Gastronomy City',
      population: '645,000',
      regionName: 'Honam',
      statusBadge: 'Studio Ready',
      ktx: ['Jeolla Line KTX Jeonju Station'],
      airports: ['Gunsan Airport Link'],
      tagline: '700 Preserved Hanok Rooftops & Cradle of Joseon Culture',
      desc: 'Home to Gyeonggijeon Shrine, Pungnammun Gate, and Korea\'s largest urban cluster of 700 traditional Hanok homes and lively street markets.',
      stats: [
        { label: 'Hanok Scale', value: '700+ Urban Traditional Hanoks' },
        { label: 'UNESCO', value: 'Creative City of Gastronomy' }
      ],
      eras: [{ id: 'joseon', label: '🏯 Joseon Jeonju', sub: 'Traditional Market', preset: 'market' }],
      presets: [{ id: 'market', label: 'Pungnammun Market', era: 'joseon' }]
    },
    zh: {
      pinLabel: '🏮 全州市',
      name: '全州市 (Jeonju)',
      nameShort: '全州',
      tier: '传统文化 & 联合国教科文美食之都',
      population: '645,000人',
      regionName: '湖南圈',
      statusBadge: '可进入工作室探索',
      ktx: ['全罗线 KTX 全州站 (韩屋车站)'],
      airports: ['群山机场联动'],
      tagline: '700余座青瓦飞檐交织的代表性全州韩屋村',
      desc: '保留了供奉朝鲜太祖御真的庆基殿、殿洞圣堂以及700余座原生态传统韩屋，充满韩国传统风味与市井活力。',
      stats: [
        { label: '韩屋规模', value: '韩国最大市区韩屋群 (700余座)' },
        { label: '荣誉称号', value: 'UNESCO 美食创意都市' }
      ],
      eras: [{ id: 'joseon', label: '🏯 全州韩屋村', sub: '丰南门传统集市', preset: 'market' }],
      presets: [{ id: 'market', label: '丰南门集市', era: 'joseon' }]
    },
    ja: {
      pinLabel: '🏮 全州市',
      name: '全州市 (Jeonju)',
      nameShort: '全州',
      tier: '伝統韓屋＆ユネスコ食文化創造都市',
      population: '645,000人',
      regionName: '湖南圏',
      statusBadge: 'スタジオ探索可能',
      ktx: ['全羅線 KTX 全州駅 (韓屋駅舎)'],
      airports: ['群山空港連携'],
      tagline: '700棟の瓦屋根が波打つ韓国代表・全州韓屋村',
      desc: '朝鮮太祖を祀る慶基殿や豊南門、700軒以上の伝統韓屋が保存され、韓国の伝統美と豊かな食文化が息づく街です。',
      stats: [
        { label: '韓屋規模', value: '国内最大の都市型韓屋群 (700余棟)' },
        { label: '指定', value: 'ユネスコ食文化創造都市' }
      ],
      eras: [{ id: 'joseon', label: '🏯 全州韓屋村', sub: '豊南門の市場通り', preset: 'market' }],
      presets: [{ id: 'market', label: '豊南門市場通り', era: 'joseon' }]
    },
    es: {
      pinLabel: '🏮 Jeonju',
      name: 'Ciudad de Jeonju',
      nameShort: 'Jeonju',
      tier: 'Ciudad Hanok y Gastronomía UNESCO',
      population: '645,000 hab.',
      regionName: 'Honam',
      statusBadge: 'Estudio Disponible',
      ktx: ['Estación KTX Jeonju (Línea Jeolla)'],
      airports: ['Enlace Aerop. Gunsan'],
      tagline: '700 Tejados Tradicionales Hanok y Capital Gastronómica',
      desc: 'Sede del santuario Gyeonggijeon, la puerta Pungnammun y el mayor conjunto urbano de casas tradicionales Hanok conservadas en Corea.',
      stats: [
        { label: 'Escala Hanok', value: '+700 Casas Tradicionales' },
        { label: 'UNESCO', value: 'Ciudad Creativa de Gastronomía' }
      ],
      eras: [{ id: 'joseon', label: '🏯 Jeonju Joseon', sub: 'Mercado Tradicional', preset: 'market' }],
      presets: [{ id: 'market', label: 'Mercado Pungnammun', era: 'joseon' }]
    }
  },
  gangneung: {
    ko: { pinLabel: '🌲 강릉시' },
    en: {
      pinLabel: '🌲 Gangneung',
      name: 'Gangneung City',
      nameShort: 'Gangneung',
      tier: 'East Coast KTX & Scenic Hub',
      population: '210,000',
      regionName: 'Gangwon',
      statusBadge: 'Studio Ready',
      ktx: ['Gangneung Line KTX Terminus'],
      airports: ['Yangyang Int\'l (40 min)'],
      tagline: 'Ojukheon Bamboo Groves • Gyeongpo Lake & Pine Coastline',
      desc: 'Famed for the black bamboo groves of Ojukheon, Gyeongpodae Pavilion overlooking Gyeongpo Lake, and the turquoise waves of the East Sea.',
      stats: [
        { label: 'Highlights', value: 'Ojukheon • Gyeongpo Lake • Pine Forest' },
        { label: 'Rail Link', value: 'Seoul–Gangneung KTX (1h 40m)' }
      ],
      eras: [{ id: 'joseon', label: '🏯 Gwandong Lake', sub: 'Gyeongpo Pine Garden', preset: 'riverside' }],
      presets: [{ id: 'riverside', label: 'Lakeside Pine Garden', era: 'joseon' }]
    },
    zh: {
      pinLabel: '🌲 江陵市',
      name: '江陵市 (Gangneung)',
      nameShort: '江陵',
      tier: '关东八景首府 & 东海岸铁路枢纽',
      population: '210,000人',
      regionName: '江原圈',
      statusBadge: '可进入工作室探索',
      ktx: ['江陵线 KTX 终点站', '东海线 KTX(规划)'],
      airports: ['襄阳国际机场 (40分钟)'],
      tagline: '申师任堂与栗谷的乌竹轩 • 镜浦湖与海松咖啡街',
      desc: '以乌竹轩黑竹林、镜浦湖水岸楼阁与蔚蓝东海松林而闻名的关东第一名胜与咖啡文化海岸都市。',
      stats: [
        { label: '知名景点', value: '乌竹轩 • 镜浦湖 • 安木咖啡街' },
        { label: '高速铁路', value: '首尔-江陵 KTX 1小时40分直达' }
      ],
      eras: [{ id: 'joseon', label: '🏯 关东湖畔', sub: '镜浦松林村', preset: 'riverside' }],
      presets: [{ id: 'riverside', label: '湖畔松林庭园', era: 'joseon' }]
    },
    ja: {
      pinLabel: '🌲 江陵市',
      name: '江陵市 (Gangneung)',
      nameShort: '江陵',
      tier: '関東八景の中心＆東海岸鉄道拠点',
      population: '210,000人',
      regionName: '江原圏',
      statusBadge: 'スタジオ探索可能',
      ktx: ['江陵線 KTX 終着駅', '東海線 KTX(予定)'],
      airports: ['襄陽国際空港 (40分)'],
      tagline: '烏竹軒の黒竹林 • 鏡浦湖と松林が続く東海の景勝地',
      desc: '申師任堂ゆかりの烏竹軒、鏡浦台の楼閣、東海の海松林とアンモクコーヒー通りが調和する東海岸屈指の観光都市です。',
      stats: [
        { label: '名所', value: '烏竹軒 • 鏡浦湖 • コーヒー通り' },
        { label: '鉄道', value: 'ソウル〜江陵 KTX 1時間40分' }
      ],
      eras: [{ id: 'joseon', label: '🏯 関東の湖畔', sub: '鏡浦 松林の里', preset: 'riverside' }],
      presets: [{ id: 'riverside', label: '湖畔と松林庭園', era: 'joseon' }]
    },
    es: {
      pinLabel: '🌲 Gangneung',
      name: 'Ciudad de Gangneung',
      nameShort: 'Gangneung',
      tier: 'Centro Escénico de la Costa Este',
      population: '210,000 hab.',
      regionName: 'Gangwon',
      statusBadge: 'Estudio Disponible',
      ktx: ['Terminal KTX Gangneung'],
      airports: ['Aerop. Yangyang (40 min)'],
      tagline: 'Bosques de Bambú Negro Ojukheon • Lago Gyeongpo y Pinos del Mar del Este',
      desc: 'Célebre por el pabellón histórico Ojukheon, las vistas al lago Gyeongpo, sus pinares costeros y su cultura cafetera frente al mar.',
      stats: [
        { label: 'Atractivos', value: 'Ojukheon • Lago Gyeongpo • Pinares' },
        { label: 'Tren', value: 'Seúl–Gangneung KTX (1h 40m)' }
      ],
      eras: [{ id: 'joseon', label: '🏯 Lago Gwandong', sub: 'Jardín de Pinos', preset: 'riverside' }],
      presets: [{ id: 'riverside', label: 'Jardín junto al Lago', era: 'joseon' }]
    }
  },
  jeju: {
    ko: { pinLabel: '🌴 제주특별자치도' },
    en: {
      pinLabel: '🌴 Jeju',
      name: 'Jeju Special Self-Governing Province',
      nameShort: 'Jeju',
      tier: 'UNESCO Triple Crown / Volcanic Island',
      population: '675,000',
      regionName: 'Jeju',
      statusBadge: 'Studio Ready',
      ktx: ['Mokpo / Wando High-Speed Ferry'],
      airports: ['Jeju Int\'l Airport (CJU)'],
      tagline: 'Black Basalt Stone Walls & Emerald Waters Around Mt. Hallasan',
      desc: 'Korea\'s southernmost volcanic paradise featuring Mt. Hallasan (1,947m), Seongsan Ilchulbong tuff cone, basalt stone walls, and coastal meadows.',
      stats: [
        { label: 'UNESCO', value: 'Triple Crown Natural Heritage' },
        { label: 'Summit', value: 'Mt. Hallasan (1,947m)' }
      ],
      eras: [{ id: 'joseon', label: '🏯 Tamna Island', sub: 'Coastal Meadow', preset: 'meadow' }],
      presets: [{ id: 'meadow', label: 'Jeju Coastal Meadow', era: 'joseon' }]
    },
    zh: {
      pinLabel: '🌴 济州特别自治道',
      name: '济州特别自治道 (Jeju)',
      nameShort: '济州',
      tier: '世界自然遗产 / 国际自由城市',
      population: '675,000人',
      regionName: '济州圈',
      statusBadge: '可进入工作室探索',
      ktx: ['木浦/莞岛高速渡轮联动'],
      airports: ['济州国际机场 (CJU)'],
      tagline: '联合国教科文三冠王 • 翡翠海岸与汉拿山玄武岩岛屿',
      desc: '拥有黑色玄武岩石墙路、汉拿山白鹿潭(1,947m)、城山日出峰与万丈窟等火山奇观的韩国最南端生态度假胜地。',
      stats: [
        { label: '世界遗产', value: '生物圈保护区 • 自然遗产 • 地质公园' },
        { label: '最高峰', value: '汉拿山 (1,947m 韩国最高峰)' }
      ],
      eras: [{ id: 'joseon', label: '🏯 耽罗岛屿', sub: '海岸原野与草屋', preset: 'meadow' }],
      presets: [{ id: 'meadow', label: '济州原野建筑', era: 'joseon' }]
    },
    ja: {
      pinLabel: '🌴 済州特別自治道',
      name: '済州特別自治道 (Jeju)',
      nameShort: '済州',
      tier: '世界自然遺産 / 国際自由都市',
      population: '675,000人',
      regionName: '済州圏',
      statusBadge: 'スタジオ探索可能',
      ktx: ['木浦・莞島高速フェリー連絡'],
      airports: ['済州国際空港 (CJU)'],
      tagline: 'ユネスコ三冠 • エメラルドの海と漢拏山の火山島',
      desc: '玄武岩の石垣道、漢拏山白鹿潭(1,947m)、城山日出峰など手つかずの大自然が織りなす韓国最南端のリゾート島です。',
      stats: [
        { label: 'ユネスコ', value: '生物圏保存・自然遺産・ジオパーク' },
        { label: '最高峰', value: '漢拏山 (1,947m 韓国最高峰)' }
      ],
      eras: [{ id: 'joseon', label: '🏯 耽羅の島', sub: '草原と茅葺きの里', preset: 'meadow' }],
      presets: [{ id: 'meadow', label: '済州の草原建築', era: 'joseon' }]
    },
    es: {
      pinLabel: '🌴 Jeju',
      name: 'Provincia Autónoma Especial de Jeju',
      nameShort: 'Jeju',
      tier: 'Triple Corona UNESCO / Isla Volcánica',
      population: '675,000 hab.',
      regionName: 'Jeju',
      statusBadge: 'Estudio Disponible',
      ktx: ['Ferry Rápido desde Mokpo/Wando'],
      airports: ['Aeropuerto Int. de Jeju (CJU)'],
      tagline: 'Muros de Basalto Negro y Aguas Turquesas del Monte Hallasan',
      desc: 'Isla volcánica más meridional de Corea, famosa por el pico Hallasan (1,947m), Seongsan Ilchulbong y praderas costeras.',
      stats: [
        { label: 'UNESCO', value: 'Triple Patrimonio Natural' },
        { label: 'Cumbre', value: 'Monte Hallasan (1,947m)' }
      ],
      eras: [{ id: 'joseon', label: '🏯 Isla Tamna', sub: 'Praderas Costeras', preset: 'meadow' }],
      presets: [{ id: 'meadow', label: 'Pradera de Jeju', era: 'joseon' }]
    }
  },
  pyongyang: {
    ko: { pinLabel: '🏔️ 평양직할시' },
    en: {
      pinLabel: '🏔️ Pyongyang',
      name: 'Pyongyang',
      nameShort: 'Pyongyang',
      tier: 'Ancient Goguryeo Capital / Northern Hub',
      population: '3,000,000 (Est.)',
      regionName: 'Northern Korea',
      statusBadge: 'Studio Ready',
      ktx: ['Trans-Korean Gyeongui Corridor (Proposed)'],
      airports: ['Sunan Int\'l Airport'],
      tagline: 'Ulmildae Pavilion & Goguryeo Anhak Palace along the Taedong River',
      desc: 'Historic capital of Goguryeo under King Jangsu and Western Capital of Goryeo, overlooking the Taedong River with ancient gates and pavilions.',
      stats: [
        { label: 'Heritage', value: 'Goguryeo Tombs • Anhak Palace • Taedong Gate' },
        { label: 'River', value: 'Taedong & Potong Rivers' }
      ],
      eras: [{ id: 'joseon', label: '🏯 Taedong River', sub: 'Historic Riverfront', preset: 'village' }],
      presets: [{ id: 'village', label: 'Taedong Old Town', era: 'joseon' }]
    },
    zh: {
      pinLabel: '🏔️ 平壤直辖市',
      name: '平壤 (Pyongyang)',
      nameShort: '平壤',
      tier: '高句丽千年古都 / 北部枢纽',
      population: '3,000,000人 (估算)',
      regionName: '北部圈',
      statusBadge: '可进入工作室探索',
      ktx: ['京义线高速铁路(规划构想)'],
      airports: ['顺安国际机场'],
      tagline: '大同江畔乙密台与高句丽安鹤宫的雄浑古韵',
      desc: '高句丽长寿王迁都之千年要冲及高丽西京，汇聚大同江浮碧楼、乙密台与大同门等半岛北部千年历史遗迹。',
      stats: [
        { label: '历史遗迹', value: '高句丽古墓群 • 安鹤宫遗址 • 大同门' },
        { label: '水系', value: '大同江与普通江' }
      ],
      eras: [{ id: 'joseon', label: '🏯 大同江畔', sub: '江畔古都', preset: 'village' }],
      presets: [{ id: 'village', label: '大同江古村', era: 'joseon' }]
    },
    ja: {
      pinLabel: '🏔️ 平壌直轄市',
      name: '平壌 (Pyongyang)',
      nameShort: '平壌',
      tier: '高句麗千年の王都 / 北部拠点',
      population: '3,000,000人 (推計)',
      regionName: '北朝鮮圏',
      statusBadge: 'スタジオ探索可能',
      ktx: ['京義線高速鉄道 (構想)'],
      airports: ['順安国際空港'],
      tagline: '大同江沿いの乙密台と高句麗・安鶴宮の歴史都市',
      desc: '高句麗の長寿王が遷都した千年の要衝であり高麗の西京。大同江を見下ろす浮碧楼や大同門が並ぶ古都です。',
      stats: [
        { label: '歴史遺跡', value: '高句麗古墳群 • 安鶴宮跡 • 大同門' },
        { label: '水系', value: '大同江・普通江' }
      ],
      eras: [{ id: 'joseon', label: '🏯 大同江畔', sub: '川辺の古都', preset: 'village' }],
      presets: [{ id: 'village', label: '大同江の村', era: 'joseon' }]
    },
    es: {
      pinLabel: '🏔️ Pionyang',
      name: 'Pionyang',
      nameShort: 'Pionyang',
      tier: 'Antigua Capital Goguryeo / Norte',
      population: '3,000,000 (Est.)',
      regionName: 'Norte de Corea',
      statusBadge: 'Estudio Disponible',
      ktx: ['Corredor Gyeongui (Propuesto)'],
      airports: ['Aerop. Sunan'],
      tagline: 'Pabellón Ulmildae y Palacio Anhak junto al Río Taedong',
      desc: 'Histórica capital del reino de Goguryeo y sede occidental de Goryeo, asomada al río Taedong con antiguas murallas y puertas reales.',
      stats: [
        { label: 'Patrimonio', value: 'Tumbas Goguryeo • Palacio Anhak' },
        { label: 'Río', value: 'Ríos Taedong y Potong' }
      ],
      eras: [{ id: 'joseon', label: '🏯 Río Taedong', sub: 'Ribera Histórica', preset: 'village' }],
      presets: [{ id: 'village', label: 'Ciudad Antigua Taedong', era: 'joseon' }]
    }
  }
};
