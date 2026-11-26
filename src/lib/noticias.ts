import { getCollection, type CollectionEntry } from 'astro:content';

export type Noticia = CollectionEntry<'noticias'>;

/** Noticias publicadas (sin borradores), de la más reciente a la más antigua. */
// Ficheros presentes en la colección (se comprueba antes de getCollection para no
// llenar el registro de compilación con avisos de «colección vacía» mientras no haya noticias).
const ficheros = import.meta.glob('/src/content/noticias/**/*.md');

export async function getNoticiasPublicadas(): Promise<Noticia[]> {
  if (Object.keys(ficheros).length === 0) return [];
  const todas = await getCollection('noticias', ({ data }) => !data.borrador);
  return todas.sort((a, b) => b.data.fecha.getTime() - a.data.fecha.getTime());
}

/** true si hay al menos una noticia publicada (controla menú y generación de /noticias/). */
export async function hayNoticias(): Promise<boolean> {
  return (await getNoticiasPublicadas()).length > 0;
}

export function formatearFecha(fecha: Date): string {
  return fecha.toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Europe/Madrid' });
}
