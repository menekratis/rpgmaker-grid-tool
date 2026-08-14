"use strict";

const MZ_TILE_SIZE = 48;

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
  actualSizeButton: document.querySelector("#actualSizeButton"),
  fitButton: document.querySelector("#fitButton"),
  zoomValue: document.querySelector("#zoomValue"),
  footerHint: document.querySelector("#footerHint"),
  gridStatus: document.querySelector("#gridStatus"),
  toast: document.querySelector("#toast"),
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

const displayContext = elements.mapCanvas.getContext("2d");

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
      elements.actualSizeButton,
      elements.fitButton,
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

  state.zoom = state.fitToViewport ? calculateFitZoom() : 1;
  const cssWidth = Math.max(1, Math.round(state.image.naturalWidth * state.zoom));
  const cssHeight = Math.max(1, Math.round(state.image.naturalHeight * state.zoom));
  elements.mapCanvas.style.width = `${cssWidth}px`;
  elements.mapCanvas.style.height = `${cssHeight}px`;
  elements.zoomValue.textContent = `${Math.round(state.zoom * 100)}%`;
  elements.actualSizeButton.classList.toggle("is-active", !state.fitToViewport);
  elements.fitButton.classList.toggle("is-active", state.fitToViewport);
}

function showActualSize() {
  state.fitToViewport = false;
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
  const pointerX = event.offsetX;
  const pointerY = event.offsetY;
  const pixelX = Math.min(
    elements.mapCanvas.width - 1,
    Math.max(0, Math.floor(pointerX * (elements.mapCanvas.width / rect.width))),
  );
  const pixelY = Math.min(
    elements.mapCanvas.height - 1,
    Math.max(0, Math.floor(pointerY * (elements.mapCanvas.height / rect.height))),
  );
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
elements.actualSizeButton.addEventListener("click", showActualSize);
elements.fitButton.addEventListener("click", fitImage);
elements.mapCanvas.addEventListener("pointermove", showCoordinates);
elements.mapCanvas.addEventListener("pointerleave", hideCoordinates);
elements.exportGridButton.addEventListener("click", exportGriddedPng);
elements.exportOriginalButton.addEventListener("click", exportOriginal);

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
});

window.addEventListener("beforeunload", () => {
  if (state.objectUrl) URL.revokeObjectURL(state.objectUrl);
});

updateGridStatus();
