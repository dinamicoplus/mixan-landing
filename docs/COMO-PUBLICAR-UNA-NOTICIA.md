# Cómo publicar una noticia en www.mixan.es

Guía para hacerlo **desde la web de GitHub**, sin instalar nada. Tiempo aproximado: 10 minutos.

> **Importante:** todo lo que se guarda en la rama `main` se publica solo en www.mixan.es en unos 2–3 minutos.
> Si quiere preparar la noticia sin que se vea todavía, déjela en **borrador** (paso 3) y publíquela más tarde.

Mientras no haya ninguna noticia publicada, la sección «Noticias» no aparece en la web. En cuanto publique la
primera, aparecen solas la opción «Noticias» del menú, la página `/noticias/`, la página de la noticia y el canal RSS.

---

## Antes de empezar

- Necesita una cuenta de GitHub con permiso de escritura en el repositorio `dinamicoplus/mixan-landing`.
- Tenga a mano el texto y las fotos.
- **Nombres de fichero**: en minúsculas, sin espacios, sin acentos ni eñes, con guiones.
  Bien: `obra-hospital-malaga-2026.jpg`. Mal: `Foto Obra Málaga (1).JPG`.
- Fotos en JPG, PNG o WebP. Sirven las de la cámara o el móvil tal cual (hasta 25 MB cada una):
  la web las reduce y optimiza sola.

GitHub está en inglés; abajo se indica entre comillas el texto exacto de cada botón.

---

## Paso 1. Subir las fotos (si la noticia lleva fotos)

1. Abra https://github.com/dinamicoplus/mixan-landing y compruebe que arriba a la izquierda pone la rama `main`.
2. Entre en las carpetas `src` → `assets` → `img` → `noticias`.
3. Pulse **«Add file»** → **«Upload files»**.
4. Arrastre las fotos a la ventana (o pulse «choose your files»).
5. Abajo, en el cuadro de texto, escriba una frase como `Fotos de la noticia de la obra de Málaga`.
6. Pulse **«Commit changes»**.

Apunte el nombre exacto de cada foto: lo necesitará en el paso 2.

## Paso 2. Crear la noticia

1. Vuelva a la portada del repositorio y entre en `src` → `content` → `noticias`.
2. Pulse **«Add file»** → **«Create new file»**.
3. En «Name your file…» escriba el nombre de la noticia terminado en `.md`, por ejemplo
   `obra-hospital-malaga.md`. **Ese nombre será la dirección de la noticia**:
   `www.mixan.es/noticias/obra-hospital-malaga/`. Use minúsculas y guiones; no use solo números
   (como `2.md`) ni el nombre `rss`.
4. Copie en el cuadro grande la plantilla del final de esta guía (o la de `docs/ejemplo-noticia.md`) y rellénela.
5. Pulse **«Commit changes…»**, escriba una frase como `Noticia: obra del hospital de Málaga` y confirme con
   **«Commit changes»**.

En 2–3 minutos estará publicada. Puede ver el progreso en la pestaña **«Actions»** del repositorio:
un círculo amarillo significa «publicando», una marca verde «publicado».

## Paso 3. Qué poner en cada campo

La parte de arriba, entre las dos líneas `---`, son los datos de la noticia. Cada línea es `campo: valor`.

| Campo | ¿Obligatorio? | Qué poner |
|---|---|---|
| `titulo` | Sí | El titular, entre comillas. |
| `fecha` | Sí | Fecha de publicación en formato `AAAA-MM-DD` (p. ej. `2026-09-09`). Ordena el listado: la más reciente sale primero. En la web se muestra como «9 de septiembre de 2026». |
| `resumen` | Sí | Una o dos frases, entre comillas. Sale en el listado, al compartir en redes y en buscadores. |
| `imagen` | No | Foto principal (cabecera de la noticia y tarjeta del listado). Siempre `../../assets/img/noticias/` seguido del nombre exacto de la foto. |
| `imagenAlt` | Si hay `imagen` | Descripción breve de la foto para personas ciegas, entre comillas: qué se ve, no «foto de…». |
| `galeria` | No | Lista de fotos que se muestran al final, en cuadrícula; al pulsar una se amplía. Cada foto lleva dos líneas: `- imagen:` y `alt:` (ver el ejemplo; respete los espacios del principio). |
| `borrador` | No | `true` = no se publica (no aparece en ningún sitio de la web). Para publicarla, cambie a `false` o borre la línea. |

Debajo de la segunda línea `---` va el **texto de la noticia**:

- Párrafos separados por una línea en blanco.
- `## Subtítulo` para un subtítulo.
- `**texto**` para **negrita**.
- `- elemento` para listas.
- `[texto del enlace](https://direccion.com)` para enlaces (a páginas de la propia web: `[Mixpile®](/mixpile/)`).

**Comillas:** ponga entre comillas dobles `"…"` el título, el resumen y los textos `alt`. Si el texto lleva
comillas dobles dentro, use las españolas «…» en su lugar.

## Ejemplo completo

Fichero `src/content/noticias/ejemplo-de-noticia.md`. Los textos son de relleno: solo muestran el formato.

```markdown
---
titulo: "Título de ejemplo: cuente aquí la novedad en una línea"
fecha: 2026-09-09
resumen: "Resumen de ejemplo: una o dos frases que expliquen la noticia: qué, dónde y cuándo."
imagen: ../../assets/img/noticias/obra-ejemplo-portada.jpg
imagenAlt: "Descripción de la foto principal: qué se ve en ella"
galeria:
  - imagen: ../../assets/img/noticias/obra-ejemplo-1.jpg
    alt: "Descripción de la primera foto de la galería"
  - imagen: ../../assets/img/noticias/obra-ejemplo-2.jpg
    alt: "Descripción de la segunda foto de la galería"
borrador: false
---

Primer párrafo de la noticia. Cuente qué se ha hecho, dónde y para quién.

## Cómo lo hicimos

Segundo párrafo con más detalle. Puede enlazar a [nuestro sistema Mixpile®](/mixpile/).

- Un dato importante.
- Otro dato importante.
```

## Dejarla en borrador, publicarla más tarde o corregirla

- **Borrador:** ponga `borrador: true`. La noticia queda guardada pero no aparece en la web.
- **Publicar un borrador:** abra el fichero en GitHub, pulse el lápiz (**«Edit this file»**), cambie a
  `borrador: false` y pulse **«Commit changes»**.
- **Corregir una noticia:** igual: lápiz, cambiar el texto, «Commit changes».
- **Retirar una noticia:** póngala en borrador (recomendado) o bórrela con el menú «…» → **«Delete file»**.
  Si era la única noticia publicada, la sección «Noticias» desaparece sola del menú.
- **Cambiar una foto:** suba la nueva (paso 1) y cambie su nombre en la noticia.

## Si algo sale mal

Si en la pestaña **«Actions»** aparece una **cruz roja**, la web no se ha actualizado (sigue como estaba, no se
rompe nada). Las causas habituales:

- El nombre de una foto en la noticia no coincide exactamente con el fichero subido (mayúsculas, extensión
  `.jpg`/`.jpeg`, guiones).
- Falta el `titulo`, la `fecha` o el `resumen`, o la fecha no tiene el formato `AAAA-MM-DD`.
- Faltan las comillas en un texto que contiene `:` o falta un espacio al principio de las líneas de `galeria`.
- En `galeria`, una foto sin su línea `alt:`.

Corrija el fichero con el lápiz y vuelva a guardar. Si no encuentra el error, pulse en la cruz roja → en el paso
«Build» se ve un mensaje en inglés que indica el fichero y el campo que fallan.
