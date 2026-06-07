const SONGS_API_URL = window.MISOLABO_SONGS_API_URL || 'https://script.google.com/macros/s/AKfycbySg44kQa-cFZg4zApnxkb1hw7Vxf-xW1lXhIT3UcOF2NdxfOB15z30c0gEAWNeFg1Y/exec';

  const ICON_X = `<svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>`;
  const ICON_MESSAGE = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z"/></svg>`;
  const ICON_PLAYLIST_LINES = `
    <circle cx="5" cy="6" r="1.6" fill="currentColor" stroke="none"/><circle cx="5" cy="12" r="1.6" fill="currentColor" stroke="none"/><circle cx="5" cy="18" r="1.6" fill="currentColor" stroke="none"/>
    <line x1="9" y1="6" x2="21" y2="6"/><line x1="9" y1="12" x2="21" y2="12"/><line x1="9" y1="18" x2="21" y2="18"/>`;
  const SORT_COLLATOR = new Intl.Collator(['ja', 'en'], { numeric: true, sensitivity: 'base' });

  const ABOUT_PAGE_CONTENT = {
    sections: [
      {
        type: 'body',
        title: 'About',
        lines: [
          'MISOLABO（みそらぼ）は、にじさんじ所属ライバー・伊波ライの歌声を記録する、小さなラボです。',
          '伊波ライさんの歌の魅力に、より多くの方が触れられる場になればと思い、この非公式ファンサイトを制作しました。',
          '歌枠・歌ってみた・ライブ出演など、さまざまな歌唱コンテンツを収録しています。',
          '楽曲単位で検索・再生でき、お気に入りの一曲をいつでも見つけてお楽しみいただけます。',
        ],
      },
      {
        type: 'features',
        title: 'Lab Features',
        features: [
          {
            label: 'Database',
            items: [
              '再生可能な楽曲データと、ライブ・限定公開・消える歌枠などの記録用データをまとめて検索可能',
              'FILTER / SORT / SEARCH / COLLAB 絞り込みに対応',
              '再生不可の記録用データは通常の楽曲より淡く表示（リンクがある場合は関連ページへ移動可能）',
            ],
          },
          {
            label: 'My Favorites',
            items: [
              '気になった再生可能楽曲を、お気に入りとして保存可能',
              '楽曲一覧、またはプレイヤー右側の「☆」アイコンから登録',
            ],
          },
          {
            label: 'Playlist',
            items: [
              '楽曲一覧、または画面下部プレイヤーの「＋」から再生可能楽曲をプレイリストに追加可能',
              'あらかじめ用意された PICK UP プレイリストと、ユーザー作成プレイリストに対応',
            ],
          },
        ],
      },
      {
        type: 'changelog',
        title: 'System Log',
        entries: [
          {
            version: 'Ver 0.9.5',
            items: [
              'ライブ・限定公開・消える歌枠などの記録用データも検索対象に追加',
              'COLLAB ポップアップを追加し、共演者タグによる複数選択フィルターに対応',
              'プレイリスト機能を整理し、PICK UP プレイリスト、作成モーダル、一覧からの追加操作を改善',
              '合作者名の表示順をデビュー順ベースに統一',
            ],
          },
          {
            version: 'Ver 0.9.0',
            items: ['試験運用版（BETA）公開'],
          },
        ],
      },
      {
        type: 'contact',
        title: 'Contact',
        lines: [
          '掲載情報に誤りや漏れなどがありましたら、',
          '下記の X（Twitter）アカウント、またはマシュマロまでお気軽にご連絡ください。',
          '特に、楽曲の再生開始・終了タイミングにずれがある場合は、正確なタイムスタンプをご連絡いただけますと大変助かります。',
          '個人運営のファンサイトのため至らない点もあるかと思いますが、あたたかく見守っていただけますと幸いです。',
        ],
        links: [
          { label: 'Twitter', href: 'https://x.com/___mslb0173', icon: ICON_X },
          { label: 'Marshmallow', href: 'https://marshmallow-qa.com/9nz5xo0n54zy77', icon: ICON_MESSAGE },
        ],
      },
      {
        type: 'links',
        title: 'Special Thanks',
        links: [
          { label: 'にじさんじ非公式Wiki', href: 'https://wikiwiki.jp/nijisanji/%E4%BC%8A%E6%B3%A2%E3%83%A9%E3%82%A4' },
          { label: 'ちまうた', href: 'https://chimauta.pages.dev' },
          { label: 'Nana Cheer!', href: 'https://nanaga-kita.com' },
        ],
      },
      {
        type: 'body',
        title: 'Disclaimer',
        lines: [
          '本サイトは ANYCOLOR株式会社様 及びにじさんじプロジェクト、各種関係会社とは一切関係がございません。',
          '掲載しているすべての動画・画像等のコンテンツは各権利者に帰属します。',
          '本サイトはファンが個人の趣味として制作したものであり、営利目的ではございません。',
          '掲載内容は予告なく変更・削除される場合がございます。',
        ],
      },
    ],
  };

  let songs           = [];
  let currentSong     = null;
  let favorites       = new Map(); // Map<songId, addedAt timestamp>
  let isPlaying       = false;
  let activeTags      = new Set();
  let searchQuery     = '';
  let ytPlayer        = null;
  let ytApiReady      = false;
  let pendingPlay     = false;
  let progressInterval= null;
  let isSeeking       = false;
  let isShuffle       = false;
  let repeatMode      = 0;
  let selectedCollabs = new Set();
  let currentView     = 'database'; // 'database' | 'favorites' | 'playlist'
  let queueSource     = { type: 'database', playlistId: null, songIds: [] };

  // Sort modes
  let dbSortMode      = 'date-desc';   // database default: newest upload first
  let favSortMode     = 'added-asc';   // favorites default: oldest added last (newest at bottom)

  // Collapsible panel states
  let filterPanelOpen = false;
  let sortPanelOpen   = false;
  let plSortPanelOpen = false;
  let collabPopupOpen = false;
  let collabShowMore  = false;

  // Home page random picks (cached per visit)
  let homeNewPicks = [];
  let homeRandomPicks = [];

  // ── localStorage helpers
  const LS_FAV_KEY = 'inami_favorites_v1';

  function loadFavoritesFromStorage() {
    try {
      const raw = localStorage.getItem(LS_FAV_KEY);
      if (raw) {
        const data = JSON.parse(raw);
        if (Array.isArray(data) && data.length > 0 && Array.isArray(data[0])) {
          favorites = new Map(data); // new format: [[id, timestamp], ...]
        } else if (Array.isArray(data)) {
          favorites = new Map(data.map(id => [id, 0])); // legacy format: [id, ...]
        }
      }
    } catch(e) { favorites = new Map(); }
  }

  function saveFavoritesToStorage() {
    try {
      localStorage.setItem(LS_FAV_KEY, JSON.stringify([...favorites.entries()]));
    } catch(e) {}
    updateFavBadge();
  }

  function updateFavBadge() {
    const badge = document.getElementById('navFavCount');
    if (!badge) return;
    const n = favorites.size;
    badge.textContent = n;
    badge.style.display = n > 0 ? '' : 'none';
  }

  // ── YouTube API callback
  function onYouTubeIframeAPIReady() {
    ytApiReady = true;
    // Don't pre-create the player here. The .yt-side has width:0 at this point,
    // and iOS/iPadOS WebKit refuses to play video in invisible/zero-size elements.
    // The player is created in openYT() instead — always inside a user gesture
    // AND inside a visible element.
    if (pendingPlay && currentSong) openYT();
  }

  // ── Format collaborators: split by , 、 × and join with "/"
  const COLLABORATOR_ORDER = [
    '樋口楓',
    '夕陽リリ',
    '森中花咲',
    '社築',
    '緑仙',
    '成瀬鳴',
    '鷹宮リオン',
    '竜胆尊',
    '町田ちま',
    'ジョー・力一',
    '夢追翔',
    '戌亥とこ',
    '三枝明那',
    'レヴィ・エリファ',
    '葉加瀬冬雪',
    'シェリン・バーガンディ',
    '星川サラ',
    '山神カルタ',
    '不破湊',
    '白雪巴',
    'ましろ爻',
    'ミン スゥーハ',
    'フレン・E・ルスタリオ',
    '長尾景',
    '弦月藤士郎',
    '甲斐田晴',
    '東堂コハク',
    'オリバー・エバンス',
    '闇ノシュウ',
    '天ヶ瀬むゆ',
    '壱百満天原サロメ',
    '風楽奏斗',
    '渡会雲雀',
    'セラフ・ダズルガーデン',
    '鏑木ろこ',
    '倉持めると',
    '佐伯イッテツ',
    '赤城ウェン',
    '宇佐美リト',
    '緋八マナ',
    '星導ショウ',
    '叢雲カゲツ',
    '小柳ロウ',
    'Yu Q. Wilson',
    'Vantacrow Bringer',
    'Vezalius Bandage',
    'ミラン・ケストレル',
    '北見遊征',
    '魁星',
    '榊ネス',
    '珠乃井ナナ',
    'ルンルン',
    '早乙女ベリー',
    '雲母たまこ',
    '酒寄颯馬',
    '渚トラウト',
    '篠宮ゆの',
    '花籠つばさ',
  ];

  const COLLABORATOR_ORDER_INDEX = new Map(
    COLLABORATOR_ORDER.map((name, index) => [name, index])
  );

  function splitCollaborators(raw) {
    if (Array.isArray(raw)) return raw.map(n => String(n).trim()).filter(Boolean);
    if (!raw || !String(raw).trim()) return [];
    return String(raw).split(/[,、×]/).map(n => n.trim()).filter(Boolean);
  }

  function sortCollaborators(names) {
    return [...names].sort((a, b) => {
      const ai = COLLABORATOR_ORDER_INDEX.has(a) ? COLLABORATOR_ORDER_INDEX.get(a) : Infinity;
      const bi = COLLABORATOR_ORDER_INDEX.has(b) ? COLLABORATOR_ORDER_INDEX.get(b) : Infinity;
      if (ai !== bi) return ai - bi;
      return SORT_COLLATOR.compare(a, b);
    });
  }

  function getSortedCollaborators(raw) {
    return sortCollaborators(splitCollaborators(raw));
  }

  function formatCollabs(raw) {
    return getSortedCollaborators(raw).join('/');
  }

  // ── Format collaborators for home cards: join with 、
  function formatCollabsJP(raw) {
    return getSortedCollaborators(raw).join('、');
  }

  // ── Song data cache (localStorage)
  const LS_SONGS_CACHE_KEY = 'inami_songs_cache_v3_manual_records';
  const CACHE_TTL = 30 * 60 * 1000; // 30 minutes

  function getSongsFromCache() {
    try {
      const raw = localStorage.getItem(LS_SONGS_CACHE_KEY);
      if (!raw) return null;
      const { data, ts } = JSON.parse(raw);
      if (Date.now() - ts < CACHE_TTL) return data;
    } catch(e) {}
    return null;
  }

  function saveSongsToCache(data) {
    try { localStorage.setItem(LS_SONGS_CACHE_KEY, JSON.stringify({ data, ts: Date.now() })); } catch(e) {}
  }

  function splitListValue(raw) {
    if (Array.isArray(raw)) return raw.map(item => String(item).trim()).filter(Boolean);
    return String(raw || '')
      .split(/[,、]/)
      .map(item => item.trim())
      .filter(Boolean);
  }

  function normalizeSongsFromApi(data) {
    if (Array.isArray(data.songs)) return data.songs;

    const tracks = Array.isArray(data.tracks) ? data.tracks : [];
    const manualRecords = Array.isArray(data.manual_records)
      ? data.manual_records
      : Array.isArray(data.manualRecords)
        ? data.manualRecords
        : [];
    const videos = data.videos && typeof data.videos === 'object' ? data.videos : {};

    const normalizedTracks = tracks
      .map((track, index) => {
        const video = videos[track.videoId] || {};
        const tags = splitListValue(track.tags);

        return {
          id: index + 1,
          recordKind: 'track',
          videoId: track.videoId || '',
          videoTitle: video.title || track.videoTitle || '',
          title: track.title || '(No Title)',
          artist: track.artist || '',
          collaborators: track.collaborators || '',
          tags,
          startSeconds: track.startSeconds || 0,
          endSeconds: track.endSeconds || null,
          date: formatApiDate(video.postDate || track.postDate || track.date),
          isPlayable: track.isPlayable !== false,
        };
      })
      .filter(song => song.videoId);

    const normalizedManualRecords = manualRecords
      .map((record, index) => {
        const title = record.title || record.songTitle || '';
        if (!title) return null;
        const sourceType = record.sourceType || record.source_type || '';
        const memo = record.memo || record.status || record.note || '';
        const tags = splitListValue(record.tags);
        const sourceChips = [sourceType].filter(Boolean);

        return {
          id: 100000 + index + 1,
          manualId: record.manualId || record.manualID || record.id || '',
          recordKind: 'manual',
          videoId: '',
          videoTitle: '',
          title,
          artist: record.artist || '',
          collaborators: record.collaborators || record.collabs || '',
          tags,
          sourceChips,
          sourceType,
          sourceTitle: record.sourceTitle || record.source_title || '',
          recordUrl: record.url || record.sourceUrl || record.source_url || '',
          memo,
          startSeconds: 0,
          endSeconds: null,
          date: formatApiDate(record.recordDate || record.record_date || record.date),
          isPlayable: false,
        };
      })
      .filter(Boolean);

    return [...normalizedTracks, ...normalizedManualRecords];
  }

  function formatApiDate(raw) {
    if (!raw) return null;
    const match = String(raw).trim().match(/(\d{4})[-\/](\d{1,2})[-\/](\d{1,2})/);
    if (!match) return String(raw).trim();
    return `${match[1]}/${String(match[2]).padStart(2, '0')}/${String(match[3]).padStart(2, '0')}`;
  }

  function playerFallbackIcon() {
    return `<svg width="20" height="20" viewBox="0 0 24 24" fill="var(--text-muted)" stroke="none"><path d="M9 3v11.586A3.5 3.5 0 1 0 11 18V8.5l10-1.667V14.1A3.5 3.5 0 1 0 23 17.5V2.167L9 3Z"/></svg>`;
  }

  function getYouTubeThumbnail(videoId, quality = 'max') {
    const id = encodeURIComponent(videoId || '');
    const file = quality === 'hq' ? 'hqdefault.jpg' : 'maxresdefault.jpg';
    return `https://img.youtube.com/vi/${id}/${file}`;
  }

  function fallbackYouTubeThumbnail(img, fallbackHtml = '') {
    if (!img.dataset.fallbackTried) {
      img.dataset.fallbackTried = '1';
      img.src = getYouTubeThumbnail(img.dataset.videoId, 'hq');
      return;
    }
    const block = document.createElement('div');
    block.className = `${img.className || ''} thumbnail-fallback-block`.trim();
    block.setAttribute('aria-hidden', 'true');
    img.replaceWith(block);
  }

  function validateYouTubeThumbnail(img) {
    // YouTube serves a tiny gray placeholder as a successful image response when
    // a thumbnail file does not exist, so onerror alone cannot catch this case.
    const isDefaultThumb = img.naturalWidth <= 120 || img.naturalHeight <= 90;
    if (isDefaultThumb) fallbackYouTubeThumbnail(img);
  }

  function updatePlayerThumb(song) {
    const thumb = document.getElementById('playerThumb');
    if (!thumb) return;
    if (!song || !song.videoId) {
      thumb.innerHTML = playerFallbackIcon();
      return;
    }
    thumb.innerHTML = `<img src="${getYouTubeThumbnail(song.videoId)}" data-video-id="${escapeHtml(song.videoId)}" alt="${escapeHtml(song.title)}" onload="validateYouTubeThumbnail(this)" onerror="fallbackYouTubeThumbnail(this, playerFallbackIcon())">`;
  }

  function updatePlayerDisplay(song) {
    if (!song) return;
    document.getElementById('playerTitle').textContent  = song.title;
    document.getElementById('playerArtist').textContent = song.artist;
    updatePlayerThumb(song);
    updatePlayerFav();
    updateProgressUi(0, getTrackBounds(song).total);
  }

  function initializeDefaultQueue() {
    const dbQueue = sortSongs(songs, 'date-desc').filter(s => s.isPlayable);
    if (!dbQueue.length) return;
    setQueueSource('database', dbQueue.map(s => s.id));
    currentSong = dbQueue[0];
    updatePlayerDisplay(currentSong);
  }

  // ── Load songs from Google Sheets (with cache)
  async function loadSongs() {
    document.getElementById('songList').innerHTML =
      `<div style="padding:48px 24px;color:var(--text-muted);font-family:'Space Mono',monospace;font-size:11px;letter-spacing:0.12em;text-transform:uppercase;">Loading...</div>`;

    // Try cache first
    const cached = getSongsFromCache();
    if (cached && cached.length) {
      songs = cached;
      initializeDefaultQueue();
      if (currentView === 'home') { homeNewPicks = []; homeRandomPicks = []; renderHomePage(); }
      else renderSongs();
      if (collabPopupOpen) renderCollabPopupList();
      return;
    }

    try {
      const res = await fetch(SONGS_API_URL, { headers: { Accept: 'application/json' } });
      if (!res.ok) throw new Error(`API request failed (${res.status})`);
      const data = await res.json();
      songs = normalizeSongsFromApi(data);

      if (!songs.length) {
        document.getElementById('songList').innerHTML =
          `<div style="padding:48px 24px;color:var(--text-muted);font-family:'Space Mono',monospace;font-size:11px;letter-spacing:0.12em;text-transform:uppercase;">No songs found.<br><br>Check isValidTrack=TRUE and status=public.</div>`;
        return;
      }

      saveSongsToCache(songs); // cache for 30 minutes
      initializeDefaultQueue();
      if (currentView === 'home') {
        homeNewPicks = [];
        homeRandomPicks = [];
        renderHomePage();
      } else {
        renderSongs();
      }
      if (collabPopupOpen) renderCollabPopupList();
    } catch (e) {
      document.getElementById('songList').innerHTML =
        `<div style="padding:48px 24px;color:#f87171;font-family:'Space Mono',monospace;font-size:11px;letter-spacing:0.12em;">⚠ LOAD ERROR<br><br>${e.message}</div>`;
    }
  }

  // ── Filter + Sort logic
  function getFilteredSongs() {
    const base = currentView === 'favorites'
      ? songs.filter(s => favorites.has(s.id))
      : songs;

    const filtered = base.filter(s => {
      const q = searchQuery.toLowerCase();
      const matchSearch = !q ||
        s.title.toLowerCase().includes(q) ||
        s.artist.toLowerCase().includes(q) ||
        (s.collaborators && s.collaborators.toLowerCase().includes(q)) ||
        (s.sourceTitle && s.sourceTitle.toLowerCase().includes(q)) ||
        (s.sourceType && s.sourceType.toLowerCase().includes(q)) ||
        (s.memo && s.memo.toLowerCase().includes(q)) ||
        (s.tags && s.tags.some(tag => tag.toLowerCase().includes(q)));

      let matchTag = true;
      if (activeTags.size > 0) {
        // AND logic: song must match ALL selected tags
        for (const t of activeTags) {
          if (t === 'solo') {
            // SOLO: collaborators is empty
            if (s.collaborators && s.collaborators.trim()) { matchTag = false; break; }
          } else if (t === 'collab') {
            // COLLAB: collaborators is non-empty
            if (!s.collaborators || !s.collaborators.trim()) { matchTag = false; break; }
          } else if (t === 'cover') {
            // COVER = all non-ORIGINAL songs (songs without 'original' tag)
            if (s.tags.some(st => st.toLowerCase() === 'original')) { matchTag = false; break; }
          } else {
            // General tag-based check (case-insensitive)
            if (!s.tags.some(st => st.toLowerCase() === t)) { matchTag = false; break; }
          }
        }
      }

      const songCollabs = splitCollaborators(s.collaborators);
      const matchCollab = selectedCollabs.size === 0 ||
        songCollabs.some(name => selectedCollabs.has(name));

      return matchSearch && matchTag && matchCollab;
    });

    // Apply sort
    const mode = currentView === 'favorites' ? favSortMode : dbSortMode;
    return sortSongs(filtered, mode);
  }

  // ── Render song list
  function renderSongs() {
    const filtered = getFilteredSongs();
    const list = document.getElementById('songList');
    document.getElementById('songCount').textContent = `${filtered.length} songs`;
    const actionBar = document.getElementById('songActionBar');
    if (actionBar) actionBar.style.display =
      (currentView === 'database' || currentView === 'favorites') && filtered.some(s => s.isPlayable) ? 'flex' : 'none';

    if (!filtered.length) {
      if (currentView === 'favorites') {
        list.innerHTML = `
          <div class="pl-empty" style="padding:64px 24px;">
            <div class="pl-empty-icon">
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
              </svg>
            </div>
            <div class="pl-empty-title">お気に入りがありません</div>
            <div class="pl-empty-sub">データベースの ★ ボタンから<br>曲を追加してください。</div>
          </div>`;
      } else {
        list.innerHTML =
          `<div style="padding:48px 24px;color:var(--text-muted);font-family:'Space Mono',monospace;font-size:11px;letter-spacing:0.12em;text-transform:uppercase;">No results.</div>`;
      }
      return;
    }

    list.innerHTML = filtered.map((s, i) => {
      const collabStr = formatCollabs(s.collaborators);
      const isUnplayable = !s.isPlayable;
      const isManualRecord = s.recordKind === 'manual';
      const rowAction = isManualRecord
        ? `onclick="openManualRecord(event, ${s.id})"`
        : isUnplayable
          ? ''
        : `onclick="playSong(${s.id}, { source: 'current-list' })"`;
      const recordMeta = [
        ...(s.tags || []).map(t => `<span class="song-tag ${escapeHtml(t.toLowerCase())}">${escapeHtml(t)}</span>`),
        ...(s.sourceChips || []).map(t => `<span class="song-tag record-chip">${escapeHtml(t)}</span>`),
      ].join('');
      return `
      <div class="song-row ${currentSong && s.id === currentSong.id ? 'playing' : ''} ${isUnplayable ? 'unplayable' : ''} ${isManualRecord ? 'manual-record has-record-detail' : ''}"
           data-song-id="${s.id}"
           ${rowAction}>
        <div class="song-index">
          <span class="song-num">${i + 1}</span>
          ${!isUnplayable ? `<svg class="song-play-icon" viewBox="0 0 24 24" fill="currentColor">
            ${currentSong && s.id === currentSong.id && isPlaying
              ? '<rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/>'
              : '<polygon points="5 3 19 12 5 21 5 3"/>'}
          </svg>` : ''}
        </div>
        <div class="song-info">
          <div class="song-title-line">
            <div class="song-title">${escapeHtml(s.title)}</div>
            ${isManualRecord && s.memo ? `<span class="song-memo">${escapeHtml(s.memo)}</span>` : ''}
          </div>
          <div class="song-artist">${escapeHtml(s.artist)}</div>
          ${collabStr ? `<div class="song-collab-row">with ${escapeHtml(collabStr)}</div>` : ''}
        </div>
        <div class="song-meta">
          <div class="song-tags">${recordMeta}</div>
          <div class="song-actions ${isManualRecord ? 'placeholder' : ''}" aria-hidden="${isManualRecord}">
            ${isManualRecord ? '' : `<button class="song-fav ${favorites.has(s.id) ? 'active' : ''}" onclick="toggleFav(event, ${s.id})" aria-label="Favorite ${escapeHtml(s.title)}" aria-pressed="${favorites.has(s.id)}">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="${favorites.has(s.id) ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
              </svg>
            </button>
            <button class="song-playlist-add" onclick="openAddToPlaylist(event, ${s.id})" aria-label="Add ${escapeHtml(s.title)} to playlist">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            </button>`}
          </div>
        </div>
      </div>`;
    }).join('');
  }

  function openManualRecord(e, id) {
    e?.stopPropagation();
    const record = songs.find(song => song.id === Number(id));
    if (!record || record.recordKind !== 'manual') return;

    renderManualRecordDetail(record);
    document.getElementById('manualDetailOverlay')?.classList.add('open');
    document.querySelector('.manual-detail-close')?.focus();
  }

  function closeManualRecordDetail() {
    document.getElementById('manualDetailOverlay')?.classList.remove('open');
  }

  function getManualRecordSourceLabel(record) {
    return record.sourceTitle || record.sourceType || record.recordUrl || 'Source unavailable';
  }

  function isSafeExternalUrl(url) {
    return /^https?:\/\//i.test(String(url || '').trim());
  }

  function renderManualRecordDetail(record) {
    const body = document.getElementById('manualDetailBody');
    if (!body) return;

    const tags = [
      ...(record.tags || []).map(t => `<span class="song-tag ${escapeHtml(t.toLowerCase())}">${escapeHtml(t)}</span>`),
      ...(record.sourceChips || []).map(t => `<span class="song-tag record-chip">${escapeHtml(t)}</span>`),
    ].join('');
    const collabs = getSortedCollaborators(record.collaborators);
    const collabHtml = collabs.length
      ? `<section class="manual-detail-section">
          <div class="manual-detail-label">Collaborators</div>
          <div class="manual-detail-collabs">
            ${collabs.map(name => `
              <button class="collab-chip" type="button" data-collab="${escapeHtml(name)}" onclick="selectManualDetailCollab(this)">
                ${escapeHtml(name)}
              </button>`).join('')}
          </div>
        </section>`
      : '';
    const sourceLabel = getManualRecordSourceLabel(record);
    const sourceHtml = isSafeExternalUrl(record.recordUrl)
      ? `<a class="manual-detail-source-link" href="${escapeHtml(record.recordUrl)}" target="_blank" rel="noopener">${escapeHtml(sourceLabel)}</a>`
      : escapeHtml(sourceLabel);
    const sourceSection = sourceLabel || record.recordUrl
      ? `<section class="manual-detail-section">
          <div class="manual-detail-label">Source</div>
          <div class="manual-detail-source">${sourceHtml}</div>
        </section>`
      : '';
    const dateSection = record.date
      ? `<section class="manual-detail-section">
          <div class="manual-detail-label">Date</div>
          <div class="manual-detail-date">${escapeHtml(record.date)}</div>
        </section>`
      : '';

    body.innerHTML = `
      <div class="manual-detail-title-line">
        <div class="manual-detail-title" id="manualDetailTitle">${escapeHtml(record.title)}</div>
        ${record.memo ? `<span class="manual-detail-memo">${escapeHtml(record.memo)}</span>` : ''}
      </div>
      <div class="manual-detail-artist">${escapeHtml(record.artist)}</div>
      ${tags ? `<div class="manual-detail-tags">${tags}</div>` : ''}
      ${collabHtml}
      ${sourceSection}
      ${dateSection}
    `;
  }

  function selectManualDetailCollab(button) {
    const name = button?.dataset?.collab;
    if (!name) return;
    closeManualRecordDetail();
    filterByCollab(name);
  }

  window.openManualRecord = openManualRecord;
  window.closeManualRecordDetail = closeManualRecordDetail;
  window.selectManualDetailCollab = selectManualDetailCollab;

  // ── Playback
  function setQueueSource(type, songIds, playlistId = null) {
    queueSource = {
      type,
      playlistId,
      songIds: [...new Set((songIds || []).map(Number).filter(Boolean))],
    };
  }

  function shuffleIds(ids) {
    const shuffled = [...ids];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  function getSongsByIds(ids) {
    return (ids || [])
      .map(id => songs.find(s => s.id === id))
      .filter(Boolean);
  }

  function getCurrentListSongIds() {
    if (currentView === 'playlist' && currentPlaylistId) {
      return getVisiblePlaylistSongs(currentPlaylistId).map(s => s.id);
    }
    return getFilteredSongs().map(s => s.id);
  }

  function setQueueFromCurrentList(options = {}) {
    const ids = options.shuffle ? shuffleIds(getCurrentListSongIds()) : getCurrentListSongIds();
    const type = currentView === 'playlist' && currentPlaylistId ? 'playlist' : currentView;
    setQueueSource(type, ids, currentPlaylistId);
  }

  function getPlaybackQueue() {
    if (queueSource.songIds && queueSource.songIds.length) {
      return getSongsByIds(queueSource.songIds).filter(s => s.isPlayable);
    }
    return getFilteredSongs().filter(s => s.isPlayable);
  }

  function setShuffleState(enabled) {
    isShuffle = enabled;
    const btn = document.getElementById('shuffleBtn');
    btn?.classList.toggle('active', isShuffle);
    btn?.setAttribute('aria-pressed', String(isShuffle));
  }

  function playCurrentListSequential() {
    setQueueFromCurrentList();
    setShuffleState(false);
    const first = getPlaybackQueue()[0];
    if (first) playSong(first.id, { preserveQueue: true });
  }

  function playCurrentListShuffle() {
    setQueueFromCurrentList({ shuffle: true });
    setShuffleState(true);
    const first = getPlaybackQueue()[0];
    if (first) playSong(first.id, { preserveQueue: true });
  }

  function stopAtQueueEnd() {
    isPlaying = false;
    updatePlayIcon();
    stopProgressUpdate();
    try {
      if (ytPlayer && typeof ytPlayer.pauseVideo === 'function') ytPlayer.pauseVideo();
      if (ytPlayer && typeof ytPlayer.seekTo === 'function' && currentSong) {
        ytPlayer.seekTo(Math.floor(currentSong.startSeconds || 0), true);
      }
    } catch(e) {}
    document.getElementById('progressFill').style.width = '0%';
    document.getElementById('currentTime').textContent = '0:00';
    renderSongs();
    if (currentView === 'playlist' && currentPlaylistId) renderPlaylistPage();
    if (currentView === 'home') renderHomePage();
  }

  function playSong(id, options = {}) {
    const song = songs.find(s => s.id === id);
    if (!song || !song.isPlayable) return;

    if (options.songIds) {
      setQueueSource(options.type || currentView, options.songIds, options.playlistId || currentPlaylistId);
    } else if (options.source === 'current-list') {
      setQueueFromCurrentList();
    } else if (!options.preserveQueue && (!queueSource.songIds || !queueSource.songIds.includes(id))) {
      setQueueFromCurrentList();
    }

    // If already playing this song → toggle pause
    if (currentSong && currentSong.id === id && isPlaying) {
      togglePlay();
      return;
    }

    currentSong = song;
    isPlaying = true;
    updatePlayerDisplay(currentSong);
    updatePlayIcon();
    renderSongs();
    openYT();
    scrollToSong(id);
  }

  function playNext() {
    if (repeatMode === 2) { playSong(currentSong.id, { preserveQueue: true }); return; }
    const queue = getPlaybackQueue();
    if (!queue.length) return;
    if (isShuffle) {
      const others = queue.filter(s => s.id !== currentSong?.id);
      if (!others.length && repeatMode === 0) { stopAtQueueEnd(); return; }
      playSong((others.length ? others[Math.floor(Math.random() * others.length)] : queue[0]).id, { preserveQueue: true });
      return;
    }
    const i = queue.findIndex(s => s.id === currentSong?.id);
    if (i !== -1 && i < queue.length - 1) {
      playSong(queue[i + 1].id, { preserveQueue: true });
    } else if (repeatMode === 1) {
      playSong(queue[0].id, { preserveQueue: true });
    } else {
      stopAtQueueEnd();
    }
  }

  function playPrev() {
    const queue = getPlaybackQueue();
    const i = queue.findIndex(s => s.id === currentSong?.id);
    if (i > 0) playSong(queue[i - 1].id, { preserveQueue: true });
  }

  function togglePlay() {
    if (!ytPlayer || typeof ytPlayer.playVideo !== 'function') {
      const currentIds = getCurrentListSongIds();
      const currentInList = currentSong && currentIds.includes(currentSong.id);
      if (currentView === 'favorites' || (currentView === 'playlist' && currentPlaylistId)) {
        setQueueFromCurrentList();
        const target = currentInList ? currentSong : getPlaybackQueue()[0];
        if (target) playSong(target.id, { preserveQueue: true });
        return;
      }
      if (currentSong) {
        if (!queueSource.songIds || !queueSource.songIds.length) setQueueFromCurrentList();
        openYT();
      }
      return;
    }
    isPlaying ? ytPlayer.pauseVideo() : ytPlayer.playVideo();
  }

  function updatePlayIcon() {
    document.getElementById('playBtn')?.setAttribute('aria-label', isPlaying ? 'Pause' : 'Play');
    document.getElementById('playIcon').innerHTML = isPlaying
      ? '<rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/>'
      : '<polygon points="5 3 19 12 5 21 5 3"/>';
  }

  // ── Shuffle & Repeat
  function toggleShuffle() {
    setShuffleState(!isShuffle);
  }

  function toggleRepeat() {
    repeatMode = (repeatMode + 1) % 3;
    const btn  = document.getElementById('repeatBtn');
    const icon = document.getElementById('repeatIcon');
    if (repeatMode === 0) {
      btn.classList.remove('active');
      btn.title = 'Repeat';
      btn.setAttribute('aria-label', 'Repeat');
      btn.setAttribute('aria-pressed', 'false');
      icon.innerHTML = `<polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 014-4h14"/><polyline points="7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 01-4 4H3"/>`;
    } else if (repeatMode === 1) {
      btn.classList.add('active');
      btn.title = 'Repeat All';
      btn.setAttribute('aria-label', 'Repeat all');
      btn.setAttribute('aria-pressed', 'true');
      icon.innerHTML = `<polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 014-4h14"/><polyline points="7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 01-4 4H3"/>`;
    } else {
      btn.classList.add('active');
      btn.title = 'Repeat One';
      btn.setAttribute('aria-label', 'Repeat one');
      btn.setAttribute('aria-pressed', 'true');
      icon.innerHTML = `<polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 014-4h14"/><polyline points="7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 01-4 4H3"/><text x="10" y="14" font-size="7" font-family="monospace" fill="currentColor" stroke="none">1</text>`;
    }
  }

  // ── Favorites
  function updatePlayerFav() {
    if (!currentSong) return;
    const isFav = favorites.has(currentSong.id);
    document.getElementById('playerFavBtn').classList.toggle('active', isFav);
    document.getElementById('playerFavBtn').setAttribute('aria-pressed', String(isFav));
    document.getElementById('playerFavIcon').setAttribute('fill', isFav ? 'currentColor' : 'none');
  }

  function togglePlayerFav(e) {
    e.stopPropagation();
    if (!currentSong) return;
    favorites.has(currentSong.id) ? favorites.delete(currentSong.id) : favorites.set(currentSong.id, Date.now());
    saveFavoritesToStorage();
    updatePlayerFav();
    renderSongs();
  }

  function toggleFav(e, id) {
    e.stopPropagation();
    favorites.has(id) ? favorites.delete(id) : favorites.set(id, Date.now());
    saveFavoritesToStorage();
    renderSongs();
    updatePlayerFav();
  }

  // ── Filter / Sort panel toggles
  function syncPanelA11y(panelId, buttonId, isOpen) {
    document.getElementById(panelId)?.setAttribute('aria-hidden', String(!isOpen));
    document.getElementById(buttonId)?.setAttribute('aria-expanded', String(isOpen));
  }

  function syncCollabPopupA11y() {
    const popup = document.getElementById('collabPopup');
    const btn = document.getElementById('collabToggleBtn');
    popup?.classList.toggle('open', collabPopupOpen);
    popup?.setAttribute('aria-hidden', String(!collabPopupOpen));
    btn?.classList.toggle('open', collabPopupOpen);
    btn?.setAttribute('aria-expanded', String(collabPopupOpen));
  }

  function toggleFilterPanel() {
    filterPanelOpen = !filterPanelOpen;
    if (filterPanelOpen) sortPanelOpen = false;
    if (filterPanelOpen) closeCollabPopup();
    document.getElementById('filterPanel').classList.toggle('open', filterPanelOpen);
    document.getElementById('filterToggleBtn').classList.toggle('open', filterPanelOpen);
    document.getElementById('sortPanel')?.classList.toggle('open', sortPanelOpen);
    document.getElementById('sortToggleBtn')?.classList.toggle('open', sortPanelOpen);
    syncPanelA11y('filterPanel', 'filterToggleBtn', filterPanelOpen);
    syncPanelA11y('sortPanel', 'sortToggleBtn', sortPanelOpen);
  }

  function toggleSortPanel() {
    sortPanelOpen = !sortPanelOpen;
    if (sortPanelOpen) filterPanelOpen = false;
    if (sortPanelOpen) closeCollabPopup();
    document.getElementById('sortPanel').classList.toggle('open', sortPanelOpen);
    document.getElementById('sortToggleBtn').classList.toggle('open', sortPanelOpen);
    document.getElementById('filterPanel')?.classList.toggle('open', filterPanelOpen);
    document.getElementById('filterToggleBtn')?.classList.toggle('open', filterPanelOpen);
    syncPanelA11y('sortPanel', 'sortToggleBtn', sortPanelOpen);
    syncPanelA11y('filterPanel', 'filterToggleBtn', filterPanelOpen);
  }

  function togglePlaylistSortPanel() {
    plSortPanelOpen = !plSortPanelOpen;
    document.getElementById('plSortPanel')?.classList.toggle('open', plSortPanelOpen);
    document.getElementById('plSortToggleBtn')?.classList.toggle('open', plSortPanelOpen);
    syncPanelA11y('plSortPanel', 'plSortToggleBtn', plSortPanelOpen);
  }

  function resetFilters() {
    activeTags.clear();
    document.querySelectorAll('.tag:not(.reset-tag)').forEach(t => {
      t.classList.remove('active');
      t.setAttribute('aria-pressed', 'false');
    });
    selectedCollabs.clear();
    renderCollabPopupList();
    document.querySelectorAll('.collab-chip').forEach(c => c.classList.remove('active'));
    updateFilterActiveDot();
    renderSongs();
  }

  function updateFilterActiveDot() {
    const dot = document.getElementById('filterActiveDot');
    if (dot) dot.classList.toggle('visible', activeTags.size > 0);
    document.getElementById('collabActiveDot')?.classList.toggle('visible', selectedCollabs.size > 0);
  }

  function getCollaboratorStats() {
    const stats = new Map();
    songs.forEach(song => {
      new Set(splitCollaborators(song.collaborators)).forEach(name => {
        const current = stats.get(name) || { name, trackCount: 0, totalCount: 0 };
        current.totalCount += 1;
        if (song.recordKind !== 'manual') current.trackCount += 1;
        stats.set(name, current);
      });
    });
    return [...stats.values()]
      .sort((a, b) =>
        b.trackCount - a.trackCount ||
        b.totalCount - a.totalCount ||
        SORT_COLLATOR.compare(a.name, b.name)
      );
  }

  function renderCollabPopupList() {
    const list = document.getElementById('collabPopupList');
    const sub = document.getElementById('collabPopupSub');
    const moreSlot = document.getElementById('collabMoreSlot');
    if (!list) return;

    const stats = getCollaboratorStats();
    if (!stats.length) {
      list.innerHTML = '<div class="collab-popup-empty">No collaborators found.</div>';
      if (moreSlot) moreSlot.innerHTML = '';
      if (sub) sub.textContent = '0 collaborators';
      return;
    }

    const chipHtml = stats.map(({ name }) => {
      const active = selectedCollabs.has(name);
      return `
        <button class="collab-filter-chip ${active ? 'active' : ''}"
          type="button"
          data-collab="${escapeHtml(name)}"
          onclick="toggleCollabSelectionFromButton(this)"
          aria-pressed="${active}">
          <span>${escapeHtml(name)}</span>
        </button>`;
    }).join('');

    list.innerHTML = chipHtml;

    if (moreSlot) {
      moreSlot.style.display = '';
      moreSlot.innerHTML = `<button class="collab-more-btn ${collabShowMore ? 'active' : ''}"
          type="button"
          onclick="toggleCollabMore()"
          aria-expanded="${collabShowMore}">
          <span class="collab-action-icon" aria-hidden="true">${collabShowMore ? '-' : '+'}</span>
          <span class="collab-action-label">${collabShowMore ? 'LESS' : 'MORE'}</span>
        </button>`;
    }

    applyCollabRowCollapse(stats.length);
  }

  function getCollabCollapsedRows() {
    return window.matchMedia('(max-width: 1100px)').matches ? 3 : 4;
  }

  function applyCollabRowCollapse(totalCount) {
    const list = document.getElementById('collabPopupList');
    const sub = document.getElementById('collabPopupSub');
    const moreSlot = document.getElementById('collabMoreSlot');
    if (!list) return;

    const chips = [...list.querySelectorAll('.collab-filter-chip')];
    chips.forEach(chip => chip.hidden = false);

    if (collabShowMore) {
      if (sub) {
        sub.textContent = selectedCollabs.size
          ? `${selectedCollabs.size} selected / ${totalCount} collaborators`
          : `${totalCount} collaborators`;
      }
      return;
    }

    requestAnimationFrame(() => {
      const rowLimit = getCollabCollapsedRows();
      const visibleChips = [...list.querySelectorAll('.collab-filter-chip')];
      const rowTops = [];
      visibleChips.forEach(chip => {
        const top = Math.round(chip.offsetTop);
        if (!rowTops.some(rowTop => Math.abs(rowTop - top) <= 3)) rowTops.push(top);
      });
      rowTops.sort((a, b) => a - b);

      chips.forEach(chip => {
        const rowIndex = rowTops.findIndex(rowTop => Math.abs(rowTop - Math.round(chip.offsetTop)) <= 3);
        chip.hidden = rowIndex >= rowLimit;
      });

      const visibleCount = chips.filter(chip => !chip.hidden).length;
      const hasHidden = visibleCount < totalCount;
      if (moreSlot) moreSlot.style.display = hasHidden ? '' : 'none';

      if (sub) {
        sub.textContent = selectedCollabs.size
          ? `${selectedCollabs.size} selected / ${totalCount} collaborators`
          : `${visibleCount} top collaborators`;
      }
    });
  }

  function toggleCollabPopup(e) {
    e?.preventDefault();
    e?.stopPropagation();
    collabPopupOpen = true;
    filterPanelOpen = false;
    sortPanelOpen = false;
    document.getElementById('filterPanel')?.classList.remove('open');
    document.getElementById('sortPanel')?.classList.remove('open');
    document.getElementById('filterToggleBtn')?.classList.remove('open');
    document.getElementById('sortToggleBtn')?.classList.remove('open');
    syncPanelA11y('filterPanel', 'filterToggleBtn', false);
    syncPanelA11y('sortPanel', 'sortToggleBtn', false);
    renderCollabPopupList();
    syncCollabPopupA11y();
  }

  function closeCollabPopup() {
    if (!collabPopupOpen) return;
    collabPopupOpen = false;
    syncCollabPopupA11y();
  }

  function toggleCollabMore() {
    collabShowMore = !collabShowMore;
    renderCollabPopupList();
  }

  function toggleCollabSelectionFromButton(btn) {
    toggleCollabSelection(btn.dataset.collab || '');
  }

  function toggleCollabSelection(name) {
    if (!name) return;
    selectedCollabs.has(name) ? selectedCollabs.delete(name) : selectedCollabs.add(name);
    renderCollabPopupList();
    updateFilterActiveDot();
    renderSongs();
    if (currentSong) updateYtInfo();
  }

  function resetCollabFilters() {
    selectedCollabs.clear();
    renderCollabPopupList();
    updateFilterActiveDot();
    renderSongs();
    if (currentSong) updateYtInfo();
  }

  window.toggleCollabPopup = toggleCollabPopup;
  window.closeCollabPopup = closeCollabPopup;
  window.toggleCollabMore = toggleCollabMore;
  window.toggleCollabSelectionFromButton = toggleCollabSelectionFromButton;
  window.resetCollabFilters = resetCollabFilters;

  // ── Sort functions
  function setDbSort(mode) {
    dbSortMode = mode;
    updateSortPanel();
    renderSongs();
  }

  function setFavSort(mode) {
    favSortMode = mode;
    updateSortPanel();
    renderSongs();
  }

  function updateSortPanel() {
    const inner = document.getElementById('sortPanelInner');
    if (!inner) return;
    if (currentView === 'favorites') {
      inner.innerHTML = [
        ['date-desc', '公開日(新しい順)'],
        ['date-asc',  '公開日(古い順)'],
        ['artist-asc', 'アーティスト名(A→Z)'],
        ['artist-desc','アーティスト名(Z→A)'],
        ['added-desc','追加日(新しい順)'],
        ['added-asc', '追加日(古い順)'],
      ].map(([mode, label]) =>
        `<button class="pl-sort-btn ${favSortMode === mode ? 'active' : ''}" onclick="setFavSort('${mode}')" aria-pressed="${favSortMode === mode}">${label}</button>`
      ).join('');
    } else {
      inner.innerHTML = [
        ['date-desc', '公開日(新しい順)'],
        ['date-asc',  '公開日(古い順)'],
        ['artist-asc', 'アーティスト名(A→Z)'],
        ['artist-desc','アーティスト名(Z→A)'],
      ].map(([mode, label]) =>
        `<button class="pl-sort-btn ${dbSortMode === mode ? 'active' : ''}" onclick="setDbSort('${mode}')" aria-pressed="${dbSortMode === mode}">${label}</button>`
      ).join('');
    }
  }

  function sortSongs(arr, mode) {
    const sorted = [...arr];
    if (mode === 'date-desc') {
      sorted.sort((a, b) => {
        if (!a.date) return 1; if (!b.date) return -1;
        return a.date > b.date ? -1 : a.date < b.date ? 1 : 0;
      });
    } else if (mode === 'date-asc') {
      sorted.sort((a, b) => {
        if (!a.date) return 1; if (!b.date) return -1;
        return a.date < b.date ? -1 : a.date > b.date ? 1 : 0;
      });
    } else if (mode === 'added-desc') {
      sorted.sort((a, b) => (favorites.get(b.id) || 0) - (favorites.get(a.id) || 0));
    } else if (mode === 'added-asc') {
      sorted.sort((a, b) => (favorites.get(a.id) || 0) - (favorites.get(b.id) || 0));
    } else if (mode === 'artist-asc') {
      sorted.sort((a, b) => compareSongsByArtist(a, b));
    } else if (mode === 'artist-desc') {
      sorted.sort((a, b) => compareSongsByArtist(b, a));
    }
    return sorted;
  }

  function compareNullableText(a, b) {
    const left = String(a || '').trim();
    const right = String(b || '').trim();
    if (!left && !right) return 0;
    if (!left) return 1;
    if (!right) return -1;
    return SORT_COLLATOR.compare(left, right);
  }

  function compareSongsByArtist(a, b) {
    return compareNullableText(a.artist, b.artist) ||
      compareNullableText(a.title, b.title) ||
      Number(a.id || 0) - Number(b.id || 0);
  }

  // ── Filters
  // ── Filter groups — tags within the same group are mutually exclusive
  const filterGroups = [
    ['original', 'cover'],           // Group 1: ORIGINAL / COVER
    ['solo', 'collab'],              // Group 2: SOLO / COLLAB
    ['band', 'acoustic', 'piano'],   // Group 3: BAND / ACOUSTIC / PIANO
    ['mv', 'stage'],                 // Group 4: MV / STAGE
  ];

  function getTagGroup(tag) {
    return filterGroups.find(g => g.includes(tag)) || [];
  }

  function toggleTag(el) {
    const tag = el.textContent.trim().toLowerCase();

    if (activeTags.has(tag)) {
      // Already active → deselect (toggle off)
      activeTags.delete(tag);
      el.classList.remove('active');
      el.setAttribute('aria-pressed', 'false');
    } else {
      // Deselect all other tags in the same group first
      const group = getTagGroup(tag);
      group.forEach(groupTag => {
        if (groupTag !== tag && activeTags.has(groupTag)) {
          activeTags.delete(groupTag);
          // Update DOM for the deselected sibling tag
          document.querySelectorAll('.tag').forEach(tagEl => {
            if (tagEl.textContent.trim().toLowerCase() === groupTag) {
              tagEl.classList.remove('active');
              tagEl.setAttribute('aria-pressed', 'false');
            }
          });
        }
      });
      // Select the clicked tag
      activeTags.add(tag);
      el.classList.add('active');
      el.setAttribute('aria-pressed', 'true');
    }

    updateFilterActiveDot();
    renderSongs();
  }

  function filterSongs(q) { searchQuery = q; renderSongs(); }

  function filterByCollab(name) {
    toggleCollabSelection(name);
  }

  function setNavActiveByLabel(label) {
    document.querySelectorAll('.nav-item').forEach(n => {
      const text = n.querySelector('span')?.textContent?.trim() || '';
      const isActive = text === label;
      n.classList.toggle('active', isActive);
      if (isActive) n.setAttribute('aria-current', 'page');
      else n.removeAttribute('aria-current');
    });
    closeMobileNav();
  }

  function scrollToSong(id) {
    setTimeout(() => {
      const row = document.querySelector(`[data-song-id="${id}"]`);
      if (row) row.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 80);
  }

  function setOriginalFilterActive() {
    activeTags.clear();
    document.querySelectorAll('.tag:not(.reset-tag)').forEach(t => {
      const isOriginal = t.textContent.trim().toLowerCase() === 'original';
      t.classList.toggle('active', isOriginal);
      t.setAttribute('aria-pressed', String(isOriginal));
      if (isOriginal) activeTags.add('original');
    });
    selectedCollabs.clear();
    renderCollabPopupList();
    document.querySelectorAll('.collab-chip').forEach(c => c.classList.remove('active'));
    updateFilterActiveDot();
  }

  function playHomeOriginal(id) {
    setNavActiveByLabel('Database');
    setView('database');
    setOriginalFilterActive();
    renderSongs();
    setQueueFromCurrentList();
    setShuffleState(false);
    playSong(id, { preserveQueue: true });
  }

  function playHomeRecommendation(id) {
    setNavActiveByLabel('Database');
    setView('database');
    renderSongs();
    setQueueFromCurrentList({ shuffle: true });
    setShuffleState(true);
    playSong(id, { preserveQueue: true });
  }

  function goDatabase() {
    setNavActiveByLabel('Database');
    setView('database');
  }

  // ── Nav
  function setNav(el) {
    document.querySelectorAll('.nav-item').forEach(n => {
      n.classList.remove('active');
      n.removeAttribute('aria-current');
    });
    el.classList.add('active');
    el.setAttribute('aria-current', 'page');
    closeMobileNav(); // close sidebar overlay on mobile after nav tap
    const label = el.querySelector('span')?.textContent?.trim() || '';
    if (label === 'Home')              setView('home');
    else if (label === 'My Favorites') setView('favorites');
    else if (label === 'Database')     setView('database');
    else if (label === 'Playlist')     setView('playlist');
    else if (label === 'About')        setView('about');
  }

  // ── Go home (wordmark click + mobile shortcut)
  function goHome() {
    const homeNav = document.querySelector('.nav-item:first-child');
    if (homeNav) setNav(homeNav);
  }

  // ── Mobile sidebar toggle
  function toggleMobileNav() {
    document.body.classList.toggle('mobile-nav-open');
  }
  function closeMobileNav() {
    document.body.classList.remove('mobile-nav-open');
  }

  // ── View switcher
  function setView(view) {
    currentView = view;
    closeCollabPopup();

    const topbar       = document.querySelector('.topbar');
    const content      = document.querySelector('.content');
    const playlistPage = document.getElementById('playlistPage');
    const homePage     = document.getElementById('homePage');
    const aboutPage    = document.getElementById('aboutPage');

    // Deactivate all full-page panels
    [playlistPage, homePage, aboutPage].forEach(p => p?.classList.remove('active'));

    // Full-page views (hide topbar + content)
    if (view === 'playlist' || view === 'home' || view === 'about') {
      topbar.style.display  = 'none';
      content.style.display = 'none';
      if (view === 'playlist') {
        playlistPage.classList.add('active');
        const activePlaylistExists = queueSource.type === 'playlist' &&
          queueSource.playlistId &&
          Boolean(findPlaylistById(queueSource.playlistId));
        currentPlaylistId = activePlaylistExists ? queueSource.playlistId : null;
        if (activePlaylistExists) playlistSearchQuery = '';
        renderPlaylistPage();
        if (activePlaylistExists && currentSong) scrollToSong(currentSong.id);
      } else if (view === 'home') {
        homePage.classList.add('active');
        homeNewPicks = [];
        homeRandomPicks = [];
        renderHomePage();
      } else {
        aboutPage.classList.add('active');
        renderAboutPage();
      }
      return;
    }

    // Database / Favorites
    topbar.style.display  = '';
    content.style.display = '';

    filterPanelOpen = false; sortPanelOpen = false;
    plSortPanelOpen = false;
    closeCollabPopup();
    document.getElementById('filterPanel')?.classList.remove('open');
    document.getElementById('sortPanel')?.classList.remove('open');
    document.getElementById('filterToggleBtn')?.classList.remove('open');
    document.getElementById('sortToggleBtn')?.classList.remove('open');
    syncPanelA11y('filterPanel', 'filterToggleBtn', false);
    syncPanelA11y('sortPanel', 'sortToggleBtn', false);

    updateSortPanel();

    searchQuery = '';
    document.querySelector('.search-input').value = '';
    activeTags.clear();
    document.querySelectorAll('.tag:not(.reset-tag)').forEach(t => {
      t.classList.remove('active');
      t.setAttribute('aria-pressed', 'false');
    });
    selectedCollabs.clear();
    renderCollabPopupList();
    updateFilterActiveDot();
    document.querySelectorAll('.collab-chip').forEach(c => c.classList.remove('active'));

    renderSongs();
  }

  // ── Sidebar collapse toggle
  function toggleSidebar() {
    document.body.classList.toggle('sidebar-collapsed');
  }

  // ── Dark / Light theme toggle
  function syncThemeIcon() {
    const icon = document.getElementById('themeIcon');
    if (!icon) return;
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    icon.innerHTML = isDark
      ? `<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>`
      : `<circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>`;
  }

  function toggleTheme() {
    const html = document.documentElement;
    const isDark = html.getAttribute('data-theme') === 'dark';
    html.setAttribute('data-theme', isDark ? 'light' : 'dark');
    syncThemeIcon();
  }

  // ── YouTube Side Panel
  function updateYtInfo() {
    if (!currentSong) return;
    document.getElementById('ytSongTitle').textContent  = currentSong.title;
    document.getElementById('ytSongArtist').textContent = currentSong.artist;
    document.getElementById('ytSongTags').innerHTML = currentSong.tags.map(t =>
      `<span class="song-tag ${t.toLowerCase()}">${t}</span>`).join('');

    // Collab chips
    const collabSection = document.getElementById('ytCollabSection');
    const collabChips   = document.getElementById('ytCollabChips');
    if (currentSong.collaborators && currentSong.collaborators.trim()) {
      const names = getSortedCollaborators(currentSong.collaborators);
      collabChips.innerHTML = names.map(n =>
        `<span class="collab-chip ${selectedCollabs.has(n) ? 'active' : ''}" onclick="filterByCollab('${n.replace(/'/g, "\\'")}')">${escapeHtml(n)}</span>`
      ).join('');
      collabSection.classList.remove('yt-hidden');
      collabSection.style.display = '';
    } else {
      collabChips.innerHTML = '';
      collabSection.classList.add('yt-hidden');
      collabSection.style.display = 'none';
    }

    const videoSection = document.getElementById('ytVideoSection');
    const videoTitle = document.getElementById('ytVideoTitle');
    if (currentSong.videoTitle && currentSong.videoTitle.trim()) {
      videoTitle.textContent = currentSong.videoTitle;
      videoTitle.href = `https://www.youtube.com/watch?v=${encodeURIComponent(currentSong.videoId)}`;
      videoSection.style.display = '';
    } else {
      videoSection.style.display = 'none';
    }

    // Date — already formatted as YYYY/MM/DD only
    const dateSection = document.getElementById('ytDateSection');
    if (currentSong.date) {
      document.getElementById('ytDateValue').textContent = currentSong.date;
      dateSection.style.display = '';
    } else {
      dateSection.style.display = 'none';
    }
  }

  function openYT() {
    document.getElementById('ytSide').classList.add('open');
    document.body.classList.add('yt-open');
    document.getElementById('ytMobileCloseBar')?.classList.add('show');
    updateYtInfo();
    if (!ytApiReady) { pendingPlay = true; return; }
    createYTPlayer();
  }

  function createYTPlayer() {
    stopProgressUpdate();
    if (!ytApiReady || !currentSong) { pendingPlay = true; return; }
    updateYtInfo();

    if (ytPlayer && typeof ytPlayer.loadVideoById === 'function') {
      // ── Reuse existing player: load new video
      ytPlayer.loadVideoById({
        videoId:      currentSong.videoId,
        startSeconds: Math.floor(currentSong.startSeconds || 0),
      });
      // Explicit playVideo() call — helps with iOS auto-advance (no guarantee
      // without user gesture, but worth trying; user can tap ▶ if blocked)
      try { ytPlayer.playVideo(); } catch(e) {}
    } else {
      // ── First load: create the player now, inside a visible element
      // and within the user-gesture call stack → iOS WebKit allows autoplay
      const embed = document.getElementById('ytEmbed');
      if (!embed) return;
      embed.innerHTML = '<div id="ytPlayerInner" style="width:100%;height:100%;"></div>';
      ytPlayer = new YT.Player('ytPlayerInner', {
        // No custom host — default youtube.com works best across all iOS browsers.
        // (youtube-nocookie.com conflicts with iOS ITP and can block initialization.)
        videoId: currentSong.videoId,
        playerVars: {
          autoplay:       1,   // Combined with user-gesture player creation → iOS allows it
          start:          Math.floor(currentSong.startSeconds || 0),
          enablejsapi:    1,
          playsinline:    1,   // CRITICAL for iOS: inline playback, not forced fullscreen
          rel:            0,
          modestbranding: 1,
          origin:         window.location.origin,
        },
        events: {
          onReady:       e => e.target.playVideo(),
          onStateChange: onPlayerStateChange,
        }
      });
    }
  }

  function onPlayerStateChange(event) {
    if (event.data === YT.PlayerState.PLAYING) {
      isPlaying = true; updatePlayIcon(); renderSongs();
      if (currentView === 'playlist' && currentPlaylistId) renderPlaylistPage();
      if (currentView === 'home') renderHomePage();
      startProgressUpdate();
    } else if (event.data === YT.PlayerState.PAUSED) {
      isPlaying = false; updatePlayIcon(); renderSongs();
      if (currentView === 'playlist' && currentPlaylistId) renderPlaylistPage();
      if (currentView === 'home') renderHomePage();
      stopProgressUpdate();
    } else if (event.data === YT.PlayerState.ENDED) {
      stopProgressUpdate(); playNext();
    }
  }

  // ── Progress
  function startProgressUpdate() {
    stopProgressUpdate();
    progressInterval = setInterval(() => {
      if (!ytPlayer || typeof ytPlayer.getCurrentTime !== 'function') return;
      try {
        if (isSeeking) return;
        const cur   = ytPlayer.getCurrentTime();
        const { start, end, total } = getTrackBounds();
        const elapsed = Math.max(0, cur - start);
        updateProgressUi(elapsed, total);

        if (currentSong.endSeconds && cur >= end) {
          stopProgressUpdate(); playNext();
        }
      } catch(e) {}
    }, 500);
  }

  function stopProgressUpdate() {
    if (progressInterval) { clearInterval(progressInterval); progressInterval = null; }
  }

  function formatTime(secs) {
    const s = Math.floor(secs);
    return Math.floor(s / 60) + ':' + String(s % 60).padStart(2, '0');
  }

  function formatTooltipTime(secs) {
    const s = Math.floor(Math.max(0, secs));
    return String(Math.floor(s / 60)).padStart(2, '0') + ':' + String(s % 60).padStart(2, '0');
  }

  function getTrackBounds(song = currentSong) {
    const start = Math.max(0, Number(song?.startSeconds || 0));
    let end = Number(song?.endSeconds || 0);
    if (!end && ytPlayer && typeof ytPlayer.getDuration === 'function') {
      try { end = Number(ytPlayer.getDuration() || 0); } catch(e) { end = 0; }
    }
    if (!end || end <= start) end = start;
    return { start, end, total: Math.max(0, end - start) };
  }

  function updateProgressUi(elapsed, total) {
    const safeTotal = Math.max(1, Number(total || 0));
    const safeElapsed = Math.max(0, Math.min(Number(elapsed || 0), safeTotal));
    document.getElementById('progressFill').style.width = Math.min(safeElapsed / safeTotal * 100, 100) + '%';
    document.getElementById('currentTime').textContent  = formatTime(safeElapsed);
    document.getElementById('totalTime').textContent    = total ? formatTime(total) : '0:00';
  }

  function seekPercentFromEvent(e) {
    const bar = document.getElementById('progressBar');
    const rect = bar.getBoundingClientRect();
    const pct = (e.clientX - rect.left) / rect.width;
    return Math.max(0, Math.min(1, pct));
  }

  function updateSeekPreview(e) {
    if (!currentSong) return null;
    const bar = document.getElementById('progressBar');
    const tooltip = document.getElementById('progressTooltip');
    const marker = document.getElementById('progressPreviewMarker');
    const { total } = getTrackBounds();
    const pct = seekPercentFromEvent(e);
    const elapsed = pct * Math.max(0, total);
    document.getElementById('progressFill').style.width = (pct * 100) + '%';
    document.getElementById('currentTime').textContent = formatTime(elapsed);
    tooltip.textContent = formatTooltipTime(elapsed);
    tooltip.style.left = (pct * 100) + '%';
    marker.style.left = (pct * 100) + '%';
    bar.classList.add('seeking');
    return elapsed;
  }

  function updateHoverPreview(e) {
    if (!currentSong) return;
    const tooltip = document.getElementById('progressTooltip');
    const marker = document.getElementById('progressPreviewMarker');
    const { total } = getTrackBounds();
    const pct = seekPercentFromEvent(e);
    const elapsed = pct * Math.max(0, total);
    tooltip.textContent = formatTooltipTime(elapsed);
    tooltip.style.left = (pct * 100) + '%';
    marker.style.left = (pct * 100) + '%';
  }

  function previewSeek(e) {
    if (isSeeking) updateSeekPreview(e);
    else updateHoverPreview(e);
  }

  function beginSeek(e) {
    e.preventDefault();
    if (!currentSong) return;
    isSeeking = true;
    e.currentTarget.setPointerCapture?.(e.pointerId);
    updateSeekPreview(e);
    document.addEventListener('pointermove', dragSeek);
    document.addEventListener('pointerup', commitSeek, { once: true });
  }

  function dragSeek(e) {
    if (!isSeeking) return;
    updateSeekPreview(e);
  }

  function commitSeek(e) {
    if (!isSeeking) return;
    const elapsed = updateSeekPreview(e);
    const { start, total } = getTrackBounds();
    const clampedElapsed = Math.max(0, Math.min(elapsed || 0, total));
    const target = start + clampedElapsed;
    if (ytPlayer && typeof ytPlayer.seekTo === 'function') {
      try { ytPlayer.seekTo(target, true); } catch(err) {}
    }
    updateProgressUi(clampedElapsed, total);
    isSeeking = false;
    document.removeEventListener('pointermove', dragSeek);
    hideSeekTooltip();
  }

  function hideSeekTooltip() {
    if (!isSeeking) document.getElementById('progressBar')?.classList.remove('seeking');
  }

  function closeYT() {
    document.getElementById('ytSide').classList.remove('open');
    document.body.classList.remove('yt-open');
    document.getElementById('ytMobileCloseBar')?.classList.remove('show');
    stopProgressUpdate();
    if (ytPlayer) { try { ytPlayer.destroy(); } catch(e){} ytPlayer = null; }
    document.getElementById('ytEmbed').innerHTML = '';
    isPlaying = false;
    updatePlayIcon();
    renderSongs();
  }

  // ── Volume
  let volumeOpen = false;

  function toggleVolumePopup(e) {
    e.stopPropagation();
    volumeOpen = !volumeOpen;
    document.getElementById('volumePopup').classList.toggle('open', volumeOpen);
    document.getElementById('volumeBtn').classList.toggle('active', volumeOpen);
  }

  function setVolume(val) {
    const v = parseInt(val, 10);
    document.getElementById('volumeLabel').textContent = v;
    const icon = document.getElementById('volumeIcon');
    if (v === 0) {
      icon.innerHTML = `<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/>`;
    } else if (v < 50) {
      icon.innerHTML = `<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 010 7.07"/>`;
    } else {
      icon.innerHTML = `<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 010 14.14"/><path d="M15.54 8.46a5 5 0 010 7.07"/>`;
    }
    if (ytPlayer && typeof ytPlayer.setVolume === 'function') ytPlayer.setVolume(v);
  }

  document.addEventListener('click', (e) => {
    if (volumeOpen) {
      volumeOpen = false;
      document.getElementById('volumePopup').classList.remove('open');
      document.getElementById('volumeBtn').classList.remove('active');
    }

  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeManualRecordDetail();
      closeCollabPopup();
    }
  });

  window.addEventListener('resize', () => {
    if (collabPopupOpen && !collabShowMore) renderCollabPopupList();
  });

  // ── Playlist ──────────────────────────────────
  const LS_PLAYLIST_KEY = 'inami_playlists_v1';
  const LS_PLAYLIST_VIEW_KEY = 'inami_playlist_view_mode_v1';
  const DEFAULT_PLAYLISTS = window.MISOLABO_DEFAULT_PLAYLISTS || [];
  let playlists = [];
  let currentPlaylistId = null;   // null = grid view, else detail view
  let playlistViewMode = 'card';  // 'card' | 'list'
  let plDetailSortMode  = 'added-asc'; // 'added' | 'date' | 'artist'
  let playlistSearchQuery = '';
  let modalSelectedPlaylists = new Set();
  let modalTargetSongId = null;
  let toastTimer = null;

  function loadPlaylistsFromStorage() {
    try {
      const raw = localStorage.getItem(LS_PLAYLIST_KEY);
      if (raw) playlists = JSON.parse(raw);
    } catch(e) { playlists = []; }
    try {
      const mode = localStorage.getItem(LS_PLAYLIST_VIEW_KEY);
      if (mode === 'card' || mode === 'list') playlistViewMode = mode;
    } catch(e) {}
  }

  function savePlaylistsToStorage() {
    try { localStorage.setItem(LS_PLAYLIST_KEY, JSON.stringify(playlists)); } catch(e) {}
  }

  function savePlaylistViewMode() {
    try { localStorage.setItem(LS_PLAYLIST_VIEW_KEY, playlistViewMode); } catch(e) {}
  }

  function normalizePlaylistText(value) {
    return String(value || '').trim().toLowerCase();
  }

  function findSongByRef(ref) {
    const title = normalizePlaylistText(ref.title);
    const artist = normalizePlaylistText(ref.artist);
    const videoId = normalizePlaylistText(ref.videoId);

    if (videoId && title && artist) {
      const exact = songs.find(song =>
        normalizePlaylistText(song.videoId) === videoId &&
        normalizePlaylistText(song.title) === title &&
        normalizePlaylistText(song.artist) === artist
      );
      if (exact) return exact;
    }

    if (videoId && title) {
      const byVideoAndTitle = songs.find(song =>
        normalizePlaylistText(song.videoId) === videoId &&
        normalizePlaylistText(song.title) === title
      );
      if (byVideoAndTitle) return byVideoAndTitle;
    }

    return songs.find(song =>
      normalizePlaylistText(song.title) === title &&
      (!artist || normalizePlaylistText(song.artist) === artist)
    ) || songs.find(song => normalizePlaylistText(song.title) === title) || null;
  }

  function resolveDefaultPlaylist(pl) {
    const resolvedSongs = (pl.songRefs || [])
      .map((ref, index) => {
        const song = findSongByRef(ref);
        return song ? { songId: song.id, addedAt: index + 1 } : null;
      })
      .filter(Boolean);

    return {
      ...pl,
      isDefault: true,
      createdAt: 0,
      songs: resolvedSongs,
    };
  }

  function getDefaultPlaylists() {
    return DEFAULT_PLAYLISTS.map(resolveDefaultPlaylist);
  }

  function getAllPlaylists() {
    return [
      ...getDefaultPlaylists(),
      ...playlists.map(pl => ({ ...pl, isDefault: false })),
    ];
  }

  function findPlaylistById(id) {
    return getAllPlaylists().find(pl => pl.id === id) || null;
  }

  function genPlaylistId() {
    return 'pl_' + Date.now() + '_' + Math.random().toString(36).slice(2, 6);
  }

  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  // ── CRUD
  function createPlaylist(name) {
    const trimmed = name ? name.trim() : '';
    if (!trimmed) return;
    playlists.push({ id: genPlaylistId(), name: trimmed, createdAt: Date.now(), songs: [] });
    savePlaylistsToStorage();
    renderPlaylistPage();
  }

  function deletePlaylist(id, e) {
    e.stopPropagation();
    if (findPlaylistById(id)?.isDefault) return;
    if (!confirm('Delete this playlist?')) return;
    playlists = playlists.filter(p => p.id !== id);
    if (currentPlaylistId === id) currentPlaylistId = null;
    savePlaylistsToStorage();
    renderPlaylistPage();
  }

  function removeSongFromPlaylist(playlistId, songId, e) {
    e.stopPropagation();
    if (findPlaylistById(playlistId)?.isDefault) return;
    const pl = playlists.find(p => p.id === playlistId);
    if (!pl) return;
    pl.songs = pl.songs.filter(s => s.songId !== songId);
    savePlaylistsToStorage();
    renderPlaylistPage();
  }

  // ── Navigation
  function openPlaylistDetail(id) {
    currentPlaylistId = id;
    plDetailSortMode  = 'added-asc';
    playlistSearchQuery = '';
    renderPlaylistPage();
  }

  function backToPlaylists() {
    currentPlaylistId = null;
    playlistSearchQuery = '';
    renderPlaylistPage();
  }

  function setPlaylistViewMode(mode) {
    if (mode !== 'card' && mode !== 'list') return;
    playlistViewMode = mode;
    savePlaylistViewMode();
    renderPlaylistPage();
  }

  function setPlSort(mode) {
    plDetailSortMode = mode;
    renderPlaylistPage();
  }

  // ── Render dispatcher
  function renderPlaylistPage() {
    const page = document.getElementById('playlistPage');
    if (!page) return;
    currentPlaylistId ? renderPlaylistDetail(page, currentPlaylistId) : renderPlaylistGrid(page);
  }

  function getPlaylistUpdatedAt(pl) {
    if (pl.isDefault) {
      const songDates = (pl.songs || [])
        .map(item => songs.find(song => song.id === item.songId)?.date)
        .filter(Boolean)
        .map(date => new Date(String(date).replace(/\//g, '-')).getTime())
        .filter(Number.isFinite);
      return songDates.length ? Math.max(...songDates) : 0;
    }
    const songTimes = (pl.songs || []).map(s => s.addedAt || 0);
    return Math.max(pl.createdAt || 0, ...songTimes);
  }

  function formatPlaylistDate(ts) {
    if (!ts) return '—';
    const d = new Date(ts);
    return `${d.getFullYear()}/${String(d.getMonth() + 1).padStart(2, '0')}/${String(d.getDate()).padStart(2, '0')}`;
  }

  function getPlaylistCoverSong(pl) {
    return (pl.songs || [])
      .map(item => songs.find(s => s.id === item.songId))
      .filter(Boolean)
      .sort((a, b) => {
        if (!a.date) return 1; if (!b.date) return -1;
        return a.date > b.date ? -1 : a.date < b.date ? 1 : 0;
      })[0] || null;
  }

  function renderPlaylistCover(pl) {
    const coverSong = getPlaylistCoverSong(pl);
    if (coverSong?.videoId) {
      return `<img src="${getYouTubeThumbnail(coverSong.videoId)}" data-video-id="${escapeHtml(coverSong.videoId)}" alt="${escapeHtml(coverSong.title)}" loading="lazy" onload="validateYouTubeThumbnail(this)" onerror="fallbackYouTubeThumbnail(this)">`;
    }
    return `<svg class="pl-card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round">${ICON_PLAYLIST_LINES}</svg>`;
  }

  // ── Grid view (all playlists)
  function renderPlaylistGrid(page) {
    const playlistItems = getAllPlaylists().map(pl => {
      const updatedAt = formatPlaylistDate(getPlaylistUpdatedAt(pl));
      return { ...pl, updatedAt };
    });

    page.innerHTML = `
      <div class="pl-topbar">
        <div class="pl-topbar-row">
          <div style="flex:1;"></div>
          <div class="pl-view-toggle" aria-label="Playlist view mode">
            <button class="pl-view-btn ${playlistViewMode === 'card' ? 'active' : ''}" onclick="setPlaylistViewMode('card')" aria-pressed="${playlistViewMode === 'card'}">Card</button>
            <button class="pl-view-btn ${playlistViewMode === 'list' ? 'active' : ''}" onclick="setPlaylistViewMode('list')" aria-pressed="${playlistViewMode === 'list'}">List</button>
          </div>
        </div>
      </div>
      <div class="pl-content">
        <div class="list-action-bar">
          <button class="queue-action-btn primary" onclick="showCreatePlaylistForm()">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            New Playlist
          </button>
        </div>
        <div id="plCreateArea"></div>
        ${playlistItems.length === 0
          ? `<div class="pl-empty">
              <div class="pl-empty-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round">${ICON_PLAYLIST_LINES}</svg>
              </div>
              <div class="pl-empty-title">No Playlists Yet</div>
              <div class="pl-empty-sub">Create a playlist, then add songs<br>from the player ＋ button.</div>
              <div class="pl-empty-actions">
                <button class="queue-action-btn" onclick="goDatabase()">
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>
                  Browse Database
                </button>
              </div>
            </div>`
          : playlistViewMode === 'card'
            ? `<div class="pl-grid">
              ${playlistItems.map(pl => `
                <div class="pl-card ${pl.isDefault ? 'pl-card-pickup' : ''}" onclick="openPlaylistDetail('${pl.id}')">
                  <div class="pl-card-cover">${renderPlaylistCover(pl)}</div>
                  <div class="pl-card-info">
                    <div class="pl-name-row">
                      <div class="pl-card-name">${escapeHtml(pl.name)}</div>
                      ${pl.isDefault ? `<div class="pl-pickup-badge">${escapeHtml(pl.badge || 'PICK UP')}</div>` : ''}
                    </div>
                    <div class="pl-card-count">${pl.songs.length} songs</div>
                    <div class="pl-card-updated">Updated ${pl.updatedAt}</div>
                  </div>
                  ${pl.isDefault ? '' : `<button class="pl-delete-btn card" onclick="deletePlaylist('${pl.id}', event)" title="削除" aria-label="Delete ${escapeHtml(pl.name)}">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <polyline points="3 6 5 6 21 6"/>
                      <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/>
                      <path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/>
                    </svg>
                  </button>`}
                </div>`).join('')}
            </div>`
            : `<div class="pl-list">
              ${playlistItems.map(pl => `
                <div class="pl-list-row ${pl.isDefault ? 'pl-list-row-pickup' : ''}" onclick="openPlaylistDetail('${pl.id}')">
                  ${pl.isDefault
                    ? `<svg class="pl-list-icon pickup" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="12 2 14.95 8.17 21.76 9.09 16.82 13.82 18.04 20.56 12 17.28 5.96 20.56 7.18 13.82 2.24 9.09 9.05 8.17 12 2"/></svg>`
                    : `<svg class="pl-list-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round">${ICON_PLAYLIST_LINES}</svg>`}
                  <div class="pl-list-main">
                    <div class="pl-name-row">
                      <div class="pl-list-name">${escapeHtml(pl.name)}</div>
                      ${pl.isDefault ? `<div class="pl-pickup-badge">${escapeHtml(pl.badge || 'PICK UP')}</div>` : ''}
                    </div>
                    <div class="pl-list-meta">Updated ${pl.updatedAt}</div>
                  </div>
                  <div class="pl-list-count">${pl.songs.length} songs</div>
                  ${pl.isDefault ? '<span></span>' : `<button class="pl-delete-btn list" onclick="deletePlaylist('${pl.id}', event)" title="削除" aria-label="Delete ${escapeHtml(pl.name)}">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <polyline points="3 6 5 6 21 6"/>
                      <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/>
                      <path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/>
                    </svg>
                  </button>`}
                </div>`).join('')}
            </div>`}
      </div>`;
  }

  // ── Create playlist inline form
  function showCreatePlaylistForm() {
    const area = document.getElementById('plCreateArea');
    if (!area || area.innerHTML.trim()) return;
    area.innerHTML = `
      <div class="pl-create-panel">
        <div class="pl-create-panel-row">
          <input class="pl-create-input" id="plNameInput" type="text"
            placeholder="PLAYLIST NAME"
            onkeydown="if(event.key==='Enter') submitCreatePlaylist()">
          <button class="queue-action-btn primary" onclick="submitCreatePlaylist()">Create</button>
          <button class="queue-action-btn" onclick="cancelCreatePlaylist()">Cancel</button>
        </div>
      </div>`;
    setTimeout(() => { const inp = document.getElementById('plNameInput'); if (inp) inp.focus(); }, 50);
  }

  function submitCreatePlaylist() {
    const input = document.getElementById('plNameInput');
    if (!input) return;
    const name = input.value.trim();
    if (!name) { input.focus(); return; }
    createPlaylist(name);
  }

  function cancelCreatePlaylist() {
    const area = document.getElementById('plCreateArea');
    if (area) area.innerHTML = '';
  }

  function getPlaylistDetailSongs(id) {
    const pl = findPlaylistById(id);
    if (!pl) return [];

    let detailSongs = pl.songs.map(s => {
      const song = songs.find(sg => sg.id === s.songId);
      return song ? { ...song, addedAt: s.addedAt } : null;
    }).filter(Boolean);

    if (plDetailSortMode === 'added-asc') {
      detailSongs = [...detailSongs].sort((a, b) => a.addedAt - b.addedAt);
    } else if (plDetailSortMode === 'added-desc') {
      detailSongs = [...detailSongs].sort((a, b) => b.addedAt - a.addedAt);
    } else if (plDetailSortMode === 'date-asc') {
      detailSongs = [...detailSongs].sort((a, b) => {
        if (!a.date) return 1; if (!b.date) return -1;
        return a.date < b.date ? -1 : a.date > b.date ? 1 : 0;
      });
    } else if (plDetailSortMode === 'date-desc') {
      detailSongs = [...detailSongs].sort((a, b) => {
        if (!a.date) return 1; if (!b.date) return -1;
        return a.date > b.date ? -1 : a.date < b.date ? 1 : 0;
      });
    } else if (plDetailSortMode === 'artist-asc') {
      detailSongs = [...detailSongs].sort((a, b) => compareSongsByArtist(a, b));
    } else if (plDetailSortMode === 'artist-desc') {
      detailSongs = [...detailSongs].sort((a, b) => compareSongsByArtist(b, a));
    }

    return detailSongs;
  }

  function getVisiblePlaylistSongs(id) {
    const q = playlistSearchQuery.toLowerCase();
    return getPlaylistDetailSongs(id).filter(s => {
      if (!q) return true;
      return s.title.toLowerCase().includes(q) ||
        s.artist.toLowerCase().includes(q) ||
        (s.collaborators && s.collaborators.toLowerCase().includes(q));
    });
  }

  function filterPlaylistSongs(q) {
    playlistSearchQuery = q;
    renderPlaylistPage();
  }

  function playPlaylistSequential(id) {
    const ids = getVisiblePlaylistSongs(id).map(s => s.id);
    setQueueSource('playlist', ids, id);
    setShuffleState(false);
    const first = getPlaybackQueue()[0];
    if (first) playSong(first.id, { preserveQueue: true });
  }

  function playPlaylistShuffle(id) {
    const ids = shuffleIds(getVisiblePlaylistSongs(id).map(s => s.id));
    setQueueSource('playlist', ids, id);
    setShuffleState(true);
    const first = getPlaybackQueue()[0];
    if (first) playSong(first.id, { preserveQueue: true });
  }

  // ── Detail view (single playlist)
  function renderPlaylistDetail(page, id) {
    const pl = findPlaylistById(id);
    if (!pl) { currentPlaylistId = null; renderPlaylistPage(); return; }

    const detailSongs = getVisiblePlaylistSongs(id);

    const detailSongIds = detailSongs.map(s => s.id);

    page.innerHTML = `
      <div class="pl-topbar">
        <div class="pl-topbar-row">
          <div class="topbar-controls">
            <button class="pl-back-btn" onclick="backToPlaylists()">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"/></svg>
              Back
            </button>
            <button class="topbar-toggle-btn ${plSortPanelOpen ? 'open' : ''}" id="plSortToggleBtn" onclick="togglePlaylistSortPanel()" title="Sort" aria-label="Sort" aria-controls="plSortPanel" aria-expanded="${plSortPanelOpen}">
              <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="6" x2="21" y2="6"/><line x1="6" y1="12" x2="18" y2="12"/><line x1="9" y1="18" x2="15" y2="18"/></svg>
              <span class="topbar-toggle-label">Sort</span>
              <svg class="toggle-chevron" width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
            </button>
          </div>
          <div class="search-wrap">
            <svg class="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <input class="search-input" type="text" placeholder="SEARCH" value="${escapeHtml(playlistSearchQuery)}" oninput="filterPlaylistSongs(this.value)">
          </div>
          <span class="song-count" style="flex-shrink:0;">${detailSongs.length} songs</span>
        </div>
        <div class="collapsible-panel ${plSortPanelOpen ? 'open' : ''}" id="plSortPanel" aria-hidden="${!plSortPanelOpen}">
        <div class="pl-detail-sort control-chip-row">
          <button class="pl-sort-btn ${plDetailSortMode === 'date-desc'  ? 'active' : ''}" onclick="setPlSort('date-desc')" aria-pressed="${plDetailSortMode === 'date-desc'}">公開日(新しい順)</button>
          <button class="pl-sort-btn ${plDetailSortMode === 'date-asc'   ? 'active' : ''}" onclick="setPlSort('date-asc')" aria-pressed="${plDetailSortMode === 'date-asc'}">公開日(古い順)</button>
          <button class="pl-sort-btn ${plDetailSortMode === 'artist-asc'  ? 'active' : ''}" onclick="setPlSort('artist-asc')" aria-pressed="${plDetailSortMode === 'artist-asc'}">アーティスト名(A→Z)</button>
          <button class="pl-sort-btn ${plDetailSortMode === 'artist-desc' ? 'active' : ''}" onclick="setPlSort('artist-desc')" aria-pressed="${plDetailSortMode === 'artist-desc'}">アーティスト名(Z→A)</button>
          <button class="pl-sort-btn ${plDetailSortMode === 'added-desc' ? 'active' : ''}" onclick="setPlSort('added-desc')" aria-pressed="${plDetailSortMode === 'added-desc'}">追加日(新しい順)</button>
          <button class="pl-sort-btn ${plDetailSortMode === 'added-asc'  ? 'active' : ''}" onclick="setPlSort('added-asc')" aria-pressed="${plDetailSortMode === 'added-asc'}">追加日(古い順)</button>
        </div>
        </div>
      </div>
      <div class="pl-content">
        <div class="pl-detail-title-block">
          <div class="pl-detail-title">${escapeHtml(pl.name)}</div>
          ${pl.isDefault && pl.description ? `<div class="pl-detail-description">${escapeHtml(pl.description)}</div>` : ''}
        </div>
        ${detailSongs.length ? `
          <div class="list-action-bar">
            <button class="queue-action-btn primary" onclick="playPlaylistSequential('${id}')">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
              Play
            </button>
            <button class="queue-action-btn" onclick="playPlaylistShuffle('${id}')">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 3 21 3 21 8"/><line x1="4" y1="20" x2="21" y2="3"/><polyline points="21 16 21 21 16 21"/><line x1="15" y1="15" x2="21" y2="21"/><line x1="4" y1="4" x2="9" y2="9"/></svg>
              Shuffle
            </button>
          </div>` : ''}
        ${detailSongs.length === 0
          ? `<div class="pl-empty">
              <div class="pl-empty-icon">
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                  <path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>
                </svg>
              </div>
              <div class="pl-empty-title">${playlistSearchQuery ? 'No Results' : '曲がありません'}</div>
              <div class="pl-empty-sub">${playlistSearchQuery ? 'Search another keyword.' : 'プレイヤーの ＋ ボタンから<br>曲を追加してください。'}</div>
              ${playlistSearchQuery ? '' : `
                <div class="pl-empty-actions">
                  <button class="queue-action-btn" onclick="goDatabase()">
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>
                    Browse Database
                  </button>
                </div>`}
            </div>`
          : `<div class="pl-detail-list" id="plDetailList">
              ${detailSongs.map((s, i) => `
                <div class="pl-detail-row ${currentSong && s.id === currentSong.id ? 'playing' : ''}"
                  data-song-id="${s.id}"
                  onclick="playSong(${s.id}, { type: 'playlist', playlistId: '${id}', songIds: ${JSON.stringify(detailSongIds)} })">
                  <div class="song-index">
                    <span class="song-num">${i + 1}</span>
                    <svg class="song-play-icon" viewBox="0 0 24 24" fill="currentColor">
                      ${currentSong && s.id === currentSong.id && isPlaying
                        ? '<rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/>'
                        : '<polygon points="5 3 19 12 5 21 5 3"/>'}
                    </svg>
                  </div>
                  <div class="song-info">
                    <div class="song-title">${escapeHtml(s.title)}</div>
                    <div class="song-artist">${escapeHtml(s.artist)}</div>
                    ${s.collaborators ? `<div class="song-collab-row">with ${escapeHtml(formatCollabs(s.collaborators))}</div>` : ''}
                  </div>
                  <div class="song-meta">
                    ${s.tags.map(t => `<span class="song-tag ${t.toLowerCase()}">${escapeHtml(t)}</span>`).join('')}
                    ${pl.isDefault ? '' : `<button class="pl-row-del" onclick="removeSongFromPlaylist('${id}', ${s.id}, event)" title="削除">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                      </svg>
                    </button>`}
                  </div>
                </div>`).join('')}
            </div>`}
      </div>`;
  }

  // ── Add-to-Playlist Modal
  function getModalTargetSong() {
    return songs.find(song => song.id === modalTargetSongId) || null;
  }

  function showToast(message) {
    const toast = document.getElementById('appToast');
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('show'), 2400);
  }

  function openAddToPlaylist(e, songId = null) {
    e?.stopPropagation();
    const targetSong = songId
      ? songs.find(song => song.id === Number(songId))
      : currentSong;
    if (!targetSong) return;
    modalTargetSongId = targetSong.id;
    modalSelectedPlaylists = new Set(
      playlists.filter(p => p.songs.some(s => s.songId === targetSong.id)).map(p => p.id)
    );
    document.getElementById('modalSongName').textContent = targetSong.title;
    const input = document.getElementById('modalNewPlaylistInput');
    if (input) input.value = '';
    renderModalPlaylistList();
    document.getElementById('addToPlaylistOverlay').classList.add('open');
  }

  function closeAddToPlaylistModal() {
    document.getElementById('addToPlaylistOverlay').classList.remove('open');
    modalSelectedPlaylists = new Set();
    modalTargetSongId = null;
  }

  function renderModalPlaylistList() {
    const list = document.getElementById('modalPlaylistList');
    if (!list) return;
    if (playlists.length === 0) {
      list.innerHTML = `
        <div style="padding:28px 18px;text-align:center;color:var(--text-muted);font-family:'Space Mono',monospace;font-size:9px;letter-spacing:0.15em;text-transform:uppercase;line-height:2.2;">
          No playlists yet.<br>
          <span style="opacity:0.6;font-size:8px;">Go to PLAYLIST in the sidebar to create one.</span>
        </div>`;
      return;
    }
    list.innerHTML = playlists.map(pl => {
      const isChecked = modalSelectedPlaylists.has(pl.id);
      return `
        <div class="modal-pl-item" onclick="toggleModalPlaylist('${pl.id}')">
          <div class="modal-pl-check ${isChecked ? 'checked' : ''}">
            ${isChecked
              ? `<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="var(--text-inv)" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>`
              : ''}
          </div>
          <div class="modal-pl-name">${escapeHtml(pl.name)}</div>
          <div class="modal-pl-count">${pl.songs.length}</div>
        </div>`;
    }).join('');
  }

  function createPlaylistFromModal() {
    const input = document.getElementById('modalNewPlaylistInput');
    const targetSong = getModalTargetSong();
    if (!input || !targetSong) return;
    const name = input.value.trim();
    if (!name) { input.focus(); return; }
    const newPlaylist = {
      id: genPlaylistId(),
      name,
      createdAt: Date.now(),
      songs: [],
    };
    playlists.push(newPlaylist);
    modalSelectedPlaylists.add(newPlaylist.id);
    savePlaylistsToStorage();
    input.value = '';
    renderModalPlaylistList();
    if (currentView === 'playlist') renderPlaylistPage();
  }

  function toggleModalPlaylist(id) {
    modalSelectedPlaylists.has(id) ? modalSelectedPlaylists.delete(id) : modalSelectedPlaylists.add(id);
    renderModalPlaylistList();
  }

  function confirmAddToPlaylist() {
    const targetSong = getModalTargetSong();
    if (!targetSong) { closeAddToPlaylistModal(); return; }
    const now = Date.now();
    let addedCount = 0;
    playlists.forEach(pl => {
      const idx = pl.songs.findIndex(s => s.songId === targetSong.id);
      if (modalSelectedPlaylists.has(pl.id)) {
        if (idx === -1) pl.songs.push({ songId: targetSong.id, addedAt: now });
        addedCount += 1;
      } else {
        if (idx !== -1) pl.songs.splice(idx, 1);
      }
    });
    savePlaylistsToStorage();
    closeAddToPlaylistModal();
    showToast(addedCount ? `Saved to ${addedCount} playlist${addedCount === 1 ? '' : 's'}` : 'Removed from playlists');
    if (currentView === 'playlist' && currentPlaylistId) renderPlaylistPage();
  }

  // ── Home Page ──────────────────────────────────
  function getSongDateValue(song) {
    if (!song?.date) return 0;
    const time = Date.parse(String(song.date).replace(/\//g, '-'));
    return Number.isFinite(time) ? time : 0;
  }

  function pickRandomSong(list) {
    return list[Math.floor(Math.random() * list.length)];
  }

  function getLatestVideoRandomPicks(limit = 4) {
    const videoGroups = new Map();

    songs
      .filter(song => {
        return song.recordKind !== 'manual' && song.isPlayable && song.videoId;
      })
      .forEach(song => {
        const dateValue = getSongDateValue(song);
        const group = videoGroups.get(song.videoId);
        if (group) {
          group.songs.push(song);
          if (dateValue > group.dateValue) {
            group.date = song.date || '';
            group.dateValue = dateValue;
          }
          return;
        }

        videoGroups.set(song.videoId, {
          videoId: song.videoId,
          date: song.date || '',
          dateValue,
          songs: [song],
        });
      });

    return [...videoGroups.values()]
      .sort((a, b) => {
        if (a.dateValue !== b.dateValue) return b.dateValue - a.dateValue;
        return SORT_COLLATOR.compare(b.date || '', a.date || '') ||
          SORT_COLLATOR.compare(a.videoId, b.videoId);
      })
      .slice(0, limit)
      .map(group => ({
        song: pickRandomSong(group.songs),
        dateValue: group.dateValue,
        videoId: group.videoId,
      }))
      .sort((a, b) => {
        if (a.dateValue !== b.dateValue) return b.dateValue - a.dateValue;
        return SORT_COLLATOR.compare(a.videoId, b.videoId);
      })
      .map(item => item.song);
  }

  function renderHomePage() {
    const page = document.getElementById('homePage');
    if (!page) return;

    if (!songs.length) {
      page.innerHTML = `
        <div style="flex:1;display:flex;align-items:center;justify-content:center;">
          <div style="color:var(--text-muted);font-family:'Space Mono',monospace;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;">Loading...</div>
        </div>`;
      return;
    }

    // Original songs by 伊波ライ — sorted newest first
    const originals = songs
      .filter(s => (s.artist || '').includes('伊波ライ') && s.tags.some(t => t.toLowerCase() === 'original') && s.isPlayable)
      .sort((a, b) => {
        if (!a.date) return 1; if (!b.date) return -1;
        return a.date > b.date ? -1 : a.date < b.date ? 1 : 0;
      });

    // Random picks: 8 playable songs (excluding originals)
    if (!homeRandomPicks.length) {
      const origIds = new Set(originals.map(s => s.id));
      const pool = songs.filter(s => s.isPlayable && !origIds.has(s.id));
      homeRandomPicks = [...pool].sort(() => Math.random() - 0.5).slice(0, 8);
    }

    if (!homeNewPicks.length) {
      homeNewPicks = getLatestVideoRandomPicks(4);
    }

    const cardHtml = (list, showCollab = true, clickMode = 'song') => list.map(s => {
      const collabStr = showCollab ? formatCollabsJP(s.collaborators) : '';
      const overlayCollabStr = formatCollabsJP(s.collaborators);
      const recommendationTypeTag = clickMode === 'recommendation'
        ? [(s.collaborators || '').trim() ? 'COLLAB' : 'SOLO']
        : [];
      const cardTags = [...new Set([...recommendationTypeTag, ...(s.tags || [])])];
      const clickHandler = clickMode === 'original'
        ? `playHomeOriginal(${s.id})`
        : clickMode === 'recommendation'
          ? `playHomeRecommendation(${s.id})`
          : `playSong(${s.id}, { source: 'current-list' })`;
      return `
      <div class="home-card ${currentSong && s.id === currentSong.id ? 'playing' : ''}" onclick="${clickHandler}">
        <img class="home-card-thumb"
          src="${getYouTubeThumbnail(s.videoId)}"
          data-video-id="${escapeHtml(s.videoId)}"
          alt="${escapeHtml(s.title)}" loading="lazy"
          onload="validateYouTubeThumbnail(this)"
          onerror="fallbackYouTubeThumbnail(this)">
        <div class="home-card-overlay">
          <div class="home-card-overlay-inner">
            <div class="home-card-overlay-title">${escapeHtml(s.title)}</div>
            <div class="home-card-overlay-artist">${escapeHtml(s.artist)}</div>
            ${overlayCollabStr ? `<div class="home-card-overlay-collab">${escapeHtml(overlayCollabStr)}</div>` : ''}
            ${s.date ? `<div class="home-card-overlay-date">${escapeHtml(s.date)}</div>` : ''}
          </div>
        </div>
        <div class="home-card-info">
          <div class="home-card-title">${escapeHtml(s.title)}</div>
          <div class="home-card-artist">${escapeHtml(s.artist)}</div>
          ${collabStr ? `<div class="home-card-collab">w/ ${escapeHtml(collabStr)}</div>` : ''}
          ${cardTags.length ? `<div class="home-card-tags">${cardTags.map(t=>`<span class="song-tag ${t.toLowerCase()}">${escapeHtml(t)}</span>`).join('')}</div>` : ''}
        </div>
      </div>`;
    }).join('');

    page.innerHTML = `
      <div class="home-content">

        <!-- Artist profile -->
        <div class="home-section">
          <div class="profile-card">
            <div class="profile-avatar" id="profileAvatar">
              <img src="profile/profile_inami.png"
                   alt="伊波ライ"
                   onerror="this.parentElement.innerHTML='ラ'">
            </div>
            <div class="profile-info">
              <div class="profile-name">伊波ライ</div>
              <div class="profile-name-en">Inami Rai / にじさんじ</div>
              <div class="profile-bio">
                機械いじりの趣味が高じて、ヒーローたちのメカニックを務めることに。<br>
                さらにその技術を転用して、自分もヒーローになってしまった。<br>
                場所柄あまり作った機械が理解されないのが悩み。
              </div>
              <div class="profile-links">
                <a class="profile-link yt" href="https://www.youtube.com/@InamiRai" target="_blank" rel="noopener">
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                  YouTube
                </a>
                <a class="profile-link tw" href="https://x.com/rai_173" target="_blank" rel="noopener">
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                  Twitter
                </a>
              </div>
            </div>
          </div>
        </div>

        ${homeNewPicks.length ? `
        <!-- New songs -->
        <div class="home-section">
          <div class="home-section-header">
            <span>new</span>
            <div class="home-section-line"></div>
          </div>
          <div class="home-cards">${cardHtml(homeNewPicks, false, 'recommendation')}</div>
        </div>` : ''}

        ${originals.length ? `
        <!-- Original songs -->
        <div class="home-section">
          <div class="home-section-header">
            <span>Original Songs</span>
            <div class="home-section-line"></div>
          </div>
          <div class="home-cards">${cardHtml(originals, true, 'original')}</div>
        </div>` : ''}

        <!-- Random recommendations -->
        ${homeRandomPicks.length ? `
        <div class="home-section">
          <div class="home-section-header">
            <span>Pick Up</span>
            <div class="home-section-line"></div>
          </div>
          <div class="home-cards">${cardHtml(homeRandomPicks, false, 'recommendation')}</div>
        </div>` : ''}

      </div>`;
  }

  // ── About Page ──────────────────────────────────
  function renderAboutTitle(title) {
    return `
      <div class="about-section-title">
        ${escapeHtml(title)}
        <div class="about-title-line"></div>
      </div>`;
  }

  function renderAboutBody(lines) {
    return `<div class="about-body">${lines.join('<br>')}</div>`;
  }

  function renderAboutList(items) {
    return `<ul class="about-list">${items.map(item => `<li>${item}</li>`).join('')}</ul>`;
  }

  function renderAboutSection(section) {
    if (section.type === 'body') {
      return `
        <div class="about-section">
          ${renderAboutTitle(section.title)}
          ${renderAboutBody(section.lines)}
        </div>`;
    }

    if (section.type === 'features') {
      return `
        <div class="about-section">
          ${renderAboutTitle(section.title)}
          <div class="about-feature-list">
            ${section.features.map(feature => `
              <div class="about-feature-item">
                <div class="about-feature-label">${escapeHtml(feature.label)}</div>
                ${renderAboutList(feature.items)}
              </div>`).join('')}
          </div>
        </div>`;
    }

    if (section.type === 'contact') {
      return `
        <div class="about-section">
          ${renderAboutTitle(section.title)}
          ${renderAboutBody(section.lines)}
          <div class="about-contact-links">
            ${section.links.map(link => `
              <a class="about-contact-link" href="${escapeHtml(link.href)}" target="_blank" rel="noopener">
                ${link.icon}
                ${escapeHtml(link.label)}
              </a>`).join('')}
          </div>
        </div>`;
    }

    if (section.type === 'links') {
      return `
        <div class="about-section">
          ${renderAboutTitle(section.title)}
          <ul class="about-list">
            ${section.links.map(link => `
              <li><a href="${escapeHtml(link.href)}" target="_blank" rel="noopener">${escapeHtml(link.label)}</a></li>`).join('')}
          </ul>
        </div>`;
    }

    if (section.type === 'changelog') {
      return `
        <div class="about-section">
          ${renderAboutTitle(section.title)}
          <div class="changelog-list">
            ${section.entries.map(entry => `
              <div class="changelog-entry">
                <div class="changelog-version">${escapeHtml(entry.version)}</div>
                <ul class="changelog-items">
                  ${entry.items.map(item => `<li>${escapeHtml(item)}</li>`).join('')}
                </ul>
              </div>`).join('')}
          </div>
        </div>`;
    }

    return '';
  }

  function renderAboutPage() {
    const page = document.getElementById('aboutPage');
    if (!page) return;

    page.innerHTML = `
      <div class="about-content">
        <div class="about-inner">
          ${ABOUT_PAGE_CONTENT.sections.map(renderAboutSection).join('')}
        </div>
      </div>`;
  }

  // ── Init
  loadFavoritesFromStorage();
  loadPlaylistsFromStorage();
  syncThemeIcon();
  updateFavBadge();
  updateSortPanel();
  setView('home');   // start on Home page
  loadSongs();       // loads songs async; renderHomePage is called again once data arrives

  // Close add-to-playlist modal when clicking outside
  document.getElementById('addToPlaylistOverlay').addEventListener('click', function(e) {
    if (e.target === this) closeAddToPlaylistModal();
  });
