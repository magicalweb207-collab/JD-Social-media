/* ═══════════════════════════════════════════
   JD Social — Complete App Logic
   সব ফাংশন সঠিকভাবে কাজ করে
   ═══════════════════════════════════════════ */

'use strict';

/* ── APP STATE ── */
const APP = {
  user: null,
  balance: 4250.75,
  currentPage: 'feed',
  currentChat: null,
  liveActive: false,
  liveViewers: 0,
  liveEarnings: 0,
  micOn: true,
  payMethod: 'bkash',
  likes: new Set(),
  follows: new Set(),
  vpCurrentVideo: null,
  vpPlaying: false,
  messages: {},
  uploadedVideos: [],
};

/* ── DATA ── */
const USERS = [
  { id:'u1', name:'রাশিদা বেগম', handle:'rashida_bn', av:'র', color:'rgba(59,130,246,0.25)', tcolor:'#3b82f6', followers:'১২.৫K', verified:true },
  { id:'u2', name:'সজীব আহমেদ',  handle:'sajib_tech',  av:'স', color:'rgba(34,197,94,0.25)',  tcolor:'#22c55e', followers:'৮.২K',  verified:false },
  { id:'u3', name:'নাফিসা খানম', handle:'nafisa_vlogs', av:'ন', color:'rgba(236,72,153,0.25)', tcolor:'#ec4899', followers:'৫.৭K',  verified:true },
  { id:'u4', name:'করিম মিয়া',   handle:'karim_daily',  av:'ক', color:'rgba(249,115,22,0.25)', tcolor:'#f97316', followers:'৩.৪K',  verified:false },
  { id:'u5', name:'মিতা আক্তার', handle:'mita_cooking',  av:'ম', color:'rgba(168,85,247,0.25)', tcolor:'#a855f7', followers:'৯.১K',  verified:true },
];

const GRADIENTS = [
  'linear-gradient(135deg,#1a1a4e,#0d3373)',
  'linear-gradient(135deg,#1a3a1a,#0d4d1a)',
  'linear-gradient(135deg,#3a1a1a,#4d0d1a)',
  'linear-gradient(135deg,#1a1a3a,#2d1a4a)',
  'linear-gradient(135deg,#1a3a3a,#0d3a3a)',
  'linear-gradient(135deg,#2a1a1a,#4a2d0d)',
];

const VIDEOS = [
  { id:'v1', uid:'u1', title:'বাংলাদেশের সেরা রান্নার রেসিপি ২০২৪', desc:'আজকের রান্নায় ইলিশ মাছের ঝোল। সহজ রেসিপি শিখুন!', tags:['#রান্না','#বাংলাদেশ','#খাবার'], likes:12345, comments:845, views:287432, earn:2.50, grad:0 },
  { id:'v2', uid:'u2', title:'ফ্রিল্যান্সিং শিখুন ঘরে বসে - পর্ব ৩', desc:'আজকে আমরা শিখবো কীভাবে Fiverr-এ প্রথম অর্ডার পাবেন।', tags:['#ফ্রিল্যান্সিং','#আয়','#Fiverr'], likes:28700, comments:2100, views:184923, earn:5.80, grad:1 },
  { id:'v3', uid:'u3', title:'গ্রামের জীবন — আমার দিনের গল্প', desc:'গ্রামে একটি সুন্দর সকাল। প্রকৃতির সাথে থাকার আনন্দ।', tags:['#গ্রাম','#প্রকৃতি','#ভ্লগ'], likes:45200, comments:3300, views:452000, earn:9.20, grad:2 },
  { id:'v4', uid:'u4', title:'মোবাইল দিয়ে ভিডিও এডিটিং টিউটোরিয়াল', desc:'CapCut দিয়ে প্রফেশনাল ভিডিও বানানো শিখুন।', tags:['#ভিডিও','#এডিটিং','#CapCut'], likes:8900, comments:670, views:98456, earn:3.10, grad:3 },
  { id:'v5', uid:'u5', title:'সহজ মুরগির রেজালা রেসিপি', desc:'মাত্র ৩০ মিনিটে বাড়িতে বানান মুরগির রেজালা।', tags:['#রান্না','#মুরগি','#রেসিপি'], likes:34100, comments:1900, views:341000, earn:7.40, grad:4 },
  { id:'v6', uid:'u1', title:'JD Social থেকে আয় করার উপায়', desc:'কীভাবে JD Social-এ প্রতি মাসে ৫০,০০০ টাকা আয় করবেন।', tags:['#JDSocial','#আয়','#টিপস'], likes:67800, comments:5400, views:678000, earn:14.20, grad:5 },
];

const CHATS = [
  { id:'c1', uid:'u1', last:'আজকে কি লাইভ করবেন?', time:'২ মি', unread:3, online:true },
  { id:'c2', uid:'u5', last:'ওয়ালেটে টাকা জমা হয়েছে! 🎉', time:'১৫ মি', unread:1, online:true },
  { id:'c3', uid:'u2', last:'ভিডিও কলে আসেন একটু', time:'৩৫ মি', unread:0, online:false },
  { id:'c4', uid:'u3', last:'আপনার ভিডিও অনেক ভালো!', time:'১ ঘ', unread:0, online:true },
  { id:'c5', uid:'u4', last:'নতুন আপডেট দেখলেন?', time:'২ ঘ', unread:5, online:false },
];

const TX_DATA = [
  { name:'ভিডিও ভিউ আয়', sub:'১২,৩৪৫ ভিউ × ৳০.১২', amt:'+ ৳১,৪৮১', color:'#22c55e' },
  { name:'বিজ্ঞাপন শেয়ার', sub:'৯০% অংশীদারিত্ব', amt:'+ ৳২৪৩', color:'#3b82f6' },
  { name:'রেফারেল বোনাস', sub:'৮ জন রেফার', amt:'+ ৳১১৬', color:'#06b6d4' },
  { name:'লাইভ গিফট আয়', sub:'গতকালের লাইভ থেকে', amt:'+ ৳৩৮০', color:'#ec4899' },
  { name:'উত্তোলন', sub:'bKash-এ পাঠানো', amt:'- ৳৫০০', color:'#ef4444' },
];

const LIVE_SHOWS = [
  { title:'রান্নার লাইভ', host:'রাশিদা', emoji:'🍳', viewers:'২৩৪' },
  { title:'প্রযুক্তি আলোচনা', host:'সজীব', emoji:'💻', viewers:'১৮৭' },
  { title:'গান পরিবেশনা', host:'নাফিসা', emoji:'🎵', viewers:'৫৪৩' },
  { title:'ফিটনেস ক্লাস', host:'মিতা', emoji:'🏋️', viewers:'৩২১' },
];

const TRENDS = [
  { tag:'#রান্না', count:'১.২M' }, { tag:'#ফ্রিল্যান্সিং', count:'৮৭৬K' },
  { tag:'#JDSocial', count:'৫৪৩K' }, { tag:'#বাংলাদেশ', count:'৩.৪M' },
  { tag:'#আয়', count:'২১৮K' }, { tag:'#ভ্লগ', count:'৯৮৭K' },
  { tag:'#প্রযুক্তি', count:'৪৫৬K' }, { tag:'#রেসিপি', count:'৭৮৯K' },
];

const LIVE_COMMENT_POOL = [
  ['করিম','অনেক সুন্দর লাগছে! 🔥','#3b82f6'],
  ['মিতা','দারুণ! চালিয়ে যান ❤️','#22c55e'],
  ['নাফিসা','বাহ! কী দারুণ প্রতিভা','#ec4899'],
  ['রহিম','লাইভে আসলাম 👋','#f97316'],
  ['সজীব','পরের পর্ব কবে?','#a855f7'],
  ['আমিনা','অনেক কিছু শিখলাম!','#06b6d4'],
  ['জাহিদ','সাপোর্ট করছি 💪','#3b82f6'],
];

const AUTO_REPLIES = [
  'হ্যাঁ, অবশ্যই! 😊', 'ধন্যবাদ! ❤️', 'বুঝলাম, ঠিক আছে।',
  'দারুণ বললেন!', 'একটু পরে আসছি।', 'জি, সেটাই ঠিক আছে।',
  'আপনাকেও ধন্যবাদ! 🙏', 'অবশ্যই দেখবো।',
];

/* ════════════════════════════════════════════
   INIT
════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  buildFeed();
  buildDiscover();
  buildLiveList();
  buildChatList();
  buildTransactions();
  buildProfileGrid();
  setupMsgHistory();
});

/* ════════════════════════════════════════════
   AUTH
════════════════════════════════════════════ */
function switchAuthTab(tab) {
  document.querySelectorAll('.auth-tab').forEach(t => t.classList.remove('active'));
  event.target.classList.add('active');
  document.getElementById('loginForm').style.display = tab === 'login' ? 'block' : 'none';
  document.getElementById('registerForm').style.display = tab === 'register' ? 'block' : 'none';
}

function doLogin() {
  const user = document.getElementById('loginUser').value.trim() || 'ব্যবহারকারী';
  const pass = document.getElementById('loginPass').value;
  if (!pass && !user.includes('demo')) {
    const name = user || 'আপনার নাম';
    loginSuccess(name, '@' + (user.split('@')[0] || 'user').replace(/\s+/g,'_').toLowerCase());
    return;
  }
  loginSuccess(user.length > 3 ? user : 'JD ব্যবহারকারী', '@jd_user');
}

function doRegister() {
  const name = document.getElementById('regName').value.trim();
  const phone = document.getElementById('regPhone').value.trim();
  if (!name) { showToast('আপনার নাম লিখুন'); return; }
  if (!phone) { showToast('মোবাইল নম্বর লিখুন'); return; }
  loginSuccess(name, '@' + name.replace(/\s+/g,'_').toLowerCase());
}

function loginSuccess(name, handle) {
  APP.user = { name, handle };
  document.getElementById('authOverlay').style.display = 'none';
  document.getElementById('sidebarUsername').textContent = name;
  document.getElementById('profileName').textContent = name;
  document.getElementById('profileHandle').textContent = handle;
  document.getElementById('profileAv').textContent = name[0];
  document.getElementById('editAv').textContent = name[0];
  document.getElementById('editName').value = name;
  document.getElementById('editUsername').value = handle;
  showToast('স্বাগতম, ' + name + '! 🎉');
}

/* ════════════════════════════════════════════
   NAVIGATION
════════════════════════════════════════════ */
function goTo(page) {
  APP.currentPage = page;
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-link').forEach(n => n.classList.remove('active'));
  document.querySelectorAll('.mob-nav-btn').forEach(n => n.classList.remove('active'));

  const pg = document.getElementById('page-' + page);
  if (pg) pg.classList.add('active');

  const nl = document.getElementById('nl-' + page);
  if (nl) nl.classList.add('active');
  const mbn = document.getElementById('mbn-' + page);
  if (mbn) mbn.classList.add('active');
}

/* ════════════════════════════════════════════
   FEED
════════════════════════════════════════════ */
function buildFeed(filter = 'all') {
  const feed = document.getElementById('videoFeed');
  const vids = filter === 'following'
    ? VIDEOS.filter((_,i) => i % 2 === 0)
    : filter === 'trending'
    ? [...VIDEOS].sort((a,b) => b.views - a.views)
    : VIDEOS;

  feed.innerHTML = vids.map(v => {
    const u = USERS.find(u => u.id === v.uid);
    return `
    <div class="video-card" id="vc-${v.id}">
      <div class="vc-header">
        <div class="vc-av" style="background:${u.color};color:${u.tcolor}">${u.av}</div>
        <div class="vc-user-info">
          <div class="vc-username">${u.name} ${u.verified ? '✓' : ''}</div>
          <div class="vc-handle">@${u.handle}</div>
        </div>
        <button class="vc-follow-btn ${APP.follows.has(u.id) ? 'following' : ''}"
          onclick="toggleFollowBtn(this,'${u.id}')">
          ${APP.follows.has(u.id) ? 'ফলো করছেন' : 'ফলো করুন'}
        </button>
      </div>
      <div class="vc-thumb" onclick="openVideoPlayer('${v.id}')">
        <div class="vc-thumb-bg" style="background:${GRADIENTS[v.grad]}"></div>
        <div class="vc-play-overlay"><div class="vc-play-circle"></div></div>
        <div class="vc-earn-badge">💰 ৳${v.earn.toFixed(2)} আয়</div>
        <div class="vc-views-badge">👁 ${fmtNum(v.views)}</div>
      </div>
      <div class="vc-body">
        <div class="vc-title">${v.title}</div>
        <div class="vc-tags">${v.tags.map(t => `<span class="vc-tag">${t}</span>`).join('')}</div>
      </div>
      <div class="vc-actions">
        <button class="vc-action ${APP.likes.has(v.id) ? 'liked' : ''}" onclick="toggleLike('${v.id}',this)">
          <svg viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>
          <span id="lc-${v.id}">${fmtNum(v.likes)}</span>
        </button>
        <button class="vc-action" onclick="openVideoPlayer('${v.id}')">
          <svg viewBox="0 0 24 24"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>
          ${fmtNum(v.comments)}
        </button>
        <button class="vc-action" onclick="shareVideo('${v.id}')">
          <svg viewBox="0 0 24 24"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
          শেয়ার
        </button>
        <button class="vc-action" onclick="saveVideo('${v.id}',this)">
          <svg viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
          সেভ
        </button>
      </div>
    </div>`;
  }).join('');
}

function switchFeedTab(btn, type) {
  document.querySelectorAll('.feed-tab').forEach(t => t.classList.remove('active'));
  btn.classList.add('active');
  buildFeed(type);
}

function toggleLike(vid, btn) {
  const v = VIDEOS.find(x => x.id === vid);
  if (!v) return;
  if (APP.likes.has(vid)) {
    APP.likes.delete(vid);
    v.likes--;
    btn.classList.remove('liked');
    btn.querySelector('path').setAttribute('fill','none');
  } else {
    APP.likes.add(vid);
    v.likes++;
    btn.classList.add('liked');
    btn.querySelector('path').setAttribute('fill','#ef4444');
    btn.querySelector('path').setAttribute('stroke','#ef4444');
    showToast('লাইক দেওয়া হয়েছে ❤️');
  }
  document.getElementById('lc-' + vid).textContent = fmtNum(v.likes);
}

function toggleFollowBtn(btn, uid) {
  if (APP.follows.has(uid)) {
    APP.follows.delete(uid);
    btn.classList.remove('following');
    btn.textContent = 'ফলো করুন';
    showToast('আনফলো করা হয়েছে');
  } else {
    APP.follows.add(uid);
    btn.classList.add('following');
    btn.textContent = 'ফলো করছেন';
    showToast('ফলো করা হয়েছে ✅');
  }
}

function shareVideo(vid) {
  const url = window.location.href + '?v=' + vid;
  navigator.clipboard?.writeText(url);
  showToast('ভিডিও লিংক কপি হয়েছে! 🔗');
}

function saveVideo(vid, btn) {
  showToast('ভিডিও সেভ হয়েছে ⭐');
  btn.style.color = '#f97316';
}

/* ════════════════════════════════════════════
   VIDEO PLAYER
════════════════════════════════════════════ */
function openVideoPlayer(vid) {
  const v = VIDEOS.find(x => x.id === vid);
  const u = USERS.find(x => x.id === v.uid);
  APP.vpCurrentVideo = v;
  APP.vpPlaying = false;

  document.getElementById('vpBg').style.background = GRADIENTS[v.grad];
  document.getElementById('vpAv').textContent = u.av;
  document.getElementById('vpAv').style.background = u.color;
  document.getElementById('vpAv').style.color = u.tcolor;
  document.getElementById('vpUsername').textContent = u.name;
  document.getElementById('vpTitle').textContent = v.title;
  document.getElementById('vpLikeCount').textContent = fmtNum(v.likes);
  document.getElementById('vpCommentCount').textContent = fmtNum(v.comments);
  document.getElementById('vpTags').innerHTML = v.tags.map(t => `<span class="vp-tag">${t}</span>`).join('');
  document.getElementById('vpPlayBtn').textContent = '▶';

  const followBtn = document.querySelector('.vp-follow-btn');
  if (followBtn) {
    followBtn.className = 'vp-follow-btn' + (APP.follows.has(u.id) ? ' following' : '');
    followBtn.textContent = APP.follows.has(u.id) ? 'ফলো করছেন' : 'ফলো করুন';
  }

  buildVPComments(v);
  document.getElementById('videoPlayerModal').classList.add('open');
}

function buildVPComments(v) {
  const list = document.getElementById('vpCommentsList');
  const comments = [
    { av:'ক', color:'rgba(59,130,246,0.2)', tcolor:'#3b82f6', name:'করিম', text:'অসাধারণ ভিডিও! 🔥', time:'২ মি আগে' },
    { av:'ম', color:'rgba(168,85,247,0.2)', tcolor:'#a855f7', name:'মিতা', text:'অনেক কিছু শিখলাম, ধন্যবাদ!', time:'৫ মি আগে' },
    { av:'স', color:'rgba(34,197,94,0.2)', tcolor:'#22c55e', name:'সজীব', text:'পরের পর্ব কবে আসবে?', time:'১৫ মি আগে' },
    { av:'ন', color:'rgba(236,72,153,0.2)', tcolor:'#ec4899', name:'নাফিসা', text:'JD Social-এ এই ধরনের কন্টেন্ট আরো চাই!', time:'৩০ মি আগে' },
  ];
  list.innerHTML = comments.map(c => `
    <div class="vp-comment">
      <div class="vp-cmt-av" style="background:${c.color};color:${c.tcolor}">${c.av}</div>
      <div>
        <div class="vp-cmt-name">${c.name}</div>
        <div class="vp-cmt-text">${c.text}</div>
        <div class="vp-cmt-time">${c.time}</div>
      </div>
    </div>
  `).join('');
}

function addVPComment() {
  const inp = document.getElementById('vpCommentInput');
  const txt = inp.value.trim();
  if (!txt) return;
  const name = APP.user?.name || 'আপনি';
  const list = document.getElementById('vpCommentsList');
  const div = document.createElement('div');
  div.className = 'vp-comment';
  div.innerHTML = `
    <div class="vp-cmt-av" style="background:rgba(59,130,246,0.2);color:#3b82f6">${name[0]}</div>
    <div>
      <div class="vp-cmt-name">${name}</div>
      <div class="vp-cmt-text">${txt}</div>
      <div class="vp-cmt-time">এখনই</div>
    </div>`;
  list.prepend(div);
  inp.value = '';
  if (APP.vpCurrentVideo) APP.vpCurrentVideo.comments++;
  document.getElementById('vpCommentCount').textContent = fmtNum(APP.vpCurrentVideo?.comments || 0);
  showToast('মন্তব্য যোগ হয়েছে 💬');
}

function toggleVideoPlay() {
  APP.vpPlaying = !APP.vpPlaying;
  document.getElementById('vpPlayBtn').textContent = APP.vpPlaying ? '⏸' : '▶';
  showToast(APP.vpPlaying ? 'ভিডিও চলছে...' : 'ভিডিও থামানো হয়েছে');
}

function toggleVPLike(el) {
  if (!APP.vpCurrentVideo) return;
  const vid = APP.vpCurrentVideo.id;
  if (APP.likes.has(vid)) {
    APP.likes.delete(vid);
    el.querySelector('.vpa-icon').textContent = '🤍';
    APP.vpCurrentVideo.likes--;
  } else {
    APP.likes.add(vid);
    el.querySelector('.vpa-icon').textContent = '❤️';
    APP.vpCurrentVideo.likes++;
    showToast('লাইক দেওয়া হয়েছে ❤️');
  }
  document.getElementById('vpLikeCount').textContent = fmtNum(APP.vpCurrentVideo.likes);
  const feedLc = document.getElementById('lc-' + vid);
  if (feedLc) feedLc.textContent = fmtNum(APP.vpCurrentVideo.likes);
}

function toggleFollow(btn) {
  const isFollowing = btn.classList.contains('following');
  btn.classList.toggle('following');
  btn.textContent = isFollowing ? 'ফলো করুন' : 'ফলো করছেন';
  showToast(isFollowing ? 'আনফলো করা হয়েছে' : 'ফলো করা হয়েছে ✅');
}

/* ════════════════════════════════════════════
   DISCOVER
════════════════════════════════════════════ */
function buildDiscover() {
  const tags = document.getElementById('trendingTags');
  tags.innerHTML = TRENDS.map(t => `
    <div class="trend-tag" onclick="filterByTag('${t.tag}')">
      ${t.tag} <span class="trend-tag-count">${t.count}</span>
    </div>`).join('');

  const grid = document.getElementById('discoverGrid');
  grid.innerHTML = VIDEOS.concat(VIDEOS).slice(0,12).map((v,i) => `
    <div class="discover-item" onclick="openVideoPlayer('${v.id}')">
      <div class="di-bg" style="background:${GRADIENTS[i % GRADIENTS.length]}"></div>
      <div class="di-overlay">
        <div class="di-title">${v.title.substring(0,40)}...</div>
        <div class="di-stats">❤️ ${fmtNum(v.likes)} &nbsp; 👁 ${fmtNum(v.views)}</div>
      </div>
    </div>`).join('');
}

function doSearch(q) {
  const grid = document.getElementById('discoverGrid');
  const results = q.length < 2 ? VIDEOS.concat(VIDEOS).slice(0,12)
    : VIDEOS.filter(v => v.title.includes(q) || v.tags.some(t => t.includes(q)));
  if (results.length === 0) {
    grid.innerHTML = '<div style="grid-column:1/-1;text-align:center;color:var(--muted);padding:40px">কোনো ফলাফল পাওয়া যায়নি</div>';
    return;
  }
  grid.innerHTML = results.map((v,i) => `
    <div class="discover-item" onclick="openVideoPlayer('${v.id}')">
      <div class="di-bg" style="background:${GRADIENTS[i % GRADIENTS.length]}"></div>
      <div class="di-overlay">
        <div class="di-title">${v.title.substring(0,40)}</div>
        <div class="di-stats">❤️ ${fmtNum(v.likes)} &nbsp; 👁 ${fmtNum(v.views)}</div>
      </div>
    </div>`).join('');
}

function filterByTag(tag) {
  goTo('discover');
  document.getElementById('searchInput').value = tag;
  doSearch(tag);
  showToast(tag + ' — ফিল্টার করা হয়েছে');
}

/* ════════════════════════════════════════════
   LIVE
════════════════════════════════════════════ */
function buildLiveList() {
  document.getElementById('liveList').innerHTML = LIVE_SHOWS.map(s => `
    <div class="live-list-item" onclick="watchSpecificLive('${s.title}','${s.host}')">
      <div class="lli-thumb" style="background:linear-gradient(135deg,#1a1a3a,#0d1a2a)">
        <span style="font-size:28px">${s.emoji}</span>
        <div class="lli-live-badge">লাইভ</div>
      </div>
      <div class="lli-info">
        <div class="lli-title">${s.title}</div>
        <div class="lli-host">@${s.host}</div>
        <div class="lli-viewers">👁 ${s.viewers} দর্শক</div>
      </div>
    </div>`).join('');
}

function startLive() {
  const title = document.getElementById('liveTitleInput').value.trim() || 'আমার লাইভ শো';
  APP.liveActive = true;
  APP.liveViewers = 0;
  APP.liveEarnings = 0;
  document.getElementById('livePre').style.display = 'none';
  document.getElementById('liveActive').style.display = 'flex';
  document.getElementById('liveHostName').textContent = APP.user?.name || 'আপনার নাম';
  document.getElementById('liveTitleBar').textContent = title;
  document.getElementById('liveCommentsScroll').innerHTML = '';
  runLiveViewers();
  runLiveComments();
  showToast('লাইভ শুরু হয়েছে! 🔴 সবাইকে জানানো হচ্ছে...');
}

function endLive() {
  APP.liveActive = false;
  document.getElementById('livePre').style.display = 'flex';
  document.getElementById('liveActive').style.display = 'none';
  APP.balance += APP.liveEarnings;
  updateWalletDisplay();
  showToast(`লাইভ শেষ! আয়: ৳${APP.liveEarnings.toFixed(2)} 💰`);
}

function watchLive() {
  if (LIVE_SHOWS.length > 0) watchSpecificLive(LIVE_SHOWS[0].title, LIVE_SHOWS[0].host);
}

function watchSpecificLive(title, host) {
  showToast(`${host}-এর লাইভ: "${title}" দেখছেন`);
}

function runLiveViewers() {
  if (!APP.liveActive) return;
  APP.liveViewers = Math.max(0, APP.liveViewers + Math.floor(Math.random() * 6) - 2);
  APP.liveEarnings += 0.15;
  document.getElementById('liveViewerCount').textContent = APP.liveViewers;
  document.getElementById('liveEarnDisplay').textContent = '৳ ' + APP.liveEarnings.toFixed(2);
  document.getElementById('sidebarEarn').textContent = '৳ ' + Math.floor(APP.balance + APP.liveEarnings).toLocaleString();
  setTimeout(runLiveViewers, 1800);
}

function runLiveComments() {
  if (!APP.liveActive) return;
  const [name, text, color] = LIVE_COMMENT_POOL[Math.floor(Math.random() * LIVE_COMMENT_POOL.length)];
  addLiveComment(name, text, color);
  setTimeout(runLiveComments, 2000 + Math.random() * 2500);
}

function addLiveComment(name, text, color) {
  const scr = document.getElementById('liveCommentsScroll');
  const div = document.createElement('div');
  div.className = 'live-cmt';
  div.innerHTML = `<span class="live-cmt-name" style="color:${color}">${name}</span><span class="live-cmt-text">${text}</span>`;
  scr.appendChild(div);
  if (scr.children.length > 8) scr.removeChild(scr.firstChild);
  scr.scrollTop = 99999;
}

function sendLiveComment() {
  const inp = document.getElementById('liveCommentInput');
  const txt = inp.value.trim();
  if (!txt) return;
  addLiveComment(APP.user?.name || 'আপনি', txt, '#06b6d4');
  inp.value = '';
}

function sendGift() {
  APP.liveEarnings += 5;
  document.getElementById('liveEarnDisplay').textContent = '৳ ' + APP.liveEarnings.toFixed(2);
  addLiveComment(APP.user?.name || 'আপনি', '🎁 গিফট পাঠালেন!', '#ec4899');
  showToast('গিফট পাঠানো হয়েছে! 🎁 ৳৫.০০');
}

function toggleMic() {
  APP.micOn = !APP.micOn;
  const btn = document.getElementById('liveMicBtn');
  btn.textContent = APP.micOn ? '🎤' : '🔇';
  btn.style.background = APP.micOn ? 'rgba(59,130,246,0.2)' : 'rgba(239,68,68,0.2)';
  showToast(APP.micOn ? 'মাইক চালু হয়েছে' : 'মাইক বন্ধ হয়েছে');
}

/* ════════════════════════════════════════════
   CHAT
════════════════════════════════════════════ */
function setupMsgHistory() {
  CHATS.forEach(c => {
    const u = USERS.find(x => x.id === c.uid);
    APP.messages[c.id] = [
      { text: c.last, mine: false, time: c.time }
    ];
  });
}

function buildChatList() {
  const container = document.getElementById('chatListContainer');
  container.innerHTML = CHATS.map(c => {
    const u = USERS.find(x => x.id === c.uid);
    return `
    <div class="chat-item" id="ci-${c.id}" onclick="openChat('${c.id}')">
      <div class="chat-item-av" style="background:${u.color};color:${u.tcolor}">
        ${u.av}
        ${c.online ? '<div class="online-ring"></div>' : ''}
      </div>
      <div class="chat-item-info">
        <div class="chat-item-name">${u.name}</div>
        <div class="chat-item-last">${c.last}</div>
      </div>
      <div class="chat-item-meta">
        <div class="chat-item-time">${c.time}</div>
        ${c.unread > 0 ? `<div class="chat-unread">${c.unread}</div>` : ''}
      </div>
    </div>`;
  }).join('');
}

function filterChats(q) {
  document.querySelectorAll('.chat-item').forEach(el => {
    const name = el.querySelector('.chat-item-name').textContent;
    el.style.display = !q || name.includes(q) ? 'flex' : 'none';
  });
}

function openChat(chatId) {
  APP.currentChat = chatId;
  const c = CHATS.find(x => x.id === chatId);
  const u = USERS.find(x => x.id === c.uid);
  document.querySelectorAll('.chat-item').forEach(el => el.classList.remove('active'));
  document.getElementById('ci-' + chatId)?.classList.add('active');

  const main = document.getElementById('chatMain');
  main.innerHTML = `
    <div class="chat-window">
      <div class="chat-window-header">
        <div class="chat-window-av" style="background:${u.color};color:${u.tcolor}">${u.av}</div>
        <div>
          <div class="chat-window-name">${u.name}</div>
          <div class="chat-window-status">${c.online ? '● অনলাইন' : 'অফলাইন'}</div>
        </div>
        <div class="chat-window-actions">
          <div class="chat-win-btn" onclick="showToast('ভিডিও কল শুরু হচ্ছে...')">📹</div>
          <div class="chat-win-btn" onclick="showToast('অডিও কল শুরু হচ্ছে...')">📞</div>
          <div class="chat-win-btn" onclick="showToast('আরও অপশন...')">⋯</div>
        </div>
      </div>
      <div class="chat-messages" id="chatMessages"></div>
      <div class="chat-input-area">
        <input type="text" id="chatMsgInput" placeholder="মেসেজ লিখুন..."
          onkeydown="if(event.key==='Enter')sendChatMsg()">
        <button class="chat-send-btn" onclick="sendChatMsg()">
          <svg viewBox="0 0 24 24"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
        </button>
      </div>
    </div>`;
  renderMessages();
}

function renderMessages() {
  const msgs = APP.messages[APP.currentChat] || [];
  const container = document.getElementById('chatMessages');
  if (!container) return;
  container.innerHTML = msgs.map(m => `
    <div class="msg-bubble ${m.mine ? 'mine' : 'theirs'}">
      ${m.text}
      <div class="msg-time">${m.time}</div>
    </div>`).join('');
  container.scrollTop = 99999;
}

function sendChatMsg() {
  const inp = document.getElementById('chatMsgInput');
  const txt = inp.value.trim();
  if (!txt || !APP.currentChat) return;
  if (!APP.messages[APP.currentChat]) APP.messages[APP.currentChat] = [];
  APP.messages[APP.currentChat].push({ text: txt, mine: true, time: 'এখন' });
  inp.value = '';
  renderMessages();
  setTimeout(() => {
    const reply = AUTO_REPLIES[Math.floor(Math.random() * AUTO_REPLIES.length)];
    APP.messages[APP.currentChat].push({ text: reply, mine: false, time: 'এখন' });
    renderMessages();
  }, 800 + Math.random() * 600);
}

/* ════════════════════════════════════════════
   WALLET
════════════════════════════════════════════ */
function buildTransactions() {
  document.getElementById('txList').innerHTML = TX_DATA.map(t => `
    <div class="tx-item">
      <div class="tx-left-info">
        <div class="tx-name">${t.name}</div>
        <div class="tx-sub">${t.sub}</div>
      </div>
      <div class="tx-amount" style="color:${t.color}">${t.amt}</div>
    </div>`).join('');
}

function updateWalletDisplay() {
  document.getElementById('walletAmount').textContent = Math.floor(APP.balance).toLocaleString();
  document.getElementById('sidebarEarn').textContent = '৳ ' + Math.floor(APP.balance).toLocaleString();
  document.getElementById('modalBal').textContent = '৳ ' + APP.balance.toFixed(2);
}

function openWithdrawModal() {
  document.getElementById('withdrawSuccess').style.display = 'none';
  document.getElementById('withdrawAmt').value = '';
  document.getElementById('withdrawAcct').value = '';
  document.getElementById('fDisplay').textContent = '৳ ০.০০';
  document.getElementById('fCharge').textContent = '- ৳ ০.০০';
  document.getElementById('fGet').textContent = '৳ ০.০০';
  updateWalletDisplay();
  document.getElementById('withdrawModal').classList.add('open');
}

function selPay(method) {
  APP.payMethod = method;
  document.querySelectorAll('.method-pill').forEach(p => p.classList.remove('active'));
  document.getElementById('mp-' + method).classList.add('active');
}

function setWithdrawAmt(amt) {
  document.getElementById('withdrawAmt').value = amt;
  calcWithdraw();
}

function calcWithdraw() {
  const amt = parseFloat(document.getElementById('withdrawAmt').value) || 0;
  const fee = +(amt * 0.015).toFixed(2);
  const get = +(amt - fee).toFixed(2);
  document.getElementById('fDisplay').textContent = '৳ ' + amt.toFixed(2);
  document.getElementById('fCharge').textContent = '- ৳ ' + fee.toFixed(2);
  document.getElementById('fGet').textContent = '৳ ' + get.toFixed(2);
}

function confirmWithdraw() {
  const amt = parseFloat(document.getElementById('withdrawAmt').value) || 0;
  const acct = document.getElementById('withdrawAcct').value.trim();
  if (amt < 100) { showToast('সর্বনিম্ন ৳১০০ উত্তোলন করুন'); return; }
  if (amt > APP.balance) { showToast('অপর্যাপ্ত ব্যালেন্স!'); return; }
  if (!acct) { showToast('অ্যাকাউন্ট নম্বর লিখুন'); return; }
  APP.balance -= amt;
  updateWalletDisplay();
  const txId = 'JD' + Date.now().toString().slice(-8);
  document.getElementById('withdrawTxId').textContent = 'TX ID: ' + txId;
  document.getElementById('withdrawSuccess').style.display = 'block';
  TX_DATA.unshift({ name:'উত্তোলন — ' + APP.payMethod, sub:acct, amt:'- ৳' + amt.toFixed(0), color:'#ef4444' });
  buildTransactions();
  showToast('উত্তোলন সফল! ৳' + amt.toFixed(2) + ' পাঠানো হয়েছে ✅');
}

/* ════════════════════════════════════════════
   PROFILE
════════════════════════════════════════════ */
function buildProfileGrid() {
  const grid = document.getElementById('profileGrid');
  grid.innerHTML = VIDEOS.map((v,i) => `
    <div class="pg-item" onclick="openVideoPlayer('${v.id}')">
      <div class="pg-item-bg" style="background:${GRADIENTS[i % GRADIENTS.length]}"></div>
      <div class="pg-item-overlay">
        <div class="pg-item-views">▶ ${fmtNum(v.views)}</div>
      </div>
    </div>`).join('');
}

function switchProfileTab(btn, tab) {
  document.querySelectorAll('.p-tab').forEach(t => t.classList.remove('active'));
  btn.classList.add('active');
  buildProfileGrid();
  showToast(tab === 'liked' ? 'পছন্দ করা ভিডিও' : tab === 'saved' ? 'সেভ করা ভিডিও' : 'আপনার ভিডিও');
}

function openEditProfile() {
  document.getElementById('editName').value = APP.user?.name || '';
  document.getElementById('editUsername').value = APP.user?.handle || '';
  document.getElementById('editProfileModal').classList.add('open');
}

function saveProfile() {
  const name = document.getElementById('editName').value.trim();
  const handle = document.getElementById('editUsername').value.trim();
  const bio = document.getElementById('editBio').value.trim();
  if (!name) { showToast('নাম লিখুন'); return; }
  APP.user = { ...APP.user, name, handle };
  document.getElementById('profileName').textContent = name;
  document.getElementById('profileHandle').textContent = handle;
  if (bio) document.querySelector('.profile-bio').textContent = bio;
  document.getElementById('sidebarUsername').textContent = name;
  document.getElementById('profileAv').textContent = name[0];
  document.getElementById('editAv').textContent = name[0];
  closeModal('editProfileModal');
  showToast('প্রোফাইল আপডেট হয়েছে ✅');
}

/* ════════════════════════════════════════════
   UPLOAD
════════════════════════════════════════════ */
function openUpload() {
  document.getElementById('uploadModal').classList.add('open');
  document.getElementById('uploadForm').style.display = 'none';
  document.getElementById('dropZone').style.display = 'block';
  document.getElementById('uploadProgress').style.display = 'none';
}

function handleFileSelect(input) {
  if (input.files.length > 0) {
    const file = input.files[0];
    document.getElementById('dropZone').style.display = 'none';
    document.getElementById('uploadForm').style.display = 'flex';
    document.getElementById('videoTitle').value = file.name.replace(/\.[^.]+$/, '');
    showToast('ফাইল নির্বাচিত: ' + file.name);
  }
}

const dropZone = document.getElementById('dropZone');
if (dropZone) {
  dropZone.addEventListener('dragover', e => { e.preventDefault(); dropZone.style.borderColor = '#3b82f6'; });
  dropZone.addEventListener('dragleave', () => { dropZone.style.borderColor = ''; });
  dropZone.addEventListener('drop', e => {
    e.preventDefault();
    dropZone.style.borderColor = '';
    if (e.dataTransfer.files.length > 0) handleFileSelect({ files: e.dataTransfer.files });
  });
}

function submitUpload() {
  const title = document.getElementById('videoTitle').value.trim();
  const desc = document.getElementById('videoDesc').value.trim();
  if (!title) { showToast('ভিডিওর শিরোনাম লিখুন'); return; }
  document.getElementById('uploadProgress').style.display = 'block';
  let pct = 0;
  const bar = document.getElementById('progressFill');
  const txt = document.getElementById('progressText');
  const iv = setInterval(() => {
    pct += Math.random() * 18;
    if (pct >= 100) {
      pct = 100; clearInterval(iv);
      txt.textContent = 'আপলোড সম্পন্ন! ✅';
      setTimeout(() => {
        closeModal('uploadModal');
        const newVid = {
          id: 'v_' + Date.now(), uid: 'u1',
          title, desc: desc || '', tags: ['#আমার_ভিডিও'],
          likes: 0, comments: 0, views: 1, earn: 0, grad: Math.floor(Math.random() * GRADIENTS.length)
        };
        VIDEOS.unshift(newVid);
        buildFeed();
        showToast('ভিডিও সফলভাবে পোস্ট হয়েছে! 🎉');
      }, 800);
    }
    bar.style.width = pct + '%';
    if (pct < 100) txt.textContent = 'আপলোড হচ্ছে... ' + Math.floor(pct) + '%';
  }, 200);
}

/* ════════════════════════════════════════════
   MODALS
════════════════════════════════════════════ */
function closeModal(id) {
  document.getElementById(id).classList.remove('open');
}

document.querySelectorAll('.modal-overlay').forEach(el => {
  el.addEventListener('click', e => {
    if (e.target === el) el.classList.remove('open');
  });
});

/* ════════════════════════════════════════════
   TOAST
════════════════════════════════════════════ */
function showToast(msg) {
  const container = document.getElementById('toastContainer');
  const div = document.createElement('div');
  div.className = 'toast-msg';
  div.textContent = msg;
  container.appendChild(div);
  setTimeout(() => div.remove(), 2800);
}

/* ════════════════════════════════════════════
   UTILS
════════════════════════════════════════════ */
function fmtNum(n) {
  if (n >= 1000000) return (n/1000000).toFixed(1) + 'M';
  if (n >= 1000) return (n/1000).toFixed(1) + 'K';
  return n.toString();
}
