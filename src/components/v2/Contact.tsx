import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Check, Copy } from "lucide-react";
import { PillLink } from "./PillLink";
import { toast } from "sonner";
import { openTo, profile } from "@/data/content";
import { SectionLabel } from "./SectionLabel";

const ease = [0.22, 1, 0.36, 1] as const;

export const Contact = () => {
  const ref = useRef<HTMLElement>(null);
  const [copied, setCopied] = useState(false);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const scale = useTransform(scrollYProgress, [0, 1], [0.85, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [80, 0]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      toast.success("Email copied");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  return (
    <section id="contact" ref={ref} className="relative pt-32 md:pt-48 pb-10 overflow-hidden">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <SectionLabel index="05" label="Contact" />

        <motion.h2
          style={{ scale, y }}
          className="origin-left text-[15vw] md:text-[11vw] leading-[0.88] font-light tracking-[-0.055em]"
        >
          Let's build
          <br />
          <span className="font-dot font-black tracking-normal">together.</span>
        </motion.h2>

        <div className="mt-16 md:mt-24 grid md:grid-cols-[1fr_auto] gap-10 items-end">
          <div>
            <p className="text-white/70 mb-4">Open to</p>
            <div className="flex flex-wrap gap-2">
              {openTo.map((o) => (
                <span key={o} className="px-4 py-2 rounded-full glass-pill text-sm">
                  {o}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <PillLink href={`mailto:${profile.email}`} label="Say Hello" size="lg" />
            <button
              onClick={copy}
              className="h-14 px-6 rounded-full glass-pill font-mono text-sm flex items-center gap-3 hover:bg-white/10 transition-colors"
            >
              {profile.email}
              {copied ? <Check size={16} /> : <Copy size={16} className="opacity-70" />}
            </button>
          </div>
        </div>

        <motion.footer
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease }}
          className="mt-28 pt-6 border-t border-border flex flex-col md:flex-row gap-4 justify-between text-sm text-white/70"
        >
          <span>
            © {new Date().getFullYear()} {profile.firstName} {profile.lastName}
          </span>
          <div className="flex gap-6">
            <a href={profile.github} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
              GitHub
            </a>
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
              LinkedIn
            </a>
            <span>{profile.location}</span>
          </div>
        </motion.footer>
      </div>
    </section>
  );
};
