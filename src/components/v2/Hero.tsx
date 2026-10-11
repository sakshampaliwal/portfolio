import { lazy, Suspense, useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { profile } from "@/data/content";
import { PillLink } from "./PillLink";

const ease = [0.22, 1, 0.36, 1] as const;
const ParticleMorph = lazy(() => import("./ParticleMorph").then((m) => ({ default: m.ParticleMorph })));

const title = "DevOps Engineer";

/**
 * Pinned intro: name + title beside a particle sphere that dissolves and
 * re-forms as the Kubernetes wheel while the user scrolls through ~3 screens.
 */
export const Hero = () => {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = !!useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  const introOpacity = useTransform(scrollYProgress, [0, 0.14], [1, 0]);
  const introY = useTransform(scrollYProgress, [0, 0.14], [0, -60]);
  const introBlur = useTransform(scrollYProgress, [0, 0.14], ["blur(0px)", "blur(10px)"]);

  const k8sOpacity = useTransform(scrollYProgress, [0.58, 0.68, 0.9, 0.98], [0, 1, 1, 0]);
  const k8sY = useTransform(scrollYProgress, [0.58, 0.68], [40, 0]);

  const reveal = (delay: number) => ({
    initial: { opacity: 0, y: 24, filter: "blur(8px)" },
    animate: { opacity: 1, y: 0, filter: "blur(0px)" },
    transition: { duration: 1, delay, ease },
  });

  return (
    <div ref={ref} className="relative h-[320vh]">
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="absolute inset-0" aria-hidden>
          <Suspense fallback={null}>
            <ParticleMorph progress={scrollYProgress} reduceMotion={reduceMotion} />
          </Suspense>
        </div>

        {/* Intro: name, title, short pitch, actions */}
        <motion.div
          style={{ opacity: introOpacity, y: introY, filter: introBlur }}
          className="relative z-10 h-full mx-auto max-w-[1400px] px-6 md:px-10 flex flex-col justify-center pt-24 pb-10"
        >
          <motion.p {...reveal(0.2)} className="font-mono text-xs md:text-sm text-white/70 mb-4 md:mb-6">
            ( Hi, I'm )
          </motion.p>

          <h1 className="text-[17vw] sm:text-7xl lg:text-8xl xl:text-[7.5rem] leading-[0.92] tracking-[-0.045em]">
            <span className="block overflow-hidden pb-1">
              <motion.span
                className="block font-light"
                initial={{ y: "105%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1.1, delay: 0.3, ease }}
              >
                {profile.firstName}
              </motion.span>
            </span>
            <span className="block overflow-hidden pb-2">
              <motion.span
                className="block font-dot font-black tracking-normal"
                initial={{ y: "105%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1.1, delay: 0.42, ease }}
              >
                {profile.lastName}
              </motion.span>
            </span>
          </h1>

          <motion.p {...reveal(0.65)} className="mt-5 md:mt-7 text-xl md:text-3xl font-light tracking-tight">
            {title}
            <span className="text-white/50"> · AWS · GCP · Azure</span>
          </motion.p>

          <motion.p {...reveal(0.8)} className="mt-4 max-w-md text-sm md:text-base leading-relaxed text-white/75">
            I build Kubernetes platforms, CI/CD pipelines and multi-cloud infrastructure that stay up, stay secure and
            stay cheap. Based in {profile.location}.
          </motion.p>

          <motion.div {...reveal(0.95)} className="mt-7 md:mt-9 flex flex-wrap items-center gap-3 md:gap-4">
            <PillLink href="#projects" label="View Projects" size="md" />
            <PillLink href="#contact" label="Let's Talk" size="md" variant="ghost" />
          </motion.div>
        </motion.div>

        {/* Scroll cue, bottom-left under the text column so it never sits on the sphere */}
        <motion.a
          href="#about"
          style={{ opacity: introOpacity }}
          className="hidden md:inline-flex [@media(max-height:780px)]:hidden absolute z-10 bottom-8 left-[max(2.5rem,calc((100vw-1400px)/2+2.5rem))] items-center gap-3 text-xs text-white/70 hover:text-white transition-colors"
        >
          <span className="w-6 h-6 rounded-full border border-white/60 flex items-center justify-center">
            <motion.span
              className="w-1.5 h-1.5 rounded-full bg-white"
              animate={reduceMotion ? undefined : { y: [-3, 4, -3] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            />
          </span>
          Scroll down
        </motion.a>

        {/* Caption once the Kubernetes wheel has formed */}
        <motion.div
          style={{ opacity: k8sOpacity, y: k8sY }}
          className="absolute z-10 inset-x-0 bottom-10 md:bottom-14 mx-auto max-w-[1400px] px-6 md:px-10 flex flex-col md:flex-row md:items-end justify-between gap-4 pointer-events-none"
        >
          <p className="font-mono text-xs text-white/70">kubernetes · aws · gcp · azure</p>
          <p className="text-2xl md:text-4xl font-light tracking-tight max-w-xl md:text-right">
            Clusters across three clouds, <span className="text-white/60">orchestrated as one.</span>
          </p>
        </motion.div>
      </div>
    </div>
  );
};
