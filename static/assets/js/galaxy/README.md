# Galaxy code map

The browser starts at `../galaxy.js`. That file connects the smaller modules and
owns the shared filter state. The archive remains the source of truth; categories
and tags are discovered from the page data instead of being hardcoded here.

- `model.js` turns writing and note data into nodes, categories, and topics.
- `layout.js` calculates where category systems begin on the map.
- `map.js` creates the SVG objects, links, labels, and tooltips.
- `motion.js` moves complete category systems around the DAVEADS core.
- `fullscreen.js` owns native fullscreen and its browser fallback.
- `viewport.js` owns zooming, dragging, mouse-wheel, and touch gestures.
- `ui.js` owns filter controls, counts, and list-view markup.
- `utils.js` contains shared SVG and deterministic-number helpers.

Galaxy CSS follows the same pattern under `assets/css/galaxy/`: base interface,
map, list, and responsive rules are separate, while `assets/css/galaxy.css`
only loads them in the original cascade order.

When changing behavior, keep shared state and event wiring in `../galaxy.js` and
put the implementation in the module responsible for that behavior.
