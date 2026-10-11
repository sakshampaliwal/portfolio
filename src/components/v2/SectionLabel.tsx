import { motion } from "framer-motion";

/** Small "(01) /About" label that sits above every section. */
export const SectionLabel = ({ index, label }: { index: string; label: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 12 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "0px 0px -80px 0px" }}
    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    className="flex items-center gap-3 mb-10 md:mb-14 font-mono text-xs text-white/70"
  >
    <span>({index})</span>
    <span className="h-px w-10 bg-white/30" />
    <span>{label}</span>
  </motion.div>
);
