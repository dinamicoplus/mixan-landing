/** Texto sin tildes y en minúsculas, para búsquedas. Módulo sin datos: se puede importar en el cliente. */
export const normalizarTexto = (s: string) =>
  s.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase();
