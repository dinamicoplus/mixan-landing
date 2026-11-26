import { getCollection, type CollectionEntry } from 'astro:content';

export type Noticia = CollectionEntry<'noticias'>;

/** Noticias por página en /noticias/, /noticias/2/… */
export const NOTICIAS_POR_PAGINA = 9;

// Ficheros presentes en la colección (se comprueba antes de getCollection para no
// llenar el registro de compilación con avisos de «colección vacía» mientras no haya noticias).
const ficheros = import.meta.glob('/src/content/noticias/**/*.md');

/** Noticias publicadas (sin borradores), de la más reciente a la más antigua. */
export async function getNoticiasPublicadas(): Promise<Noticia[]> {
  if (Object.keys(ficheros).length === 0) return [];
  const todas = await getCollection('noticias', ({ data }) => !data.borrador);
  // Misma fecha: orden alfabético inverso del identificador, para que el orden sea estable entre compilaciones.
  return todas.sort((a, b) => b.data.fecha.getTime() - a.data.fecha.getTime() || b.id.localeCompare(a.id));
}

/** true si hay al menos una noticia publicada (controla menú, RSS y generación de /noticias/). */
export async function hayNoticias(): Promise<boolean> {
  return (await getNoticiasPublicadas()).length > 0;
}

/** «9 de septiembre de 2026» */
export function formatearFecha(fecha: Date): string {
  return fecha.toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Europe/Madrid' });
}

/** «2026-09-09» para el atributo datetime de <time>. */
export function fechaIso(fecha: Date): string {
  return fecha.toISOString().slice(0, 10);
}

/** Dirección de la página de una noticia. */
export function urlNoticia(noticia: Noticia): string {
  return `/noticias/${noticia.id}/`;
}

/** Dirección de la página n.º `n` del listado (1 → /noticias/). */
export function urlPaginaNoticias(n: number): string {
  return n <= 1 ? '/noticias/' : `/noticias/${n}/`;
}

/** Dirección del canal RSS (solo existe si hay noticias). */
export const URL_RSS = '/noticias/rss.xml';
