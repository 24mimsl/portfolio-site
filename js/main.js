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
  $("toolsTitle").textContent = H.toolsTitle;
  H.tools.forEach(function (g) {
    var wrap = make("div", "tool-group");
    wrap.appendChild(make("h3", null, g.group));
    var chips = make("div", "chips");
    g.items.forEach(function (t) { chips.appendChild(make("span", "chip", t)); });
    wrap.appendChild(chips);
    $("toolsList").appendChild(wrap);
  });

  /* ----- works ----- */
  var W = S.works;
  $("worksTitle").textContent = W.title;
  var labelFor = {};
  W.categories.forEach(function (c) { labelFor[c.id] = c.label; });

  var cards = W.projects.map(function (p) {
    var fig = make("figure", "work");
    fig.dataset.category = p.category;
    var thumb = make("div", "thumb");
    if (p.image) {
      var img = make("img");
      img.src = p.image; img.alt = p.imageAlt || p.title; img.loading = "lazy";
      thumb.appendChild(img);
    } else {
      thumb.className = "thumb empty";
      thumb.textContent = "Add an image";
    }
    fig.appendChild(thumb);
    fig.appendChild(make("h3", null, p.title));
    fig.appendChild(make("p", "kind", labelFor[p.category] || p.category));
    fig.appendChild(make("p", null, p.description));
    if (p.link) {
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

  /* ----- page switching (uses the URL #home / #works so Back works) ----- */
  function show() {
    var page = location.hash.replace("#", "") === "works" ? "works" : "home";
    $("page-home").hidden = page !== "home";
    $("page-works").hidden = page !== "works";
    navButtons.forEach(function (b) {
      if (b.dataset.page === page) b.setAttribute("aria-current", "page");
      else b.removeAttribute("aria-current");
    });
    window.scrollTo(0, 0);
  }
  window.addEventListener("hashchange", show);
  show();
})();
