import { useEffect } from 'react';

export function useScrollReveal(selector: string = '.reveal', rootMargin: string = '0px 0px -10% 0px') {
  useEffect(() => {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return;
    const els = Array.from(document.querySelectorAll(selector));
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [selector, rootMargin]);
}