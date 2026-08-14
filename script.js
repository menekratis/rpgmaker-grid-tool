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
  fitToViewport: false,
  zoom: 1,
  dragDepth: 0,
  toastTimer: null,
};


const selectionState = {
  enabled: false,
  type: "individual",
  individualTiles: [],
  rectangle: null,
  dragStart: null,
  dragPreview: null,
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

function renderPreview() {
  updateGridStatus();
  if (!state.image) return;

  const { naturalWidth: width, naturalHeight: height } = state.image;
  displayContext.clearRect(0, 0, width, height);
  displayContext.globalAlpha = 1;
  displayContext.drawImage(state.image, 0, 0, width, height);

  if (elements.gridToggle.checked) {
    drawGrid(displayContext, width, height, getGridSettings());
  }

  drawSourceSelectionOverlay(displayContext);
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

  elements.pixelDimensions.textContent = `${width} \u00D7 ${height} px`;
  elements.tileEquation.textContent =
    `${width}\u00D7${height} px = ${formatTileCount(width)}\u00D7${formatTileCount(height)} tiles @ 48px`;

  if (widthRemainder === 0 && heightRemainder === 0) {
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
    state.objectUrl = nextObjectUrl;
    state.fitToViewport = false;
    state.zoom = 1;

    const { naturalWidth: width, naturalHeight: height } = nextImage;
    elements.mapCanvas.width = width;
    elements.mapCanvas.height = height;
    clearSourceSelection();
    setSelectionEnabled(false);
    elements.selectionToggleButton.disabled = false;
    elements.emptyState.hidden = true;
    elements.canvasStage.hidden = false;
    elements.fileType.hidden = false;
    elements.fileType.textContent =
      file.type === "image/png" || /\.png$/i.test(file.name) ? "PNG" : "JPG";
    elements.viewerTitle.textContent = file.name;
    elements.footerHint.textContent =
      "Hover for tile coordinates \u00B7 top-left is X:0 Y:0";

    [
      elements.exportGridButton,
      elements.exportOriginalButton,
      elements.fitButton,
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

  // Never enlarge a small source image: Fit only scales large images down.
  return Math.min(
    1,
    availableWidth / state.image.naturalWidth,
    availableHeight / state.image.naturalHeight,
  );
}

function applyZoom() {
  if (!state.image) return;

  if (state.fitToViewport) state.zoom = calculateFitZoom();
  const cssWidth = Math.max(1, Math.round(state.image.naturalWidth * state.zoom));
  const cssHeight = Math.max(1, Math.round(state.image.naturalHeight * state.zoom));
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
  exportCanvas.width = state.image.naturalWidth;
  exportCanvas.height = state.image.naturalHeight;
  const exportContext = exportCanvas.getContext("2d");
  exportContext.drawImage(state.image, 0, 0);

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

function getSourceTileFromEvent(event) {
  if (!state.image) return null;
  const pixel = getCanvasPixelCoordinates(elements.mapCanvas, event);
  const tile = { x: Math.floor(pixel.x / MZ_TILE_SIZE), y: Math.floor(pixel.y / MZ_TILE_SIZE) };
  return tile.x < Math.floor(state.image.naturalWidth / MZ_TILE_SIZE) &&
    tile.y < Math.floor(state.image.naturalHeight / MZ_TILE_SIZE) ? tile : null;
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
  elements.selectedTileCount.textContent = String(count);
  elements.builderSelectedCount.textContent = String(count);
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
    elements.builderSelectionTitle.textContent = "No source selection";
    elements.builderSelectionDetail.textContent = "Select tiles in the Source Map workspace.";
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
  if (!selectionState.enabled || selectionState.type !== "rectangle" || !selectionState.dragStart) return;
  const tile = getSourceTileFromEvent(event);
  if (!tile) return;
  selectionState.dragPreview = normalizeRectangle(selectionState.dragStart, tile);
  renderPreview();
}

function finishSourceRectangle(event) {
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
    state.image,
    tile.sourceX * MZ_TILE_SIZE,
    tile.sourceY * MZ_TILE_SIZE,
    MZ_TILE_SIZE,
    MZ_TILE_SIZE,
    0, 0, MZ_TILE_SIZE, MZ_TILE_SIZE,
  );
  return canvas;
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
  targets.forEach((target) => { builderState.cells[target.index] = extractSourceTile(target.tile); });
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
elements.mapCanvas.addEventListener("pointerleave", hideCoordinates);
elements.exportGridButton.addEventListener("click", exportGriddedPng);
elements.exportOriginalButton.addEventListener("click", exportOriginal);

elements.sourceWorkspaceTab.addEventListener("click", () => switchWorkspace("source"));
elements.builderWorkspaceTab.addEventListener("click", () => switchWorkspace("builder"));
elements.backToSourceButton.addEventListener("click", () => switchWorkspace("source"));
elements.selectionToggleButton.addEventListener("click", () => setSelectionEnabled(!selectionState.enabled));
elements.individualSelectionButton.addEventListener("click", () => setSelectionType("individual"));
elements.rectangleSelectionButton.addEventListener("click", () => setSelectionType("rectangle"));
elements.clearSelectionButton.addEventListener("click", clearSourceSelection);
elements.mapCanvas.addEventListener("pointerdown", handleSourcePointerDown);
elements.mapCanvas.addEventListener("pointermove", handleSourceSelectionDrag);
elements.mapCanvas.addEventListener("pointerup", finishSourceRectangle);
elements.mapCanvas.addEventListener("pointercancel", finishSourceRectangle);
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

window.addEventListener("beforeunload", () => {
  if (state.objectUrl) URL.revokeObjectURL(state.objectUrl);
});

updateGridStatus();
updateSelectionUi();
loadTilesetTemplate();
