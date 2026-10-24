/* Performance Plus · ronde 10 · gedeelde interactie voor light.html (optie 01) en dark.html (optie 03).
   Alles draait lokaal: geen externe scripts, geen netwerkverkeer, niets wordt opgeslagen of verstuurd.
   De fictieve cliëntcasus en grafieken staan als leesbare voorbeelden in de HTML. */
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
  var announcer = null;
  function announce(msg) {
    if (!announcer) announcer = $("#live-region");
    if (!announcer) return;
    announcer.textContent = "";
    window.setTimeout(function () { announcer.textContent = msg; }, 40);
  }

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
     Zelfde vensterlogica: één segment per scherm (nu 5), FADE 0.06, schermen schuiven als sheet omhoog (103% → 0),
     het vorige scherm schaalt naar 0.93 en dimt tot 0.42, tekst en aside driften mee,
     voortgangsbalk per scherm. Alleen op brede, hoge schermen zonder reduced motion. */

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
    var track = $(".story-track", story);
    var layers = $$(".screen-layer", story);
    var N = layers.length, SEG = 1 / N, FADE = 0.06;
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
    var more = initPlusDemo(story);

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
      story.setAttribute("data-active-step", String(i));
      if (more) more.setStep(i === N - 1);
      layers.forEach(function (el, k) {
        el.inert = k !== i;
        el.setAttribute("aria-hidden", k === i ? "false" : "true");
      });
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
        if (changed && fromUser) announce("Scherm " + (i + 1) + " van " + N + ": " + texts[i].querySelector("h1, h2, h3").textContent);
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
        announce("Scherm " + (i + 1) + " van " + N + ": " + texts[i].querySelector("h1, h2, h3").textContent);
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

  /* Scherm 05: de drie bevestigde plusmenu-acties. Alle bediening is lokaal en slaat niets op. */
  function initPlusDemo(story) {
    var box = $("[data-plus-demo]", story);
    if (!box) return null;
    var sheet = $(".plus-sheet", box), panels = $$("[data-plus-panel]", box);
    var plus = $("[data-plus-open]", box), close = $("[data-plus-close]", box);
    var toggle = $("[data-more-toggle]", story);
    var breath = $("[data-breath]", box), core = $(".breath-core", box);
    var label = $("[data-breath-label]", box), count = $("[data-breath-count]", box);
    var sequence = ["closed", "menu", "own", "menu", "checkin", "menu", "breathing"];
    var durations = [2, 5, 7, 2, 7, 2, 16];
    var names = { menu: "Het plusmenu", own: "Eigen training", checkin: "Dagelijkse check-in", breathing: "Ademhaling" };
    var phases = ["Inademen", "Vasthouden", "Uitademen", "Vasthouden"];
    var view = "closed", seq = 0, tick = 0, timer = 0;
    var wants = !reduceMotion.matches, stepOn = false, onScreen = false, hovering = false;

    function drawBreath() {
      var phase = Math.floor(tick / 4) % 4;
      breath.setAttribute("data-phase", String(phase));
      label.textContent = phases[phase]; count.textContent = String(4 - tick % 4);
    }
    function show(next, fromUser) {
      view = next; tick = 0;
      var closed = next === "closed";
      sheet.hidden = closed;
      box.classList.toggle("plus-closed", closed);
      box.setAttribute("data-plus-view", next);
      plus.setAttribute("aria-expanded", closed ? "false" : "true");
      plus.setAttribute("aria-label", closed ? "Open het plusmenu" : next === "menu" ? "Sluit het plusmenu" : "Terug naar het plusmenu");
      panels.forEach(function (p) { p.hidden = p.getAttribute("data-plus-panel") !== next; });
      if (core) { core.style.transform = ""; core.style.transition = ""; }
      drawBreath();
      if (fromUser) {
        announce(closed ? "Plusmenu gesloten" : "Voorbeeld: " + names[next]);
        if (closed) plus.focus({ preventScroll: true });
        else {
          var target = next === "menu" ? $("[data-plus-pick]", box) : $("[data-plus-panel='" + next + "'] h3", box);
          if (target) { if (next !== "menu") target.setAttribute("tabindex", "-1"); target.focus({ preventScroll: true }); }
        }
      }
    }
    function step() {
      tick++;
      if (tick >= durations[seq]) { seq = (seq + 1) % sequence.length; show(sequence[seq], false); }
      else if (view === "breathing") drawBreath();
    }
    function sync() {
      var run = wants && stepOn && onScreen && !doc.hidden && !hovering && !reduceMotion.matches;
      if (run && !timer) { timer = window.setInterval(step, 1000); if (core) { core.style.transition = ""; core.style.transform = ""; } }
      else if (!run && timer) {
        window.clearInterval(timer); timer = 0;
        if (core && view === "breathing") { var transform = window.getComputedStyle(core).transform; core.style.transition = "none"; core.style.transform = transform; }
      }
      box.classList.toggle("is-playing", run);
      if (toggle) { toggle.disabled = reduceMotion.matches; toggle.textContent = reduceMotion.matches ? "Handmatige weergave" : wants ? "Pauzeer voorbeeld" : "Speel voorbeeld af"; }
    }
    function choose(next) { wants = false; sync(); show(next, true); }
    $$("[data-plus-pick]", box).forEach(function (b) { b.addEventListener("click", function () { choose(b.getAttribute("data-plus-pick")); }); });
    $$("[data-plus-back]", box).forEach(function (b) { b.addEventListener("click", function () { choose("menu"); }); });
    plus.addEventListener("click", function () { choose(view === "menu" ? "closed" : "menu"); });
    close.addEventListener("click", function () { choose("closed"); });
    box.addEventListener("keydown", function (e) { if (e.key === "Escape" && view !== "closed") { e.preventDefault(); choose("closed"); } });
    box.addEventListener("focusin", function () { wants = false; sync(); });
    box.addEventListener("pointerenter", function (e) { if (e.pointerType === "mouse") { hovering = true; sync(); } });
    box.addEventListener("pointerleave", function () { hovering = false; sync(); });
    if (toggle) toggle.addEventListener("click", function () {
      wants = !wants;
      if (wants) { seq = Math.max(0, sequence.indexOf(view)); tick = 0; }
      sync();
    });
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (entries) { onScreen = entries[0].isIntersecting; sync(); }).observe(box);
    } else { onScreen = true; }
    doc.addEventListener("visibilitychange", sync);
    reduceMotion.addEventListener("change", function () { if (reduceMotion.matches) wants = false; sync(); });
    show("closed", false); sync();
    return { setStep: function (on) { if (on !== stepOn) { stepOn = on; sync(); } } };
  }

  /* White-label balk: native scroll, pijlen en toetsenbord. Geen automatische beweging. */
  function initBrandGallery() {
    var gallery = $("#brand-gallery");
    if (!gallery) return;
    var section = $("#eigen-merk"), controls = $(".brand-arrows", section);
    var prev = $("[data-brand-prev]", section), next = $("[data-brand-next]", section);
    var frame = 0, target = gallery.scrollLeft;
    function maximum() { return Math.max(0, gallery.scrollWidth - gallery.clientWidth); }
    function update() {
      frame = 0;
      prev.disabled = gallery.scrollLeft <= 2;
      next.disabled = gallery.scrollLeft >= maximum() - 2;
    }
    function schedule() { if (!frame) frame = window.requestAnimationFrame(update); }
    function jump(value) {
      target = clamp(value, 0, maximum());
      gallery.scrollTo({ left: target, behavior: reduceMotion.matches ? "instant" : "smooth" });
    }
    function move(direction) {
      var cards = $$(".brand-example", gallery);
      var stride = cards.length > 1 ? cards[1].offsetLeft - cards[0].offsetLeft : gallery.clientWidth;
      jump(target + direction * stride);
    }
    controls.hidden = false;
    prev.addEventListener("click", function () { move(-1); });
    next.addEventListener("click", function () { move(1); });
    gallery.addEventListener("keydown", function (e) {
      if (e.target !== gallery) return;
      if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
        e.preventDefault(); move(e.key === "ArrowLeft" ? -1 : 1);
      } else if (e.key === "Home" || e.key === "End") {
        e.preventDefault(); jump(e.key === "Home" ? 0 : maximum());
      }
    });
    gallery.addEventListener("scroll", schedule, { passive: true });
    gallery.addEventListener("scrollend", function () { target = gallery.scrollLeft; update(); });
    // Native touch/trackpad input takes over the next button's starting point.
    function syncTarget() { target = gallery.scrollLeft; }
    gallery.addEventListener("pointerdown", syncTarget, { passive: true });
    gallery.addEventListener("wheel", syncTarget, { passive: true });
    window.addEventListener("resize", function () { target = gallery.scrollLeft; schedule(); });
    if ("ResizeObserver" in window) new ResizeObserver(function () { target = gallery.scrollLeft; schedule(); }).observe(gallery);
    update();
  }

  /* Tekst beweegt met de scroll; resultaten bouwen één keer per bezoek op.
     De oorspronkelijke HTML blijft volledig leesbaar zonder JS of bij reduced motion. */
  function initPageMotion() {
    if (!("IntersectionObserver" in window)) return;
    var selectors = [
      ".hero-copy > h1", ".hero-copy > .lead", ".hero-copy > .cta-row",
      ".brand-heading > *",
      ".paths-head > *", ".path", ".paths-foot", ".case-intro > *",
      ".report-copy > h2", ".report-copy > .lead", ".report-copy > p:not(.lead)",
      ".report-route > li", ".report-paper", ".origin > div", ".origin-rows > div",
      ".faq-grid > .section-head", ".contact-inner > *"
    ];
    var items = $$(selectors.join(",")).map(function (el, i) {
      el.setAttribute("data-motion", i % 2 ? "right" : "left");
      return { el: el, direction: i % 2 ? 1 : -1, y: 0 };
    });
    var results = $$(".case-rings, .case-charts figure");
    results.forEach(function (el) { el.setAttribute("data-results-motion", ""); });
    $$(".case-rings .ring-fill").forEach(function (circle) {
      circle.style.setProperty("--ring-end", circle.getAttribute("stroke-dasharray").split(" ")[0]);
    });
    var active = new Set(), frame = 0, enabled = false;
    var smooth = function (v) { return v * v * (3 - 2 * v); };

    function render(all) {
      frame = 0;
      if (!enabled || doc.hidden) return;
      var height = window.innerHeight;
      var header = parseFloat(window.getComputedStyle(root).getPropertyValue("--header-h")) || 64;
      var distance = Math.min(210, height * .23);
      var small = window.innerWidth < 700;
      // Read layout first. Subtract our own last translation to avoid feedback jitter.
      var updates = items.filter(function (item) { return all || active.has(item.el); }).map(function (item) {
        var r = item.el.getBoundingClientRect();
        var top = r.top - item.y, bottom = r.bottom - item.y;
        var enter = smooth(clamp((height - 22 - top) / distance, 0, 1));
        var leave = smooth(clamp((bottom - header) / 100, 0, 1));
        var focus = item.el.contains(doc.activeElement);
        return { item: item,
          opacity: focus ? 1 : Math.min(enter, leave),
          x: focus ? 0 : item.direction * ((small ? 14 : 32) * (1 - enter) - 14 * (1 - leave)),
          y: focus ? 0 : 26 * (1 - enter) - 18 * (1 - leave)
        };
      });
      updates.forEach(function (u) {
        u.item.y = u.y;
        u.item.el.style.setProperty("--motion-opacity", u.opacity.toFixed(3));
        u.item.el.style.setProperty("--motion-x", u.x.toFixed(2) + "px");
        u.item.el.style.setProperty("--motion-y", u.y.toFixed(2) + "px");
      });
    }
    function schedule() { if (enabled && !doc.hidden && !frame) frame = window.requestAnimationFrame(function () { render(false); }); }
    var textObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) { if (entry.isIntersecting) active.add(entry.target); else active.delete(entry.target); });
      schedule();
    }, { rootMargin: "120px 0px" });
    var resultObserver = new IntersectionObserver(function (entries) {
      if (!enabled) return;
      entries.forEach(function (entry) {
        if (entry.isIntersecting && entry.intersectionRatio >= .25) entry.target.classList.add("is-drawn");
      });
    }, { threshold: [.25], rootMargin: "0px 0px -30px 0px" });

    function applyMode() {
      enabled = !reduceMotion.matches;
      if (frame) { window.cancelAnimationFrame(frame); frame = 0; }
      root.classList.toggle("page-motion", enabled);
      textObserver.disconnect(); resultObserver.disconnect(); active.clear();
      items.forEach(function (item) {
        item.el.style.removeProperty("--motion-opacity");
        item.el.style.removeProperty("--motion-x");
        item.el.style.removeProperty("--motion-y"); item.y = 0;
        if (enabled) textObserver.observe(item.el);
      });
      results.forEach(function (el) {
        el.classList.toggle("is-drawn", !enabled);
        if (enabled) resultObserver.observe(el);
      });
      if (enabled) render(true);
    }
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", function () { if (enabled) render(true); });
    doc.addEventListener("focusin", schedule);
    doc.addEventListener("visibilitychange", schedule);
    reduceMotion.addEventListener("change", applyMode);
    applyMode();
  }

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
        (v("contact-message") ? "\n\nVraag of toelichting:\n" + v("contact-message") : "") + "\n\nVerzonden via de ontwerppreview (ronde 10).";
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
    initContact();
    initBrandGallery();
    initPageMotion();
    var y = $("[data-year]"); if (y) y.textContent = "2026";
  }
  if (doc.readyState === "loading") doc.addEventListener("DOMContentLoaded", start); else start();
})();
