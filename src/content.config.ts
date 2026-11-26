// Colecciones de contenido. Hoy solo «noticias» (vacía hasta que se publique la primera).
// Cada noticia es un fichero Markdown en src/content/noticias/ (ver docs/ejemplo-noticia.md).
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const noticias = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/noticias' }),
  schema: ({ image }) =>
    z.object({
      titulo: z.string(),
      fecha: z.coerce.date(),
      resumen: z.string(),
      imagen: image().optional(),
      borrador: z.boolean().optional().default(false),
    }),
});

export const collections = { noticias };
