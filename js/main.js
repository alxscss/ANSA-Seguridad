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
            typeSpeed = 1850; // longer pause
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typeSpeed = 420;
        }

        setTimeout(typeEffect, typeSpeed);
    }

    if (dynamicText) {
        // Small delay for better perceived performance
        setTimeout(typeEffect, 650);
    }

    // --- 3. UNIVERSAL FORMSPREE HANDLER + VALIDATION ---
    const forms = document.querySelectorAll('form[action*="formspree.io"]');
    
    forms.forEach(form => {
        const messageBox = form.querySelector('.form-message');
        const submitBtn = form.querySelector('button[type="submit"]');
        const btnText = submitBtn ? submitBtn.querySelector('.btn-text') : null;
        const btnLoading = submitBtn ? submitBtn.querySelector('.btn-loading') : null;

        form.addEventListener('submit', async function(e) {
            e.preventDefault();

            // Basic client-side validation
            const requiredFields = form.querySelectorAll('[required]');
            let isValid = true;

            requiredFields.forEach(field => {
                field.classList.remove('is-invalid');
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('is-invalid');
                } else if (field.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value)) {
                    isValid = false;
                    field.classList.add('is-invalid');
                }
            });

            if (!isValid) {
                if (messageBox) {
                    messageBox.className = 'form-message small text-center mt-2 text-danger';
                    messageBox.textContent = 'Por favor completa los campos requeridos correctamente.';
                    messageBox.classList.remove('d-none');
                }
                return;
            }

            // Show loading state
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
                    
                    // Reset custom states
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

        // Clear error states on input
        form.querySelectorAll('input, textarea, select').forEach(input => {
            input.addEventListener('input', () => input.classList.remove('is-invalid'));
        });
    });

    // --- 4. ELEGANT BACK TO TOP BUTTON ---
    const backToTopBtn = document.getElementById('backToTop');
    
    if (backToTopBtn) {
        const toggleBackToTop = () => {
            if (window.scrollY > 460) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        };

        window.addEventListener('scroll', toggleBackToTop, { passive: true });
        toggleBackToTop(); // initial state

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // --- 5. ENHANCED SMOOTH SCROLL (for non-AOS links) ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href').substring(1);
            if (!targetId) return;
            
            const target = document.getElementById(targetId);
            if (target) {
                e.preventDefault();
                const offset = 70;
                const bodyRect = document.body.getBoundingClientRect().top;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition - bodyRect - offset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- 6. NAVBAR ACTIVE STATE IMPROVEMENT (for single page sections) ---
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    const sections = document.querySelectorAll('section[id]');

    if (navLinks.length && sections.length) {
        const observer = new IntersectionObserver((entries) => {
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

        sections.forEach(section => observer.observe(section));
    }

    // --- 7. Accessibility + Performance polish ---
    // Add aria-labels where helpful on existing interactive elements if missing
    document.querySelectorAll('.whatsapp-btn').forEach(el => {
        if (!el.hasAttribute('aria-label')) {
            el.setAttribute('aria-label', 'Contactar por WhatsApp');
        }
    });

    console.log('%c[ANSA] Sitio modernizado 2026 listo.', 'color:#0a3d62;font-size:9px');
});



// --- 2. PANEL INTERACTIVO DE SERVICIOS INTRAMUROS ---
const menuButtons = document.querySelectorAll('#subservices-menu .list-group-item');
const detailsBox = document.getElementById('sector-details-box');
const detailsIcon = document.getElementById('details-icon');
const detailsTitle = document.getElementById('details-title');
const detailsText = document.getElementById('details-text');
const detailsImage = document.getElementById('details-image'); // Capturamos la nueva imagen

// Base de datos local con textos, iconos e imágenes dinámicas
const sectorData = {
    corporativo: {
        title: "Seguridad en Corporativos",
        icon: "fa-building",
        image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",
        html: `<p>Protección especializada para edificios administrativos, complejos de oficinas y centros de negocios. Nuestro personal se enfoca en:</p>
               <ul class="ps-3 mt-2 mb-0">
                   <li>Control estricto de accesos peatonales y vehiculares.</li>
                   <li>Recepción y registro de visitas y proveedores bajo protocolos corporativos.</li>
                   <li>Monitoreo preventivo y rondines para verificar equipos apagados al salir el personal.</li>
               </ul>`
    },
    comercio: {
        title: "Seguridad en Comercios",
        icon: "fa-shop",
        image: "https://i.pinimg.com/originals/f6/cd/a2/f6cda2219028b710a91a049957a1e162.jpg",
        html: `<p>Vigilancia diseñada para mitigar pérdidas y salvaguardar la experiencia de compra en centros comerciales y puntos de venta:</p>
               <ul class="ps-3 mt-2 mb-0">
                   <li>Prevención activa de pérdidas, fardería y conductas delictivas intramuros.</li>
                   <li>Control de flujos en accesos principales y salidas de emergencia.</li>
                   <li>Inspección disuasiva y atención al cliente ante incidentes menores.</li>
               </ul>`
    },
    industria: {
        title: "Seguridad Industrial",
        icon: "fa-industry",
        image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80",
        html: `<p>Operaciones estrictas para plantas de producción, CEDIS y parques industriales donde el control de inventario es crítico:</p>
               <ul class="ps-3 mt-2 mb-0">
                   <li>Inspección de transporte de carga, sellos de seguridad y bitácoras de embarque.</li>
                   <li>Rondines perimetrales continuos para detectar actos inseguros.</li>
                   <li>Revisión estricta para evitar la introducción de materiales riesgosos.</li>
               </ul>`
    },
    educativo: {
        title: "Seguridad en Centros Educativos",
        icon: "fa-graduation-cap",
        image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=800&q=80",
        html: `<p>Resguardo e integridad para campus universitarios, colegios y centros de enseñanza, priorizando el entorno pacífico:</p>
               <ul class="ps-3 mt-2 mb-0">
                   <li>Control de acceso estricto a personas ajenas a la comunidad estudiantil.</li>
                   <li>Patrullaje preventivo en áreas comunes, laboratorios y estacionamientos.</li>
                   <li>Protocolos de respuesta inmediata ante emergencias escolares.</li>
               </ul>`
    },
    transporte: {
        title: "Seguridad en Transporte Público",
        icon: "fa-bus",
        image: "https://assets.volvo.com/is/image/VolvoInformationTechnologyAB/Banderazo-Mexib%C3%BAs-L1?wid=1024",
        html: `<p>Plantillas operativas especializadas en resguardar infraestructura masiva como estaciones, andenes y terminales (ej. Mexibús):</p>
               <ul class="ps-3 mt-2 mb-0">
                   <li>Control de accesos en torniquetes y pasillos de flujo masivo.</li>
                   <li>Vigilancia disuasiva frente a vandalismo o alteración del orden.</li>
                   <li>Reporte diario e inmediato de anomalías operativas.</li>
               </ul>`
    },
    residencial: {
        title: "Seguridad Residencial",
        icon: "fa-house-chimney", // Icono corregido y más compatible
        image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80",
        html: `<p>Protección familiar y patrimonial para fraccionamientos, condominios horizontales y torres residenciales:</p>
               <ul class="ps-3 mt-2 mb-0">
                   <li>Identificación obligatoria y control de visitas mediante bitácora o interfón.</li>
                   <li>Supervisión de personal de mantenimiento externo y correspondencia.</li>
                   <li>Rondines nocturnos con reporte constante vía radiofrecuencia.</li>
               </ul>`
    },
    canino: {
        title: "Elementos Caninos (K9)",
        icon: "fa-dog",
        image: "https://media.breitbart.com/media/2022/06/file-k-9-officers-wearing-bulletproof-vests-gettyimages-640x335.jpg",
        html: `<p>Unidades tácticas especializadas que combinan la disciplina del manejador con las capacidades instintivas del can:</p>
               <ul class="ps-3 mt-2 mb-0">
                   <li>Binomios para disuasión perimetral de alto impacto visual.</li>
                   <li>Apoyo operativo en inspecciones de almacenes o zonas de carga.</li>
                   <li>Entrenamiento enfocado en obediencia avanzada y guardia activa.</li>
               </ul>`
    }
};

if (menuButtons.length > 0 && detailsBox) {
    menuButtons.forEach(button => {
        button.addEventListener('click', function() {
            menuButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            const sector = this.getAttribute('data-sector');
            const data = sectorData[sector];
            
            if (data) {
                // Desvanecer TODO el contenedor (imagen + texto)
                detailsBox.style.opacity = '0';
                
                setTimeout(() => {
                    // Actualizar Imagen
                    if(detailsImage) detailsImage.src = data.image;
                    
                    // Actualizar Textos e Iconos
                    detailsIcon.className = `fa-solid ${data.icon} fs-3`;
                    detailsTitle.textContent = data.title;
                    detailsText.innerHTML = data.html;
                    
                    // Aparecer de nuevo
                    detailsBox.style.opacity = '1';
                }, 250); // Pausa de un cuarto de segundo para que el cerebro note el cambio
            }
        });
    });
}

// --- 3. BOTONES DE DESPLAZAMIENTO PARA MENÚ MÓVIL EN SERVICIOS ---
const scrollRightBtn = document.getElementById('scrollRightBtn');
const scrollLeftBtn = document.getElementById('scrollLeftBtn'); // Agregamos el izquierdo
const subservicesMenu = document.getElementById('subservices-menu');

if (subservicesMenu) {
    // Al hacer clic en derecha, mueve 150px positivos
    if (scrollRightBtn) {
        scrollRightBtn.addEventListener('click', () => {
            subservicesMenu.scrollBy({ left: 150, behavior: 'smooth' });
        });
    }
    
    // Al hacer clic en izquierda, mueve 150px negativos
    if (scrollLeftBtn) {
        scrollLeftBtn.addEventListener('click', () => {
            subservicesMenu.scrollBy({ left: -150, behavior: 'smooth' });
        });
    }

    // Lógica inteligente para ocultar/mostrar botones
    subservicesMenu.addEventListener('scroll', () => {
        // Calculamos si llegó al tope final o al tope inicial
        const isAtEnd = subservicesMenu.scrollLeft + subservicesMenu.clientWidth >= subservicesMenu.scrollWidth - 10;
        const isAtStart = subservicesMenu.scrollLeft <= 10;

        // Control del botón derecho
        if (scrollRightBtn) {
            if (isAtEnd) {
                scrollRightBtn.style.opacity = '0';
                setTimeout(() => scrollRightBtn.style.display = 'none', 300);
            } else {
                scrollRightBtn.style.display = 'block';
                setTimeout(() => scrollRightBtn.style.opacity = '0.9', 10);
            }
        }

        // Control del botón izquierdo
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

// === 4. SMOOTH SCROLL para enlaces internos ===
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        if (this.getAttribute('href') !== '#') {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
});

// === 5. Back to Top Button ===
const backToTop = document.createElement('button');
backToTop.innerHTML = '<i class="fa-solid fa-arrow-up"></i>';
backToTop.className = 'btn btn-dark rounded-circle position-fixed bottom-5 end-5 shadow';
backToTop.style.display = 'none';
backToTop.style.zIndex = '1000';
document.body.appendChild(backToTop);

window.addEventListener('scroll', () => {
    backToTop.style.display = window.scrollY > 400 ? 'block' : 'none';
});

backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});



/* ── División Electrónica: tabs imagen + cards ──────────────── */
(function () {
  const thumbs   = document.querySelectorAll('.elec-thumb');
  const cards    = document.querySelectorAll('.elec-service-card');
  const mainImg  = document.getElementById('elecMainImg');
  const badge    = document.getElementById('elecBadge');
  const badgeTxt = document.getElementById('elecBadgeText');
 
  if (!mainImg) return;
 
  function activateIndex(i) {
    // Thumbs
    thumbs.forEach((t, idx) => t.classList.toggle('active', idx === i));
    // Cards
    cards.forEach((c, idx) => c.classList.toggle('active-card', idx === i));
 
    // Imagen con fade
    const thumb = thumbs[i];
    mainImg.style.opacity = '0';
    setTimeout(() => {
      mainImg.src = thumb.dataset.img;
      mainImg.style.opacity = '1';
      badgeTxt.textContent  = thumb.dataset.badge;
    }, 200);
  }
 
  // Click en thumbnails
  thumbs.forEach((t, i) => t.addEventListener('click', () => activateIndex(i)));
 
  // Click en cards también activa la miniatura correspondiente
  cards.forEach((c, i) => c.addEventListener('click', () => activateIndex(i)));
})();
 
 
/* ── Lightbox universal ─────────────────────────────────────── */
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
    document.body.style.overflow = 'hidden';
  }
 
  function closeLB() {
    lb.classList.remove('open');
    document.body.style.overflow = '';
  }
 
  // Cerrar con botón X
  lbClose.addEventListener('click', closeLB);
 
  // Cerrar al hacer clic en el fondo
  lb.addEventListener('click', (e) => { if (e.target === lb) closeLB(); });
 
  // Cerrar con Escape
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeLB(); });
 
  // Delegar clics en cualquier elemento con [data-lightbox]
  document.addEventListener('click', (e) => {
    const el = e.target.closest('[data-lightbox]');
    if (!el) return;
    const src = el.tagName === 'IMG' ? el.src : el.dataset.lightbox;
    const alt = el.dataset.lightboxCaption || el.alt || el.title || '';
    openLB(src, alt);
  });
})();
 




/* ── 1. Typewriter ─────────────────────────────────────────── */
(function() {
  const words  = ['Seguridad Industrial','Seguridad Empresarial','Protección Residencial','Soluciones Integrales','División Electrónica'];
  const el     = document.getElementById('tw-text');
  if (!el) return;
 
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
 
 
/* ── 2. Navbar scroll transparente → sólido ──────────────── */
(function() {
  const nav = document.getElementById('main-navbar');
  if (!nav) return;
  const onScroll = () => nav.classList.toggle('navbar-scrolled', window.scrollY > 60);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();
 
 
/* ── 3. Contadores animados (hero + nosotros) ─────────────── */
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
 
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting && !e.target.dataset.counted) {
        e.target.dataset.counted = '1';
        animCount(e.target);
      }
    });
  }, { threshold: 0.5 });
 
  document.querySelectorAll('[data-target]').forEach(el => observer.observe(el));
})();
 
 
/* ── 4. Partículas canvas en el hero ─────────────────────── */
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
 
    // Líneas de conexión
    for (let i = 0; i < N; i++) {
      for (let j = i + 1; j < N; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx*dx + dy*dy);
        if (dist < 110) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(255,255,255,${.12 * (1 - dist/110)})`;
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
