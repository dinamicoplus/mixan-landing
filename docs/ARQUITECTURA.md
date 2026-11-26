# Arquitectura de la web de MIXAN

Astro 5, salida estática, sin framework de interfaz. CSS propio con variables. Fuentes del sistema.
Este documento es el contrato para quien construya **Proyectos** y **Noticias** sin leer todo el código.

## Mapa de ficheros

```
src/
  layouts/Base.astro         Layout único: <head> (título, description, canonical, OG, favicons), cabecera, <main>, pie
  components/
    Cabecera.astro           Logo + menú (hamburguesa en < 900 px). Añade «Noticias» sola si hay noticias publicadas
    Pie.astro                Contacto, menú, PDF de políticas, privacidad, sello ISO
    FondoAero.astro          Fondo «Frutiger Aero» naranja/blanco para héroes y bandas destacadas
    MaquinaCimentacion.astro SVG decorativo del hero de Inicio (rama propuesta-grafico, pendiente de aprobación)
    CifrasObras.astro        4 cifras calculadas de obras.json (Inicio y Proyectos)
    VideoYoutube.astro       YouTube diferido (youtube-nocookie, solo carga al pulsar)
  data/
    sitio.ts                 Contacto, dirección, URL del mapa, PDF, menú base. ÚNICA fuente de estos datos
    obras.json               57 obras (copia de mixan-material/obras.json)
  lib/
    obras.ts                 Tipo `Obra`, `obras`, `cifrasObras()`, `formatoNumero()`
    noticias.ts              `getNoticiasPublicadas()`, `hayNoticias()`, `formatearFecha()`
  content.config.ts          Colección `noticias`
  content/noticias/          Noticias en Markdown (vacía; .gitkeep)
  pages/                     Una carpeta por ruta (`/mixpile/` → pages/mixpile/index.astro)
  styles/tokens.css          Variables (colores, tipografía, espaciado)
  styles/global.css          Reset, tipografía y utilidades compartidas
  assets/img/                Imágenes que se optimizan con <Image> (WebP, varios anchos)
public/                      Se copia tal cual: favicons y public/documentos/*.pdf
docs/ejemplo-noticia.md      Plantilla de noticia (fuera de la colección a propósito)
```

## Usar el layout

```astro
---
import Base from '../../layouts/Base.astro';
import FondoAero from '../../components/FondoAero.astro';
import foto from '../../assets/img/obra-bormujos.jpeg';
---
<Base titulo="Proyectos" descripcion="≈150 caracteres" imagen={foto}>
  <FondoAero variante="hero" aria-labelledby="t">
    <div class="contenedor">
      <div class="cristal hero-pagina">
        <p class="titulillo">Proyectos</p>
        <h1 id="t">Nuestros proyectos realizados</h1>
      </div>
    </div>
  </FondoAero>
  <section class="seccion">
    <div class="contenedor">…</div>
  </section>
</Base>
```

- `titulo` → `<title>Proyectos · MIXAN</title>`. `tituloCompleto` lo sustituye entero. `imagen` (opcional) es un import de
  `src/assets` y se recorta a 1200×630 para OG. `noIndexar` añade `noindex` y quita la canónica.
- Slot `head` para etiquetas extra: `<link slot="head" …>` (p. ej. CSS de Leaflet si no se importa desde el componente).
- Un solo `<h1>` por página, dentro del hero.
- La cabecera es `position: sticky` y mide `--alto-cabecera` (72 px). Un mapa a pantalla completa debe restarla.

## FondoAero

`<FondoAero variante="hero|banda" as="section|div|aside|header" onda={bool} class="…" {...atributos}>`.
`hero` lleva onda blanca inferior por defecto (enlaza con una sección blanca); `banda` no. El contenido va por encima
(z-index 1). El texto, dentro de una tarjeta `.cristal` (blanca translúcida) o en `--c-tinta`; **nunca texto blanco ni
naranja de marca sobre el degradado** (no cumple AA). El texto largo va fuera, sobre blanco o `.seccion--crema`.

## Clases utilitarias (global.css)

| Clase | Uso |
|---|---|
| `.contenedor` / `.contenedor--texto` | Ancho máximo 72 rem / 44 rem con gutter lateral (16 px en móvil, 32 px desde 768 px) |
| `.seccion`, `.seccion--crema`, `.seccion--compacta` | Bloque vertical con relleno; fondo crema alterno |
| `.titulillo` | Rótulo en versalitas naranja sobre un título |
| `.entradilla` | Párrafo de entrada, 18 px |
| `.prosa` | Texto largo (ancho de lectura) |
| `.rejilla` | Rejilla automática de tarjetas (mín. 15 rem) |
| `.pareja`, `.pareja--invertida` | Dos columnas desde 900 px (texto + imagen); `--invertida` cambia el orden |
| `.tarjeta` | Tarjeta blanca con borde y sombra |
| `.cristal` | Tarjeta translúcida para usar sobre FondoAero |
| `.hero-pagina` | Relleno y ancho de la tarjeta del hero (con `.cristal`) |
| `.boton`, `.boton--claro`, `.boton--borde`, `.botones` | Botones (mín. 44 px de alto) y su grupo |
| `.foto` | Imagen redondeada con sombra |
| `.visualmente-oculto` | Solo para lectores de pantalla |

Nombres de clase en español y en minúsculas; componentes con BEM ligero (`bloque__elemento--variante`), estilos del
componente en su `<style>` (Astro los aísla). Para estilar un hijo generado por `<Image>` usar `:global(.clase)`.

## Variables CSS (tokens.css)

- Colores: `--c-naranja` (#e67717, adornos y fondos), `--c-naranja-oscuro` (#a9530a, **texto/enlaces naranjas y fondo de
  botón con texto blanco**), `--c-naranja-claro` (sobre fondo oscuro), `--c-naranja-suave`, `--c-gris`, `--c-tinta`,
  `--c-texto-suave`, `--c-linea`, `--c-blanco`, `--c-crema`.
- Tipografía: `--f-base`, `--fs-0`…`--fs-5` (14 px … h1 fluido), `--lh-base`, `--lh-titulo`.
- Espaciado: `--e-1`…`--e-9` (4 px … 96 px). Maquetación: `--ancho-max`, `--ancho-texto`, `--gutter`, `--radio`,
  `--radio-grande`, `--sombra`, `--sombra-cristal`, `--alto-cabecera`, `--foco`.
- No escribir colores ni tamaños sueltos: si falta uno, añadirlo a `tokens.css`.

## Datos e imágenes

- **Obras**: `src/data/obras.json`; importar desde `src/lib/obras.ts` (`obras`, tipo `Obra`). `tecnica` es `null` casi
  siempre: mostrarla solo si existe; no deducirla. Las cifras de Inicio salen de `cifrasObras()`; si cambia el JSON,
  cambian solas. `provincia` incluye Ceuta y Melilla (por eso el rótulo dice «provincias y ciudades autónomas»).
- **Noticias**: un `.md` por noticia en `src/content/noticias/` con el esquema de `content.config.ts`
  (`titulo`, `fecha`, `resumen`, `imagen?` relativa al `.md`, `borrador?`). Leer SIEMPRE con `getNoticiasPublicadas()`,
  que excluye borradores y ordena por fecha descendente. `/noticias/` está en `pages/noticias/[...pagina].astro`:
  `getStaticPaths` devuelve `[]` si no hay noticias, así que la ruta no se genera; menú y pie usan `hayNoticias()`.
  Las páginas de detalle (`/noticias/<id>/`) deben seguir el mismo patrón (rutas desde `getNoticiasPublicadas()`).
  Con la carpeta vacía, el build da un único aviso esperado: `[glob-loader] No files found … src/content/noticias`.
- **Imágenes**: originales en `src/assets/img/` (nombres en español, sin prefijo de fecha) y siempre con `<Image>`
  de `astro:assets` con `alt` descriptivo (o `alt=""` si es decorativa) y `widths`/`sizes` o `densities`.
  Solo material de `/home/claude/mixan-material/media/`; nada inventado. No subir imágenes que no se usen.
- **PDF y ficheros servidos tal cual**: `public/documentos/` (rutas en `src/data/sitio.ts → documentos`).
- **Leaflet** (Proyectos): paquete npm empaquetado localmente, teselas de OpenStreetMap con atribución visible, sin
  claves. Cargar su JS en un `<script>` del componente (Astro lo empaqueta) e importar `leaflet/dist/leaflet.css`.

## Marcadores para los siguientes agentes

- `src/pages/proyectos/index.astro`: `<!-- PROYECTOS: lo implementa el agente 2 -->` (listado provisional).
- `src/pages/noticias/[...pagina].astro`: `<!-- NOTICIAS: lo implementa el agente 3 -->` (listado provisional).

## Despliegue

`firebase.json` publica `dist/` con `cleanUrls` y `trailingSlash: true`; redirecciones 301 de las URL antiguas
(`/solutions/`, `/about-us/`, `/projects/`, `/contact/` y los PDF de `/wp-content/uploads/…`); HTML `no-cache`,
`/_astro/**` inmutable 1 año, PDF/PNG 1 día. Una ruta nueva no necesita tocar `firebase.json`.
