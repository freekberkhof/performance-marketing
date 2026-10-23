/* Performance Plus · ronde 4 · gedeelde interactie voor light.html (optie 01) en dark.html (optie 03).
   Alles draait lokaal: geen externe scripts, geen netwerkverkeer, niets wordt opgeslagen of verstuurd.
   Alle cliëntgegevens hieronder zijn fictief en bedoeld voor deze demo. */
(function () {
  "use strict";

  var doc = document;
  var root = doc.documentElement;
  root.classList.add("js");

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  /* ---------- Hulpfuncties ---------- */

  function $(sel, ctx) { return (ctx || doc).querySelector(sel); }
  function $$(sel, ctx) { return Array.prototype.slice.call((ctx || doc).querySelectorAll(sel)); }
  function clamp(v, lo, hi) { return Math.min(hi, Math.max(lo, v)); }
  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  /* Decimalen met komma, zoals in Nederlandse rapportage. */
  function nl(n, d) {
    if (n === null || n === undefined || isNaN(n)) return "–";
    var rounded = Number(n).toFixed(d === undefined ? 1 : d);
    if (Number(rounded) === 0) rounded = rounded.replace(/^-/, "");
    return rounded.replace(".", ",");
  }
  function avg(list) {
    var v = list.filter(function (x) { return x !== null && x !== undefined; });
    if (!v.length) return null;
    return v.reduce(function (a, b) { return a + b; }, 0) / v.length;
  }
  function addDays(date, n) { var d = new Date(date.getTime()); d.setDate(d.getDate() + n); return d; }
  function pad(n) { return n < 10 ? "0" + n : String(n); }
  function dShort(d) { return pad(d.getDate()) + "-" + pad(d.getMonth() + 1); }
  function dLong(d) { return dShort(d) + "-" + d.getFullYear(); }
  var announcer = null;
  function announce(msg) {
    if (!announcer) announcer = $("#live-region");
    if (!announcer) return;
    announcer.textContent = "";
    window.setTimeout(function () { announcer.textContent = msg; }, 40);
  }

  /* ---------- Fictieve demodata ----------
     8 weken, 2 sessies per week (di + vr). null = geen check-in na de sessie of sessie niet uitgevoerd.
     Schalen 0–10 zoals de cliënt ze in de app invult. */

  var PERIOD_START = new Date(2026, 7, 24); // maandag 24-08-2026
  var SESSION_OFFSETS = [1, 4];

  var CLIENTS = [
    {
      id: "frans", name: "Frans Broekhof", initials: "FB", sport: "Tennis", klacht: "VKB rechts",
      doel: "Terug op de baan", fase: 2, fases: 6, faseNaam: "Dynamisch belasten",
      behandelaar: "Freek Berkhof", programTotal: 32, programDoneBefore: 0, exercises: 7,
      missed: [], noCheckin: [6],
      pijnNa:     [6, 6, 5.5, 5, 5, 4.5, null, 4.5, 4, 4, 3.5, 4, 3.5, 3, 3, 3],
      pijnTijdens:[5, 5, 4.5, 4.5, 4, 4, null, 3.5, 3.5, 3, 3, 3, 2.5, 2.5, 2.5, 2],
      rpe:        [5, 5.5, 5.5, 6, 6, 6.5, null, 6.5, 7, 7, 7, 7.5, 7, 7.5, 7.5, 7.5],
      motivatie:  [6, 6.5, 6, 6.5, 7, 7, null, 7, 7.5, 7, 7.5, 8, 7.5, 8, 8, 8],
      afgevinkt:  [7, 7, 6, 7, 7, 7, 7, 6, 7, 7, 7, 7, 7, 7, 6, 7],
      daily: { filled: 41, slaap: 7.1, stress: 3.8, pijn: 3.2, last: new Date(2026, 9, 18), lastPijn: 3 },
      notes: [[9, "Sprongetjes voelden nog onwennig, verder goed."], [13, "Traplopen na de sessie ging zonder klachten."]]
    },
    {
      id: "sanne", name: "Sanne Bos", initials: "SB", sport: "Hardlopen", klacht: "Achillespees links",
      doel: "Halve marathon in het voorjaar", fase: 3, fases: 5, faseNaam: "Opbouw looptraining",
      behandelaar: "Kaylee V.", programTotal: 30, programDoneBefore: 8, exercises: 6,
      missed: [5, 10, 14], noCheckin: [1, 8],
      pijnNa:     [4, null, 4.5, 4, 3.5, null, 3.5, 4, null, 3.5, null, 3, 3.5, 3, null, 3],
      pijnTijdens:[3, null, 3.5, 3, 3, null, 3, 3, null, 2.5, null, 2.5, 3, 2.5, null, 2.5],
      rpe:        [6, null, 6, 6.5, 6.5, null, 6.5, 7, null, 7, null, 7, 7, 7.5, null, 7.5],
      motivatie:  [6.5, null, 6, 6, 5.5, null, 6, 5.5, null, 6, null, 5.5, 5, 5.5, null, 5],
      afgevinkt:  [6, 6, 5, 6, 6, 0, 6, 5, 6, 6, 0, 6, 5, 6, 0, 6],
      daily: { filled: 19, slaap: 4.6, stress: 6.8, pijn: 3.0, last: new Date(2026, 9, 17), lastPijn: 3 },
      notes: [[3, "Kuit stijf na de intervalloop."], [12, "Weinig geslapen deze week, training wel gedaan."]]
    },
    {
      id: "youssef", name: "Youssef El Amrani", initials: "YE", sport: "Voetbal", klacht: "Hamstring rechts",
      doel: "Volledige wedstrijd spelen", fase: 4, fases: 5, faseNaam: "Sportspecifiek",
      behandelaar: "Freek Berkhof", programTotal: 36, programDoneBefore: 14, exercises: 7,
      missed: [], noCheckin: [],
      pijnNa:     [2, 2, 1.5, 2, 1.5, 1, 1, 1, 1, 0.5, 1, 0.5, 0.5, 0.5, 0, 0.5],
      pijnTijdens:[1.5, 1.5, 1, 1.5, 1, 1, 0.5, 1, 0.5, 0.5, 0.5, 0.5, 0, 0.5, 0, 0],
      rpe:        [7, 7, 7.5, 7.5, 7.5, 8, 7.5, 8, 8, 8, 8.5, 8, 8, 8.5, 8.5, 8],
      motivatie:  [8, 8, 8.5, 8, 8.5, 8.5, 9, 8.5, 9, 8.5, 9, 9, 9, 8.5, 9, 9],
      afgevinkt:  [7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7],
      daily: { filled: 48, slaap: 7.6, stress: 3.1, pijn: 0.9, last: new Date(2026, 9, 18), lastPijn: 1 },
      notes: [[11, "Sprints op 90% voelden goed."], [15, "Week 8, sessie 2: alles afgevinkt."]]
    },
    {
      id: "lotte", name: "Lotte Vermeer", initials: "LV", sport: "Volleybal", klacht: "Schouder links",
      doel: "Weer bovenhands slaan", fase: 1, fases: 4, faseNaam: "Belastbaarheid opbouwen",
      behandelaar: "Kaylee V.", programTotal: 24, programDoneBefore: 0, exercises: 5,
      missed: [], noCheckin: [],
      pijnNa:     [5, 5.5, 5, 5, 4.5, 5, 5.5, 5, 4.5, 5, 5.5, 6, 6, 6.5, 7, 6.5],
      pijnTijdens:[4, 4.5, 4, 4, 4, 4, 4.5, 4, 4, 4, 4.5, 5, 5, 5.5, 6, 5.5],
      rpe:        [5, 5, 5.5, 5, 5.5, 5.5, 6, 6, 6, 6, 6.5, 6.5, 6.5, 7, 7, 6.5],
      motivatie:  [7, 7, 6.5, 6.5, 6, 6, 6, 5.5, 5.5, 5.5, 5, 5, 5, 4.5, 4.5, 5],
      afgevinkt:  [5, 5, 5, 4, 5, 5, 5, 5, 4, 5, 5, 5, 4, 5, 5, 5],
      daily: { filled: 37, slaap: 6.2, stress: 5.0, pijn: 5.4, last: new Date(2026, 9, 17), lastPijn: 7 },
      notes: [[10, "Bovenhands slaan doet weer meer pijn."], [14, "Na de sessie zeurend gevoel, 's avonds beter."]]
    }
  ];

  var METRICS = {
    pijnNa: { label: "Pijn na", long: "Pijn na de sessie", marker: "circle", color: "var(--c-pain)", dash: "" },
    rpe: { label: "RPE", long: "Ervaren inspanning (RPE)", marker: "square", color: "var(--c-rpe)", dash: "6 4" },
    motivatie: { label: "Motivatie", long: "Motivatie", marker: "diamond", color: "var(--c-mot)", dash: "2 4" },
    pijnTijdens: { label: "Pijn tijdens", long: "Pijn tijdens de sessie", marker: "circle", color: "var(--c-pain)", dash: "" }
  };

  /* Afgeleide sessielijst met datum, week en status. */
  CLIENTS.forEach(function (c) {
    c.sessions = c.pijnNa.map(function (_, i) {
      var week = Math.floor(i / 2);
      var date = addDays(PERIOD_START, week * 7 + SESSION_OFFSETS[i % 2]);
      var missed = c.missed.indexOf(i) !== -1;
      return {
        i: i, week: week + 1, nr: (i % 2) + 1, date: date, missed: missed,
        checkin: !missed && c.noCheckin.indexOf(i) === -1,
        afgevinkt: c.afgevinkt[i],
        pijnNa: c.pijnNa[i], pijnTijdens: c.pijnTijdens[i], rpe: c.rpe[i], motivatie: c.motivatie[i],
        note: (c.notes.filter(function (n) { return n[0] === i; })[0] || [])[1] || ""
      };
    });
    var done = c.sessions.filter(function (s) { return !s.missed; });
    c.doneCount = done.length;
    c.programDone = c.programDoneBefore + done.length;
    var recent = c.sessions.slice(-4);
    c.rpeRecent = avg(recent.map(function (s) { return s.rpe; }));
    c.motRecent = avg(recent.map(function (s) { return s.motivatie; }));
    var lastWithPain = done.filter(function (s) { return s.pijnNa !== null; }).slice(-1)[0];
    c.lastPijnNa = lastWithPain ? lastWithPain.pijnNa : null;
    var highPain = recent.filter(function (s) { return s.pijnNa >= 7 || s.pijnTijdens >= 7; });
    c.flags = [];
    highPain.forEach(function (s) {
      c.flags.push({ kind: "prio", label: "Hoge pijnscore", detail: "Pijn na sessie: " + nl(s.pijnNa) + " · " + dLong(s.date) });
    });
    if (c.daily.lastPijn >= 7) c.flags.push({ kind: "prio", label: "Hoge pijnscore (check-in)", detail: "Pijn " + nl(c.daily.lastPijn, 0) + " · " + dLong(c.daily.last) });
    if (c.daily.filled < 28) c.flags.push({ kind: "info", label: "Weinig check-ins", detail: c.daily.filled + " van 56 dagen ingevuld" });
    var noCi = c.sessions.filter(function (s) { return !s.missed && !s.checkin; }).length;
    if (noCi) c.flags.push({ kind: "info", label: "Sessie zonder check-in", detail: noCi + (noCi === 1 ? " sessie" : " sessies") + " in deze periode" });
    if (c.missed.length) c.flags.push({ kind: "info", label: "Sessie niet uitgevoerd", detail: c.missed.length + " van 16 geplande sessies" });
    c.status = c.flags.some(function (f) { return f.kind === "prio"; }) ? "prio" : (c.daily.filled < 28 ? "checkins" : "rust");
  });

  var STATUS_LABEL = { prio: "Melding met voorrang", checkins: "Weinig check-ins", rust: "Regulier" };

  function clientById(id) { return CLIENTS.filter(function (c) { return c.id === id; })[0] || CLIENTS[0]; }

  /* Gedeelde selectie: portaal, scenario en verslag volgen dezelfde cliënt. */
  var state = { client: "frans", listeners: [] };
  function selectClient(id, source) {
    state.client = clientById(id).id;
    state.listeners.forEach(function (fn) { fn(state.client, source); });
  }
  function onClient(fn) { state.listeners.push(fn); }

  /* ---------- Header en mobiel menu ---------- */

  function initMenu() {
    var toggle = $(".menu-toggle");
    var nav = $("#site-nav");
    if (!toggle || !nav) return;
    var mq = window.matchMedia("(max-width: 899px)");
    function setOpen(open, restore) {
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.querySelector("[data-menu-label]").textContent = open ? "Sluit" : "Menu";
      root.classList.toggle("menu-open", open);
      if (open) { var first = nav.querySelector("a, button"); if (first) first.focus(); }
      else if (restore) toggle.focus();
    }
    toggle.addEventListener("click", function () { setOpen(toggle.getAttribute("aria-expanded") !== "true"); });
    nav.addEventListener("click", function (e) { if (e.target.closest("a") && mq.matches) setOpen(false); });
    doc.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && root.classList.contains("menu-open")) setOpen(false, true);
    });
    nav.addEventListener("keydown", function (e) {
      if (e.key !== "Tab" || !root.classList.contains("menu-open")) return;
      var items = $$("a, button", nav).concat([toggle]);
      var first = items[0], last = items[items.length - 2];
      if (e.shiftKey && doc.activeElement === first) { e.preventDefault(); toggle.focus(); }
      else if (!e.shiftKey && doc.activeElement === last) { e.preventDefault(); toggle.focus(); }
    });
    mq.addEventListener("change", function () { if (!mq.matches) setOpen(false); });
  }

  /* ---------- App-scroll: port van Kaylees AppShowcase (components/app-showcase.tsx) ----------
     Zelfde vensterlogica: 4 segmenten, FADE 0.06, schermen schuiven als sheet omhoog (103% → 0),
     het vorige scherm schaalt naar 0.93 en dimt tot 0.42, tekst en aside driften mee,
     4-delige voortgangsbalk. Alleen op brede, hoge schermen zonder reduced motion. */

  var SHEET = cubicBezier(0.32, 0.72, 0, 1);
  function cubicBezier(x1, y1, x2, y2) {
    function bx(t) { return 3 * x1 * t * (1 - t) * (1 - t) + 3 * x2 * t * t * (1 - t) + t * t * t; }
    function by(t) { return 3 * y1 * t * (1 - t) * (1 - t) + 3 * y2 * t * t * (1 - t) + t * t * t; }
    return function (x) {
      if (x <= 0) return 0; if (x >= 1) return 1;
      var lo = 0, hi = 1, t = x;
      for (var k = 0; k < 24; k++) { t = (lo + hi) / 2; if (bx(t) < x) lo = t; else hi = t; }
      return by(t);
    };
  }
  /* Lineaire interpolatie over meerdere punten, zoals useTransform. */
  function lerp(p, input, output, ease) {
    if (p <= input[0]) return output[0];
    for (var k = 1; k < input.length; k++) {
      if (p <= input[k]) {
        var t = (p - input[k - 1]) / (input[k] - input[k - 1]);
        if (ease) t = ease(t);
        return output[k - 1] + (output[k] - output[k - 1]) * t;
      }
    }
    return output[output.length - 1];
  }

  function initAppStory() {
    var story = $("[data-story]");
    if (!story) return;
    var N = 4, SEG = 1 / N, FADE = 0.06;
    var track = $(".story-track", story);
    var layers = $$(".screen-layer", story);
    var dims = $$(".screen-dim", story);
    var texts = $$(".story-text", story);
    var asides = $$(".story-aside-item", story);
    var ticks = $$(".story-tick i", story);
    var buttons = $$("[data-story-step]", story);
    var prev = $("[data-story-prev]", story);
    var next = $("[data-story-next]", story);
    var phone = $(".story-phone", story);
    var counter = $("[data-story-count]", story);
    var pinnedMq = window.matchMedia("(min-width: 1100px) and (min-height: 700px)");
    var pinned = false, inView = false, frame = 0, active = 0;

    function presence(i) {
      var enter = i * SEG, exit = (i + 1) * SEG;
      if (i === 0) return [[exit - FADE, exit - 0.02], [1, 0]];
      if (i === N - 1) return [[enter - 0.02, enter + FADE], [0, 1]];
      return [[enter - 0.02, enter + FADE, exit - FADE, exit - 0.02], [0, 1, 1, 0]];
    }
    function drift(i, dist) {
      var enter = i * SEG, exit = (i + 1) * SEG;
      if (i === 0) return [[0, exit], [0, -dist]];
      if (i === N - 1) return [[enter - 0.02, 1], [dist, 0]];
      return [[enter - 0.02, exit], [dist, -dist]];
    }

    function progress() {
      var r = track.getBoundingClientRect();
      var total = r.height - window.innerHeight;
      return total > 0 ? clamp(-r.top / total, 0, 1) : 0;
    }

    function render() {
      frame = 0;
      if (!pinned) return;
      var p = progress();
      layers.forEach(function (el, i) {
        var enter = i * SEG, cover = (i + 1) * SEG, first = i === 0, last = i === N - 1;
        var y = first ? 0 : lerp(p, [enter - FADE, enter + FADE], [103, 0], SHEET);
        var s = last ? 1 : lerp(p, [cover - FADE, cover + FADE], [1, 0.93]);
        var d = last ? 0 : lerp(p, [cover - FADE, cover + FADE], [0, 0.42]);
        var rad = first ? lerp(p, [cover - FADE, cover + FADE], [0, 24])
          : last ? lerp(p, [enter - FADE, enter + FADE], [32, 0])
          : lerp(p, [enter - FADE, enter + FADE, cover - FADE, cover + FADE], [32, 0, 0, 24]);
        el.style.transform = "translate3d(0," + y.toFixed(2) + "%,0) scale(" + s.toFixed(4) + ")";
        el.style.borderRadius = rad.toFixed(1) + "px";
        dims[i].style.opacity = d.toFixed(3);
      });
      texts.forEach(function (el, i) {
        var pr = presence(i), dr = drift(i, 36);
        var o = lerp(p, pr[0], pr[1]);
        el.style.opacity = o.toFixed(3);
        el.style.transform = "translate3d(0," + lerp(p, dr[0], dr[1]).toFixed(1) + "px,0)";
        el.style.setProperty("--rule", o.toFixed(3));
        el.style.visibility = o < 0.02 ? "hidden" : "visible";
      });
      asides.forEach(function (el, i) {
        var pr = presence(i), dr = drift(i, 70);
        var o = lerp(p, pr[0], pr[1]);
        el.style.opacity = o.toFixed(3);
        el.style.transform = "translate3d(0," + lerp(p, dr[0], dr[1]).toFixed(1) + "px,0)";
      });
      ticks.forEach(function (el, i) {
        el.style.transform = "scaleX(" + lerp(p, [i * SEG, (i + 1) * SEG], [0, 1]).toFixed(3) + ")";
      });
      setActive(Math.min(N - 1, Math.floor(p * N + 0.0001)), false);
    }
    function schedule() { if (pinned && inView && !frame) frame = window.requestAnimationFrame(render); }

    function setActive(i, fromUser) {
      var changed = i !== active;
      active = i;
      buttons.forEach(function (b, k) {
        if (k === i) b.setAttribute("aria-current", "step"); else b.removeAttribute("aria-current");
      });
      if (counter) counter.textContent = (i + 1) + " van " + N;
      if (!pinned) {
        layers.forEach(function (el, k) {
          el.classList.toggle("is-active", k === i);
          el.classList.toggle("is-before", k < i);
          el.setAttribute("aria-hidden", k === i ? "false" : "true");
        });
        texts.forEach(function (el, k) { el.hidden = k !== i; });
        asides.forEach(function (el, k) { el.hidden = k !== i; });
        ticks.forEach(function (el, k) { el.style.transform = "scaleX(" + (k <= i ? 1 : 0) + ")"; });
        if (prev) prev.disabled = i === 0;
        if (next) next.disabled = i === N - 1;
        if (changed && fromUser) announce("Scherm " + (i + 1) + " van " + N + ": " + texts[i].querySelector("h3").textContent);
      }
    }

    function go(i) {
      i = clamp(i, 0, N - 1);
      if (pinned) {
        var r = track.getBoundingClientRect();
        var total = r.height - window.innerHeight;
        var target = window.scrollY + r.top + total * ((i + 0.5) * SEG);
        window.scrollTo({ top: target, behavior: reduceMotion.matches ? "auto" : "smooth" });
        setActive(i, true);
        announce("Scherm " + (i + 1) + " van " + N + ": " + texts[i].querySelector("h3").textContent);
      } else {
        setActive(i, true);
      }
    }

    function clearInline() {
      layers.concat(texts, asides, ticks, dims).forEach(function (el) {
        el.style.transform = ""; el.style.opacity = ""; el.style.borderRadius = ""; el.style.visibility = "";
      });
    }

    function applyMode() {
      pinned = pinnedMq.matches && !reduceMotion.matches;
      story.classList.toggle("is-pinned", pinned);
      story.classList.toggle("is-manual", !pinned);
      clearInline();
      if (pinned) {
        texts.forEach(function (el) { el.hidden = false; });
        asides.forEach(function (el) { el.hidden = false; });
        layers.forEach(function (el) { el.classList.remove("is-active", "is-before"); el.removeAttribute("aria-hidden"); });
        render();
      } else {
        setActive(active, false);
      }
    }

    buttons.forEach(function (b, i) {
      b.addEventListener("click", function () { go(i); });
      b.addEventListener("keydown", function (e) {
        var k = e.key === "ArrowRight" || e.key === "ArrowDown" ? 1 : e.key === "ArrowLeft" || e.key === "ArrowUp" ? -1 : 0;
        if (e.key === "Home") k = -i; if (e.key === "End") k = N - 1 - i;
        if (!k) return;
        e.preventDefault();
        var t = clamp(i + k, 0, N - 1);
        buttons[t].focus();
        go(t);
      });
    });
    if (prev) prev.addEventListener("click", function () { go(active - 1); });
    if (next) next.addEventListener("click", function () { go(active + 1); });

    /* Handmatig vegen in de compacte weergave. */
    if (phone) {
      var sx = null, sy = null;
      phone.addEventListener("pointerdown", function (e) { if (!pinned) { sx = e.clientX; sy = e.clientY; } });
      phone.addEventListener("pointerup", function (e) {
        if (sx === null) return;
        var dx = e.clientX - sx, dy = e.clientY - sy;
        sx = null;
        if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) go(active + (dx < 0 ? 1 : -1));
      });
      phone.addEventListener("pointercancel", function () { sx = null; });
    }

    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (entries) {
        inView = entries[0].isIntersecting;
        if (inView) schedule();
      }, { rootMargin: "100px 0px" }).observe(track);
    } else { inView = true; }
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    pinnedMq.addEventListener("change", applyMode);
    reduceMotion.addEventListener("change", applyMode);
    applyMode();
  }

  /* ---------- SVG-lijngrafiek ---------- */

  var SVGNS = "http://www.w3.org/2000/svg";
  function marker(type, x, y, cls) {
    var s = 4.2;
    if (type === "square") return '<rect class="' + cls + '" x="' + (x - s) + '" y="' + (y - s) + '" width="' + 2 * s + '" height="' + 2 * s + '"/>';
    if (type === "diamond") return '<path class="' + cls + '" d="M' + x + " " + (y - s - 1) + "L" + (x + s + 1) + " " + y + "L" + x + " " + (y + s + 1) + "L" + (x - s - 1) + " " + y + 'Z"/>';
    return '<circle class="' + cls + '" cx="' + x + '" cy="' + y + '" r="' + s + '"/>';
  }

  /* opts: { xs: [{x, label}], xMin, xMax, series: [{key, values:[{x,y}], color, dash, marker, cls}],
     band: [{x, lo, hi}], missing: [x], vline: {x, label}, yLabel, title, desc } */
  function drawChart(host, opts) {
    var w = Math.max(280, Math.round(host.clientWidth || 600));
    var h = Math.round(clamp(w * 0.42, 230, 340));
    var m = { l: 42, r: 18, t: 18, b: 40 };
    var iw = w - m.l - m.r, ih = h - m.t - m.b;
    function X(x) { return m.l + (x - opts.xMin) / (opts.xMax - opts.xMin) * iw; }
    function Y(y) { return m.t + ih - y / 10 * ih; }
    var out = [];
    out.push('<svg xmlns="' + SVGNS + '" viewBox="0 0 ' + w + " " + h + '" width="' + w + '" height="' + h + '" role="img" aria-labelledby="' + opts.id + '-t ' + opts.id + '-d" class="chart-svg">');
    out.push('<title id="' + opts.id + '-t">' + esc(opts.title) + "</title><desc id=\"" + opts.id + '-d">' + esc(opts.desc) + "</desc>");
    for (var g = 0; g <= 10; g += 2) {
      out.push('<line class="grid" x1="' + m.l + '" x2="' + (w - m.r) + '" y1="' + Y(g) + '" y2="' + Y(g) + '"/>');
      out.push('<text class="tick" x="' + (m.l - 10) + '" y="' + (Y(g) + 4) + '" text-anchor="end">' + g + "</text>");
    }
    out.push('<text class="axis-label" x="' + m.l + '" y="11">' + esc(opts.yLabel) + "</text>");
    var every = Math.ceil(opts.xs.length / Math.max(2, Math.floor(iw / 64)));
    opts.xs.forEach(function (t, k) {
      if (k % every !== 0 && k !== opts.xs.length - 1) return;
      out.push('<text class="tick" x="' + X(t.x) + '" y="' + (h - m.b + 20) + '" text-anchor="middle">' + esc(t.label) + "</text>");
    });
    out.push('<line class="axis" x1="' + m.l + '" x2="' + (w - m.r) + '" y1="' + Y(0) + '" y2="' + Y(0) + '"/>');
    if (opts.band && opts.band.length) {
      var top = opts.band.map(function (b) { return X(b.x) + "," + Y(b.hi); });
      var bot = opts.band.slice().reverse().map(function (b) { return X(b.x) + "," + Y(b.lo); });
      out.push('<polygon class="band" points="' + top.concat(bot).join(" ") + '"/>');
    }
    if (opts.vline) {
      out.push('<line class="vline" x1="' + X(opts.vline.x) + '" x2="' + X(opts.vline.x) + '" y1="' + m.t + '" y2="' + Y(0) + '"/>');
      out.push('<text class="vline-label" x="' + (X(opts.vline.x) + 6) + '" y="' + (m.t + 12) + '">' + esc(opts.vline.label) + "</text>");
    }
    (opts.missing || []).forEach(function (x) {
      out.push('<g class="missing"><line x1="' + X(x) + '" x2="' + X(x) + '" y1="' + (Y(0) - 10) + '" y2="' + Y(0) + '"/><path d="M' + (X(x) - 3.5) + " " + (Y(0) - 17) + "l7 7m0 -7l-7 7\"/></g>");
    });
    opts.series.forEach(function (s) {
      var d = "", pen = false;
      s.values.forEach(function (v) {
        if (v.y === null || v.y === undefined) { pen = false; return; }
        d += (pen ? "L" : "M") + X(v.x).toFixed(1) + " " + Y(v.y).toFixed(1);
        pen = true;
      });
      out.push('<path class="line ' + (s.cls || "") + '" d="' + d + '" style="stroke:' + s.color + '"' + (s.dash ? ' stroke-dasharray="' + s.dash + '"' : "") + "/>");
      if (s.marker) {
        out.push('<g class="markers" style="fill:' + s.color + '">');
        s.values.forEach(function (v) { if (v.y !== null && v.y !== undefined) out.push(marker(s.marker, X(v.x), Y(v.y), "mk")); });
        out.push("</g>");
      }
    });
    out.push("</svg>");
    host.innerHTML = out.join("");
  }

  function legendItem(m, label) {
    var sym = m.marker === "square" ? '<rect x="11" y="3" width="8" height="8"/>'
      : m.marker === "diamond" ? '<path d="M15 2l5 5-5 5-5-5z"/>' : '<circle cx="15" cy="7" r="4"/>';
    return '<span class="legend-item"><svg width="30" height="14" viewBox="0 0 30 14" aria-hidden="true" style="color:' + m.color + '"><line x1="0" x2="30" y1="7" y2="7" stroke="currentColor" stroke-width="2"' + (m.dash ? ' stroke-dasharray="' + m.dash + '"' : "") + '/><g fill="currentColor">' + sym + "</g></svg>" + esc(label) + "</span>";
  }

  /* ---------- Praktijkportaal ---------- */

  function ring(label, value, sub, fraction, color) {
    var size = 76, stroke = 7, r = (size - stroke) / 2, c = 2 * Math.PI * r;
    return '<div class="ring-card"><span class="ring"><svg viewBox="0 0 ' + size + " " + size + '" aria-hidden="true"><circle cx="38" cy="38" r="' + r + '" fill="none" stroke="' + color + '" stroke-opacity="0.22" stroke-width="' + stroke + '"/><circle cx="38" cy="38" r="' + r + '" fill="none" stroke="' + color + '" stroke-width="' + stroke + '" stroke-linecap="round" stroke-dasharray="' + (c * fraction).toFixed(1) + " " + c.toFixed(1) + '" transform="rotate(-90 38 38)"/></svg><strong>' + value + '</strong></span><span class="ring-label">' + label + '</span><span class="ring-sub">' + sub + "</span></div>";
  }

  function initPortal() {
    var portal = $("[data-portal]");
    if (!portal) return;
    var tbody = $("[data-client-rows]", portal);
    var search = $("#client-search");
    var filters = $$("input[name='status-filter']", portal);
    var count = $("[data-result-count]", portal);
    var detail = $("#client-detail");
    var tabs = $$("[role='tab']", detail);
    var panels = $$("[role='tabpanel']", detail);
    var seriesBtns = $$("[data-series]", detail);
    var ranges = $$("input[name='chart-range']", detail);
    var chartHost = $("[data-chart]", detail);
    var chartSummary = $("[data-chart-summary]", detail);
    var chartMeta = $("[data-chart-meta]", detail);
    var legend = $("[data-chart-legend]", detail);
    var activeSeries = { pijnNa: true, rpe: true, motivatie: true };

    function counts() {
      var res = { all: CLIENTS.length, prio: 0, checkins: 0, rust: 0 };
      CLIENTS.forEach(function (c) { res[c.status]++; });
      $$("[data-count]", portal).forEach(function (el) { el.textContent = res[el.getAttribute("data-count")]; });
    }

    function filterValue() { var f = filters.filter(function (x) { return x.checked; })[0]; return f ? f.value : "all"; }

    function renderRows(silent) {
      var q = (search.value || "").trim().toLowerCase();
      var f = filterValue();
      var rows = CLIENTS.filter(function (c) {
        var hay = (c.name + " " + c.sport + " " + c.klacht + " " + c.faseNaam).toLowerCase();
        return (f === "all" || c.status === f) && (!q || hay.indexOf(q) !== -1);
      });
      tbody.innerHTML = rows.map(function (c) {
        var sel = c.id === state.client;
        return '<tr class="' + (sel ? "is-selected" : "") + '" data-row="' + c.id + '">' +
          '<th scope="row"><button type="button" class="row-btn" data-open="' + c.id + '" aria-controls="client-detail"' + (sel ? ' aria-current="true"' : "") + '><span class="avatar" aria-hidden="true">' + c.initials + '</span><span><span class="row-name">' + esc(c.name) + '</span><span class="row-sub">' + esc(c.sport + " · " + c.klacht) + "</span></span></button></th>" +
          "<td>Fase " + c.fase + " van " + c.fases + '<span class="row-sub">' + esc(c.faseNaam) + "</span></td>" +
          '<td class="num">' + c.doneCount + "/16</td>" +
          '<td class="num">' + dShort(c.daily.last) + '<span class="row-sub">' + c.daily.filled + "/56 dagen</span></td>" +
          '<td class="num">' + nl(c.rpeRecent) + "</td>" +
          '<td class="num">' + nl(c.lastPijnNa) + "</td>" +
          '<td><span class="status status-' + c.status + '">' + STATUS_LABEL[c.status] + "</span></td></tr>";
      }).join("") || '<tr><td colspan="7" class="empty-row">Geen cliënten gevonden. Pas de zoekterm of het statusfilter aan.</td></tr>';
      count.textContent = rows.length + (rows.length === 1 ? " cliënt" : " cliënten") + " getoond";
      if (!silent) announce(count.textContent);
    }

    tbody.addEventListener("click", function (e) {
      var btn = e.target.closest("[data-open]");
      var row = e.target.closest("[data-row]");
      var id = btn ? btn.getAttribute("data-open") : row ? row.getAttribute("data-row") : null;
      if (!id) return;
      selectClient(id, "portal");
      var heading = $("#detail-name");
      if (heading) { heading.focus({ preventScroll: true }); detail.scrollIntoView({ behavior: reduceMotion.matches ? "auto" : "smooth", block: "nearest" }); }
      announce("Details van " + clientById(id).name + " geopend");
    });
    search.addEventListener("input", function () { renderRows(); });
    filters.forEach(function (f) { f.addEventListener("change", function () { renderRows(); }); });
    var form = search.closest("form");
    if (form) form.addEventListener("submit", function (e) { e.preventDefault(); });

    function selectTab(name, focus) {
      tabs.forEach(function (t) {
        var on = t.getAttribute("data-tab") === name;
        t.setAttribute("aria-selected", on ? "true" : "false");
        t.tabIndex = on ? 0 : -1;
        if (on && focus) t.focus();
      });
      panels.forEach(function (p) { p.hidden = p.getAttribute("data-panel") !== name; });
      if (name === "overzicht") drawPortalChart();
    }
    tabs.forEach(function (t, i) {
      t.addEventListener("click", function () { selectTab(t.getAttribute("data-tab")); });
      t.addEventListener("keydown", function (e) {
        var k = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
        var target = e.key === "Home" ? 0 : e.key === "End" ? tabs.length - 1 : (i + k + tabs.length) % tabs.length;
        if (!k && e.key !== "Home" && e.key !== "End") return;
        e.preventDefault();
        selectTab(tabs[target].getAttribute("data-tab"), true);
      });
    });
    var deep = $("[data-open-report]", detail);
    if (deep) deep.addEventListener("click", function () { selectClient(state.client, "portal-report"); });

    seriesBtns.forEach(function (b) {
      b.addEventListener("click", function () {
        var key = b.getAttribute("data-series");
        var on = b.getAttribute("aria-pressed") !== "true";
        if (!on && Object.keys(activeSeries).filter(function (k) { return activeSeries[k]; }).length === 1) {
          announce("Minimaal één reeks blijft zichtbaar");
          return;
        }
        activeSeries[key] = on;
        b.setAttribute("aria-pressed", on ? "true" : "false");
        drawPortalChart();
      });
    });
    ranges.forEach(function (r) { r.addEventListener("change", drawPortalChart); });

    function rangeWeeks() { var r = ranges.filter(function (x) { return x.checked; })[0]; return r ? Number(r.value) : 8; }

    function drawPortalChart() {
      if (!chartHost || panels[0].hidden) return;
      var c = clientById(state.client);
      var weeks = rangeWeeks();
      var sessions = c.sessions.filter(function (s) { return s.week > 8 - weeks; });
      var start = sessions[0].date, end = sessions[sessions.length - 1].date;
      var x0 = Math.round((start - PERIOD_START) / 864e5) - 1, x1 = Math.round((end - PERIOD_START) / 864e5) + 1;
      function dx(s) { return Math.round((s.date - PERIOD_START) / 864e5); }
      var keys = ["pijnNa", "rpe", "motivatie"].filter(function (k) { return activeSeries[k]; });
      var missing = sessions.filter(function (s) { return s.missed || !s.checkin; });
      drawChart(chartHost, {
        id: "portal-chart", xMin: x0, xMax: x1,
        xs: sessions.map(function (s) { return { x: dx(s), label: dShort(s.date) }; }),
        yLabel: "Score 0–10",
        series: keys.map(function (k) {
          var m = METRICS[k];
          return { color: m.color, dash: m.dash, marker: m.marker, values: sessions.map(function (s) { return { x: dx(s), y: s[k] }; }) };
        }),
        missing: missing.map(dx),
        title: "Sessiescores van " + c.name + ", laatste " + weeks + " weken",
        desc: summary(c, sessions, keys)
      });
      chartSummary.textContent = summary(c, sessions, keys);
      chartMeta.textContent = "Bron: check-ins + sessielogboek · " + sessions.length + " geplande sessies · " + dLong(start) + " t/m " + dLong(end) + " · schaal 0–10";
      legend.innerHTML = keys.map(function (k) { return legendItem(METRICS[k], METRICS[k].long); }).join("") +
        (missing.length ? '<span class="legend-item legend-missing"><svg width="16" height="14" viewBox="0 0 16 14" aria-hidden="true"><path d="M4 3l7 7m0-7l-7 7" stroke="currentColor" stroke-width="1.6"/></svg>Geen check-in of sessie niet uitgevoerd (' + missing.length + ")</span>" : "");
    }

    function summary(c, sessions, keys) {
      var parts = keys.map(function (k) {
        var vals = sessions.filter(function (s) { return s[k] !== null; });
        if (!vals.length) return METRICS[k].long + ": geen metingen";
        return METRICS[k].long + " van " + nl(vals[0][k]) + " (" + dShort(vals[0].date) + ") naar " + nl(vals[vals.length - 1][k]) + " (" + dShort(vals[vals.length - 1].date) + ")";
      });
      var miss = sessions.filter(function (s) { return s.missed || !s.checkin; }).length;
      return c.name + ", " + sessions.length + " geplande sessies. " + parts.join("; ") + "." + (miss ? " " + miss + " sessie" + (miss === 1 ? "" : "s") + " zonder meting." : " Geen ontbrekende metingen.");
    }

    function renderDetail() {
      var c = clientById(state.client);
      $("#detail-name").textContent = c.name;
      $("[data-detail-avatar]", detail).textContent = c.initials;
      $("[data-detail-meta]", detail).textContent = c.sport + " · " + c.klacht + " · doel: " + c.doel;
      $("[data-detail-phase]", detail).textContent = "Fase " + c.fase + " van " + c.fases + " · " + c.faseNaam;
      $("[data-detail-owner]", detail).textContent = "Behandelaar: " + c.behandelaar;
      $("[data-rings]", detail).innerHTML =
        ring("Voortgang", Math.round(c.programDone / c.programTotal * 100) + "%", c.programDone + " van " + c.programTotal + " sessies", c.programDone / c.programTotal, "var(--c-proj)") +
        ring("Belasting", nl(c.rpeRecent), "Gem. RPE, laatste 4 sessies", (c.rpeRecent || 0) / 10, "var(--c-rpe)") +
        ring("Motivatie", nl(c.motRecent), "Gem. score, laatste 4 sessies", (c.motRecent || 0) / 10, "var(--c-mot)");
      $("[data-flags]", detail).innerHTML = c.flags.length ? c.flags.map(function (f) {
        return '<li><span class="flag flag-' + f.kind + '">' + esc(f.label) + "</span><span>" + esc(f.detail) + "</span></li>";
      }).join("") : '<li><span class="flag flag-info">Geen open meldingen</span><span>Geen meldingen op basis van de demo-instellingen.</span></li>';
      $("[data-daily]", detail).innerHTML =
        "<div><dt>Check-ins</dt><dd>" + c.daily.filled + "/56 dagen</dd></div>" +
        "<div><dt>Slaap</dt><dd>" + nl(c.daily.slaap) + "</dd></div>" +
        "<div><dt>Stress</dt><dd>" + nl(c.daily.stress) + "</dd></div>" +
        "<div><dt>Pijn</dt><dd>" + nl(c.daily.pijn) + "</dd></div>" +
        "<div><dt>Laatste</dt><dd>" + dLong(c.daily.last) + "</dd></div>";
      $("[data-session-rows]", detail).innerHTML = c.sessions.slice().reverse().map(function (s) {
        var na = s.missed ? '<td colspan="4" class="muted-cell">Sessie niet uitgevoerd</td>'
          : !s.checkin ? '<td colspan="4" class="muted-cell">Afgerond, geen check-in ingevuld</td>'
          : '<td class="num">' + nl(s.pijnTijdens) + '</td><td class="num">' + nl(s.pijnNa) + '</td><td class="num">' + nl(s.rpe) + '</td><td class="num">' + nl(s.motivatie) + "</td>";
        return "<tr><th scope=\"row\">" + dLong(s.date) + '<span class="row-sub">Week ' + s.week + " · sessie " + s.nr + '</span></th><td class="num">' + (s.missed ? "0" : s.afgevinkt) + "/" + c.exercises + "</td>" + na + "<td>" + (s.note ? esc(s.note) : '<span class="muted-cell">–</span>') + "</td></tr>";
      }).join("");
      var report = $("[data-report-brief]", detail);
      if (report) report.innerHTML = "<li>" + c.doneCount + " van 16 geplande sessies afgerond</li><li>Pijn na: " + trendText(c, "pijnNa") + "</li><li>RPE: " + trendText(c, "rpe") + "</li><li>Dagelijkse check-ins: " + c.daily.filled + " van 56 dagen</li>";
      $$("[data-client-name]").forEach(function (el) { el.textContent = c.name; });
      drawPortalChart();
    }

    onClient(function (id, source) {
      renderRows(true);
      renderDetail();
      if (source === "portal-report") return;
    });
    counts();
    renderRows(true);
    renderDetail();
    selectTab("overzicht");
    if ("ResizeObserver" in window) {
      var lastW = 0;
      new ResizeObserver(function () {
        var w = chartHost.clientWidth;
        if (Math.abs(w - lastW) > 4) { lastW = w; drawPortalChart(); }
      }).observe(chartHost);
    }
  }

  function weekAverages(c, key) {
    var out = [];
    for (var wk = 1; wk <= 8; wk++) {
      var v = avg(c.sessions.filter(function (s) { return s.week === wk; }).map(function (s) { return s[key]; }));
      out.push({ week: wk, y: v, start: addDays(PERIOD_START, (wk - 1) * 7), end: addDays(PERIOD_START, (wk - 1) * 7 + 6) });
    }
    return out;
  }
  function trendText(c, key) {
    var w = weekAverages(c, key).filter(function (x) { return x.y !== null; });
    return "week " + w[0].week + " gem. " + nl(w[0].y) + " → week " + w[w.length - 1].week + " gem. " + nl(w[w.length - 1].y);
  }

  /* ---------- Voorbeeldscenario (concept) ----------
     Rekenvoorbeeld: lineaire trend over de weekgemiddelden van week 3–6, doorgetrokken vanaf week 6
     tot week 12, met een bandbreedte die per week oploopt. Uitsluitend illustratief. */

  function initScenario() {
    var box = $("[data-scenario]");
    if (!box) return;
    var sel = $("#scenario-client", box);
    var metricSel = $("#scenario-metric", box);
    var showLine = $("#scenario-line", box);
    var showBand = $("#scenario-band", box);
    var host = $("[data-scenario-chart]", box);
    var rows = $("[data-scenario-rows]", box);
    var sum = $("[data-scenario-summary]", box);
    var legend = $("[data-scenario-legend]", box);
    var ANCHOR = 6, LAST = 8, END = 12;

    function compute() {
      var c = clientById(state.client);
      var key = metricSel.value;
      var weeks = weekAverages(c, key);
      var fit = weeks.filter(function (w) { return w.week >= 3 && w.week <= ANCHOR && w.y !== null; });
      var n = fit.length, mx = avg(fit.map(function (w) { return w.week; })), my = avg(fit.map(function (w) { return w.y; }));
      var num = 0, den = 0;
      fit.forEach(function (w) { num += (w.week - mx) * (w.y - my); den += (w.week - mx) * (w.week - mx); });
      var slope = n > 1 && den ? num / den : 0;
      var base = my + slope * (ANCHOR - mx);
      var proj = [];
      for (var wk = ANCHOR; wk <= END; wk++) {
        var y = clamp(base + slope * (wk - ANCHOR), 0, 10);
        var spread = 0.4 + 0.3 * (wk - ANCHOR);
        proj.push({ week: wk, y: y, lo: clamp(y - spread, 0, 10), hi: clamp(y + spread, 0, 10) });
      }
      return { c: c, key: key, weeks: weeks, proj: proj, slope: slope };
    }

    function render() {
      var r = compute();
      var m = METRICS[r.key];
      sel.value = r.c.id;
      var xs = [];
      for (var k = 1; k <= END; k++) xs.push({ x: k, label: "wk " + k });
      var series = [{ color: m.color, marker: m.marker, values: r.weeks.map(function (w) { return { x: w.week, y: w.y }; }) }];
      if (showLine.checked) series.push({ color: "var(--c-proj)", dash: "7 6", cls: "proj", values: r.proj.map(function (p) { return { x: p.week, y: p.y }; }) });
      var desc = scenarioSummary(r);
      drawChart(host, {
        id: "scenario-chart", xMin: 0.6, xMax: END + 0.4, xs: xs, yLabel: m.long + " · weekgemiddelde 0–10",
        series: series,
        band: showLine.checked && showBand.checked ? r.proj.map(function (p) { return { x: p.week, lo: p.lo, hi: p.hi }; }) : null,
        missing: r.weeks.filter(function (w) { return w.y === null; }).map(function (w) { return w.week; }),
        vline: { x: LAST + 0.5, label: "Einde meetperiode 18-10" },
        title: "Voorbeeldscenario " + m.long + " voor " + r.c.name, desc: desc
      });
      sum.textContent = desc;
      legend.innerHTML = legendItem(m, "Gemeten weekgemiddelde") +
        (showLine.checked ? legendItem({ color: "var(--c-proj)", dash: "7 6" }, "Voorbeeldscenario (concept)").replace(/<g fill="currentColor">.*?<\/g>/, "") : "") +
        (showLine.checked && showBand.checked ? '<span class="legend-item"><span class="legend-band" aria-hidden="true"></span>Bandbreedte van het rekenvoorbeeld</span>' : "");
      rows.innerHTML = r.weeks.concat(r.proj.filter(function (p) { return p.week > LAST; }).map(function (p) {
        return { week: p.week, y: null, future: true, start: addDays(PERIOD_START, (p.week - 1) * 7), end: addDays(PERIOD_START, (p.week - 1) * 7 + 6) };
      })).map(function (w) {
        var p = r.proj.filter(function (x) { return x.week === w.week; })[0];
        var diff = p && w.y !== null && w.week > ANCHOR ? w.y - p.y : null;
        if (diff !== null) diff = Number(diff.toFixed(1));
        return "<tr" + (w.future ? ' class="is-future"' : "") + '><th scope="row">Week ' + w.week + '<span class="row-sub">' + dShort(w.start) + " t/m " + dShort(w.end) + "</span></th>" +
          '<td class="num">' + (w.future ? '<span class="muted-cell">nog niet gemeten</span>' : w.y === null ? '<span class="muted-cell">geen meting</span>' : nl(w.y)) + "</td>" +
          '<td class="num">' + (p && showLine.checked ? nl(p.y) : "–") + "</td>" +
          '<td class="num">' + (p && showLine.checked ? nl(p.lo) + "–" + nl(p.hi) : "–") + "</td>" +
          '<td class="num">' + (diff !== null && showLine.checked ? (diff > 0 ? "+" : diff < 0 ? "−" : "") + nl(Math.abs(diff)) : "–") + "</td></tr>";
      }).join("");
    }

    function scenarioSummary(r) {
      var m = METRICS[r.key];
      var last = r.weeks.filter(function (w) { return w.y !== null; }).slice(-1)[0];
      var txt = r.c.name + ": gemeten " + m.long.toLowerCase() + " week 8 gemiddeld " + nl(last.y) + ".";
      if (!showLine.checked) return txt + " Voorbeeldscenario verborgen.";
      var p8 = r.proj.filter(function (p) { return p.week === LAST; })[0];
      var p12 = r.proj[r.proj.length - 1];
      return txt + " Het rekenvoorbeeld (trend week 3–6) kwam voor week 8 uit op " + nl(p8.y) + "; verschil gemeten min scenario " + nl(last.y - p8.y) +
        ". Doorgetrokken tot week 12: " + nl(p12.y) + " (band " + nl(p12.lo) + "–" + nl(p12.hi) + "). Illustratief, geen voorspelling.";
    }

    [sel, metricSel, showLine, showBand].forEach(function (el) {
      el.addEventListener("change", function () {
        if (el === sel) selectClient(sel.value, "scenario");
        else render();
        if (el === showLine) showBand.disabled = !showLine.checked;
      });
    });
    onClient(render);
    render();
    if ("ResizeObserver" in window) {
      var lastW = 0;
      new ResizeObserver(function () { var w = host.clientWidth; if (Math.abs(w - lastW) > 4) { lastW = w; render(); } }).observe(host);
    }
  }

  /* ---------- Verslagworkflow (concept) ---------- */

  function initReport() {
    var box = $("[data-report]");
    if (!box) return;
    var sel = $("#report-client", box);
    var sources = $("[data-report-sources]", box);
    var editor = $("#report-text", box);
    var build = $("[data-report-build]", box);
    var approve = $("[data-report-approve]", box);
    var status = $("[data-report-status]", box);
    var steps = $$("[data-report-step]", box);
    var approved = false;
    var sourcesDirty = false;

    function srcList(c) {
      var first = c.sessions[0].date, last = c.sessions[c.sessions.length - 1].date;
      return [
        { id: "uitvoering", label: "Sessielogboek", value: c.doneCount + " van 16 sessies afgerond · " + c.sessions.filter(function (s) { return !s.missed && !s.checkin; }).length + " zonder check-in", period: dShort(first) + " t/m " + dShort(last) },
        { id: "pijn", label: "Pijn tijdens / na", value: "na: " + trendText(c, "pijnNa"), period: "check-in na sessie" },
        { id: "rpe", label: "RPE en motivatie", value: "RPE gem. " + nl(c.rpeRecent) + " · motivatie gem. " + nl(c.motRecent) + " (laatste 4)", period: "check-in na sessie" },
        { id: "dagelijks", label: "Dagelijkse check-in", value: "slaap " + nl(c.daily.slaap) + " · stress " + nl(c.daily.stress) + " · pijn " + nl(c.daily.pijn) + " · " + c.daily.filled + "/56 dagen", period: "tot " + dShort(c.daily.last) },
        { id: "notities", label: "Notities van cliënt", value: c.notes.length + " notities", period: "uit de app" }
      ];
    }

    function renderSources() {
      var c = clientById(state.client);
      sel.value = c.id;
      sources.innerHTML = srcList(c).map(function (s) {
        return '<li><label class="source-item"><input type="checkbox" name="report-source" value="' + s.id + '" checked><span class="source-body"><span class="source-label">' + esc(s.label) + '</span><span class="source-value">' + esc(s.value) + '</span><span class="source-period">' + esc(s.period) + "</span></span></label></li>";
      }).join("");
    }

    function chosen() { return $$("input[name='report-source']:checked", box).map(function (i) { return i.value; }); }

    function compose() {
      var c = clientById(state.client);
      var on = chosen();
      var w = function (k) { return weekAverages(c, k).filter(function (x) { return x.y !== null; }); };
      var L = [];
      L.push("Voortgangsverslag (concept) · " + c.name);
      L.push("Periode 24-08-2026 t/m 18-10-2026 · Fase " + c.fase + " van " + c.fases + ", " + c.faseNaam + " · " + c.sport + ", " + c.klacht);
      L.push("");
      if (on.indexOf("uitvoering") !== -1) {
        L.push("Uitvoering");
        L.push("- " + c.doneCount + " van 16 geplande sessies afgerond; gemiddeld " + nl(avg(c.sessions.filter(function (s) { return !s.missed; }).map(function (s) { return s.afgevinkt; }))) + " van " + c.exercises + " oefeningen afgevinkt.");
        var noCi = c.sessions.filter(function (s) { return !s.missed && !s.checkin; }).length;
        if (noCi || c.missed.length) L.push("- " + (c.missed.length ? c.missed.length + " sessie(s) niet uitgevoerd. " : "") + (noCi ? noCi + " sessie(s) zonder check-in." : ""));
        L.push("");
      }
      if (on.indexOf("pijn") !== -1 || on.indexOf("rpe") !== -1) {
        L.push("Door cliënt ingevuld na de sessie (schaal 0–10, weekgemiddelden)");
        if (on.indexOf("pijn") !== -1) {
          var pn = w("pijnNa"), pt = w("pijnTijdens");
          L.push("- Pijn na: " + nl(pn[0].y) + " in week " + pn[0].week + ", " + nl(pn[pn.length - 1].y) + " in week " + pn[pn.length - 1].week + ".");
          L.push("- Pijn tijdens: " + nl(pt[0].y) + " in week " + pt[0].week + ", " + nl(pt[pt.length - 1].y) + " in week " + pt[pt.length - 1].week + ".");
        }
        if (on.indexOf("rpe") !== -1) {
          var rp = w("rpe"), mo = w("motivatie");
          L.push("- RPE (ervaren inspanning): " + nl(rp[0].y) + " → " + nl(rp[rp.length - 1].y) + ".");
          L.push("- Motivatie: " + nl(mo[0].y) + " → " + nl(mo[mo.length - 1].y) + ".");
        }
        L.push("");
      }
      if (on.indexOf("dagelijks") !== -1) {
        L.push("Dagelijkse check-in");
        L.push("- " + c.daily.filled + " van 56 dagen ingevuld; gemiddeld slaap " + nl(c.daily.slaap) + ", stress " + nl(c.daily.stress) + ", pijn " + nl(c.daily.pijn) + ". Laatste check-in " + dLong(c.daily.last) + " (pijn " + nl(c.daily.lastPijn, 0) + ").");
        L.push("");
      }
      if (on.indexOf("notities") !== -1 && c.notes.length) {
        L.push("Notities van cliënt");
        c.notes.forEach(function (n) { var s = c.sessions[n[0]]; L.push("- " + dShort(s.date) + ": “" + n[1] + "”"); });
        L.push("");
      }
      L.push("Beoordeling behandelaar");
      L.push("[Vul hier je eigen beoordeling en vervolgafspraken in.]");
      return L.join("\n");
    }

    function setStep(n) {
      steps.forEach(function (s, i) {
        s.classList.toggle("is-done", i < n);
        if (i === n) s.setAttribute("aria-current", "step"); else s.removeAttribute("aria-current");
      });
    }
    function setStatus(kind, text) {
      status.className = "report-status status-" + kind;
      status.textContent = text;
    }

    build.addEventListener("click", function () {
      if (!chosen().length) { setStatus("warn", "Kies minstens één bron om een voorbeeldverslag op te bouwen."); announce(status.textContent); return; }
      editor.value = compose();
      editor.disabled = false;
      approve.disabled = false;
      approved = false;
      sourcesDirty = false;
      setStep(2);
      setStatus("draft", "Concept · opgebouwd uit " + chosen().length + " bronnen van " + clientById(state.client).name + ". Pas de tekst aan en controleer.");
      announce("Voorbeeldverslag opgebouwd voor " + clientById(state.client).name + ". De tekst staat in het bewerkveld.");
      editor.focus({ preventScroll: true });
      editor.setSelectionRange(0, 0);
      editor.scrollTop = 0;
    });
    approve.addEventListener("click", function () {
      if (sourcesDirty || !editor.value.trim()) return;
      approved = true;
      setStep(4);
      var now = new Date();
      setStatus("ok", "Gecontroleerd en gemarkeerd om " + pad(now.getHours()) + ":" + pad(now.getMinutes()) + " · alleen in deze demo, niets opgeslagen of naar een dossier geschreven.");
      announce(status.textContent);
    });
    editor.addEventListener("input", function () {
      approve.disabled = sourcesDirty || !editor.value.trim();
      if (approved) { approved = false; setStep(2); setStatus("draft", "Tekst gewijzigd na markering · opnieuw controleren."); }
      else if (!editor.disabled && !sourcesDirty) setStep(3);
    });
    sel.addEventListener("change", function () { selectClient(sel.value, "report"); });
    box.addEventListener("change", function (e) {
      if (e.target.name === "report-source" && !editor.disabled) {
        approved = false;
        sourcesDirty = true;
        approve.disabled = true;
        setStep(1);
        setStatus("draft", "Bronselectie gewijzigd · bewaar eventuele eigen tekst en klik opnieuw op ‘Maak voorbeeldverslag’. Controleer daarna het nieuwe concept.");
      }
    });

    function reset() {
      renderSources();
      editor.value = "";
      editor.disabled = true;
      approve.disabled = true;
      approved = false;
      sourcesDirty = false;
      setStep(1);
      setStatus("idle", "Nog geen concept. Kies bronnen en klik op ‘Maak voorbeeldverslag’.");
    }
    onClient(function (id, source) {
      reset();
      if (source === "portal-report") {
        $("#verslag").scrollIntoView({ behavior: reduceMotion.matches ? "auto" : "smooth" });
        build.focus({ preventScroll: true });
      }
    });
    reset();
  }

  /* ---------- Contactdialoog: alleen een mailto-concept, niets wordt verstuurd ---------- */

  var CONTACT = "info@passionforhealth.nl";
  function initContact() {
    var dialog = $("#contact-dialog");
    if (!dialog) return;
    var form = $("form", dialog);
    var result = $("[data-contact-result]", dialog);
    var preview = $("[data-mail-preview]", dialog);
    var mailLink = $("[data-mail-link]", dialog);
    var errors = $("[data-form-errors]", dialog);
    var opener = null;
    var native = typeof dialog.showModal === "function";

    function focusables() {
      return $$("a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled])", dialog)
        .filter(function (el) { return el.offsetParent !== null; });
    }
    function open(trigger) {
      opener = trigger || doc.activeElement;
      form.hidden = false; result.hidden = true; errors.hidden = true;
      if (native) dialog.showModal(); else { dialog.setAttribute("open", ""); root.classList.add("dialog-fallback"); }
      root.classList.add("dialog-open");
      var first = $("#contact-name", dialog);
      if (first) first.focus();
    }
    function close() {
      if (native && dialog.open) dialog.close();
      else { dialog.removeAttribute("open"); finish(); }
    }
    function finish() {
      root.classList.remove("dialog-open", "dialog-fallback");
      if (opener && doc.contains(opener)) opener.focus();
    }
    dialog.addEventListener("close", finish);
    dialog.addEventListener("cancel", function (e) { e.preventDefault(); close(); });
    dialog.addEventListener("keydown", function (e) {
      if (e.key === "Escape") { e.preventDefault(); close(); return; }
      if (e.key !== "Tab") return;
      var f = focusables(); if (!f.length) return;
      if (e.shiftKey && doc.activeElement === f[0]) { e.preventDefault(); f[f.length - 1].focus(); }
      else if (!e.shiftKey && doc.activeElement === f[f.length - 1]) { e.preventDefault(); f[0].focus(); }
    });
    dialog.addEventListener("click", function (e) {
      if (e.target === dialog || e.target.closest("[data-close]")) close();
    });
    $$("[data-open-contact]").forEach(function (el) {
      el.addEventListener("click", function (e) { e.preventDefault(); open(el); });
    });

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var fields = $$("input[required]", form);
      var bad = fields.filter(function (f) { return !f.checkValidity(); });
      fields.forEach(function (f) { f.setAttribute("aria-invalid", f.checkValidity() ? "false" : "true"); });
      if (bad.length) {
        errors.hidden = false;
        errors.textContent = "Vul " + bad.map(function (f) { return f.getAttribute("data-label"); }).join(", ") + " correct in.";
        bad[0].focus();
        return;
      }
      var v = function (id) { return $("#" + id, form).value.trim(); };
      var subject = "Demo Performance Plus · " + v("contact-practice");
      var body = "Naam: " + v("contact-name") + "\nE-mail: " + v("contact-email") + "\nPraktijk: " + v("contact-practice") +
        (v("contact-message") ? "\n\nVraag of toelichting:\n" + v("contact-message") : "") + "\n\nVerzonden via de ontwerppreview (ronde 4).";
      preview.textContent = "Aan: " + CONTACT + "\nOnderwerp: " + subject + "\n\n" + body;
      mailLink.href = "mailto:" + CONTACT + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
      form.hidden = true; result.hidden = false;
      var h = $("#contact-result-title", dialog);
      if (h) h.focus();
    });
    var back = $("[data-contact-back]", dialog);
    if (back) back.addEventListener("click", function () { result.hidden = true; form.hidden = false; $("#contact-name", dialog).focus(); });
  }

  /* ---------- Start ---------- */

  function start() {
    initMenu();
    initAppStory();
    initPortal();
    initScenario();
    initReport();
    initContact();
    var y = $("[data-year]"); if (y) y.textContent = "2026";
  }
  if (doc.readyState === "loading") doc.addEventListener("DOMContentLoaded", start); else start();
})();
