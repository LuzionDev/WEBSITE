// ==========================================
// 1. LÓGICA DEL MENÚ HAMBURGUESA Y NAVEGACIÓN
// ==========================================

const botonMenu = document.querySelector('#boton-menu');
const navegacion = document.querySelector('#navegacion');
const textoMenu = document.querySelector('#texto-menu');
const submenu = document.querySelector('#resolver');

const pantallaMovil = window.matchMedia('(max-width: 600px)');

function cambiarMenu(abrir) {
  navegacion.hidden = pantallaMovil.matches && !abrir;
  botonMenu.setAttribute('aria-expanded', String(abrir));
  botonMenu.setAttribute('aria-label', abrir ? 'Cerrar menú' : 'Abrir menú');
  textoMenu.textContent = abrir ? 'Cerrar' : 'Menú';

  if (!abrir) {
    submenu.open = false;
  }
}

botonMenu.addEventListener('click', function () {
  const estaAbierto = botonMenu.getAttribute('aria-expanded') === 'true';
  cambiarMenu(!estaAbierto);
});

navegacion.addEventListener('click', function (evento) {
  const enlace = evento.target.closest('a');
  if (!enlace) return;

  cambiarMenu(false);

  const ruta = enlace.getAttribute('href');
  const destino = ruta && ruta.startsWith('#') ? document.querySelector(ruta) : null;
  if (destino) {
    destino.focus({ preventScroll: true });
  }
});

const marca = document.querySelector('.marca');
if (marca) {
  marca.addEventListener('click', function () {
    cambiarMenu(false);
    const inicio = document.querySelector('#inicio');
    if (inicio) inicio.focus({ preventScroll: true });
  });
}

document.addEventListener('keydown', function (evento) {
  if (evento.key !== 'Escape') return;

  if (pantallaMovil.matches && !navegacion.hidden) {
    cambiarMenu(false);
    botonMenu.focus();
  } else if (submenu.open) {
    submenu.open = false;
    submenu.querySelector('summary').focus();
  }
});

function ajustarPantalla() {
  const focoEstabaEnNavegacion = navegacion.contains(document.activeElement);
  const focoEstabaEnBoton = document.activeElement === botonMenu;
  cambiarMenu(false);

  if (pantallaMovil.matches && focoEstabaEnNavegacion) {
    botonMenu.focus();
  } else if (!pantallaMovil.matches && focoEstabaEnBoton) {
    const primerEnlace = navegacion.querySelector('a');
    if (primerEnlace) primerEnlace.focus();
  }
}
pantallaMovil.addEventListener('change', ajustarPantalla);

ajustarPantalla();


// ==========================================
// 2. LÓGICA DE TRADUCCIÓN (ES, EN, QU)
// ==========================================

const traducciones = {
  es: {
    saltar_contenido: "Saltar al contenido",
    menu: "Menú",
    nav_inicio: "Inicio",
    nav_nosotros: "Nosotros",
    nav_resolver: "Resolver",
    nav_servicios: "Servicios",
    nav_objetos: "Ver objetos",
    nav_contacto: "Solicitar devolución",
    nav_recursos: "Video y guía",
    hero_etiqueta: "Oficina de pequeños reencuentros",
    hero_titulo: "La feria termina.<br>Tu historia continúa.",
    hero_desc: "Una mochila olvidada entre los puestos. Una libreta que guarda una historia. En ACME te ayudamos a dar el primer paso para recuperarlas.",
    hero_btn1: "Buscar un objeto",
    hero_btn2: "Conocer la iniciativa",
    hero_nota: "Un caso ficticio para aprender HTML y CSS.",
    hero_fig: "Hay cosas que merecen volver contigo.",
    nosotros_etiqueta: "Una mesa de ayuda entre los puestos",
    nosotros_titulo: "No todo lo que se pierde se reemplaza.",
    nosotros_desc1: "ACME es una oficina ficticia de objetos extraviados en ferias itinerantes. Cuando el evento se traslada, las personas no saben a quién preguntar ni dónde quedó lo encontrado.",
    nosotros_sub: "Nuestra propuesta",
    nosotros_desc2: "Reunir referencias de objetos y orientar una solicitud de devolución desde una sola web.",
    nosotros_desc3: "El caso se vincula de forma pedagógica con el ODS 11 y el cuidado de los espacios de encuentro comunitario.",
    serv_etiqueta: "Un recorrido sencillo",
    serv_titulo: "Del “lo perdí” al “por aquí”.",
    serv_card1_num: "01 / Mira",
    serv_card1_tit: "Reconoce un objeto",
    serv_card1_desc: "Revisa las referencias ficticias del puesto de objetos encontrados.",
    serv_card1_link: "Ver referencias",
    serv_card2_num: "02 / Cuenta",
    serv_card2_tit: "Describe un detalle",
    serv_card2_desc: "Prueba una solicitud con una característica que permita reconocer tu objeto.",
    serv_card2_link: "Probar solicitud",
    serv_card3_num: "03 / Vuelve",
    serv_card3_tit: "Conoce el siguiente paso",
    serv_card3_desc: "Consulta cómo sería el acompañamiento de la mesa de ayuda.",
    serv_card3_link: "Ver la guía",
    ori_etiqueta: "HU de ejemplo · Consultar objetos encontrados",
    ori_titulo: "¿Qué estás buscando?",
    ori_desc: "Elige una categoría y revisa una referencia de demostración. No es un inventario real.",
    ori_legend: "Tipo de objeto",
    ori_lbl_mochila: "Una mochila",
    ori_lbl_libreta: "Una libreta",
    ori_lbl_abrigo: "Un abrigo",
    ori_moc_tag: "Referencia AC 014",
    ori_moc_tit: "Mochila encontrada junto al escenario",
    ori_moc_desc: "Una mochila de tela fue entregada a la mesa de ayuda. En una solicitud real, te pediríamos describir un detalle que no sea público.",
    ori_lib_tag: "Referencia AC 021",
    ori_lib_tit: "Libreta encontrada en el puesto de artesanía",
    ori_lib_desc: "Una libreta con hojas escritas quedó junto a una mesa. No publicamos su contenido. Describe una característica para iniciar una revisión de ejemplo.",
    ori_abr_tag: "Referencia AC 028",
    ori_abr_tit: "Abrigo encontrado en la zona de descanso",
    ori_abr_desc: "Una prenda fue entregada al cierre de la feria. Consulta cómo sería una coordinación de devolución con el equipo.",
    ori_btn: "Creo que puede ser mío",
    ori_nota: "Referencias inventadas. No se realizan búsquedas ni comprobaciones automáticas.",
    proy_etiqueta: "Cómo sería el servicio",
    proy_titulo: "Un reencuentro con calma.",
    proy_c1_tit: "Encontramos",
    proy_c1_desc: "La mesa de ayuda recibiría objetos encontrados sin exhibir detalles privados.",
    proy_c2_tit: "Conversamos",
    proy_c2_desc: "Una persona responsable revisaría los detalles de la solicitud.",
    proy_c3_tit: "Coordinamos",
    proy_c3_desc: "Si existe coincidencia, se acordaría una devolución en un punto atendido.",
    gal_titulo: "Detrás de cada objeto, una historia.",
    gal_fig1: "Una compañera de recorridos",
    gal_fig2: "Un lugar para encontrarnos",
    test_quote: "“No era solo una libreta. Ahí estaba el dibujo que me hizo mi hija”.",
    test_desc: "Relato ficticio para representar la necesidad del usuario.",
    cont_etiqueta: "HU de ejemplo · Solicitar una devolución",
    cont_titulo: "Cuéntanos sobre tu objeto",
    cont_desc: "Déjanos tus datos de contacto y una descripción del objeto extraviado para iniciar la simulación de devolución."
  },
  en: {
    saltar_contenido: "Skip to content",
    menu: "Menu",
    nav_inicio: "Home",
    nav_nosotros: "About us",
    nav_resolver: "Resolve",
    nav_servicios: "Services",
    nav_objetos: "View items",
    nav_contacto: "Request return",
    nav_recursos: "Video & guide",
    hero_etiqueta: "Office of small reunions",
    hero_titulo: "The fair ends.<br>Your story continues.",
    hero_desc: "A forgotten backpack among the stalls. A notebook that holds a story. At ACME we help you take the first step to recover them.",
    hero_btn1: "Search for an item",
    hero_btn2: "Learn about the initiative",
    hero_nota: "A fictional case to learn HTML and CSS.",
    hero_fig: "There are things that deserve to return with you.",
    nosotros_etiqueta: "A help desk among the stalls",
    nosotros_titulo: "Not everything lost is replaced.",
    nosotros_desc1: "ACME is a fictional lost and found office in traveling fairs. When the event moves, people don't know who to ask or where their belongings were left.",
    nosotros_sub: "Our proposal",
    nosotros_desc2: "Gather item references and guide a return request from a single website.",
    nosotros_desc3: "The case is pedagogically linked to SDG 11 and the care of community gathering spaces.",
    serv_etiqueta: "A simple journey",
    serv_titulo: "From 'I lost it' to 'over here'.",
    serv_card1_num: "01 / Look",
    serv_card1_tit: "Recognize an object",
    serv_card1_desc: "Check the fictional references of the lost and found booth.",
    serv_card1_link: "View references",
    serv_card2_num: "02 / Tell",
    serv_card2_tit: "Describe a detail",
    serv_card2_desc: "Try a request with a characteristic that allows your item to be recognized.",
    serv_card2_link: "Test request",
    serv_card3_num: "03 / Return",
    serv_card3_tit: "Know the next step",
    serv_card3_desc: "Check how the help desk accompaniment would work.",
    serv_card3_link: "View guide",
    ori_etiqueta: "Example US · Check found items",
    ori_titulo: "What are you looking for?",
    ori_desc: "Choose a category and review a demo reference. This is not a real inventory.",
    ori_legend: "Item type",
    ori_lbl_mochila: "A backpack",
    ori_lbl_libreta: "A notebook",
    ori_lbl_abrigo: "A coat",
    ori_moc_tag: "Reference AC 014",
    ori_moc_tit: "Backpack found near the stage",
    ori_moc_desc: "A cloth backpack was handed over to the help desk. In a real request, we would ask you to describe a non-public detail.",
    ori_lib_tag: "Reference AC 021",
    ori_lib_tit: "Notebook found at the crafts booth",
    ori_lib_desc: "A notebook with written pages was left near a table. We do not publish its content. Describe a characteristic to start a sample review.",
    ori_abr_tag: "Reference AC 028",
    ori_abr_tit: "Coat found in the rest area",
    ori_abr_desc: "A garment was handed in at the closing of the fair. Check how a return coordination with the team would look.",
    ori_btn: "I think it might be mine",
    ori_nota: "Invented references. No automatic searches or checks are performed.",
    proy_etiqueta: "How the service would work",
    proy_titulo: "A calm reunion.",
    proy_c1_tit: "We find",
    proy_c1_desc: "The help desk would receive found items without displaying private details.",
    proy_c2_tit: "We talk",
    proy_c2_desc: "A responsible person would review the details of the request.",
    proy_c3_tit: "We coordinate",
    proy_c3_desc: "If there is a match, a return would be arranged at a staffed point.",
    gal_titulo: "Behind every object, a story.",
    gal_fig1: "A companion for journeys",
    gal_fig2: "A place to meet",
    test_quote: "\"It wasn't just a notebook. There was the drawing my daughter made for me.\"",
    test_desc: "Fictional story to represent user need.",
    cont_etiqueta: "Example US · Request a return",
    cont_titulo: "Tell us about your item",
    cont_desc: "Leave us your contact details and a description of the lost item to start the return simulation."
  },
  qu: {
    saltar_contenido: "Qillqaman phalay",
    menu: "Mast'ariy",
    nav_inicio: "Qallariy",
    nav_nosotros: "Ñuqanchikmanta",
    nav_resolver: "Allichay",
    nav_servicios: "Ruwaykuna",
    nav_objetos: "Imakunata qaway",
    nav_contacto: "Kutichiyta mañay",
    nav_recursos: "Video y guía",
    hero_etiqueta: "Pisi tupasqakunata tarina",
    hero_titulo: "Feria tukunña.<br>Kawsayniykiqa purillanmi.",
    hero_desc: "K'itikunapi qunqasqa mochila. Historiayoq cuaderno. ACMEpi yanapasqayki kutichinaykipaq.",
    hero_btn1: "Imatapas maskay",
    hero_btn2: "Yachay imachus kasqanta",
    hero_nota: "Huch'uy rikch'aq ruway HTMLwan CSSwan yachanapaq.",
    hero_fig: "Kantinmi imakunapas qamwan kutimunanpaq.",
    nosotros_etiqueta: "K'itikunapi yanapana mesa",
    nosotros_titulo: "Manam llapan chinkasqachu rantinpi kan.",
    nosotros_desc1: "ACME nisqaqa puriq feriakunapi chinkasqa imakunata tarina wasim. Apuwaspaqa pipas manam yachanchu mayman tapunanta.",
    nosotros_sub: "Munasqayku",
    nosotros_desc2: "Imakuna tarisqanta huñuy hinaspa kutichiyta pusay huklla webpi.",
    nosotros_desc3: "Kay ruwayqa SDG 11 nisqawanmi tupun llaqta tupanakuypi.",
    serv_etiqueta: "Huch'uy puriy",
    serv_titulo: "Chinkachisqamanta kayman.",
    serv_card1_num: "01 / Qaway",
    serv_card1_tit: "Maskay imatapas",
    serv_card1_desc: "Tarikuq kaqkunap qillqasqanta qaway.",
    serv_card1_link: "Qawasqakunata qaway",
    serv_card2_num: "02 / Willakuy",
    serv_card2_tit: "Willakuy imayna kasqanta",
    serv_card2_desc: "Mañakuyta ruway k'uskiqwan.",
    serv_card2_link: "Mañakuyta qhaway",
    serv_card3_num: "03 / Kutimuy",
    serv_card3_tit: "Qatiq ñanta yachay",
    serv_card3_desc: "Qhaway imayna yanapanakum kanqa.",
    serv_card3_link: "Kamachikuyta qaway",
    ori_etiqueta: "Rikch'anachiq HU · Tarisqa kaqkunata tapuy",
    ori_titulo: "Imatataq maskachkanki?",
    ori_desc: "Huk laya kaqta akllay hinaspa qhaway. Manam chiqap inventariochu.",
    ori_legend: "Imayna kaq",
    ori_lbl_mochila: "Huk mochila",
    ori_lbl_libreta: "Huk cuaderno",
    ori_lbl_abrigo: "Huk p'acha",
    ori_moc_tag: "Referencia AC 014",
    ori_moc_tit: "Pukllana patapi tarisqa mochila",
    ori_moc_desc: "Tela mochilaqa yanapana mesamanmi churasqa karqan. Chiqap mañakuypiqa, sapaq kaqtam mañakuwaq karqan.",
    ori_lib_tag: "Referencia AC 021",
    ori_lib_tit: "Maki ruway wasipi tarisqa cuaderno",
    ori_lib_desc: "Qillqasqa panka cuadernoqa mesa patapim saqisqa karqan. Manam lliwpaqchu churanchik. Huk kaqnin willakuy.",
    ori_abr_tag: "Referencia AC 028",
    ori_abr_tit: "Samana k'itipi tarisqa p'acha",
    ori_abr_desc: "Feria tupuypi p'acha saqisqa karqan. Qhaway imayna tantanakuy kanman.",
    ori_btn: "Ñuqapam kanman",
    ori_nota: "Rikch'anachiq qillqasqakuna. Manam maskaykunata ruwanchikchu.",
    proy_etiqueta: "Imaynam yanapana kanman",
    proy_titulo: "K'anchaypi tupanakuy.",
    proy_c1_tit: "Tarisunchik",
    proy_c1_desc: "Yanapana mesaqa tarisqa kaqkunatam chaskinman.",
    proy_c2_tit: "Rimanchik",
    proy_c2_desc: "Pipas mamasqa runam mañakuykunata qhawanman.",
    proy_c3_tit: "Tantanchik",
    proy_c3_desc: "Tupaqtinqa, tupanakuypi kutichisqa kanman.",
    gal_titulo: "Sapa kaqpa qipanpiqa, huk kawsaymi kachkan.",
    gal_fig1: "Purikuq masinchik",
    gal_fig2: "Tupakunapaq k'iti",
    test_quote: "\"Manam cuadernollachu karqan. Ususiypa dibujasqanmi karqan.\"",
    test_desc: "Rikch'anachiq willakuy usuario munasqanta rikuchinapaq.",
    cont_etiqueta: "Rikch'anachiq HU · Kutichiyta mañay",
    cont_titulo: "Willaykuway imayna kaqniymanta",
    cont_desc: "Saqipuwayku yaykunayki willaykunata chinkasqa kaqta tarinaykupaq."
  }
};

function cambiarIdioma(idioma) {
  const elementos = document.querySelectorAll("[data-i18n]");
  elementos.forEach(elemento => {
    const clave = elemento.getAttribute("data-i18n");
    if (traducciones[idioma] && traducciones[idioma][clave]) {
      elemento.innerHTML = traducciones[idioma][clave];
    }
  });

  document.documentElement.setAttribute("dir", "ltr");
  localStorage.setItem("idioma_acme", idioma);

  const selectorIdiomas = document.querySelector(".selector-idiomas");
  if (selectorIdiomas) {
    selectorIdiomas.removeAttribute("open");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const idiomaGuardado = localStorage.getItem("idioma_acme") || "es";
  cambiarIdioma(idiomaGuardado);
});