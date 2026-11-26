# mixan-web-placeholder

Página temporal de www.mixan.es mientras se restaura la web.

- `index.html`: página estática, sin dependencias externas.
- Se puede servir desde GitHub Pages (Settings → Pages → Deploy from branch → `main` / root)
  o copiarla tal cual a la raíz del servidor web.

Antes de publicar, revisar el bloque de contacto en `index.html` (correo y teléfono).

## Publicar en Google Cloud (Firebase Hosting, proyecto `mixan-landing`)

Desde Cloud Shell (https://console.cloud.google.com/?project=mixan-landing&cloudshell=true):

```bash
git clone https://github.com/dinamicoplus/mixan-landing && cd mixan-landing
firebase projects:addfirebase mixan-landing   # solo la primera vez
firebase deploy --only hosting --project mixan-landing
```

Queda publicada en https://mixan-landing.web.app. El dominio propio (www.mixan.es) se añade en
la consola de Firebase → Hosting → «Añadir dominio personalizado»; el certificado HTTPS es automático.
