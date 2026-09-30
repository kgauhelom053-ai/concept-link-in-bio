(() => {
  const els = [...document.querySelectorAll('.rv')];
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const i = els.indexOf(e.target);
      e.target.style.transitionDelay = `${Math.min(i, 8) * 70}ms`;
      e.target.classList.add('in'); io.unobserve(e.target);
      setTimeout(() => (e.target.style.transitionDelay = ''), 1600);
    });
  }, { threshold: 0.1 });
  els.forEach(el => io.observe(el));

  document.querySelectorAll('[data-count]').forEach(el => {
    const to = +el.dataset.count, t0 = performance.now() + 400;
    const tick = t => { const p = Math.max(0, Math.min(1, (t - t0) / 1500));
      el.textContent = Math.round(to * (1 - Math.pow(1 - p, 3))); if (p < 1) requestAnimationFrame(tick); };
    requestAnimationFrame(tick);
  });

  // subtle tilt on the featured card (pointer devices only)
  const f = document.querySelector('.feature');
  if (f && matchMedia('(hover:hover)').matches) {
    f.addEventListener('pointermove', e => { const r = f.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
      f.style.transform = `perspective(900px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg)`; });
    f.addEventListener('pointerleave', () => (f.style.transform = ''));
    f.style.transition = 'transform .4s cubic-bezier(.2,.8,.2,1)';
  }
})();
