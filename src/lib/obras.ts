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
  texto_original: string;
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
