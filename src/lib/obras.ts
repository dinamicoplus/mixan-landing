import obrasJson from '../data/obras.json';

export type Obra = {
  id: number;
  nombre: string;
  provincia: string;
  lat: number;
  lon: number;
  cliente: string | null;
  anio: number | null;
  metros: number | null;
  /** null salvo cuando el origen la indicaba: no suponer técnica. */
  tecnica: string | null;
  tecnica_indicada: boolean;
  detalle: string | null;
  /** Texto tal como venía en la web antigua. No se modifica nunca (trazabilidad). */
  texto_original: string;
  /**
   * Opcional. Fotos reales de la obra: nombres de fichero (o rutas relativas) dentro de
   * `src/assets/img/obras/`, p. ej. `["colinas-del-limonar-1.jpg"]`. La primera es la principal.
   */
  fotos?: string[];
  /** Opcional. Descripción breve de la obra facilitada por MIXAN (texto plano). */
  descripcion?: string;
};

export const obras = obrasJson as Obra[];

/** Cifras derivadas de obras.json, calculadas en compilación. */
export function cifrasObras(lista: Obra[] = obras) {
  const anios = lista.map((o) => o.anio).filter((a): a is number => typeof a === 'number');
  const metros = lista.reduce((s, o) => s + (typeof o.metros === 'number' ? o.metros : 0), 0);
  const provincias = new Set(lista.map((o) => o.provincia).filter(Boolean));
  return {
    numObras: lista.length,
    metrosTotales: Math.round(metros),
    anioMin: anios.length ? Math.min(...anios) : null,
    anioMax: anios.length ? Math.max(...anios) : null,
    numProvincias: provincias.size,
  };
}

export const formatoNumero = (n: number) => n.toLocaleString('es-ES');

/**
 * Metros lineales en formato español: 20.700 m · 3.038,8 m · 1.767 m.
 * Se agrupan también las cifras de cuatro dígitos (es-ES no lo hace por defecto) para que el
 * listado sea homogéneo, como en los textos de la web antigua («3.402 m.l.»).
 */
export const formatoMetros = (n: number) =>
  `${new Intl.NumberFormat('es-ES', { maximumFractionDigits: 2, useGrouping: 'always' } as Intl.NumberFormatOptions).format(n)} m`;

/** Orden por defecto del listado: año descendente y, a igualdad, por nombre. */
export const ordenPorAnio = (a: Obra, b: Obra) =>
  (b.anio ?? 0) - (a.anio ?? 0) || a.nombre.localeCompare(b.nombre, 'es');

/**
 * Obras destacadas de la portada. Criterio objetivo: las `n` de mayor medición (metros lineales);
 * a igualdad, la más reciente. Si cambia obras.json, la selección cambia sola.
 */
export function obrasDestacadas(n = 4, lista: Obra[] = obras) {
  return [...lista]
    .filter((o) => typeof o.metros === 'number')
    .sort((a, b) => (b.metros ?? 0) - (a.metros ?? 0) || (b.anio ?? 0) - (a.anio ?? 0))
    .slice(0, n);
}

export { normalizarTexto } from './texto';
