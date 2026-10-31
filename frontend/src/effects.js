// Page-wide motion: scroll reveal, card spotlight, typewriter and count-up.
import { useEffect, useState } from 'react';

const prefersReducedMotion = () =>
  window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;

// Elements that slide in when scrolled into view (the hero has its own entrance animation).
const REVEAL_SELECTOR = '.section-title, .section-sub, .card, .timeline li, .socials';

export function usePageEffects(ready) {
  // 1. Scroll reveal
  useEffect(() => {
    if (!ready || prefersReducedMotion() || !('IntersectionObserver' in window)) return undefined;

    const elements = [...document.querySelectorAll(REVEAL_SELECTOR)].filter((el) => !el.closest('.hero'));
    elements.forEach((el) => {
      // Stagger siblings (e.g. cards in a grid) so they appear one after another
      const index = [...el.parentElement.children].indexOf(el);
      el.style.setProperty('--reveal-delay', `${Math.min(index, 5) * 90}ms`);
      el.classList.add('reveal');
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ready]);

  // 2. Spotlight that follows the mouse over cards
  useEffect(() => {
    function onMove(e) {
      const card = e.target.closest?.('.card');
      if (!card) return;
      const rect = card.getBoundingClientRect();
      card.style.setProperty('--mx', `${e.clientX - rect.left}px`);
      card.style.setProperty('--my', `${e.clientY - rect.top}px`);
    }
    document.addEventListener('pointermove', onMove, { passive: true });
    return () => document.removeEventListener('pointermove', onMove);
  }, []);
}

// Types each word, pauses, erases it, then moves to the next one.
export function useTypewriter(words, { typeMs = 55, eraseMs = 28, holdMs = 1700 } = {}) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState('');
  const [erasing, setErasing] = useState(false);

  useEffect(() => {
    if (!words.length) return undefined;
    if (prefersReducedMotion()) {
      setText(words[0]);
      return undefined;
    }
    const word = words[index % words.length];
    let delay;
    let next;
    if (!erasing && text === word) {
      delay = holdMs;
      next = () => setErasing(true);
    } else if (erasing && text === '') {
      delay = 250;
      next = () => { setErasing(false); setIndex((i) => i + 1); };
    } else {
      delay = erasing ? eraseMs : typeMs;
      next = () => setText(word.slice(0, text.length + (erasing ? -1 : 1)));
    }
    const timer = setTimeout(next, delay);
    return () => clearTimeout(timer);
  }, [words, index, text, erasing, typeMs, eraseMs, holdMs]);

  return text;
}

// Counts from 0 up to `target` with an ease-out curve.
export function useCountUp(target, { durationMs = 1400, delayMs = 500 } = {}) {
  const [value, setValue] = useState(prefersReducedMotion() ? target : 0);

  useEffect(() => {
    if (prefersReducedMotion()) return undefined;
    let frame;
    let start;
    function tick(now) {
      start ??= now;
      const t = Math.min((now - start) / durationMs, 1);
      setValue(target * (1 - Math.pow(1 - t, 3)));
      if (t < 1) frame = requestAnimationFrame(tick);
    }
    const timer = setTimeout(() => { frame = requestAnimationFrame(tick); }, delayMs);
    return () => { clearTimeout(timer); cancelAnimationFrame(frame); };
  }, [target, durationMs, delayMs]);

  return value;
}
