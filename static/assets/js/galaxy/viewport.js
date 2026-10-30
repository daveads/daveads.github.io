export function setupGalaxyViewport({
  map,
  mapScroll,
  zoomOut,
  zoomReset,
  zoomIn,
  zoomValue
}) {
  const mobileGalaxy = window.matchMedia("(max-width: 640px)");
  const mobileMapWidth = 860;
  const maxMapScale = 2.75;
  const activePointers = new Map();
  let baseMapWidth = mobileGalaxy.matches ? mobileMapWidth : mapScroll.clientWidth;
  let mapScale = 1;
  let panStart = null;
  let pinchStart = null;
  let gestureMoved = false;
  let suppressNextMapClick = false;

  function clampMapScale(scale) {
    const minScale = mobileGalaxy.matches ? 0.55 : 1;
    return Math.min(maxMapScale, Math.max(minScale, scale));
  }

  function updateZoomValue() {
    zoomValue.textContent = `${Math.round(mapScale * 100)}%`;
  }

  function centerMap() {
    mapScroll.scrollLeft = Math.max(
      0,
      (mapScroll.scrollWidth - mapScroll.clientWidth) / 2
    );
    mapScroll.scrollTop = Math.max(
      0,
      (mapScroll.scrollHeight - mapScroll.clientHeight) / 2
    );
  }

  function setMapScale(
    nextScale,
    focusX = mapScroll.clientWidth / 2,
    focusY = mapScroll.clientHeight / 2
  ) {
    const boundedScale = clampMapScale(nextScale);
    const contentX = (mapScroll.scrollLeft + focusX) / mapScale;
    const contentY = (mapScroll.scrollTop + focusY) / mapScale;
    mapScale = boundedScale;
    map.style.width = `${baseMapWidth * mapScale}px`;
    map.style.minWidth = `${baseMapWidth * mapScale}px`;
    updateZoomValue();

    requestAnimationFrame(() => {
      mapScroll.scrollLeft = contentX * mapScale - focusX;
      mapScroll.scrollTop = contentY * mapScale - focusY;
    });
  }

  function resetMapZoom() {
    mapScale = 1;
    if (mobileGalaxy.matches) {
      baseMapWidth = mobileMapWidth;
      map.style.width = `${baseMapWidth}px`;
      map.style.minWidth = `${baseMapWidth}px`;
    } else {
      map.style.removeProperty("width");
      map.style.removeProperty("min-width");
      baseMapWidth = mapScroll.clientWidth;
    }
    updateZoomValue();
    requestAnimationFrame(centerMap);
  }

  function pointerMidpoint() {
    const [first, second] = [...activePointers.values()];
    return {
      x: (first.x + second.x) / 2,
      y: (first.y + second.y) / 2
    };
  }

  function pointerDistance() {
    const [first, second] = [...activePointers.values()];
    return Math.hypot(second.x - first.x, second.y - first.y);
  }

  function beginSinglePointerPan() {
    const pointer = [...activePointers.values()][0];
    if (!pointer) {
      panStart = null;
      return;
    }
    panStart = {
      x: pointer.x,
      y: pointer.y,
      scrollLeft: mapScroll.scrollLeft,
      scrollTop: mapScroll.scrollTop
    };
  }

  function captureActivePointers() {
    activePointers.forEach((_pointer, pointerId) => {
      if (mapScroll.hasPointerCapture(pointerId)) return;
      try {
        mapScroll.setPointerCapture(pointerId);
      } catch (_error) {
        // The pointer may have ended between move events.
      }
    });
  }

  mapScroll.addEventListener("pointerdown", (event) => {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    activePointers.set(event.pointerId, { x: event.clientX, y: event.clientY });
    gestureMoved = false;
    mapScroll.classList.add("is-panning");

    if (activePointers.size === 1) beginSinglePointerPan();
    if (activePointers.size === 2) {
      const midpoint = pointerMidpoint();
      const bounds = mapScroll.getBoundingClientRect();
      pinchStart = {
        distance: pointerDistance(),
        scale: mapScale,
        contentX: (mapScroll.scrollLeft + midpoint.x - bounds.left) / mapScale,
        contentY: (mapScroll.scrollTop + midpoint.y - bounds.top) / mapScale
      };
      panStart = null;
    }
  });

  mapScroll.addEventListener("pointermove", (event) => {
    if (!activePointers.has(event.pointerId)) return;
    event.preventDefault();
    activePointers.set(event.pointerId, { x: event.clientX, y: event.clientY });

    if (activePointers.size === 2 && pinchStart) {
      const midpoint = pointerMidpoint();
      const bounds = mapScroll.getBoundingClientRect();
      const focusX = midpoint.x - bounds.left;
      const focusY = midpoint.y - bounds.top;
      const nextScale = clampMapScale(
        pinchStart.scale * (pointerDistance() / pinchStart.distance)
      );
      if (Math.abs(nextScale - mapScale) > 0.002) {
        gestureMoved = true;
        captureActivePointers();
      }
      mapScale = nextScale;
      map.style.width = `${baseMapWidth * mapScale}px`;
      map.style.minWidth = `${baseMapWidth * mapScale}px`;
      mapScroll.scrollLeft = pinchStart.contentX * mapScale - focusX;
      mapScroll.scrollTop = pinchStart.contentY * mapScale - focusY;
      updateZoomValue();
      return;
    }

    if (activePointers.size === 1 && panStart) {
      const pointer = [...activePointers.values()][0];
      const deltaX = pointer.x - panStart.x;
      const deltaY = pointer.y - panStart.y;
      if (Math.abs(deltaX) > 4 || Math.abs(deltaY) > 4) {
        gestureMoved = true;
        captureActivePointers();
      }
      mapScroll.scrollLeft = panStart.scrollLeft - deltaX;
      mapScroll.scrollTop = panStart.scrollTop - deltaY;
    }
  });

  function endMapPointer(event) {
    if (!activePointers.has(event.pointerId)) return;
    activePointers.delete(event.pointerId);
    pinchStart = null;

    if (gestureMoved) {
      suppressNextMapClick = true;
      window.setTimeout(() => { suppressNextMapClick = false; }, 350);
    }

    if (activePointers.size === 1) beginSinglePointerPan();
    if (activePointers.size === 0) {
      panStart = null;
      mapScroll.classList.remove("is-panning");
    }
  }

  mapScroll.addEventListener("pointerup", endMapPointer);
  mapScroll.addEventListener("pointercancel", endMapPointer);
  mapScroll.addEventListener("click", (event) => {
    if (!suppressNextMapClick) return;
    event.preventDefault();
    event.stopPropagation();
    suppressNextMapClick = false;
  }, true);

  mapScroll.addEventListener("wheel", (event) => {
    if (!event.ctrlKey && !event.metaKey) return;
    event.preventDefault();
    const bounds = mapScroll.getBoundingClientRect();
    setMapScale(
      mapScale * Math.exp(-event.deltaY * 0.002),
      event.clientX - bounds.left,
      event.clientY - bounds.top
    );
  }, { passive: false });

  let nativeGestureStartScale = 1;
  mapScroll.addEventListener("gesturestart", (event) => {
    event.preventDefault();
    nativeGestureStartScale = mapScale;
  }, { passive: false });
  mapScroll.addEventListener("gesturechange", (event) => {
    event.preventDefault();
    if (activePointers.size >= 2) return;
    const bounds = mapScroll.getBoundingClientRect();
    setMapScale(
      nativeGestureStartScale * event.scale,
      event.clientX - bounds.left,
      event.clientY - bounds.top
    );
  }, { passive: false });
  mapScroll.addEventListener("gestureend", (event) => {
    event.preventDefault();
  });

  zoomOut.addEventListener("click", () => setMapScale(mapScale - 0.2));
  zoomIn.addEventListener("click", () => setMapScale(mapScale + 0.2));
  zoomReset.addEventListener("click", resetMapZoom);
  mobileGalaxy.addEventListener("change", resetMapZoom);

  let resizeTimer;
  window.addEventListener("resize", () => {
    window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(resetMapZoom, 180);
  });

  resetMapZoom();
  return { reset: resetMapZoom };
}
