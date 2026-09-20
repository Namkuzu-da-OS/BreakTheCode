import { loadData } from "../data.js";

const container = document.querySelector("[data-web-constellation]");
const svgNamespace = "http://www.w3.org/2000/svg";
const centre = { x: 500, y: 250 };
const orbit = { x: 315, y: 158 };
const angles = [-126, -54, -18, 18, 54, 90, 126, 162, 198, -90];

function svgElement(name, attributes = {}) {
  const element = document.createElementNS(svgNamespace, name);
  Object.entries(attributes).forEach(([key, value]) => element.setAttribute(key, String(value)));
  return element;
}

function pointOnOrbit(angle) {
  const radians = (angle * Math.PI) / 180;
  return {
    x: centre.x + Math.cos(radians) * orbit.x,
    y: centre.y + Math.sin(radians) * orbit.y,
    angle,
  };
}

function addPath(parent, d) {
  parent.append(svgElement("path", { d }));
}

function addGlyph(parent, themeId) {
  const glyph = svgElement("g", {
    class: "web-node__glyph",
    transform: "translate(-10 -10)",
    "aria-hidden": "true",
  });

  const glyphPaths = {
    genetics: ["M4 2c6 4 6 12 12 16", "M16 2C10 6 10 14 4 18", "M7 5h6M7 10h6M7 15h6"],
    "ancient-texts": ["M4 3h10l2 2v12H6l-2-2V3Z", "M7 6h6M7 9h6M7 12h4"],
    shadow: ["M10 2a8 8 0 1 0 0 16", "M10 2c-4 4-4 12 0 16", "M10 2c4 4 4 12 0 16"],
    memory: ["M10 3a6 6 0 0 0-4 10v4h8v-4a6 6 0 0 0-4-10Z", "M7 9h6M10 13v4"],
    liberation: ["M3 14c4-1 5-4 7-10 2 6 3 9 7 10", "M4 16c4-2 8-2 12 0", "M10 4v12"],
    self: ["M10 2 17 6v8l-7 4-7-4V6l7-4Z", "M7 10h6M10 6v8"],
    nature: ["M10 18V8", "M10 12C4 12 3 8 4 4c4 0 6 2 6 8Z", "M10 10c1-5 3-7 7-7 1 4-1 8-7 9"],
    ritual: ["M4 16h12M6 16V8h8v8", "M8 8V5h4v3", "M10 2v3M7 3l1 2M13 3l-1 2"],
    language: ["M3 5h14v9H9l-4 3v-3H3V5Z", "M6 8h8M6 11h5"],
    presence: ["M10 2v3M10 15v3M2 10h3M15 10h3", "M5 5l2 2M13 13l2 2M15 5l-2 2M7 13l-2 2", "M10 7a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z"],
  };

  (glyphPaths[themeId] || ["M3 10h14", "M10 3v14", "M5 5l10 10", "M15 5 5 15"]).forEach((path) => addPath(glyph, path));
  parent.append(glyph);
}

function makeLine(from, to, className = "") {
  return svgElement("line", {
    x1: from.x.toFixed(2),
    y1: from.y.toFixed(2),
    x2: to.x.toFixed(2),
    y2: to.y.toFixed(2),
    class: className,
  });
}

function makeGlowPoint(from, to, progress) {
  return svgElement("circle", {
    class: "web-constellation__glow-point",
    cx: (from.x + (to.x - from.x) * progress).toFixed(2),
    cy: (from.y + (to.y - from.y) * progress).toFixed(2),
    r: "2.4",
  });
}

function labelPosition(point) {
  if (Math.abs(point.x - centre.x) < 45) {
    return {
      x: point.x,
      y: point.y < centre.y ? point.y - 31 : point.y + 38,
      anchor: "middle",
    };
  }

  const onLeft = point.x < centre.x;
  return {
    x: point.x + (onLeft ? 30 : -30),
    y: point.y - 3,
    anchor: onLeft ? "start" : "end",
  };
}

function makeNode(theme, point) {
  const link = svgElement("a", {
    class: "web-node",
    href: `./web/?theme=${encodeURIComponent(theme.id)}`,
    "aria-label": `${theme.label}: ${theme.subline}`,
  });

  const mark = svgElement("g", { transform: `translate(${point.x} ${point.y})` });
  mark.append(
    svgElement("circle", { class: "web-node__halo", r: "24" }),
    svgElement("circle", { class: "web-node__ring", r: "19" }),
  );
  addGlyph(mark, theme.id);

  const label = labelPosition(point);
  const text = svgElement("text", {
    class: "web-node__label",
    x: label.x,
    y: label.y,
    "text-anchor": label.anchor,
  });
  const name = svgElement("tspan", { x: label.x, dy: "0", class: "web-node__name" });
  name.textContent = theme.label;
  const subline = svgElement("tspan", { x: label.x, dy: "15", class: "web-node__subline" });
  subline.textContent = theme.subline;
  text.append(name, subline);

  link.append(mark, text);
  return link;
}

function makeCentre() {
  const group = svgElement("g", {
    class: "web-centre",
    transform: `translate(${centre.x} ${centre.y})`,
    "aria-hidden": "true",
  });
  group.append(
    svgElement("circle", { class: "web-centre__glow", r: "79" }),
    svgElement("circle", { class: "web-centre__ring", r: "72" }),
    svgElement("circle", { class: "web-centre__ring web-centre__ring--inner", r: "62" }),
  );

  const knot = svgElement("g", { class: "web-centre__knot", transform: "translate(0 -15)" });
  [0, 45, 90, 135].forEach((rotation) => {
    knot.append(svgElement("ellipse", { rx: "13", ry: "28", transform: `rotate(${rotation})` }));
  });
  knot.append(svgElement("circle", { r: "10" }));

  const label = svgElement("text", { class: "web-centre__label", x: "0", y: "42", "text-anchor": "middle" });
  label.textContent = "Consciousness";
  group.append(knot, label);
  return group;
}

function buildConstellation(themes) {
  const featured = themes.filter((theme) => theme.featured);
  if (featured.length !== 10) throw new Error("The home constellation requires ten featured themes");

  const svg = svgElement("svg", {
    class: "web-constellation",
    viewBox: "0 0 1000 500",
    role: "group",
    "aria-labelledby": "web-constellation-title web-constellation-description",
  });
  const title = svgElement("title", { id: "web-constellation-title" });
  title.textContent = "Wisdom Web theme constellation";
  const description = svgElement("desc", { id: "web-constellation-description" });
  description.textContent = "Ten linked themes orbit consciousness. Each theme opens the Wisdom Web filtered to that idea.";
  svg.append(title, description);

  const points = featured.map((theme, index) => ({ theme, ...pointOnOrbit(angles[index]) }));
  const orderedPoints = [...points].sort((a, b) => a.angle - b.angle);
  const lines = svgElement("g", { class: "web-constellation__lines", "aria-hidden": "true" });
  const glows = svgElement("g", { class: "web-constellation__glows", "aria-hidden": "true" });

  points.forEach((point, index) => {
    lines.append(makeLine(centre, point, "web-constellation__line web-constellation__line--radial"));
    glows.append(makeGlowPoint(centre, point, index % 2 === 0 ? 0.54 : 0.7));
  });

  orderedPoints.forEach((point, index) => {
    const next = orderedPoints[(index + 1) % orderedPoints.length];
    const across = orderedPoints[(index + 3) % orderedPoints.length];
    lines.append(makeLine(point, next, "web-constellation__line"));
    lines.append(makeLine(point, across, "web-constellation__line web-constellation__line--faint"));
    if (index % 2 === 0) glows.append(makeGlowPoint(point, next, 0.5));
  });

  svg.append(lines, glows, makeCentre());
  points.forEach((point) => svg.append(makeNode(point.theme, point)));
  return svg;
}

function renderError() {
  if (!container) return;
  const status = document.createElement("p");
  status.className = "band-status band-status--error";
  status.textContent = "The Wisdom Web could not be traced.";
  container.replaceChildren(status);
}

export async function initializeWebBand() {
  if (!container) return;

  try {
    const themes = await loadData("themes.json");
    container.replaceChildren(buildConstellation(themes));

    requestAnimationFrame(() => {
      if (container.scrollWidth > container.clientWidth) {
        container.scrollLeft = (container.scrollWidth - container.clientWidth) / 2;
      }
    });
  } catch {
    renderError();
  }
}
