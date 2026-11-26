# mixan-web-placeholder

Página temporal de www.mixan.es mientras se restaura la web.

- `index.html`: página estática, sin dependencias externas.
- Se puede servir desde GitHub Pages (Settings → Pages → Deploy from branch → `main` / root)
  o copiarla tal cual a la raíz del servidor web.

Antes de publicar, revisar el bloque de contacto en `index.html` (correo y teléfono).

## Publicación

La web está en Firebase Hosting, proyecto `mixan-landing-91b5c`, servida en https://www.mixan.es y https://mixan.es
(DNS en DonDominio; la copia de la zona anterior está fuera del repositorio).

**Automática:** cada push a `main` la publica con GitHub Actions (`.github/workflows/firebase-hosting.yml`).
Requiere el secreto `FIREBASE_SERVICE_ACCOUNT_MIXAN_LANDING_91B5C`, que se crea una sola vez desde Cloud Shell:

```bash
cd ~/mixan-landing && git pull
firebase init hosting:github --project mixan-landing-91b5c
```

**Manual** (si Actions falla):

```bash
firebase deploy --only hosting --project mixan-landing-91b5c
```
