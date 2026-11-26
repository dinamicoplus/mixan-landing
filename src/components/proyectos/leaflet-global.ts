/**
 * leaflet.markercluster 1.5 es un módulo UMD que espera `L` global. Este módulo expone Leaflet en
 * `window.L` antes de que se evalúe el plugin (los import se evalúan en orden).
 */
import L from 'leaflet';

(window as unknown as { L: typeof L }).L = L;

export default L;
