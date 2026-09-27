document.querySelectorAll('.screenshots').forEach((gallery) => {
  const track = gallery.querySelector('.screenshot-track');
  const controls = gallery.querySelector('.screenshot-controls');
  const previous = gallery.querySelector('[data-gallery-prev]');
  const next = gallery.querySelector('[data-gallery-next]');
  const slides = Array.from(track.querySelectorAll('.screenshot'));
  const tolerance = 2;

  function positions() {
    const left = track.getBoundingClientRect().left;
    const maximum = Math.max(0, track.scrollWidth - track.clientWidth);
    // Clamp the final slide to the scroll boundary, including at narrow widths.
    return [...new Set(slides.map((slide) => Math.max(0, Math.min(maximum,
      slide.getBoundingClientRect().left - left + track.scrollLeft
    ))))];
  }

  function updateControls() {
    previous.disabled = track.scrollLeft <= tolerance;
    next.disabled = track.scrollLeft >= track.scrollWidth - track.clientWidth - tolerance;
  }

  function move(direction) {
    const stops = positions();
    const destination = direction > 0
      ? stops.find((position) => position > track.scrollLeft + tolerance)
      : stops.reverse().find((position) => position < track.scrollLeft - tolerance);
    if (destination !== undefined) {
      // Instant movement also makes repeated clicks deterministic and avoids motion.
      track.scrollTo({ left: destination, behavior: 'instant' });
      updateControls();
    }
  }

  previous.addEventListener('click', () => move(-1));
  next.addEventListener('click', () => move(1));
  track.addEventListener('scroll', updateControls, { passive: true });
  track.addEventListener('keydown', (event) => {
    if (event.target !== track) return;
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      move(event.key === 'ArrowRight' ? 1 : -1);
    }
  });
  new ResizeObserver(updateControls).observe(track);
  controls.hidden = false;
  updateControls();
});
