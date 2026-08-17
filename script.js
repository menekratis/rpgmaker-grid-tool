"use strict";

const MZ_TILE_SIZE = 48;
const TILESET_TEMPLATE_PATH = "assets/grid-template-tileset-b.png";

const elements = {
  fileInput: document.querySelector("#fileInput"),
  chooseButton: document.querySelector("#chooseButton"),
  emptyChooseButton: document.querySelector("#emptyChooseButton"),
  fileType: document.querySelector("#fileType"),
  pixelDimensions: document.querySelector("#pixelDimensions"),
  tileEquation: document.querySelector("#tileEquation"),
  alignmentNotice: document.querySelector("#alignmentNotice"),
  autoFitImageButton: document.querySelector("#autoFitImageButton"),
  restoreImageSizeButton: document.querySelector("#restoreImageSizeButton"),
  autoFitImageHint: document.querySelector("#autoFitImageHint"),
  gridToggle: document.querySelector("#gridToggle"),
  mzPresetButton: document.querySelector("#mzPresetButton"),
  gridSize: document.querySelector("#gridSize"),
  gridOpacity: document.querySelector("#gridOpacity"),
  opacityValue: document.querySelector("#opacityValue"),
  lineThickness: document.querySelector("#lineThickness"),
  thicknessValue: document.querySelector("#thicknessValue"),
  gridColor: document.querySelector("#gridColor"),
  colorValue: document.querySelector("#colorValue"),
  showPixelCoordinates: document.querySelector("#showPixelCoordinates"),
  exportGridButton: document.querySelector("#exportGridButton"),
  exportOriginalButton: document.querySelector("#exportOriginalButton"),
  dropZone: document.querySelector("#dropZone"),
  canvasViewport: document.querySelector("#canvasViewport"),
  canvasStage: document.querySelector("#canvasStage"),
  emptyState: document.querySelector("#emptyState"),
  mapCanvas: document.querySelector("#mapCanvas"),
  coordinateTooltip: document.querySelector("#coordinateTooltip"),
  tileCoordinates: document.querySelector("#tileCoordinates"),
  pixelCoordinates: document.querySelector("#pixelCoordinates"),
  dragOverlay: document.querySelector("#dragOverlay"),
  viewerTitle: document.querySelector("#viewerTitle"),
  fitButton: document.querySelector("#fitButton"),
  zoomPresetButtons: document.querySelectorAll("[data-zoom]"),
  zoomValue: document.querySelector("#zoomValue"),
  footerHint: document.querySelector("#footerHint"),
  gridStatus: document.querySelector("#gridStatus"),
  toast: document.querySelector("#toast"),

  sourceWorkspaceTab: document.querySelector("#sourceWorkspaceTab"),
  builderWorkspaceTab: document.querySelector("#builderWorkspaceTab"),
  sourceWorkspace: document.querySelector("#sourceWorkspace"),
  builderWorkspace: document.querySelector("#builderWorkspace"),
  builderTabCount: document.querySelector("#builderTabCount"),
  selectionToggleButton: document.querySelector("#selectionToggleButton"),
  selectionControls: document.querySelector("#selectionControls"),
  selectedTileCount: document.querySelector("#selectedTileCount"),
  individualSelectionButton: document.querySelector("#individualSelectionButton"),
  rectangleSelectionButton: document.querySelector("#rectangleSelectionButton"),
  selectionSummaryTitle: document.querySelector("#selectionSummaryTitle"),
  selectionSummaryDetail: document.querySelector("#selectionSummaryDetail"),
  clearSelectionButton: document.querySelector("#clearSelectionButton"),
  captureToggleButton: document.querySelector("#captureToggleButton"),
  captureControls: document.querySelector("#captureControls"),
  captureOutputBadge: document.querySelector("#captureOutputBadge"),
  captureModeHint: document.querySelector("#captureModeHint"),
  captureFrameModeButton: document.querySelector("#captureFrameModeButton"),
  captureSmartModeButton: document.querySelector("#captureSmartModeButton"),
  captureRectangleModeButton: document.querySelector("#captureRectangleModeButton"),
  captureLassoModeButton: document.querySelector("#captureLassoModeButton"),
  maskControls: document.querySelector("#maskControls"),
  maskRedrawButton: document.querySelector("#maskRedrawButton"),
  maskEraseButton: document.querySelector("#maskEraseButton"),
  maskRestoreButton: document.querySelector("#maskRestoreButton"),
  maskBackgroundButton: document.querySelector("#maskBackgroundButton"),
  brushSizeControl: document.querySelector("#brushSizeControl"),
  backgroundToleranceControl: document.querySelector("#backgroundToleranceControl"),
  maskBrushSize: document.querySelector("#maskBrushSize"),
  maskBrushSizeValue: document.querySelector("#maskBrushSizeValue"),
  maskTolerance: document.querySelector("#maskTolerance"),
  maskToleranceValue: document.querySelector("#maskToleranceValue"),
  maskUndoButton: document.querySelector("#maskUndoButton"),
  maskResetButton: document.querySelector("#maskResetButton"),
  maskClearSelectionButton: document.querySelector("#maskClearSelectionButton"),
  maskEdgeExpand: document.querySelector("#maskEdgeExpand"),
  maskEdgeExpandValue: document.querySelector("#maskEdgeExpandValue"),
  maskFeather: document.querySelector("#maskFeather"),
  maskFeatherValue: document.querySelector("#maskFeatherValue"),
  captureColumns: document.querySelector("#captureColumns"),
  captureRows: document.querySelector("#captureRows"),
  capturePlacementMode: document.querySelector("#capturePlacementMode"),
  autoFitObjectButton: document.querySelector("#autoFitObjectButton"),
  captureResizeMethod: document.querySelector("#captureResizeMethod"),
  captureScale: document.querySelector("#captureScale"),
  captureScaleValue: document.querySelector("#captureScaleValue"),
  previewZoomOutButton: document.querySelector("#previewZoomOutButton"),
  previewZoomInButton: document.querySelector("#previewZoomInButton"),
  previewZoomValue: document.querySelector("#previewZoomValue"),
  capturePreviewCanvas: document.querySelector("#capturePreviewCanvas"),
  captureQualityNotice: document.querySelector("#captureQualityNotice"),
  captureResetButton: document.querySelector("#captureResetButton"),
  capturePlaceSelectedButton: document.querySelector("#capturePlaceSelectedButton"),
  captureAddNextButton: document.querySelector("#captureAddNextButton"),
  analyzeTilesButton: document.querySelector("#analyzeTilesButton"),
  qualityStatusBadge: document.querySelector("#qualityStatusBadge"),
  outlierSensitivity: document.querySelector("#outlierSensitivity"),
  outlierSensitivityValue: document.querySelector("#outlierSensitivityValue"),
  harmonizeStrength: document.querySelector("#harmonizeStrength"),
  harmonizeStrengthValue: document.querySelector("#harmonizeStrengthValue"),
  showQualityOverlay: document.querySelector("#showQualityOverlay"),
  qualitySummary: document.querySelector("#qualitySummary"),
  qualityOutlierList: document.querySelector("#qualityOutlierList"),
  harmonizeTilesButton: document.querySelector("#harmonizeTilesButton"),
  resetHarmonizeButton: document.querySelector("#resetHarmonizeButton"),
  builderSelectedCount: document.querySelector("#builderSelectedCount"),
  builderSelectionTitle: document.querySelector("#builderSelectionTitle"),
  builderSelectionDetail: document.querySelector("#builderSelectionDetail"),
  backToSourceButton: document.querySelector("#backToSourceButton"),
  templateDimensions: document.querySelector("#templateDimensions"),
  builderDestination: document.querySelector("#builderDestination"),
  placeAtDestinationButton: document.querySelector("#placeAtDestinationButton"),
  addNextSlotsButton: document.querySelector("#addNextSlotsButton"),
  removeDestinationButton: document.querySelector("#removeDestinationButton"),
  clearTilesetButton: document.querySelector("#clearTilesetButton"),
  builderNotice: document.querySelector("#builderNotice"),
  downloadTilesetButton: document.querySelector("#downloadTilesetButton"),
  builderFitButton: document.querySelector("#builderFitButton"),
  builderActualSizeButton: document.querySelector("#builderActualSizeButton"),
  builderZoomValue: document.querySelector("#builderZoomValue"),
  builderCanvasViewport: document.querySelector("#builderCanvasViewport"),
  builderEmptyState: document.querySelector("#builderEmptyState"),
  builderCanvasStage: document.querySelector("#builderCanvasStage"),
  tilesetCanvas: document.querySelector("#tilesetCanvas"),
  builderFooterHint: document.querySelector("#builderFooterHint"),
  builderOccupancy: document.querySelector("#builderOccupancy"),
};

const state = {
  image: null,
  file: null,
  objectUrl: null,
  autoFitCanvas: null,
  fitToViewport: false,
  zoom: 1,
  dragDepth: 0,
  toastTimer: null,
  hasTransparentPixels: null,
};


const selectionState = {
  enabled: false,
  type: "individual",
  individualTiles: [],
  rectangle: null,
  dragStart: null,
  dragPreview: null,
};

const captureState = {
  enabled: false,
  mode: "frame",
  tool: "draw",
  columns: 1,
  rows: 1,
  scale: 1,
  offsetX: 0,
  offsetY: 0,
  centerX: 0,
  centerY: 0,
  dragging: false,
  pointerId: null,
  dragOffsetX: 0,
  dragOffsetY: 0,
  drawStart: null,
  drawPoints: [],
  previewBounds: null,
  selectionBounds: null,
  maskCanvas: null,
  baseMaskCanvas: null,
  maskHistory: [],
  brushLastPoint: null,
  hoverPoint: null,
  previewZoom: 3,
  previewDragging: false,
  previewPointerId: null,
  previewStartX: 0,
  previewStartY: 0,
  previewStartOffsetX: 0,
  previewStartOffsetY: 0,
};

const panState = {
  spaceHeld: false,
  active: false,
  pointerId: null,
  viewport: null,
  startClientX: 0,
  startClientY: 0,
  startScrollLeft: 0,
  startScrollTop: 0,
  moved: false,
  suppressClick: false,
};

const qualityState = {
  results: [],
  scope: [],
  eligibleCount: 0,
  analyzed: false,
  harmonizedCanvas: null,
  baselineMedian: 0,
  baselineMad: 0,
};

const builderState = {
  templateImage: null,
  width: 0,
  height: 0,
  columns: 0,
  rows: 0,
  cells: [],
  destination: null,
  fitToViewport: true,
  zoom: 1,
};

const displayContext = elements.mapCanvas.getContext("2d");
const tilesetContext = elements.tilesetCanvas.getContext("2d");

function clampInteger(value, minimum, maximum, fallback) {
  const parsed = Number.parseInt(value, 10);
  return Number.isFinite(parsed) ? Math.min(maximum, Math.max(minimum, parsed)) : fallback;
}

function getSavedSectionCollapsed(key, fallback) {
  try {
    const stored = window.localStorage.getItem("rpgmz-section-" + key);
    return stored === null ? fallback : stored === "collapsed";
  } catch {
    return fallback;
  }
}

function saveSectionCollapsed(key, collapsed) {
  try {
    window.localStorage.setItem("rpgmz-section-" + key, collapsed ? "collapsed" : "open");
  } catch {
    // The app remains fully usable when browser storage is unavailable.
  }
}

function setSectionCollapsed(section, collapsed, { persist = true } = {}) {
  const button = section.querySelector(".section-collapse-button");
  const body = section.querySelector(".collapsible-section-body");
  if (!button || !body) return;
  section.classList.toggle("is-collapsed", collapsed);
  body.hidden = collapsed;
  button.setAttribute("aria-expanded", String(!collapsed));
  button.title = collapsed ? "Expand section" : "Collapse section";
  if (persist) saveSectionCollapsed(section.dataset.collapsible, collapsed);
}

function initializeCollapsibleSections() {
  document.querySelectorAll("[data-collapsible]").forEach((section) => {
    let heading = section.querySelector(":scope > .section-heading");
    const title = section.querySelector(":scope > h2, :scope > .section-heading > h2");
    if (!title) return;

    if (!heading) {
      heading = document.createElement("div");
      heading.className = "section-heading";
      section.insertBefore(heading, title);
      heading.append(title);
    }

    const titleText = title.textContent.trim();
    const button = document.createElement("button");
    button.className = "section-collapse-button";
    button.type = "button";
    button.innerHTML = '<span>' + titleText + '</span><span class="section-chevron" aria-hidden="true">⌄</span>';
    title.textContent = "";
    title.append(button);

    const body = document.createElement("div");
    body.className = "collapsible-section-body";
    body.id = "collapsible-" + section.dataset.collapsible;
    button.setAttribute("aria-controls", body.id);
    while (heading.nextSibling) body.append(heading.nextSibling);
    section.append(body);

    const startsOpen = ["grid-settings", "image-details"].includes(section.dataset.collapsible);
    const collapsed = getSavedSectionCollapsed(section.dataset.collapsible, !startsOpen);
    setSectionCollapsed(section, collapsed, { persist: false });
    button.addEventListener("click", () => setSectionCollapsed(section, !section.classList.contains("is-collapsed")));
  });
}

function isEditableControl(target) {
  return target instanceof Element && Boolean(target.closest("input, select, textarea, [contenteditable='true']"));
}

function isPanIntent(event) {
  return panState.active || panState.suppressClick || event.button === 1 || (event.button === 0 && panState.spaceHeld);
}

function setPanReady(ready) {
  [elements.canvasViewport, elements.builderCanvasViewport].forEach((viewport) => {
    viewport.classList.toggle("is-pan-ready", ready);
  });
}

function beginViewportPan(event) {
  if (panState.active) return;
  const viewport = event.currentTarget;
  const backgroundDrag = event.button === 0 && event.target === viewport;
  const shortcutDrag = event.button === 1 || (event.button === 0 && panState.spaceHeld);
  if (!backgroundDrag && !shortcutDrag) return;

  panState.active = true;
  panState.pointerId = event.pointerId;
  panState.viewport = viewport;
  panState.startClientX = event.clientX;
  panState.startClientY = event.clientY;
  panState.startScrollLeft = viewport.scrollLeft;
  panState.startScrollTop = viewport.scrollTop;
  panState.moved = false;
  viewport.classList.add("is-panning");
  viewport.setPointerCapture(event.pointerId);
  hideCoordinates();
  event.preventDefault();
}

function moveViewportPan(event) {
  if (!panState.active || panState.pointerId !== event.pointerId || panState.viewport !== event.currentTarget) return;
  panState.viewport.scrollLeft = panState.startScrollLeft - (event.clientX - panState.startClientX);
  panState.viewport.scrollTop = panState.startScrollTop - (event.clientY - panState.startClientY);
  if (Math.abs(event.clientX - panState.startClientX) > 3 || Math.abs(event.clientY - panState.startClientY) > 3) {
    panState.moved = true;
  }
  event.preventDefault();
}

function finishViewportPan(event) {
  if (!panState.active || panState.pointerId !== event.pointerId || panState.viewport !== event.currentTarget) return;
  const viewport = panState.viewport;
  panState.active = false;
  panState.pointerId = null;
  panState.viewport = null;
  if (viewport.hasPointerCapture(event.pointerId)) viewport.releasePointerCapture(event.pointerId);
  viewport.classList.remove("is-panning");
  if (panState.moved) {
    panState.suppressClick = true;
    window.setTimeout(() => { panState.suppressClick = false; }, 0);
  }
  event.preventDefault();
}

function handleGlobalKeyDown(event) {
  const zoomKey = ["+", "-", "=", "0"].includes(event.key);
  if ((event.ctrlKey || event.metaKey) && zoomKey) {
    event.preventDefault();
    return;
  }
  if (event.key === "Escape" && captureState.enabled && isMaskCaptureMode() && captureState.maskCanvas) {
    clearCaptureObjectSelection();
    event.preventDefault();
    return;
  }
  if (event.code === "Space" && !isEditableControl(event.target)) {
    panState.spaceHeld = true;
    setPanReady(true);
    event.preventDefault();
  }
}

function handleGlobalKeyUp(event) {
  if (event.code !== "Space") return;
  panState.spaceHeld = false;
  setPanReady(false);
}

function preventControlWheelZoom(event) {
  if (event.ctrlKey || event.metaKey) event.preventDefault();
}

function getGridSettings() {
  return {
    size: clampInteger(elements.gridSize.value, 1, 1024, MZ_TILE_SIZE),
    opacity: Number(elements.gridOpacity.value) / 100,
    thickness: Number(elements.lineThickness.value),
    color: elements.gridColor.value,
  };
}

/**
 * Draws grid lines at exact multiples of the selected tile size. Since (0, 0)
 * is Canvas's top-left origin, stepping by tile size keeps every cell aligned
 * with RPG Maker's coordinate system. Odd-width strokes use a half-pixel
 * offset so a 1 px line lands on physical pixels instead of being blurred.
 * The right and bottom boundary strokes are inset by half their width because
 * Canvas clips any part of a stroke centered exactly on width or height.
 */
function drawGrid(context, width, height, settings) {
  const { size, opacity, thickness, color } = settings;
  const crispOffset = thickness % 2 === 1 ? 0.5 : 0;

  context.save();
  context.beginPath();
  context.globalAlpha = opacity;
  context.strokeStyle = color;
  context.lineWidth = thickness;

  for (let x = 0; x < width; x += size) {
    const lineX = x + crispOffset;
    context.moveTo(lineX, 0);
    context.lineTo(lineX, height);
  }

  for (let y = 0; y < height; y += size) {
    const lineY = y + crispOffset;
    context.moveTo(0, lineY);
    context.lineTo(width, lineY);
  }

  const boundaryInset = thickness / 2;
  context.moveTo(width - boundaryInset, 0);
  context.lineTo(width - boundaryInset, height);
  context.moveTo(0, height - boundaryInset);
  context.lineTo(width, height - boundaryInset);

  context.stroke();
  context.restore();
}

function updateGridStatus() {
  const { size } = getGridSettings();
  elements.gridStatus.textContent = elements.gridToggle.checked
    ? `Grid ${size}\u00D7${size} px`
    : "Grid hidden";
}

function getActiveSource() {
  return qualityState.harmonizedCanvas || state.autoFitCanvas || state.image;
}

function getSourceDimensions() {
  const source = getActiveSource();
  return source
    ? { width: source.naturalWidth || source.width, height: source.naturalHeight || source.height }
    : { width: 0, height: 0 };
}

function renderPreview() {
  updateGridStatus();
  if (!state.image) return;

  const { width, height } = getSourceDimensions();
  displayContext.clearRect(0, 0, width, height);
  displayContext.globalAlpha = 1;
  displayContext.drawImage(getActiveSource(), 0, 0, width, height);

  if (elements.gridToggle.checked) {
    drawGrid(displayContext, width, height, getGridSettings());
  }

  drawQualityOverlay(displayContext);
  drawSourceSelectionOverlay(displayContext);
  drawCaptureOverlay(displayContext);
}

function median(values) {
  if (!values.length) return 0;
  const sorted = [...values].sort((a, b) => a - b);
  const middle = Math.floor(sorted.length / 2);
  return sorted.length % 2 ? sorted[middle] : (sorted[middle - 1] + sorted[middle]) / 2;
}

function medianAbsoluteDeviation(values, center = median(values)) {
  return median(values.map((value) => Math.abs(value - center)));
}

function getAnalysisScope() {
  const { width, height } = getSourceDimensions();
  const columns = Math.floor(width / MZ_TILE_SIZE);
  const rows = Math.floor(height / MZ_TILE_SIZE);
  const payload = getSelectionPayload();
  if (payload) {
    return {
      kind: "selection",
      tiles: payload.tiles
        .map((tile) => ({ x: tile.sourceX, y: tile.sourceY }))
        .filter((tile) => tile.x >= 0 && tile.x < columns && tile.y >= 0 && tile.y < rows),
    };
  }

  const tiles = [];
  for (let y = 0; y < rows; y += 1) {
    for (let x = 0; x < columns; x += 1) tiles.push({ x, y });
  }
  return { kind: "complete grid", tiles };
}

function calculateTileMetrics(imageData, imageWidth, tileX, tileY) {
  const pixelCount = MZ_TILE_SIZE * MZ_TILE_SIZE;
  const luminance = new Float32Array(pixelCount);
  const visible = new Uint8Array(pixelCount);
  let visibleCount = 0;
  let luminanceSum = 0;
  let luminanceSquareSum = 0;

  for (let localY = 0; localY < MZ_TILE_SIZE; localY += 1) {
    for (let localX = 0; localX < MZ_TILE_SIZE; localX += 1) {
      const localIndex = localY * MZ_TILE_SIZE + localX;
      const sourceX = tileX * MZ_TILE_SIZE + localX;
      const sourceY = tileY * MZ_TILE_SIZE + localY;
      const sourceIndex = (sourceY * imageWidth + sourceX) * 4;
      const alpha = imageData[sourceIndex + 3];
      if (alpha <= 16) continue;
      const value =
        imageData[sourceIndex] * .2126 +
        imageData[sourceIndex + 1] * .7152 +
        imageData[sourceIndex + 2] * .0722;
      luminance[localIndex] = value;
      visible[localIndex] = 1;
      visibleCount += 1;
      luminanceSum += value;
      luminanceSquareSum += value * value;
    }
  }

  const alphaCoverage = visibleCount / pixelCount;
  const meanLuminance = visibleCount ? luminanceSum / visibleCount : 0;
  const contrast = visibleCount
    ? Math.sqrt(Math.max(0, luminanceSquareSum / visibleCount - meanLuminance * meanLuminance))
    : 0;
  let laplacianSum = 0;
  let laplacianSquareSum = 0;
  let edgeSum = 0;
  let edgeCount = 0;
  let strongEdgeCount = 0;

  for (let y = 1; y < MZ_TILE_SIZE - 1; y += 1) {
    for (let x = 1; x < MZ_TILE_SIZE - 1; x += 1) {
      const index = y * MZ_TILE_SIZE + x;
      const north = index - MZ_TILE_SIZE;
      const south = index + MZ_TILE_SIZE;
      const west = index - 1;
      const east = index + 1;
      if (!visible[index] || !visible[north] || !visible[south] || !visible[west] || !visible[east]) continue;
      const center = luminance[index];
      const laplacian = luminance[north] + luminance[south] + luminance[west] + luminance[east] - 4 * center;
      const gradientX = luminance[east] - center;
      const gradientY = luminance[south] - center;
      const edge = Math.sqrt(gradientX * gradientX + gradientY * gradientY);
      laplacianSum += laplacian;
      laplacianSquareSum += laplacian * laplacian;
      edgeSum += edge;
      edgeCount += 1;
      if (edge >= 28) strongEdgeCount += 1;
    }
  }

  const laplacianMean = edgeCount ? laplacianSum / edgeCount : 0;
  const sharpness = edgeCount
    ? Math.max(0, laplacianSquareSum / edgeCount - laplacianMean * laplacianMean)
    : 0;
  const edgeEnergy = edgeCount ? edgeSum / edgeCount : 0;
  const edgeDensity = edgeCount ? strongEdgeCount / edgeCount : 0;
  const composite = Math.log1p(sharpness) + .65 * Math.log1p(edgeEnergy);
  const eligible = alphaCoverage >= .08 && contrast >= 4 && edgeCount >= 64 && edgeEnergy >= 1.5;

  return {
    x: tileX,
    y: tileY,
    alphaCoverage,
    meanLuminance,
    contrast,
    sharpness,
    edgeEnergy,
    edgeDensity,
    composite,
    eligible,
    status: eligible ? "normal" : "ignored",
    robustScore: 0,
  };
}

function getOutlierThreshold() {
  return Number(elements.outlierSensitivity.value) / 10;
}

function getSensitivityLabel() {
  const threshold = getOutlierThreshold();
  if (threshold <= 2.1) return "Sensitive";
  if (threshold >= 3) return "Conservative";
  return "Balanced";
}

function classifyTileOutliers(results) {
  const eligible = results.filter((result) => result.eligible);
  qualityState.eligibleCount = eligible.length;
  if (eligible.length < 4) return;
  const composites = eligible.map((result) => result.composite);
  const edges = eligible.map((result) => Math.log1p(result.edgeEnergy));
  const center = median(composites);
  const edgeCenter = median(edges);
  const mad = medianAbsoluteDeviation(composites, center);
  const edgeMad = medianAbsoluteDeviation(edges, edgeCenter);
  const scale = Math.max(.08, mad * 1.4826);
  const edgeScale = Math.max(.05, edgeMad * 1.4826);
  const threshold = getOutlierThreshold();
  qualityState.baselineMedian = center;
  qualityState.baselineMad = mad;

  eligible.forEach((result) => {
    const score = (result.composite - center) / scale;
    const edgeScore = (Math.log1p(result.edgeEnergy) - edgeCenter) / edgeScale;
    result.robustScore = score;
    if (score <= -threshold && edgeScore <= -threshold * .45) result.status = "soft";
    else if (score >= threshold && edgeScore >= threshold * .35) result.status = "sharp";
  });
}

function focusSourceTile(tile) {
  switchWorkspace("source");
  if (state.zoom < 1) setPreviewZoom(1);
  window.requestAnimationFrame(() => {
    const scale = state.zoom;
    const centerX = (tile.x * MZ_TILE_SIZE + MZ_TILE_SIZE / 2) * scale;
    const centerY = (tile.y * MZ_TILE_SIZE + MZ_TILE_SIZE / 2) * scale;
    elements.canvasViewport.scrollTo({
      left: Math.max(0, centerX - elements.canvasViewport.clientWidth / 2),
      top: Math.max(0, centerY - elements.canvasViewport.clientHeight / 2),
      behavior: "smooth",
    });
  });
}

function updateQualityUi() {
  const soft = qualityState.results.filter((result) => result.status === "soft");
  const sharp = qualityState.results.filter((result) => result.status === "sharp");
  const outliers = [...soft, ...sharp].sort((a, b) => Math.abs(b.robustScore) - Math.abs(a.robustScore));
  elements.outlierSensitivityValue.textContent = getSensitivityLabel();
  elements.harmonizeStrengthValue.textContent = elements.harmonizeStrength.value + "%";
  elements.harmonizeTilesButton.disabled = !state.image || !outliers.length || Boolean(qualityState.harmonizedCanvas);
  elements.resetHarmonizeButton.disabled = !qualityState.harmonizedCanvas;
  elements.qualityOutlierList.replaceChildren();
  elements.qualityOutlierList.hidden = !outliers.length;

  if (!qualityState.analyzed) {
    elements.qualityStatusBadge.textContent = "Not run";
    elements.qualitySummary.textContent =
      "Analyze a logical group of selected tiles, or the complete source grid when nothing is selected.";
    return;
  }

  elements.qualityStatusBadge.textContent = qualityState.harmonizedCanvas
    ? "Corrected"
    : outliers.length + (outliers.length === 1 ? " flag" : " flags");
  const ignored = qualityState.results.length - qualityState.eligibleCount;
  const scopeLabel = qualityState.scope.kind === "selection" ? "selected tiles" : "complete source grid";
  elements.qualitySummary.textContent =
    "Analyzed " + qualityState.results.length + " " + scopeLabel + ". " +
    soft.length + " soft, " + sharp.length + " overly sharp, " + ignored + " excluded as empty or low-detail.";

  outliers.slice(0, 12).forEach((result) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "quality-outlier-item is-" + result.status;
    const label = result.status === "soft" ? "Soft" : "Over-sharp";
    button.innerHTML =
      '<span><strong>' + label + '</strong><small>X:' + result.x + ' Y:' + result.y + '</small></span>' +
      '<span class="quality-score">' + Math.abs(result.robustScore).toFixed(1) + 'σ</span>';
    button.addEventListener("click", () => focusSourceTile(result));
    elements.qualityOutlierList.append(button);
  });
}

function resetQualityState({ render = true } = {}) {
  qualityState.results = [];
  qualityState.scope = [];
  qualityState.eligibleCount = 0;
  qualityState.analyzed = false;
  qualityState.harmonizedCanvas = null;
  qualityState.baselineMedian = 0;
  qualityState.baselineMad = 0;
  updateQualityUi();
  if (render) {
    renderPreview();
    updateCaptureUi();
  }
}

function analyzeTiles({ announce = true } = {}) {
  if (!state.image) return;
  const scope = getAnalysisScope();
  if (!scope.tiles.length) {
    showToast("There are no complete 48×48 tiles to analyze.", true);
    return;
  }
  const canvas = document.createElement("canvas");
  const dimensions = getSourceDimensions();
  canvas.width = dimensions.width;
  canvas.height = dimensions.height;
  const context = canvas.getContext("2d", { willReadFrequently: true });
  context.drawImage(getActiveSource(), 0, 0);
  const pixels = context.getImageData(0, 0, canvas.width, canvas.height).data;
  const results = scope.tiles.map((tile) => calculateTileMetrics(pixels, canvas.width, tile.x, tile.y));
  classifyTileOutliers(results);
  qualityState.results = results;
  qualityState.scope = scope;
  qualityState.analyzed = true;
  updateQualityUi();
  renderPreview();
  if (announce) {
    const outlierCount = results.filter((result) => result.status === "soft" || result.status === "sharp").length;
    showToast("Analyzed " + results.length + " tiles; " + outlierCount + " quality " + (outlierCount === 1 ? "flag" : "flags") + ".");
  }
}

function drawQualityOverlay(context) {
  if (!qualityState.analyzed || !elements.showQualityOverlay.checked) return;
  context.save();
  qualityState.results.forEach((result) => {
    if (result.status !== "soft" && result.status !== "sharp") return;
    const x = result.x * MZ_TILE_SIZE;
    const y = result.y * MZ_TILE_SIZE;
    const soft = result.status === "soft";
    context.fillStyle = soft ? "rgba(255, 191, 91, .27)" : "rgba(185, 110, 255, .25)";
    context.strokeStyle = soft ? "#ffbf5b" : "#c07aff";
    context.lineWidth = 3;
    context.fillRect(x, y, MZ_TILE_SIZE, MZ_TILE_SIZE);
    context.strokeRect(x + 1.5, y + 1.5, MZ_TILE_SIZE - 3, MZ_TILE_SIZE - 3);
    context.fillStyle = "#071019";
    context.font = "bold 12px sans-serif";
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillText(soft ? "SOFT" : "SHARP", x + MZ_TILE_SIZE / 2, y + MZ_TILE_SIZE / 2);
  });
  context.restore();
}

function createGaussianLuminance(imageData, width, height) {
  const blurred = new Float32Array(width * height);
  const kernel = [1, 2, 1];
  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      let weightedLuminance = 0;
      let weightedAlpha = 0;
      for (let offsetY = -1; offsetY <= 1; offsetY += 1) {
        const sampleY = Math.min(height - 1, Math.max(0, y + offsetY));
        for (let offsetX = -1; offsetX <= 1; offsetX += 1) {
          const sampleX = Math.min(width - 1, Math.max(0, x + offsetX));
          const index = (sampleY * width + sampleX) * 4;
          const alpha = imageData[index + 3] / 255;
          const weight = kernel[offsetX + 1] * kernel[offsetY + 1] * alpha;
          if (!weight) continue;
          const luminance =
            imageData[index] * .2126 +
            imageData[index + 1] * .7152 +
            imageData[index + 2] * .0722;
          weightedLuminance += luminance * weight;
          weightedAlpha += weight;
        }
      }
      const sourceIndex = (y * width + x) * 4;
      const sourceLuminance =
        imageData[sourceIndex] * .2126 +
        imageData[sourceIndex + 1] * .7152 +
        imageData[sourceIndex + 2] * .0722;
      blurred[y * width + x] = weightedAlpha ? weightedLuminance / weightedAlpha : sourceLuminance;
    }
  }
  return blurred;
}

function clampChannel(value) {
  return Math.max(0, Math.min(255, Math.round(value)));
}

function harmonizeFlaggedTiles() {
  if (!state.image || qualityState.harmonizedCanvas || !qualityState.analyzed) return;
  const flagged = qualityState.results.filter((result) => result.status === "soft" || result.status === "sharp");
  if (!flagged.length) return;
  const canvas = document.createElement("canvas");
  const baseSource = state.autoFitCanvas || state.image;
  const dimensions = getSourceDimensions();
  canvas.width = dimensions.width;
  canvas.height = dimensions.height;
  const context = canvas.getContext("2d", { willReadFrequently: true });
  context.drawImage(baseSource, 0, 0);
  const image = context.getImageData(0, 0, canvas.width, canvas.height);
  const original = new Uint8ClampedArray(image.data);
  const blurredLuminance = createGaussianLuminance(original, canvas.width, canvas.height);
  const strength = Number(elements.harmonizeStrength.value) / 100;
  const threshold = getOutlierThreshold();

  flagged.forEach((result) => {
    const severity = Math.max(0, Math.abs(result.robustScore) - threshold);
    const baseAmount = result.status === "soft"
      ? Math.min(.8, .34 + severity * .1) * strength
      : Math.min(.36, .16 + severity * .05) * strength;
    for (let localY = 0; localY < MZ_TILE_SIZE; localY += 1) {
      for (let localX = 0; localX < MZ_TILE_SIZE; localX += 1) {
        const x = result.x * MZ_TILE_SIZE + localX;
        const y = result.y * MZ_TILE_SIZE + localY;
        if (x >= canvas.width || y >= canvas.height) continue;
        const index = (y * canvas.width + x) * 4;
        if (original[index + 3] <= 16) continue;
        const distanceToEdge = Math.min(localX, localY, MZ_TILE_SIZE - 1 - localX, MZ_TILE_SIZE - 1 - localY);
        const feather = Math.min(1, distanceToEdge / 4);
        if (!feather) continue;
        const sourceLuminance =
          original[index] * .2126 + original[index + 1] * .7152 + original[index + 2] * .0722;
        const blurLuminance = blurredLuminance[y * canvas.width + x];
        const luminanceDelta = result.status === "soft"
          ? sourceLuminance - blurLuminance
          : blurLuminance - sourceLuminance;
        const correction = luminanceDelta * baseAmount * feather;
        image.data[index] = clampChannel(original[index] + correction);
        image.data[index + 1] = clampChannel(original[index + 1] + correction);
        image.data[index + 2] = clampChannel(original[index + 2] + correction);
        image.data[index + 3] = original[index + 3];
      }
    }
  });

  context.putImageData(image, 0, 0);
  qualityState.harmonizedCanvas = canvas;
  analyzeTiles({ announce: false });
  updateCaptureUi();
  showToast("Harmonized " + flagged.length + " flagged " + (flagged.length === 1 ? "tile" : "tiles") + " from the original source.");
}

function restoreOriginalSource() {
  if (!qualityState.harmonizedCanvas) return;
  qualityState.harmonizedCanvas = null;
  analyzeTiles({ announce: false });
  updateCaptureUi();
  showToast(state.autoFitCanvas ? "Restored the auto-fitted source image." : "Restored the unchanged original source image.");
}

function formatTileCount(pixels) {
  const tiles = pixels / MZ_TILE_SIZE;
  return Number.isInteger(tiles)
    ? String(tiles)
    : tiles.toFixed(2).replace(/0+$/, "").replace(/\.$/, "");
}

function updateImageDetails(width, height) {
  const widthRemainder = width % MZ_TILE_SIZE;
  const heightRemainder = height % MZ_TILE_SIZE;
  const targetWidth = Math.max(MZ_TILE_SIZE, Math.round(width / MZ_TILE_SIZE) * MZ_TILE_SIZE);
  const targetHeight = Math.max(MZ_TILE_SIZE, Math.round(height / MZ_TILE_SIZE) * MZ_TILE_SIZE);
  const aligned = widthRemainder === 0 && heightRemainder === 0;

  elements.pixelDimensions.textContent = `${width} \u00D7 ${height} px`;
  elements.tileEquation.textContent =
    `${width}\u00D7${height} px = ${formatTileCount(width)}\u00D7${formatTileCount(height)} tiles @ 48px`;
  elements.autoFitImageButton.disabled = !state.image || aligned;
  elements.autoFitImageButton.textContent = aligned
    ? "Image Fits the 48px Grid"
    : `Auto Fit to ${targetWidth}\u00D7${targetHeight}`;
  elements.restoreImageSizeButton.hidden = !state.autoFitCanvas;
  elements.autoFitImageHint.textContent = state.autoFitCanvas
    ? "Working copy fitted without resampling. The uploaded original is unchanged."
    : aligned
      ? "Already aligned; no size change is needed."
      : `Nearest grid size: ${targetWidth}\u00D7${targetHeight}. Uses centered padding or cropping, not resampling.`;

  if (aligned) {
    elements.alignmentNotice.hidden = true;
    elements.alignmentNotice.textContent = "";
    return;
  }

  const issues = [];
  if (widthRemainder !== 0) issues.push(`width has a ${widthRemainder}px remainder`);
  if (heightRemainder !== 0) issues.push(`height has a ${heightRemainder}px remainder`);

  elements.alignmentNotice.textContent = `Not divisible by 48: ${issues.join("; ")}.`;
  elements.alignmentNotice.hidden = false;
}

function resetSourceInteractionsForSizeChange() {
  resetQualityState({ render: false });
  clearSourceSelection();
  setSelectionEnabled(false);
  setCaptureEnabled(false);
  resetCaptureMask();
  resetCapturePosition();
}

function applyWorkingSourceDimensions() {
  const { width, height } = getSourceDimensions();
  elements.mapCanvas.width = width;
  elements.mapCanvas.height = height;
  updateImageDetails(width, height);
  applyZoom();
  renderPreview();
  elements.canvasViewport.scrollTo({ top: 0, left: 0 });
}

function autoFitImageToGrid() {
  if (!state.image) return;
  const current = state.autoFitCanvas || state.image;
  const width = current.naturalWidth || current.width;
  const height = current.naturalHeight || current.height;
  const targetWidth = Math.max(MZ_TILE_SIZE, Math.round(width / MZ_TILE_SIZE) * MZ_TILE_SIZE);
  const targetHeight = Math.max(MZ_TILE_SIZE, Math.round(height / MZ_TILE_SIZE) * MZ_TILE_SIZE);
  if (width === targetWidth && height === targetHeight) return;

  const canvas = document.createElement("canvas");
  canvas.width = targetWidth;
  canvas.height = targetHeight;
  const context = canvas.getContext("2d");
  const sourceX = Math.max(0, Math.floor((width - targetWidth) / 2));
  const sourceY = Math.max(0, Math.floor((height - targetHeight) / 2));
  const destinationX = Math.max(0, Math.floor((targetWidth - width) / 2));
  const destinationY = Math.max(0, Math.floor((targetHeight - height) / 2));
  const copyWidth = Math.min(width, targetWidth);
  const copyHeight = Math.min(height, targetHeight);
  context.drawImage(current, sourceX, sourceY, copyWidth, copyHeight, destinationX, destinationY, copyWidth, copyHeight);

  state.autoFitCanvas = canvas;
  resetSourceInteractionsForSizeChange();
  applyWorkingSourceDimensions();
  showToast(`Auto-fitted to ${targetWidth}\u00D7${targetHeight} without resampling.`);
}

function restoreUploadedImageSize() {
  if (!state.autoFitCanvas || !state.image) return;
  state.autoFitCanvas = null;
  resetSourceInteractionsForSizeChange();
  applyWorkingSourceDimensions();
  showToast("Restored the uploaded image dimensions.");
}

function openFilePicker() {
  elements.fileInput.click();
}

function isSupportedImage(file) {
  const supportedTypes = new Set(["image/png", "image/jpeg"]);
  const supportedExtension = /\.(png|jpe?g)$/i.test(file.name);
  return supportedTypes.has(file.type) || (!file.type && supportedExtension);
}

function loadImageFile(file) {
  if (!file || !isSupportedImage(file)) {
    showToast("Please choose a PNG or JPG image.", true);
    return;
  }

  const nextObjectUrl = URL.createObjectURL(file);
  const nextImage = new Image();

  nextImage.onload = () => {
    if (state.objectUrl) URL.revokeObjectURL(state.objectUrl);

    state.file = file;
    state.image = nextImage;
    state.autoFitCanvas = null;
    state.hasTransparentPixels = null;
    state.objectUrl = nextObjectUrl;
    state.fitToViewport = false;
    state.zoom = 1;
    resetQualityState({ render: false });

    const { naturalWidth: width, naturalHeight: height } = nextImage;
    elements.mapCanvas.width = width;
    elements.mapCanvas.height = height;
    resetCaptureMask();
    clearSourceSelection();
    setSelectionEnabled(false);
    setCaptureEnabled(false);
    resetCapturePosition();
    elements.selectionToggleButton.disabled = false;
    elements.captureToggleButton.disabled = false;
    elements.emptyState.hidden = true;
    elements.canvasStage.hidden = false;
    elements.fileType.hidden = false;
    elements.fileType.textContent =
      file.type === "image/png" || /\.png$/i.test(file.name) ? "PNG" : "JPG";
    elements.viewerTitle.textContent = file.name;
    elements.footerHint.textContent =
      "Hover for coordinates \u00B7 hold Space or middle-drag to pan";

    [
      elements.exportGridButton,
      elements.exportOriginalButton,
      elements.fitButton,
      elements.analyzeTilesButton,
      ...elements.zoomPresetButtons,
    ].forEach((button) => {
      button.disabled = false;
    });

    updateImageDetails(width, height);
    applyZoom();
    renderPreview();
    elements.canvasViewport.scrollTo({ top: 0, left: 0 });
    showToast(`${file.name} loaded at ${width}\u00D7${height} px.`);

    // Reset so selecting the same file again will still fire a change event.
    elements.fileInput.value = "";
  };

  nextImage.onerror = () => {
    URL.revokeObjectURL(nextObjectUrl);
    showToast("That image could not be decoded by the browser.", true);
  };

  nextImage.src = nextObjectUrl;
}

function calculateFitZoom() {
  if (!state.image) return 1;

  const stageMargin = 48;
  const availableWidth = Math.max(1, elements.canvasViewport.clientWidth - stageMargin);
  const availableHeight = Math.max(1, elements.canvasViewport.clientHeight - stageMargin);

  const { width, height } = getSourceDimensions();
  // Never enlarge a small source image: Fit only scales large images down.
  return Math.min(
    1,
    availableWidth / width,
    availableHeight / height,
  );
}

function applyZoom() {
  if (!state.image) return;

  if (state.fitToViewport) state.zoom = calculateFitZoom();
  const { width, height } = getSourceDimensions();
  const cssWidth = Math.max(1, Math.round(width * state.zoom));
  const cssHeight = Math.max(1, Math.round(height * state.zoom));
  elements.mapCanvas.style.width = `${cssWidth}px`;
  elements.mapCanvas.style.height = `${cssHeight}px`;
  elements.zoomValue.textContent = `${Math.round(state.zoom * 100)}%`;
  elements.fitButton.classList.toggle("is-active", state.fitToViewport);
  elements.zoomPresetButtons.forEach((button) => {
    const buttonZoom = Number(button.dataset.zoom);
    button.classList.toggle("is-active", !state.fitToViewport && buttonZoom === state.zoom);
  });
}

function setPreviewZoom(zoom) {
  state.fitToViewport = false;
  state.zoom = zoom;
  applyZoom();
}

function fitImage() {
  state.fitToViewport = true;
  applyZoom();
}

/**
 * Pointer positions arrive in CSS pixels. Multiplying by the ratio of canvas
 * backing pixels to displayed pixels keeps coordinates correct while fitted.
 * Dividing by the grid size and flooring gives a zero-based tile coordinate.
 */
function showCoordinates(event) {
  if (!state.image) return;
  if (captureState.enabled || panState.active || panState.spaceHeld) {
    elements.coordinateTooltip.hidden = true;
    const showBrush = captureState.enabled && isMaskCaptureMode() && ["erase", "restore"].includes(captureState.tool);
    if (showBrush) {
      captureState.hoverPoint = getCanvasPixelCoordinates(elements.mapCanvas, event);
      renderPreview();
    } else if (captureState.hoverPoint) {
      captureState.hoverPoint = null;
      renderPreview();
    }
    return;
  }

  const rect = elements.mapCanvas.getBoundingClientRect();
  const pixel = getCanvasPixelCoordinates(elements.mapCanvas, event);
  const pixelX = pixel.x;
  const pixelY = pixel.y;
  const pointerX = event.offsetX;
  const pointerY = event.offsetY;
  const { size } = getGridSettings();

  elements.tileCoordinates.textContent =
    `X:${Math.floor(pixelX / size)} Y:${Math.floor(pixelY / size)}`;
  elements.pixelCoordinates.textContent = `PX:${pixelX} PY:${pixelY}`;
  elements.pixelCoordinates.hidden = !elements.showPixelCoordinates.checked;
  elements.coordinateTooltip.hidden = false;

  // Keep the label inside the displayed image when the pointer nears an edge.
  const tooltipWidth = elements.coordinateTooltip.offsetWidth;
  const tooltipHeight = elements.coordinateTooltip.offsetHeight;
  const left = Math.min(rect.width - tooltipWidth - 6, Math.max(6, pointerX + 14));
  const top = Math.min(rect.height - tooltipHeight - 6, Math.max(6, pointerY + 14));
  elements.coordinateTooltip.style.left = `${Math.max(0, left)}px`;
  elements.coordinateTooltip.style.top = `${Math.max(0, top)}px`;
}

function hideCoordinates() {
  elements.coordinateTooltip.hidden = true;
  captureState.hoverPoint = null;
}

function handleSourcePointerLeave() {
  const hadBrushCursor = Boolean(captureState.hoverPoint);
  hideCoordinates();
  if (hadBrushCursor) renderPreview();
}

function downloadBlobUrl(url, filename) {
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.append(link);
  link.click();
  link.remove();
}

function exportGriddedPng() {
  if (!state.image) return;

  const exportCanvas = document.createElement("canvas");
  const { width, height } = getSourceDimensions();
  exportCanvas.width = width;
  exportCanvas.height = height;
  const exportContext = exportCanvas.getContext("2d");
  exportContext.drawImage(getActiveSource(), 0, 0);

  // The explicit grid export always contains the grid, even when its preview is
  // hidden. It uses the current size, color, opacity, and thickness settings.
  drawGrid(exportContext, exportCanvas.width, exportCanvas.height, getGridSettings());

  exportCanvas.toBlob((blob) => {
    if (!blob) {
      showToast("The gridded PNG could not be created.", true);
      return;
    }

    const temporaryUrl = URL.createObjectURL(blob);
    const baseName = state.file.name.replace(/\.[^.]+$/, "") || "map";
    const filename = `${baseName}-grid-${getGridSettings().size}px.png`;
    downloadBlobUrl(temporaryUrl, filename);
    window.setTimeout(() => URL.revokeObjectURL(temporaryUrl), 1000);
    showToast(`Downloaded ${filename}.`);
  }, "image/png");
}

function exportOriginal() {
  if (!state.file || !state.objectUrl) return;

  // This is the original File object's URL, so there is no Canvas re-encoding.
  downloadBlobUrl(state.objectUrl, state.file.name);
  showToast(`Downloaded the unchanged original: ${state.file.name}.`);
}

function showToast(message, isError = false) {
  window.clearTimeout(state.toastTimer);
  elements.toast.textContent = message;
  elements.toast.classList.toggle("is-error", isError);
  elements.toast.hidden = false;
  state.toastTimer = window.setTimeout(() => {
    elements.toast.hidden = true;
  }, 2800);
}

function applyGridSizeFromInput({ commit = false } = {}) {
  const size = clampInteger(elements.gridSize.value, 1, 1024, MZ_TILE_SIZE);
  if (commit) elements.gridSize.value = size;
  renderPreview();
}

function applyMzPreset() {
  elements.gridSize.value = MZ_TILE_SIZE;
  elements.gridToggle.checked = true;
  renderPreview();
  showToast("RPG Maker MZ 48px grid applied.");
}

function updateOpacity() {
  elements.opacityValue.textContent = `${elements.gridOpacity.value}%`;
  renderPreview();
}

function updateThickness() {
  elements.thicknessValue.textContent = `${elements.lineThickness.value} px`;
  renderPreview();
}

function updateColor() {
  elements.colorValue.textContent = elements.gridColor.value.toUpperCase();
  renderPreview();
}

function showDragOverlay() {
  state.dragDepth += 1;
  elements.dragOverlay.hidden = false;
  elements.dropZone.classList.add("is-dragging");
}

function hideDragOverlay() {
  state.dragDepth = Math.max(0, state.dragDepth - 1);
  if (state.dragDepth === 0) resetDragOverlay();
}

function resetDragOverlay() {
  state.dragDepth = 0;
  elements.dragOverlay.hidden = true;
  elements.dropZone.classList.remove("is-dragging");
}

// Source selection and the hover tooltip share this CSS-to-backing-pixel
// conversion. The canvas backing size never changes with zoom, so the result
// is always an original-image coordinate.
function getCanvasPixelCoordinates(canvas, event) {
  const rect = canvas.getBoundingClientRect();
  return {
    x: Math.min(canvas.width - 1, Math.max(0, Math.floor(event.offsetX * canvas.width / rect.width))),
    y: Math.min(canvas.height - 1, Math.max(0, Math.floor(event.offsetY * canvas.height / rect.height))),
  };
}

function safelyCapturePointer(canvas, pointerId) {
  try {
    canvas.setPointerCapture(pointerId);
  } catch {
    // Some assistive or synthetic pointer sources do not register an active pointer.
  }
}

function safelyReleasePointer(canvas, pointerId) {
  try {
    if (canvas.hasPointerCapture(pointerId)) canvas.releasePointerCapture(pointerId);
  } catch {
    // The interaction is already complete when the pointer was released externally.
  }
}

function getCaptureOutputSize() {
  return {
    width: captureState.columns * MZ_TILE_SIZE,
    height: captureState.rows * MZ_TILE_SIZE,
  };
}

function isMaskCaptureMode() {
  return ["smart", "rectangle", "lasso"].includes(captureState.mode);
}

function hasCapturedObject() {
  return captureState.mode === "frame" || Boolean(captureState.maskCanvas && captureState.selectionBounds);
}

function getMinimumCaptureScale() {
  if (!state.image) return .1;
  if (isMaskCaptureMode()) return .01;
  const output = getCaptureOutputSize();
  const { width, height } = getSourceDimensions();
  return Math.max(.1, output.width / width, output.height / height);
}

function clampCapturePosition() {
  if (!state.image || isMaskCaptureMode()) return;
  const output = getCaptureOutputSize();
  const sourceWidth = output.width / captureState.scale;
  const sourceHeight = output.height / captureState.scale;
  const halfWidth = sourceWidth / 2;
  const halfHeight = sourceHeight / 2;
  const dimensions = getSourceDimensions();
  captureState.centerX = Math.min(dimensions.width - halfWidth, Math.max(halfWidth, captureState.centerX));
  captureState.centerY = Math.min(dimensions.height - halfHeight, Math.max(halfHeight, captureState.centerY));
}

function getCaptureRect() {
  const output = getCaptureOutputSize();
  const width = output.width / captureState.scale;
  const height = output.height / captureState.scale;
  return {
    x: captureState.centerX - width / 2,
    y: captureState.centerY - height / 2,
    width,
    height,
  };
}

function setCaptureScale(nextScale, anchor = null) {
  if (!state.image) return;
  const oldRect = captureState.mode === "frame" ? getCaptureRect() : null;
  const minimum = getMinimumCaptureScale();
  const maximum = Math.max(8, minimum);
  const normalizedX = anchor && oldRect ? (anchor.x - oldRect.x) / oldRect.width : .5;
  const normalizedY = anchor && oldRect ? (anchor.y - oldRect.y) / oldRect.height : .5;
  captureState.scale = Math.min(maximum, Math.max(minimum, nextScale));

  if (anchor && oldRect) {
    const output = getCaptureOutputSize();
    const nextWidth = output.width / captureState.scale;
    const nextHeight = output.height / captureState.scale;
    captureState.centerX = anchor.x + (.5 - normalizedX) * nextWidth;
    captureState.centerY = anchor.y + (.5 - normalizedY) * nextHeight;
  }

  clampCapturePosition();
  updateCaptureUi();
  renderPreview();
}

function resetCapturePosition() {
  if (!state.image) return;
  captureState.offsetX = 0;
  captureState.offsetY = 0;
  if (isMaskCaptureMode() && captureState.selectionBounds) {
    applyCapturePlacementMode(elements.capturePlacementMode.value, { announce: false });
    return;
  }
  const { width, height } = getSourceDimensions();
  captureState.centerX = width / 2;
  captureState.centerY = height / 2;
  captureState.scale = Math.max(1, getMinimumCaptureScale());
  clampCapturePosition();
  updateCaptureUi();
  renderPreview();
}

function cloneCanvas(source) {
  if (!source) return null;
  const clone = document.createElement("canvas");
  clone.width = source.width;
  clone.height = source.height;
  clone.getContext("2d").drawImage(source, 0, 0);
  return clone;
}

function resetCaptureMask() {
  captureState.maskCanvas = null;
  captureState.baseMaskCanvas = null;
  captureState.maskHistory = [];
  captureState.selectionBounds = null;
  captureState.previewBounds = null;
  captureState.drawStart = null;
  captureState.drawPoints = [];
  captureState.brushLastPoint = null;
  captureState.hoverPoint = null;
  captureState.offsetX = 0;
  captureState.offsetY = 0;
  if (elements.maskEdgeExpand) elements.maskEdgeExpand.value = "0";
  if (elements.maskFeather) elements.maskFeather.value = "0";
}

function clearCaptureObjectSelection() {
  if (!captureState.maskCanvas && !captureState.selectionBounds) return;
  resetCaptureMask();
  captureState.tool = "draw";
  captureState.scale = 1;
  updateCaptureUi();
  renderPreview();
  showToast("Object selection cleared. Click an object or draw a new selection.");
}

function setCaptureMode(mode) {
  if (!["frame", "smart", "rectangle", "lasso"].includes(mode) || captureState.mode === mode) return;
  captureState.mode = mode;
  captureState.tool = "draw";
  captureState.dragging = false;
  captureState.pointerId = null;
  resetCaptureMask();
  if (mode === "frame") resetCapturePosition();
  else {
    captureState.scale = 1;
    updateCaptureUi();
    renderPreview();
  }
}

function setMaskTool(tool) {
  if (!["draw", "erase", "restore", "background"].includes(tool)) return;
  if (tool !== "draw" && !captureState.maskCanvas) return;
  captureState.tool = tool;
  captureState.hoverPoint = null;
  updateCaptureUi();
  renderPreview();
}

function pushMaskHistory() {
  if (!captureState.maskCanvas) return;
  captureState.maskHistory.push({
    maskCanvas: cloneCanvas(captureState.maskCanvas),
    baseMaskCanvas: cloneCanvas(captureState.baseMaskCanvas),
    selectionBounds: captureState.selectionBounds ? { ...captureState.selectionBounds } : null,
    scale: captureState.scale,
    offsetX: captureState.offsetX,
    offsetY: captureState.offsetY,
    placementMode: elements.capturePlacementMode.value,
  });
  if (captureState.maskHistory.length > 8) captureState.maskHistory.shift();
}

function undoMaskEdit() {
  const previous = captureState.maskHistory.pop();
  if (!previous) return;
  captureState.maskCanvas = previous.maskCanvas;
  captureState.baseMaskCanvas = previous.baseMaskCanvas;
  captureState.selectionBounds = previous.selectionBounds;
  captureState.scale = previous.scale;
  captureState.offsetX = previous.offsetX;
  captureState.offsetY = previous.offsetY;
  elements.capturePlacementMode.value = previous.placementMode;
  updateCaptureUi();
  renderPreview();
}

function resetMaskEdits() {
  if (!captureState.baseMaskCanvas) return;
  pushMaskHistory();
  captureState.maskCanvas = cloneCanvas(captureState.baseMaskCanvas);
  updateCaptureUi();
  renderPreview();
  showToast("Mask restored to the original selection.");
}

function normalizePixelBounds(start, end) {
  const dimensions = getSourceDimensions();
  const left = Math.max(0, Math.min(start.x, end.x));
  const top = Math.max(0, Math.min(start.y, end.y));
  const right = Math.min(dimensions.width, Math.max(start.x, end.x) + 1);
  const bottom = Math.min(dimensions.height, Math.max(start.y, end.y) + 1);
  return { x: left, y: top, width: Math.max(1, right - left), height: Math.max(1, bottom - top) };
}

function getPointBounds(points) {
  const xs = points.map((point) => point.x);
  const ys = points.map((point) => point.y);
  return normalizePixelBounds(
    { x: Math.min(...xs), y: Math.min(...ys) },
    { x: Math.max(...xs), y: Math.max(...ys) },
  );
}

function getMaskContentBounds(maskCanvas) {
  if (!maskCanvas) return null;
  const context = maskCanvas.getContext("2d", { willReadFrequently: true });
  const pixels = context.getImageData(0, 0, maskCanvas.width, maskCanvas.height).data;
  let left = maskCanvas.width;
  let top = maskCanvas.height;
  let right = -1;
  let bottom = -1;
  for (let y = 0; y < maskCanvas.height; y += 1) {
    for (let x = 0; x < maskCanvas.width; x += 1) {
      if (pixels[(y * maskCanvas.width + x) * 4 + 3] === 0) continue;
      left = Math.min(left, x);
      top = Math.min(top, y);
      right = Math.max(right, x);
      bottom = Math.max(bottom, y);
    }
  }
  return right < left ? null : { x: left, y: top, width: right - left + 1, height: bottom - top + 1 };
}

function sourceHasTransparentPixels() {
  if (!state.image) return false;
  if (state.hasTransparentPixels !== null) return state.hasTransparentPixels;
  const canvas = document.createElement("canvas");
  canvas.width = state.image.naturalWidth;
  canvas.height = state.image.naturalHeight;
  const context = canvas.getContext("2d", { willReadFrequently: true });
  context.drawImage(state.image, 0, 0);
  const pixels = context.getImageData(0, 0, canvas.width, canvas.height).data;
  let transparentPixels = 0;
  const requiredPixels = Math.max(16, Math.ceil(canvas.width * canvas.height * .001));
  for (let index = 3; index < pixels.length; index += 4) {
    if (pixels[index] < 16) {
      transparentPixels += 1;
      if (transparentPixels >= requiredPixels) break;
    }
  }
  state.hasTransparentPixels = transparentPixels >= requiredPixels;
  return state.hasTransparentPixels;
}

function findNearbyVisiblePixel(pixels, width, height, seed, radius = 6) {
  const startX = Math.max(0, Math.min(width - 1, Math.floor(seed.x)));
  const startY = Math.max(0, Math.min(height - 1, Math.floor(seed.y)));
  let best = null;
  let bestDistance = Infinity;
  for (let y = Math.max(0, startY - radius); y <= Math.min(height - 1, startY + radius); y += 1) {
    for (let x = Math.max(0, startX - radius); x <= Math.min(width - 1, startX + radius); x += 1) {
      if (pixels[(y * width + x) * 4 + 3] < 16) continue;
      const distance = (x - startX) ** 2 + (y - startY) ** 2;
      if (distance < bestDistance) {
        best = { x, y };
        bestDistance = distance;
      }
    }
  }
  return best;
}

function smartSelectObject(seed, { add = false, subtract = false } = {}) {
  if (!sourceHasTransparentPixels()) {
    showToast("Smart Select needs a transparent background. Use Rectangle or Lasso for this image.", true);
    return;
  }
  if (subtract && !captureState.maskCanvas) {
    showToast("Select an object before removing a piece from it.", true);
    return;
  }

  const source = getActiveSource();
  const dimensions = getSourceDimensions();
  const sourceCanvas = document.createElement("canvas");
  sourceCanvas.width = dimensions.width;
  sourceCanvas.height = dimensions.height;
  const sourceContext = sourceCanvas.getContext("2d", { willReadFrequently: true });
  sourceContext.drawImage(source, 0, 0, dimensions.width, dimensions.height);
  const sourcePixels = sourceContext.getImageData(0, 0, dimensions.width, dimensions.height).data;
  const visibleSeed = findNearbyVisiblePixel(sourcePixels, dimensions.width, dimensions.height, seed);
  if (!visibleSeed) {
    showToast("No object found here. Click closer to a visible part of the artwork.", true);
    return;
  }

  const total = dimensions.width * dimensions.height;
  const visited = new Uint8Array(total);
  const queue = new Int32Array(total);
  let head = 0;
  let tail = 0;
  const seedIndex = visibleSeed.y * dimensions.width + visibleSeed.x;
  queue[tail++] = seedIndex;
  visited[seedIndex] = 1;
  while (head < tail) {
    const pixelIndex = queue[head++];
    const x = pixelIndex % dimensions.width;
    const y = Math.floor(pixelIndex / dimensions.width);
    for (let offsetY = -1; offsetY <= 1; offsetY += 1) {
      for (let offsetX = -1; offsetX <= 1; offsetX += 1) {
        if (!offsetX && !offsetY) continue;
        const nextX = x + offsetX;
        const nextY = y + offsetY;
        if (nextX < 0 || nextX >= dimensions.width || nextY < 0 || nextY >= dimensions.height) continue;
        const nextIndex = nextY * dimensions.width + nextX;
        if (visited[nextIndex] || sourcePixels[nextIndex * 4 + 3] < 16) continue;
        visited[nextIndex] = 1;
        queue[tail++] = nextIndex;
      }
    }
  }

  if (captureState.maskCanvas) pushMaskHistory();
  const mask = (add || subtract) && captureState.maskCanvas
    ? cloneCanvas(captureState.maskCanvas)
    : document.createElement("canvas");
  if (!mask.width) {
    mask.width = dimensions.width;
    mask.height = dimensions.height;
  }
  const maskContext = mask.getContext("2d", { willReadFrequently: true });
  const maskPixels = maskContext.getImageData(0, 0, dimensions.width, dimensions.height);
  for (let index = 0; index < tail; index += 1) {
    const dataIndex = queue[index] * 4;
    const value = subtract ? 0 : 255;
    maskPixels.data[dataIndex] = value;
    maskPixels.data[dataIndex + 1] = value;
    maskPixels.data[dataIndex + 2] = value;
    maskPixels.data[dataIndex + 3] = value;
  }
  maskContext.putImageData(maskPixels, 0, 0);
  const bounds = getMaskContentBounds(mask);
  captureState.previewBounds = null;
  captureState.drawStart = null;
  captureState.drawPoints = [];
  captureState.offsetX = 0;
  captureState.offsetY = 0;
  captureState.tool = "draw";
  if (!bounds) {
    captureState.maskCanvas = null;
    captureState.baseMaskCanvas = null;
    captureState.selectionBounds = null;
    updateCaptureUi();
    renderPreview();
    showToast("The selected piece was removed. Undo Mask restores it.");
    return;
  }

  captureState.maskCanvas = mask;
  captureState.baseMaskCanvas = cloneCanvas(mask);
  captureState.selectionBounds = bounds;
  elements.capturePlacementMode.value = "fit";
  applyCapturePlacementMode("fit", { announce: false });
  const action = subtract ? "removed" : add ? "added" : "selected";
  showToast(`Object ${action}. Shift-click adds another piece; Alt-click removes one.`);
}

function finalizeMaskSelection() {
  const dimensions = getSourceDimensions();
  const mask = document.createElement("canvas");
  mask.width = dimensions.width;
  mask.height = dimensions.height;
  const context = mask.getContext("2d");
  context.fillStyle = "#fff";

  if (captureState.mode === "rectangle") {
    const bounds = captureState.previewBounds;
    if (!bounds || bounds.width < 2 || bounds.height < 2) return false;
    context.fillRect(bounds.x, bounds.y, bounds.width, bounds.height);
    captureState.selectionBounds = { ...bounds };
  } else {
    if (captureState.drawPoints.length < 3) return false;
    context.beginPath();
    context.moveTo(captureState.drawPoints[0].x, captureState.drawPoints[0].y);
    captureState.drawPoints.slice(1).forEach((point) => context.lineTo(point.x, point.y));
    context.closePath();
    context.fill();
    captureState.selectionBounds = getPointBounds(captureState.drawPoints);
  }

  captureState.maskCanvas = mask;
  captureState.baseMaskCanvas = cloneCanvas(mask);
  captureState.maskHistory = [];
  captureState.previewBounds = null;
  captureState.drawStart = null;
  captureState.drawPoints = [];
  captureState.offsetX = 0;
  captureState.offsetY = 0;
  elements.capturePlacementMode.value = "fit";
  applyCapturePlacementMode("fit", { announce: false });
  setMaskTool("erase");
  showToast("Object selected. Clean the mask if needed, then fit and place it.");
  return true;
}

function drawMaskBrush(point) {
  if (!captureState.maskCanvas || !["erase", "restore"].includes(captureState.tool)) return;
  const context = captureState.maskCanvas.getContext("2d");
  const size = Number(elements.maskBrushSize.value);
  context.save();
  context.globalCompositeOperation = captureState.tool === "erase" ? "destination-out" : "source-over";
  context.strokeStyle = "#fff";
  context.fillStyle = "#fff";
  context.lineWidth = size;
  context.lineCap = "round";
  context.lineJoin = "round";
  if (captureState.brushLastPoint) {
    context.beginPath();
    context.moveTo(captureState.brushLastPoint.x, captureState.brushLastPoint.y);
    context.lineTo(point.x, point.y);
    context.stroke();
  } else {
    context.beginPath();
    context.arc(point.x, point.y, size / 2, 0, Math.PI * 2);
    context.fill();
  }
  context.restore();
  captureState.brushLastPoint = point;
}

function removeConnectedBackground(seed) {
  if (!captureState.maskCanvas || !captureState.selectionBounds) return;
  const bounds = captureState.selectionBounds;
  if (seed.x < bounds.x || seed.x >= bounds.x + bounds.width || seed.y < bounds.y || seed.y >= bounds.y + bounds.height) {
    showToast("Click inside the selected object area.", true);
    return;
  }
  const sourceCanvas = document.createElement("canvas");
  sourceCanvas.width = bounds.width;
  sourceCanvas.height = bounds.height;
  const sourceContext = sourceCanvas.getContext("2d", { willReadFrequently: true });
  sourceContext.drawImage(getActiveSource(), bounds.x, bounds.y, bounds.width, bounds.height, 0, 0, bounds.width, bounds.height);
  const source = sourceContext.getImageData(0, 0, bounds.width, bounds.height);
  const maskContext = captureState.maskCanvas.getContext("2d", { willReadFrequently: true });
  const mask = maskContext.getImageData(bounds.x, bounds.y, bounds.width, bounds.height);
  const localX = seed.x - bounds.x;
  const localY = seed.y - bounds.y;
  const seedIndex = (localY * bounds.width + localX) * 4;
  if (mask.data[seedIndex + 3] === 0) {
    showToast("That point is already transparent.", true);
    return;
  }

  pushMaskHistory();
  const reference = [source.data[seedIndex], source.data[seedIndex + 1], source.data[seedIndex + 2]];
  const tolerance = Number(elements.maskTolerance.value);
  const threshold = tolerance * tolerance * 3;
  const total = bounds.width * bounds.height;
  const visited = new Uint8Array(total);
  const queue = new Int32Array(total);
  let head = 0;
  let tail = 0;
  const seedPixel = localY * bounds.width + localX;
  queue[tail++] = seedPixel;
  visited[seedPixel] = 1;
  let removed = 0;

  while (head < tail) {
    const pixelIndex = queue[head++];
    const dataIndex = pixelIndex * 4;
    if (mask.data[dataIndex + 3] === 0) continue;
    const red = source.data[dataIndex] - reference[0];
    const green = source.data[dataIndex + 1] - reference[1];
    const blue = source.data[dataIndex + 2] - reference[2];
    if (red * red + green * green + blue * blue > threshold) continue;
    mask.data[dataIndex + 3] = 0;
    removed += 1;
    const x = pixelIndex % bounds.width;
    const y = Math.floor(pixelIndex / bounds.width);
    const neighbors = [];
    if (x > 0) neighbors.push(pixelIndex - 1);
    if (x + 1 < bounds.width) neighbors.push(pixelIndex + 1);
    if (y > 0) neighbors.push(pixelIndex - bounds.width);
    if (y + 1 < bounds.height) neighbors.push(pixelIndex + bounds.width);
    neighbors.forEach((neighbor) => {
      if (!visited[neighbor]) {
        visited[neighbor] = 1;
        queue[tail++] = neighbor;
      }
    });
  }

  maskContext.putImageData(mask, bounds.x, bounds.y);
  updateCaptureUi();
  renderPreview();
  showToast(`Removed ${removed.toLocaleString()} connected background pixels.`);
}

function getRefinedMaskCrop() {
  if (!captureState.maskCanvas || !captureState.selectionBounds) return null;
  const bounds = captureState.selectionBounds;
  const crop = document.createElement("canvas");
  crop.width = bounds.width;
  crop.height = bounds.height;
  const context = crop.getContext("2d", { willReadFrequently: true });
  context.drawImage(captureState.maskCanvas, bounds.x, bounds.y, bounds.width, bounds.height, 0, 0, bounds.width, bounds.height);
  const expand = Number(elements.maskEdgeExpand.value);
  if (expand) {
    const image = context.getImageData(0, 0, crop.width, crop.height);
    const original = new Uint8ClampedArray(image.data);
    const radius = Math.abs(expand);
    for (let y = 0; y < crop.height; y += 1) {
      for (let x = 0; x < crop.width; x += 1) {
        let alpha = expand > 0 ? 0 : 255;
        for (let dy = -radius; dy <= radius; dy += 1) {
          for (let dx = -radius; dx <= radius; dx += 1) {
            const sampleX = Math.min(crop.width - 1, Math.max(0, x + dx));
            const sampleY = Math.min(crop.height - 1, Math.max(0, y + dy));
            const sampleAlpha = original[(sampleY * crop.width + sampleX) * 4 + 3];
            alpha = expand > 0 ? Math.max(alpha, sampleAlpha) : Math.min(alpha, sampleAlpha);
          }
        }
        const index = (y * crop.width + x) * 4;
        image.data[index] = 255;
        image.data[index + 1] = 255;
        image.data[index + 2] = 255;
        image.data[index + 3] = alpha;
      }
    }
    context.putImageData(image, 0, 0);
  }
  const feather = Number(elements.maskFeather.value);
  if (!feather) return crop;
  const softened = document.createElement("canvas");
  softened.width = crop.width;
  softened.height = crop.height;
  const softenedContext = softened.getContext("2d");
  softenedContext.filter = `blur(${feather}px)`;
  softenedContext.drawImage(crop, 0, 0);
  return softened;
}

function createMaskedObjectCanvas() {
  if (!captureState.selectionBounds || !captureState.maskCanvas) return null;
  const bounds = captureState.selectionBounds;
  const canvas = document.createElement("canvas");
  canvas.width = bounds.width;
  canvas.height = bounds.height;
  const context = canvas.getContext("2d");
  context.drawImage(getActiveSource(), bounds.x, bounds.y, bounds.width, bounds.height, 0, 0, bounds.width, bounds.height);
  context.globalCompositeOperation = "destination-in";
  context.drawImage(getRefinedMaskCrop(), 0, 0);
  context.globalCompositeOperation = "source-over";
  return canvas;
}

function applyCapturePlacementMode(mode, { announce = true } = {}) {
  if (!captureState.selectionBounds) return;
  const output = getCaptureOutputSize();
  const bounds = captureState.selectionBounds;
  const insetWidth = Math.max(1, output.width - 4);
  const insetHeight = Math.max(1, output.height - 4);
  if (mode === "original") captureState.scale = 1;
  else if (mode === "fill") captureState.scale = Math.max(insetWidth / bounds.width, insetHeight / bounds.height);
  else if (mode === "stretch") captureState.scale = 1;
  else captureState.scale = Math.min(insetWidth / bounds.width, insetHeight / bounds.height);
  captureState.offsetX = 0;
  captureState.offsetY = 0;
  updateCaptureUi();
  renderPreview();
  if (announce) showToast(mode === "fit" ? "Object fitted to the selected tile area." : "Object placement updated.");
}

function autoFitObjectToTiles() {
  if (!captureState.selectionBounds) return;
  elements.capturePlacementMode.value = "fit";
  applyCapturePlacementMode("fit");
}

function updateCaptureDimensions() {
  captureState.columns = clampInteger(elements.captureColumns.value, 1, 16, 1);
  captureState.rows = clampInteger(elements.captureRows.value, 1, 16, 1);
  elements.captureColumns.value = captureState.columns;
  elements.captureRows.value = captureState.rows;
  if (isMaskCaptureMode() && captureState.selectionBounds) {
    applyCapturePlacementMode(elements.capturePlacementMode.value, { announce: false });
    return;
  }
  const minimum = getMinimumCaptureScale();
  if (captureState.scale < minimum) captureState.scale = minimum;
  clampCapturePosition();
  updateCaptureUi();
  renderPreview();
}

function previewCaptureDimensions() {
  const columns = Number.parseInt(elements.captureColumns.value, 10);
  const rows = Number.parseInt(elements.captureRows.value, 10);
  if (!Number.isInteger(columns) || !Number.isInteger(rows) || columns < 1 || columns > 16 || rows < 1 || rows > 16) {
    return;
  }
  captureState.columns = columns;
  captureState.rows = rows;
  if (isMaskCaptureMode() && captureState.selectionBounds) {
    applyCapturePlacementMode(elements.capturePlacementMode.value, { announce: false });
    return;
  }
  const minimum = getMinimumCaptureScale();
  if (captureState.scale < minimum) captureState.scale = minimum;
  clampCapturePosition();
  updateCaptureUi();
  renderPreview();
}

function drawCaptureOverlay(context) {
  if (!captureState.enabled || !state.image) return;
  const { width, height } = getSourceDimensions();
  if (isMaskCaptureMode()) {
    context.save();
    if (captureState.maskCanvas) {
      context.globalAlpha = .25;
      context.drawImage(captureState.maskCanvas, 0, 0);
      context.globalAlpha = 1;
      const bounds = captureState.selectionBounds;
      context.strokeStyle = "#57d4ff";
      context.lineWidth = 2;
      context.setLineDash([8, 5]);
      context.strokeRect(bounds.x + 1, bounds.y + 1, bounds.width - 2, bounds.height - 2);
    }
    if (captureState.mode === "rectangle" && captureState.previewBounds) {
      const bounds = captureState.previewBounds;
      context.fillStyle = "rgba(87, 212, 255, .18)";
      context.fillRect(bounds.x, bounds.y, bounds.width, bounds.height);
      context.strokeStyle = "#57d4ff";
      context.lineWidth = 2;
      context.strokeRect(bounds.x, bounds.y, bounds.width, bounds.height);
    }
    if (captureState.mode === "lasso" && captureState.drawPoints.length) {
      context.beginPath();
      context.moveTo(captureState.drawPoints[0].x, captureState.drawPoints[0].y);
      captureState.drawPoints.slice(1).forEach((point) => context.lineTo(point.x, point.y));
      context.strokeStyle = "#57d4ff";
      context.lineWidth = 2;
      context.stroke();
    }
    if (captureState.hoverPoint && ["erase", "restore"].includes(captureState.tool)) {
      const radius = Number(elements.maskBrushSize.value) / 2;
      context.beginPath();
      context.arc(captureState.hoverPoint.x, captureState.hoverPoint.y, radius, 0, Math.PI * 2);
      context.fillStyle = captureState.tool === "erase" ? "rgba(255, 73, 106, .16)" : "rgba(81, 216, 154, .16)";
      context.fill();
      context.strokeStyle = "rgba(5, 8, 12, .92)";
      context.lineWidth = 4;
      context.stroke();
      context.strokeStyle = captureState.tool === "erase" ? "#ff91a4" : "#75e5b0";
      context.lineWidth = 2;
      context.stroke();
    }
    context.restore();
    return;
  }
  const rect = getCaptureRect();

  context.save();
  context.fillStyle = "rgba(2, 5, 10, .58)";
  context.fillRect(0, 0, width, Math.max(0, rect.y));
  context.fillRect(0, rect.y + rect.height, width, Math.max(0, height - rect.y - rect.height));
  context.fillRect(0, rect.y, Math.max(0, rect.x), rect.height);
  context.fillRect(rect.x + rect.width, rect.y, Math.max(0, width - rect.x - rect.width), rect.height);

  context.strokeStyle = "#57d4ff";
  context.lineWidth = Math.max(2, Math.min(rect.width, rect.height) / 60);
  context.strokeRect(rect.x, rect.y, rect.width, rect.height);
  context.beginPath();
  context.lineWidth = 1;
  context.globalAlpha = .88;
  for (let column = 1; column < captureState.columns; column += 1) {
    const x = rect.x + rect.width * column / captureState.columns;
    context.moveTo(x, rect.y);
    context.lineTo(x, rect.y + rect.height);
  }
  for (let row = 1; row < captureState.rows; row += 1) {
    const y = rect.y + rect.height * row / captureState.rows;
    context.moveTo(rect.x, y);
    context.lineTo(rect.x + rect.width, y);
  }
  context.stroke();

  const label = captureState.columns + "\u00D7" + captureState.rows + " tiles \u00B7 " + Math.round(captureState.scale * 100) + "%";
  context.globalAlpha = 1;
  context.font = "bold 13px sans-serif";
  const labelWidth = context.measureText(label).width + 14;
  const labelX = Math.min(width - labelWidth, Math.max(0, rect.x));
  const labelY = rect.y >= 27 ? rect.y - 25 : Math.min(height - 23, rect.y + 4);
  context.fillStyle = "rgba(7, 16, 25, .9)";
  context.fillRect(labelX, labelY, labelWidth, 21);
  context.fillStyle = "#dff8ff";
  context.textBaseline = "middle";
  context.fillText(label, labelX + 7, labelY + 11);
  context.restore();
}

function drawHighQualityRegion(context, image, sourceRect, outputWidth, outputHeight) {
  const sourceWidth = Math.max(1, Math.round(sourceRect.width));
  const sourceHeight = Math.max(1, Math.round(sourceRect.height));
  let working = document.createElement("canvas");
  working.width = sourceWidth;
  working.height = sourceHeight;
  let workingContext = working.getContext("2d");
  workingContext.imageSmoothingEnabled = true;
  workingContext.imageSmoothingQuality = "high";
  workingContext.drawImage(
    image,
    sourceRect.x, sourceRect.y, sourceRect.width, sourceRect.height,
    0, 0, sourceWidth, sourceHeight,
  );

  while (working.width / 2 > outputWidth && working.height / 2 > outputHeight) {
    const next = document.createElement("canvas");
    next.width = Math.max(outputWidth, Math.round(working.width / 2));
    next.height = Math.max(outputHeight, Math.round(working.height / 2));
    const nextContext = next.getContext("2d");
    nextContext.imageSmoothingEnabled = true;
    nextContext.imageSmoothingQuality = "high";
    nextContext.drawImage(working, 0, 0, next.width, next.height);
    working = next;
    workingContext = nextContext;
  }

  context.imageSmoothingEnabled = true;
  context.imageSmoothingQuality = "high";
  context.drawImage(working, 0, 0, working.width, working.height, 0, 0, outputWidth, outputHeight);
}

function drawScaledObject(context, object, x, y, width, height) {
  const targetWidth = Math.max(1, Math.round(width));
  const targetHeight = Math.max(1, Math.round(height));
  if (elements.captureResizeMethod.value === "pixel-art") {
    context.imageSmoothingEnabled = false;
    context.drawImage(object, x, y, width, height);
    return;
  }
  const resized = document.createElement("canvas");
  resized.width = targetWidth;
  resized.height = targetHeight;
  drawHighQualityRegion(
    resized.getContext("2d"),
    object,
    { x: 0, y: 0, width: object.width, height: object.height },
    targetWidth,
    targetHeight,
  );
  context.drawImage(resized, x, y, width, height);
}

function renderCapturedRegion() {
  const canvas = document.createElement("canvas");
  if (!state.image) return canvas;
  const output = getCaptureOutputSize();
  canvas.width = output.width;
  canvas.height = output.height;
  const context = canvas.getContext("2d");
  context.clearRect(0, 0, output.width, output.height);

  if (isMaskCaptureMode()) {
    const object = createMaskedObjectCanvas();
    if (!object) return canvas;
    let drawWidth = object.width * captureState.scale;
    let drawHeight = object.height * captureState.scale;
    if (elements.capturePlacementMode.value === "stretch") {
      drawWidth = output.width;
      drawHeight = output.height;
    }
    const x = (output.width - drawWidth) / 2 + captureState.offsetX;
    const y = (output.height - drawHeight) / 2 + captureState.offsetY;
    drawScaledObject(context, object, x, y, drawWidth, drawHeight);
    return canvas;
  }

  const sourceRect = getCaptureRect();

  if (elements.captureResizeMethod.value === "pixel-art") {
    context.imageSmoothingEnabled = false;
    context.drawImage(
      getActiveSource(),
      sourceRect.x, sourceRect.y, sourceRect.width, sourceRect.height,
      0, 0, output.width, output.height,
    );
  } else {
    drawHighQualityRegion(context, getActiveSource(), sourceRect, output.width, output.height);
  }

  return canvas;
}

function setCapturePreviewZoom(nextZoom) {
  captureState.previewZoom = Math.min(8, Math.max(1, nextZoom));
  renderCapturePreview();
}

function updateCapturePreviewZoomUi() {
  const percent = Math.round(captureState.previewZoom * 100);
  elements.previewZoomValue.textContent = percent + "%";
  elements.previewZoomOutButton.disabled = captureState.previewZoom <= 1;
  elements.previewZoomInButton.disabled = captureState.previewZoom >= 8;
}

function renderCapturePreview() {
  if (!state.image) return;
  const captured = renderCapturedRegion();
  const preview = elements.capturePreviewCanvas;
  preview.width = captured.width;
  preview.height = captured.height;
  const context = preview.getContext("2d");
  context.imageSmoothingEnabled = elements.captureResizeMethod.value !== "pixel-art";
  context.imageSmoothingQuality = "high";
  context.drawImage(captured, 0, 0);
  preview.style.width = Math.round(captured.width * captureState.previewZoom) + "px";
  preview.style.height = Math.round(captured.height * captureState.previewZoom) + "px";
  preview.classList.toggle("is-pixel-art", elements.captureResizeMethod.value === "pixel-art");
  updateCapturePreviewZoomUi();
}

function updateCaptureUi() {
  const output = getCaptureOutputSize();
  elements.captureOutputBadge.textContent = captureState.columns + "\u00D7" + captureState.rows;
  const minimumPercent = isMaskCaptureMode() ? 1 : Math.max(10, Math.ceil(getMinimumCaptureScale() * 100));
  const maximumPercent = Math.max(800, minimumPercent);
  elements.captureScale.min = String(minimumPercent);
  elements.captureScale.max = String(maximumPercent);
  elements.captureScale.value = String(Math.round(captureState.scale * 100));
  elements.captureScaleValue.textContent = Math.round(captureState.scale * 100) + "%";
  elements.captureScale.disabled = isMaskCaptureMode() && elements.capturePlacementMode.value === "stretch";
  const objectReady = hasCapturedObject();
  elements.capturePlaceSelectedButton.disabled =
    !captureState.enabled || !objectReady || !builderState.templateImage || builderState.destination === null;
  elements.captureAddNextButton.disabled = !captureState.enabled || !objectReady || !builderState.templateImage;
  elements.autoFitObjectButton.disabled = !isMaskCaptureMode() || !captureState.selectionBounds;
  elements.capturePlacementMode.disabled = !isMaskCaptureMode() || !captureState.selectionBounds;
  elements.captureFrameModeButton.classList.toggle("is-active", captureState.mode === "frame");
  elements.captureSmartModeButton.classList.toggle("is-active", captureState.mode === "smart");
  elements.captureRectangleModeButton.classList.toggle("is-active", captureState.mode === "rectangle");
  elements.captureLassoModeButton.classList.toggle("is-active", captureState.mode === "lasso");
  elements.maskControls.hidden = !isMaskCaptureMode();
  elements.captureModeHint.textContent = captureState.mode === "frame"
    ? "Move and resize a tile-shaped frame."
    : captureState.mode === "smart"
      ? "Click an object on a transparent background. Shift-click adds; Alt-click removes."
    : captureState.mode === "rectangle"
      ? "Drag a free rectangle around one object."
      : "Draw around an irregular object and release to close the outline.";
  const hasMask = Boolean(captureState.maskCanvas);
  [elements.maskEraseButton, elements.maskRestoreButton, elements.maskBackgroundButton].forEach((button) => {
    button.disabled = !hasMask;
  });
  elements.maskUndoButton.disabled = !captureState.maskHistory.length;
  elements.maskResetButton.disabled = !captureState.baseMaskCanvas;
  elements.maskClearSelectionButton.disabled = !hasMask;
  [
    [elements.maskRedrawButton, "draw"],
    [elements.maskEraseButton, "erase"],
    [elements.maskRestoreButton, "restore"],
    [elements.maskBackgroundButton, "background"],
  ].forEach(([button, tool]) => button.classList.toggle("is-active", captureState.tool === tool));
  elements.brushSizeControl.hidden = !["erase", "restore"].includes(captureState.tool) || !hasMask;
  elements.backgroundToleranceControl.hidden = captureState.tool !== "background" || !hasMask;
  elements.maskBrushSizeValue.textContent = elements.maskBrushSize.value + " px";
  elements.maskToleranceValue.textContent = elements.maskTolerance.value;
  const edgeExpand = Number(elements.maskEdgeExpand.value);
  elements.maskEdgeExpandValue.textContent = edgeExpand > 0
    ? "+" + edgeExpand + " px (expand)"
    : edgeExpand < 0 ? edgeExpand + " px (trim)" : "Unchanged";
  elements.maskFeatherValue.textContent = Number(elements.maskFeather.value)
    ? elements.maskFeather.value + " px"
    : "Hard edge";
  elements.mapCanvas.classList.toggle("is-mask-drawing", captureState.enabled && isMaskCaptureMode() && captureState.tool === "draw");
  elements.mapCanvas.classList.toggle("is-mask-brushing", captureState.enabled && isMaskCaptureMode() && ["erase", "restore"].includes(captureState.tool));

  if (!state.image) return;
  const scalePercent = Math.round(captureState.scale * 100);
  let quality;
  if (captureState.scale > 2) quality = "Strong enlargement; blur may be visible.";
  else if (captureState.scale > 1.25) quality = "Enlargement; inspect the preview for softness.";
  else if (captureState.scale < .35) quality = "Heavy reduction; fine details may disappear.";
  else quality = "Resize amount is within a practical range.";
  if (isMaskCaptureMode()) {
    if (!captureState.selectionBounds) {
      elements.captureQualityNotice.textContent = captureState.mode === "smart"
        ? "Click a visible object to select its connected pixels automatically."
        : "Draw around an object on the source image to create a transparent selection.";
    } else {
      const bounds = captureState.selectionBounds;
      const placement = elements.capturePlacementMode.value;
      elements.captureQualityNotice.textContent = placement === "stretch"
        ? `Source ${bounds.width}\u00D7${bounds.height} px \u2192 ${output.width}\u00D7${output.height} px. Stretch may distort the object.`
        : `Source ${bounds.width}\u00D7${bounds.height} px \u2192 ${Math.round(bounds.width * captureState.scale)}\u00D7${Math.round(bounds.height * captureState.scale)} px inside ${output.width}\u00D7${output.height} px at ${scalePercent}%. ${quality}`;
    }
  } else {
    const sourceRect = getCaptureRect();
    elements.captureQualityNotice.textContent =
      "Source " + Math.round(sourceRect.width) + "\u00D7" + Math.round(sourceRect.height) +
      " px \u2192 output " + output.width + "\u00D7" + output.height + " px at " + scalePercent + "%. " + quality;
  }
  renderCapturePreview();
  updateSelectionUi();
}

function setCaptureEnabled(enabled) {
  captureState.enabled = Boolean(enabled && state.image);
  if (captureState.enabled && selectionState.enabled) setSelectionEnabled(false);
  captureState.dragging = false;
  captureState.pointerId = null;
  elements.captureControls.hidden = !captureState.enabled;
  elements.captureToggleButton.textContent = captureState.enabled ? "Finish Object Capture" : "Start Object Capture";
  elements.captureToggleButton.classList.toggle("is-active", captureState.enabled);
  elements.mapCanvas.classList.toggle("is-capturing", captureState.enabled);
  elements.mapCanvas.classList.remove("is-capture-dragging");
  if (captureState.enabled) {
    elements.gridToggle.checked = false;
    hideCoordinates();
    if (!captureState.centerX && !captureState.centerY) resetCapturePosition();
  }
  updateCaptureUi();
  renderPreview();
}

function beginCaptureDrag(event) {
  if (isPanIntent(event)) return false;
  if (!captureState.enabled || !state.image) return false;
  const pixel = getCanvasPixelCoordinates(elements.mapCanvas, event);
  if (isMaskCaptureMode()) {
    if (captureState.mode === "smart" && captureState.tool === "draw") {
      smartSelectObject(pixel, { add: event.shiftKey, subtract: event.altKey });
      event.preventDefault();
      return true;
    }
    if (captureState.tool === "background") {
      removeConnectedBackground(pixel);
      event.preventDefault();
      return true;
    }
    captureState.dragging = true;
    captureState.pointerId = event.pointerId;
    safelyCapturePointer(elements.mapCanvas, event.pointerId);
    if (captureState.tool === "draw") {
      captureState.drawStart = pixel;
      captureState.drawPoints = [pixel];
      captureState.previewBounds = normalizePixelBounds(pixel, pixel);
    } else {
      pushMaskHistory();
      captureState.brushLastPoint = null;
      drawMaskBrush(pixel);
    }
    event.preventDefault();
    updateCaptureUi();
    renderPreview();
    return true;
  }
  const rect = getCaptureRect();
  const inside = pixel.x >= rect.x && pixel.x <= rect.x + rect.width && pixel.y >= rect.y && pixel.y <= rect.y + rect.height;
  captureState.dragOffsetX = inside ? pixel.x - captureState.centerX : 0;
  captureState.dragOffsetY = inside ? pixel.y - captureState.centerY : 0;
  captureState.centerX = pixel.x - captureState.dragOffsetX;
  captureState.centerY = pixel.y - captureState.dragOffsetY;
  captureState.dragging = true;
  captureState.pointerId = event.pointerId;
  clampCapturePosition();
  safelyCapturePointer(elements.mapCanvas, event.pointerId);
  elements.mapCanvas.classList.add("is-capture-dragging");
  event.preventDefault();
  updateCaptureUi();
  renderPreview();
  return true;
}

function moveCaptureDrag(event) {
  if (panState.active) return false;
  if (!captureState.enabled || !captureState.dragging || captureState.pointerId !== event.pointerId) return false;
  const pixel = getCanvasPixelCoordinates(elements.mapCanvas, event);
  if (isMaskCaptureMode()) {
    if (captureState.tool === "draw") {
      if (captureState.mode === "rectangle") captureState.previewBounds = normalizePixelBounds(captureState.drawStart, pixel);
      else {
        const last = captureState.drawPoints[captureState.drawPoints.length - 1];
        if (!last || Math.hypot(pixel.x - last.x, pixel.y - last.y) >= 2) captureState.drawPoints.push(pixel);
      }
    } else drawMaskBrush(pixel);
    updateCaptureUi();
    renderPreview();
    return true;
  }
  captureState.centerX = pixel.x - captureState.dragOffsetX;
  captureState.centerY = pixel.y - captureState.dragOffsetY;
  clampCapturePosition();
  updateCaptureUi();
  renderPreview();
  return true;
}

function finishCaptureDrag(event) {
  if (!captureState.dragging || captureState.pointerId !== event.pointerId) return false;
  captureState.dragging = false;
  captureState.pointerId = null;
  safelyReleasePointer(elements.mapCanvas, event.pointerId);
  if (isMaskCaptureMode()) {
    if (captureState.tool === "draw" && !finalizeMaskSelection()) {
      showToast("Draw a larger selection around the object.", true);
    }
    captureState.brushLastPoint = null;
  }
  elements.mapCanvas.classList.remove("is-capture-dragging");
  updateCaptureUi();
  renderPreview();
  return true;
}

function zoomCaptureAtPointer(event) {
  if (!captureState.enabled || !state.image) return;
  if (event.ctrlKey || event.metaKey) return;
  event.preventDefault();
  const factor = event.deltaY < 0 ? 1.08 : 1 / 1.08;
  const pixel = isMaskCaptureMode() ? null : getCanvasPixelCoordinates(elements.mapCanvas, event);
  setCaptureScale(captureState.scale * factor, pixel);
}

function beginCapturePreviewDrag(event) {
  if (!isMaskCaptureMode() || !captureState.selectionBounds || event.button !== 0) return;
  captureState.previewDragging = true;
  captureState.previewPointerId = event.pointerId;
  captureState.previewStartX = event.clientX;
  captureState.previewStartY = event.clientY;
  captureState.previewStartOffsetX = captureState.offsetX;
  captureState.previewStartOffsetY = captureState.offsetY;
  safelyCapturePointer(elements.capturePreviewCanvas, event.pointerId);
  event.preventDefault();
}

function moveCapturePreviewDrag(event) {
  if (!captureState.previewDragging || captureState.previewPointerId !== event.pointerId) return;
  const rect = elements.capturePreviewCanvas.getBoundingClientRect();
  captureState.offsetX = captureState.previewStartOffsetX + (event.clientX - captureState.previewStartX) * elements.capturePreviewCanvas.width / rect.width;
  captureState.offsetY = captureState.previewStartOffsetY + (event.clientY - captureState.previewStartY) * elements.capturePreviewCanvas.height / rect.height;
  updateCaptureUi();
  event.preventDefault();
}

function finishCapturePreviewDrag(event) {
  if (!captureState.previewDragging || captureState.previewPointerId !== event.pointerId) return;
  captureState.previewDragging = false;
  captureState.previewPointerId = null;
  safelyReleasePointer(elements.capturePreviewCanvas, event.pointerId);
  event.preventDefault();
}

function getSourceTileFromEvent(event) {
  if (!state.image) return null;
  const pixel = getCanvasPixelCoordinates(elements.mapCanvas, event);
  const tile = { x: Math.floor(pixel.x / MZ_TILE_SIZE), y: Math.floor(pixel.y / MZ_TILE_SIZE) };
  const { width, height } = getSourceDimensions();
  return tile.x < Math.floor(width / MZ_TILE_SIZE) &&
    tile.y < Math.floor(height / MZ_TILE_SIZE) ? tile : null;
}

function normalizeRectangle(start, end) {
  return {
    x: Math.min(start.x, end.x),
    y: Math.min(start.y, end.y),
    width: Math.abs(start.x - end.x) + 1,
    height: Math.abs(start.y - end.y) + 1,
  };
}

function getSelectedTileCount() {
  const rectangle = selectionState.rectangle;
  return selectionState.type === "rectangle"
    ? (rectangle ? rectangle.width * rectangle.height : 0)
    : selectionState.individualTiles.length;
}

function drawSelectionCell(context, x, y, fill, stroke) {
  const pixelX = x * MZ_TILE_SIZE;
  const pixelY = y * MZ_TILE_SIZE;
  context.fillStyle = fill;
  context.fillRect(pixelX, pixelY, MZ_TILE_SIZE, MZ_TILE_SIZE);
  context.strokeStyle = stroke;
  context.lineWidth = 3;
  context.strokeRect(pixelX + 1.5, pixelY + 1.5, MZ_TILE_SIZE - 3, MZ_TILE_SIZE - 3);
}

function drawSourceSelectionOverlay(context) {
  if (!selectionState.enabled) return;
  context.save();
  if (selectionState.type === "individual") {
    selectionState.individualTiles.forEach((tile, index) => {
      drawSelectionCell(context, tile.x, tile.y, "rgba(57, 189, 248, .28)", "#57d4ff");
      context.fillStyle = "#071019";
      context.font = "bold 16px sans-serif";
      context.textAlign = "center";
      context.textBaseline = "middle";
      context.fillText(String(index + 1), tile.x * MZ_TILE_SIZE + 24, tile.y * MZ_TILE_SIZE + 24);
    });
  } else {
    const rectangle = selectionState.dragPreview || selectionState.rectangle;
    if (rectangle) {
      for (let y = 0; y < rectangle.height; y += 1) {
        for (let x = 0; x < rectangle.width; x += 1) {
          drawSelectionCell(context, rectangle.x + x, rectangle.y + y, "rgba(91, 219, 151, .25)", "#67e8a6");
        }
      }
    }
  }
  context.restore();
}

function updateSelectionUi() {
  const count = getSelectedTileCount();
  const hasSelection = count > 0;
  const captureCount = captureState.enabled && hasCapturedObject() ? captureState.columns * captureState.rows : 0;
  elements.selectedTileCount.textContent = String(count);
  elements.builderSelectedCount.textContent = String(hasSelection ? count : captureCount);
  elements.clearSelectionButton.disabled = !hasSelection;
  elements.addNextSlotsButton.disabled = !hasSelection || !builderState.templateImage;
  elements.placeAtDestinationButton.disabled =
    !hasSelection || !builderState.templateImage || builderState.destination === null;

  if (selectionState.type === "rectangle" && selectionState.rectangle) {
    const rectangle = selectionState.rectangle;
    const title = rectangle.width + "\u00D7" + rectangle.height + " region (" + count + " tiles)";
    const detail = "Source X:" + rectangle.x + " Y:" + rectangle.y + "; layout will be preserved.";
    elements.selectionSummaryTitle.textContent = title;
    elements.selectionSummaryDetail.textContent = detail;
    elements.builderSelectionTitle.textContent = title;
    elements.builderSelectionDetail.textContent = detail;
  } else if (selectionState.type === "individual" && hasSelection) {
    const title = count + (count === 1 ? " tile selected" : " tiles selected");
    const detail = "Individual tiles will be placed in selection order.";
    elements.selectionSummaryTitle.textContent = title;
    elements.selectionSummaryDetail.textContent = detail;
    elements.builderSelectionTitle.textContent = title;
    elements.builderSelectionDetail.textContent = detail;
  } else {
    elements.selectionSummaryTitle.textContent = "No tiles selected";
    elements.selectionSummaryDetail.textContent =
      selectionState.type === "rectangle" ? "Drag across source cells to select a region." : "Click cells to select them in order.";
    if (captureState.enabled && hasCapturedObject()) {
      elements.builderSelectionTitle.textContent = captureState.columns + "\u00D7" + captureState.rows + " object capture ready";
      elements.builderSelectionDetail.textContent = "Choose a destination, then return to Source Map to place or adjust it.";
    } else {
      elements.builderSelectionTitle.textContent = "No source selection";
      elements.builderSelectionDetail.textContent = "Select tiles in the Source Map workspace.";
    }
  }
}

function clearSourceSelection() {
  selectionState.individualTiles = [];
  selectionState.rectangle = null;
  selectionState.dragStart = null;
  selectionState.dragPreview = null;
  updateSelectionUi();
  renderPreview();
}

function setSelectionEnabled(enabled) {
  if (enabled && captureState.enabled) setCaptureEnabled(false);
  selectionState.enabled = Boolean(enabled && state.image);
  elements.selectionControls.hidden = !selectionState.enabled;
  elements.selectionToggleButton.textContent = selectionState.enabled ? "Disable tile selection" : "Enable tile selection";
  elements.selectionToggleButton.classList.toggle("is-active", selectionState.enabled);
  elements.mapCanvas.classList.toggle("is-selecting", selectionState.enabled);
  elements.gridSize.disabled = selectionState.enabled;
  elements.mzPresetButton.disabled = selectionState.enabled;
  if (selectionState.enabled) {
    elements.gridSize.value = MZ_TILE_SIZE;
    elements.gridToggle.checked = true;
    hideCoordinates();
  } else {
    selectionState.dragStart = null;
    selectionState.dragPreview = null;
  }
  renderPreview();
}

function setSelectionType(type) {
  if (selectionState.type === type) return;
  selectionState.type = type;
  selectionState.individualTiles = [];
  selectionState.rectangle = null;
  selectionState.dragStart = null;
  selectionState.dragPreview = null;
  elements.individualSelectionButton.classList.toggle("is-active", type === "individual");
  elements.rectangleSelectionButton.classList.toggle("is-active", type === "rectangle");
  updateSelectionUi();
  renderPreview();
}

function handleSourcePointerDown(event) {
  if (beginCaptureDrag(event)) return;
  if (isPanIntent(event)) return;
  if (!selectionState.enabled || !state.image) return;
  const tile = getSourceTileFromEvent(event);
  if (!tile) {
    showToast("Only complete 48\u00D748 source tiles can be selected.", true);
    return;
  }
  event.preventDefault();
  if (selectionState.type === "individual") {
    const index = selectionState.individualTiles.findIndex((entry) => entry.x === tile.x && entry.y === tile.y);
    if (index >= 0) selectionState.individualTiles.splice(index, 1);
    else selectionState.individualTiles.push(tile);
    updateSelectionUi();
    renderPreview();
    return;
  }
  selectionState.dragStart = tile;
  selectionState.dragPreview = normalizeRectangle(tile, tile);
  elements.mapCanvas.setPointerCapture(event.pointerId);
  renderPreview();
}

function handleSourceSelectionDrag(event) {
  if (moveCaptureDrag(event)) return;
  if (panState.active) return;
  if (!selectionState.enabled || selectionState.type !== "rectangle" || !selectionState.dragStart) return;
  const tile = getSourceTileFromEvent(event);
  if (!tile) return;
  selectionState.dragPreview = normalizeRectangle(selectionState.dragStart, tile);
  renderPreview();
}

function finishSourceRectangle(event) {
  if (finishCaptureDrag(event)) return;
  if (!selectionState.dragStart) return;
  const tile = getSourceTileFromEvent(event) || selectionState.dragStart;
  selectionState.rectangle = normalizeRectangle(selectionState.dragStart, tile);
  selectionState.dragStart = null;
  selectionState.dragPreview = null;
  if (elements.mapCanvas.hasPointerCapture(event.pointerId)) elements.mapCanvas.releasePointerCapture(event.pointerId);
  updateSelectionUi();
  renderPreview();
}

// Workspace switching changes visibility only; neither canvas backing store is
// recreated or resized.
function switchWorkspace(workspace) {
  const builder = workspace === "builder";
  elements.sourceWorkspace.hidden = builder;
  elements.builderWorkspace.hidden = !builder;
  elements.sourceWorkspaceTab.classList.toggle("is-active", !builder);
  elements.builderWorkspaceTab.classList.toggle("is-active", builder);
  elements.sourceWorkspaceTab.setAttribute("aria-selected", String(!builder));
  elements.builderWorkspaceTab.setAttribute("aria-selected", String(builder));
  if (builder) window.requestAnimationFrame(applyBuilderZoom);
}

function calculateBuilderFitZoom() {
  if (!builderState.templateImage) return 1;
  const margin = 48;
  return Math.min(
    1,
    Math.max(1, elements.builderCanvasViewport.clientWidth - margin) / builderState.width,
    Math.max(1, elements.builderCanvasViewport.clientHeight - margin) / builderState.height,
  );
}

function applyBuilderZoom() {
  if (!builderState.templateImage) return;
  if (builderState.fitToViewport) builderState.zoom = calculateBuilderFitZoom();
  elements.tilesetCanvas.style.width = Math.max(1, Math.round(builderState.width * builderState.zoom)) + "px";
  elements.tilesetCanvas.style.height = Math.max(1, Math.round(builderState.height * builderState.zoom)) + "px";
  elements.builderZoomValue.textContent = Math.round(builderState.zoom * 100) + "%";
  elements.builderFitButton.classList.toggle("is-active", builderState.fitToViewport);
  elements.builderActualSizeButton.classList.toggle("is-active", !builderState.fitToViewport && builderState.zoom === 1);
}

function setBuilderNotice(message, isError = false) {
  elements.builderNotice.textContent = message;
  elements.builderNotice.hidden = !message;
  elements.builderNotice.classList.toggle("is-error", isError);
}

function getOccupiedCount() {
  return builderState.cells.reduce((count, cell) => count + (cell ? 1 : 0), 0);
}

function updateBuilderUi() {
  const occupied = getOccupiedCount();
  elements.builderOccupancy.textContent = occupied + " / " + (builderState.columns * builderState.rows) + " occupied";
  elements.builderTabCount.textContent = String(occupied);
  elements.builderDestination.textContent = builderState.destination === null
    ? "None"
    : "X:" + (builderState.destination % builderState.columns) + " Y:" + Math.floor(builderState.destination / builderState.columns);
  elements.removeDestinationButton.disabled =
    builderState.destination === null || !builderState.cells[builderState.destination];
  elements.clearTilesetButton.disabled = occupied === 0;
  updateSelectionUi();
  updateCaptureUi();
}

function renderTileset() {
  if (!builderState.templateImage) return;
  tilesetContext.clearRect(0, 0, builderState.width, builderState.height);
  tilesetContext.drawImage(builderState.templateImage, 0, 0);
  builderState.cells.forEach((cell, index) => {
    if (!cell) return;
    tilesetContext.drawImage(cell, index % builderState.columns * MZ_TILE_SIZE, Math.floor(index / builderState.columns) * MZ_TILE_SIZE);
  });
  drawGrid(tilesetContext, builderState.width, builderState.height, {
    size: MZ_TILE_SIZE, opacity: .72, thickness: 1, color: "#a600ff",
  });
  if (builderState.destination !== null) {
    const x = builderState.destination % builderState.columns * MZ_TILE_SIZE;
    const y = Math.floor(builderState.destination / builderState.columns) * MZ_TILE_SIZE;
    tilesetContext.save();
    tilesetContext.fillStyle = "rgba(255, 211, 90, .25)";
    tilesetContext.fillRect(x, y, MZ_TILE_SIZE, MZ_TILE_SIZE);
    tilesetContext.strokeStyle = "#ffdc67";
    tilesetContext.lineWidth = 3;
    tilesetContext.strokeRect(x + 1.5, y + 1.5, MZ_TILE_SIZE - 3, MZ_TILE_SIZE - 3);
    tilesetContext.restore();
  }
}

function loadTilesetTemplate() {
  const template = new Image();
  template.onload = () => {
    if (template.naturalWidth % MZ_TILE_SIZE || template.naturalHeight % MZ_TILE_SIZE) {
      setBuilderNotice("The supplied template is not divisible by 48.", true);
      return;
    }
    builderState.templateImage = template;
    builderState.width = template.naturalWidth;
    builderState.height = template.naturalHeight;
    builderState.columns = template.naturalWidth / MZ_TILE_SIZE;
    builderState.rows = template.naturalHeight / MZ_TILE_SIZE;
    builderState.cells = Array(builderState.columns * builderState.rows).fill(null);
    elements.tilesetCanvas.width = builderState.width;
    elements.tilesetCanvas.height = builderState.height;
    elements.templateDimensions.textContent = builderState.width + " \u00D7 " + builderState.height + " px";
    elements.builderEmptyState.hidden = true;
    elements.builderCanvasStage.hidden = false;
    elements.builderFitButton.disabled = false;
    elements.builderActualSizeButton.disabled = false;
    elements.downloadTilesetButton.disabled = false;
    renderTileset();
    applyBuilderZoom();
    updateBuilderUi();
  };
  template.onerror = () => setBuilderNotice("The supplied tileset template could not be loaded.", true);
  template.src = TILESET_TEMPLATE_PATH;
}

function getSelectionPayload() {
  if (!state.image || !getSelectedTileCount()) return null;
  if (selectionState.type === "rectangle") {
    const rectangle = selectionState.rectangle;
    const tiles = [];
    for (let y = 0; y < rectangle.height; y += 1) {
      for (let x = 0; x < rectangle.width; x += 1) {
        tiles.push({ sourceX: rectangle.x + x, sourceY: rectangle.y + y, relativeX: x, relativeY: y });
      }
    }
    return { kind: "rectangle", width: rectangle.width, height: rectangle.height, tiles };
  }
  return {
    kind: "individual",
    tiles: selectionState.individualTiles.map((tile) => ({ sourceX: tile.x, sourceY: tile.y })),
  };
}

// Copy exactly one logical tile into its own 48px backing canvas. Supplying
// equal source and destination rectangles prevents stretching or resampling,
// regardless of either preview's CSS zoom.
function extractSourceTile(tile) {
  const canvas = document.createElement("canvas");
  canvas.width = MZ_TILE_SIZE;
  canvas.height = MZ_TILE_SIZE;
  canvas.getContext("2d").drawImage(
    getActiveSource(),
    tile.sourceX * MZ_TILE_SIZE,
    tile.sourceY * MZ_TILE_SIZE,
    MZ_TILE_SIZE,
    MZ_TILE_SIZE,
    0, 0, MZ_TILE_SIZE, MZ_TILE_SIZE,
  );
  return canvas;
}

function getCapturedTiles() {
  const captured = renderCapturedRegion();
  const sourceRect = isMaskCaptureMode() ? captureState.selectionBounds : getCaptureRect();
  const tiles = [];
  for (let row = 0; row < captureState.rows; row += 1) {
    for (let column = 0; column < captureState.columns; column += 1) {
      const canvas = document.createElement("canvas");
      canvas.width = MZ_TILE_SIZE;
      canvas.height = MZ_TILE_SIZE;
      const context = canvas.getContext("2d");
      context.imageSmoothingEnabled = false;
      context.drawImage(
        captured,
        column * MZ_TILE_SIZE, row * MZ_TILE_SIZE, MZ_TILE_SIZE, MZ_TILE_SIZE,
        0, 0, MZ_TILE_SIZE, MZ_TILE_SIZE,
      );
      canvas.captureMetadata = {
        sourceName: state.file ? state.file.name : "source image",
        sourceRect: { ...sourceRect },
        scale: captureState.scale,
        method: elements.captureResizeMethod.value,
        columns: captureState.columns,
        rows: captureState.rows,
        column,
        row,
      };
      tiles.push({ canvas, relativeX: column, relativeY: row });
    }
  }
  return tiles;
}

function getCaptureTargets(startX, startY) {
  if (startX + captureState.columns > builderState.columns || startY + captureState.rows > builderState.rows) {
    return null;
  }
  return getCapturedTiles().map((tile) => ({
    canvas: tile.canvas,
    index: (startY + tile.relativeY) * builderState.columns + startX + tile.relativeX,
  }));
}

function placeCaptureAtSelectedDestination() {
  if (!captureState.enabled || builderState.destination === null || !builderState.templateImage) return;
  const startX = builderState.destination % builderState.columns;
  const startY = Math.floor(builderState.destination / builderState.columns);
  const targets = getCaptureTargets(startX, startY);
  if (!targets) {
    setBuilderNotice(
      "The " + captureState.columns + "\u00D7" + captureState.rows + " capture does not fit at that destination.",
      true,
    );
    showToast("The captured region does not fit at the selected destination.", true);
    return;
  }
  commitPlacement(targets, "Placed captured " + captureState.columns + "\u00D7" + captureState.rows + " region.");
}

function addCaptureToNextEmptyRegion() {
  if (!captureState.enabled || !builderState.templateImage) return;
  const start = findEmptyRectangle(captureState.columns, captureState.rows);
  if (!start) {
    setBuilderNotice(
      "No empty " + captureState.columns + "\u00D7" + captureState.rows + " destination region is available.",
      true,
    );
    showToast("No matching empty region is available.", true);
    return;
  }
  const targets = getCaptureTargets(start.x, start.y);
  commitPlacement(targets, "Added captured " + captureState.columns + "\u00D7" + captureState.rows + " region.");
}

function commitPlacement(targets, message) {
  const occupied = targets.filter((target) => builderState.cells[target.index]).length;
  if (occupied && !window.confirm(
    occupied + " destination tile" + (occupied === 1 ? " is" : "s are") +
      " occupied. Replace " + (occupied === 1 ? "it" : "them") + "?",
  )) {
    setBuilderNotice("Placement cancelled; no tiles were changed.", true);
    return;
  }
  targets.forEach((target) => {
    builderState.cells[target.index] = target.canvas || extractSourceTile(target.tile);
  });
  setBuilderNotice("");
  renderTileset();
  updateBuilderUi();
  showToast(message);
}

function placeAtSelectedDestination() {
  const payload = getSelectionPayload();
  if (!payload || builderState.destination === null) return;
  const x = builderState.destination % builderState.columns;
  const y = Math.floor(builderState.destination / builderState.columns);
  let targets;
  if (payload.kind === "rectangle") {
    if (x + payload.width > builderState.columns || y + payload.height > builderState.rows) {
      setBuilderNotice("The " + payload.width + "\u00D7" + payload.height + " region does not fit here. Nothing was placed.", true);
      return;
    }
    targets = payload.tiles.map((tile) => ({
      tile,
      index: (y + tile.relativeY) * builderState.columns + x + tile.relativeX,
    }));
  } else {
    if (builderState.destination + payload.tiles.length > builderState.cells.length) {
      setBuilderNotice("The ordered selection would overflow the tileset. Nothing was placed.", true);
      return;
    }
    targets = payload.tiles.map((tile, offset) => ({ tile, index: builderState.destination + offset }));
  }
  commitPlacement(targets, "Placed " + payload.tiles.length + " source tiles.");
}

function findEmptyRectangle(width, height) {
  for (let y = 0; y <= builderState.rows - height; y += 1) {
    for (let x = 0; x <= builderState.columns - width; x += 1) {
      let fits = true;
      for (let dy = 0; dy < height && fits; dy += 1) {
        for (let dx = 0; dx < width; dx += 1) {
          if (builderState.cells[(y + dy) * builderState.columns + x + dx]) {
            fits = false;
            break;
          }
        }
      }
      if (fits) return { x, y };
    }
  }
  return null;
}

function addToNextAvailableSlots() {
  const payload = getSelectionPayload();
  if (!payload) return;
  let targets;
  if (payload.kind === "rectangle") {
    const start = findEmptyRectangle(payload.width, payload.height);
    if (!start) {
      setBuilderNotice("No empty " + payload.width + "\u00D7" + payload.height + " region is available.", true);
      return;
    }
    targets = payload.tiles.map((tile) => ({
      tile,
      index: (start.y + tile.relativeY) * builderState.columns + start.x + tile.relativeX,
    }));
  } else {
    const empty = builderState.cells.map((cell, index) => cell ? null : index).filter((index) => index !== null);
    if (empty.length < payload.tiles.length) {
      setBuilderNotice("There are not enough empty slots. Nothing was placed.", true);
      return;
    }
    targets = payload.tiles.map((tile, index) => ({ tile, index: empty[index] }));
  }
  commitPlacement(targets, "Added " + payload.tiles.length + " source tiles.");
}

function selectBuilderDestination(event) {
  if (isPanIntent(event)) return;
  if (!builderState.templateImage) return;
  const pixel = getCanvasPixelCoordinates(elements.tilesetCanvas, event);
  const x = Math.floor(pixel.x / MZ_TILE_SIZE);
  const y = Math.floor(pixel.y / MZ_TILE_SIZE);
  builderState.destination = y * builderState.columns + x;
  setBuilderNotice("");
  renderTileset();
  updateBuilderUi();
}

function removeDestinationTile() {
  if (builderState.destination === null || !builderState.cells[builderState.destination]) return;
  builderState.cells[builderState.destination] = null;
  renderTileset();
  updateBuilderUi();
  showToast("Destination tile removed.");
}

function clearTileset() {
  if (!getOccupiedCount() || !window.confirm("Clear every placed tile from the tileset workspace?")) return;
  builderState.cells.fill(null);
  setBuilderNotice("");
  renderTileset();
  updateBuilderUi();
  showToast("Tileset workspace cleared.");
}

// Export is composed from placed tile canvases only. The template guide,
// editor grid, and destination highlight therefore cannot enter the PNG.
function exportTilesetPng() {
  if (!builderState.templateImage) return;
  const canvas = document.createElement("canvas");
  canvas.width = builderState.width;
  canvas.height = builderState.height;
  const context = canvas.getContext("2d");
  context.clearRect(0, 0, canvas.width, canvas.height);
  builderState.cells.forEach((cell, index) => {
    if (cell) context.drawImage(cell, index % builderState.columns * MZ_TILE_SIZE, Math.floor(index / builderState.columns) * MZ_TILE_SIZE);
  });
  canvas.toBlob((blob) => {
    if (!blob) {
      showToast("The tileset PNG could not be created.", true);
      return;
    }
    const url = URL.createObjectURL(blob);
    downloadBlobUrl(url, "rpg-maker-mz-tileset-b.png");
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
    showToast("Downloaded rpg-maker-mz-tileset-b.png.");
  }, "image/png");
}

elements.chooseButton.addEventListener("click", openFilePicker);
elements.emptyChooseButton.addEventListener("click", openFilePicker);
elements.fileInput.addEventListener("change", (event) => loadImageFile(event.target.files[0]));
elements.gridToggle.addEventListener("change", renderPreview);
elements.mzPresetButton.addEventListener("click", applyMzPreset);
elements.gridSize.addEventListener("input", () => applyGridSizeFromInput());
elements.gridSize.addEventListener("change", () => applyGridSizeFromInput({ commit: true }));
elements.gridOpacity.addEventListener("input", updateOpacity);
elements.lineThickness.addEventListener("input", updateThickness);
elements.gridColor.addEventListener("input", updateColor);
elements.showPixelCoordinates.addEventListener("change", () => {
  elements.pixelCoordinates.hidden = !elements.showPixelCoordinates.checked;
});
elements.zoomPresetButtons.forEach((button) => {
  button.addEventListener("click", () => setPreviewZoom(Number(button.dataset.zoom)));
});
elements.fitButton.addEventListener("click", fitImage);
elements.mapCanvas.addEventListener("pointermove", showCoordinates);
elements.mapCanvas.addEventListener("pointerleave", handleSourcePointerLeave);
elements.exportGridButton.addEventListener("click", exportGriddedPng);
elements.exportOriginalButton.addEventListener("click", exportOriginal);
elements.autoFitImageButton.addEventListener("click", autoFitImageToGrid);
elements.restoreImageSizeButton.addEventListener("click", restoreUploadedImageSize);

elements.sourceWorkspaceTab.addEventListener("click", () => switchWorkspace("source"));
elements.builderWorkspaceTab.addEventListener("click", () => switchWorkspace("builder"));
elements.backToSourceButton.addEventListener("click", () => switchWorkspace("source"));
elements.selectionToggleButton.addEventListener("click", () => setSelectionEnabled(!selectionState.enabled));
elements.individualSelectionButton.addEventListener("click", () => setSelectionType("individual"));
elements.rectangleSelectionButton.addEventListener("click", () => setSelectionType("rectangle"));
elements.clearSelectionButton.addEventListener("click", clearSourceSelection);
elements.captureToggleButton.addEventListener("click", () => setCaptureEnabled(!captureState.enabled));
elements.captureFrameModeButton.addEventListener("click", () => setCaptureMode("frame"));
elements.captureSmartModeButton.addEventListener("click", () => setCaptureMode("smart"));
elements.captureRectangleModeButton.addEventListener("click", () => setCaptureMode("rectangle"));
elements.captureLassoModeButton.addEventListener("click", () => setCaptureMode("lasso"));
elements.maskRedrawButton.addEventListener("click", () => setMaskTool("draw"));
elements.maskEraseButton.addEventListener("click", () => setMaskTool("erase"));
elements.maskRestoreButton.addEventListener("click", () => setMaskTool("restore"));
elements.maskBackgroundButton.addEventListener("click", () => setMaskTool("background"));
elements.maskBrushSize.addEventListener("input", updateCaptureUi);
elements.maskTolerance.addEventListener("input", updateCaptureUi);
elements.maskUndoButton.addEventListener("click", undoMaskEdit);
elements.maskResetButton.addEventListener("click", resetMaskEdits);
elements.maskClearSelectionButton.addEventListener("click", clearCaptureObjectSelection);
[elements.maskEdgeExpand, elements.maskFeather].forEach((input) => {
  input.addEventListener("input", () => {
    updateCaptureUi();
    renderPreview();
  });
});
elements.captureColumns.addEventListener("change", updateCaptureDimensions);
elements.captureRows.addEventListener("change", updateCaptureDimensions);
elements.captureColumns.addEventListener("input", previewCaptureDimensions);
elements.captureRows.addEventListener("input", previewCaptureDimensions);
elements.capturePlacementMode.addEventListener("change", () => {
  applyCapturePlacementMode(elements.capturePlacementMode.value);
});
elements.autoFitObjectButton.addEventListener("click", autoFitObjectToTiles);
elements.captureResizeMethod.addEventListener("change", () => {
  updateCaptureUi();
  renderPreview();
});
elements.captureScale.addEventListener("input", () => setCaptureScale(Number(elements.captureScale.value) / 100));
elements.previewZoomOutButton.addEventListener("click", () => setCapturePreviewZoom(captureState.previewZoom - .5));
elements.previewZoomInButton.addEventListener("click", () => setCapturePreviewZoom(captureState.previewZoom + .5));
elements.captureResetButton.addEventListener("click", resetCapturePosition);
elements.capturePlaceSelectedButton.addEventListener("click", placeCaptureAtSelectedDestination);
elements.captureAddNextButton.addEventListener("click", addCaptureToNextEmptyRegion);
elements.analyzeTilesButton.addEventListener("click", () => analyzeTiles());
elements.outlierSensitivity.addEventListener("input", updateQualityUi);
elements.outlierSensitivity.addEventListener("change", () => {
  if (qualityState.analyzed) analyzeTiles({ announce: false });
});
elements.harmonizeStrength.addEventListener("input", updateQualityUi);
elements.showQualityOverlay.addEventListener("change", renderPreview);
elements.harmonizeTilesButton.addEventListener("click", harmonizeFlaggedTiles);
elements.resetHarmonizeButton.addEventListener("click", restoreOriginalSource);
elements.mapCanvas.addEventListener("pointerdown", handleSourcePointerDown);
elements.mapCanvas.addEventListener("pointermove", handleSourceSelectionDrag);
elements.mapCanvas.addEventListener("pointerup", finishSourceRectangle);
elements.mapCanvas.addEventListener("pointercancel", finishSourceRectangle);
elements.mapCanvas.addEventListener("wheel", zoomCaptureAtPointer, { passive: false });
elements.capturePreviewCanvas.addEventListener("pointerdown", beginCapturePreviewDrag);
elements.capturePreviewCanvas.addEventListener("pointermove", moveCapturePreviewDrag);
elements.capturePreviewCanvas.addEventListener("pointerup", finishCapturePreviewDrag);
elements.capturePreviewCanvas.addEventListener("pointercancel", finishCapturePreviewDrag);
elements.tilesetCanvas.addEventListener("click", selectBuilderDestination);
elements.placeAtDestinationButton.addEventListener("click", placeAtSelectedDestination);
elements.addNextSlotsButton.addEventListener("click", addToNextAvailableSlots);
elements.removeDestinationButton.addEventListener("click", removeDestinationTile);
elements.clearTilesetButton.addEventListener("click", clearTileset);
elements.downloadTilesetButton.addEventListener("click", exportTilesetPng);
elements.builderFitButton.addEventListener("click", () => {
  builderState.fitToViewport = true;
  applyBuilderZoom();
});
elements.builderActualSizeButton.addEventListener("click", () => {
  builderState.fitToViewport = false;
  builderState.zoom = 1;
  applyBuilderZoom();
});

[elements.canvasViewport, elements.builderCanvasViewport].forEach((viewport) => {
  viewport.addEventListener("pointerdown", beginViewportPan);
  viewport.addEventListener("pointermove", moveViewportPan);
  viewport.addEventListener("pointerup", finishViewportPan);
  viewport.addEventListener("pointercancel", finishViewportPan);
  viewport.addEventListener("auxclick", (event) => {
    if (event.button === 1) event.preventDefault();
  });
});

["dragenter", "dragover"].forEach((eventName) => {
  elements.dropZone.addEventListener(eventName, (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (eventName === "dragenter") showDragOverlay();
    if (event.dataTransfer) event.dataTransfer.dropEffect = "copy";
  });
});

elements.dropZone.addEventListener("dragleave", (event) => {
  event.preventDefault();
  event.stopPropagation();
  hideDragOverlay();
});

elements.dropZone.addEventListener("drop", (event) => {
  event.preventDefault();
  event.stopPropagation();
  resetDragOverlay();
  loadImageFile(event.dataTransfer.files[0]);
});

window.addEventListener("resize", () => {
  if (state.fitToViewport) applyZoom();
  if (builderState.fitToViewport) applyBuilderZoom();
});

window.addEventListener("keydown", handleGlobalKeyDown, { capture: true });
window.addEventListener("keyup", handleGlobalKeyUp, { capture: true });
window.addEventListener("wheel", preventControlWheelZoom, { capture: true, passive: false });
window.addEventListener("gesturestart", (event) => event.preventDefault(), { passive: false });
window.addEventListener("blur", () => {
  panState.spaceHeld = false;
  setPanReady(false);
});

window.addEventListener("beforeunload", () => {
  if (state.objectUrl) URL.revokeObjectURL(state.objectUrl);
});

initializeCollapsibleSections();
updateGridStatus();
updateSelectionUi();
updateCaptureUi();
updateQualityUi();
loadTilesetTemplate();
