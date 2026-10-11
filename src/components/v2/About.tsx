import { useEffect, useRef } from "react";
import { animate, motion, MotionValue, useInView, useScroll, useTransform } from "framer-motion";
import { stats } from "@/data/content";
import { SectionLabel } from "./SectionLabel";

const statement =
  "I build the platforms other engineers ship on. Kubernetes clusters across three clouds, pipelines that scan every commit, and autoscaling that cut a cloud bill by thirty percent. Less toil, fewer pages at 3am, more time for the product.";

const Word = ({ word, progress, range }: { word: string; progress: MotionValue<number>; range: [number, number] }) => {
  const opacity = useTransform(progress, range, [0.15, 1]);
  return (
    <motion.span style={{ opacity }} className="inline-block mr-[0.25em]">
      {word}
    </motion.span>
  );
};

const Counter = ({ value, suffix }: { value: number; suffix: string }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView || !ref.current) return;
    const controls = animate(0, value, {
      duration: 1.6,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => ref.current && (ref.current.textContent = `${Math.round(v)}${suffix}`),
    });
    return () => controls.stop();
  }, [inView, value, suffix]);
  return (
    <span ref={ref} className="tabular-nums">
      0{suffix}
    </span>
  );
};

export const About = () => {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 45%"] });
  const words = statement.split(" ");

  return (
    <section id="about" className="relative pt-32 md:pt-48 pb-16 md:pb-24">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <SectionLabel index="01" label="About" />
        <p
          ref={ref}
          aria-label={statement}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light leading-[1.12] tracking-[-0.03em] max-w-6xl"
        >
          {words.map((w, i) => (
            <Word key={i} word={w} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]} />
          ))}
        </p>

        <div className="mt-24 md:mt-32 grid sm:grid-cols-3 border-t border-border">
          {stats.map((s) => (
            <div key={s.label} className="pt-6 pb-8 sm:pr-8 border-b sm:border-b-0 border-border">
              <div className="font-dot font-bold text-6xl md:text-7xl">
                <Counter value={s.value} suffix={s.suffix} />
              </div>
              <p className="mt-3 text-sm text-white/70">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
