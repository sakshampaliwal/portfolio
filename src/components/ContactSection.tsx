import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Mail, Linkedin, Github, MapPin, Send } from "lucide-react";

export const ContactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="contact" className="py-24 relative" ref={ref}>
      {/* Gradient Border Top */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto text-center"
        >
          <h2 className="section-heading">
            Let's Build <span className="gradient-text">Together</span>
          </h2>
          <p className="section-subheading mx-auto mt-4 mb-10">
            Looking for a DevOps Engineer who cares about reliability, security, and developer experience? 
            Let's chat about how I can help scale your infrastructure.
          </p>

          <motion.a
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            href="mailto:sakshampaliwal11@gmail.com"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-primary text-primary-foreground font-semibold text-lg hover:shadow-[0_0_40px_hsl(var(--primary)/0.4)] transition-all duration-300 mb-12"
          >
            <Send size={20} />
            Say Hello
          </motion.a>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-6"
          >
            <a
              href="mailto:sakshampaliwal11@gmail.com"
              className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
            >
              <Mail size={18} />
              <span className="text-sm">sakshampaliwal11@gmail.com</span>
            </a>
            <a
              href="https://linkedin.com/in/saksham-paliwal"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
            >
              <Linkedin size={18} />
              <span className="text-sm">LinkedIn</span>
            </a>
            <a
              href="https://github.com/sakshampaliwal"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
            >
              <Github size={18} />
              <span className="text-sm">GitHub</span>
            </a>
            <span className="flex items-center gap-2 text-muted-foreground">
              <MapPin size={18} />
              <span className="text-sm">New Delhi, India</span>
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
