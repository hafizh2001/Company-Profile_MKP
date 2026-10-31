(() => {
  const section = document.querySelector('#partners');
  const viewport = document.querySelector('#partner-viewport');
  const track = document.querySelector('#partner-track');
  const toggle = document.querySelector('#partner-toggle');
  const previous = document.querySelector('#partner-prev');
  const next = document.querySelector('#partner-next');
  const status = document.querySelector('#partner-status');
  const motionPreference = matchMedia('(prefers-reduced-motion: reduce)');
  let paused = motionPreference.matches;
  let hovered = false;
  let focused = false;
  let drag = null;
  let lastTime = null;
  let autoPosition = viewport.scrollLeft;
  const copy = {
    id: {eyebrow:'OUR PARTNERS',title:'Mitra & pelanggan kami',description:'Bagian dari perjalanan engineering kami.',hint:'Jeda untuk menjelajahi logo. Geser atau gunakan tombol panah.',pause:'Jeda',play:'Putar',pauseLabel:'Jeda pergeseran logo',playLabel:'Putar pergeseran logo',left:'Geser logo ke kiri',right:'Geser logo ke kanan',region:'Logo mitra dan pelanggan',list:'Mitra dan pelanggan dalam company profile',paused:'Pergeseran dijeda',playing:'Bergeser otomatis'},
    en: {eyebrow:'OUR PARTNERS',title:'Our partners & customers',description:'Part of our engineering journey.',hint:'Pause to explore. Drag, swipe or use the arrow buttons.',pause:'Pause',play:'Play',pauseLabel:'Pause logo scrolling',playLabel:'Play logo scrolling',left:'Scroll logos left',right:'Scroll logos right',region:'Partner and customer logos',list:'Partners and customers in our company profile',paused:'Scrolling paused',playing:'Auto-scrolling'}
  };
  const words = () => copy[document.documentElement.lang === 'en' ? 'en' : 'id'];
  const sets = [];
  for (let repeat = 0; repeat < 2; repeat++) {
    const list = document.createElement('ul');
    list.className = 'partner-set';
    if (repeat) list.setAttribute('aria-hidden', 'true');
    partnerLogos.forEach(partner => {
      const item = document.createElement('li');
      item.className = 'partner-logo';
      const img = document.createElement('img');
      img.src = partner.src;
      img.alt = repeat ? '' : partner.name;
      img.draggable = false;
      img.width = 160;
      img.height = 70;
      img.loading = 'lazy';
      item.append(img);
      list.append(item);
    });
    track.append(list);
    sets.push(list);
  }
  function refreshLabels() {
    const text = words();
    section.querySelectorAll('[data-partner-t]').forEach(el => el.textContent = text[el.dataset.partnerT]);
    toggle.setAttribute('aria-pressed', String(paused));
    toggle.setAttribute('aria-label', paused ? text.playLabel : text.pauseLabel);
    document.querySelector('#partner-toggle-text').textContent = paused ? text.play : text.pause;
    document.querySelector('#partner-play-icon').textContent = paused ? '\u25b6' : '\u2161';
    previous.setAttribute('aria-label', text.left);
    next.setAttribute('aria-label', text.right);
    viewport.setAttribute('aria-label', text.region);
    sets[0].setAttribute('aria-label', text.list);
    status.textContent = paused ? text.paused : text.playing;
    section.classList.toggle('is-paused', paused);
  }
  function setPaused(value) {
    if (paused === value) return;
    paused = value;
    refreshLabels();
    lastTime = null;
  }
  function step(direction) {
    setPaused(true);
    const loopWidth = sets[0].getBoundingClientRect().width;
    const amount = Math.min(viewport.clientWidth * .65, 560);
    if (direction < 0 && viewport.scrollLeft < amount) viewport.scrollLeft += loopWidth;
    if (direction > 0 && viewport.scrollLeft > loopWidth) viewport.scrollLeft -= loopWidth;
    viewport.scrollBy({left: direction * amount, behavior: motionPreference.matches ? 'instant' : 'smooth'});
  }
  toggle.addEventListener('click', () => setPaused(!paused));
  previous.addEventListener('click', () => step(-1));
  next.addEventListener('click', () => step(1));
  viewport.addEventListener('mouseenter', () => { hovered = true; });
  viewport.addEventListener('mouseleave', () => { hovered = false; lastTime = null; });
  viewport.addEventListener('focus', () => { focused = true; });
  viewport.addEventListener('blur', () => { focused = false; lastTime = null; });
  viewport.addEventListener('wheel', e => { if (e.deltaX || e.shiftKey) setPaused(true); }, {passive:true});
  viewport.addEventListener('keydown', e => {
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') { e.preventDefault(); step(e.key === 'ArrowLeft' ? -1 : 1); }
    if (e.code === 'Space') { e.preventDefault(); setPaused(!paused); }
  });
  viewport.addEventListener('pointerdown', e => {
    setPaused(true);
    if (e.pointerType !== 'mouse' || e.button !== 0) return;
    drag = {x:e.clientX, left:viewport.scrollLeft};
    viewport.setPointerCapture(e.pointerId);
    viewport.classList.add('is-dragging');
    e.preventDefault();
  });
  viewport.addEventListener('pointermove', e => { if (drag) viewport.scrollLeft = drag.left - (e.clientX - drag.x); });
  function endDrag() { drag = null; viewport.classList.remove('is-dragging'); }
  viewport.addEventListener('pointerup', endDrag);
  viewport.addEventListener('pointercancel', endDrag);
  viewport.addEventListener('lostpointercapture', endDrag);
  motionPreference.addEventListener('change', e => { if (e.matches) setPaused(true); });
  document.addEventListener('mkp-languagechange', refreshLabels);
  function animate(time) {
    if (lastTime !== null && !paused && !hovered && !focused && !document.hidden && !drag) {
      const width = sets[0].getBoundingClientRect().width;
      autoPosition += Math.min(time - lastTime, 50) * .033;
      if (width && autoPosition >= width) autoPosition -= width;
      viewport.scrollLeft = autoPosition;
    } else autoPosition = viewport.scrollLeft;
    lastTime = time;
    requestAnimationFrame(animate);
  }
  refreshLabels();
  requestAnimationFrame(animate);
})();
