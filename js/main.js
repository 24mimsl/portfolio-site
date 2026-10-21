/* Builds the page from js/content.js. You do not need to edit this file. */
(function () {
  "use strict";
  var S = window.SITE_CONTENT;
  if (!S) { document.body.textContent = "Could not load js/content.js"; return; }

  var $ = function (id) { return document.getElementById(id); };
  function make(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text != null) e.textContent = text;
    return e;
  }

  /* ----- header, nav, footer ----- */
  document.title = S.name + (S.role ? " — " + S.role : "");
  $("logo").src = S.logo;
  $("brandName").textContent = S.name;
  $("brand").setAttribute("aria-label", S.name + ", home");
  $("openContact").textContent = S.contactButtonLabel || "Contact";
  $("footer").textContent = S.footer || "";

  var navButtons = S.nav.map(function (item) {
    var b = make("button", null, item.label);
    b.dataset.page = item.page;
    b.addEventListener("click", function () { location.hash = item.page; });
    $("nav").appendChild(b);
    return b;
  });

  /* ----- home ----- */
  var H = S.home;
  $("headline").textContent = H.headline;
  $("portrait").src = H.portrait;
  $("portrait").alt = H.portraitAlt || "";
  $("intro").textContent = H.intro;
  if (H.backgroundSketches) $("sketches").style.backgroundImage = "url('" + H.backgroundSketches + "')";
  $("aboutTitle").textContent = H.aboutTitle;
  H.about.forEach(function (t) { $("aboutText").appendChild(make("p", null, t)); });
  if (H.resumeFile) {
    var cv = make("a", "resume-btn", H.resumeLabel || "View my resume");
    cv.href = H.resumeFile; cv.target = "_blank"; cv.rel = "noopener";
    $("aboutText").appendChild(cv);
  }
  $("toolsTitle").textContent = H.toolsTitle;
  H.tools.forEach(function (g) {
    var wrap = make("div", "tool-group");
    wrap.appendChild(make("h3", null, g.group));
    var chips = make("div", "chips");
    g.items.forEach(function (t) { chips.appendChild(make("span", "chip", t)); });
    wrap.appendChild(chips);
    $("toolsList").appendChild(wrap);
  });
  var E = H.education;
  if (E) {
    $("educationTitle").textContent = E.title;
    E.items.forEach(function (ed) {
      var item = make("div", "edu-item");
      item.appendChild(make("h3", null, ed.school));
      if (ed.degree) item.appendChild(make("p", null, ed.degree));
      if (ed.minor) item.appendChild(make("p", null, ed.minor));
      if (ed.coursework) item.appendChild(make("p", null, ed.coursework));
      var meta = [ed.location, ed.dates].filter(Boolean).join(" · ");
      if (meta) item.appendChild(make("p", "dates", meta));
      $("educationList").appendChild(item);
    });
  }
  var CE = H.certifications;
  if (CE) {
    $("certificationsTitle").textContent = CE.title;
    CE.items.forEach(function (c) {
      var item = make("div", "edu-item");
      item.appendChild(make("h3", null, c.name));
      if (c.details) item.appendChild(make("p", null, c.details));
      if (c.dates) item.appendChild(make("p", "dates", c.dates));
      $("certificationsList").appendChild(item);
    });
  } else {
    $("certificationsBlock").hidden = true;
  }

  /* ----- animated covers (js/covers.js): play when scrolled into view, replay on hover ----- */
  function animateCover(svg, card) {
    var busy = false;
    function play() {
      if (busy) return;
      busy = true;
      svg.classList.remove("run");
      void svg.getBoundingClientRect(); // restart the CSS animations
      svg.classList.add("run");
      var anims = svg.getAnimations ? svg.getAnimations({ subtree: true }) : [];
      Promise.all(anims.map(function (a) { return a.finished; }))
        .then(function () { busy = false; }, function () { busy = false; });
    }
    if (!("IntersectionObserver" in window)) { play(); return; }
    new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) play();
        else if (!busy) svg.classList.remove("run"); // reset so it plays again next time
      });
    }, { threshold: 0.4 }).observe(svg);
    card.addEventListener("mouseenter", play);
  }

  /* ----- works ----- */
  var W = S.works;
  $("worksTitle").textContent = W.title;
  var labelFor = {};
  W.categories.forEach(function (c) { labelFor[c.id] = c.label; });

  var cards = W.projects.map(function (p) {
    var fig = make("figure", "work");
    fig.dataset.category = p.category;
    var thumb = make("div", "thumb");
    var cover = p.cover && window.SITE_COVERS && window.SITE_COVERS[p.cover];
    if (cover) {
      thumb.className = "thumb cover";
      thumb.innerHTML = cover;
      animateCover(thumb.firstElementChild, fig);
    } else if (p.image) {
      var img = make("img");
      img.src = p.image; img.alt = p.imageAlt || p.title; img.loading = "lazy";
      thumb.appendChild(img);
    } else {
      thumb.className = "thumb empty";
      thumb.textContent = "Add an image";
    }
    if (p.comingSoon) {
      // covers the image and leaves the card without a link
      fig.className += " soon";
      var badge = make("span", "soon-badge", W.comingSoonLabel || "Coming soon");
      thumb.appendChild(badge);
    }
    fig.appendChild(thumb);
    fig.appendChild(make("h3", null, p.title));
    fig.appendChild(make("p", "kind", labelFor[p.category] || p.category));
    fig.appendChild(make("p", null, p.description));
    if (p.comingSoon) {
      // no link while the project is in progress
    } else if (p.caseStudy && p.caseStudy.id) {
      var cs = make("a", "more", W.caseStudyLabel || "View case study");
      cs.href = "#works/" + p.caseStudy.id;
      fig.appendChild(cs);
    } else if (p.link) {
      var a = make("a", "more", W.linkLabel || "View project");
      a.href = p.link; a.target = "_blank"; a.rel = "noopener";
      fig.appendChild(a);
    }
    $("grid").appendChild(fig);
    return fig;
  });

  var filterButtons = [{ id: "all", label: W.allLabel || "All" }].concat(W.categories).map(function (c) {
    var b = make("button", null, c.label);
    b.type = "button";
    b.setAttribute("aria-pressed", c.id === "all" ? "true" : "false");
    b.addEventListener("click", function () {
      filterButtons.forEach(function (x) { x.setAttribute("aria-pressed", x === b ? "true" : "false"); });
      cards.forEach(function (f) { f.hidden = !(c.id === "all" || f.dataset.category === c.id); });
    });
    $("filters").appendChild(b);
    return b;
  });

  /* ----- case study pages (#works/<id>) ----- */
  var caseById = {};
  // projects marked comingSoon get no page, so #works/<id> falls back to the works grid
  W.projects.forEach(function (p) { if (p.caseStudy && p.caseStudy.id && !p.comingSoon) caseById[p.caseStudy.id] = p; });

  // Empty text shows a grey hint so unfinished spots are easy to find.
  function textOr(tag, text, hint) {
    var e = make(tag, null, text || hint);
    if (!text) e.className = "placeholder";
    return e;
  }
  function picture(src, alt, hint) {
    var box = make("div", "thumb cs-img");
    if (src) {
      var img = make("img");
      img.src = src; img.alt = alt || ""; img.loading = "lazy";
      box.appendChild(img);
    } else {
      box.className = "thumb cs-img empty";
      box.textContent = hint || "Add an image";
    }
    return box;
  }
  function cardGrid(items, hint, numbered) {
    var grid = make("div", "cs-cards");
    (items || []).forEach(function (it, i) {
      var card = make("div", "cs-card");
      if (it.image !== undefined) card.appendChild(picture(it.image, it.imageAlt));
      if (numbered) card.appendChild(make("p", "card-num", (i < 9 ? "0" : "") + (i + 1)));
      card.appendChild(make("h3", null, it.title));
      if (it.list) {
        var ul = make("ul");
        it.list.forEach(function (t) { ul.appendChild(make("li", null, t)); });
        card.appendChild(ul);
      } else {
        card.appendChild(textOr("p", it.text, hint));
      }
      grid.appendChild(card);
    });
    return grid;
  }

  // Image with numbered dots; pointing at (or tapping) a dot spotlights that spot and explains it in the panel.
  function hotspotFigure(s) {
    var H = s.hotspots, wrap = make("div", "cs-hotspots"), stage = make("div", "hs-stage");
    var img = make("img");
    img.src = s.image; img.alt = s.imageAlt || ""; img.loading = "lazy";
    stage.appendChild(img);
    var spot = make("div", "hs-spot");
    spot.setAttribute("aria-hidden", "true");
    stage.appendChild(spot);

    var panel = make("div", "hs-panel"), label = make("p", "cs-label"), title = make("h3"), text = make("p"), hint = make("p", "hs-hint", H.hint);
    panel.setAttribute("aria-live", "polite");
    panel.appendChild(label); panel.appendChild(title); panel.appendChild(text);
    if (H.hint) panel.appendChild(hint);

    var current = -1;
    function show(i) {
      if (i === current) return;
      current = i;
      var p = H.points[i];
      wrap.classList.toggle("active", !!p);
      label.textContent = p ? "0" + (i + 1) + " / 0" + H.points.length : (H.label || "");
      title.textContent = p ? p.title : H.title;
      text.textContent = p ? p.text : H.text;
      hint.hidden = !!p;
      if (p) { stage.style.setProperty("--x", p.x + "%"); stage.style.setProperty("--y", p.y + "%"); }
      dots.forEach(function (d, j) { d.setAttribute("aria-pressed", j === i ? "true" : "false"); });
      panel.classList.remove("swap");
      void panel.offsetWidth; // restart the fade-in
      panel.classList.add("swap");
    }
    var dots = H.points.map(function (p, i) {
      var b = make("button", "hs-dot", String(i + 1));
      b.type = "button";
      b.style.left = p.x + "%"; b.style.top = p.y + "%";
      b.style.setProperty("--i", i);
      b.setAttribute("aria-label", p.title);
      b.addEventListener("mouseenter", function () { show(i); });
      b.addEventListener("focus", function () { show(i); });
      b.addEventListener("click", function () { show(i); });
      stage.appendChild(b);
      return b;
    });
    show(null);

    wrap.appendChild(stage);
    wrap.appendChild(panel);
    return wrap;
  }

  // Row of screens that scrolls one slide at a time with the arrows (or swipe / arrow keys).
  function carousel(slides) {
    var wrap = make("div", "cs-carousel"), track = make("div", "car-track");
    track.tabIndex = 0;
    track.setAttribute("aria-label", "Prototype screens");
    var items = slides.map(function (sl, i) {
      var fig = make("figure", "car-slide");
      var img = make("img");
      img.src = sl.src; img.alt = sl.alt || sl.caption || ""; img.loading = "lazy";
      fig.appendChild(img);
      fig.appendChild(make("figcaption", null, (i + 1) + ". " + (sl.caption || "")));
      track.appendChild(fig);
      return fig;
    });

    var controls = make("div", "car-controls"), count = make("p", "car-count");
    count.setAttribute("aria-live", "polite");
    function arrow(cls, label, glyph, dir) {
      var b = make("button", "car-btn " + cls, glyph);
      b.type = "button";
      b.setAttribute("aria-label", label);
      b.addEventListener("click", function () { go(dir); });
      return b;
    }
    var prev = arrow("prev", "Previous screen", "←", -1), next = arrow("next", "Next screen", "→", 1);
    controls.appendChild(prev); controls.appendChild(count); controls.appendChild(next);

    function index() {
      var left = track.scrollLeft, best = 0;
      items.forEach(function (f, i) { if (Math.abs(f.offsetLeft - track.offsetLeft - left) < Math.abs(items[best].offsetLeft - track.offsetLeft - left)) best = i; });
      return best;
    }
    function go(dir) {
      var i = Math.max(0, Math.min(items.length - 1, index() + dir));
      track.scrollTo({ left: items[i].offsetLeft - track.offsetLeft, behavior: "smooth" });
    }
    function update() {
      var max = track.scrollWidth - track.clientWidth;
      prev.disabled = track.scrollLeft <= 2;
      next.disabled = track.scrollLeft >= max - 2;
      count.textContent = (index() + 1) + " / " + items.length;
    }
    track.addEventListener("scroll", function () { window.requestAnimationFrame(update); });
    track.addEventListener("keydown", function (e) {
      if (e.key === "ArrowRight") { e.preventDefault(); go(1); }
      if (e.key === "ArrowLeft") { e.preventDefault(); go(-1); }
    });
    window.addEventListener("resize", update);
    setTimeout(update, 0);

    wrap.appendChild(track);
    wrap.appendChild(controls);
    return wrap;
  }

  // Before/after wipe: drag the divider (or use arrow keys) to move between the two images.
  function compare(before, after) {
    var wrap = make("div", "cs-compare"), stage = make("div", "cmp-stage");
    function layer(im, cls) {
      var box = make("div", "cmp-layer " + cls), img = make("img");
      img.src = im.src; img.alt = im.alt || im.label || ""; img.loading = "lazy";
      box.appendChild(img);
      box.appendChild(make("span", "cmp-tag", im.label));
      return box;
    }
    stage.appendChild(layer(before, "before"));
    stage.appendChild(layer(after, "after"));
    var handle = make("div", "cmp-handle");
    handle.setAttribute("aria-hidden", "true");
    handle.appendChild(make("span", null, "⟷"));
    stage.appendChild(handle);

    var range = make("input", "cmp-range");
    range.type = "range"; range.min = 0; range.max = 100; range.value = 50;
    range.setAttribute("aria-label", "Slide between " + before.label + " and " + after.label);
    function set(v) { stage.style.setProperty("--pos", v + "%"); }
    range.addEventListener("input", function () { set(range.value); });
    stage.appendChild(range);
    set(50);

    // First time it scrolls into view, sweep from paper to digital and settle in the middle.
    var still = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!still && "IntersectionObserver" in window) {
      set(100);
      var io = new IntersectionObserver(function (es) {
        if (!es[0].isIntersecting) return;
        io.disconnect();
        var t0 = null;
        (function step(t) {
          if (t0 === null) t0 = t;
          // 100 → 15 (mostly digital), then ease back to 50
          var k = Math.min(1, (t - t0) / 1600), ease = function (x) { return 1 - Math.pow(1 - x, 3); };
          var v = k < .6 ? 100 - 85 * ease(k / .6) : 15 + 35 * ease((k - .6) / .4);
          v = Math.round(v); range.value = v; set(v);
          if (k < 1) requestAnimationFrame(step);
        })(performance.now());
      }, { threshold: 0.5 });
      io.observe(stage);
    }

    wrap.appendChild(stage);
    wrap.appendChild(make("p", "cmp-hint", "Drag the divider to compare"));
    return wrap;
  }

  function renderSection(s) {
    var sec = make("section", "cs-section" + (s.softIntro ? " soft-intro" : "") + (s.background ? " bg-" + s.background : ""));
    var body = make("div", "cs-text");
    if (s.label) body.appendChild(make("p", "cs-label", s.label));
    body.appendChild(make("h2", null, s.title));
    (s.text || []).forEach(function (t) { body.appendChild(make("p", null, t)); });
    if (s.type === "text" && !(s.text && s.text.length) && !s.figures && !s.fullImage) body.appendChild(textOr("p", "", "Add text for this section."));
    sec.appendChild(body);

    var anim = s.cover && window.SITE_COVERS && window.SITE_COVERS[s.cover];
    if (s.figures) {
      // image + explanation rows, alternating sides
      var rows = make("div", "cs-figures");
      s.figures.forEach(function (f) {
        var row = make("div", "fig-row"), fig = make("figure", "fig-img"), txt = make("div", "fig-text");
        // one image (src) or several side by side (images: [{src, alt}])
        var pics = f.images || [{ src: f.src, alt: f.alt }];
        if (pics.length > 1) fig.className += " duo";
        pics.forEach(function (pi) {
          if (!pi.src) {   // grey "Add ..." box until the image exists
            fig.appendChild(make("div", "fig-empty", pi.hint || f.hint || "Add an image"));
            return;
          }
          var img = make("img");
          img.src = pi.src; img.alt = pi.alt || ""; img.loading = "lazy";
          fig.appendChild(img);
        });
        if (f.title) txt.appendChild(make("h3", null, f.title));
        if (f.text) txt.appendChild(make("p", null, f.text));
        if (f.list) {
          var ul = make("ul");
          f.list.forEach(function (t) { ul.appendChild(make("li", null, t)); });
          txt.appendChild(ul);
        }
        row.appendChild(fig); row.appendChild(txt);
        rows.appendChild(row);
      });
      sec.appendChild(rows);
    }
    if (s.fullImage) {
      var full = make("figure", "cs-full" + (s.fullImageStyle ? " " + s.fullImageStyle : "")), fimg = make("img");
      fimg.src = s.fullImage; fimg.alt = s.fullImageAlt || ""; fimg.loading = "lazy";
      full.appendChild(fimg);
      sec.appendChild(full);
    } else if (anim) {
      sec.className += " with-image";
      var box = make("div", "thumb cover cs-cover");
      box.innerHTML = anim;
      sec.appendChild(box);
      animateCover(box.firstElementChild, box);
    } else if (s.type === "text" && s.image && s.hotspots) {
      sec.appendChild(hotspotFigure(s));
    } else if (s.type === "text" && s.image !== undefined) {
      sec.className += " with-image";
      sec.appendChild(picture(s.image, s.imageAlt));
    }
    if (s.type === "research") {
      sec.className += " research";
      var cols = make("div", "cs-methods");
      (s.columns || []).forEach(function (c) {
        var col = make("div");
        col.appendChild(make("h3", null, c.title));
        var ul = make("ul");
        c.items.forEach(function (t) { ul.appendChild(make("li", null, t)); });
        col.appendChild(ul);
        cols.appendChild(col);
      });
      sec.appendChild(cols);
      var q = make("div", "cs-questions");
      q.appendChild(make("h3", null, s.questionsTitle || "Key research questions"));
      var ol = make("ol");
      (s.questions || []).forEach(function (t) { ol.appendChild(textOr("li", t, "Add a research question.")); });
      q.appendChild(ol);
      sec.appendChild(q);
      sec.appendChild(cardGrid(s.insights, "Add what you learned."));
    }
    if (s.type === "carousel") {
      sec.appendChild(carousel(s.slides || []));
      if (s.image) { var shot = picture(s.image, s.imageAlt); shot.className += " car-after"; sec.appendChild(shot); }
    }
    if (s.type === "compare") sec.appendChild(compare(s.before, s.after));
    if (s.type === "cards" && (s.screens || s.palette)) {
      // screens + palette on the left, cards on the right
      var split = make("div", "cs-showcase"), vis = make("div", "show-visual");
      if (s.screens) {
        var row = make("div", "show-screens");
        s.screens.forEach(function (sc) {
          var img = make("img");
          img.src = sc.src; img.alt = sc.alt || ""; img.loading = "lazy";
          row.appendChild(img);
        });
        vis.appendChild(row);
      }
      if (s.palette) {
        var pal = make("ul", "show-palette");
        pal.setAttribute("aria-label", "Color palette");
        s.palette.forEach(function (c) {
          var li = make("li"), sw = make("span", "swatch");
          sw.style.background = c.color;
          li.appendChild(sw);
          li.appendChild(make("b", null, c.name));
          li.appendChild(make("span", null, c.color));
          pal.appendChild(li);
        });
        vis.appendChild(pal);
      }
      split.appendChild(vis);
      split.appendChild(cardGrid(s.items, "Add a short description."));
      sec.appendChild(split);
    } else if (s.type === "cards") sec.appendChild(cardGrid(s.items, "Add a short description.", s.numbered));
    if (s.type === "journey") {
      var wrap = make("div", "cs-journey"), table = make("table"), thead = make("thead"), tbody = make("tbody");
      var head = make("tr");
      head.appendChild(make("td"));
      s.stages.forEach(function (st) { var th = make("th", null, st.stage); th.scope = "col"; head.appendChild(th); });
      thead.appendChild(head);
      s.rows.forEach(function (r) {
        var tr = make("tr"), th = make("th", null, r.label);
        th.scope = "row";
        tr.appendChild(th);
        s.stages.forEach(function (st) { tr.appendChild(textOr("td", st[r.key], "Add")); });
        tbody.appendChild(tr);
      });
      table.appendChild(thead); table.appendChild(tbody);
      wrap.appendChild(table);
      sec.appendChild(wrap);
    }
    if (s.type === "images") {
      var gal = make("div", "cs-gallery");
      (s.images || []).forEach(function (im) {
        if (!im.caption) { gal.appendChild(picture(im.src, im.alt, im.hint)); return; }
        var fig = make("figure");
        fig.appendChild(picture(im.src, im.alt, im.hint));
        fig.appendChild(make("figcaption", null, im.caption));
        gal.appendChild(fig);
      });
      sec.appendChild(gal);
      if (s.link) {
        var a = make("a", "more", s.linkLabel || "View prototype");
        a.href = s.link; a.target = "_blank"; a.rel = "noopener";
        sec.appendChild(a);
      }
    }
    return sec;
  }

  function renderCase(p) {
    var c = p.caseStudy, root = $("page-case");
    root.textContent = "";
    // per-project label color (e.g. orange for Candle Holder); falls back to the site blue
    if (c.accent) root.style.setProperty("--cs-label", c.accent); else root.style.removeProperty("--cs-label");
    var back = make("a", "back", W.backLabel || "← All works");
    back.href = "#works";
    root.appendChild(back);

    var hero = make("div", "cs-hero"), intro = make("div");
    intro.appendChild(make("p", "kind", labelFor[p.category] || p.category));
    var h1 = make("h1", null, c.titleImage ? null : p.title);
    if (c.titleImage) {
      var logo = make("img", "cs-logo");
      logo.src = c.titleImage; logo.alt = p.title;
      h1.appendChild(logo);
    }
    intro.appendChild(h1);
    if (c.subtitle) intro.appendChild(make("p", "lede", c.subtitle));
    var facts = make("dl", "cs-facts");
    (c.facts || []).forEach(function (f) {
      facts.appendChild(make("dt", null, f.label));
      facts.appendChild(textOr("dd", f.value, "Add"));
    });
    intro.appendChild(facts);
    hero.appendChild(intro);
    if (c.heroBackground) {
      // photo behind the header, darkened so the title stays readable
      hero.className += " has-bg";
      hero.style.backgroundImage = "linear-gradient(rgba(24,14,8,.62),rgba(24,14,8,.62)), url(\"" + c.heroBackground + "\")";
    }
    var heroPic = picture(c.heroImage, c.heroImageAlt, "Add a cover image");
    if (c.heroImage && c.heroTint) heroPic.className += " tinted";
    if (c.heroImageShape) heroPic.className += " " + c.heroImageShape;   // e.g. "tall" for portrait photos
    hero.appendChild(heroPic);
    root.appendChild(hero);

    // A section with beside: true joins the one above it as a second column.
    var prev;
    (c.sections || []).forEach(function (s) {
      var sec = renderSection(s);
      if (s.beside && prev) {
        prev.classList.add("pair");
        while (sec.firstChild) prev.appendChild(sec.firstChild);
      } else {
        root.appendChild(sec);
        prev = sec;
      }
    });
  }

  /* ----- back-to-top arrow: appears once you scroll down ----- */
  var toTop = $("toTop");
  toTop.hidden = false;
  function toggleTop() { toTop.classList.toggle("show", window.scrollY > 600); }
  window.addEventListener("scroll", toggleTop, { passive: true });
  toggleTop();
  toTop.addEventListener("click", function () {
    var still = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: still ? "auto" : "smooth" });
  });

  /* ----- contact panel ----- */
  var C = S.contact, dlg = $("contact");
  $("contactTitle").textContent = C.title;
  $("contactMessage").textContent = C.message;
  C.links.forEach(function (l) {
    var li = make("li"), a = make("a");
    a.href = l.url;
    if (l.url.indexOf("mailto:") !== 0) { a.target = "_blank"; a.rel = "noopener"; }
    a.appendChild(make("b", null, l.label));
    a.appendChild(make("span", null, l.text));
    a.firstChild.style.fontWeight = "500";
    li.appendChild(a);
    $("contactLinks").appendChild(li);
  });
  $("openContact").addEventListener("click", function () { dlg.showModal(); });
  $("closeContact").addEventListener("click", function () { dlg.close(); });
  dlg.addEventListener("click", function (e) { if (e.target === dlg) dlg.close(); });

  /* ----- page switching (uses the URL #home / #works / #works/<id> so Back works) ----- */
  var baseTitle = document.title;
  function show() {
    var parts = location.hash.replace("#", "").split("/");
    var page = parts[0] === "works" ? "works" : "home";
    var project = page === "works" && caseById[parts[1]];
    $("page-home").hidden = page !== "home";
    $("page-works").hidden = page !== "works" || !!project;
    $("page-case").hidden = !project;
    if (project) renderCase(project);
    document.title = project ? project.title + " — " + S.name : baseTitle;
    navButtons.forEach(function (b) {
      if (b.dataset.page === page) b.setAttribute("aria-current", "page");
      else b.removeAttribute("aria-current");
    });
    window.scrollTo(0, 0);
  }
  window.addEventListener("hashchange", show);
  show();
})();
