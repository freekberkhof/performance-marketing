/* Performance Plus — websiteconcepten ronde 3
   Header, menu, footer, dialogen en interactieve onderdelen voor alle drie de concepten.
   Er wordt niets verstuurd: het contactformulier maakt alleen een mailto-concept. */
(function () {
  "use strict";

  var CONTACT_EMAIL = "info@passionforhealth.nl";

  var CONCEPTS = [
    { number: "01", name: "In beweging", file: "light.html" },
    { number: "02", name: "Op jouw tempo", file: "warm.html" },
    { number: "03", name: "Terug naar het veld", file: "dark.html" }
  ];

  // De drie bestaande schermen uit de cliëntapp (met demogegevens).
  var SCREENS = [
    {
      key: "programma",
      image: "./assets/app-02.jpg",
      alt: "Cliëntapp: het oefenprogramma voor week 1 (demogegevens)",
      label: "JE PROGRAMMA",
      short: "Programma",
      title: "Je weet waar je<br>kunt beginnen.",
      copy: "Je fysio zet het programma klaar. Jij vindt je sessies terug in de app, op het moment dat je ermee aan de slag gaat."
    },
    {
      key: "check-in",
      image: "./assets/app-03.jpg",
      alt: "Cliëntapp: een check-in over slaap, stress, pijn en spierpijn (demogegevens)",
      label: "JE CHECK-IN",
      short: "Check-in",
      title: "Even stilstaan bij<br>hoe het gaat.",
      copy: "Hoe heb je geslapen? Hoe voelt je lichaam? In een korte check-in leg je slaap, stress, pijn en spierpijn vast, rondom je training."
    },
    {
      key: "voortgang",
      image: "./assets/app-04.jpg",
      alt: "Cliëntapp: overzicht van je persoonlijke voortgang (demogegevens)",
      label: "JE VOORTGANG",
      short: "Voortgang",
      title: "Terugkijken<br>helpt vooruit.",
      copy: "Bekijk je eigen voortgang en neem die mee naar het gesprek met je behandelaar. Dan bepaal je samen de volgende stap."
    }
  ];

  var AUDIENCE = {
    client: {
      label: "JE EIGEN PROGRAMMA",
      title: "Een beetje houvast.<br>Ook thuis.",
      copy: "Wat stond er ook alweer op het programma? Welke oefening kwam eerst? Je hebt het bij de hand, zonder losse briefjes of zoeken tussen je berichten.",
      copyTwo: "En voelt vandaag anders dan gisteren? Dat kun je kwijt in je check-in."
    },
    practice: {
      label: "VOOR DE PRAKTIJK",
      title: "Het programma loopt<br>door na de afspraak.",
      copy: "Wat jullie samen afspreken, vindt je cliënt terug in de app. Met een korte check-in legt die ook vast hoe de dagen ertussen gingen.",
      copyTwo: "Zo begint het volgende gesprek bij wat er de afgelopen week echt gebeurde."
    }
  };

  var body = document.body;
  var page = (location.pathname.split("/").pop() || "index.html").toLowerCase();
  var currentConcept = CONCEPTS.filter(function (c) { return c.file === page; })[0] ||
    CONCEPTS[(parseInt(body.getAttribute("data-concept"), 10) || 1) - 1];
  var isConceptPage = !body.classList.contains("theme-hub");

  function el(html) {
    var t = document.createElement("template");
    t.innerHTML = html.trim();
    return t.content.firstElementChild;
  }

  function pad(n) { return (n < 10 ? "0" : "") + n; }

  /* ---------- Demolabels op alle app-schermen ---------- */
  function addDemoLabels(root) {
    (root || document).querySelectorAll(".phone, .mini-phone").forEach(function (phone) {
      if (phone.querySelector(".demo-label")) return;
      var label = document.createElement("span");
      label.className = "demo-label";
      label.textContent = "DEMOGEGEVENS";
      phone.appendChild(label);
    });
  }

  /* ---------- Header met navigatie, conceptwisselaar en mobiel menu ---------- */
  function conceptLinks() {
    return CONCEPTS.map(function (c) {
      var current = c.file === currentConcept.file;
      return '<a href="./' + c.file + '"' + (current ? ' aria-current="page"' : "") +
        ' aria-label="Concept ' + c.number + ': ' + c.name + (current ? " (huidig)" : "") + '">' + c.number + "</a>";
    }).join("");
  }

  function buildHeader() {
    var slot = document.getElementById("site-header");
    if (!slot) return;
    var header = el(
      '<header class="site-header" data-header>' +
        '<div class="section-shell header-inner">' +
          '<a class="brand" href="./' + currentConcept.file + '#top" aria-label="Performance Plus, naar boven">' +
            '<span class="brand-icon"><img src="./assets/logo-mark.png" alt=""></span><span>Performance Plus</span></a>' +
          '<nav class="site-nav" id="site-nav" aria-label="Hoofdmenu">' +
            "<ul>" +
              '<li><a href="#de-app">De app</a></li>' +
              '<li><a href="#voor-praktijken">Voor praktijken</a></li>' +
              '<li><a href="#vragen">Vragen</a></li>' +
            "</ul>" +
            '<div class="concept-switcher" role="group" aria-label="Wissel van concept">' +
              '<span class="concept-switcher-label" aria-hidden="true">Concept</span>' + conceptLinks() +
              '<a href="./index.html" aria-label="Alle drie de richtingen vergelijken">Alle</a>' +
            "</div>" +
            '<button class="button button-dark button-small" type="button" data-contact>Kennismaken</button>' +
          "</nav>" +
          '<button class="menu-toggle" type="button" aria-expanded="false" aria-controls="site-nav">' +
            '<span class="sr-only" data-menu-label>Menu openen</span><span class="menu-lines" aria-hidden="true"></span></button>' +
        "</div>" +
      "</header>"
    );
    slot.replaceWith(header);

    var skip = el('<a class="skip-link" href="#main">Naar de inhoud</a>');
    body.insertBefore(skip, body.firstChild);
    var main = document.querySelector("main");
    if (main) { main.id = "main"; main.setAttribute("tabindex", "-1"); }
    var top = document.createElement("span");
    top.id = "top";
    body.insertBefore(top, skip.nextSibling);

    setupMenu(header);
    setupScrollState(header);
  }

  function setupMenu(header) {
    var toggle = header.querySelector(".menu-toggle");
    var nav = header.querySelector(".site-nav");
    var label = header.querySelector("[data-menu-label]");
    var desktop = window.matchMedia("(min-width: 1080px)");

    function setOpen(open, returnFocus) {
      toggle.setAttribute("aria-expanded", String(open));
      label.textContent = open ? "Menu sluiten" : "Menu openen";
      nav.classList.toggle("is-open", open);
      header.classList.toggle("menu-open", open);
      body.classList.toggle("menu-locked", open && !desktop.matches);
      if (open) {
        var first = nav.querySelector("a, button");
        if (first) first.focus();
      } else if (returnFocus) {
        toggle.focus();
      }
    }

    toggle.addEventListener("click", function () {
      setOpen(toggle.getAttribute("aria-expanded") !== "true", false);
    });
    nav.addEventListener("click", function (e) {
      if (desktop.matches) return;
      if (e.target.closest("a, button")) setOpen(false, false);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.classList.contains("is-open") && !desktop.matches) {
        setOpen(false, true);
      }
    });
    document.addEventListener("click", function (e) {
      if (!nav.classList.contains("is-open") || desktop.matches) return;
      if (!header.contains(e.target)) setOpen(false, false);
    });
    // Tab-volgorde binnen het open mobiele menu houden
    header.addEventListener("keydown", function (e) {
      if (e.key !== "Tab" || !nav.classList.contains("is-open") || desktop.matches) return;
      var items = [toggle].concat(Array.prototype.slice.call(nav.querySelectorAll("a, button")));
      var first = items[0], last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    });
    var onChange = function () { if (desktop.matches) setOpen(false, false); };
    if (desktop.addEventListener) desktop.addEventListener("change", onChange);
    else if (desktop.addListener) desktop.addListener(onChange);
  }

  function setupScrollState(header) {
    var ticking = false;
    function update() {
      header.classList.toggle("is-scrolled", window.scrollY > 24);
      ticking = false;
    }
    window.addEventListener("scroll", function () {
      if (!ticking) { ticking = true; window.requestAnimationFrame(update); }
    }, { passive: true });
    update();
  }

  /* ---------- Footer ---------- */
  function buildFooter() {
    var slot = document.getElementById("site-footer");
    if (!slot) return;
    var concepts = CONCEPTS.map(function (c) {
      return '<li><a href="./' + c.file + '"' + (c.file === currentConcept.file ? ' aria-current="page"' : "") + ">" +
        c.number + " · " + c.name + "</a></li>";
    }).join("");
    var footer = el(
      '<footer class="site-footer">' +
        '<div class="section-shell footer-inner">' +
          '<div class="footer-brand">' +
            '<a class="brand" href="#top"><span class="brand-icon"><img src="./assets/logo-mark.png" alt=""></span><span>Performance Plus</span></a>' +
            "<p>Een programma dat met je meegaat. Voor cliënt en praktijk, ook tussen de afspraken door.</p>" +
          "</div>" +
          '<nav class="footer-col" aria-label="Op deze pagina"><h2 class="footer-title">Op deze pagina</h2><ul>' +
            '<li><a href="#de-app">De app</a></li>' +
            '<li><a href="#voor-praktijken">Voor praktijken</a></li>' +
            '<li><a href="#vragen">Veelgestelde vragen</a></li>' +
            '<li><button type="button" data-demo>App-rondleiding</button></li>' +
          "</ul></nav>" +
          '<nav class="footer-col" aria-label="Concepten"><h2 class="footer-title">Concepten</h2><ul>' + concepts +
            '<li><a href="./index.html">Alle richtingen vergelijken</a></li>' +
          "</ul></nav>" +
          '<div class="footer-col"><h2 class="footer-title">Contact</h2><ul>' +
            '<li><a href="mailto:' + CONTACT_EMAIL + '">' + CONTACT_EMAIL + "</a></li>" +
            '<li><button type="button" data-contact>Maak een e-mailconcept</button></li>' +
          "</ul></div>" +
        "</div>" +
        '<div class="section-shell footer-bottom">' +
          "<span>Performance Plus · Websiteconcept " + currentConcept.number + ", oktober 2026</span>" +
          "<span>App-schermen tonen demogegevens. Fotografie is sfeerbeeld.</span>" +
        "</div>" +
      "</footer>"
    );
    slot.replaceWith(footer);
  }

  /* ---------- Dialogen: app-rondleiding en contact ---------- */
  var lastOpener = null;

  function openDialog(dialog, opener, focusTarget) {
    lastOpener = opener || document.activeElement;
    if (typeof dialog.showModal === "function") {
      if (!dialog.open) dialog.showModal();
    } else {
      dialog.setAttribute("open", "");
    }
    body.classList.add("menu-locked");
    var target = focusTarget || dialog.querySelector("[data-autofocus]") || dialog.querySelector("button, input");
    if (target) target.focus();
  }

  function closeDialog(dialog) {
    if (typeof dialog.close === "function" && dialog.open) dialog.close();
    else { dialog.removeAttribute("open"); onDialogClosed(); }
  }

  function onDialogClosed() {
    body.classList.remove("menu-locked");
    var opener = lastOpener;
    lastOpener = null;
    if (opener && document.contains(opener) && typeof opener.focus === "function") {
      opener.focus();
    }
  }

  function wireDialog(dialog) {
    dialog.addEventListener("close", onDialogClosed);
    dialog.addEventListener("cancel", function (e) {
      // Escape: netjes sluiten (ook in browsers zonder native afhandeling)
      e.preventDefault();
      closeDialog(dialog);
    });
    dialog.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && !dialog.hasAttribute("data-native")) {
        e.preventDefault();
        closeDialog(dialog);
      }
    });
    dialog.addEventListener("click", function (e) {
      if (e.target === dialog) closeDialog(dialog); // klik op de achtergrond
      if (e.target.closest("[data-close]")) closeDialog(dialog);
    });
    if (typeof dialog.showModal === "function") dialog.setAttribute("data-native", "");
  }

  function buildTourDialog() {
    var steps = SCREENS.map(function (s, i) {
      return '<button type="button" data-dialog-step="' + i + '" aria-label="Scherm ' + (i + 1) + ": " + s.short + '"></button>';
    }).join("");
    return el(
      '<dialog class="dialog tour-dialog" id="tour-dialog" aria-labelledby="tour-dialog-title" aria-describedby="tour-dialog-copy">' +
        '<div class="dialog-inner tour-dialog-inner">' +
          '<button class="dialog-close" type="button" data-close aria-label="Sluit de rondleiding"><span aria-hidden="true">×</span></button>' +
          '<div class="tour-dialog-visual"><div class="phone"><img data-dialog-image src="' + SCREENS[0].image + '" alt="' + SCREENS[0].alt + '"><span class="phone-speaker" aria-hidden="true"></span></div></div>' +
          '<div class="tour-dialog-copy">' +
            '<p class="eyebrow"><span class="tiny-dot"></span> APP-RONDLEIDING · <span data-dialog-count>1 van 3</span></p>' +
            '<h2 id="tour-dialog-title" tabindex="-1" data-dialog-title></h2>' +
            '<p id="tour-dialog-copy" data-dialog-copy aria-live="polite"></p>' +
            '<div class="dialog-steps" role="group" aria-label="Kies een scherm">' + steps + "</div>" +
            '<div class="dialog-nav">' +
              '<button class="button button-ghost" type="button" data-dialog-prev><span aria-hidden="true">←</span> Vorige</button>' +
              '<button class="button button-dark" type="button" data-dialog-next>Volgende <span aria-hidden="true">→</span></button>' +
            "</div>" +
            '<p class="dialog-note">Een weergave van drie bestaande schermen uit de cliëntapp, geen ingelogde app. De schermen bevatten demogegevens. Tip: gebruik de pijltjestoetsen om te bladeren.</p>' +
          "</div>" +
        "</div>" +
      "</dialog>"
    );
  }

  function setupTourDialog(dialog) {
    var index = 0;
    var img = dialog.querySelector("[data-dialog-image]");
    var title = dialog.querySelector("[data-dialog-title]");
    var copy = dialog.querySelector("[data-dialog-copy]");
    var count = dialog.querySelector("[data-dialog-count]");
    var prev = dialog.querySelector("[data-dialog-prev]");
    var next = dialog.querySelector("[data-dialog-next]");
    var stepButtons = dialog.querySelectorAll("[data-dialog-step]");

    function render(i) {
      index = Math.max(0, Math.min(SCREENS.length - 1, i));
      var s = SCREENS[index];
      swapImage(img, s.image, s.alt);
      title.innerHTML = s.title;
      copy.textContent = s.copy;
      count.textContent = (index + 1) + " van " + SCREENS.length;
      prev.disabled = index === 0;
      next.innerHTML = index === SCREENS.length - 1 ? "Rondleiding sluiten" : 'Volgende <span aria-hidden="true">→</span>';
      stepButtons.forEach(function (b, j) {
        if (j === index) b.setAttribute("aria-current", "step");
        else b.removeAttribute("aria-current");
      });
    }

    prev.addEventListener("click", function () { render(index - 1); });
    next.addEventListener("click", function () {
      if (index === SCREENS.length - 1) closeDialog(dialog);
      else render(index + 1);
    });
    stepButtons.forEach(function (b) {
      b.addEventListener("click", function () { render(parseInt(b.getAttribute("data-dialog-step"), 10)); });
    });
    dialog.addEventListener("keydown", function (e) {
      if (e.key === "ArrowRight") { e.preventDefault(); render(index + 1); }
      else if (e.key === "ArrowLeft") { e.preventDefault(); render(index - 1); }
    });

    return {
      open: function (opener, start) {
        render(start || 0);
        openDialog(dialog, opener, dialog.querySelector("[data-close]"));
      }
    };
  }

  function buildContactDialog() {
    return el(
      '<dialog class="dialog contact-dialog" id="contact-dialog" aria-labelledby="contact-title">' +
        '<div class="dialog-inner">' +
          '<button class="dialog-close" type="button" data-close aria-label="Sluit het contactvenster"><span aria-hidden="true">×</span></button>' +
          '<div class="contact-intro">' +
            '<p class="eyebrow"><span class="tiny-dot"></span> KENNISMAKEN</p>' +
            '<h2 id="contact-title">Vertel ons hoe jullie werken.</h2>' +
            "<p>Hiermee maak je een e-mailconcept aan " + CONTACT_EMAIL + ". Er wordt niets automatisch verstuurd: je bekijkt het bericht eerst in je eigen e-mailprogramma en verstuurt het daar zelf.</p>" +
          "</div>" +
          '<form class="contact-form" novalidate data-contact-form>' +
            '<div class="field"><label for="cf-name">Naam</label><input id="cf-name" name="name" type="text" autocomplete="name" required aria-describedby="cf-name-error" data-autofocus><p class="field-error" id="cf-name-error"></p></div>' +
            '<div class="field"><label for="cf-email">E-mailadres</label><input id="cf-email" name="email" type="email" autocomplete="email" required aria-describedby="cf-email-error"><p class="field-error" id="cf-email-error"></p></div>' +
            '<div class="field"><label for="cf-practice">Praktijk <span class="optional">(optioneel)</span></label><input id="cf-practice" name="practice" type="text" autocomplete="organization"></div>' +
            '<div class="field"><label for="cf-role">Ik neem contact op als</label><select id="cf-role" name="role">' +
              "<option>Fysiotherapeut of praktijk</option><option>Cliënt</option><option>Anders</option></select></div>" +
            '<div class="field field-wide"><label for="cf-message">Je vraag of bericht</label><textarea id="cf-message" name="message" required aria-describedby="cf-message-error" placeholder="Bijvoorbeeld: hoe zou Performance Plus aansluiten bij onze manier van werken?"></textarea><p class="field-error" id="cf-message-error"></p></div>' +
            '<div class="form-foot"><p>Je gegevens worden niet opgeslagen of verstuurd vanaf deze pagina.</p><button class="button button-dark" type="submit">Maak e-mailconcept <span aria-hidden="true">↗</span></button></div>' +
          "</form>" +
          '<div class="contact-result" hidden tabindex="-1" data-contact-result>' +
            '<p class="eyebrow"><span class="tiny-dot"></span> KLAAR OM TE BEKIJKEN</p>' +
            "<h3>Je e-mailconcept staat klaar.</h3>" +
            "<p>Open het concept in je e-mailprogramma, lees het na en verstuur het daar zelf. Vanaf deze pagina gaat er niets weg.</p>" +
            '<pre class="mail-preview" data-mail-preview></pre>' +
            '<div class="result-actions">' +
              '<a class="button button-dark" data-mailto href="mailto:' + CONTACT_EMAIL + '">Open in je e-mailprogramma <span aria-hidden="true">↗</span></a>' +
              '<button class="button button-ghost" type="button" data-contact-edit>Bericht aanpassen</button>' +
            "</div>" +
          "</div>" +
        "</div>" +
      "</dialog>"
    );
  }

  function setupContactDialog(dialog) {
    var form = dialog.querySelector("[data-contact-form]");
    var result = dialog.querySelector("[data-contact-result]");
    var preview = dialog.querySelector("[data-mail-preview]");
    var mailto = dialog.querySelector("[data-mailto]");
    var edit = dialog.querySelector("[data-contact-edit]");

    function setError(input, message) {
      var err = document.getElementById(input.id + "-error");
      input.setAttribute("aria-invalid", message ? "true" : "false");
      if (err) err.textContent = message || "";
    }

    function validate() {
      var ok = true, firstBad = null;
      var name = form.elements.name, email = form.elements.email, message = form.elements.message;
      [[name, name.value.trim() ? "" : "Vul je naam in."],
       [email, !email.value.trim() ? "Vul je e-mailadres in." :
         (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim()) ? "" : "Dit e-mailadres lijkt niet te kloppen.")],
       [message, message.value.trim() ? "" : "Schrijf kort waar je vraag over gaat."]
      ].forEach(function (pair) {
        setError(pair[0], pair[1]);
        if (pair[1]) { ok = false; if (!firstBad) firstBad = pair[0]; }
      });
      if (firstBad) firstBad.focus();
      return ok;
    }

    form.addEventListener("input", function (e) {
      if (e.target.getAttribute("aria-invalid") === "true" && e.target.value.trim()) setError(e.target, "");
    });

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!validate()) return;
      var f = form.elements;
      var practice = f.practice.value.trim();
      var subject = "Kennismaken met Performance Plus" + (practice ? " – " + practice : "");
      var lines = [
        "Hallo Performance Plus,",
        "",
        f.message.value.trim(),
        "",
        "Naam: " + f.name.value.trim(),
        "E-mail: " + f.email.value.trim(),
        practice ? "Praktijk: " + practice : null,
        "Ik neem contact op als: " + f.role.value,
        "",
        "Via websiteconcept " + currentConcept.number + " (" + currentConcept.name + ")"
      ].filter(function (l) { return l !== null; });
      var text = lines.join("\r\n");
      var href = "mailto:" + CONTACT_EMAIL +
        "?subject=" + encodeURIComponent(subject) +
        "&body=" + encodeURIComponent(text);
      mailto.setAttribute("href", href);
      preview.textContent = "Aan: " + CONTACT_EMAIL + "\nOnderwerp: " + subject + "\n\n" + lines.join("\n");
      form.hidden = true;
      result.hidden = false;
      result.focus();
    });

    edit.addEventListener("click", function () {
      result.hidden = true;
      form.hidden = false;
      form.elements.message.focus();
    });

    return {
      open: function (opener) {
        result.hidden = true;
        form.hidden = false;
        openDialog(dialog, opener, form.elements.name);
      }
    };
  }

  function buildDialogs() {
    var slot = document.getElementById("dialogs");
    if (!slot) return null;
    var tourEl = buildTourDialog();
    var contactEl = buildContactDialog();
    slot.appendChild(tourEl);
    slot.appendChild(contactEl);
    wireDialog(tourEl);
    wireDialog(contactEl);
    addDemoLabels(tourEl);
    return { tour: setupTourDialog(tourEl), contact: setupContactDialog(contactEl) };
  }

  /* ---------- Afbeelding wisselen met korte overgang ---------- */
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  function swapImage(img, src, alt) {
    if (!img) return;
    img.alt = alt;
    if (img.getAttribute("src") === src) return;
    if (reduceMotion.matches) { img.src = src; return; }
    img.classList.add("is-swapping");
    window.setTimeout(function () {
      img.src = src;
      img.classList.remove("is-swapping");
    }, 160);
  }

  /* ---------- Tabs met pijltjestoetsen (gedeeld) ---------- */
  function arrowTabs(tabs, activate) {
    tabs.forEach(function (tab, i) {
      tab.addEventListener("click", function () { activate(i, false); });
      tab.addEventListener("keydown", function (e) {
        var n = tabs.length, next = null;
        if (e.key === "ArrowRight" || e.key === "ArrowDown") next = (i + 1) % n;
        else if (e.key === "ArrowLeft" || e.key === "ArrowUp") next = (i - 1 + n) % n;
        else if (e.key === "Home") next = 0;
        else if (e.key === "End") next = n - 1;
        if (next === null) return;
        e.preventDefault();
        activate(next, true);
      });
    });
  }

  function setSelected(tabs, index) {
    tabs.forEach(function (t, j) {
      var on = j === index;
      t.classList.toggle("active", on);
      t.setAttribute("aria-selected", String(on));
      t.setAttribute("tabindex", on ? "0" : "-1");
    });
  }

  /* Concept 1: functietabs met app-scherm */
  function setupFeatureTabs() {
    document.querySelectorAll("[data-feature-tabs]").forEach(function (root) {
      var tabs = Array.prototype.slice.call(root.querySelectorAll('[role="tab"]'));
      var panel = root.querySelector('[role="tabpanel"]');
      var img = root.querySelector("[data-feature-image]");
      var section = root.closest("section") || document;
      var title = section.querySelector("[data-feature-title]");
      var desc = section.querySelector("[data-feature-description]");
      var screenByNumber = { "02": SCREENS[0], "03": SCREENS[1], "04": SCREENS[2] };

      arrowTabs(tabs, function (i, focus) {
        var tab = tabs[i];
        setSelected(tabs, i);
        if (panel) panel.setAttribute("aria-labelledby", tab.id);
        var screen = screenByNumber[tab.getAttribute("data-screen")];
        if (screen) swapImage(img, screen.image, screen.alt);
        if (title) title.textContent = tab.getAttribute("data-title");
        if (desc) desc.textContent = tab.getAttribute("data-description");
        if (focus) tab.focus();
      });
    });
  }

  /* Concept 2: doelgroeptabs */
  function setupAudienceTabs() {
    document.querySelectorAll("[data-audience]").forEach(function (root) {
      var tabs = Array.prototype.slice.call(root.querySelectorAll("[data-audience-tab]"));
      var panel = root.querySelector('[role="tabpanel"]');
      var fields = {
        label: root.querySelector("[data-audience-label]"),
        title: root.querySelector("[data-audience-title]"),
        copy: root.querySelector("[data-audience-copy]"),
        copyTwo: root.querySelector("[data-audience-copy-two]")
      };
      arrowTabs(tabs, function (i, focus) {
        var tab = tabs[i];
        var data = AUDIENCE[tab.getAttribute("data-audience-tab")];
        setSelected(tabs, i);
        if (panel) panel.setAttribute("aria-labelledby", tab.id);
        if (data) {
          if (fields.label) fields.label.textContent = data.label;
          if (fields.title) fields.title.innerHTML = data.title;
          if (fields.copy) fields.copy.textContent = data.copy;
          if (fields.copyTwo) fields.copyTwo.textContent = data.copyTwo;
        }
        if (focus) tab.focus();
      });
    });
  }

  /* Concept 2 en 3: rondleiding in de pagina met pijlen en stapindicatoren */
  function setupInlineTours() {
    document.querySelectorAll("[data-tour]").forEach(function (root) {
      var index = 0;
      var q = function (s) { return root.querySelector(s); };
      var img = q("[data-tour-image]"), count = q("[data-tour-count]"), idx = q("[data-tour-index]"),
          label = q("[data-tour-label]"), title = q("[data-tour-title]"), copy = q("[data-tour-copy]");
      var steps = Array.prototype.slice.call(root.querySelectorAll("[data-tour-step]"));

      function render(i) {
        var n = SCREENS.length;
        index = (i + n) % n;
        var s = SCREENS[index];
        swapImage(img, s.image, s.alt);
        if (count) count.textContent = pad(index + 1) + " / " + pad(n);
        if (idx) idx.textContent = pad(index + 1);
        if (label) label.textContent = s.label;
        if (title) title.innerHTML = s.title;
        if (copy) copy.textContent = s.copy;
        steps.forEach(function (b, j) {
          if (j === index) { b.setAttribute("aria-current", "step"); b.classList.add("active"); }
          else { b.removeAttribute("aria-current"); b.classList.remove("active"); }
        });
      }

      var prev = q("[data-tour-prev]"), next = q("[data-tour-next]");
      if (prev) prev.addEventListener("click", function () { render(index - 1); });
      if (next) next.addEventListener("click", function () { render(index + 1); });
      steps.forEach(function (b, j) {
        b.setAttribute("type", "button");
        b.addEventListener("click", function () { render(j); });
        b.addEventListener("keydown", function (e) {
          var t = null;
          if (e.key === "ArrowRight" || e.key === "ArrowDown") t = index + 1;
          else if (e.key === "ArrowLeft" || e.key === "ArrowUp") t = index - 1;
          if (t === null) return;
          e.preventDefault();
          render(t);
          steps[index].focus();
        });
      });
      render(0);
    });
  }

  /* ---------- Start ---------- */
  function init() {
    if (isConceptPage) {
      buildHeader();
      buildFooter();
    }
    var dialogs = buildDialogs();
    addDemoLabels(document);

    if (dialogs) {
      document.addEventListener("click", function (e) {
        var demo = e.target.closest("[data-demo]");
        var contact = e.target.closest("[data-contact]");
        if (demo) { e.preventDefault(); dialogs.tour.open(demo, 0); }
        else if (contact) { e.preventDefault(); dialogs.contact.open(contact); }
      });
    }

    setupFeatureTabs();
    setupAudienceTabs();
    setupInlineTours();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
