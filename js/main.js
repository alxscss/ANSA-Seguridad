// =====================================================
// ANSA SEGURIDAD - Main JS (Modernizado 2026)
// =====================================================

document.addEventListener('DOMContentLoaded', function() {

    // --- 1. AOS (Animate On Scroll) Initialization ---
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 700,
            easing: 'ease-out-cubic',
            once: true,
            offset: 60,
            delay: 0
        });
        document.documentElement.classList.add('aos-ready');
    }

    // --- 2. IMPROVED TYPEWRITER EFFECT (Hero) ---
    const dynamicText = document.getElementById('dynamic-text');
    const phrases = [
        "Seguridad Privada",
        "Protección Profesional",
        "Vigilancia Estratégica",
        "Soluciones Integrales"
    ];

    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 95;

    function typeEffect() {
        if (!dynamicText) return;

        const currentPhrase = phrases[phraseIndex];

        if (isDeleting) {
            dynamicText.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 45;
        } else {
            dynamicText.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 95;
        }

        if (!isDeleting && charIndex === currentPhrase.length) {
            isDeleting = true;
            typeSpeed = 1850;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typeSpeed = 420;
        }

        setTimeout(typeEffect, typeSpeed);
    }

    if (dynamicText) {
        setTimeout(typeEffect, 650);
    }

    // --- 3. UNIVERSAL FORMSPREE HANDLER + VALIDATION ---
    const forms = document.querySelectorAll('form[action*="formspree.io"]');

    forms.forEach(form => {
        const messageBox = form.querySelector('.form-message');
        const submitBtn = form.querySelector('button[type="submit"]');
        const btnText = submitBtn ? submitBtn.querySelector('.btn-text') : null;
        const btnLoading = submitBtn ? submitBtn.querySelector('.btn-loading') : null;

        form.querySelectorAll('label').forEach((label, index) => {
            const field = label.parentElement.querySelector('input:not([type="hidden"]), select, textarea');
            if (!field) return;
            if (!field.id) field.id = `${form.id || 'form'}-${field.name || index}`;
            label.htmlFor = field.id;
        });

        const nameField = form.querySelector('input[name="nombre"]');
        const emailField = form.querySelector('input[name="email"]');
        const phoneField = form.querySelector('input[name="telefono"]');
        if (nameField) nameField.autocomplete = 'name';
        if (emailField) emailField.autocomplete = 'email';
        if (phoneField) {
            phoneField.autocomplete = 'tel';
            phoneField.inputMode = 'numeric';
        }

        form.addEventListener('submit', async function(e) {
            e.preventDefault();

            const requiredFields = form.querySelectorAll('[required]');
            let isValid = true;
            let firstInvalid = null;

            requiredFields.forEach(field => {
                field.classList.remove('is-invalid');
                field.removeAttribute('aria-invalid');
                if (!field.checkValidity()) {
                    isValid = false;
                    field.classList.add('is-invalid');
                    field.setAttribute('aria-invalid', 'true');
                    if (!firstInvalid) firstInvalid = field;
                }
            });

            if (!isValid) {
                if (messageBox) {
                    messageBox.className = 'form-message small text-center mt-2 text-danger';
                    messageBox.textContent = 'Por favor completa los campos requeridos correctamente.';
                    messageBox.classList.remove('d-none');
                }
                if (firstInvalid) firstInvalid.focus();
                return;
            }

            if (submitBtn) submitBtn.disabled = true;
            if (btnText) btnText.classList.add('d-none');
            if (btnLoading) btnLoading.classList.remove('d-none');

            try {
                const formData = new FormData(form);
                const response = await fetch(form.action, {
                    method: 'POST',
                    body: formData,
                    headers: { 'Accept': 'application/json' }
                });

                if (response.ok) {
                    if (messageBox) {
                        messageBox.className = 'form-message small text-center mt-2 text-success fw-semibold';
                        messageBox.textContent = '¡Mensaje enviado con éxito! Te contactaremos en las próximas horas.';
                        messageBox.classList.remove('d-none');
                    }
                    form.reset();
                    setTimeout(() => {
                        if (messageBox) messageBox.classList.add('d-none');
                    }, 6200);
                } else {
                    throw new Error('Error en el servidor');
                }
            } catch (error) {
                if (messageBox) {
                    messageBox.className = 'form-message small text-center mt-2 text-danger';
                    messageBox.textContent = 'Hubo un problema al enviar. Por favor intenta de nuevo o contáctanos por teléfono.';
                    messageBox.classList.remove('d-none');
                }
            } finally {
                if (submitBtn) submitBtn.disabled = false;
                if (btnText) btnText.classList.remove('d-none');
                if (btnLoading) btnLoading.classList.add('d-none');
            }
        });

        form.querySelectorAll('input, textarea, select').forEach(input => {
            const clearError = () => {
                input.classList.remove('is-invalid');
                input.removeAttribute('aria-invalid');
            };
            input.addEventListener('input', clearError);
            input.addEventListener('change', clearError);
        });
    });

    document.querySelectorAll('a[target="_blank"]').forEach(link => {
        const rel = new Set((link.getAttribute('rel') || '').split(/\s+/).filter(Boolean));
        rel.add('noopener');
        rel.add('noreferrer');
        link.setAttribute('rel', [...rel].join(' '));
    });

    // --- 4. ELEGANT BACK TO TOP BUTTON (HTML existente, si lo tienes) ---
    const backToTopBtn = document.getElementById('backToTop');

    if (backToTopBtn) {
        const toggleBackToTop = () => {
            backToTopBtn.classList.toggle('visible', window.scrollY > 460);
        };
        window.addEventListener('scroll', toggleBackToTop, { passive: true });
        toggleBackToTop();
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // --- 5. NAVBAR ACTIVE STATE (secciones principales del sitio) ---
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    const sections = document.querySelectorAll('section[id]');

    if (navLinks.length && sections.length) {
        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('id');
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${id}` ||
                            link.getAttribute('href') === `index.html#${id}`) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        }, { threshold: 0.3, rootMargin: '-80px 0px -40% 0px' });

        sections.forEach(section => sectionObserver.observe(section));
    }

    // --- 6. Accesibilidad ---
    document.querySelectorAll('.whatsapp-btn').forEach(el => {
        if (!el.hasAttribute('aria-label')) {
            el.setAttribute('aria-label', 'Contactar por WhatsApp');
        }
    });

    console.log('%c[ANSA] Sitio modernizado 2026 listo.', 'color:#0a3d62;font-size:9px');


    // =====================================================
    // 7. SCROLL OFFSET DINÁMICO
    //    Calcula la altura REAL del navbar fijo en cada momento,
    //    en vez de usar un número fijo como "70px". Esto es lo
    //    que arregla el bug de que el título de cada sección
    //    quedaba tapado al llegar por un link interno: si el
    //    navbar real mide, por ejemplo, 112px (topbar + nav),
    //    un offset fijo de 70px deja 42px de la sección escondidos
    //    detrás del navbar.
    // =====================================================
    function getNavbarOffset() {
        const nav = document.getElementById('main-navbar');
        // +16px de aire extra para que el título no quede pegado al borde
        return nav ? nav.offsetHeight + 16 : 86;
    }

    function scrollToElement(target) {
        if (!target) return;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - getNavbarOffset();
        window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }


    // =====================================================
    // 8. SMOOTH SCROLL para enlaces internos (#anchors)
    //    Usa el offset dinámico del bloque 7.
    // =====================================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#' || href.length < 2) return;

            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                scrollToElement(target);
            }
        });
    });

    // Si la página carga directamente con un #hash en la URL
    // (ej. servicios.html#intramuros), corrige la posición inicial
    // una vez que todo terminó de renderizar.
    if (window.location.hash) {
        const initialTarget = document.querySelector(window.location.hash);
        if (initialTarget) {
            setTimeout(() => scrollToElement(initialTarget), 80);
        }
    }


    // =====================================================
    // 9. GRID DE SECTORES — tarjetas estilo catálogo
    //    Cada tarjeta se expande/contrae con su propia descripción.
    //    YA NO hay ventana flotante (popover): el clic desde el
    //    navbar redirige directo a servicios.html con el sector
    //    correcto, y este bloque abre y resalta esa tarjeta al llegar.
    // =====================================================
    (function () {
 
  const sectorData = {
    corporativo: {
      title: "Seguridad en Corporativos",
      icon: "fa-building",
      badge: "Corporativo",
      img: "img/sector-corporativo.jpg",
      html: `<p>Protección especializada para edificios administrativos, complejos de oficinas y centros de negocios. Nuestro personal se enfoca en:</p>
             <ul>
               <li>Control estricto de accesos peatonales y vehiculares.</li>
               <li>Recepción y registro de visitas y proveedores bajo protocolos corporativos.</li>
               <li>Monitoreo preventivo y rondines para verificar equipos apagados al salir el personal.</li>
             </ul>`
    },
    comercio: {
      title: "Seguridad en Comercio",
      icon: "fa-shop",
      badge: "Comercio",
      img: "img/sector-comercio.jpg",
      html: `<p>Vigilancia diseñada para mitigar pérdidas y salvaguardar la experiencia de compra en centros comerciales y puntos de venta:</p>
             <ul>
               <li>Prevención activa de pérdidas y conductas delictivas intramuros.</li>
               <li>Control de flujos en accesos principales y salidas de emergencia.</li>
               <li>Inspección disuasiva y atención al cliente ante incidentes menores.</li>
             </ul>`
    },
    industria: {
      title: "Seguridad Industrial",
      icon: "fa-industry",
      badge: "Industria",
      img: "img/sector-industria.jpg",
      html: `<p>Operaciones estrictas para plantas de producción, CEDIS y parques industriales donde el control de inventario es crítico:</p>
             <ul>
               <li>Inspección de transporte de carga, sellos de seguridad y bitácoras de embarque.</li>
               <li>Rondines perimetrales continuos para detectar actos inseguros.</li>
               <li>Revisión estricta para evitar la introducción de materiales riesgosos.</li>
             </ul>`
    },
    construccion: {
      title: "Seguridad en Construcción",
      icon: "fa-helmet-safety",
      badge: "Construcción",
      img: "img/sector-construccion.jpg",
      html: `<p>Custodia de obra en proceso, maquinaria y materiales, reduciendo el riesgo de robo y accesos no autorizados en horarios sin actividad laboral:</p>
             <ul>
               <li>Vigilancia nocturna y en días no laborables.</li>
               <li>Control de entrada y salida de maquinaria y herramienta.</li>
               <li>Bitácora de incidentes para la residencia de obra.</li>
             </ul>`
    },
    condominios: {
      title: "Seguridad en Condominios",
      icon: "fa-city",
      badge: "Condominios",
      img: "img/sector-condominios.jpg",
      html: `<p>Vigilancia para edificios verticales y administraciones condominales, equilibrando control de acceso con un trato cordial hacia los residentes:</p>
             <ul>
               <li>Filtro de visitantes y proveedores con bitácora digital.</li>
               <li>Rondines en áreas comunes, estacionamiento y azotea.</li>
               <li>Coordinación directa con la administración del inmueble.</li>
             </ul>`
    },
    fraccionamientos: {
      title: "Seguridad en Fraccionamientos",
      icon: "fa-house-flag",
      badge: "Fraccionamientos",
      img: "img/sector-fraccionamientos.jpg",
      html: `<p>Control de acceso vehicular y peatonal en desarrollos residenciales cerrados, con rondines perimetrales constantes:</p>
             <ul>
               <li>Casetas de acceso con registro de visitantes.</li>
               <li>Rondines perimetrales programados y aleatorios.</li>
               <li>Enlace directo con la mesa directiva de vecinos.</li>
             </ul>`
    },
    educativo: {
      title: "Seguridad en Centros Educativos",
      icon: "fa-graduation-cap",
      badge: "Educativo",
      img: "img/escuela.webp",
      html: `<p>Resguardo e integridad para campus universitarios, colegios y centros de enseñanza, priorizando el entorno pacífico:</p>
             <ul>
               <li>Control de acceso estricto a personas ajenas a la comunidad estudiantil.</li>
               <li>Patrullaje preventivo en áreas comunes, laboratorios y estacionamientos.</li>
               <li>Protocolos de respuesta inmediata ante emergencias escolares.</li>
             </ul>`
    },
    transporte: {
      title: "Seguridad en Transporte Público",
      icon: "fa-bus",
      badge: "Transporte",
      img: "img/transporte-publico.webp",
      html: `<p>Plantillas operativas especializadas en resguardar infraestructura masiva como estaciones, andenes y terminales:</p>
             <ul>
               <li>Control de accesos en torniquetes y pasillos de flujo masivo.</li>
               <li>Vigilancia disuasiva frente a vandalismo o alteración del orden.</li>
               <li>Reporte diario e inmediato de anomalías operativas.</li>
             </ul>`
    },
    eventos: {
      title: "Seguridad en Eventos Especiales",
      icon: "fa-calendar-star",
      badge: "Eventos",
      img: "img/sector-eventos.jpg",
      html: `<p>Operativos de seguridad temporales para conciertos, ferias, congresos y eventos corporativos, con personal dimensionado al aforo esperado:</p>
             <ul>
               <li>Control de acceso y revisión en puntos de entrada.</li>
               <li>Coordinación con producción y protección civil.</li>
               <li>Personal uniformado ejecutivo para recepción VIP.</li>
             </ul>`
    },
    residencial: {
      title: "Seguridad Residencial",
      icon: "fa-house-chimney",
      badge: "Residencial",
      img: "img/sector-residencial.jpg",
      html: `<p>Protección familiar y patrimonial para residencias privadas, con personal discreto y protocolos adaptados al estilo de vida de cada familia:</p>
             <ul>
               <li>Identificación obligatoria y control de visitas mediante bitácora o interfón.</li>
               <li>Supervisión de personal de mantenimiento externo y correspondencia.</li>
               <li>Rondines nocturnos con reporte constante vía radiofrecuencia.</li>
             </ul>`
    }
  };
 
  const buttons = document.querySelectorAll('.sector-btn');
  if (!buttons.length) return;
 
  // Referencias DOBLES: una copia para móvil (#sp-x-m) y otra para
  // desktop (#sp-x-d). Solo una de las dos está visible a la vez
  // (CSS .d-lg-none / .d-none.d-lg-block), pero actualizamos ambas
  // siempre para que el contenido sea correcto sin importar el
  // tamaño de pantalla en el que esté el usuario en ese momento.
  const targets = ['m', 'd'].map(suffix => ({
    img:      document.getElementById(`sp-img-${suffix}`),
    badge:    document.getElementById(`sp-badge-${suffix}`),
    icon:     document.getElementById(`sp-icon-${suffix}`),
    title:    document.getElementById(`sp-title-${suffix}`),
    text:     document.getElementById(`sp-text-${suffix}`),
    panel:    document.getElementById(`sector-panel-${suffix === 'm' ? 'mobile' : 'desktop'}`)
  })).filter(t => t.img); // descarta si algún id no existe
 
  function renderSector(key) {
    const data = sectorData[key];
    if (!data) return;
 
    buttons.forEach(b => b.classList.toggle('active', b.dataset.sector === key));
 
    targets.forEach(t => {
      t.panel.querySelector('.sector-panel-body').style.opacity = '0';
      t.img.style.opacity = '0';
 
      setTimeout(() => {
        t.img.src = data.img;
        t.img.alt = data.title;
        t.badge.textContent = data.badge;
        t.icon.className = `fa-solid ${data.icon}`;
        t.title.textContent = data.title;
        t.text.innerHTML = data.html;
 
        t.img.style.opacity = '1';
        t.panel.querySelector('.sector-panel-body').style.opacity = '1';
      }, 160);
    });
  }
 
  buttons.forEach(btn => {
    btn.addEventListener('click', () => renderSector(btn.dataset.sector));
  });
 
  // Sector inicial: respeta ?sector=xxx en la URL (llegando desde
  // el navbar de otra página); si no hay parámetro, usa "corporativo".
  const params = new URLSearchParams(window.location.search);
  const initial = params.get('sector');
  renderSector(initial && sectorData[initial] ? initial : 'corporativo');
 
})();


    // =====================================================
    // 10. NAVBAR: links de sector — REDIRECCIÓN DIRECTA
    //     Sin popover, sin paso intermedio. El link del dropdown
    //     navega de forma normal a servicios.html?sector=xxx, y
    //     el bloque 9 de arriba abre y resalta la tarjeta correcta.
    // =====================================================
    const navSectorLinks = document.querySelectorAll('[data-sector-link]');

    navSectorLinks.forEach(link => {
        const sector = link.getAttribute('data-sector-link');
        if (!sector) return;

        // Forzamos el href correcto sin importar lo que tenga el HTML,
        // así no hay que tocar el markup si cambias el orden de sectores.
        link.setAttribute('href', `servicios.html?sector=${sector}#intramuros`);
        // Sin listener de click adicional: navegación nativa del navegador.
    });


    // =====================================================
    // 11. BOTONES DE DESPLAZAMIENTO — menú móvil
    //     (compatibilidad con el layout anterior; si ya migraste
    //     todo al grid de tarjetas, este bloque simplemente no
    //     encuentra los elementos y no hace nada)
    // =====================================================
    const scrollRightBtn  = document.getElementById('scrollRightBtn');
    const scrollLeftBtn   = document.getElementById('scrollLeftBtn');
    const subservicesMenu = document.getElementById('subservices-menu');

    if (subservicesMenu) {
        if (scrollRightBtn) {
            scrollRightBtn.addEventListener('click', () => {
                subservicesMenu.scrollBy({ left: 150, behavior: 'smooth' });
            });
        }
        if (scrollLeftBtn) {
            scrollLeftBtn.addEventListener('click', () => {
                subservicesMenu.scrollBy({ left: -150, behavior: 'smooth' });
            });
        }

        subservicesMenu.addEventListener('scroll', () => {
            const isAtEnd   = subservicesMenu.scrollLeft + subservicesMenu.clientWidth >= subservicesMenu.scrollWidth - 10;
            const isAtStart = subservicesMenu.scrollLeft <= 10;

            if (scrollRightBtn) {
                if (isAtEnd) {
                    scrollRightBtn.style.opacity = '0';
                    setTimeout(() => scrollRightBtn.style.display = 'none', 300);
                } else {
                    scrollRightBtn.style.display = 'block';
                    setTimeout(() => scrollRightBtn.style.opacity = '0.9', 10);
                }
            }
            if (scrollLeftBtn) {
                if (isAtStart) {
                    scrollLeftBtn.style.opacity = '0';
                    setTimeout(() => scrollLeftBtn.style.display = 'none', 300);
                } else {
                    scrollLeftBtn.style.display = 'block';
                    setTimeout(() => scrollLeftBtn.style.opacity = '0.9', 10);
                }
            }
        });
    }


    // =====================================================
    // 12. BACK TO TOP (botón creado dinámicamente)
    // =====================================================
    const dynamicBackToTop = document.createElement('button');
    dynamicBackToTop.innerHTML = '<i class="fa-solid fa-arrow-up"></i>';
    dynamicBackToTop.className = 'btn btn-dark rounded-circle position-fixed bottom-5 end-5 shadow';
    dynamicBackToTop.style.display = 'none';
    dynamicBackToTop.style.zIndex = '1000';
    dynamicBackToTop.setAttribute('aria-label', 'Volver arriba');
    document.body.appendChild(dynamicBackToTop);

    window.addEventListener('scroll', () => {
        dynamicBackToTop.style.display = window.scrollY > 400 ? 'block' : 'none';
    }, { passive: true });

    dynamicBackToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });


    // =====================================================
    // 13. DIVISIÓN ELECTRÓNICA: tabs imagen + cards
    // =====================================================
    (function () {
        const thumbs   = document.querySelectorAll('.elec-thumb');
        const cards    = document.querySelectorAll('.elec-service-card');
        const mainImg  = document.getElementById('elecMainImg');
        const badgeTxt = document.getElementById('elecBadgeText');

        if (!mainImg) return;

        function activateIndex(i) {
            thumbs.forEach((t, idx) => t.classList.toggle('active', idx === i));
            cards.forEach((c, idx) => c.classList.toggle('active-card', idx === i));

            const thumb = thumbs[i];
            mainImg.style.opacity = '0';
            setTimeout(() => {
                mainImg.src = thumb.dataset.img;
                mainImg.style.opacity = '1';
                if (badgeTxt) badgeTxt.textContent = thumb.dataset.badge;
            }, 200);
        }

        thumbs.forEach((t, i) => t.addEventListener('click', () => activateIndex(i)));
        cards.forEach((c, i) => c.addEventListener('click', () => activateIndex(i)));
    })();


    // =====================================================
    // 14. LIGHTBOX universal — cualquier [data-lightbox]
    // =====================================================
    (function () {
        const lb      = document.getElementById('ansa-lightbox');
        const lbImg   = document.getElementById('lb-img');
        const lbCap   = document.getElementById('lb-caption');
        const lbClose = document.getElementById('lb-close');

        if (!lb) return;

        function openLB(src, alt) {
            lbImg.src = src;
            lbImg.alt = alt || '';
            lbCap.textContent = alt || '';
            lb.classList.add('open');
            lb.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden';
            lbClose.focus();
        }

        function closeLB() {
            lb.classList.remove('open');
            lb.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';
        }

        lbClose.addEventListener('click', closeLB);
        lb.addEventListener('click', (e) => { if (e.target === lb) closeLB(); });
        document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeLB(); });

        document.addEventListener('click', (e) => {
            const el = e.target.closest('[data-lightbox]');
            if (!el) return;
            const src = el.tagName === 'IMG' ? el.src : el.dataset.lightbox;
            const alt = el.dataset.lightboxCaption || el.alt || el.title || '';
            openLB(src, alt);
        });
    })();


    // =====================================================
    // 15. HERO: typewriter de pill blanca (#tw-text)
    // =====================================================
    (function() {
        // Categorías y cobertura que aparecen en la oferta real del sitio.
        // La primera frase también existe en el HTML para evitar un parpadeo
        // vacío y mantener un mensaje útil si JavaScript no está disponible.
        const words = [
            'Seguridad Industrial',
            'Seguridad Empresarial',
            'Protección Residencial',
            'Seguridad para Condominios',
            'Seguridad Privada en CDMX',
            'Guardias Intramuros',
            'Seguridad Electrónica',
            'Consultoría y Análisis de Riesgos'
        ];
        const el = document.getElementById('tw-text');
        if (!el) return;

        // Respeta la preferencia de reducir movimiento y deja una frase estable.
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            el.textContent = words[0];
            return;
        }

        let wIdx = 0, cIdx = 0, deleting = false;

        function tick() {
            const word = words[wIdx];
            if (!deleting) {
                el.textContent = word.slice(0, ++cIdx);
                if (cIdx === word.length) { deleting = true; setTimeout(tick, 1800); return; }
                setTimeout(tick, 70);
            } else {
                el.textContent = word.slice(0, --cIdx);
                if (cIdx === 0) {
                    deleting = false;
                    wIdx = (wIdx + 1) % words.length;
                    setTimeout(tick, 300);
                    return;
                }
                setTimeout(tick, 35);
            }
        }
        setTimeout(tick, 800);
    })();


    // =====================================================
    // 16. NAVBAR scroll transparente → sólido
    // =====================================================
    (function() {
        const nav = document.getElementById('main-navbar');
        if (!nav) return;
        const onScroll = () => nav.classList.toggle('navbar-scrolled', window.scrollY > 60);
        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();
    })();


    // =====================================================
    // 17. CONTADORES animados ([data-target])
    // =====================================================
    (function() {
        function animCount(el) {
            const target = +el.dataset.target;
            const duration = 1400;
            const step = 16;
            const steps = duration / step;
            let current = 0;
            const inc = target / steps;
            const t = setInterval(() => {
                current = Math.min(current + inc, target);
                el.textContent = Math.round(current);
                if (current >= target) clearInterval(t);
            }, step);
        }

        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(e => {
                if (e.isIntersecting && !e.target.dataset.counted) {
                    e.target.dataset.counted = '1';
                    animCount(e.target);
                }
            });
        }, { threshold: 0.5 });

        document.querySelectorAll('[data-target]').forEach(el => counterObserver.observe(el));
    })();


    // =====================================================
    // 18. PARTÍCULAS canvas en el hero (#hero-canvas)
    // =====================================================
    (function() {
        const canvas = document.getElementById('hero-canvas');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let W, H, particles = [];

        function resize() {
            W = canvas.width  = canvas.offsetWidth;
            H = canvas.height = canvas.offsetHeight;
        }
        window.addEventListener('resize', resize);
        resize();

        const N = 55;
        for (let i = 0; i < N; i++) {
            particles.push({
                x: Math.random() * W,
                y: Math.random() * H,
                r: Math.random() * 1.8 + 0.4,
                vx: (Math.random() - .5) * .35,
                vy: (Math.random() - .5) * .35,
                a: Math.random() * .6 + .2
            });
        }

        function draw() {
            ctx.clearRect(0, 0, W, H);
            particles.forEach(p => {
                p.x += p.vx; p.y += p.vy;
                if (p.x < 0) p.x = W;
                if (p.x > W) p.x = 0;
                if (p.y < 0) p.y = H;
                if (p.y > H) p.y = 0;

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255,255,255,${p.a})`;
                ctx.fill();
            });

            for (let i = 0; i < N; i++) {
                for (let j = i + 1; j < N; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 110) {
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(255,255,255,${.12 * (1 - dist / 110)})`;
                        ctx.lineWidth = .5;
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            }
            requestAnimationFrame(draw);
        }
        draw();
    })();

});

(function () {
  const toast      = document.getElementById('ansa-toast');
  if (!toast) return;
 
  const toastClose = toast.querySelector('.ansa-toast-close');
  let hideTimer;
 
  function showToast(message, isError) {
    toast.classList.toggle('toast-error', !!isError);
    if (message) {
      toast.querySelector('.ansa-toast-text strong').textContent = isError
        ? 'Hubo un problema'
        : '¡Mensaje enviado!';
      toast.querySelector('.ansa-toast-text span').textContent = message;
    }
 
    toast.classList.add('open');
    clearTimeout(hideTimer);
    hideTimer = setTimeout(() => toast.classList.remove('open'), 5500);
  }
 
  toastClose.addEventListener('click', () => {
    toast.classList.remove('open');
    clearTimeout(hideTimer);
  });
 
  // Se conecta al MISMO evento que ya dispara tu lógica de Formspree
  // en main.js. No interfiere con ella: solo añade el toast visual
  // encima de lo que ya hace tu .form-message existente.
  document.querySelectorAll('form[action*="formspree.io"]').forEach(form => {
    form.addEventListener('submit', async function () {
      // Esperamos un tick a que tu handler existente termine su propio
      // fetch; aquí simplemente observamos el resultado vía el mismo
      // .form-message que tu main.js ya rellena, y lo reflejamos en el toast.
      const messageBox = form.querySelector('.form-message');
      if (!messageBox) return;
 
      const observer = new MutationObserver(() => {
        if (!messageBox.classList.contains('d-none')) {
          const isError = messageBox.classList.contains('text-danger');
          showToast(messageBox.textContent.trim(), isError);
          observer.disconnect();
        }
      });
      observer.observe(messageBox, { attributes: true, childList: true });
    });
  });
})();

 
(function () {
  const bubble  = document.getElementById('wa-bubble');
  const btn     = document.getElementById('wa-float-btn');
  if (!bubble || !btn) return;
 
  const ring    = btn.querySelector('.wa-pulse-ring');
  const closeBt = bubble.querySelector('.wa-bubble-close');
 
  const REMINDER_INTERVAL = 45000; // cada 45 segundos
  const BUBBLE_VISIBLE_FOR = 5000;  // se muestra 5 segundos
 
  let stopped = false;
  let intervalId;
 
  function showReminder() {
    if (stopped) return;
 
    bubble.classList.add('visible');
    ring.classList.add('pulsing');
 
    setTimeout(() => {
      bubble.classList.remove('visible');
    }, BUBBLE_VISIBLE_FOR);
 
    // el anillo de pulso se reinicia solo (animación corta de 1.1s),
    // se vuelve a disparar la próxima vez con el siguiente intervalo
    setTimeout(() => ring.classList.remove('pulsing'), 1200);
  }
 
  function stopReminders() {
    stopped = true;
    clearInterval(intervalId);
    bubble.classList.remove('visible');
  }
 
  // Primer recordatorio a los 20s de cargar la página (no de inmediato,
  // para no saturar al usuario apenas llega), luego cada 45s.
  setTimeout(() => {
    showReminder();
    intervalId = setInterval(showReminder, REMINDER_INTERVAL);
  }, 20000);
 
  // Si el usuario hace clic en el botón real de WhatsApp, ya inició
  // la conversación — dejamos de insistir.
  btn.addEventListener('click', stopReminders);
 
  // Si cierra la burbuja manualmente, respetamos eso también.
  closeBt.addEventListener('click', stopReminders);
})();

(function () {
  const isMobile = () => window.innerWidth < 992;
 
  // Los dos toggles que necesitan comportamiento condicional:
  // 1) el link padre "Servicios"
  // 2) el link anidado "Guardias de Seguridad"
  const toggles = [
    document.getElementById('navServicios'),
    document.querySelector('.dropdown-toggle-submenu')
  ].filter(Boolean);
 
  if (!toggles.length) return;
 
  function applyMode() {
    toggles.forEach(link => {
      if (isMobile()) {
        // Móvil: necesita data-bs-toggle para que el primer tap
        // abra el submenú en vez de navegar de inmediato.
        link.setAttribute('data-bs-toggle', 'dropdown');
      } else {
        // Desktop: SIN data-bs-toggle. El link es un <a> normal:
        // un clic navega directo a su href. El menú se abre por
        // separado solo con :hover (tu CSS ya existente).
        link.removeAttribute('data-bs-toggle');
      }
    });
  }
 
  // Aplica el modo correcto al cargar...
  applyMode();
 
  // ...y lo vuelve a evaluar si el usuario rota su dispositivo o
  // redimensiona la ventana cruzando el límite de 992px.
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(applyMode, 150);
  });
})();

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll('[data-current-year]').forEach(el => {
    el.textContent = new Date().getFullYear();
  });

  const badge20 = document.getElementById('badge-20');
  
  if (badge20) {
    // Año oficial de inicio: se configura una sola vez en data-founded-year.
    // Con 2006, el distintivo muestra 20 en 2026 y 25 en 2031 automáticamente.
    const foundedYear = Number.parseInt(badge20.dataset.foundedYear, 10);
    const currentYear = new Date().getFullYear();
    const businessYears = Number.isFinite(foundedYear)
      ? Math.max(0, currentYear - foundedYear)
      : 20;

    document.querySelectorAll('[data-business-years]').forEach(el => {
      el.textContent = businessYears;
    });

    const emblem = badge20.querySelector('.badge-emblem');
    if (emblem) {
      emblem.setAttribute('aria-label', `${businessYears} años protegiendo tu patrimonio`);
    }

    // Añadir el efecto de entrada tras el delay de AOS.
    setTimeout(() => {
      badge20.classList.add('pop-in');
    }, 200);

    // Reducir ligeramente el distintivo al abandonar la parte superior del hero.
    window.addEventListener('scroll', () => {
      if (window.scrollY > 80) {
        badge20.classList.add('scrolled');
      } else {
        badge20.classList.remove('scrolled');
      }
    }, { passive: true });
  }
});
 
