import { useLayoutEffect, useRef, useState } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/data/content";
import { SectionLabel } from "./SectionLabel";

type Project = (typeof projects)[number];

const Card = ({ project, index }: { project: Project; index: number }) => (
  <article className="group relative shrink-0 w-[86vw] md:w-[62vw] lg:w-[44vw] h-[min(64vh,580px)] rounded-3xl overflow-hidden border border-border bg-card flex flex-col">
    {/* cover */}
    <div
      className="relative h-[42%] overflow-hidden"
      style={{
        background: `radial-gradient(120% 120% at 20% 0%, hsl(${project.hue} 80% 55% / 0.55), transparent 60%), radial-gradient(100% 100% at 100% 100%, hsl(${project.hue + 40} 70% 40% / 0.5), transparent 60%), #0b0b0b`,
      }}
    >
      <div
        className="absolute inset-0 opacity-40 transition-transform duration-[1.2s] ease-out group-hover:scale-110"
        style={{
          backgroundImage: "radial-gradient(rgba(255,255,255,0.55) 1px, transparent 1px)",
          backgroundSize: "14px 14px",
          maskImage: "linear-gradient(to bottom, black, transparent)",
        }}
      />
      <span className="absolute left-6 bottom-2 font-dot font-black text-[7rem] md:text-[9rem] leading-none text-white/90">
        0{index + 1}
      </span>
      <a
        href={project.link}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${project.title} on GitHub`}
        className="absolute right-5 top-5 w-12 h-12 rounded-full bg-white text-black flex items-center justify-center transition-transform duration-500 group-hover:rotate-45"
      >
        <ArrowUpRight size={20} />
      </a>
    </div>

    <div className="flex-1 p-6 md:p-8 flex flex-col">
      <h3 className="text-2xl md:text-3xl font-light tracking-tight mb-3">{project.title}</h3>
      <p className="text-white/70 text-sm md:text-base leading-relaxed mb-5">{project.description}</p>
      <ul className="hidden sm:block space-y-1.5 mb-6">
        {project.highlights.slice(0, 3).map((h) => (
          <li key={h} className="flex gap-3 text-sm text-white/70">
            <span className="font-mono text-white/40">—</span>
            {h}
          </li>
        ))}
      </ul>
      <div className="mt-auto flex flex-wrap gap-2">
        {project.technologies.map((t) => (
          <span key={t} className="px-3 py-1.5 rounded-full glass-pill text-xs">
            {t}
          </span>
        ))}
      </div>
    </div>
  </article>
);

/** Pinned section: vertical scroll drives the cards sideways. */
export const Projects = () => {
  const outer = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);

  useLayoutEffect(() => {
    const measure = () => {
      if (!track.current) return;
      setDistance(Math.max(0, track.current.scrollWidth - window.innerWidth));
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const { scrollYProgress } = useScroll({ target: outer, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], [0, -distance]);
  const smoothX = useSpring(x, { stiffness: 120, damping: 30, mass: 0.4 });
  const bar = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="projects" ref={outer} className="relative" style={{ height: `calc(100vh + ${distance}px)` }}>
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col justify-center pt-20">
        <div className="mx-auto w-full max-w-[1400px] px-6 md:px-10 mb-8 md:mb-10 flex items-end justify-between gap-6">
          <div>
            <SectionLabel index="03" label="Projects" />
            <h2 className="text-5xl md:text-7xl font-light tracking-[-0.04em] -mt-4">
              Selected <span className="font-dot font-bold tracking-normal">work.</span>
            </h2>
          </div>
          <div className="hidden md:block w-48 h-px bg-white/15 mb-4">
            <motion.div style={{ width: bar }} className="h-px bg-white" />
          </div>
        </div>
        <motion.div ref={track} style={{ x: smoothX }} className="flex gap-6 pl-6 md:pl-10 pr-6 md:pr-10 w-max">
          {projects.map((p, i) => (
            <Card key={p.title} project={p} index={i} />
          ))}
          <a
            href="https://github.com/sakshampaliwal"
            target="_blank"
            rel="noopener noreferrer"
            className="group shrink-0 w-[60vw] md:w-[28vw] h-[min(64vh,580px)] rounded-3xl border border-dashed border-white/25 flex flex-col items-center justify-center gap-5 hover:bg-white/[0.03] transition-colors"
          >
            <span className="w-16 h-16 rounded-full bg-white text-black flex items-center justify-center transition-transform duration-500 group-hover:rotate-45">
              <ArrowUpRight size={24} />
            </span>
            <span className="text-xl font-light">More on GitHub</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
};
