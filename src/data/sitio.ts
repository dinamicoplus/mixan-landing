// Datos generales del sitio: un único lugar para contacto, menú y documentos.
export const empresa = {
  nombre: 'MIXAN',
  razonSocial: 'MIXAN Mix Andalucía, S.L.',
  lema: 'Pioneros en el sector de las cimentaciones especiales',
};

export const contacto = {
  telefonos: [
    { texto: '+34 952 226 313', href: 'tel:+34952226313' },
    { texto: '+34 652 411 256', href: 'tel:+34652411256' },
  ],
  correo: 'info@mixan.es',
  direccion: {
    calle: 'Calle Puerto, 14, 4º, Oficina 8',
    cp: '29016',
    ciudad: 'Málaga',
  },
  // Iframe de Google Maps recuperado de la web antigua (no usa clave de API).
  mapaSrc:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3198.103802840999!2d-4.410889723699706!3d36.72006817221182!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd72f7e870a08e4f%3A0x322619c49052996b!2sCalle%20Puerto%2C%2014%2C%2029016%20M%C3%A1laga!5e0!3m2!1ses!2ses!4v1700248589171!5m2!1ses!2ses',
};

export const direccionCompleta = `${contacto.direccion.calle}, ${contacto.direccion.cp} ${contacto.direccion.ciudad}`;

export const documentos = {
  dit: { href: '/documentos/mixpile-dit-576r-24.pdf', texto: 'Documento de Idoneidad Técnica n.º 576R/24 (DIT) de Mixpile®' },
  politicaGestion: { href: '/documentos/politica-de-gestion-mixan.pdf', texto: 'Política de gestión' },
  politicaCompras: { href: '/documentos/politica-de-compras-y-proveedores.pdf', texto: 'Política de compras y proveedores' },
};

export type EnlaceMenu = { href: string; texto: string };

/** Menú principal. «Noticias» se añade sola en Cabecera.astro si hay noticias publicadas. */
export const menuBase: EnlaceMenu[] = [
  { href: '/', texto: 'Inicio' },
  { href: '/mixpile/', texto: 'Mixpile®' },
  { href: '/quienes-somos/', texto: 'Quiénes somos' },
  { href: '/proyectos/', texto: 'Proyectos' },
  { href: '/contacto/', texto: 'Contacto' },
];
