# Datos de obras (`src/data/obras.json`)

Fuente: `/home/claude/mixan-material/obras.json` (57 obras, 2006–2026), recuperado de la web antigua.
Los valores de origen **no se han cambiado** salvo los arreglos mínimos de presentación de abajo. El campo
`texto_original` de cada obra se conserva intacto (es el texto tal como aparecía en la web antigua y sirve de
referencia). Las coordenadas, clientes, años, metros y técnicas son los del origen.

## Arreglos de presentación aplicados (11 cambios en 10 obras)

| Id | Campo | Antes | Después | Motivo |
|---|---|---|---|---|
| 4 | nombre | `Concesionario Mercedes. Polígono Guadalhorce.` | `… Polígono Guadalhorce` | Punto final sobrante |
| 10 | nombre | `Estación de servicio "La Esmeralda". CEPSA. Las Palmas.` | `… CEPSA. Las Palmas` | Punto final sobrante |
| 13 | nombre | `Fábrica de bolsas. Alcantarilla. Murcia.` | `… Alcantarilla. Murcia` | Punto final sobrante |
| 17 | nombre | `Nave Petroprix. Martos.Jaén` | `Nave Petroprix. Martos. Jaén` | Falta espacio tras el punto |
| 20 | nombre | `Piscina cubierta Real Club Naútico de Melilla` | `… Real Club Náutico de Melilla` | Errata «Naútico» |
| 20 | cliente | `Real Club Naútico de Melilla` | `Real Club Náutico de Melilla` | Errata «Naútico» |
| 25 | nombre | `Centro logístico. Medinaceli.Soria` | `Centro logístico. Medinaceli. Soria` | Falta espacio tras el punto |
| 30 | nombre | `… Corral de Almoguer` | `… Corral de Almaguer` | Errata en el topónimo (Corral de Almaguer, Toledo; las coordenadas caen allí) |
| 50 | nombre | `Edificio Contenedor P3-F1, en San Fernando, (Cádiz). – (Zona B.1)` | `Edificio Contenedor P3-F1, en San Fernando (Cádiz) – (Zona B.1)` | Coma y punto sobrantes |
| 53 | nombre | `Protecciones acústicas ADIF . Tramo Padrón - A coruña` | `Protecciones acústicas ADIF. Tramo Padrón - A Coruña` | Espacio antes del punto; mayúscula del topónimo |
| 56 | nombre | `Ferrocaril Aragurén - Asución. FEVE` | `Ferrocarril Aragurén - Asunción. FEVE` | Erratas «Ferrocaril» y «Asución» |

No había dobles espacios en ningún nombre ni cliente.

**Mayúsculas de clientes: no se ha normalizado ninguna.** Las variantes existentes no son inequívocas (pueden
ser razones sociales distintas o la grafía que usa el propio cliente): `SACYR` / `Sacyr` / `SACYR Construcción S.A`,
`BILBA` / `Bilba Constructora S.L.`, `Improges S.L.` / `Improgés Cabezuelo S.L.`, `Adif` / `Adif. UTE Mogente-Encina`.
Tampoco se han tocado abreviaturas sin punto final (`S.A`, `S.L`). La búsqueda de la web no distingue mayúsculas
ni tildes, así que «sacyr» encuentra las cuatro obras.

## Presentación (sin tocar los datos)

- Metros en formato español con separador de miles también en cifras de 4 dígitos (`1.767 m`, `3.038,8 m`),
  como en los textos originales («3.402 m.l.»). Función `formatoMetros()` de `src/lib/obras.ts`.
- La técnica solo se muestra si `tecnica` no es `null` (4 obras: 53 Micropilotes, 55 Pilotes, 56 y 57 Mixpile®).
- Obras destacadas de Inicio: las 4 de mayor medición (`obrasDestacadas()`); hoy 39 Colinas del Limonar
  (20.700 m), 27 Terraplén La Encina-Mogente (19.543 m), 41 Centro logístico Murcia (19.130 m) y
  42 Centro logístico Illescas (18.413 m).

## Dudas para el cliente

Comprobación hecha cruzando las coordenadas con OpenStreetMap (geocodificación inversa de Nominatim) y con la
localidad que dice el nombre. Ninguna se ha corregido: lo decide MIXAN.

1. **Obra 46 «Centro deportivo Marbella» (TRAGSA, 2023)** tiene exactamente las mismas coordenadas que la
   **18 «Estación de Servicio CEPSA. San Pedro de Alcántara»** (36.4801176, −4.9930767; Guadalmina, San Pedro
   Alcántara). El punto está a unos 10 km del centro de Marbella. Probable error de posición de la 46:
   ¿dónde está el centro deportivo?
2. **Obras 9 y 19 (Centro Asistencial San Juan de Dios, fases I y II)** comparten punto (a menos de 2 m).
   Probablemente correcto (dos fases de la misma obra); en el mapa se despliegan en abanico al acercarse.
3. **Técnica desconocida en 53 de 57 obras.** Solo constan la 53 (Micropilotes), 55 (Pilotes diámetro 65),
   56 y 57 (Mixpile®). ¿Puede MIXAN indicar la técnica del resto? Se mostrará en cuanto se rellene `tecnica`.
4. **Obra 25 «Centro logístico. Medinaceli. Soria»**: las coordenadas caen en **Arcos de Jalón** (a 0,3 km del
   casco), a unos 15 km de Medinaceli. ¿El nombre o la posición?
5. **Obra 35 «Urb. Molino Bajo. La Guardia, Jaén»**: el punto está en el término de **Jaén capital**, a unos 10 km
   de La Guardia de Jaén. Confirmar ubicación.
6. **Obra 52 «Murallas reales en el Parador de Ceuta»**: el punto está en San Amaro (norte de Ceuta), a unos
   2,7 km del Parador y las Murallas Reales. Probablemente desplazado.
7. **Obra 56 «Ferrocarril Aragurén - Asunción. FEVE»** (provincia Burgos): el punto cae en Soncillo (Valle de
   Valdebezana, Burgos). «Aragurén» podría ser «Aranguren», pero Aranguren está en Zalla (Bizkaia). Confirmar
   el nombre del tramo y la ubicación. No se ha corregido «Aragurén» por no ser una errata evidente.
8. **Obra 38 «Fábrica de Lumón»** y cliente `Lumon`: ¿«Lumón» con tilde es correcto? (la marca se escribe Lumon).
9. **Obra 34, cliente `Eiffagge`**: ¿es Eiffage (constructora)? No se ha cambiado.
10. **Obra 1 «Polideportivo Río Gordo»** / cliente `Ayto. Río Gordo`: el municipio se llama oficialmente
    **Riogordo** (las coordenadas caen allí). ¿Se prefiere la grafía oficial?
11. **Obra 36 «Planta de transferencias de residuos»** (VAERSA, Alicante): el nombre no indica localidad; el punto
    cae en Dolores (Vega Baja). Confirmar si se quiere añadir la localidad al nombre.
12. **Ids fuera de orden cronológico**: las obras 55 (2015) y 56 (2019) se añadieron al final. No afecta a la web
    (el listado se ordena por año), solo se señala.
13. **Obra 54 (2026)**: año en curso; confirmar que está terminada o indicar si es «en ejecución».

No se han encontrado años fuera de rango (todos entre 2006 y 2026), metros nulos ni coordenadas fuera de España.
Comprobado además que la provincia de cada obra coincide con la de sus coordenadas en todas las verificadas.
