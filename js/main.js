/* =====================================================
   ELECTROTERM — main.js
   Mobile-first interactions
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ── Navbar: scroll shadow ── */
  const navbar = document.getElementById('navbar');
  const forceSolid = document.body.classList.contains('nav-solid');
  const onScroll = () => {
    navbar.classList.toggle('scrolled', forceSolid || window.scrollY > 10);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ── Navbar: hamburger ── */
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const mobileNav    = document.getElementById('mobileNav');

  if (hamburgerBtn && mobileNav) {
    hamburgerBtn.addEventListener('click', () => {
      const isOpen = mobileNav.classList.contains('open');
      mobileNav.classList.toggle('open', !isOpen);
      hamburgerBtn.classList.toggle('open', !isOpen);
      hamburgerBtn.setAttribute('aria-expanded', String(!isOpen));
      mobileNav.setAttribute('aria-hidden', String(isOpen));
    });

    /* Close mobile nav on link click */
    mobileNav.querySelectorAll('.navbar__mobile-link').forEach(link => {
      link.addEventListener('click', () => {
        mobileNav.classList.remove('open');
        hamburgerBtn.classList.remove('open');
        hamburgerBtn.setAttribute('aria-expanded', 'false');
        mobileNav.setAttribute('aria-hidden', 'true');
      });
    });
  }

  /* ── Accordion (Servicios) ── */
  const accordionItems = document.querySelectorAll('.accordion__item');

  accordionItems.forEach(item => {
    const trigger = item.querySelector('.accordion__trigger');
    const body    = item.querySelector('.accordion__body');

    if (!trigger || !body) return;

    /* Init: if item has open class, set max-height */
    if (item.classList.contains('accordion__item--open')) {
      body.style.maxHeight = body.scrollHeight + 'px';
    }

    trigger.addEventListener('click', () => {
      const isOpen = trigger.getAttribute('aria-expanded') === 'true';

      /* Close all */
      accordionItems.forEach(i => {
        const t = i.querySelector('.accordion__trigger');
        const b = i.querySelector('.accordion__body');
        if (t && b) {
          t.setAttribute('aria-expanded', 'false');
          b.style.maxHeight = null;
          i.classList.remove('accordion__item--open');
        }
      });

      /* Open clicked if it was closed */
      if (!isOpen) {
        trigger.setAttribute('aria-expanded', 'true');
        body.style.maxHeight = body.scrollHeight + 'px';
        item.classList.add('accordion__item--open');
      }
    });
  });

  /* ── Slider (Obras) ── */
  const slides = [
    { img: 'img/proyectos/usal_cba.webp',                     label: 'Universidad del Salvador - Sede Córdoba' },
    { img: 'img/proyectos/sap.webp',                          label: 'SAP - Munro' },
    { img: 'img/proyectos/aeropuertos_argentina.webp',        label: 'Aeropuertos Argentina 2000 - Ezeiza' },
    { img: 'img/proyectos/central_dock_sud.webp',             label: 'Central Térmica Dock Sud' },
    { img: 'img/proyectos/parque_de_la_costa.webp',           label: 'Parque de la Costa' },
    { img: 'img/proyectos/residencia_armada.webp',            label: 'Residencia Sub Oficiales de la Armada Argentina' },
    { img: 'img/proyectos/poder_judicial.webp',               label: 'Poder Judicial de la Nación Argentina' },
    { img: 'img/proyectos/ifibyne.webp',                      label: 'IFIBYNE - CONICET - Ciudad Universitaria' },
    { img: 'img/proyectos/hospital_materno_teresa.webp',      label: 'Hospital Materno Infantil Teresa Luisa Germani' },
    { img: 'img/proyectos/galicia.webp',                      label: 'Banco Galicia - Casa Matriz' },
    { img: 'img/proyectos/subte_linea_h.webp',                label: 'Subte - Buenos Aires Ciudad - Línea H' },
    { img: 'img/proyectos/oracle_pilar.webp',                 label: 'Oracle - Parque Austral Pilar' },
    { img: 'img/proyectos/johnson_mattey.webp',               label: 'Johnson Mattey - Parque Industrial Pilar' },
    { img: 'img/proyectos/hospital_marie_curie.webp',         label: 'Hospital Oncológico Marie Curie' },
    { img: 'img/proyectos/dock_del_plata2.webp',              label: 'Dock del Plata - Puerto Madero' },
    { img: 'img/proyectos/burgerking_shopping.webp',          label: 'BurgerKing - Shopping Alto Avellaneda' },
    { img: 'img/proyectos/storey.webp',                       label: 'Storey - Beccar' },
    { img: 'img/proyectos/bolsa_de_comercio.webp',            label: 'Bolsa de Comercio de Buenos Aires' },
    { img: 'img/proyectos/centro_monitoreo_movilidad.webp',   label: 'Centro de Monitoreo y Movilidad Urbana' },
    { img: 'img/proyectos/coop_floricultores.webp',           label: 'Cooperativa Argentina de Floricultored LTDA' },
    { img: 'img/proyectos/johnson.webp',                      label: 'Tiendas Johnson' },
    { img: 'img/proyectos/lab_glaxo.webp',                    label: 'Laboratorios Glaxo' },
    { img: 'img/proyectos/aysa.webp',                         label: 'Aguas Argentinas - Centro de Cómputos' },
    { img: 'img/proyectos/macro.webp',                        label: 'Banco Macro' },
    { img: 'img/proyectos/farmacia_iosfa.webp',               label: 'Farmacia Hospital Naval Pedro Mallo' },
    { img: 'img/proyectos/polka.webp',                        label: 'Pol-Ka Producciones' },
    { img: 'img/proyectos/ort.webp',                          label: 'Escuela ORT - Sede Núñez' },
    { img: 'img/proyectos/ypf_alcorta.webp',                  label: 'YPF - Av. Figueroa Alcorta' },
    { img: 'img/proyectos/teatro_ribera.webp',                label: 'Teatro de la Ribera' },
    { img: 'img/proyectos/teba_andreani.webp',                label: 'Terminal de Ómnibus de Retiro - Andreani Bus' },
    { img: 'img/proyectos/burgerking_once.webp',              label: 'BurgerKing - Once' },
    { img: 'img/proyectos/cemic.webp',                        label: 'CEMIC - Barrio Norte' },
    { img: 'img/proyectos/usal_marcelot.webp',                label: 'Universidad del Salvador - Sede Marcelo T.' },
    { img: 'img/proyectos/burgerking_villa_urquiza.webp',     label: 'BurgerKing - Villa Urquiza' },
    { img: 'img/proyectos/italiano.webp',                     label: 'Centro Odontológico Hospital Italiano' },
    { img: 'img/proyectos/puma_cordoba.webp',                 label: 'Puma Energy - Av. Córdoba' },
    { img: 'img/proyectos/ypf_paraguay.webp',                 label: 'YPF - Recoleta' },

  ];

  let currentSlide = 0;
  const sliderEl   = document.getElementById('obrasSlider');
  const prevBtn    = document.getElementById('prevSlide');
  const nextBtn    = document.getElementById('nextSlide');

  const renderSlide = (idx) => {
    if (!sliderEl) return;
    const s = slides[idx];
    sliderEl.innerHTML = `
      <div class="obras__slide">
        <img src="${s.img}" alt="${s.label}" class="obras__img placeholder-img" />
        <span class="obras__img-label label-sm">${s.label}</span>
      </div>`;
  };

  if (prevBtn && nextBtn) {
    prevBtn.addEventListener('click', () => {
      currentSlide = (currentSlide - 1 + slides.length) % slides.length;
      renderSlide(currentSlide);
    });
    nextBtn.addEventListener('click', () => {
      currentSlide = (currentSlide + 1) % slides.length;
      renderSlide(currentSlide);
    });
  }

  /* ── Counter Animation (Stats) ── */
  const counterElements = document.querySelectorAll('.stats__number');
  
  const animateCounter = (element) => {
    const target = parseInt(element.textContent.replace(/\D/g, '')); // Extract number
    const prefix = element.textContent.match(/[^\d]/g)?.[0] || ''; // Extract +
    const duration = 2000; // 2 seconds
    const increment = target / (duration / 16); // 60fps
    let current = 0;
    
    const updateCounter = () => {
      current += increment;
      if (current < target) {
        element.textContent = prefix + Math.floor(current);
        requestAnimationFrame(updateCounter);
      } else {
        element.textContent = prefix + target;
      }
    };
    
    updateCounter();
  };
  
  // Intersection Observer to trigger animation when in viewport
  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const counter = entry.target.querySelector('.stats__number');
        if (counter && !counter.classList.contains('animated')) {
          counter.classList.add('animated');
          animateCounter(counter);
        }
      }
    });
  }, { threshold: 0.5 });
  
  // Observe each stats item
  document.querySelectorAll('.stats__item').forEach(item => {
    statsObserver.observe(item);
  });

  /* ── Smooth-scroll for anchor links ── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const top = target.getBoundingClientRect().top + window.scrollY - 72;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  /* ── Contact form: envío real + fallback a WhatsApp ── */
  // ---- Formularios de contacto (Empresa / Particular) ----
  const contactForms = document.querySelectorAll('.js-contact-form');
  if (contactForms.length) {
    // ── Backend: Web3Forms ──────────────────────────────────────────
    //   Pegá la access key que te da web3forms.com (atada a contacto@electroterm.com.py).
    //   Si queda vacía o el envío falla, el form cae a WhatsApp con los datos cargados,
    //   así ningún lead se pierde.
    const WEB3FORMS_KEY   = '2649af76-3d52-4042-a10d-08024f4dd11d';
    const FORM_ENDPOINT   = 'https://api.web3forms.com/submit';
    const WHATSAPP_NUMBER = '595985368085';

    const handleSubmit = async (e) => {
      e.preventDefault();
      const form = e.currentTarget;
      const btn = form.querySelector('button[type="submit"]');
      const original = btn.textContent;
      btn.disabled = true;
      btn.textContent = 'Enviando…';

      const data = Object.fromEntries(new FormData(form).entries());
      data.tipo = form.dataset.tipo || '';

      const done = (label) => {
        btn.textContent = label;
        btn.style.background = 'var(--teal)';
        setTimeout(() => {
          btn.textContent = original;
          btn.disabled = false;
          btn.style.background = '';
          form.reset();
        }, 3500);
      };

      const keyOk = WEB3FORMS_KEY && WEB3FORMS_KEY !== 'TU_ACCESS_KEY';
      if (keyOk) {
        try {
          const res = await fetch(FORM_ENDPOINT, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
            body: JSON.stringify({
              access_key: WEB3FORMS_KEY,
              subject: 'Nuevo contacto web (' + (data.tipo || '') + '): ' + (data.proyecto || ''),
              from_name: 'Web ElectroTerm PY',
              ...data,
              origen: 'web-py',
              fecha: new Date().toISOString()
            })
          });
          const out = await res.json().catch(() => ({}));
          if (res.ok && out.success) { window.location.href = 'gracias.html'; return; }
        } catch (err) {
          /* si falla el envío, caemos a WhatsApp */
        }
      }

      // Fallback sin backend: abrir WhatsApp con el mensaje ya armado
      const lines = [
        'Hola ElectroTerm, quiero hacer una consulta.', '',
        'Tipo: '     + (data.tipo     || ''),
        'Nombre: '   + (data.nombre   || ''),
        'Empresa: '  + (data.empresa  || ''),
        'Rol: '      + (data.rol      || ''),
        'Email: '    + (data.email    || ''),
        'Teléfono: ' + (data.telefono || ''),
        'Necesita: ' + (data.proyecto || ''),
        'Mensaje: '  + (data.mensaje  || '')
      ].filter(l => !l.endsWith(': '));
      const msg = encodeURIComponent(lines.join('\n'));
      window.open('https://wa.me/' + WHATSAPP_NUMBER + '?text=' + msg, '_blank');
      done('Te llevamos a WhatsApp ✓');
    };

    contactForms.forEach(f => f.addEventListener('submit', handleSubmit));

    // Toggle de solapas Empresa / Particular
    const tabs = document.querySelectorAll('.contacto__tab');
    const panes = document.querySelectorAll('.contacto__form[data-pane]');
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const target = tab.dataset.tab;
        tabs.forEach(t => t.classList.toggle('is-active', t === tab));
        panes.forEach(p => p.classList.toggle('is-hidden', p.dataset.pane !== target));
      });
    });
  }

  /* =============================================
   CLIENTES CAROUSEL - AUTO-SCROLL CONTINUO
   Movimiento constante suave + control por teclado
   ============================================= */

// Agregar esto dentro del DOMContentLoaded en main.js

const clientesCarousel = () => {
  const track = document.getElementById('clientesTrack');
  if (!track) return;
  
  // Obtener logos originales
  const originalLogos = Array.from(track.children);
  if (originalLogos.length === 0) return;
  
  // Duplicar logos para crear loop infinito
  // Duplicamos 3 veces para asegurar que siempre haya contenido visible
  const duplicateLogos = () => {
    // Limpiar clones previos si existen
    track.querySelectorAll('.cloned').forEach(el => el.remove());
    
    // Clonar y agregar 3 veces
    for (let i = 0; i < 3; i++) {
      originalLogos.forEach(logo => {
        const clone = logo.cloneNode(true);
        clone.classList.add('cloned');
        track.appendChild(clone);
      });
    }
  };
  
  duplicateLogos();
  
  // Variables de control
  let position = 0;
  let speed = 0.3; // Velocidad base (píxeles por frame) - LENTO para ver logos
  let animationFrame;
  let isPaused = false;
  
  // Función de animación
  const animate = () => {
    if (!isPaused) {
      position -= speed;
      
      // Calcular ancho de un set completo de logos
      const trackWidth = track.scrollWidth / 4; // Dividido por 4 porque duplicamos 3 veces
      
      // Cuando llegamos al final del primer set, reseteamos sin que se note
      if (Math.abs(position) >= trackWidth) {
        position = 0;
      }
      
      track.style.transform = `translateX(${position}px)`;
    }
    
    animationFrame = requestAnimationFrame(animate);
  };
  
  // Iniciar animación
  animate();
  
  // Pausar/reanudar con hover
  track.addEventListener('mouseenter', () => {
    isPaused = true;
  });
  
  track.addEventListener('mouseleave', () => {
    isPaused = false;
  });
  
  // Control por teclado
  let keyPressTimeout;
  let tempSpeedBoost = 0;
  
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      // Adelantar: aumentar velocidad temporalmente
      tempSpeedBoost = 3; // Boost de velocidad
      speed = 2 + tempSpeedBoost;
      
      clearTimeout(keyPressTimeout);
      keyPressTimeout = setTimeout(() => {
        tempSpeedBoost = 0;
        speed = 2; // Volver a velocidad normal
      }, 300);
    } 
    else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      // Retroceder: saltar hacia atrás
      position += 200; // Saltar 200px hacia atrás
    }
  });
  
  // Regenerar clones en resize
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      duplicateLogos();
    }, 250);
  });
  
  // Cleanup
  return () => {
    cancelAnimationFrame(animationFrame);
  };
};

// Llamar la función
clientesCarousel();

});

/* ===== Service: fondo animado (aire) + reveal + contadores ===== */
document.addEventListener('DOMContentLoaded', () => {
  const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Aparición al scroll
  const revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length) {
    if (reduce || !('IntersectionObserver' in window)) {
      revealEls.forEach(el => el.classList.add('in'));
    } else {
      const io = new IntersectionObserver((entries) => {
        entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
      }, { threshold: 0.15 });
      revealEls.forEach(el => io.observe(el));
    }
  }

  // Contador de stats
  const counters = document.querySelectorAll('[data-count]');
  if (counters.length && 'IntersectionObserver' in window) {
    const io2 = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        const el = e.target; io2.unobserve(el);
        const target = parseInt(el.dataset.count, 10) || 0;
        const prefix = el.dataset.prefix || '';
        if (reduce) { el.textContent = prefix + target; return; }
        const dur = 1400, t0 = performance.now();
        const tick = (t) => {
          const p = Math.min(1, (t - t0) / dur);
          el.textContent = prefix + Math.floor(p * target);
          if (p < 1) requestAnimationFrame(tick); else el.textContent = prefix + target;
        };
        requestAnimationFrame(tick);
      });
    }, { threshold: 0.5 });
    counters.forEach(c => io2.observe(c));
  }

  // Campo de partículas (aire) en el panel premium
  const canvas = document.getElementById('svcFlow');
  if (canvas && !reduce) {
    const ctx = canvas.getContext('2d');
    let w = 0, h = 0, dpr = 1, particles = [], mouseX = 0.5, mouseY = 0.5, raf = 0;
    const NUM = 46;
    const rand = (a, b) => a + Math.random() * (b - a);
    const init = () => {
      const r = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = r.width; h = r.height;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      particles = Array.from({ length: NUM }, () => {
        const y = rand(0, h);
        return { x: rand(0, w), base: y, y: y, r: rand(0.6, 2.2), vx: rand(0.15, 0.5), amp: rand(6, 22), phase: rand(0, Math.PI * 2), sp: rand(0.006, 0.016) };
      });
    };
    const draw = (t) => {
      ctx.clearRect(0, 0, w, h);
      const ox = (mouseX - 0.5) * 18, oy = (mouseY - 0.5) * 10;
      for (const p of particles) {
        p.x += p.vx;
        if (p.x > w + 20) { p.x = -20; p.base = rand(0, h); }
        p.y = p.base + Math.sin(t * p.sp + p.phase) * p.amp;
        const x = p.x + ox, y = p.y + oy;
        ctx.strokeStyle = 'rgba(0,180,216,0.10)'; ctx.lineWidth = 1;
        ctx.beginPath(); ctx.moveTo(x - 14, y); ctx.lineTo(x, y); ctx.stroke();
        ctx.fillStyle = 'rgba(120,205,230,0.55)';
        ctx.beginPath(); ctx.arc(x, y, p.r, 0, Math.PI * 2); ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    };
    init(); raf = requestAnimationFrame(draw);
    let rt;
    window.addEventListener('resize', () => { clearTimeout(rt); rt = setTimeout(() => { cancelAnimationFrame(raf); init(); raf = requestAnimationFrame(draw); }, 200); });
    const host = canvas.closest('.svc-premium') || window;
    host.addEventListener('mousemove', (e) => {
      const r = canvas.getBoundingClientRect();
      mouseX = (e.clientX - r.left) / r.width;
      mouseY = (e.clientY - r.top) / r.height;
    });
  }
});
