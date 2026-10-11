(function () {
  "use strict";

  const LS_FORM = "ravens-playbook.formation.v1";
  const LS_NOTES = "ravens-playbook.notes.v1";
  const LS_CHECKS = "ravens-playbook.checks.v1";
  const LS_WATCH = "ravens-playbook.watch.v1";

  /* ---------- EXAMPLE personnel packages (football) ---------- */
  const PACKAGES = {
    "11": {
      blurb: "11 personnel — 1 RB, 1 TE, 3 WR (EXAMPLE).",
      players: [
        { role: "QB", x: 280, y: 620, name: "QB Demo" },
        { role: "RB", x: 220, y: 680, name: "RB Demo" },
        { role: "TE", x: 380, y: 560, name: "TE Demo" },
        { role: "WRX", x: 80, y: 520, name: "X Demo" },
        { role: "WRZ", x: 480, y: 520, name: "Z Demo" },
        { role: "WRS", x: 160, y: 560, name: "Slot Demo" },
        { role: "LT", x: 200, y: 560, name: "LT Demo" },
        { role: "LG", x: 240, y: 560, name: "LG Demo" },
        { role: "C", x: 280, y: 560, name: "C Demo" },
        { role: "RG", x: 320, y: 560, name: "RG Demo" },
        { role: "RT", x: 360, y: 560, name: "RT Demo" }
      ]
    },
    "12": {
      blurb: "12 personnel — 1 RB, 2 TE, 2 WR (EXAMPLE).",
      players: [
        { role: "QB", x: 280, y: 620, name: "QB Demo" },
        { role: "RB", x: 240, y: 680, name: "RB Demo" },
        { role: "TE", x: 400, y: 560, name: "TE1 Demo" },
        { role: "TE2", x: 160, y: 560, name: "TE2 Demo" },
        { role: "WRX", x: 70, y: 520, name: "X Demo" },
        { role: "WRZ", x: 490, y: 520, name: "Z Demo" },
        { role: "LT", x: 200, y: 560, name: "LT Demo" },
        { role: "LG", x: 240, y: 560, name: "LG Demo" },
        { role: "C", x: 280, y: 560, name: "C Demo" },
        { role: "RG", x: 320, y: 560, name: "RG Demo" },
        { role: "RT", x: 360, y: 560, name: "RT Demo" }
      ]
    },
    nickel: {
      blurb: "Nickel look — EXAMPLE defensive nickel (5 DBs) vs empty-ish snap.",
      players: [
        { role: "DE", x: 180, y: 480, name: "DE L" },
        { role: "NT", x: 280, y: 470, name: "NT" },
        { role: "DE", x: 380, y: 480, name: "DE R" },
        { role: "LB", x: 220, y: 400, name: "LB L" },
        { role: "LB", x: 340, y: 400, name: "LB R" },
        { role: "CB", x: 60, y: 360, name: "CB L" },
        { role: "CB", x: 500, y: 360, name: "CB R" },
        { role: "NCB", x: 180, y: 340, name: "Nickel" },
        { role: "FS", x: 220, y: 260, name: "FS" },
        { role: "SS", x: 340, y: 260, name: "SS" },
        { role: "CB3", x: 420, y: 340, name: "CB3" }
      ]
    }
  };

  const HOME_CHECKS = [
    "TV / stream ready before kickoff",
    "Formation board set to preferred EXAMPLE package",
    "Animated play picked for half-time chat",
    "Drive chart open for EXAMPLE film review",
    "Wall mode on if casting to the big screen"
  ];

  const DEFAULT_WATCH = [
    { text: "First-down run/pass mix (EXAMPLE habit)", done: false },
    { text: "Red-zone personnel package", done: false },
    { text: "Blitz pickup & protection slides", done: false },
    { text: "Cover-2 / Cover-3 beats downfield", done: false },
    { text: "Late-game clock & timeout management", done: false }
  ];

  /* EXAMPLE drive chart — fictional timeline */
  const DRIVES = [
    {
      id: 1, start: 25, end: 48, result: "punt", label: "Punt",
      downs: "3 plays · +23 yds (EXAMPLE)",
      notes: ["Outside zone right — EXAMPLE gain of 7", "Incomplete slant", "Screen short of sticks → punt"]
    },
    {
      id: 2, start: 32, end: 100, result: "td", label: "TD",
      downs: "8 plays · +68 yds (EXAMPLE)",
      notes: ["RPO glance — EXAMPLE conversion", "Bootleg keep · edge", "Cover-2 beater slant for score (EXAMPLE)"]
    },
    {
      id: 3, start: 18, end: 55, result: "fg", label: "FG",
      downs: "10 plays · +37 yds (EXAMPLE)",
      notes: ["12 personnel duo run", "Blitz pickup holds · dump to TE", "Field goal from EXAMPLE mid-range"]
    },
    {
      id: 4, start: 40, end: 40, result: "to", label: "TO",
      downs: "1 play · 0 yds (EXAMPLE)",
      notes: ["Strip-sack on dropback — EXAMPLE turnover"]
    },
    {
      id: 5, start: 22, end: 78, result: "punt", label: "Punt",
      downs: "6 plays · +56 yds (EXAMPLE)",
      notes: ["Outside zone left · chunk", "Incomplete deep over", "4th-and-short punt (EXAMPLE call)"]
    },
    {
      id: 6, start: 45, end: 100, result: "td", label: "TD",
      downs: "5 plays · +55 yds (EXAMPLE)",
      notes: ["Empty nickel look vs pressure", "Bootleg throwback", "Goal-line 12 personnel punch (EXAMPLE)"]
    },
    {
      id: 7, start: 15, end: 42, result: "fg", label: "FG",
      downs: "7 plays · +27 yds (EXAMPLE)",
      notes: ["Clock-drain drive · EXAMPLE FG"]
    }
  ];

  const PLAYS = [
    {
      id: "ozone",
      title: "EXAMPLE · Outside Zone",
      blurb: "Backside cut / frontside stretch · OL zone steps · RB reads first covered.",
      routes: [
        { label: "RB", color: "#f5d76e", path: [[280, 360], [320, 340], [380, 300], [420, 250]] },
        { label: "TE", color: "#fff", path: [[360, 300], [400, 280], [440, 240]] },
        { label: "WRX", color: "#8ab4ff", path: [[80, 280], [100, 200], [120, 120]] }
      ],
      ol: true
    },
    {
      id: "rpo",
      title: "EXAMPLE · RPO Glance",
      blurb: "Zone fake · QB reads edge · glance route behind LB.",
      routes: [
        { label: "RB", color: "#f5d76e", path: [[260, 360], [300, 340], [340, 320]] },
        { label: "Slot", color: "#6dff9a", path: [[180, 300], [220, 260], [260, 200], [280, 140]] },
        { label: "Z", color: "#8ab4ff", path: [[480, 280], [460, 200], [440, 120]] }
      ],
      ol: true
    },
    {
      id: "slant",
      title: "EXAMPLE · Cover-2 Beater Slant",
      blurb: "High-low vs Cover-2 · slant under the hole · deep post clears safety.",
      routes: [
        { label: "X slant", color: "#6dff9a", path: [[80, 280], [160, 240], [240, 210], [300, 190]] },
        { label: "Post", color: "#8ab4ff", path: [[480, 280], [420, 200], [360, 120], [320, 60]] },
        { label: "Flat", color: "#f5d76e", path: [[380, 300], [440, 290], [500, 280]] }
      ],
      ol: true
    },
    {
      id: "boot",
      title: "EXAMPLE · Bootleg",
      blurb: "Play-action away · QB boot right · crosser + flat + deep over.",
      routes: [
        { label: "QB boot", color: "#f5d76e", path: [[280, 340], [320, 350], [380, 340], [440, 320]] },
        { label: "Cross", color: "#6dff9a", path: [[120, 280], [200, 250], [300, 230], [400, 210]] },
        { label: "Over", color: "#8ab4ff", path: [[80, 260], [160, 180], [260, 100]] },
        { label: "Flat", color: "#fff", path: [[400, 300], [460, 290], [520, 280]] }
      ],
      ol: true
    },
    {
      id: "blitz",
      title: "EXAMPLE · Blitz Pickup",
      blurb: "Nickel pressure · RB chip / hot route · slide protection right.",
      routes: [
        { label: "Hot", color: "#6dff9a", path: [[180, 300], [200, 280], [220, 250]] },
        { label: "RB chip", color: "#f5d76e", path: [[240, 360], [200, 340], [170, 320]] },
        { label: "Blitz", color: "#e85d5d", path: [[200, 200], [220, 250], [250, 300], [270, 330]] },
        { label: "Deep", color: "#8ab4ff", path: [[480, 280], [470, 180], [460, 80]] }
      ],
      ol: true,
      blitz: true
    }
  ];

  const $ = (sel, root) => (root || document).querySelector(sel);
  const $$ = (sel, root) => Array.from((root || document).querySelectorAll(sel));

  function loadJSON(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (_) { return fallback; }
  }
  function saveJSON(key, val) {
    try { localStorage.setItem(key, JSON.stringify(val)); } catch (_) {}
  }

  /* ---------- tabs / hash ---------- */
  function showTab(id) {
    $$(".tab").forEach((t) => {
      const on = t.dataset.tab === id;
      t.classList.toggle("on", on);
      t.setAttribute("aria-selected", on ? "true" : "false");
    });
    $$(".panel").forEach((p) => {
      const on = p.id === "panel-" + id;
      p.classList.toggle("on", on);
      if (on) p.removeAttribute("hidden");
      else p.setAttribute("hidden", "");
    });
    if (location.hash.slice(1) !== id) {
      history.replaceState(null, "", "#" + id);
    }
    if (id === "plays") ensurePlayFrame();
    if (id === "formation") renderFormation(currentPkg);
  }

  function initTabs() {
    $$(".tab").forEach((t) => {
      t.addEventListener("click", () => showTab(t.dataset.tab));
    });
    document.addEventListener("keydown", (e) => {
      if (e.target.matches("textarea, input")) return;
      const tabs = $$(".tab");
      const idx = tabs.findIndex((t) => t.classList.contains("on"));
      if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
        e.preventDefault();
        const next = e.key === "ArrowRight"
          ? (idx + 1) % tabs.length
          : (idx - 1 + tabs.length) % tabs.length;
        tabs[next].focus();
        showTab(tabs[next].dataset.tab);
      }
    });
    $$("[data-goto]").forEach((el) => {
      el.addEventListener("click", () => showTab(el.getAttribute("data-goto")));
      if (el.classList.contains("clickable")) {
        el.setAttribute("tabindex", "0");
        el.addEventListener("keydown", (e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            showTab(el.getAttribute("data-goto"));
          }
        });
      }
    });
    const hash = location.hash.slice(1);
    const valid = ["home", "formation", "plays", "drive", "notes"];
    showTab(valid.includes(hash) ? hash : "home");
    window.addEventListener("hashchange", () => {
      const h = location.hash.slice(1);
      if (valid.includes(h)) showTab(h);
    });
  }

  /* ---------- background particles ---------- */
  function initBg() {
    const canvas = $("#bg");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let w, h, particles, raf;
    function resize() {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
      particles = Array.from({ length: Math.min(70, Math.floor(w / 18)) }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: 1 + Math.random() * 2.2,
        vx: (Math.random() - 0.5) * 0.35,
        vy: -0.15 - Math.random() * 0.4,
        a: 0.15 + Math.random() * 0.45
      }));
    }
    function tick() {
      ctx.clearRect(0, 0, w, h);
      const g = ctx.createLinearGradient(0, 0, w, h);
      g.addColorStop(0, "#0a0614");
      g.addColorStop(0.5, "#120a28");
      g.addColorStop(1, "#07050e");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h);
      // faint yard-line vibe
      ctx.strokeStyle = "rgba(245,215,110,0.04)";
      ctx.lineWidth = 1;
      for (let y = 0; y < h; y += 56) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke();
      }
      particles.forEach((p) => {
        p.x += p.vx; p.y += p.vy;
        if (p.y < -10) { p.y = h + 10; p.x = Math.random() * w; }
        if (p.x < -10) p.x = w + 10;
        if (p.x > w + 10) p.x = -10;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(107,76,255,${p.a})`;
        ctx.fill();
        if (p.r > 1.6) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r * 0.4, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(245,215,110,${p.a * 0.5})`;
          ctx.fill();
        }
      });
      raf = requestAnimationFrame(tick);
    }
    resize();
    tick();
    window.addEventListener("resize", resize);
  }

  /* ---------- formation board ---------- */
  let currentPkg = "11";
  let formState = loadJSON(LS_FORM, null);

  function drawYardLines() {
    const g = $("#yardLines");
    if (!g || g.childElementCount) return;
    const ns = "http://www.w3.org/2000/svg";
    for (let i = 1; i <= 9; i++) {
      const y = 80 + i * 74;
      const line = document.createElementNS(ns, "line");
      line.setAttribute("x1", "20"); line.setAttribute("x2", "540");
      line.setAttribute("y1", String(y)); line.setAttribute("y2", String(y));
      g.appendChild(line);
      const t = document.createElementNS(ns, "text");
      t.setAttribute("x", "28"); t.setAttribute("y", String(y - 4));
      t.setAttribute("fill", "rgba(255,255,255,.35)");
      t.setAttribute("font-size", "11");
      t.setAttribute("font-family", "system-ui,sans-serif");
      t.textContent = String(i * 10);
      g.appendChild(t);
    }
  }

  function getPlayers(pkg) {
    if (formState && formState.pkg === pkg && Array.isArray(formState.players)) {
      return formState.players.map((p) => ({ ...p }));
    }
    return PACKAGES[pkg].players.map((p) => ({ ...p }));
  }

  function renderFormation(pkg) {
    currentPkg = pkg;
    drawYardLines();
    $$(".seg-btn").forEach((b) => b.classList.toggle("on", b.dataset.pkg === pkg));
    $("#pkgBlurb").textContent = PACKAGES[pkg].blurb;
    const players = getPlayers(pkg);
    const g = $("#players");
    g.innerHTML = "";
    const ns = "http://www.w3.org/2000/svg";
    const roster = $("#pkgRoster");
    roster.innerHTML = "";

    players.forEach((p, i) => {
      const grp = document.createElementNS(ns, "g");
      grp.classList.add("player");
      grp.setAttribute("data-idx", String(i));
      grp.setAttribute("filter", "url(#dotShadow)");
      const c = document.createElementNS(ns, "circle");
      c.setAttribute("cx", p.x); c.setAttribute("cy", p.y);
      c.setAttribute("r", "16");
      c.setAttribute("fill", pkg === "nickel" ? "#1a1a22" : "#241773");
      c.setAttribute("stroke", "#f5d76e");
      c.setAttribute("stroke-width", "2");
      const t = document.createElementNS(ns, "text");
      t.setAttribute("x", p.x); t.setAttribute("y", p.y + 4);
      t.setAttribute("text-anchor", "middle");
      t.setAttribute("fill", "#fff");
      t.setAttribute("font-size", "9");
      t.setAttribute("font-weight", "800");
      t.setAttribute("font-family", "system-ui,sans-serif");
      t.setAttribute("pointer-events", "none");
      t.textContent = p.role.slice(0, 3);
      grp.appendChild(c); grp.appendChild(t);
      g.appendChild(grp);

      const li = document.createElement("li");
      li.innerHTML = `<span class="role">${p.role}</span><span>${p.name}</span>`;
      roster.appendChild(li);
    });

    enableDrag(players);
  }

  function enableDrag(players) {
    const svg = $("#fieldSvg");
    let drag = null;

    function svgPoint(evt) {
      const pt = svg.createSVGPoint();
      pt.x = evt.clientX; pt.y = evt.clientY;
      const ctm = svg.getScreenCTM().inverse();
      return pt.matrixTransform(ctm);
    }

    function onMove(evt) {
      if (!drag) return;
      evt.preventDefault();
      const pt = svgPoint(evt.touches ? evt.touches[0] : evt);
      const x = Math.max(24, Math.min(536, pt.x));
      const y = Math.max(40, Math.min(860, pt.y));
      players[drag.idx].x = x;
      players[drag.idx].y = y;
      const grp = drag.el;
      grp.querySelector("circle").setAttribute("cx", x);
      grp.querySelector("circle").setAttribute("cy", y);
      const tx = grp.querySelector("text");
      tx.setAttribute("x", x); tx.setAttribute("y", y + 4);
    }
    function onUp() {
      if (!drag) return;
      drag = null;
      formState = { pkg: currentPkg, players };
      // don't auto-persist until Save — keep in memory
      window.__formDraft = { pkg: currentPkg, players: players.map((p) => ({ ...p })) };
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("touchmove", onMove);
      window.removeEventListener("touchend", onUp);
    }

    $$("#players .player").forEach((el) => {
      el.addEventListener("pointerdown", (evt) => {
        evt.preventDefault();
        drag = { el, idx: +el.dataset.idx };
        window.addEventListener("pointermove", onMove);
        window.addEventListener("pointerup", onUp);
      });
      el.addEventListener("touchstart", (evt) => {
        drag = { el, idx: +el.dataset.idx };
        window.addEventListener("touchmove", onMove, { passive: false });
        window.addEventListener("touchend", onUp);
      }, { passive: true });
    });
  }

  function initFormation() {
    $$(".seg-btn").forEach((b) => {
      b.addEventListener("click", () => {
        window.__formDraft = null;
        renderFormation(b.dataset.pkg);
      });
    });
    $("#btnSaveForm").addEventListener("click", () => {
      const draft = window.__formDraft || { pkg: currentPkg, players: getPlayers(currentPkg) };
      formState = draft;
      saveJSON(LS_FORM, formState);
      const flash = $("#saveFlash");
      flash.hidden = false;
      setTimeout(() => { flash.hidden = true; }, 1200);
    });
    $("#btnResetForm").addEventListener("click", () => {
      formState = null;
      window.__formDraft = null;
      localStorage.removeItem(LS_FORM);
      renderFormation(currentPkg);
    });
    if (formState && formState.pkg) currentPkg = formState.pkg;
    renderFormation(currentPkg);
  }

  /* ---------- animated plays ---------- */
  let playIdx = 0;
  let playing = false;
  let playT = 0;
  let playRaf = null;
  let playSpeed = 1;

  function initPlays() {
    const list = $("#playList");
    PLAYS.forEach((p, i) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "play-item" + (i === 0 ? " on" : "");
      btn.setAttribute("role", "option");
      btn.innerHTML = `<strong>${p.title.replace("EXAMPLE · ", "")}</strong><span>EXAMPLE concept</span>`;
      btn.addEventListener("click", () => selectPlay(i));
      list.appendChild(btn);
    });
    $("#btnPlayPause").addEventListener("click", togglePlay);
    $("#btnRestart").addEventListener("click", () => {
      playT = 0; drawPlayFrame(playT); if (!playing) setPlayBtn(false);
    });
    $("#playSpeed").addEventListener("input", (e) => {
      playSpeed = parseFloat(e.target.value) || 1;
    });
    selectPlay(0);
  }

  function selectPlay(i) {
    playIdx = i;
    playT = 0;
    playing = false;
    setPlayBtn(false);
    $$(".play-item").forEach((el, j) => el.classList.toggle("on", j === i));
    const p = PLAYS[i];
    $("#playTitle").textContent = p.title;
    $("#playBlurb").textContent = p.blurb;
    drawPlayFrame(0);
  }

  function setPlayBtn(on) {
    $("#btnPlayPause").textContent = on ? "Pause" : "Play";
  }

  function togglePlay() {
    playing = !playing;
    setPlayBtn(playing);
    if (playing) {
      let last = performance.now();
      const loop = (now) => {
        if (!playing) return;
        const dt = (now - last) / 1000;
        last = now;
        playT += dt * 0.35 * playSpeed;
        if (playT > 1.15) playT = 0;
        drawPlayFrame(Math.min(1, playT));
        playRaf = requestAnimationFrame(loop);
      };
      playRaf = requestAnimationFrame(loop);
    } else if (playRaf) {
      cancelAnimationFrame(playRaf);
    }
  }

  function ensurePlayFrame() {
    drawPlayFrame(Math.min(1, playT));
  }

  function drawField(ctx, W, H) {
    const g = ctx.createLinearGradient(0, 0, 0, H);
    g.addColorStop(0, "#1a5c2e");
    g.addColorStop(1, "#0d3a1c");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, W, H);
    ctx.strokeStyle = "rgba(255,255,255,0.2)";
    ctx.lineWidth = 1;
    for (let i = 1; i < 10; i++) {
      const y = (H / 10) * i;
      ctx.beginPath(); ctx.moveTo(20, y); ctx.lineTo(W - 20, y); ctx.stroke();
    }
    ctx.fillStyle = "rgba(36,23,115,0.45)";
    ctx.fillRect(0, 0, W, 36);
    ctx.fillRect(0, H - 36, W, 36);
    ctx.fillStyle = "rgba(245,215,110,0.7)";
    ctx.font = "bold 11px system-ui,sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("EXAMPLE FIELD", W / 2, 22);
  }

  function drawPlayFrame(t) {
    const canvas = $("#playCanvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const W = canvas.width, H = canvas.height;
    drawField(ctx, W, H);
    const play = PLAYS[playIdx];

    // OL blobs
    if (play.ol) {
      const baseY = H * 0.62;
      const xs = [W * 0.36, W * 0.42, W * 0.5, W * 0.58, W * 0.64];
      xs.forEach((x) => {
        ctx.beginPath();
        ctx.arc(x, baseY, 10, 0, Math.PI * 2);
        ctx.fillStyle = "#241773";
        ctx.fill();
        ctx.strokeStyle = "#f5d76e";
        ctx.lineWidth = 1.5;
        ctx.stroke();
      });
      // QB
      ctx.beginPath();
      ctx.arc(W * 0.5, H * 0.7, 11, 0, Math.PI * 2);
      ctx.fillStyle = "#3a1fa8";
      ctx.fill();
      ctx.strokeStyle = "#f5d76e";
      ctx.stroke();
      ctx.fillStyle = "#fff";
      ctx.font = "bold 9px system-ui";
      ctx.textAlign = "center";
      ctx.fillText("QB", W * 0.5, H * 0.7 + 3);
    }

    const scaleX = W / 560;
    const scaleY = H / 480;

    play.routes.forEach((r) => {
      const pts = r.path.map(([x, y]) => [x * scaleX, y * scaleY]);
      // full path ghost
      ctx.beginPath();
      pts.forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)));
      ctx.strokeStyle = r.color + "55";
      ctx.lineWidth = 2;
      ctx.setLineDash([6, 5]);
      ctx.stroke();
      ctx.setLineDash([]);

      // progressed path
      const prog = Math.min(1, t);
      const segs = pts.length - 1;
      const totalLen = segs; // approx by segments
      const dist = prog * totalLen;
      const si = Math.min(segs - 1, Math.floor(dist));
      const frac = dist - si;
      const pathPts = [];
      for (let i = 0; i <= si; i++) pathPts.push(pts[i]);
      if (si < segs) {
        const a = pts[si], b = pts[si + 1];
        pathPts.push([a[0] + (b[0] - a[0]) * frac, a[1] + (b[1] - a[1]) * frac]);
      }
      ctx.beginPath();
      pathPts.forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)));
      ctx.strokeStyle = r.color;
      ctx.lineWidth = 3;
      ctx.lineCap = "round";
      ctx.stroke();

      const tip = pathPts[pathPts.length - 1];
      ctx.beginPath();
      ctx.arc(tip[0], tip[1], 8, 0, Math.PI * 2);
      ctx.fillStyle = r.color;
      ctx.fill();
      ctx.fillStyle = "#0a0a0c";
      ctx.font = "bold 8px system-ui";
      ctx.textAlign = "center";
      ctx.fillText(r.label.slice(0, 4), tip[0], tip[1] - 12);
      ctx.fillStyle = r.color;
      ctx.font = "bold 10px system-ui";
      ctx.fillText(r.label, tip[0], tip[1] - 12);
    });

    ctx.fillStyle = "rgba(245,215,110,0.85)";
    ctx.font = "bold 12px system-ui";
    ctx.textAlign = "left";
    ctx.fillText("EXAMPLE · not a real play design from the club", 16, H - 14);
  }

  /* ---------- drive chart ---------- */
  function initDrive() {
    const list = $("#driveList");
    let pts = 0, longest = 0;
    const mix = { td: 0, fg: 0, punt: 0, to: 0 };

    DRIVES.forEach((d) => {
      const yards = Math.abs(d.end - d.start);
      if (yards > longest) longest = yards;
      if (d.result === "td") pts += 7;
      if (d.result === "fg") pts += 3;
      mix[d.result] = (mix[d.result] || 0) + 1;

      // field position: start/end as % of field (0-100 yard line → bar)
      const left = Math.min(d.start, d.end);
      const width = Math.max(2, Math.abs(d.end - d.start));

      const card = document.createElement("article");
      card.className = "drive-card";
      card.tabIndex = 0;
      card.innerHTML = `
        <div class="drive-bar-row">
          <div class="drive-num">D${d.id}</div>
          <div class="drive-track" aria-hidden="true">
            <div class="drive-fill" style="left:${left}%;width:${width}%"></div>
            <div class="drive-marks"><span>0</span><span>25</span><span>50</span><span>75</span><span>EZ</span></div>
          </div>
          <div class="drive-result ${d.result}">${d.label}</div>
        </div>
        <div class="drive-detail">
          <strong>${d.downs}</strong>
          <ul>${d.notes.map((n) => `<li>${n}</li>`).join("")}</ul>
        </div>`;
      const toggle = () => {
        const open = !card.classList.contains("open");
        $$(".drive-card").forEach((c) => c.classList.remove("open"));
        if (open) card.classList.add("open");
      };
      card.addEventListener("click", toggle);
      card.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); toggle(); }
      });
      list.appendChild(card);
    });

    $("#dsCount").textContent = String(DRIVES.length);
    $("#dsPts").textContent = String(pts);
    $("#dsLong").textContent = longest + " yds";
    $("#dsMix").textContent = `TD ${mix.td} · FG ${mix.fg} · P ${mix.punt} · TO ${mix.to}`;
  }

  /* ---------- film notes ---------- */
  function initNotes() {
    const pad = $("#filmPad");
    pad.value = loadJSON(LS_NOTES, "") || "";
    if (typeof pad.value !== "string") pad.value = "";

    $("#btnSaveNotes").addEventListener("click", () => {
      saveJSON(LS_NOTES, pad.value);
      const flash = $("#notesFlash");
      flash.hidden = false;
      setTimeout(() => { flash.hidden = true; }, 1200);
    });
    $("#btnClearNotes").addEventListener("click", () => {
      pad.value = "";
      saveJSON(LS_NOTES, "");
    });

    let checks = loadJSON(LS_CHECKS, null);
    if (!Array.isArray(checks) || checks.length !== HOME_CHECKS.length) {
      checks = HOME_CHECKS.map((t) => ({ text: t, done: false }));
    }
    let watch = loadJSON(LS_WATCH, null);
    if (!Array.isArray(watch) || !watch.length) watch = DEFAULT_WATCH.map((w) => ({ ...w }));

    function renderChecks() {
      const ul = $("#checkList");
      ul.innerHTML = "";
      checks.forEach((c, i) => {
        const li = document.createElement("li");
        if (c.done) li.classList.add("done");
        li.innerHTML = `<input type="checkbox" id="ck${i}" ${c.done ? "checked" : ""}><label for="ck${i}">${c.text}</label>`;
        li.querySelector("input").addEventListener("change", (e) => {
          checks[i].done = e.target.checked;
          saveJSON(LS_CHECKS, checks);
          li.classList.toggle("done", e.target.checked);
        });
        ul.appendChild(li);
      });
    }
    function renderWatch() {
      const ul = $("#watchList");
      ul.innerHTML = "";
      watch.forEach((c, i) => {
        const li = document.createElement("li");
        if (c.done) li.classList.add("done");
        li.innerHTML = `<input type="checkbox" id="wk${i}" ${c.done ? "checked" : ""}><label for="wk${i}">${c.text}</label>`;
        li.querySelector("input").addEventListener("change", (e) => {
          watch[i].done = e.target.checked;
          saveJSON(LS_WATCH, watch);
          li.classList.toggle("done", e.target.checked);
        });
        ul.appendChild(li);
      });
    }
    renderChecks();
    renderWatch();

    $("#btnResetChecks").addEventListener("click", () => {
      checks = HOME_CHECKS.map((t) => ({ text: t, done: false }));
      watch = DEFAULT_WATCH.map((w) => ({ ...w }));
      saveJSON(LS_CHECKS, checks);
      saveJSON(LS_WATCH, watch);
      renderChecks();
      renderWatch();
    });
  }

  /* ---------- chrome ---------- */
  function initChrome() {
    $("#btnWall").addEventListener("click", () => {
      document.body.classList.toggle("wall");
    });
    $("#btnHelp").addEventListener("click", () => {
      $("#helpDlg").showModal();
    });
    $("#weekLabel").textContent = "EXAMPLE · Film Week Demo";
  }

  /* ---------- boot ---------- */
  initBg();
  initTabs();
  initFormation();
  initPlays();
  initDrive();
  initNotes();
  initChrome();
})();
