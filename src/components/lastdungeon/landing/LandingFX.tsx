"use client";

import { useEffect, useRef } from "react";

const reducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * One small client island for the whole page: scroll-reveal, pausing CSS loops
 * in sections that are off screen, and hero parallax (pointer + scroll) through
 * CSS variables. Nothing here reads layout inside a scroll handler.
 */
export function LandingFX() {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>(".ld-landing");
    if (!root) return;
    const reduce = reducedMotion();
    const cleanups: Array<() => void> = [];

    // Pause infinite CSS animations while a section is off screen.
    const live = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          (e.target as HTMLElement).dataset.live = e.isIntersecting ? "1" : "0";
        }),
      { rootMargin: "160px 0px" },
    );
    root.querySelectorAll(".ld-sec").forEach((s) => live.observe(s));
    cleanups.push(() => live.disconnect());

    if (!reduce) {
      const items = root.querySelectorAll<HTMLElement>("[data-rv]");
      const vh = window.innerHeight;
      items.forEach((el) => {
        if (el.getBoundingClientRect().top < vh * 0.92) el.classList.add("is-in");
      });
      root.classList.add("ld-anim");
      const rv = new IntersectionObserver(
        (entries, o) =>
          entries.forEach((e) => {
            if (e.isIntersecting) {
              e.target.classList.add("is-in");
              o.unobserve(e.target);
            }
          }),
        { threshold: 0.1, rootMargin: "0px 0px -6% 0px" },
      );
      items.forEach((el) => {
        if (!el.classList.contains("is-in")) rv.observe(el);
      });
      cleanups.push(() => rv.disconnect());

      const hero = root.querySelector<HTMLElement>(".ld-hero");
      if (hero) {
        let raf = 0;
        let tx = 0;
        let ty = 0;
        const apply = () => {
          raf = 0;
          hero.style.setProperty("--px", tx.toFixed(3));
          hero.style.setProperty("--py", ty.toFixed(3));
          hero.style.setProperty("--sy", String(Math.min(window.scrollY, 900)));
        };
        const queue = () => {
          if (!raf) raf = requestAnimationFrame(apply);
        };
        const onMove = (e: PointerEvent) => {
          const r = hero.getBoundingClientRect();
          tx = ((e.clientX - r.left) / r.width - 0.5) * 2;
          ty = ((e.clientY - r.top) / r.height - 0.5) * 2;
          queue();
        };
        const onScroll = () => {
          if (window.scrollY < 1100) queue();
        };
        hero.addEventListener("pointermove", onMove, { passive: true });
        window.addEventListener("scroll", onScroll, { passive: true });
        cleanups.push(() => {
          hero.removeEventListener("pointermove", onMove);
          window.removeEventListener("scroll", onScroll);
          if (raf) cancelAnimationFrame(raf);
        });
      }
    }
    return () => cleanups.forEach((c) => c());
  }, []);
  return null;
}

/**
 * The only canvas on the page: a capped swarm of torch embers rising through
 * the hero. Paused when the hero is off screen or the tab is hidden; not
 * started at all under prefers-reduced-motion.
 */
export function Embers() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas || reducedMotion()) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const PX = 3;
    const colors = ["#ffd36b", "#f59e2b", "#ff7a1a", "#ffe9b0"];
    let w = 0;
    let h = 0;
    type P = { x: number; y: number; vx: number; vy: number; life: number; ttl: number; c: string; s: number };
    const ps: P[] = [];
    const spawn = (initial: boolean): P => ({
      x: Math.random() * w,
      y: initial ? Math.random() * h : h + 10,
      vx: (Math.random() - 0.5) * 12,
      vy: -(14 + Math.random() * 34),
      life: initial ? Math.random() * 3 : 0,
      ttl: 3 + Math.random() * 4,
      c: colors[(Math.random() * colors.length) | 0],
      s: Math.random() < 0.25 ? 2 : 1,
    });
    const resize = () => {
      const r = canvas.getBoundingClientRect();
      w = Math.max(1, Math.floor(r.width));
      h = Math.max(1, Math.floor(r.height));
      canvas.width = w;
      canvas.height = h;
      const max = w < 600 ? 16 : 34;
      while (ps.length < max) ps.push(spawn(true));
      ps.length = Math.min(ps.length, max);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    let raf = 0;
    let last = 0;
    let visible = true;
    const frame = (t: number) => {
      raf = 0;
      if (!visible || document.hidden) return;
      const dt = Math.min(0.05, (t - last) / 1000 || 0.016);
      last = t;
      ctx.clearRect(0, 0, w, h);
      for (let i = 0; i < ps.length; i++) {
        const p = ps[i];
        p.life += dt;
        p.x += (p.vx + Math.sin(p.life * 2 + i) * 10) * dt;
        p.y += p.vy * dt;
        if (p.life > p.ttl || p.y < -10) {
          ps[i] = spawn(false);
          continue;
        }
        const k = p.life / p.ttl;
        ctx.globalAlpha = k < 0.15 ? k / 0.15 : 1 - (k - 0.15) / 0.85;
        ctx.fillStyle = p.c;
        const s = p.s * PX;
        ctx.fillRect(Math.round(p.x / PX) * PX, Math.round(p.y / PX) * PX, s, s);
      }
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(frame);
    };
    const start = () => {
      if (!raf && visible && !document.hidden) {
        last = performance.now();
        raf = requestAnimationFrame(frame);
      }
    };
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible) start();
    });
    io.observe(canvas);
    document.addEventListener("visibilitychange", start);
    start();
    return () => {
      if (raf) cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      document.removeEventListener("visibilitychange", start);
    };
  }, []);
  return <canvas ref={ref} aria-hidden className="ld-embers" />;
}
