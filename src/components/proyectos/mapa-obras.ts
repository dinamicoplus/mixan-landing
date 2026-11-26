/**
 * Mapa de obras (Leaflet + leaflet.markercluster). Se carga de forma diferida desde ExploradorObras.astro
 * con import() cuando el mapa se acerca a la pantalla, así que no bloquea el primer pintado.
 * Teselas de OpenStreetMap (sin claves) con atribución visible.
 */
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet.markercluster/dist/MarkerCluster.css';

export type ObraMapa = {
  id: number;
  nombre: string;
  provincia: string;
  cliente: string | null;
  anio: number | null;
  metros: string | null; // ya formateado («20.700 m»)
  tecnica: string | null;
  lat: number;
  lon: number;
};

export type ControlMapa = {
  filtrar: (visibles: Set<number>, encuadrar: boolean) => void;
  mostrar: (id: number) => void;
  invalidar: () => void;
};

/** Península, Baleares, Canarias, Ceuta y Melilla. */
const ESPANA: L.LatLngBoundsExpression = [
  [27.55, -18.25],
  [43.85, 4.4],
];

const escapar = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c] as string);

function contenidoPopup(o: ObraMapa) {
  const filas: [string, string | number | null][] = [
    ['Provincia', o.provincia],
    ['Cliente', o.cliente],
    ['Año', o.anio],
    ['Medición', o.metros],
    ['Técnica', o.tecnica], // solo si consta
  ];
  const datos = filas
    .filter(([, v]) => v !== null && v !== '')
    .map(([k, v]) => `<div><dt>${k}</dt><dd>${escapar(String(v))}</dd></div>`)
    .join('');
  return `<div class="popup-obra">
    <h3 class="popup-obra__titulo">${escapar(o.nombre)}</h3>
    <dl class="popup-obra__datos">${datos}</dl>
    <a class="popup-obra__enlace" href="#obra-${o.id}" data-ir-ficha="${o.id}">Ver la ficha en el listado</a>
  </div>`;
}

function icono(o: ObraMapa, activo = false) {
  return L.divIcon({
    className: `marcador-obra${activo ? ' marcador-obra--activo' : ''}`,
    html: `<span class="marcador-obra__punto" aria-hidden="true"></span><span class="visualmente-oculto">${escapar(o.nombre)}</span>`,
    iconSize: [26, 26],
    iconAnchor: [13, 13],
    popupAnchor: [0, -12],
  });
}

export function iniciarMapa(
  contenedor: HTMLElement,
  datos: ObraMapa[],
  alSeleccionar: (id: number) => void,
): ControlMapa {
  const mapa = L.map(contenedor, {
    zoomControl: false,
    scrollWheelZoom: false, // se activa al interactuar con el mapa (no secuestra el scroll de la página)
    zoomSnap: 0.25,
    minZoom: 3,
    maxZoom: 18,
    keyboard: true,
  });
  mapa.attributionControl.setPrefix('<a href="https://leafletjs.com" hreflang="en">Leaflet</a>');
  L.control.zoom({ position: 'topleft', zoomInTitle: 'Acercar', zoomOutTitle: 'Alejar' }).addTo(mapa);
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">colaboradores de OpenStreetMap</a>',
  }).addTo(mapa);
  mapa.fitBounds(ESPANA, { padding: [8, 8] });

  // Rueda del ratón: solo después de pulsar o enfocar el mapa; se desactiva al salir.
  const activarRueda = () => mapa.scrollWheelZoom.enable();
  mapa.on('click focus', activarRueda);
  mapa.on('blur', () => mapa.scrollWheelZoom.disable());
  contenedor.addEventListener('mouseleave', () => mapa.scrollWheelZoom.disable());

  const grupo = L.markerClusterGroup({
    showCoverageOnHover: false,
    spiderfyOnMaxZoom: true, // obras con las mismas coordenadas (p. ej. 9 y 19) se despliegan en abanico
    maxClusterRadius: 48,
    iconCreateFunction: (c) => {
      const n = c.getChildCount();
      const tam = n < 10 ? 38 : n < 25 ? 44 : 50;
      return L.divIcon({
        className: 'grupo-obras',
        html: `<span aria-hidden="true">${n}</span><span class="visualmente-oculto">${n} obras agrupadas. Pulsa para acercar</span>`,
        iconSize: [tam, tam],
      });
    },
  });

  const marcadores = new Map<number, L.Marker>();
  let activo: number | null = null;

  for (const o of datos) {
    const m = L.marker([o.lat, o.lon], { icon: icono(o), keyboard: true, riseOnHover: true });
    m.bindPopup(contenidoPopup(o), { maxWidth: 300, minWidth: 220, autoPanPadding: [24, 24] });
    m.on('click', () => {
      resaltar(o.id);
      alSeleccionar(o.id);
    });
    marcadores.set(o.id, m);
  }
  grupo.addLayers([...marcadores.values()]);
  mapa.addLayer(grupo);

  function resaltar(id: number | null) {
    if (activo !== null) {
      const previo = datos.find((d) => d.id === activo);
      if (previo) marcadores.get(activo)?.setIcon(icono(previo));
    }
    activo = id;
    if (id !== null) {
      const o = datos.find((d) => d.id === id);
      const m = marcadores.get(id);
      if (o && m) {
        m.setIcon(icono(o, true));
        m.setZIndexOffset(1000);
      }
    }
  }

  // Popups en español y con foco gestionable.
  mapa.on('popupopen', (e) => {
    const el = e.popup.getElement();
    el?.querySelector('.leaflet-popup-close-button')?.setAttribute('aria-label', 'Cerrar');
    el?.querySelector('.leaflet-popup-close-button')?.setAttribute('title', 'Cerrar');
  });
  mapa.on('popupclose', () => resaltar(null));

  return {
    filtrar(visibles, encuadrar) {
      const capas = [...marcadores.entries()].filter(([id]) => visibles.has(id)).map(([, m]) => m);
      mapa.closePopup();
      grupo.clearLayers();
      grupo.addLayers(capas);
      if (!encuadrar || capas.length === 0) {
        mapa.fitBounds(ESPANA, { padding: [8, 8] });
      } else {
        const limites = L.latLngBounds(capas.map((m) => m.getLatLng()));
        mapa.fitBounds(limites, { padding: [40, 40], maxZoom: 11 });
      }
    },
    mostrar(id) {
      const m = marcadores.get(id);
      if (!m || !grupo.hasLayer(m)) return;
      resaltar(id);
      grupo.zoomToShowLayer(m, () => m.openPopup());
    },
    invalidar() {
      mapa.invalidateSize();
    },
  };
}
