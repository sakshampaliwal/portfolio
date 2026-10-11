import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { experiences } from "@/data/content";
import { SectionLabel } from "./SectionLabel";

const ease = [0.22, 1, 0.36, 1] as const;

export const Experience = () => {
  const [open, setOpen] = useState(0);

  return (
    <section id="experience" className="relative py-32 md:py-40">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <SectionLabel index="02" label="Experience" />
        <h2 className="text-5xl md:text-7xl font-light tracking-[-0.04em] mb-16 md:mb-20">
          Where I've <span className="font-dot font-bold tracking-normal">shipped.</span>
        </h2>

        <ul className="border-t border-border">
          {experiences.map((exp, i) => {
            const isOpen = open === i;
            return (
              <motion.li
                key={exp.company}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "0px 0px -60px 0px" }}
                transition={{ duration: 0.8, delay: i * 0.1, ease }}
                className="border-b border-border"
              >
                <h3>
                  <button
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    aria-expanded={isOpen}
                    aria-controls={`exp-${i}`}
                    className="group w-full grid grid-cols-[1fr_auto] md:grid-cols-[180px_1fr_auto_auto] items-center gap-x-8 gap-y-1 py-7 md:py-9 text-left"
                  >
                    <span className="font-mono text-xs text-white/70 md:order-none order-2 col-span-2 md:col-span-1">
                      {exp.period}
                    </span>
                    <span className="text-2xl md:text-4xl font-light tracking-tight transition-transform duration-500 group-hover:translate-x-2">
                      {exp.title} <span className="text-white/50">@ {exp.company}</span>
                    </span>
                    <span className="hidden md:block text-sm text-white/70">{exp.location}</span>
                    <span
                      className={`w-10 h-10 rounded-full border border-white/20 flex items-center justify-center transition-all duration-500 ${
                        isOpen ? "rotate-45 bg-white text-black" : "group-hover:border-white/60"
                      }`}
                    >
                      <Plus size={16} />
                    </span>
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`exp-${i}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.6, ease }}
                      className="overflow-hidden"
                    >
                      <div className="md:pl-[212px] pb-10 grid lg:grid-cols-[1fr_280px] gap-10">
                        <ul className="space-y-3">
                          {exp.highlights.map((h) => (
                            <li key={h} className="flex gap-4 text-white/80 leading-relaxed">
                              <span className="font-mono text-white/40 shrink-0">—</span>
                              {h}
                            </li>
                          ))}
                        </ul>
                        <div>
                          <p className="font-mono text-xs text-white/60 mb-3">Client: {exp.clients}</p>
                          <div className="flex flex-wrap gap-2">
                            {exp.technologies.map((t) => (
                              <span key={t} className="px-3 py-1.5 rounded-full glass-pill text-xs">
                                {t}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};
