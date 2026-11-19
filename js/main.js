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
  // headline can be one string or a list of lines
  [].concat(H.headline).forEach(function (line, i, all) {
    var last = all.length > 1 && i === all.length - 1;
    $("headline").appendChild(make("span", last ? "hl-line hl-statement" : "hl-line", line));
  });
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
      if (p.imagePosition) img.style.objectPosition = p.imagePosition;
      if (p.imageFit === "contain") {
        // whole photo shown, with a blurred copy filling the empty sides
        thumb.className += " fit-contain";
        if (p.imageBackground) thumb.style.background = p.imageBackground;   // solid color instead of the blur
        else {
          var fill = make("span", "thumb-fill");
          fill.style.backgroundImage = "url(\"" + p.image + "\")";
          thumb.appendChild(fill);
        }
      }
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

  var filterButtons = W.categories.concat([{ id: "all", label: W.allLabel || "All" }]).map(function (c) {   // "All" sits last
    var b = make("button", null, c.label);
    b.type = "button";
    b.addEventListener("click", function () { selectFilter(c.id); });
    b.dataset.id = c.id;
    $("filters").appendChild(b);
    return b;
  });
  function selectFilter(id) {
    filterButtons.forEach(function (x) { x.setAttribute("aria-pressed", x.dataset.id === id ? "true" : "false"); });
    cards.forEach(function (f) { f.hidden = !(id === "all" || f.dataset.category === id); });
  }
  selectFilter(W.defaultCategory || "all");   // which filter is selected when the page opens

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
    var sec = make("section", "cs-section t-" + s.type + (s.softIntro ? " soft-intro" : "") + (s.fullWidth ? " full-width" : "") + (s.background ? " bg-" + s.background : ""));
    var body = make("div", "cs-text");
    if (s.label) body.appendChild(make("p", "cs-label", s.label));
    if (s.title) body.appendChild(make("h2", null, s.title));   // title: "" leaves the big heading out
    (s.text || []).forEach(function (t) { body.appendChild(make("p", null, t)); });
    if (s.type === "text" && !(s.text && s.text.length) && !s.figures && !s.fullImage) body.appendChild(textOr("p", "", "Add text for this section."));
    sec.appendChild(body);

    var anim = s.cover && window.SITE_COVERS && window.SITE_COVERS[s.cover];
    if (s.figures) {
      // image + explanation rows, alternating sides
      var rows = make("div", "cs-figures");
      s.figures.forEach(function (f) {
        var row = make("div", "fig-row"), fig = make("figure", "fig-img" + (f.fit ? " " + f.fit : "")), txt = make("div", "fig-text");
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
        // several small headed paragraphs, e.g. product features
        (f.features || []).forEach(function (ft) {
          var item = make("div", "fig-feature");
          item.appendChild(make("h4", null, ft.title));
          item.appendChild(make("p", null, ft.text));
          txt.appendChild(item);
        });
        row.appendChild(fig); row.appendChild(txt);
        rows.appendChild(row);
      });
      sec.appendChild(rows);
    }
    if (anim) {
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
    // full-width image; can follow a side image (it spans both columns)
    if (s.fullImage) {
      var full = make("figure", "cs-full" + (s.fullImageStyle ? " " + s.fullImageStyle : "")), fimg = make("img");
      fimg.src = s.fullImage; fimg.alt = s.fullImageAlt || ""; fimg.loading = "lazy";
      full.appendChild(fimg);
      sec.appendChild(full);
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
    // dots on a line with a short note under each (context & problems)
    if (s.type === "timeline") {
      var tl = make("ol", "cs-timeline");
      tl.style.setProperty("--n", (s.steps || []).length);
      (s.steps || []).forEach(function (st) {
        var li = make("li");
        if (st.title) li.appendChild(make("h3", null, st.title));
        li.appendChild(make("p", null, st.text));
        tl.appendChild(li);
      });
      sec.appendChild(tl);
      // slowly scrolling strip of images beside the text (marquee: [{src, caption, text}])
      if (s.marquee) {
        var row = make("div", "tl-row"), mq = make("div", "cs-marquee"), track = make("div", "mq-track");
        mq.setAttribute("role", "region");
        mq.setAttribute("aria-label", s.marqueeLabel || "Examples");
        // two copies back to back so the loop is seamless; the copy is hidden from screen readers
        [0, 1].forEach(function (copy) {
          s.marquee.forEach(function (m) {
            var fig = make("figure", "mq-item"), img = make("img");
            img.src = m.src; img.alt = copy ? "" : (m.alt || m.caption || ""); img.loading = "lazy";
            fig.appendChild(img);
            var cap = make("figcaption");
            cap.appendChild(make("b", null, m.caption));
            if (m.text) cap.appendChild(make("span", null, m.text));
            fig.appendChild(cap);
            if (copy) fig.setAttribute("aria-hidden", "true");
            track.appendChild(fig);
          });
        });
        mq.appendChild(track);
        row.appendChild(mq);
        row.appendChild(body);   // the Context & problems text moves into the row, on the right
        sec.appendChild(row);
      }
    }
    // numbered goals in outlined boxes, beside the section text
    if (s.type === "goals") {
      var gl = make("ol", "cs-goals");
      (s.goals || []).forEach(function (g, i) {
        var li = make("li"), txt = make("div");
        li.appendChild(make("span", "goal-num", (i < 9 ? "0" : "") + (i + 1)));
        txt.appendChild(make("h3", null, g.title));
        if (g.text) txt.appendChild(make("p", null, g.text));
        li.appendChild(txt);
        gl.appendChild(li);
      });
      sec.appendChild(gl);
    }
    // images in a row with arrows between their captions (sketch -> prototype -> production)
    if (s.type === "flow") {
      var fl = make("div", "cs-flow"), n = (s.steps || []).length, cols = [];
      s.steps.forEach(function (st, i) {
        var c = 2 * i + 1;
        var pic = make("div", "flow-img" + (st.fit ? " " + st.fit : "")), img = make("img");
        img.src = st.src; img.alt = st.alt || ""; img.loading = "lazy";
        pic.appendChild(img);
        pic.style.setProperty("--c", c);
        var cap = make("div", "flow-cap");
        cap.appendChild(make("h3", null, st.caption));
        if (st.text) cap.appendChild(make("p", null, st.text));
        cap.style.setProperty("--c", c);
        fl.appendChild(pic); fl.appendChild(cap);
        cols.push("minmax(0,1fr)");
        if (i < n - 1) {
          var ar = make("span", "flow-arrow");
          ar.setAttribute("aria-hidden", "true");
          ar.style.setProperty("--c", c + 1);
          fl.appendChild(ar);
          cols.push("clamp(36px,6vw,96px)");
        }
      });
      fl.style.setProperty("--cols", cols.join(" "));
      sec.appendChild(fl);
    }
    // final product: rounded photos side by side, short feature notes below
    if (s.type === "showcase") {
      var gridF = make("div", "cs-final");
      gridF.style.setProperty("--n", (s.images || []).length);
      (s.images || []).forEach(function (im) {
        var img = make("img");
        img.src = im.src; img.alt = im.alt || ""; img.loading = "lazy";
        if (im.position) img.style.objectPosition = im.position;
        if (im.square) img.className = "square";   // sharp corners instead of rounded
        gridF.appendChild(img);
      });
      sec.appendChild(gridF);
      if (s.notes) {
        var notes = make("div", "cs-notes");
        s.notes.forEach(function (nt) {
          var d = make("div");
          d.appendChild(make("h3", null, nt.title));
          d.appendChild(make("p", null, nt.text));
          notes.appendChild(d);
        });
        sec.appendChild(notes);
      }
    }
    // full-width photo with the title and text set on top of it
    if (s.type === "banner") {
      sec.style.backgroundImage = "linear-gradient(150deg,rgba(14,20,36,.72),rgba(14,20,36,.1) 55%), url(\"" + s.image + "\")";
      if (s.position) sec.style.backgroundPosition = s.position;
      if (s.imageAlt) { sec.setAttribute("role", "img"); sec.setAttribute("aria-label", s.imageAlt + ". " + s.title); }
    }
    return sec;
  }

  // editorial header: huge faded title behind a cut-out photo, project text bottom right
  function editorialHero(p, c) {
    var hero = make("div", "ed-hero");
    var ghost = make("div", "ed-ghost");
    ghost.setAttribute("aria-hidden", "true");
    (c.ghost || p.title.toUpperCase().split(" ")).forEach(function (w) { ghost.appendChild(make("span", null, w)); });
    hero.appendChild(ghost);
    if (c.year) hero.appendChild(make("p", "ed-year", c.year));
    var img = make("img", "ed-photo");
    img.src = c.heroImage; img.alt = c.heroImageAlt || "";
    hero.appendChild(img);
    var intro = make("div", "ed-intro");
    intro.appendChild(make("p", "kind", labelFor[p.category] || p.category));
    intro.appendChild(make("h1", "ed-title", p.title));
    if (c.subtitle) intro.appendChild(make("p", "ed-sub", c.subtitle));
    if (c.summary) intro.appendChild(make("p", "ed-desc", c.summary));
    if (c.duration) intro.appendChild(make("p", "ed-duration", "Duration: " + c.duration));
    var facts = make("dl", "cs-facts");
    (c.facts || []).forEach(function (f) {
      facts.appendChild(make("dt", null, f.label));
      facts.appendChild(textOr("dd", f.value, "Add"));
    });
    intro.appendChild(facts);
    hero.appendChild(intro);
    // one dot per case study, like the page markers in a printed portfolio
    var dots = make("nav", "ed-dots");
    dots.setAttribute("aria-label", "Case studies");
    W.projects.forEach(function (q) {
      if (!q.caseStudy || !caseById[q.caseStudy.id]) return;
      var a = make("a");
      a.href = "#works/" + q.caseStudy.id;
      a.title = q.title; a.setAttribute("aria-label", q.title);
      if (q === p) a.setAttribute("aria-current", "page");
      dots.appendChild(a);
    });
    if (c.projectDots) hero.appendChild(dots);   // projectDots: true in content.js brings the side dots back
    return hero;
  }

  /* =====================================================================
     STUDIO CASE STUDY (layout: "studio" in content.js) - used by HEARTH.
     Cream page, sage accents, numbered sections, click-to-enlarge images.
     ===================================================================== */

  // fade sections in as they scroll into view
  var revealObs = ("IntersectionObserver" in window) ? new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add("in"); revealObs.unobserve(e.target); }
    });
  }, { rootMargin: "0px 0px -6% 0px", threshold: 0.06 }) : null;
  function reveal(el) {
    el.classList.add("rv");
    if (revealObs) revealObs.observe(el); else el.classList.add("in");
    return el;
  }
  var stillMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // full-size image viewer
  var lightbox;
  function openLightbox(src, alt) {
    if (!lightbox) {
      lightbox = make("dialog", "st-lightbox");
      lightbox.setAttribute("aria-label", "Enlarged image");
      var x = make("button", "close", "×");
      x.type = "button"; x.setAttribute("aria-label", "Close");
      x.addEventListener("click", function () { lightbox.close(); });
      lightbox.appendChild(x);
      lightbox.appendChild(make("img"));
      lightbox.addEventListener("click", function (e) { if (e.target === lightbox) lightbox.close(); });
      document.body.appendChild(lightbox);
    }
    var big = lightbox.querySelector("img");
    big.src = src; big.alt = alt || "";
    lightbox.showModal();
  }

  // zoom into one spot of a photo: the point at focus (x%, y%) sits in the middle of the frame
  function cropTo(img, frame, fx, fy, zoom) {
    function fit() {
      var fw = frame.clientWidth, fh = frame.clientHeight;
      if (!fw || !fh || !img.naturalWidth) return;
      var s = Math.max(fw / img.naturalWidth, fh / img.naturalHeight) * zoom;
      var w = img.naturalWidth * s, h = img.naturalHeight * s;
      var left = Math.min(0, Math.max(fw - w, fw / 2 - fx * w));
      var top = Math.min(0, Math.max(fh - h, fh / 2 - fy * h));
      img.style.width = w + "px"; img.style.height = h + "px";
      img.style.left = left + "px"; img.style.top = top + "px";
    }
    img.classList.add("cropped");
    if (img.complete) fit(); else img.addEventListener("load", fit);
    if ("ResizeObserver" in window) new ResizeObserver(fit).observe(frame);
    else window.addEventListener("resize", fit);
  }

  // one image (or a labeled placeholder when src is "")
  // im: { src, alt, caption, fig, focus: "50% 20%", zoom: 2, fit: "contain", bg, file, hint, ratio }
  function stPicture(im, cls) {
    im = im || {};
    var fig = make("figure", "st-img" + (cls ? " " + cls : ""));
    var frame;
    if (!im.src) {
      frame = make("div", "st-frame st-ph-box");
      frame.appendChild(make("span", "st-ph-hint", im.hint || "Add an image"));
      if (im.file) frame.appendChild(make("code", null, im.file));
    } else {
      frame = make("div", "st-frame" + (im.fit === "contain" ? " contain" : ""));
      var img = make("img");
      img.src = im.src; img.alt = im.alt || ""; img.loading = "lazy";
      if (im.bg) frame.style.background = im.bg;
      var f = (im.focus || "50% 50%").split(" ").map(function (v) { return parseFloat(v) / 100; });
      if (im.zoom) cropTo(img, frame, f[0], f[1], im.zoom);
      else if (im.focus) img.style.objectPosition = im.focus;
      frame.appendChild(img);
      // click (or Enter) to see the whole image, uncropped
      frame.tabIndex = 0;
      frame.setAttribute("role", "button");
      frame.setAttribute("aria-label", "Enlarge image" + (im.alt ? ": " + im.alt : ""));
      frame.addEventListener("click", function () { openLightbox(im.src, im.alt); });
      frame.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openLightbox(im.src, im.alt); }
      });
    }
    if (im.ratio) frame.style.aspectRatio = im.ratio;
    fig.appendChild(frame);
    if (im.caption) {
      var cap = make("figcaption");
      if (im.fig) cap.appendChild(make("span", "st-fig", im.fig));
      cap.appendChild(document.createTextNode(im.caption));
      fig.appendChild(cap);
    }
    return fig;
  }

  function two(n) { return (n < 10 ? "0" : "") + n; }
  function stTag(num, label) {
    var t = make("p", "st-tag");
    t.appendChild(make("span", "st-num", num));
    t.appendChild(document.createTextNode(label));
    return t;
  }
  // section heading: number + label on the left, title and short intro on the right
  function stHead(num, s) {
    var head = make("div", "st-head");
    head.appendChild(stTag(num, s.label));
    var main = make("div", "st-head-main");
    if (s.title) main.appendChild(make("h2", null, s.title));
    (s.text || []).forEach(function (t) { main.appendChild(make("p", null, t)); });
    head.appendChild(main);
    return head;
  }

  function renderStudio(p, c, root) {
    var H = c.hero || {};
    var secs = c.sections || [];

    /* 01 hero */
    var hero = make("section", "st-hero");
    hero.id = "st-01";
    var top = make("div", "st-hero-top");
    top.appendChild(stTag("01", H.kicker || labelFor[p.category] || ""));
    if (H.year) top.appendChild(make("p", "st-year", H.year));
    hero.appendChild(top);
    hero.appendChild(make("h1", "st-title", H.title || p.title));
    var body = make("div", "st-hero-body"), txt = make("div", "st-hero-text");
    if (H.subtitle) txt.appendChild(make("p", "st-sub", H.subtitle));
    if (H.description) txt.appendChild(make("p", "st-desc", H.description));
    body.appendChild(txt);
    var meta = make("dl", "st-meta");
    (H.meta || []).forEach(function (m) {
      var row = make("div");
      row.appendChild(make("dt", null, m.label));
      row.appendChild(make("dd", null, m.value));
      meta.appendChild(row);
    });
    body.appendChild(meta);
    hero.appendChild(body);
    hero.appendChild(stPicture(H.image, "st-hero-img"));
    // quick links to each section (smooth scroll)
    var index = make("nav", "st-index");
    index.setAttribute("aria-label", "Sections");
    secs.forEach(function (s, i) {
      var b = make("button");
      b.type = "button";
      b.appendChild(make("span", null, two(i + 2)));
      b.appendChild(document.createTextNode(s.label));
      b.addEventListener("click", function () {
        $("st-" + two(i + 2)).scrollIntoView({ behavior: stillMotion ? "auto" : "smooth", block: "start" });
      });
      index.appendChild(b);
    });
    hero.appendChild(index);
    root.appendChild(hero);

    /* 02-08 */
    secs.forEach(function (s, i) {
      var num = two(i + 2);
      var sec = make("section", "st-sec st-" + s.type);
      sec.id = "st-" + num;

      // reflection: text over a faded nature photo, then next project / all works
      if (s.type === "reflection") {
        if (s.background) {
          var bg = make("div", "st-refl-bg");
          bg.setAttribute("aria-hidden", "true");
          bg.style.backgroundImage = "url(\"" + s.background + "\")";
          if (s.backgroundPosition) bg.style.backgroundPosition = s.backgroundPosition;
          if (s.backgroundZoom) bg.style.backgroundSize = (s.backgroundZoom * 100) + "% auto";
          sec.appendChild(bg);
        }
        var inner = make("div", "st-refl-inner");
        inner.appendChild(stHead(num, { label: s.label, title: s.title }));
        var cols = make("div", "st-refl-body");
        (s.text || []).forEach(function (t) { cols.appendChild(make("p", null, t)); });
        inner.appendChild(cols);
        var rnav = make("nav", "st-next");
        rnav.setAttribute("aria-label", "More projects");
        var rlist = W.projects.filter(function (q) { return q.caseStudy && caseById[q.caseStudy.id]; });
        var rnext = rlist[(rlist.indexOf(p) + 1) % rlist.length];
        if (rnext && rnext !== p) {
          var ra = make("a");
          ra.href = "#works/" + rnext.caseStudy.id;
          ra.appendChild(make("span", null, s.nextLabel || "Next project"));
          ra.appendChild(make("b", null, rnext.title + " →"));
          rnav.appendChild(ra);
        }
        var rb = make("a");
        rb.href = "#works";
        rb.appendChild(make("span", null, s.backLabel || "Portfolio"));
        rb.appendChild(make("b", null, "← All works"));
        rnav.appendChild(rb);
        inner.appendChild(rnav);
        sec.appendChild(inner);
        root.appendChild(reveal(sec));
        return;
      }

      if (s.type === "closing") {
        var grid = make("div", "st-closing-grid");
        grid.appendChild(stPicture(s.image, "st-closing-img"));
        var side = make("div", "st-closing-text");
        side.appendChild(stTag(num, s.label));
        side.appendChild(make("h2", "st-closing-title", s.title || p.title));
        (s.text || []).forEach(function (t) { side.appendChild(make("p", null, t)); });
        // next project + back to all works
        var nav = make("nav", "st-next");
        nav.setAttribute("aria-label", "More projects");
        var list = W.projects.filter(function (q) { return q.caseStudy && caseById[q.caseStudy.id]; });
        var next = list[(list.indexOf(p) + 1) % list.length];
        if (next && next !== p) {
          var a = make("a");
          a.href = "#works/" + next.caseStudy.id;
          a.appendChild(make("span", null, s.nextLabel || "Next project"));
          a.appendChild(make("b", null, next.title + " →"));
          nav.appendChild(a);
        }
        var back = make("a");
        back.href = "#works";
        back.appendChild(make("span", null, s.backLabel || "Portfolio"));
        back.appendChild(make("b", null, "← All works"));
        nav.appendChild(back);
        side.appendChild(nav);
        grid.appendChild(side);
        sec.appendChild(grid);
        root.appendChild(reveal(sec));
        return;
      }

      sec.appendChild(stHead(num, s));

      if (s.type === "concept") {
        if (s.problem) {
          var prob = make("div", "st-problem");
          var art0 = make("div", "st-problem-art");
          var pimg = make("img"); pimg.src = s.problem.image.src; pimg.alt = s.problem.image.alt || "";
          art0.appendChild(pimg);
          prob.appendChild(art0);
          var ptxt = make("div", "st-problem-text");
          if (s.problem.title) ptxt.appendChild(make("h3", null, s.problem.title));
          (s.problem.text || []).forEach(function (t) { ptxt.appendChild(make("p", null, t)); });
          prob.appendChild(ptxt);
          sec.appendChild(prob);
        }
        var feats = make("div", "st-features");
        (s.features || []).forEach(function (ft, j) {
          var art = make("article", "st-feature");
          art.appendChild(stPicture(ft.image));
          var h3 = make("h3");
          h3.appendChild(make("span", "st-fnum", two(j + 1)));
          h3.appendChild(document.createTextNode(ft.title));
          art.appendChild(h3);
          art.appendChild(make("p", null, ft.text));
          feats.appendChild(art);
        });
        sec.appendChild(feats);
      }

      if (s.type === "moodboard") {
        var mood = make("div", "st-mood");
        (s.items || []).forEach(function (it, j) {
          it.fig = it.fig || "Fig. " + num + "." + (j + 1);
          mood.appendChild(stPicture(it, "m-" + (it.size || "md")));
        });
        sec.appendChild(mood);
        if (s.palette) {
          var pal = make("div", "st-palette-wrap");
          pal.appendChild(make("p", "st-mini", s.paletteTitle || "Color exploration"));
          var ul = make("ul", "st-palette");
          s.palette.forEach(function (col) {
            var li = make("li"), sw = make("span", "sw");
            sw.style.background = col.color;
            li.appendChild(sw);
            li.appendChild(make("b", null, col.name));
            li.appendChild(make("span", null, col.color + (col.note ? " · " + col.note : "")));
            ul.appendChild(li);
          });
          pal.appendChild(ul);
          sec.appendChild(pal);
        }
      }

      if (s.type === "process") {
        var ol = make("ol", "st-steps");
        ol.style.setProperty("--n", (s.steps || []).length);
        (s.steps || []).forEach(function (st, j) {
          var li = make("li");
          li.appendChild(make("span", "st-step-num", two(j + 1)));
          if (st.images) {
            // several images stacked in the space of one (e.g. two CAD views)
            var stack = make("div", "st-stack");
            stack.style.setProperty("--rows", st.images.length);
            st.images.forEach(function (im) { stack.appendChild(stPicture(im)); });
            li.appendChild(stack);
          } else li.appendChild(stPicture(st.image));
          li.appendChild(make("h3", null, st.title));
          if (st.text) li.appendChild(make("p", null, st.text));
          ol.appendChild(li);
        });
        sec.appendChild(ol);
      }

      if (s.type === "details") {
        var wrap = make("div", "st-anatomy"), legend = make("ol", "st-legend");
        var stage = make("div", "st-stage"), shot = make("img");
        shot.src = s.image.src; shot.alt = s.image.alt || ""; shot.loading = "lazy";
        if (s.image.bg) stage.style.background = s.image.bg;
        stage.appendChild(shot);
        var dots = [], items = [];
        function pick(k) {
          dots.forEach(function (d, m) { d.classList.toggle("on", m === k); });
          items.forEach(function (b, m) { b.classList.toggle("on", m === k); });
        }
        (s.callouts || []).forEach(function (co, j) {
          var d = make("button", "st-dot", String(j + 1));
          d.type = "button";
          d.style.left = co.x + "%"; d.style.top = co.y + "%";
          d.setAttribute("aria-label", co.title);
          d.addEventListener("mouseenter", function () { pick(j); });
          d.addEventListener("focus", function () { pick(j); });
          d.addEventListener("click", function () { pick(j); });
          stage.appendChild(d); dots.push(d);
          var li = make("li"), b = make("button", "st-leg");
          b.type = "button";
          b.appendChild(make("span", "n", two(j + 1)));
          b.appendChild(make("b", null, co.title));
          b.appendChild(make("span", "t", co.text));
          b.addEventListener("mouseenter", function () { pick(j); });
          b.addEventListener("focus", function () { pick(j); });
          b.addEventListener("click", function () { pick(j); });
          li.appendChild(b); legend.appendChild(li); items.push(b);
        });
        wrap.appendChild(legend);
        wrap.appendChild(stage);
        sec.appendChild(wrap);
        if (s.exploded) {
          var ex = make("div", "st-exploded");
          ex.appendChild(stPicture(s.exploded.image));
          var et = make("div", "st-exploded-text");
          et.appendChild(make("p", "st-mini", s.exploded.label || "Exploded view"));
          et.appendChild(make("h3", null, s.exploded.title));
          if (s.exploded.text) et.appendChild(make("p", null, s.exploded.text));
          ex.appendChild(et);
          sec.appendChild(ex);
        }
      }

      if (s.type === "nesting") {
        var cfg = make("ol", "st-configs");
        (s.configs || []).forEach(function (cf, j) {
          var li = make("li");
          li.appendChild(stPicture(cf.image));
          var lab = make("p", "st-cfg-label");
          lab.appendChild(make("span", null, String.fromCharCode(65 + j)));
          lab.appendChild(document.createTextNode(cf.title));
          li.appendChild(lab);
          li.appendChild(make("p", "st-cfg-text", cf.text));
          cfg.appendChild(li);
        });
        sec.appendChild(cfg);
        if (s.statement) sec.appendChild(make("p", "st-statement", s.statement));
      }

      if (s.type === "gallery") {
        var gal = make("div", "st-gal"), wide = 0;
        (s.rows || []).forEach(function (row) {
          if (!Array.isArray(row)) {          // { title, images } = a titled sub-group
            var grp = make("div", "st-gal-group");
            if (row.title) grp.appendChild(make("h3", "st-gal-title", row.title));
            gal.appendChild(grp);
            row = row.images || [];
          }
          var r = make("div", "st-row n" + Math.min(row.length, 3));
          if (row.length === 2 && wide++ % 2) r.className += " alt";   // two-image rows alternate their wide side
          row.forEach(function (im) { r.appendChild(stPicture(im)); });
          gal.appendChild(r);
        });
        sec.appendChild(gal);
      }

      root.appendChild(reveal(sec));
    });
  }

  function renderCase(p) {
    var c = p.caseStudy, root = $("page-case");
    root.textContent = "";
    // per-project label color (e.g. orange for Candle Holder); falls back to the site blue
    if (c.accent) root.style.setProperty("--cs-label", c.accent); else root.style.removeProperty("--cs-label");
    var back = make("a", "back", W.backLabel || "← All works");
    back.href = "#works";
    root.appendChild(back);
    root.classList.toggle("editorial", c.layout === "editorial");
    root.classList.toggle("studio", c.layout === "studio");
    if (c.layout === "studio") { renderStudio(p, c, root); return; }
    if (c.layout === "editorial") {
      root.appendChild(editorialHero(p, c));
      var num = 0;
      (c.sections || []).forEach(function (s) {
        var sec = renderSection(s);
        if (s.type !== "banner") {
          // running header like a slide: section name left, page number right
          num++;
          var head = make("div", "cs-head");
          head.appendChild(make("span", null, s.label || ""));
          sec.insertBefore(head, sec.firstChild);
        }
        root.appendChild(sec);
      });
      return;
    }

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
    // warm cream page color for "studio" case studies (HEARTH)
    document.body.classList.toggle("studio-page", !!(project && project.caseStudy.layout === "studio"));
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
