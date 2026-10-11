import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { PillLink } from "./PillLink";
import { navLinks, profile } from "@/data/content";
import { cn } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as const;

export const useActiveSection = () => {
  const [active, setActive] = useState("");
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    navLinks.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);
  return active;
};


export const Nav = () => {
  const active = useActiveSection();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, delay: 0.2, ease }}
      className="fixed top-0 inset-x-0 z-50"
    >
      {/* keeps the nav readable over whatever scrolls beneath it */}
      <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/90 via-black/50 to-transparent pointer-events-none" />
      <nav aria-label="Main" className="relative mx-auto max-w-[1400px] px-6 md:px-10 h-20 flex items-center justify-between">
        <a href="#top" className="text-lg md:text-xl tracking-tight whitespace-nowrap">
          <span className="font-light">{profile.firstName}</span>{" "}
          <span className="font-semibold">{profile.lastName}</span>
        </a>

        <ul className="hidden md:flex items-center gap-1 glass-pill rounded-full p-1.5">
          {navLinks.map((link, i) => (
            <li key={link.id} className="flex items-center">
              {i > 0 && <span className="w-px h-4 bg-white/15 mx-0.5" />}
              <a
                href={`#${link.id}`}
                aria-current={active === link.id ? "location" : undefined}
                className={cn(
                  "relative px-4 lg:px-5 py-2 text-[13px] rounded-full transition-colors",
                  active === link.id ? "text-white" : "text-white/70 hover:text-white"
                )}
              >
                {active === link.id && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-0 rounded-full bg-white/10"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="relative">{link.label}</span>
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden md:block">
          <PillLink href="#contact" label="Let's Talk" />
        </div>

        <button
          className="md:hidden w-11 h-11 rounded-full glass-pill flex items-center justify-center"
          onClick={() => setOpen(true)}
          aria-label="Open menu"
          aria-expanded={open}
          aria-controls="mobile-menu"
        >
          <Menu size={20} />
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ clipPath: "circle(0% at 92% 5%)" }}
            animate={{ clipPath: "circle(150% at 92% 5%)" }}
            exit={{ clipPath: "circle(0% at 92% 5%)" }}
            transition={{ duration: 0.6, ease }}
            className="fixed inset-0 z-50 bg-white text-black flex flex-col px-6 pt-6 pb-10"
          >
            <div className="flex justify-end">
              <button
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="w-11 h-11 rounded-full border border-black/15 flex items-center justify-center"
              >
                <X size={20} />
              </button>
            </div>
            <ul className="mt-10 flex flex-col gap-2">
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + i * 0.06, duration: 0.6, ease }}
                >
                  <a href={`#${link.id}`} onClick={() => setOpen(false)} className="text-5xl font-light tracking-tight">
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </ul>
            <div className="mt-auto">
              <PillLink href="#contact" label="Let's Talk" variant="dark" size="md" onClick={() => setOpen(false)} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

/** Thin vertical ticks on the right edge showing which section you're in. */
export const SideProgress = () => {
  const active = useActiveSection();
  return (
    <div aria-hidden className="hidden md:flex fixed right-6 top-1/2 -translate-y-1/2 z-40 flex-col gap-3">
      {navLinks.map((link) => (
        <span
          key={link.id}
          className={cn(
            "w-[2px] rounded-full transition-all duration-500",
            active === link.id ? "h-10 bg-white" : "h-6 bg-white/25"
          )}
        />
      ))}
    </div>
  );
};
