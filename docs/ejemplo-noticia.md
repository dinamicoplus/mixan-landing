---
# PLANTILLA DE NOTICIA. Guía paso a paso: docs/COMO-PUBLICAR-UNA-NOTICIA.md
# Copie este contenido en un fichero nuevo src/content/noticias/<nombre-de-la-noticia>.md
# (minúsculas y guiones; el nombre será la dirección /noticias/<nombre-de-la-noticia>/).
# Las líneas que empiezan por # son comentarios: puede dejarlas o borrarlas.
titulo: "Título de la noticia"
fecha: 2026-11-26          # AAAA-MM-DD
resumen: "Una o dos frases que se muestran en el listado, al compartir y en buscadores."
# Foto principal (opcional). Súbala a src/assets/img/noticias/ y escriba aquí su nombre exacto:
# imagen: ../../assets/img/noticias/mi-foto.jpg
# imagenAlt: "Qué se ve en la foto"
# Galería al final de la noticia (opcional). Dos líneas por foto; respete los espacios del principio:
# galeria:
#   - imagen: ../../assets/img/noticias/mi-foto-1.jpg
#     alt: "Qué se ve en la foto 1"
#   - imagen: ../../assets/img/noticias/mi-foto-2.jpg
#     alt: "Qué se ve en la foto 2"
borrador: true             # true = no se publica. Cámbielo a false (o borre la línea) para publicar.
---

Cuerpo de la noticia en Markdown. Párrafos separados por una línea en blanco.

## Un subtítulo

- Se pueden usar listas.
- Y **negritas** o [enlaces](/mixpile/).
