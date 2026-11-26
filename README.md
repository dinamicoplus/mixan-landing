# Web de MIXAN (www.mixan.es)

Web pública de MIXAN Mix Andalucía, S.L. Sitio estático hecho con [Astro 5](https://astro.build), publicado en
Firebase Hosting. Convenciones internas (layout, estilos, datos): [`docs/ARQUITECTURA.md`](docs/ARQUITECTURA.md).

## Desarrollo

Requisitos: Node 22 (vale ≥ 20.3) y npm.

```bash
npm ci            # instala dependencias (exactas, según package-lock.json)
npm run dev       # servidor local con recarga en http://localhost:4321
npm run build     # compila la web en dist/
npm run preview   # sirve dist/ para revisarla
```

Con la carpeta de noticias vacía, `npm run build` muestra un único aviso esperado:
`[glob-loader] No files found matching "**/*.md" in directory "src/content/noticias"`.

## Añadir una obra (Proyectos)

Editar `src/data/obras.json` y añadir un objeto al final con el siguiente `id`:

```json
{
  "id": 58,
  "nombre": "Nombre de la obra",
  "provincia": "Málaga",
  "lat": 36.72, "lon": -4.42,
  "cliente": "Cliente",
  "anio": 2026,
  "metros": 1234,
  "tecnica": null,
  "tecnica_indicada": false,
  "detalle": null,
  "texto_original": ""
}
```

- `lat`/`lon`: coordenadas en grados decimales (clic derecho en Google Maps → copiar coordenadas).
- `tecnica`: `null` si no se sabe; si se indica, por ejemplo `"Mixpile®"`, `"Micropilotes"` o `"Pilotes"`, y `tecnica_indicada: true`.
- Las cifras de Inicio (n.º de obras, metros, años, provincias) se recalculan solas al compilar.

## Añadir una noticia

1. Copiar `docs/ejemplo-noticia.md` a `src/content/noticias/<nombre-corto>.md` (minúsculas y guiones, sin acentos).
2. Rellenar `titulo`, `fecha` (AAAA-MM-DD) y `resumen`; `imagen` es opcional (ruta relativa al fichero, p. ej.
   `./imagenes/foto.jpg`, guardando la foto en `src/content/noticias/imagenes/`).
3. Quitar `borrador: true` (o poner `false`) para publicarla.

En cuanto exista una noticia publicada aparecen «Noticias» en el menú y la página `/noticias/`; sin ninguna, no existen.

## Publicación

Firebase Hosting, proyecto `mixan-landing-91b5c`, servido en https://www.mixan.es y https://mixan.es
(DNS en DonDominio; la copia de la zona anterior está fuera del repositorio).

**Automática:** cada push a `main` compila (`npm ci && npm run build`) y publica `dist/` con GitHub Actions
(`.github/workflows/firebase-hosting.yml`). Otras ramas no publican. Requiere el secreto
`FIREBASE_SERVICE_ACCOUNT_MIXAN_LANDING_91B5C`, que se crea una sola vez desde Cloud Shell:

```bash
cd ~/mixan-landing && git pull
firebase init hosting:github --project mixan-landing-91b5c
```

**Manual** (si Actions falla):

```bash
npm ci && npm run build
firebase deploy --only hosting --project mixan-landing-91b5c
```

`firebase.json` define `cleanUrls`, barra final, las redirecciones 301 de las direcciones de la web antigua
(`/solutions/` → `/mixpile/`, `/about-us/` → `/quienes-somos/`, `/projects/` → `/proyectos/`, `/contact/` → `/contacto/`
y los PDF de `/wp-content/uploads/…`) y la caché (HTML sin caché; `/_astro/**` inmutable).
