// Canal RSS de noticias: /noticias/rss.xml.
// Es una ruta dinámica a propósito: getStaticPaths devuelve [] si no hay noticias publicadas,
// así que el canal no existe hasta la primera noticia (y Base.astro solo lo anuncia entonces).
import rss from '@astrojs/rss';
import type { APIContext, GetStaticPaths } from 'astro';
import { empresa } from '../../data/sitio';
import { getNoticiasPublicadas, urlNoticia } from '../../lib/noticias';

export const getStaticPaths = (async () => {
  return (await getNoticiasPublicadas()).length > 0 ? [{ params: { canal: 'rss' } }] : [];
}) satisfies GetStaticPaths;

export async function GET(context: APIContext) {
  const noticias = await getNoticiasPublicadas();
  return rss({
    title: `Noticias de ${empresa.nombre}`,
    description: `Noticias de ${empresa.razonSocial}: obras, novedades y actualidad de la empresa.`,
    site: context.site!,
    trailingSlash: true,
    customData: '<language>es-es</language>',
    items: noticias.map((n) => ({
      title: n.data.titulo,
      description: n.data.resumen,
      pubDate: n.data.fecha,
      link: urlNoticia(n),
    })),
  });
}
