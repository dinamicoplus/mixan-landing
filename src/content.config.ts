// Colecciones de contenido. Hoy solo «noticias» (vacía hasta que se publique la primera).
// Cada noticia es un fichero Markdown en src/content/noticias/ (guía: docs/COMO-PUBLICAR-UNA-NOTICIA.md,
// plantilla: docs/ejemplo-noticia.md). Las fotos van en src/assets/img/noticias/ y se escriben con una ruta
// relativa al .md: «../../assets/img/noticias/mi-foto.jpg». Astro las comprueba y optimiza al compilar.
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const noticias = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/noticias' }),
  schema: ({ image }) =>
    z.object({
      /** Título de la noticia (h1 de su página y título del listado). */
      titulo: z.string().min(1),
      /** Fecha de publicación, AAAA-MM-DD. Ordena el listado (la más reciente primero). */
      fecha: z.coerce.date(),
      /** Una o dos frases: listado, meta description, RSS. */
      resumen: z.string().min(1),
      /** Foto de cabecera (opcional). También se usa en la tarjeta del listado y al compartir. */
      imagen: image().optional(),
      /** Descripción de la foto de cabecera para personas que no la ven. */
      imagenAlt: z.string().optional(),
      /** Galería de fotos al final de la noticia (opcional). */
      galeria: z
        .array(
          z.object({
            imagen: image(),
            alt: z.string().min(1, 'Cada foto de la galería necesita su texto «alt».'),
          }),
        )
        .optional(),
      /** Con true la noticia no se publica (ni página, ni listado, ni RSS, ni menú). */
      borrador: z.boolean().optional().default(false),
    }),
});

export const collections = { noticias };
