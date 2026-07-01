/* =========================================
   LOADER (Optimizado - Branding + Velocidad)
   ========================================= */
window.addEventListener('DOMContentLoaded', () => {
    const loader = document.getElementById('loader');
    if (loader) {
        // Tiempo mínimo para que el logo sea visible (0.8s - ajustable)
        const tiempoMinimo = 800; // milisegundos
        const inicio = performance.now();

        function ocultarLoader() {
            const transcurrido = performance.now() - inicio;
            const retraso = Math.max(0, tiempoMinimo - transcurrido);

            setTimeout(() => {
                loader.style.opacity = '0';
                loader.addEventListener('transitionend', () => {
                    loader.style.display = 'none';
                }, { once: true });
            }, retraso);
        }

        ocultarLoader();
    }
});
/* =========================================
   LOADER sin optimizar
   ========================================= */
/*window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    if (loader) {
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
            }, 500);
        }, 1000);
    }
});*/

/* =========================================
   CAMBIO DE VISTA (TEMA + ENLACES DEL NAV Y FOOTER)
   ========================================= */
const vistaWeb = document.getElementById('vista-web');
const vistaSoporte = document.getElementById('vista-soporte');
const body = document.body;

// Grupos de enlaces de cada vista (nav)
const grupoWeb = document.getElementById('nav-web');
const grupoSoporte = document.getElementById('nav-soporte');

// Enlaces que cambian de vista
const linkWeb = document.getElementById('link-web');
const linkSoporte = document.getElementById('link-soporte');

// Footer
const footerNavWeb = document.getElementById('footer-nav-web');
const footerNavSoporte = document.getElementById('footer-nav-soporte');

// Título y meta descripción dinámicos para SEO
const titulo = document.querySelector('title');
const metaDesc = document.querySelector('meta[name="description"]');

// Botón de cambio de vista en el nav
const btnCambiarVista = document.getElementById('btn-cambiar-vista');

// Función para cambiar mensaje entre vistas
const waButton = document.querySelector('.wa-button');

function cambiarVista(tipo) {
    if (tipo === 'web') {
        vistaWeb.classList.add('activa');
        vistaSoporte.classList.remove('activa');
        body.classList.remove('tema-claro');

        if (grupoWeb) grupoWeb.style.display = 'flex';
        if (grupoSoporte) grupoSoporte.style.display = 'none';

        // En escritorio, solo mostramos el enlace hacia la otra vista (controlado por CSS)
        if (linkWeb) {
            linkWeb.classList.remove('visible-desktop');
            linkWeb.classList.add('oculto-desktop');
        }
        if (linkSoporte) {
            linkSoporte.classList.remove('visible-desktop');
            linkSoporte.classList.add('oculto-desktop');
        }
        if (footerNavWeb) footerNavWeb.style.display = 'block';
        if (footerNavSoporte) footerNavSoporte.style.display = 'none';

        if (titulo) titulo.textContent = 'Digital.Hec[It] | Desarrollo Web Profesional';
        if (metaDesc) metaDesc.setAttribute('content', 'Diseño y desarrollo de páginas web, tiendas online y mantenimiento web. Soluciones digitales a medida para negocios en toda Colombia.');

        // Volver al inicio
        window.scrollTo({ top: 0, behavior: 'smooth' });
        // Opcional: enfocar el header de la vista activa
        document.getElementById('inicio-web')?.focus({ preventScroll: true });

    } else if (tipo === 'soporte') {
        vistaSoporte.classList.add('activa');
        vistaWeb.classList.remove('activa');
        body.classList.add('tema-claro');

        if (grupoWeb) grupoWeb.style.display = 'none';
        if (grupoSoporte) grupoSoporte.style.display = 'flex';
        if (linkWeb) {
            linkWeb.classList.remove('oculto-desktop');
            linkWeb.classList.add('visible-desktop');
        }
        if (linkSoporte) {
            linkSoporte.classList.remove('oculto-desktop');
            linkSoporte.classList.add('visible-desktop');
        }
        if (footerNavWeb) footerNavWeb.style.display = 'none';
        if (footerNavSoporte) footerNavSoporte.style.display = 'block';

        if (titulo) titulo.textContent = 'Digital.Hec[It] | Soporte Técnico de Computadoras en Cali';
        if (metaDesc) metaDesc.setAttribute('content', 'Mantenimiento preventivo, reparación y soporte técnico de computadores y redes en Cali. Servicio rápido, profesional y a domicilio.');

        // Volver al inicio
        window.scrollTo({ top: 0, behavior: 'smooth' });
        document.getElementById('inicio-soporte')?.focus({ preventScroll: true });
    }

    // Actualizar botón cambiador de vista en el nav

    if (btnCambiarVista) {
        if (tipo === 'web') {
            btnCambiarVista.textContent = 'Soporte Técnico';
            btnCambiarVista.href = '#';
            btnCambiarVista.onclick = (e) => {
                e.preventDefault();
                cambiarVista('soporte');
            };
        } else {
            btnCambiarVista.textContent = 'Desarrollo Web';
            btnCambiarVista.href = '#';
            btnCambiarVista.onclick = (e) => {
                e.preventDefault();
                cambiarVista('web');
            };
        }
    }

    // Actualizar mensaje del boton flotante de whatsapp según la vista
    if (waButton) {
        if (tipo === 'web') {
            waButton.href = 'https://wa.me/573161621202?text=' + encodeURIComponent('¡Hola, Digital.Hec[It]! Vi su página web y me gustaría recibir información sobre desarrollo web. ¿Podrían ayudarme?');
        } else {
            waButton.href = 'https://wa.me/573161621202?text=' + encodeURIComponent('¡Hola, Digital.Hec[It]! Vi su página web y necesito soporte técnico para mi computadora. ¿Podrían ayudarme?');
        }
    }
}

// Listeners para los enlaces del menú principal
if (linkWeb) linkWeb.addEventListener('click', (e) => { e.preventDefault(); cambiarVista('web'); });
if (linkSoporte) linkSoporte.addEventListener('click', (e) => { e.preventDefault(); cambiarVista('soporte'); });

/* =========================================
   MENÚ HAMBURGUESA (COMÚN)
   ========================================= */
const mobileMenu = document.getElementById('mobile-menu');
const navLinks = document.getElementById('nav-links');

if (mobileMenu && navLinks) {
    mobileMenu.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        mobileMenu.classList.toggle('is-active');

        document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';

    });

    // Cerrar al hacer clic en un enlace
    const enlacesMenu = navLinks.querySelectorAll('a');
    enlacesMenu.forEach(enlace => {
        enlace.addEventListener('click', () => {
            navLinks.classList.remove('active');
            mobileMenu.classList.remove('is-active');

            document.body.style.overflow = '';

        });
    });

    // Cerrar al hacer clic fuera
    document.addEventListener('click', (event) => {
        const isClickInside = navLinks.contains(event.target);
        const isClickOnToggle = mobileMenu.contains(event.target);
        if (!isClickInside && !isClickOnToggle && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            mobileMenu.classList.remove('is-active');

            document.body.style.overflow = '';

        }
    });
}

/* =========================================
   CARRUSEL 3D (Vista Desarrollo Web)
   ========================================= */
function initCarousel() {
    const slides = document.querySelectorAll('#vista-web .carousel-slide');
    const dots = document.querySelectorAll('#vista-web .carousel-dots .dot');
    const btnNext = document.querySelector('#vista-web .carousel-btn.next');
    const btnPrev = document.querySelector('#vista-web .carousel-btn.prev');
    if (!slides.length) return;

    let currentSlide = 0;
    const totalSlides = slides.length;

    function updateCarousel(newIndex) {
        slides.forEach((slide, index) => {
            slide.classList.remove('slide-active', 'slide-next', 'slide-prev', 'slide-hidden-left', 'slide-hidden-right');
            if (index === newIndex) {
                slide.classList.add('slide-active');
            } else if (index === (newIndex + 1) % totalSlides) {
                slide.classList.add('slide-next');
            } else if (index === (newIndex - 1 + totalSlides) % totalSlides) {
                slide.classList.add('slide-prev');
            } else {
                slide.classList.add('slide-hidden-right');
            }
        });
        dots.forEach((dot, index) => dot.classList.toggle('active', index === newIndex));
        currentSlide = newIndex;
    }

    if (btnNext) btnNext.addEventListener('click', () => updateCarousel((currentSlide + 1) % totalSlides));
    if (btnPrev) btnPrev.addEventListener('click', () => updateCarousel((currentSlide - 1 + totalSlides) % totalSlides));

    dots.forEach((dot, index) => dot.addEventListener('click', () => updateCarousel(index)));

    // Swipe táctil
    const track = document.querySelector('#vista-web .carousel-track');
    if (track) {
        let touchStartX = 0;
        track.addEventListener('touchstart', (e) => { touchStartX = e.changedTouches[0].screenX; });
        track.addEventListener('touchend', (e) => {
            const diff = touchStartX - e.changedTouches[0].screenX;
            if (diff > 50) updateCarousel((currentSlide + 1) % totalSlides);
            if (diff < -50) updateCarousel((currentSlide - 1 + totalSlides) % totalSlides);
        });
    }

    // Clic en slides adyacentes
    slides.forEach((slide, index) => {
        slide.addEventListener('click', () => { if (index !== currentSlide) updateCarousel(index); });
    });
}

/* =========================================
   MODAL DE PROYECTOS (Vista Desarrollo Web)
   ========================================= */
function initModal() {
    const modal = document.getElementById('projectModal');
    const btnClose = document.getElementById('closeModal');
    const modalImg = document.getElementById('modalImg');
    const modalTitle = document.getElementById('modalTitle');
    const modalDesc = document.getElementById('modalDesc');
    const modalTags = document.getElementById('modalTags');
    const modalLink = document.getElementById('modalLink');
    if (!modal) return;

    const projectLinks = document.querySelectorAll('#vista-web .slide-link');
    projectLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            const slide = link.closest('.carousel-slide');
            if (!slide) return;
            modalImg.src = slide.querySelector('img')?.src || '';
            modalTitle.textContent = slide.querySelector('h4')?.textContent || '';
            modalDesc.textContent = slide.querySelector('p')?.textContent || '';
            const tagsHTML = slide.querySelector('.slide-tags')?.innerHTML || '';
            modalTags.innerHTML = tagsHTML;
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    if (btnClose) {
        btnClose.addEventListener('click', () => {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        });
    }
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

/* =========================================
   SERVICIOS INTERACTIVOS (Vista Soporte)
   ========================================= */

function initServiciosSoporte() {
    const opciones = document.querySelectorAll('#vista-soporte .servicio-opcion');
    const detalleIcon = document.querySelector('#vista-soporte .detalle-icon');
    const detalleTitulo = document.querySelector('#vista-soporte .detalle-titulo');
    const detalleTexto = document.querySelector('#vista-soporte .detalle-texto');
    const detalleLink = document.querySelector('#vista-soporte .detalle-link');
    if (!opciones.length) return;

    const serviciosData = {
        1: { icon: '🛠️', title: 'Mantenimiento preventivo', text: 'Limpieza profunda de componentes internos y externos, cambio de pasta térmica y verificación de ventiladores para prevenir sobrecalentamiento y fallos prematuros.', link: '#' },
        2: { icon: '💻', title: 'Instalación y optimización', text: 'Instalamos sistemas operativos, controladores, programas esenciales y optimizamos la configuración del sistema para un rendimiento más rápido y estable.', link: '#' },
        3: { icon: '🛡️', title: 'Eliminación de virus', text: 'Escanemos y eliminamos cualquier tipo de virus, spyware, ransomware o adware. Restauramos la seguridad de tu equipo con herramientas avanzadas.', link: '#' },
        4: { icon: '💾', title: 'Recuperación de datos', text: 'Recuperamos archivos borrados o perdidos por formateo, fallo de disco o virus. Trabajamos con discos duros, SSD y memorias USB.', link: '#' },
        5: { icon: '🔧', title: 'Redes y periféricos', text: 'Configuramos redes WiFi, cableado de red, impresoras, escáneres y otros dispositivos para que todo funcione conectado y sin conflictos.', link: '#' }
    };

    opciones.forEach(opcion => {
        opcion.addEventListener('click', () => {
            const id = opcion.getAttribute('data-id');
            const data = serviciosData[id];
            if (!data) return;

            // En móvil (<=900px): acordeón — toggle de la clase active
            if (window.innerWidth <= 900) {
                opciones.forEach(o => {
                    if (o !== opcion) o.classList.remove('active');
                });
                opcion.classList.toggle('active');
            }
            // En escritorio: comportamiento original (columna derecha)
            else {
                opciones.forEach(o => o.classList.remove('active'));
                opcion.classList.add('active');
                if (detalleIcon && detalleTitulo && detalleTexto) {
                    detalleIcon.textContent = data.icon;
                    detalleTitulo.textContent = data.title;
                    detalleTexto.textContent = data.text;
                    if (detalleLink) detalleLink.href = data.link;
                }
            }
        });
    });
}

/*function initServiciosSoporte() {
    const opciones = document.querySelectorAll('#vista-soporte .servicio-opcion');
    const detalleIcon = document.querySelector('#vista-soporte .detalle-icon');
    const detalleTitulo = document.querySelector('#vista-soporte .detalle-titulo');
    const detalleTexto = document.querySelector('#vista-soporte .detalle-texto');
    const detalleLink = document.querySelector('#vista-soporte .detalle-link');
    if (!opciones.length) return;

    const serviciosData = {
        1: { icon: '🛠️', title: 'Mantenimiento preventivo', text: 'Limpieza profunda de componentes internos y externos, cambio de pasta térmica y verificación de ventiladores para prevenir sobrecalentamiento y fallos prematuros.', link: '#' },
        2: { icon: '💻', title: 'Instalación y optimización', text: 'Instalamos sistemas operativos, controladores, programas esenciales y optimizamos la configuración del sistema para un rendimiento más rápido y estable.', link: '#' },
        3: { icon: '🛡️', title: 'Eliminación de virus', text: 'Escanemos y eliminamos cualquier tipo de virus, spyware, ransomware o adware. Restauramos la seguridad de tu equipo con herramientas avanzadas.', link: '#' },
        4: { icon: '💾', title: 'Recuperación de datos', text: 'Recuperamos archivos borrados o perdidos por formateo, fallo de disco o virus. Trabajamos con discos duros, SSD y memorias USB.', link: '#' },
        5: { icon: '🔧', title: 'Redes y periféricos', text: 'Configuramos redes WiFi, cableado de red, impresoras, escáneres y otros dispositivos para que todo funcione conectado y sin conflictos.', link: '#' }
    };

    opciones.forEach(opcion => {
        opcion.addEventListener('click', () => {
            opciones.forEach(o => o.classList.remove('active'));
            opcion.classList.add('active');
            const id = opcion.getAttribute('data-id');
            const data = serviciosData[id];
            if (data && detalleIcon && detalleTitulo && detalleTexto) {
                detalleIcon.textContent = data.icon;
                detalleTitulo.textContent = data.title;
                detalleTexto.textContent = data.text;
                if (detalleLink) detalleLink.href = data.link;
            }
        });
    });
}*/

/* =========================================
   SCROLL REVEAL (común)
   ========================================= */
function initScrollReveal() {
    const reveals = document.querySelectorAll('.reveal');
    if (!reveals.length) return;
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });
    reveals.forEach(el => observer.observe(el));
}

/* =========================================
   CURSOR PERSONALIZADO
   ========================================= */

function initCustomCursor() {
    const dot = document.querySelector('.cursor-dot');
    const outline = document.querySelector('.cursor-outline');
    if (!dot || !outline) return;

    let mouseX = 0, mouseY = 0;
    let rafId = null;

    window.addEventListener('mousemove', (e) => {
        if (document.body.classList.contains('tema-claro')) return;
        mouseX = e.clientX;
        mouseY = e.clientY;
        if (!rafId) {
            rafId = requestAnimationFrame(updateCursor);
        }
    });

    function updateCursor() {
        dot.style.left = mouseX + 'px';
        dot.style.top = mouseY + 'px';
        outline.style.left = mouseX + 'px';
        outline.style.top = mouseY + 'px';
        rafId = null;
    }

    const clickables = document.querySelectorAll('a, button, .service-card, .portfolio-item, .method-card, .menu-toggle');
    clickables.forEach(el => {
        el.addEventListener('mouseenter', () => {
            outline.classList.add('hover');
            dot.classList.add('hover');
        });
        el.addEventListener('mouseleave', () => {
            outline.classList.remove('hover');
            dot.classList.remove('hover');
        });
    });
}

/* vieja 
function initCustomCursor() {
 const dot = document.querySelector('.cursor-dot');
 const outline = document.querySelector('.cursor-outline');
 if (!dot || !outline) return;

 window.addEventListener('mousemove', (e) => {
     dot.style.left = `${e.clientX}px`;
     dot.style.top = `${e.clientY}px`;
     outline.animate({ left: `${e.clientX}px`, top: `${e.clientY}px` }, { duration: 500, fill: "forwards" });
 });

 const clickables = document.querySelectorAll('a, button, .service-card, .portfolio-item, .method-card, .menu-toggle');
 clickables.forEach(el => {
     el.addEventListener('mouseenter', () => { outline.classList.add('hover'); dot.classList.add('hover'); });
     el.addEventListener('mouseleave', () => { outline.classList.remove('hover'); dot.classList.remove('hover'); });
 });
}
*/
/* =========================================
// Interceptar envío de formularios de Formspree
        ========================================= */

function initFormularios() {
    const formularios = document.querySelectorAll('form[action*="formspree.io"]');
    formularios.forEach(form => {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = new FormData(form);
            const response = await fetch(form.action, {
                method: 'POST',
                body: formData,
                headers: { 'Accept': 'application/json' }
            });
            if (response.ok) {
                // Detectar qué vista está activa para personalizar la página de gracias
                const vistaActiva = document.querySelector('.vista.activa');
                let origen = 'web';
                if (vistaActiva && vistaActiva.id === 'vista-soporte') {
                    origen = 'soporte';
                }
                window.location.href = 'gracias.html?origen=' + origen;
            } else {
                alert('⚠️ Hubo un error. Intenta de nuevo más tarde.');
            }
        });
    });
}
/*function initFormularios() {
    const formularios = document.querySelectorAll('form[action*="formspree.io"]');
    formularios.forEach(form => {
        form.addEventListener('submit', async (e) => {
            e.preventDefault(); // Evita la recarga
            const formData = new FormData(form);
            const response = await fetch(form.action, {
                method: 'POST',
                body: formData,
                headers: { 'Accept': 'application/json' }
            });
            if (response.ok) {
                // Limpiar campos
                form.reset();
                // Mostrar toast de confirmación
                const toast = document.createElement('div');
                toast.textContent = '✅ ¡Mensaje enviado!';
                toast.style.cssText = `
                    position: fixed; bottom: 30px; left: 50%; transform: translateX(-50%);
                    background: var(--accent); color: #0f172a; padding: 12px 24px;
                    border-radius: 40px; font-weight: 600; z-index: 9999;
                    box-shadow: 0 6px 20px rgba(14,165,233,0.4);
                    animation: fadeUpToast 0.4s ease-out;
                `;
                document.body.appendChild(toast);
                setTimeout(() => {
                    toast.style.opacity = '0';
                    setTimeout(() => toast.remove(), 400);
                }, 2500);
            } else {
                alert('⚠️ Hubo un error. Intenta de nuevo más tarde.');
            }
        });
    });
}*/

// =============================================
// Inicializar todo al cargar Y aplicar vista inicial
// =============================================
window.addEventListener('DOMContentLoaded', () => {
    cambiarVista('web');

    initCarousel();
    initModal();
    initServiciosSoporte();
    initScrollReveal();
    initCustomCursor();
    initFormularios();

    const backBtn = document.getElementById('back-to-top');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 600) {
            backBtn.classList.add('visible');
        } else {
            backBtn.classList.remove('visible');
        }
    });
    backBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    /*
    const backBtn = document.getElementById('back-to-top');
    window.addEventListener('scroll', () => {
        backBtn.style.opacity = window.scrollY > 600 ? '1' : '0';
    });
    backBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });*/
});