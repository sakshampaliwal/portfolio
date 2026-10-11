import { motion } from "framer-motion";
import { education, skillGroups } from "@/data/content";
import { SectionLabel } from "./SectionLabel";

const ease = [0.22, 1, 0.36, 1] as const;
const headline = ["Kubernetes", "Terraform", "Argo CD", "Prometheus", "AWS", "GCP", "Azure", "Helm", "Jenkins", "Docker"];

const Marquee = ({ reverse = false, outline = false }: { reverse?: boolean; outline?: boolean }) => (
  <div className="marquee overflow-hidden py-2">
    <div className="marquee-track flex w-max gap-10" style={reverse ? { animationDirection: "reverse" } : undefined}>
      {[...headline, ...headline].map((t, i) => (
        <span
          key={i}
          aria-hidden={i >= headline.length}
          className={`text-6xl md:text-8xl tracking-[-0.04em] whitespace-nowrap ${
            outline ? "font-dot font-bold text-white/40" : "font-light"
          }`}
        >
          {t}
          <span className="text-white/30 ml-10">/</span>
        </span>
      ))}
    </div>
  </div>
);

export const Stack = () => (
  <section id="stack" className="relative py-32 md:py-40 overflow-hidden">
    <div className="mx-auto max-w-[1400px] px-6 md:px-10">
      <SectionLabel index="04" label="Stack" />
    </div>

    <div className="mb-20 md:mb-28 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
      <Marquee />
      <Marquee reverse outline />
    </div>

    <div className="mx-auto max-w-[1400px] px-6 md:px-10">
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 border-t border-l border-border">
        {skillGroups.map((g, i) => (
          <motion.div
            key={g.title}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "0px 0px -40px 0px" }}
            transition={{ duration: 0.8, delay: (i % 3) * 0.08, ease }}
            className="group relative p-6 md:p-8 border-r border-b border-border overflow-hidden"
          >
            <div className="absolute inset-0 bg-white origin-bottom scale-y-0 group-hover:scale-y-100 transition-transform duration-500 ease-out" />
            <div className="relative transition-colors duration-500 group-hover:text-black">
              <div className="flex items-baseline justify-between mb-5">
                <h3 className="text-xl font-medium">{g.title}</h3>
                <span className="font-mono text-xs opacity-60">0{i + 1}</span>
              </div>
              <p className="text-sm leading-7 opacity-75">{g.items.join(" · ")}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "0px 0px -60px 0px" }}
        transition={{ duration: 0.8, ease }}
        className="mt-16 grid md:grid-cols-[180px_1fr_auto] gap-x-8 gap-y-2 items-baseline border-t border-border pt-8"
      >
        <span className="font-mono text-xs text-white/70">Education · {education.years}</span>
        <div>
          <p className="text-2xl md:text-3xl font-light tracking-tight">{education.degree}</p>
          <p className="text-white/70 mt-1">
            {education.focus} — {education.school}, {education.university}
          </p>
        </div>
        <span className="font-dot font-bold text-3xl">{education.cgpa}</span>
      </motion.div>
    </div>
  </section>
);
