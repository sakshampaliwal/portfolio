import { lazy, Suspense, useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { PillLink } from "./PillLink";
import { MetricWall } from "./MetricWall";
import { profile } from "@/data/content";

const ease = [0.22, 1, 0.36, 1] as const;
const VoxelLogo = lazy(() => import("./VoxelLogo").then((m) => ({ default: m.VoxelLogo })));

const BlurWords = ({ text, className, delay = 0 }: { text: string; className?: string; delay?: number }) => (
  <span className={className}>
    {text.split(" ").map((word, i) => (
      <motion.span
        key={i}
        className="inline-block mr-[0.22em]"
        variants={{
          hidden: { opacity: 0, filter: "blur(14px)", y: 24 },
          show: { opacity: 1, filter: "blur(0px)", y: 0 },
        }}
        transition={{ duration: 1, delay: delay + i * 0.09, ease }}
      >
        {word}
      </motion.span>
    ))}
  </span>
);

/** Photo scene: cube logo over the dunes with a live-metrics wall, opening up like a window as you scroll in. */
export const Showcase = () => {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { amount: 0.35 });
  const once = useInView(ref, { amount: 0.35, once: true });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "start start"] });
  const inset = useTransform(scrollYProgress, [0, 1], [14, 0]);
  const radius = useTransform(scrollYProgress, [0, 1], [32, 0]);
  const clipPath = useTransform([inset, radius], ([i, r]) => `inset(${i}% ${i}% ${i}% ${i}% round ${r}px)`);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.25, 1]);

  return (
    <section ref={ref} aria-label="Introduction" className="relative h-screen min-h-[640px]">
      <motion.div style={{ clipPath }} className="absolute inset-0 overflow-hidden">
        <motion.img
          src={`${import.meta.env.BASE_URL}images/dunes.jpg`}
          alt=""
          style={{ scale: bgScale }}
          className="absolute inset-0 w-full h-full object-cover object-[50%_70%]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#2a5f9e]/40 via-transparent to-black/80" />
        <MetricWall active={inView} />
        <div className="absolute inset-0" aria-hidden>
          <Suspense fallback={null}>
            <VoxelLogo active={once} />
          </Suspense>
        </div>

        <motion.div
          initial="hidden"
          animate={once ? "show" : "hidden"}
          className="absolute inset-x-0 bottom-0 mx-auto max-w-[1400px] px-6 md:px-10 pb-10 md:pb-14 flex flex-col lg:flex-row lg:items-end justify-between gap-8"
        >
          <h2 className="text-[13vw] sm:text-7xl lg:text-[6.5rem] leading-[0.95] tracking-[-0.04em] font-light">
            <BlurWords text="Built for" className="block" />
            <BlurWords text="production." className="block font-dot font-bold tracking-normal" delay={0.35} />
          </h2>
          <div className="max-w-[19rem]">
            <motion.p
              variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.9, delay: 0.6, ease }}
              className="text-sm leading-relaxed text-white/90 mb-5"
            >
              Kubernetes, Terraform, CI/CD and observability across AWS, GCP and Azure. {profile.location}, open to
              work worldwide.
            </motion.p>
            <motion.div
              variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.9, delay: 0.75, ease }}
            >
              <PillLink href="#projects" label="Explore Projects" size="md" />
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};
