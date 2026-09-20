import { loadData } from "../data.js";
import {
  initializePageChrome,
  initializePageReveals,
  renderPageError,
  setDocumentTitle,
  siteHref,
} from "./shared.js";

const root = document.querySelector("[data-web-page]");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

function createMasthead() {
  const masthead = document.createElement("section");
  masthead.className = "page-masthead page-masthead--library page-masthead--compact";
  masthead.innerHTML = `
    <picture class="page-masthead__plate" aria-hidden="true">
      <source srcset="${siteHref("assets/art/web-starfield.webp")}" type="image/webp">
      <img src="${siteHref("assets/art/web-starfield.jpg")}" width="2560" height="1097" alt="" loading="eager" decoding="async">
    </picture>
    <div class="page-masthead__shade" aria-hidden="true"></div>
    <div class="micro-label page-masthead__micro page-masthead__micro--left" aria-hidden="true">
      <span>A Single Thread</span><span>Connects All Things</span>
    </div>
    <div class="micro-label page-masthead__micro page-masthead__micro--right" aria-hidden="true">
      <span>Different Paths</span><span>One Human Inquiry</span>
    </div>
    <div class="page-masthead__content">
      <p class="page-eyebrow">Ideas. Texts. People. Patterns. All Connected.</p>
      <h1>The Wisdom Web</h1>
      <p>Trace recurring questions without erasing the distance between their sources.</p>
    </div>`;
  return masthead;
}

function parsePeriodYear(period) {
  const normalized = period.toLowerCase();
  const numbers = [...normalized.matchAll(/\d+/g)].map((match) => Number(match[0]));
  if (!numbers.length) return 0;
  let values = numbers.slice(0, 2);
  if (normalized.includes("century")) values = values.map((value) => (value - 1) * 100 + 50);
  const midpoint = values.reduce((sum, value) => sum + value, 0) / values.length;
  return normalized.includes("bce") ? -midpoint : midpoint;
}

function historicalDistance(sourceTexts) {
  if (!sourceTexts.length) return "No dated sources";
  if (sourceTexts.length === 1) return sourceTexts[0].period;
  const years = sourceTexts.map((text) => parsePeriodYear(text.period));
  const distance = Math.round(Math.max(...years) - Math.min(...years));
  return `About ${distance.toLocaleString()} years`;
}

function createExplorer(connections, themes, texts) {
  const textById = new Map(texts.map((text) => [text.id, text]));
  const nodes = texts;
  const requestedTheme = new URLSearchParams(window.location.search).get("theme");
  let activeTheme = themes.find((theme) => theme.id === requestedTheme)
    || themes.find((theme) => theme.id === "consciousness")
    || themes[0];
  const activeTypes = new Set(connections.types.map((type) => type.id));
  let hoveredId = "";
  let selectedId = "";

  const section = document.createElement("section");
  section.className = "web-explorer reveal-band";
  section.setAttribute("aria-labelledby", "web-explorer-title");
  section.innerHTML = `
    <header class="web-explorer__heading">
      <div><p class="page-eyebrow">Explore the relationships</p><h2 id="web-explorer-title">Sixteen sources. Nineteen connections.</h2></div>
      <p data-web-count aria-live="polite"></p>
    </header>
    <div class="web-filters" aria-label="Connection type filters"></div>
    <div class="web-workspace">
      <aside class="web-themes" aria-labelledby="web-themes-title">
        <p class="page-eyebrow" id="web-themes-title">Theme threads</p>
        <div class="web-themes__list"></div>
      </aside>
      <div class="web-canvas-shell" data-web-canvas-shell>
        <canvas aria-label="A network of sixteen wisdom sources joined by nineteen thematic connections" data-web-canvas></canvas>
        <div class="web-node-actions" aria-label="Wisdom sources in the graph" data-web-node-actions></div>
      </div>
      <aside class="web-detail" aria-live="polite" data-web-detail></aside>
    </div>`;

  const filters = section.querySelector(".web-filters");
  const count = section.querySelector("[data-web-count]");
  const themeList = section.querySelector(".web-themes__list");
  const detail = section.querySelector("[data-web-detail]");
  const shell = section.querySelector("[data-web-canvas-shell]");
  const canvas = section.querySelector("[data-web-canvas]");
  const actions = section.querySelector("[data-web-node-actions]");
  const context = canvas.getContext("2d", { alpha: true, desynchronized: true });
  const positions = new Map();
  let cssWidth = 0;
  let cssHeight = 0;
  let frameHandle = 0;
  let isVisible = false;

  window.__btcWebMetrics = {
    nodeCount: nodes.length,
    connectionCount: connections.connections.length,
    averageFrameMs: 0,
    lastFrameMs: 0,
    frames: 0,
    paused: true,
  };
  section.dataset.nodeCount = String(nodes.length);
  section.dataset.connectionCount = String(connections.connections.length);

  connections.types.forEach((type) => {
    const label = document.createElement("label");
    label.className = "connection-toggle";
    label.style.setProperty("--connection-color", type.color);
    label.innerHTML = `<input type="checkbox" value="${type.id}" checked><span aria-hidden="true"></span>${type.label}`;
    label.querySelector("input").addEventListener("change", (event) => {
      if (event.currentTarget.checked) activeTypes.add(type.id);
      else activeTypes.delete(type.id);
      updateCount();
      draw(performance.now());
    });
    filters.append(label);
  });

  themes.forEach((theme) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "web-theme-button";
    button.dataset.theme = theme.id;
    button.innerHTML = `<span></span><small></small>`;
    button.querySelector("span").textContent = theme.label;
    button.querySelector("small").textContent = `${theme.textIds.length} sources`;
    button.addEventListener("click", () => {
      activeTheme = theme;
      selectedId = "";
      const url = new URL(window.location.href);
      url.searchParams.set("theme", theme.id);
      window.history.replaceState(null, "", url);
      updateThemeState();
      updateDetail();
      draw(performance.now());
    });
    themeList.append(button);
  });

  function createNodeActions() {
    actions.replaceChildren();
    nodes.forEach((node) => {
      const link = document.createElement("a");
      link.className = "web-node-action";
      link.href = siteHref(`library/${encodeURIComponent(node.id)}/`);
      link.dataset.nodeId = node.id;
      link.setAttribute("aria-label", `${node.title}. Open source.`);
      link.innerHTML = `<span class="sr-only">${node.title}</span>`;
      link.addEventListener("mouseenter", () => {
        hoveredId = node.id;
        draw(performance.now());
      });
      link.addEventListener("mouseleave", () => {
        hoveredId = "";
        draw(performance.now());
      });
      link.addEventListener("focus", () => {
        hoveredId = node.id;
        selectedId = node.id;
        updateDetail();
        draw(performance.now());
      });
      link.addEventListener("blur", () => {
        hoveredId = "";
        draw(performance.now());
      });
      actions.append(link);
    });
  }

  function updateThemeState() {
    themeList.querySelectorAll("button").forEach((button) => {
      const current = button.dataset.theme === activeTheme.id;
      button.classList.toggle("is-active", current);
      button.setAttribute("aria-pressed", String(current));
    });
  }

  function updateCount() {
    const visibleConnections = connections.connections.filter((connection) => activeTypes.has(connection.type));
    count.textContent = `${nodes.length} sources · ${visibleConnections.length} of ${connections.connections.length} connections shown`;
  }

  function updateDetail() {
    if (selectedId) {
      const text = textById.get(selectedId);
      const relatedThemes = themes.filter((theme) => theme.textIds.includes(selectedId));
      const degree = connections.connections.filter((connection) => connection.from === selectedId || connection.to === selectedId).length;
      detail.innerHTML = `
        <p class="page-eyebrow">Source selected</p>
        <h3></h3>
        <p class="web-detail__description"></p>
        <dl>
          <div><dt>Period</dt><dd></dd></div>
          <div><dt>Tradition</dt><dd></dd></div>
          <div><dt>Connections</dt><dd>${degree}</dd></div>
          <div><dt>Threads include</dt><dd class="web-detail__themes"></dd></div>
        </dl>
        <a class="button button--outline" href="${siteHref(`library/${encodeURIComponent(text.id)}/`)}">Read the source</a>`;
      detail.querySelector("h3").textContent = text.title;
      detail.querySelector(".web-detail__description").textContent = text.keyTeaching;
      const values = detail.querySelectorAll("dd");
      values[0].textContent = text.period;
      values[1].textContent = text.tradition;
      detail.querySelector(".web-detail__themes").textContent = relatedThemes.map((theme) => theme.label).join(", ") || "No indexed themes";
      return;
    }

    const sourceTexts = activeTheme.textIds.map((id) => textById.get(id)).filter(Boolean);
    const names = sourceTexts.slice(0, 4).map((text) => text.title);
    const remaining = sourceTexts.length - names.length;
    detail.innerHTML = `
      <p class="page-eyebrow">Theme selected</p>
      <h3></h3>
      <p class="web-detail__description"></p>
      <dl>
        <div><dt>Shared idea in</dt><dd>${sourceTexts.length} of ${texts.length} texts</dd></div>
        <div><dt>Sources include</dt><dd class="web-detail__sources"></dd></div>
        <div><dt>Historical distance</dt><dd>${historicalDistance(sourceTexts)}</dd></div>
      </dl>
      <a class="button button--outline" href="${siteHref(`library/?theme=${encodeURIComponent(activeTheme.id)}`)}">Explore this thread</a>`;
    detail.querySelector("h3").textContent = activeTheme.label;
    detail.querySelector(".web-detail__description").textContent = `Follow how these sources approach ${activeTheme.label.toLowerCase()} through the lens of ${activeTheme.subline.toLowerCase()}. Similar language does not make their traditions interchangeable.`;
    detail.querySelector(".web-detail__sources").textContent = `${names.join(", ")}${remaining > 0 ? `, and ${remaining} more` : ""}`;
  }

  function updatePositions() {
    positions.clear();
    const centerX = cssWidth / 2;
    const centerY = cssHeight / 2;
    const horizontalRadius = cssWidth < 600 ? cssWidth * 0.34 : cssWidth * 0.42;
    const outer = Math.min(horizontalRadius, cssHeight * 0.41);
    const inner = outer * 0.64;
    nodes.forEach((node, index) => {
      const ringIndex = index % 2;
      const ringCount = ringIndex ? Math.floor(nodes.length / 2) : Math.ceil(nodes.length / 2);
      const positionInRing = Math.floor(index / 2);
      const angle = (positionInRing / ringCount) * Math.PI * 2 - Math.PI / 2 + (ringIndex ? Math.PI / ringCount : 0);
      const radius = ringIndex ? inner : outer;
      positions.set(node.id, {
        x: centerX + Math.cos(angle) * radius,
        y: centerY + Math.sin(angle) * radius,
      });
    });

    actions.querySelectorAll(".web-node-action").forEach((action) => {
      const point = positions.get(action.dataset.nodeId);
      action.style.left = `${point.x}px`;
      action.style.top = `${point.y}px`;
    });
  }

  function resizeCanvas() {
    const rect = shell.getBoundingClientRect();
    cssWidth = Math.max(320, rect.width);
    cssHeight = Math.max(430, rect.height);
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(cssWidth * dpr);
    canvas.height = Math.round(cssHeight * dpr);
    canvas.style.width = `${cssWidth}px`;
    canvas.style.height = `${cssHeight}px`;
    context.setTransform(dpr, 0, 0, dpr, 0, 0);
    updatePositions();
    draw(performance.now());
  }

  function curveControl(from, to) {
    const centerX = cssWidth / 2;
    const centerY = cssHeight / 2;
    return {
      x: (from.x + to.x + centerX) / 3,
      y: (from.y + to.y + centerY) / 3,
    };
  }

  function draw(time = 0) {
    if (!cssWidth || !cssHeight) return;
    const began = performance.now();
    const themeIds = new Set(activeTheme.textIds);
    const pulse = reducedMotion.matches ? 0 : (Math.sin(time / 1800) + 1) * 0.08;
    context.clearRect(0, 0, cssWidth, cssHeight);

    const vignette = context.createRadialGradient(cssWidth / 2, cssHeight / 2, 0, cssWidth / 2, cssHeight / 2, Math.max(cssWidth, cssHeight) * 0.62);
    vignette.addColorStop(0, "rgba(14, 21, 36, .08)");
    vignette.addColorStop(1, "rgba(3, 6, 12, .72)");
    context.fillStyle = vignette;
    context.fillRect(0, 0, cssWidth, cssHeight);

    connections.connections.forEach((connection) => {
      if (!activeTypes.has(connection.type)) return;
      const from = positions.get(connection.from);
      const to = positions.get(connection.to);
      if (!from || !to) return;
      const type = connections.types.find((item) => item.id === connection.type);
      const relevant = themeIds.has(connection.from) && themeIds.has(connection.to);
      const highlighted = hoveredId && (hoveredId === connection.from || hoveredId === connection.to);
      const control = curveControl(from, to);
      context.beginPath();
      context.moveTo(from.x, from.y);
      context.quadraticCurveTo(control.x, control.y, to.x, to.y);
      context.strokeStyle = type.color;
      context.globalAlpha = highlighted ? 0.9 : relevant ? 0.46 + pulse : 0.13;
      context.lineWidth = highlighted ? 2 : relevant ? 1.2 : 0.75;
      context.stroke();
    });
    context.globalAlpha = 1;

    nodes.forEach((node) => {
      const point = positions.get(node.id);
      const relevant = themeIds.has(node.id);
      const highlighted = hoveredId === node.id || selectedId === node.id;
      const radius = highlighted ? 11 : relevant ? 8 : 6;
      context.beginPath();
      context.arc(point.x, point.y, radius + 5, 0, Math.PI * 2);
      context.fillStyle = highlighted ? "rgba(240, 206, 122, .18)" : relevant ? "rgba(201, 162, 39, .1)" : "rgba(156, 143, 122, .04)";
      context.fill();
      context.beginPath();
      context.arc(point.x, point.y, radius, 0, Math.PI * 2);
      context.fillStyle = relevant ? "#12100c" : "#0e1524";
      context.fill();
      context.strokeStyle = highlighted ? "#f0ce7a" : relevant ? "#c9a227" : "rgba(156, 143, 122, .55)";
      context.lineWidth = highlighted ? 2 : 1;
      context.stroke();
      context.fillStyle = relevant || highlighted ? "#efe7d8" : "rgba(156, 143, 122, .72)";
      context.font = `${highlighted ? 600 : 400} ${cssWidth < 600 ? 9 : 10}px Cinzel, serif`;
      context.textAlign = "center";
      context.textBaseline = "top";
      const label = node.title.replace(/^The\s+/i, "");
      context.fillText(label.length > 19 ? `${label.slice(0, 18)}…` : label, point.x, point.y + radius + 7);
    });

    const elapsed = performance.now() - began;
    const metrics = window.__btcWebMetrics;
    metrics.frames += 1;
    metrics.lastFrameMs = elapsed;
    metrics.averageFrameMs = metrics.frames === 1 ? elapsed : metrics.averageFrameMs * 0.94 + elapsed * 0.06;
    section.dataset.averageFrameMs = metrics.averageFrameMs.toFixed(3);
    section.dataset.lastFrameMs = elapsed.toFixed(3);
  }

  function loop(time) {
    if (!isVisible || reducedMotion.matches) {
      frameHandle = 0;
      window.__btcWebMetrics.paused = true;
      return;
    }
    draw(time);
    frameHandle = requestAnimationFrame(loop);
  }

  function setVisible(visible) {
    isVisible = visible;
    window.__btcWebMetrics.paused = !visible || reducedMotion.matches;
    section.dataset.renderPaused = String(!visible || reducedMotion.matches);
    if (visible) {
      draw(performance.now());
      if (!reducedMotion.matches && !frameHandle) frameHandle = requestAnimationFrame(loop);
    } else if (frameHandle) {
      cancelAnimationFrame(frameHandle);
      frameHandle = 0;
    }
  }

  canvas.addEventListener("pointermove", (event) => {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    let nearest = "";
    let distance = 24;
    positions.forEach((point, id) => {
      const current = Math.hypot(x - point.x, y - point.y);
      if (current < distance) {
        nearest = id;
        distance = current;
      }
    });
    if (nearest !== hoveredId) {
      hoveredId = nearest;
      canvas.style.cursor = nearest ? "pointer" : "default";
      draw(performance.now());
    }
  });
  canvas.addEventListener("pointerleave", () => {
    hoveredId = "";
    canvas.style.cursor = "default";
    draw(performance.now());
  });
  canvas.addEventListener("click", () => {
    if (!hoveredId) return;
    selectedId = hoveredId;
    updateDetail();
    draw(performance.now());
  });

  createNodeActions();
  updateThemeState();
  updateCount();
  updateDetail();

  const resizeObserver = new ResizeObserver(resizeCanvas);
  resizeObserver.observe(shell);
  const visibilityObserver = new IntersectionObserver(
    (entries) => setVisible(entries.some((entry) => entry.isIntersecting)),
    { rootMargin: "100px 0px" },
  );
  visibilityObserver.observe(shell);
  reducedMotion.addEventListener("change", () => setVisible(isVisible));

  return section;
}

async function initialize() {
  initializePageChrome("web");
  setDocumentTitle("The Wisdom Web");

  try {
    const [connections, themes, texts] = await Promise.all([
      loadData("connections.json"),
      loadData("themes.json"),
      loadData("texts.json"),
    ]);
    root.replaceChildren(createMasthead(), createExplorer(connections, themes, texts));
    initializePageReveals();
  } catch {
    renderPageError(root, "The Wisdom Web could not be opened.", "", "Return home");
  }
}

initialize();
