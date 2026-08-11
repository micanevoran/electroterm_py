/* =====================================================
   ElectroTerm — Modal de ficha técnica
   Abre un modal con la ficha del proyecto (desde <template>).
===================================================== */
document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('fichaModal');
  const content = document.getElementById('fichaContent');
  if (!modal || !content) return;

  const open = (id) => {
    const tpl = document.getElementById('ficha-' + id);
    if (!tpl) return;
    content.innerHTML = tpl.innerHTML;
    content.scrollTop = 0;
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const close = () => {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    content.innerHTML = '';
  };

  document.querySelectorAll('.js-ficha').forEach((btn) => {
    btn.addEventListener('click', () => open(btn.dataset.ficha));
  });

  modal.querySelectorAll('[data-close]').forEach((el) => {
    el.addEventListener('click', close);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) close();
  });
});

/* ===== Carrusel de proyectos ===== */
document.addEventListener('DOMContentLoaded', () => {
  const track = document.getElementById('casosTrack');
  const prev = document.getElementById('casosPrev');
  const next = document.getElementById('casosNext');
  if (!track || !prev || !next) return;

  const step = () => {
    const card = track.querySelector('.caso');
    if (!card) return track.clientWidth;
    const cs = getComputedStyle(track);
    const gap = parseFloat(cs.columnGap || cs.gap) || 24;
    return card.getBoundingClientRect().width + gap;
  };

  prev.addEventListener('click', () => track.scrollBy({ left: -step(), behavior: 'smooth' }));
  next.addEventListener('click', () => track.scrollBy({ left: step(), behavior: 'smooth' }));

  const update = () => {
    const max = track.scrollWidth - track.clientWidth;
    prev.disabled = track.scrollLeft <= 1;
    next.disabled = track.scrollLeft >= max - 1;
  };
  track.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update);
  window.addEventListener('load', update);
  update();
  requestAnimationFrame(update);
});

