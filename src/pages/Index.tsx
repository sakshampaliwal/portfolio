import { useEffect } from "react";
import { MotionConfig } from "framer-motion";
import Lenis from "lenis";
import { Nav, SideProgress } from "@/components/v2/Nav";
import { Hero } from "@/components/v2/Hero";
import { Showcase } from "@/components/v2/Showcase";
import { About } from "@/components/v2/About";
import { Experience } from "@/components/v2/Experience";
import { Projects } from "@/components/v2/Projects";
import { Stack } from "@/components/v2/Stack";
import { Contact } from "@/components/v2/Contact";

/** Weighted smooth scrolling; in-page links glide instead of jumping. Off for reduced motion. */
const useSmoothScroll = () => {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ duration: 1.2, easing: (t) => 1 - Math.pow(1 - t, 4) });
    let frame = requestAnimationFrame(function raf(time) {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    });

    const onClick = (e: MouseEvent) => {
      const link = (e.target as HTMLElement).closest('a[href^="#"]') as HTMLAnchorElement | null;
      if (!link || link.getAttribute("href") === "#main") return;
      const hash = link.getAttribute("href")!;
      e.preventDefault();
      if (hash === "#top" || hash === "#") lenis.scrollTo(0);
      else lenis.scrollTo(hash, { offset: hash === "#projects" ? 0 : -40 });
    };
    document.addEventListener("click", onClick);
    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("click", onClick);
      lenis.destroy();
    };
  }, []);
};

const Index = () => {
  useSmoothScroll();

  return (
    <MotionConfig reducedMotion="user">
      <div id="top" className="min-h-screen bg-background text-foreground">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[80] focus:px-4 focus:py-2 focus:rounded-full focus:bg-white focus:text-black"
        >
          Skip to content
        </a>
        <Nav />
        <SideProgress />
        <main id="main">
          <Hero />
          <Showcase />
          <About />
          <Experience />
          <Projects />
          <Stack />
          <Contact />
        </main>
      </div>
    </MotionConfig>
  );
};

export default Index;
