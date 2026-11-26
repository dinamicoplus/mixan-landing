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

Todo lo de `/proyectos/` (cifras, mapa, filtros, listado) y las obras destacadas de Inicio sale de
`src/data/obras.json`. No hay que tocar código.

1. Abrir `src/data/obras.json` y añadir un objeto al final de la lista (antes del `]`), separado del anterior
   por una coma, con el `id` siguiente al último (hoy el último es 57):

   ```json
   {
    "id": 58,
    "nombre": "Nave industrial. Polígono Guadalhorce. Málaga",
    "provincia": "Málaga",
    "lat": 36.6926,
    "lon": -4.4711,
    "cliente": "Nombre del cliente",
    "anio": 2026,
    "metros": 1234,
    "tecnica": null,
    "tecnica_indicada": false,
    "detalle": null,
    "texto_original": ""
   }
   ```

   - `nombre`: como se quiera ver en la web (lugar incluido: «… Antequera (Málaga)»).
   - `provincia`: nombre de la provincia tal como ya aparece en otras obras (`Málaga`, `Las Palmas`, `A Coruña`,
     `Ceuta`, `Melilla`…). Una provincia nueva aparece sola en el filtro y en las cifras.
   - `lat` / `lon`: grados decimales con punto. En Google Maps, clic derecho sobre la obra → se copian
     «36.6926, -4.4711»: el primero es `lat`, el segundo `lon`.
   - `cliente`: texto o `null`. `anio`: número (sin comillas). `metros`: metros lineales, número con punto
     decimal si hace falta (`3038.8`), sin separador de miles; la web lo muestra como «3.038,8 m».
   - `tecnica`: `null` si no consta (no suponerla). Si consta, por ejemplo `"Mixpile®"`, `"Micropilotes"` o
     `"Pilotes"`, y `"tecnica_indicada": true`. `detalle`: texto libre o `null` (no se muestra).
   - `texto_original`: `""` en obras nuevas (en las 57 originales guarda el texto de la web antigua; no tocarlo).
2. Opcional, **fotos reales** de la obra: copiar las imágenes (JPG/PNG/WebP, cualquier tamaño; la web las
   optimiza) a `src/assets/img/obras/` con nombres en minúsculas y guiones, y añadir a la obra
   `"fotos": ["nave-guadalhorce-1.jpg", "nave-guadalhorce-2.jpg"]` (la primera es la principal).
   Si un nombre no existe, la compilación falla avisando de qué obra y qué foto.
3. Opcional, `"descripcion": "Texto breve de la obra."` (se muestra en su ficha).
4. Comprobar con `npm run build` (o `npm run dev` y abrir http://localhost:4321/proyectos/). Un error de JSON
   (coma de más o de menos) hace fallar la compilación indicando la línea.

Las cifras (n.º de obras, metros, años, provincias), los filtros, el mapa y las 4 obras destacadas de Inicio (las
de mayor medición) se recalculan solos. Las correcciones aplicadas a los datos originales y las dudas pendientes
para MIXAN están en [`docs/DATOS-OBRAS.md`](docs/DATOS-OBRAS.md).

## Añadir una noticia

Guía paso a paso para hacerlo desde la web de GitHub (sin instalar nada):
[`docs/COMO-PUBLICAR-UNA-NOTICIA.md`](docs/COMO-PUBLICAR-UNA-NOTICIA.md). Resumen:

1. Subir las fotos (si las hay) a `src/assets/img/noticias/` (nombres en minúsculas, sin espacios ni acentos).
2. Crear `src/content/noticias/<nombre-corto>.md` a partir de [`docs/ejemplo-noticia.md`](docs/ejemplo-noticia.md).
   El nombre del fichero es la dirección: `/noticias/<nombre-corto>/`.
3. Rellenar `titulo`, `fecha` (AAAA-MM-DD) y `resumen`; opcionales: `imagen` + `imagenAlt` (foto de cabecera,
   ruta `../../assets/img/noticias/foto.jpg`) y `galeria` (lista de `imagen` + `alt`).
4. `borrador: true` la guarda sin publicarla; `false` (o sin la línea) la publica.

Con al menos una noticia publicada se generan solos: «Noticias» en el menú y el pie, `/noticias/` (9 por página:
`/noticias/2/`…), `/noticias/<nombre>/`, el canal RSS `/noticias/rss.xml` (anunciado en el `<head>`) y el bloque
«Últimas noticias» (`src/components/UltimasNoticias.astro`) allí donde esté colocado. Sin ninguna, no existe
nada de eso. Los borradores no se generan en ningún caso.
Una foto mal escrita o un campo obligatorio vacío hacen fallar la compilación con un mensaje que indica el fichero.

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
