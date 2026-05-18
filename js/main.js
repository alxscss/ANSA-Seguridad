// Esperar a que todo el documento cargue antes de ejecutar el código
document.addEventListener('DOMContentLoaded', function() {
    
    // --- 1. EFECTO DE ESCRITURA DINÁMICA EN PORTADA (HERO) ---
    
    const dynamicText = document.getElementById('dynamic-text');
    // Estas son las frases que irán cambiando, ajústalas como prefieras
    const phrases = [
        "Seguridad Privada",
        "Protección Intramuros",
        "Vigilancia Profesional"
    ];
    
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100; // Velocidad de escritura normal

    function typeEffect() {
        const currentPhrase = phrases[phraseIndex];
        
        if (isDeleting) {
            // Borrando texto
            dynamicText.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 50; // Más rápido al borrar
        } else {
            // Escribiendo texto
            dynamicText.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 100; // Velocidad normal
        }

        // Lógica de cambio de estado
        if (!isDeleting && charIndex === currentPhrase.length) {
            // Terminó de escribir la frase completa
            isDeleting = true;
            typeSpeed = 2000; // Pausa larga al final de la frase
        } else if (isDeleting && charIndex === 0) {
            // Terminó de borrar, pasa a la siguiente frase
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typeSpeed = 500; // Pausa breve antes de empezar a escribir de nuevo
        }

        setTimeout(typeEffect, typeSpeed);
    }

    // Iniciar el efecto si el elemento existe en la página
    if (dynamicText) {
        typeEffect();
    }

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